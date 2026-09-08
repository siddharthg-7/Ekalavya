import json
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.database import fetch_all, fetch_one, execute
from app.services.doc_parser import extract_text
from app.services import quiz_engine
from app.schemas import AnswerRequest, AnswerResponse

router = APIRouter(prefix="/quiz", tags=["quiz"])


def _insert_questions(quiz_id: str, questions: list[dict]) -> list[dict]:
    rows = []
    for q in questions:
        row = execute(
            """
            INSERT INTO quiz_questions (quiz_id, competency_id, difficulty, is_remedial,
                                         question, options, correct_option, explanation)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING *
            """,
            (
                quiz_id, q["competency_id"], q["difficulty"], q["is_remedial"],
                q["question"], json.dumps(q["options"]), q["correct_option"], q["explanation"],
            ),
        )
        rows.append(row)
    return rows


@router.post("/generate")
async def generate_quiz(file: UploadFile = File(...), official_id: str = Form(...)):
    if not file.filename.lower().endswith((".pdf", ".pptx")):
        raise HTTPException(status_code=400, detail="Only PDF and PPTX are supported in MVP.")

    file_bytes = await file.read()
    try:
        text = extract_text(file_bytes, file.filename)
        if not text.strip():
            raise HTTPException(status_code=422, detail="Could not extract any text from the file.")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    official = fetch_one("SELECT * FROM officials WHERE id = %s", (official_id,))
    if not official:
        raise HTTPException(status_code=404, detail="Official not found")

    competencies = fetch_all("SELECT * FROM competencies")
    score_rows = fetch_all(
        "SELECT competency_id, score FROM competency_scores WHERE official_id = %s", (official_id,)
    )
    scores_by_competency_id = {r["competency_id"]: float(r["score"]) for r in score_rows}

    try:
        questions = quiz_engine.generate_initial_quiz(text, official, competencies, scores_by_competency_id)
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Question generation failed: {e}")

    material = execute(
        "INSERT INTO learning_materials (uploaded_by, file_name, extracted_text) VALUES (%s, %s, %s) RETURNING *",
        (official_id, file.filename, text[:8000]),
    )
    quiz = execute(
        "INSERT INTO quizzes (material_id, official_id, title) VALUES (%s, %s, %s) RETURNING *",
        (material["id"], official_id, f"Quiz: {file.filename}"),
    )

    question_rows = _insert_questions(quiz["id"], questions)
    question_ids = [str(r["id"]) for r in question_rows]

    concept_state = {}
    for q in questions:
        cid = str(q["competency_id"])
        if cid not in concept_state:
            concept_state[cid] = {
                "difficulty": q["difficulty"], "consecutive_correct": 0,
                "mastered": False, "in_remediation": False,
            }

    session = execute(
        """
        INSERT INTO quiz_sessions (quiz_id, official_id, concept_state, queue, status)
        VALUES (%s, %s, %s, %s, 'in_progress')
        RETURNING *
        """,
        (quiz["id"], official_id, json.dumps(concept_state), json.dumps(question_ids)),
    )

    return {
        "quiz_id": str(quiz["id"]),
        "session_id": str(session["id"]),
        "title": quiz["title"],
        "total_questions_queued": len(question_ids),
    }


@router.get("/session/{session_id}/next")
def get_next_question(session_id: str):
    session = fetch_one("SELECT * FROM quiz_sessions WHERE id = %s", (session_id,))
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    queue = session["queue"]
    if session["status"] == "completed" or not queue:
        return {"status": "completed"}

    next_id = queue[0]
    q = fetch_one(
        """
        SELECT qq.*, c.name AS competency_name
        FROM quiz_questions qq JOIN competencies c ON c.id = qq.competency_id
        WHERE qq.id = %s
        """,
        (next_id,),
    )
    if not q:
        raise HTTPException(status_code=404, detail="Question not found")

    return {
        "status": "in_progress",
        "question_id": str(q["id"]),
        "question": q["question"],
        "options": q["options"],
        "competency_name": q["competency_name"],
        "difficulty": q["difficulty"],
        "is_remedial": q["is_remedial"],
    }


