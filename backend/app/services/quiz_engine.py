"""
Adaptive, personalized MCQ engine.

Personalization at generation time:
  - The uploaded document is classified against the 33-competency taxonomy to find
    which 2-3 concepts it actually covers.
  - For each concept, the official's CURRENT competency score decides the starting
    difficulty (Beginner / Intermediate / Advanced) -- a beginner gets beginner
    questions, an advanced learner gets advanced questions, on THAT concept specifically.

Adaptive remediation during the quiz (the "gap-filling" loop):
  - Wrong answer on a concept -> engine drops that concept's difficulty and generates
    2 new easier questions on the SAME concept from the SAME source material.
  - Two consecutive correct answers at the lowered difficulty -> engine escalates
    back toward the original difficulty with one confirmation question.
  - This all happens live, per concept, within a single quiz session -- see
    quiz_sessions.concept_state and quiz_sessions.queue in schema.sql.
"""
from app.services.gemini_service import generate_json

_MAX_CHARS_PER_CALL = 12000
_DIFFICULTY_ORDER = ["Beginner", "Intermediate", "Advanced"]


def difficulty_from_score(score: float) -> str:
    """Maps a 0-100 competency score to a starting difficulty for that concept."""
    if score < 40:
        return "Beginner"
    elif score < 75:
        return "Intermediate"
    return "Advanced"


def _shift_difficulty(current: str, steps: int) -> str:
    idx = _DIFFICULTY_ORDER.index(current)
    new_idx = max(0, min(len(_DIFFICULTY_ORDER) - 1, idx + steps))
    return _DIFFICULTY_ORDER[new_idx]


def classify_concepts(document_text: str, competencies: list[dict], max_concepts: int = 3) -> list[dict]:
    """Which of the 33 known competencies does this document actually teach?"""
    truncated = document_text[:_MAX_CHARS_PER_CALL]
    competency_names = [c["name"] for c in competencies]
    prompt = f"""
Given this list of known skill competencies: {competency_names}

And this training material:
\"\"\"
{truncated}
\"\"\"

Identify the {max_concepts} competencies from the list ABOVE (use exact names from
the list, do not invent new ones) that this material most closely teaches.

Return JSON array: [{{"name": "exact competency name from the list"}}]
"""
    try:
        picks = generate_json(prompt)
        norm_map = {c["name"].strip().lower(): c for c in competencies}
        matched = []
        if isinstance(picks, list):
            for p in picks:
                if not isinstance(p, dict) or not p.get("name"):
                    continue
                raw_name = str(p["name"]).strip().lower()
                if raw_name in norm_map:
                    matched.append(norm_map[raw_name])
                else:
                    # Fuzzy / substring match against known competencies
                    for norm_cname, comp in norm_map.items():
                        if norm_cname in raw_name or raw_name in norm_cname:
                            matched.append(comp)
                            break
        
        # Deduplicate while preserving order
        seen_ids = set()
        unique_matched = []
        for m in matched:
            if m["id"] not in seen_ids:
                seen_ids.add(m["id"])
                unique_matched.append(m)

        if unique_matched:
            return unique_matched[:max_concepts]

        # Semantic keyword search against competencies if LLM didn't produce exact matches
        doc_lower = truncated.lower()
        scored_comps = []
        for c in competencies:
            overlap = 0
            for word in c["name"].lower().split():
                if len(word) > 3 and word in doc_lower:
                    overlap += 1
            if overlap > 0:
                scored_comps.append((overlap, c))
        scored_comps.sort(key=lambda x: x[0], reverse=True)
        if scored_comps:
            return [c for _, c in scored_comps[:max_concepts]]

        return [competencies[0]]
    except Exception:
        return [competencies[0]]


def generate_tagged_questions(
    document_text: str,
    concept_name: str,
    difficulty: str,
    num_questions: int = 2,
    is_remedial: bool = False,
) -> list[dict]:
    """Generates questions scoped to ONE concept at ONE difficulty from the source text."""
    truncated = document_text[:_MAX_CHARS_PER_CALL]
    difficulty_guidance = {
        "Beginner": "Test basic recall and definitions. Keep it simple and direct.",
        "Intermediate": "Test applied understanding -- how the concept is used, not just what it is.",
        "Advanced": "Test nuanced or edge-case understanding, or requires connecting multiple ideas from the material.",
    }[difficulty]

    remedial_note = (
        "This is a REMEDIATION question -- the learner just got this concept wrong. "
        "Make it clearly simpler than a normal question at this level, focused on the core idea only."
        if is_remedial else ""
    )

    prompt = f"""
You are generating assessment questions for a government official training platform.

Source material:
\"\"\"
{truncated}
\"\"\"

Generate {num_questions} multiple choice questions that test ONLY the concept:
"{concept_name}", at {difficulty} difficulty.
{difficulty_guidance}
{remedial_note}

Each question needs exactly 4 options, one correct answer, and a short explanation.

Return JSON array:
[
  {{
    "question": "...",
    "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
    "correct_option": "B",
    "explanation": "..."
  }}
]
"""
    questions = generate_json(prompt)
    if not isinstance(questions, list):
        raise ValueError("Expected a JSON array of questions from the LLM.")
    return questions


