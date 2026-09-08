from fastapi import APIRouter, HTTPException
from app.database import fetch_all, fetch_one

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/learner/{official_id}")
def learner_dashboard(official_id: str):
    official = fetch_one("SELECT * FROM officials WHERE id = %s", (official_id,))
    if not official:
        raise HTTPException(status_code=404, detail="Official not found")

    scores = fetch_all(
        """
        SELECT cs.*, c.domain, c.name AS competency_name
        FROM competency_scores cs
        JOIN competencies c ON c.id = cs.competency_id
        WHERE cs.official_id = %s
        """,
        (official_id,),
    )

    attempts = fetch_all(
        "SELECT * FROM quiz_attempts WHERE official_id = %s ORDER BY taken_at DESC",
        (official_id,),
    )

    return {"official": official, "competency_scores": scores, "quiz_attempts": attempts}


@router.get("/admin")
def admin_dashboard():
    """
    Org-wide view: competency distribution + a simple trend-based projection
    (NOT a trained forecasting model -- honestly scoped for MVP).
    """
    rows = fetch_all(
        """
        SELECT c.domain, cs.score, cs.target_score
        FROM competency_scores cs
        JOIN competencies c ON c.id = cs.competency_id
        """
    )

    domain_gap_totals: dict[str, float] = {}
    domain_counts: dict[str, int] = {}
    for row in rows:
        domain = row["domain"]
        gap = max(row["target_score"] - row["score"], 0)
        domain_gap_totals[domain] = domain_gap_totals.get(domain, 0) + float(gap)
        domain_counts[domain] = domain_counts.get(domain, 0) + 1

    avg_gap_by_domain = {
        d: round(domain_gap_totals[d] / domain_counts[d], 1) for d in domain_gap_totals
    }
    projected_priority = sorted(avg_gap_by_domain.items(), key=lambda x: x[1], reverse=True)

    total_officials = fetch_one("SELECT count(*) AS count FROM officials")["count"]

    return {
        "total_officials": total_officials,
        "avg_gap_by_domain": avg_gap_by_domain,
        "projected_training_priority": [d for d, _ in projected_priority],
    }