@router.post("/session/answer", response_model=AnswerResponse)
def submit_answer(payload: AnswerRequest):
    session = fetch_one("SELECT * FROM quiz_sessions WHERE id = %s", (payload.session_id,))
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    question = fetch_one(
        """
        SELECT qq.*, c.name AS competency_name
        FROM quiz_questions qq JOIN competencies c ON c.id = qq.competency_id
        WHERE qq.id = %s
        """,
        (payload.question_id,),
    )
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")

    concept_name = question["competency_name"]
    is_correct = payload.selected_option == question["correct_option"]

    execute(
        """
        INSERT INTO question_attempts (session_id, question_id, official_id, competency_id,
                                        difficulty, selected_option, is_correct)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """,
        (
            payload.session_id, payload.question_id, session["official_id"],
            question["competency_id"], question["difficulty"], payload.selected_option, is_correct,
        ),
    )

    concept_state = session["concept_state"]
    result = quiz_engine.process_answer(
        concept_state, str(question["competency_id"]), question["difficulty"], is_correct
    )
    concept_state = result["concept_state"]
    action = result["action"]
    new_difficulty = result["new_difficulty"]

    queue = [qid for qid in session["queue"] if qid != payload.question_id]

    quiz_row = fetch_one("SELECT material_id FROM quizzes WHERE id = %s", (question["quiz_id"],))
    material = fetch_one("SELECT extracted_text FROM learning_materials WHERE id = %s", (quiz_row["material_id"],))
    document_text = material["extracted_text"] if material else ""

    if action == "remediate":
        new_qs = quiz_engine.generate_remedial_batch(document_text, concept_name, question["competency_id"], new_difficulty)
        rows = _insert_questions(question["quiz_id"], new_qs)
        queue = [str(r["id"]) for r in rows] + queue
    elif action == "escalate":
        confirm_q = quiz_engine.generate_confirmation_question(document_text, concept_name, question["competency_id"], new_difficulty)
        rows = _insert_questions(question["quiz_id"], [confirm_q])
        queue = [str(rows[0]["id"])] + queue

    session_status = "in_progress" if queue else "completed"
    execute(
        """
        UPDATE quiz_sessions SET concept_state = %s, queue = %s, status = %s,
               completed_at = CASE WHEN %s = 'completed' THEN now() ELSE completed_at END
        WHERE id = %s
        """,
        (json.dumps(concept_state), json.dumps(queue), session_status, session_status, payload.session_id),
    )

    if session_status == "completed":
        _finalize_session(payload.session_id, session["official_id"], question["quiz_id"], concept_state)

    return AnswerResponse(
        is_correct=is_correct,
        correct_option=question["correct_option"],
        explanation=question["explanation"],
        action=action if session_status == "in_progress" else "session_complete",
        concept_name=concept_name,
        new_difficulty=new_difficulty,
        session_status=session_status,
    )


@router.get("/session/{session_id}/summary")
def get_session_summary(session_id: str):
    attempt = fetch_one("SELECT * FROM quiz_attempts WHERE session_id = %s", (session_id,))
    if not attempt:
        raise HTTPException(status_code=404, detail="Summary not available yet -- session may still be in progress.")
    return attempt


def _finalize_session(session_id: str, official_id: str, quiz_id: str, concept_state: dict):
    competencies = {str(c["id"]): c for c in fetch_all("SELECT * FROM competencies")}
    summary = quiz_engine.summarize_session(concept_state, competencies)

    attempts = fetch_all("SELECT is_correct FROM question_attempts WHERE session_id = %s", (session_id,))
    total = len(attempts)
    correct = sum(1 for a in attempts if a["is_correct"])

    execute(
        """
        INSERT INTO quiz_attempts (quiz_id, session_id, official_id, score, total,
                                    concepts_mastered, concepts_needing_practice)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """,
        (quiz_id, session_id, official_id, correct, total,
         summary["concepts_mastered"], summary["concepts_needing_practice"]),
    )

    for competency_id, state in concept_state.items():
        if state.get("mastered"):
            existing = fetch_one(
                "SELECT score FROM competency_scores WHERE official_id = %s AND competency_id = %s",
                (official_id, competency_id),
            )
            current_score = float(existing["score"]) if existing else 50.0
            new_score = min(current_score + 10, 95)
            execute(
                """
                INSERT INTO competency_scores (official_id, competency_id, score, target_score)
                VALUES (%s, %s, %s, 80)
                ON CONFLICT (official_id, competency_id)
                DO UPDATE SET score = EXCLUDED.score, updated_at = now()
                """,
                (official_id, competency_id, new_score),
            )