def generate_initial_quiz(document_text: str, official: dict, competencies: list[dict], scores_by_competency_id: dict) -> list[dict]:
    """
    Personalized initial question set: classify concepts in the doc, then generate
    questions at the difficulty matching the official's CURRENT score for each concept.
    Returns questions tagged with competency_id + difficulty, ready to insert into DB.
    """
    matched_concepts = classify_concepts(document_text, competencies)
    all_questions = []
    for comp in matched_concepts:
        current_score = scores_by_competency_id.get(comp["id"], 50.0)  # unknown concept defaults to mid-level
        difficulty = difficulty_from_score(current_score)
        questions = generate_tagged_questions(document_text, comp["name"], difficulty, num_questions=2)
        for q in questions:
            q["competency_id"] = comp["id"]
            q["competency_name"] = comp["name"]
            q["difficulty"] = difficulty
            q["is_remedial"] = False
        all_questions.extend(questions)
    return all_questions


def generate_remedial_batch(document_text: str, concept_name: str, competency_id: str, new_difficulty: str, num_questions: int = 2) -> list[dict]:
    """Called live when an official gets a question wrong -- easier questions, same concept."""
    questions = generate_tagged_questions(document_text, concept_name, new_difficulty, num_questions=num_questions, is_remedial=True)
    for q in questions:
        q["competency_id"] = competency_id
        q["competency_name"] = concept_name
        q["difficulty"] = new_difficulty
        q["is_remedial"] = True
    return questions


def generate_confirmation_question(document_text: str, concept_name: str, competency_id: str, difficulty: str) -> dict:
    """Called after remediation mastery -- one question climbing back toward original difficulty."""
    questions = generate_tagged_questions(document_text, concept_name, difficulty, num_questions=1, is_remedial=False)
    q = questions[0]
    q["competency_id"] = competency_id
    q["competency_name"] = concept_name
    q["difficulty"] = difficulty
    q["is_remedial"] = False
    return q


def process_answer(concept_state: dict, competency_id: str, difficulty: str, is_correct: bool) -> dict:
    """
    Pure state-transition function -- given the current per-concept state and the
    result of the latest answer, returns the updated state plus an 'action' telling
    the router what to generate next (remediate / escalate / continue / none).
    """
    state = concept_state.get(
        competency_id, {"difficulty": difficulty, "consecutive_correct": 0, "mastered": False, "in_remediation": False}
    )

    if is_correct:
        state["consecutive_correct"] += 1
        if state["in_remediation"] and state["consecutive_correct"] >= 2:
            # proved they've got the basics -- climb back up
            new_difficulty = _shift_difficulty(state["difficulty"], +1)
            state["difficulty"] = new_difficulty
            state["in_remediation"] = False
            state["consecutive_correct"] = 0
            action = "escalate"
        elif not state["in_remediation"] and state["consecutive_correct"] >= 2 and state["difficulty"] != "Advanced":
            state["difficulty"] = _shift_difficulty(state["difficulty"], +1)
            state["consecutive_correct"] = 0
            action = "escalate"
        else:
            state["mastered"] = state["difficulty"] == "Advanced" and state["consecutive_correct"] >= 1
            action = "continue"
    else:
        state["in_remediation"] = True
        state["consecutive_correct"] = 0
        state["difficulty"] = _shift_difficulty(state["difficulty"], -1)
        state["mastered"] = False
        action = "remediate"

    concept_state[competency_id] = state
    return {"concept_state": concept_state, "action": action, "new_difficulty": state["difficulty"]}


def summarize_session(concept_state: dict, competencies_by_id: dict) -> dict:
    mastered = [competencies_by_id[cid]["name"] for cid, s in concept_state.items() if s.get("mastered")]
    needs_practice = [
        competencies_by_id[cid]["name"]
        for cid, s in concept_state.items()
        if not s.get("mastered") and (s.get("in_remediation") or s["difficulty"] == "Beginner")
    ]
    return {"concepts_mastered": mastered, "concepts_needing_practice": needs_practice}
