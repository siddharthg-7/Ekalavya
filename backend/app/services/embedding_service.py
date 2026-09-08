"""
Embeddings for semantic matching between competency gaps and course descriptions.

Using a local sentence-transformers model (all-MiniLM-L6-v2, 384-dim, free,
no API calls) rather than Gemini's embedding API -- this runs a LOT during
recommendation generation and dev/testing, and there's no reason to spend
Gemini free-tier quota on it. Gemini is reserved for the reasoning/generation
calls (gap analysis, re-ranking, MCQ generation) where it actually adds value.
"""
from sentence_transformers import SentenceTransformer
import numpy as np

_model: SentenceTransformer | None = None


def _get_model() -> SentenceTransformer:
    global _model
    if _model is None:
        _model = SentenceTransformer("all-MiniLM-L6-v2")
    return _model


def embed_text(text: str) -> list[float]:
    vec = _get_model().encode(text, normalize_embeddings=True)
    return vec.tolist()


def embed_batch(texts: list[str]) -> list[list[float]]:
    vecs = _get_model().encode(texts, normalize_embeddings=True)
    return [v.tolist() for v in vecs]


def cosine_similarity(a: list[float], b: list[float]) -> float:
    a_arr, b_arr = np.array(a), np.array(b)
    return float(np.dot(a_arr, b_arr))
