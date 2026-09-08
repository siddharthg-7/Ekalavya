"""
Thin wrapper around Gemini (primary, free tier) with a Groq fallback
(also free tier) in case Gemini rate-limits mid-demo. Supports both
official google.genai and legacy google.generativeai SDKs.
"""
import json
import logging
from app.config import settings

logger = logging.getLogger(__name__)

_genai_client = None
_legacy_model = None
_initialized = False


def _init_clients():
    global _genai_client, _legacy_model, _initialized
    if _initialized:
        return
    _initialized = True

    api_key = settings.GEMINI_API_KEY or None

    # 1. Try modern official google.genai SDK
    try:
        from google import genai
        _genai_client = genai.Client(api_key=api_key or "DUMMY_KEY")
    except ImportError:
        pass

    # 2. Try legacy google.generativeai SDK
    try:
        import google.generativeai as legacy_genai
        if api_key:
            legacy_genai.configure(api_key=api_key)
        _legacy_model = legacy_genai.GenerativeModel(settings.GEMINI_MODEL)
    except ImportError:
        pass


def generate_text(prompt: str) -> str:
    _init_clients()
    if _genai_client and settings.GEMINI_API_KEY:
        try:
            resp = _genai_client.models.generate_content(
                model=settings.GEMINI_MODEL,
                contents=prompt,
            )
            return resp.text or ""
        except Exception as e:
            logger.warning("google.genai error, attempting fallback: %s", e)
            return _groq_fallback(prompt, e)
    elif _legacy_model and settings.GEMINI_API_KEY:
        try:
            resp = _legacy_model.generate_content(prompt)
            return resp.text or ""
        except Exception as e:
            logger.warning("google.generativeai error, attempting fallback: %s", e)
            return _groq_fallback(prompt, e)
    else:
        return _groq_fallback(prompt, Exception("GEMINI_API_KEY not set"))


def generate_json(prompt: str) -> dict | list:
    """Ask for strict JSON, parse it, retry once with a stricter reminder on failure."""
    strict_prompt = (
        prompt
        + "\n\nRespond with ONLY valid JSON. No markdown fences, no commentary, no preamble."
    )
    raw = generate_text(strict_prompt)
    cleaned = raw.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        retry_raw = generate_text(
            strict_prompt + "\n\nYour previous response was not valid JSON. Try again, JSON ONLY."
        )
        retry_cleaned = (
            retry_raw.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
        )
        try:
            return json.loads(retry_cleaned)
        except json.JSONDecodeError:
            return []


def generate_from_document(file_bytes: bytes, mime_type: str, prompt: str) -> str:
    """Multimodal call -- feed a PDF/PPT directly to Gemini (used for MCQ generation)."""
    _init_clients()
    if _genai_client and settings.GEMINI_API_KEY:
        try:
            from google.genai import types
            part = types.Part.from_bytes(data=file_bytes, mime_type=mime_type)
            resp = _genai_client.models.generate_content(
                model=settings.GEMINI_MODEL,
                contents=[part, prompt]
            )
            return resp.text or ""
        except Exception as e:
            raise RuntimeError(f"Gemini document generation failed: {e}")
    elif _legacy_model and settings.GEMINI_API_KEY:
        try:
            file_part = {"mime_type": mime_type, "data": file_bytes}
            resp = _legacy_model.generate_content([prompt, file_part])
            return resp.text or ""
        except Exception as e:
            raise RuntimeError(f"Legacy Gemini document generation failed: {e}")
    else:
        raise RuntimeError("Gemini API key not configured for document generation.")


def _groq_fallback(prompt: str, original_error: Exception) -> str:
    if settings.GROQ_API_KEY:
        try:
            from groq import Groq
            client = Groq(api_key=settings.GROQ_API_KEY)
            resp = client.chat.completions.create(
                model=settings.GROQ_MODEL,
                messages=[{"role": "user", "content": prompt}],
            )
            return resp.choices[0].message.content or ""
        except Exception as fallback_error:
            logger.warning("Groq fallback error: %s", fallback_error)

    # Safe fallback if running without LLM API keys in offline/sandbox demo
    if "JSON" in prompt:
        return '[]'
    return f"Simulated evaluation rationale (Offline mode: {original_error})"

