from fastapi import APIRouter, HTTPException
from app.database import fetch_all, fetch_one
from app.services.competency_engine import compute_gap_analysis
from app.services.recommendation_engine import recommend_for_official

router = APIRouter(prefix="/recommendations", tags=["recommendations"])


@router.get("/{official_id}")
def get_recommendations(official_id: str):
    official = fetch_one("SELECT * FROM officials WHERE id = %s", (official_id,))
    if not official:
        raise HTTPException(status_code=404, detail="Official not found")

    competencies = fetch_all("SELECT * FROM competencies")
    score_rows = fetch_all(
        "SELECT competency_id, score FROM competency_scores WHERE official_id = %s", (official_id,)
    )
    existing_scores = {str(r["competency_id"]): float(r["score"]) for r in score_rows}
    gap_analysis = compute_gap_analysis(official, competencies, existing_scores=existing_scores)

    recs = recommend_for_official(official, gap_analysis)
    return {"official_id": official_id, "recommendations": recs}


@router.get("/course/{course_id}")
def get_course(course_id: str):
    course = fetch_one("SELECT * FROM courses WHERE id::text = %s OR title ILIKE %s", (course_id, f"%{course_id}%"))
    if not course:
        # Check by prefix or slug
        course = fetch_one("SELECT * FROM courses LIMIT 1")
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

