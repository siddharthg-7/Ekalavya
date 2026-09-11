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


def classify_concepts(document_text: str, competencies: list[dict], max_concepts: int = 2) -> list[dict]:
    """Which of the 33 known competencies does this document actually teach?"""
    # 1. High-speed keyword overlap check (instant 0ms)
    doc_lower = document_text[:12000].lower()
    scored_comps = []
    for c in competencies:
        overlap = 0
        cname_words = [w for w in c["name"].lower().split() if len(w) > 3]
        for word in cname_words:
            if word in doc_lower:
                overlap += 1
        if overlap > 0:
            scored_comps.append((overlap, c))
    scored_comps.sort(key=lambda x: x[0], reverse=True)
    if scored_comps and scored_comps[0][0] >= 2:
        return [c for _, c in scored_comps[:max_concepts]]

    # 2. LLM classification fallback if keywords are sparse
    truncated = document_text[:6000]
    competency_names = [c["name"] for c in competencies]
    prompt = f"""
Given this list of known skill competencies: {competency_names}

And this training material:
\"\"\"
{truncated}
\"\"\"

Identify the {max_concepts} competencies from the list ABOVE that this material most closely teaches.
Return JSON array: [{{"name": "exact competency name from the list"}}]
"""
    try:
        picks = generate_json(prompt)
        norm_map = {c["name"].strip().lower(): c for c in competencies}
        matched = []
        if isinstance(picks, list):
            for p in picks:
                if isinstance(p, dict) and p.get("name"):
                    raw = str(p["name"]).strip().lower()
                    if raw in norm_map:
                        matched.append(norm_map[raw])
        if matched:
            return matched[:max_concepts]
    except Exception:
        pass

    if scored_comps:
        return [c for _, c in scored_comps[:max_concepts]]
    return competencies[:max_concepts]


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
    try:
        questions = generate_json(prompt)
        if isinstance(questions, list) and len(questions) > 0:
            return questions
    except Exception:
        pass

    # Robust fallback when LLM API is rate-limited or offline
    return get_fallback_questions(concept_name, difficulty, num_questions, is_remedial)


def get_fallback_questions(concept_name: str, difficulty: str, num_questions: int = 2, is_remedial: bool = False) -> list[dict]:
    fallback_pool = [
        {
            "question": f"In official statistics regarding {concept_name}, what is the primary methodology applied for data validation?",
            "options": [
                f"A) Standardized variance estimation and quality control checks for {concept_name}",
                "B) Random selection without sampling weights",
                "C) Manual entry without audit logging",
                "D) Direct replacement with static benchmark defaults"
            ],
            "correct_option": "A",
            "explanation": f"Statistical standards for {concept_name} require rigorous validation and standardized variance estimation."
        },
        {
            "question": f"When evaluating {concept_name} within government surveys, which metric provides the most reliable measurement?",
            "options": [
                f"A) Weighted point estimate with standard error calculation",
                "B) Unweighted raw sample mean",
                "C) Maximum outlier value",
                "D) Arbitrary administrative threshold"
            ],
            "correct_option": "A",
            "explanation": f"Survey methodology for {concept_name} relies on weighted estimates accompanied by standard error bounds."
        }
    ]
    return fallback_pool[:num_questions]


def generate_initial_quiz(document_text: str, official: dict, competencies: list[dict], scores_by_competency_id: dict) -> list[dict]:
    """
    Personalized initial question set: classifies top concepts and generates all questions
    in a SINGLE fast LLM call (or instant fallbacks) to return within 3-4 seconds.
    """
    matched_concepts = classify_concepts(document_text, competencies, max_concepts=2)
    concept_specs = []
    for comp in matched_concepts:
        cid_str = str(comp["id"])
        current_score = scores_by_competency_id.get(cid_str)
        if current_score is None:
            current_score = scores_by_competency_id.get(comp["id"], 50.0)
        difficulty = difficulty_from_score(float(current_score))
        concept_specs.append({
            "id": comp["id"],
            "name": comp["name"],
            "difficulty": difficulty
        })

    truncated = document_text[:8000]
    specs_desc = "\n".join([f"- Concept: \"{s['name']}\" (Difficulty: {s['difficulty']})" for s in concept_specs])

    prompt = f"""
You are an expert assessment creator for the National Statistical System Training Academy (NSSTA).
Source Material:
\"\"\"
{truncated}
\"\"\"

Generate 2 multiple choice questions for EACH of these concepts based strictly on the source material:
{specs_desc}

Requirements:
1. Provide exactly 4 options per question (A, B, C, D), specify correct_option letter, and a concise explanation.
2. Return a JSON array:
[
  {{
    "concept_name": "exact concept name",
    "question": "...",
    "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
    "correct_option": "A",
    "explanation": "..."
  }}
]
"""
    all_questions = []
    try:
        raw_questions = generate_json(prompt)
        if isinstance(raw_questions, list) and len(raw_questions) >= 2:
            spec_map = {s["name"].lower(): s for s in concept_specs}
            for q in raw_questions:
                if not isinstance(q, dict) or "question" not in q or "options" not in q:
                    continue
                q_concept_name = str(q.get("concept_name", "")).strip().lower()
                matched_spec = spec_map.get(q_concept_name)
                if not matched_spec:
                    for name_key, s in spec_map.items():
                        if name_key in q_concept_name or q_concept_name in name_key:
                            matched_spec = s
                            break
                if not matched_spec:
                    matched_spec = concept_specs[0]

                options = q.get("options", [])
                if not isinstance(options, list) or len(options) != 4:
                    options = [f"A) {q['question']}", "B) Alternative method", "C) Null effect", "D) Empirical baseline"]

                all_questions.append({
                    "question": q["question"],
                    "options": options,
                    "correct_option": str(q.get("correct_option", "A")).strip().upper()[:1] or "A",
                    "explanation": q.get("explanation", f"Standard testing for {matched_spec['name']}."),
                    "competency_id": matched_spec["id"],
                    "competency_name": matched_spec["name"],
                    "difficulty": matched_spec["difficulty"],
                    "is_remedial": False,
                })
    except Exception:
        pass

    if not all_questions:
        for s in concept_specs:
            fallback = get_fallback_questions(s["name"], s["difficulty"], num_questions=2)
            for q in fallback:
                q["competency_id"] = s["id"]
                q["competency_name"] = s["name"]
                q["difficulty"] = s["difficulty"]
                q["is_remedial"] = False
                all_questions.append(q)

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
