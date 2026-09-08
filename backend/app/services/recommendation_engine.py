"""
Recommends training for an official's top skill gaps.

Pipeline:
  1. Pull the unified course pool via the TrainingSource adapter (iGOT + NSSTA
     merged -- each item already carries a `source` tag, see igot_connector.py).
  2. Embed each gap competency and each course description locally (free,
     no API calls -- see embedding_service.py).
  3. Cosine-similarity shortlist top-N candidates per gap.
  4. One Gemini call re-ranks the shortlist and writes a short human-readable
     "why this was recommended" reason, considering department priorities /
     career progression context from the profile.
"""
from app.services.igot_connector import get_training_source
from app.services.embedding_service import embed_text, embed_batch, cosine_similarity
from app.services.gemini_service import generate_json

_TOP_GAPS_TO_ADDRESS = 5
_SHORTLIST_PER_GAP = 6
_FINAL_RECS_PER_GAP = 2


def recommend_for_official(official: dict, gap_analysis: list[dict]) -> list[dict]:
    catalogue = get_training_source().get_catalogue()
    if not catalogue:
        return []

    course_texts = [f"{c['title']}. {c.get('description', '')}" for c in catalogue]
    course_embeddings = embed_batch(course_texts)

    top_gaps = sorted(gap_analysis, key=lambda g: g["gap"], reverse=True)[:_TOP_GAPS_TO_ADDRESS]

    all_recommendations = []
    for gap in top_gaps:
        if gap["gap"] <= 0:
            continue

        gap_text = f"{gap['domain']} competency: {gap['name']}"
        gap_embedding = embed_text(gap_text)

        scored = [
            (cosine_similarity(gap_embedding, course_embeddings[i]), catalogue[i])
            for i in range(len(catalogue))
        ]
        scored.sort(key=lambda x: x[0], reverse=True)
        shortlist = scored[:_SHORTLIST_PER_GAP]

        # LLM re-rank + reason generation for this gap's shortlist
        prompt = f"""
Official: {official.get('designation')} in {official.get('department')},
{official.get('experience_years')} years experience.
Skill gap to address: {gap['name']} (domain: {gap['domain']}, current score {gap['score']}/100).

Candidate training options (mix of iGOT courses and NSSTA programmes):
{[{"title": c["title"], "source": c.get("source", "iGOT"), "level": c.get("level")} for _, c in shortlist]}

Pick the best {_FINAL_RECS_PER_GAP} options for this official and, for each, write a
one-sentence reason (max 20 words) tailored to their role and experience level.

Return JSON array: [{{"title": "...", "reason": "..."}}]
"""
        try:
            picks = generate_json(prompt)
        except Exception:
            # fallback: just take top similarity results with a generic reason
            picks = [{"title": c["title"], "reason": f"Closes your {gap['name']} gap."} for _, c in shortlist[:_FINAL_RECS_PER_GAP]]

        title_to_course = {c["title"]: c for _, c in shortlist}
        title_to_score = {c["title"]: s for s, c in shortlist}
        for pick in picks:
            course = title_to_course.get(pick.get("title"))
            if not course:
                continue
            all_recommendations.append(
                {
                    "title": course["title"],
                    "domain": course.get("domain"),
                    "source": course.get("source", "iGOT"),   # merged pool: iGOT or NSSTA, per user's scope decision
                    "duration_hrs": course.get("duration_hrs"),
                    "url": course.get("url"),                 # placeholder link -- swap for real iGOT/NSSTA URL when API access exists
                    "reason": pick.get("reason", ""),
                    "score": round(title_to_score.get(pick["title"], 0.0), 3),
                    "addresses_gap": gap["name"],
                }
            )

    return all_recommendations
