from fastapi import APIRouter, HTTPException
from app.database import fetch_all, fetch_one, execute
from app.schemas import OfficialCreate
from app.services.competency_engine import compute_gap_analysis

router = APIRouter(prefix="/officials", tags=["officials"])


@router.get("")
def list_officials():
    """Powers the profile-picker on the frontend (no real auth for the demo)."""
    return fetch_all("SELECT id, name, designation, department FROM officials ORDER BY name")


@router.post("")
def create_official(payload: OfficialCreate):
    row = execute(
        """
        INSERT INTO officials (name, designation, department, job_role, education,
                                experience_years, past_trainings, role)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING *
        """,
        (
            payload.name, payload.designation, payload.department, payload.job_role,
            payload.education, payload.experience_years, payload.past_trainings, payload.role,
        ),
    )
    return row


@router.get("/{official_id}")
def get_official(official_id: str):
    official = fetch_one("SELECT * FROM officials WHERE id = %s", (official_id,))
    if not official:
        raise HTTPException(status_code=404, detail="Official not found")
    return official


@router.get("/{official_id}/competency-gaps")
def get_competency_gaps(official_id: str):
    official = fetch_one("SELECT * FROM officials WHERE id = %s", (official_id,))
    if not official:
        raise HTTPException(status_code=404, detail="Official not found")

    competencies = fetch_all("SELECT * FROM competencies")
    score_rows = fetch_all(
        "SELECT competency_id, score, target_score FROM competency_scores WHERE official_id = %s", (official_id,)
    )
    existing_scores = {str(r["competency_id"]): float(r["score"]) for r in score_rows}
    gaps = compute_gap_analysis(official, competencies, existing_scores=existing_scores)

    for g in gaps:
        cid_str = str(g["competency_id"])
        if cid_str not in existing_scores:
            execute(
                """
                INSERT INTO competency_scores (official_id, competency_id, score, target_score)
                VALUES (%s, %s, %s, %s)
                ON CONFLICT (official_id, competency_id)
                DO NOTHING
                """,
                (official_id, g["competency_id"], g["score"], g["target_score"]),
            )

    return gaps
