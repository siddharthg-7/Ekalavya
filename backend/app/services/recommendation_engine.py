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

    top_gaps = [g for g in sorted(gap_analysis, key=lambda g: g["gap"], reverse=True) if g["gap"] > 0][:_TOP_GAPS_TO_ADDRESS]

    gap_matches = []
    candidates_to_explain = []

    for gap in top_gaps:
        gap_text = f"{gap['domain']} competency: {gap['name']}"
        gap_embedding = embed_text(gap_text)

        scored = [
            (cosine_similarity(gap_embedding, course_embeddings[i]), catalogue[i])
            for i in range(len(catalogue))
        ]
        scored.sort(key=lambda x: x[0], reverse=True)
        top_picks = scored[:_FINAL_RECS_PER_GAP]

        for s, c in top_picks:
            gap_matches.append((gap, s, c))
            candidates_to_explain.append({"title": c["title"], "source": c.get("source", "iGOT"), "addresses_gap": gap["name"]})

    # One single LLM call for all shortlisted courses
    prompt = f"""
Official: {official.get('designation', 'Officer')} in {official.get('department', 'MoSPI')},
{official.get('experience_years', 5)} years experience.

Recommended courses:
{candidates_to_explain}

For each course, write a one-sentence reason (max 20 words) explaining why it was recommended for this official.
Return JSON array: [{{"title": "...", "reason": "..."}}]
"""
    try:
        picks = generate_json(prompt)
        reason_map = {p.get("title"): p.get("reason") for p in picks if isinstance(p, dict)}
    except Exception:
        reason_map = {}

    all_recommendations = []
    for gap, score, course in gap_matches:
        default_reason = f"Directly bridges your {gap['name']} gap for your role in {official.get('department', 'MoSPI')}."
        all_recommendations.append(
            {
                "title": course["title"],
                "domain": course.get("domain"),
                "source": course.get("source", "iGOT"),
                "duration_hrs": course.get("duration_hrs"),
                "url": course.get("url"),
                "reason": reason_map.get(course["title"]) or default_reason,
                "score": round(score, 3),
                "addresses_gap": gap["name"],
            }
        )

    return all_recommendations
