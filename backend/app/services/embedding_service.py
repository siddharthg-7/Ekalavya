"""
Embeddings for semantic matching between competency gaps and course descriptions.

Uses a zero-dependency, lightweight feature-hashing vectorizer by default
to avoid Out-Of-Memory (OOM) crashes on memory-constrained hosting (e.g. Render 512MB free tier),
with optional sentence-transformers fallback if available.
"""
import math
import re
import logging

logger = logging.getLogger(__name__)

_st_model = None
_st_attempted = False


def _init_st_model():
    global _st_model, _st_attempted
    if _st_attempted:
        return
    _st_attempted = True
    try:
        from sentence_transformers import SentenceTransformer
        _st_model = SentenceTransformer("all-MiniLM-L6-v2")
    except Exception as e:
        logger.info("SentenceTransformer not loaded; using lightweight feature-hashing vectorizer: %s", e)


def tokenize(text: str) -> list[str]:
    return [w for w in re.findall(r'\w+', text.lower()) if len(w) > 2]


def embed_text(text: str) -> list[float]:
    _init_st_model()
    if _st_model is not None:
        try:
            vec = _st_model.encode(text, normalize_embeddings=True)
            return vec.tolist()
        except Exception as e:
            logger.warning("SentenceTransformer encoding failed: %s", e)

    # 128-dimensional normalized feature hashing vectorizer (0MB memory, ultra-fast)
    dim = 128
    vec = [0.0] * dim
    tokens = tokenize(text)
    if not tokens:
        return vec
    for tok in tokens:
        idx = abs(hash(tok)) % dim
        vec[idx] += 1.0
    norm = math.sqrt(sum(v * v for v in vec)) or 1.0
    return [v / norm for v in vec]


def embed_batch(texts: list[str]) -> list[list[float]]:
    return [embed_text(t) for t in texts]


def cosine_similarity(a: list[float], b: list[float]) -> float:
    if len(a) != len(b):
        min_len = min(len(a), len(b))
        a = a[:min_len]
        b = b[:min_len]
    return float(sum(x * y for x, y in zip(a, b)))
