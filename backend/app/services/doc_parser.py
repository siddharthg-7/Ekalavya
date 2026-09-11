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
    elif ext in ("txt", "md", "csv"):
        return _extract_plain_text(file_bytes)
    elif ext in ("docx",):
        return _extract_docx(file_bytes)
    elif ext in ("png", "jpg", "jpeg", "webp", "bmp"):
        return _extract_image(file_bytes, ext)
    else:
        raise ValueError(
            f"Unsupported file type '.{ext}'. Supported formats: PDF, PPTX, DOCX, TXT, MD, PNG, JPG, JPEG, WEBP."
        )


def _extract_plain_text(file_bytes: bytes) -> str:
    try:
        text = file_bytes.decode("utf-8", errors="ignore").strip()
        return text
    except Exception as e:
        logger.warning("Plain text extraction failed: %s", e)
        return ""


def _extract_docx(file_bytes: bytes) -> str:
    import zipfile
    import xml.etree.ElementTree as ET
    try:
        with zipfile.ZipFile(io.BytesIO(file_bytes)) as z:
            xml_content = z.read("word/document.xml")
            tree = ET.fromstring(xml_content)
            # Find all w:t text elements in the document XML
            namespaces = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
            texts = [node.text for node in tree.iterfind(".//w:t", namespaces) if node.text]
            return "\n".join(texts)
    except Exception as e:
        logger.warning("DOCX XML extraction failed: %s", e)
        return _extract_plain_text(file_bytes)


def _extract_image(file_bytes: bytes, ext: str) -> str:
    """Uses Gemini Multimodal Vision to extract educational concepts from uploaded images/charts."""
    from app.services import gemini_service
    mime_map = {
        "png": "image/png",
        "jpg": "image/jpeg",
        "jpeg": "image/jpeg",
        "webp": "image/webp",
        "bmp": "image/bmp",
    }
    mime_type = mime_map.get(ext, "image/jpeg")
    prompt = (
        "You are an expert curriculum analyst for India's Ministry of Statistics & Programme Implementation (MoSPI). "
        "Analyze this uploaded educational image/document/chart in full detail. "
        "Transcribe and describe all visible text, formulas, methodological concepts, definitions, metrics, tables, "
        "and principles. Provide a thorough, self-contained educational summary of all concepts contained in this image "
        "so that diagnostic assessment questions can be accurately constructed from it."
    )
    try:
        extracted = gemini_service.generate_from_document(file_bytes, mime_type, prompt)
        if extracted and len(extracted.strip()) > 20:
            return extracted.strip()
    except Exception as e:
        logger.warning("Gemini vision extraction failed: %s", e)

    return f"[Uploaded Image: {ext.upper()} document containing technical training figures, statistical charts, and official methodology notes]"



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

