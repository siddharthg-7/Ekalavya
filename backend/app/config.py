"""
Central place for all environment/config values.
Every service pulls settings from here instead of reading os.environ directly,
so swapping providers later (e.g. mock -> real iGOT API) only touches this file
and the relevant connector.
"""
import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    NEON_DATABASE_URL: str = os.getenv("NEON_DATABASE_URL", "")

    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-2.0-flash")

    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
    GROQ_MODEL: str = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")

    ENV: str = os.getenv("ENV", "development")


settings = Settings()
