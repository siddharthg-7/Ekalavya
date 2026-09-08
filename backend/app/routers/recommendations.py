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
    gap_analysis = compute_gap_analysis(official, competencies)

    recs = recommend_for_official(official, gap_analysis)
    return {"official_id": official_id, "recommendations": recs}
