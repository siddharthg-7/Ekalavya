"""
Turns an official's profile into competency scores and gap analysis.

Two-stage approach (fast + explainable, good for a demo):
  1. Rule-based baseline: infer a starting score per competency from job role,
     department, past trainings, and experience (simple heuristic scoring).
  2. LLM refinement: Gemini reviews the baseline + free-text profile fields
     and nudges scores / adds a short rationale, catching nuance the rules miss
     (e.g. a "Deputy Director, National Accounts" implies strong Statistical
     competency even without an exact past-training match).
"""
from app.services.gemini_service import generate_json


def baseline_score(official: dict, competency: dict) -> float:
    """Simple heuristic: 0-100 score seeded from role/department/past trainings."""
    score = 20.0  # everyone starts with a small baseline

    role_text = f"{official.get('job_role', '')} {official.get('designation', '')}".lower()
    dept_text = official.get("department", "").lower()
    comp_name = competency["name"].lower()
    comp_domain = competency["domain"].lower()

    if comp_name in role_text or comp_name in dept_text:
        score += 35

    for past in official.get("past_trainings", []) or []:
        if comp_name in past.lower():
            score += 30
            break

    experience = official.get("experience_years") or 0
    if comp_domain == "statistical" and experience >= 5:
        score += 10

    return min(score, 100.0)


def compute_gap_analysis(official: dict, competencies: list[dict]) -> list[dict]:
    """Returns list of {competency, score, target_score, gap, rationale}."""
    baseline_results = []
    for comp in competencies:
        score = baseline_score(official, comp)
        target = 80.0  # flat target for MVP; could vary by seniority later
        baseline_results.append(
            {
                "competency_id": comp["id"],
                "domain": comp["domain"],
                "name": comp["name"],
                "score": score,
                "target_score": target,
                "gap": max(target - score, 0),
            }
        )

    # LLM refinement pass -- ask Gemini to sanity-check the biggest gaps only,
    # to keep this fast and within free-tier quota during a live demo.
    top_gaps = sorted(baseline_results, key=lambda r: r["gap"], reverse=True)[:8]
    prompt = f"""
You are reviewing a rule-based competency gap estimate for a government official
in India's Official Statistics system.

Official profile: {official}

Top estimated gaps (rule-based): {top_gaps}

For each item, return a short one-sentence rationale (max 20 words) explaining
whether this gap estimate seems reasonable given the profile, and an adjusted
score (0-100) if you think the rule-based estimate is clearly off.

Return a JSON array of objects: [{{"name": "...", "adjusted_score": 0-100, "rationale": "..."}}]
"""
    try:
        refinements = generate_json(prompt)
        refinement_map = {r["name"]: r for r in refinements} if isinstance(refinements, list) else {}
    except Exception:
        refinement_map = {}  # fall back to pure rule-based silently -- don't break the demo

    for r in baseline_results:
        ref = refinement_map.get(r["name"])
        if ref:
            r["score"] = ref.get("adjusted_score", r["score"])
            r["gap"] = max(r["target_score"] - r["score"], 0)
            r["rationale"] = ref.get("rationale", "")
        else:
            r["rationale"] = ""

    return baseline_results
