"""
Extracts text from uploaded learning materials.
MVP scope: PDF and PPTX only.
Supports pdfplumber, pypdf, and pymupdf (fitz) with automatic fallbacks.
"""
import io
import logging

logger = logging.getLogger(__name__)


def extract_text(file_bytes: bytes, filename: str) -> str:
    ext = filename.lower().rsplit(".", 1)[-1]
    if ext == "pdf":
        return _extract_pdf(file_bytes)
    elif ext in ("pptx",):
        return _extract_pptx(file_bytes)
    else:
        raise ValueError(
            f"Unsupported file type '.{ext}'. MVP supports PDF and PPTX only."
        )


def _extract_pdf(file_bytes: bytes) -> str:
    # 1. Try pdfplumber
    try:
        import pdfplumber
        text_parts = []
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text_parts.append(page_text)
        if text_parts:
            return "\n\n".join(text_parts)
    except ImportError:
        pass
    except Exception as e:
        logger.warning("pdfplumber extraction failed: %s", e)

    # 2. Try pypdf
    try:
        from pypdf import PdfReader
        reader = PdfReader(io.BytesIO(file_bytes))
        text_parts = []
        for page in reader.pages:
            t = page.extract_text()
            if t:
                text_parts.append(t)
        if text_parts:
            return "\n\n".join(text_parts)
    except ImportError:
        pass
    except Exception as e:
        logger.warning("pypdf extraction failed: %s", e)

    # 3. Try pymupdf (fitz)
    try:
        import fitz
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        text_parts = []
        for page in doc:
            t = page.get_text()
            if t:
                text_parts.append(t)
        if text_parts:
            return "\n\n".join(text_parts)
    except ImportError:
        pass
    except Exception as e:
        logger.warning("pymupdf extraction failed: %s", e)

    # Fallback to UTF-8 decoded snippet if plain text or raw stream
    try:
        decoded = file_bytes.decode("utf-8", errors="ignore")
        if len(decoded.strip()) > 50:
            return decoded[:10000]
    except Exception:
        pass

    return ""


def _extract_pptx(file_bytes: bytes) -> str:
    try:
        from pptx import Presentation
        text_parts = []
        prs = Presentation(io.BytesIO(file_bytes))
        for slide in prs.slides:
            for shape in slide.shapes:
                if shape.has_text_frame:
                    slide_text = "\n".join(p.text for p in shape.text_frame.paragraphs if p.text)
                    if slide_text:
                        text_parts.append(slide_text)
        return "\n\n".join(text_parts)
    except ImportError:
        logger.warning("python-pptx not installed")
        return ""
    except Exception as e:
        logger.warning("pptx extraction failed: %s", e)
        return ""

