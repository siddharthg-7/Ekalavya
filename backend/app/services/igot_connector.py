"""
Adapter pattern for external training-catalogue sources.

Today: MockConnector reads curated JSON (scraped + hand-tagged iGOT titles,
and optionally NSSTA TPAC programmes if that data is obtained).

Tomorrow: implement RealIGotConnector against the actual iGOT Karmayogi API
using the same TrainingSource interface -- nothing else in the app changes.

Per the merge decision: courses from both sources live in ONE unified list.
Each item carries a `source` field ("iGOT" or "NSSTA"). If NSSTA data is
never obtained, the pool is simply 100% "iGOT" and everything downstream
(recommendation engine, dashboards) works unchanged.
"""
from abc import ABC, abstractmethod
import json
import os

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data")


class TrainingSource(ABC):
    @abstractmethod
    def get_catalogue(self) -> list[dict]:
        """Return a flat list of course/programme dicts, each with at least:
        title, description, domain, sub_skill, level, duration_hrs, source
        """
        ...


class MockTrainingSource(TrainingSource):
    """Reads curated seed data. Swap this for a real API-backed class later."""

    def __init__(self, courses_file: str = "courses_seed.json"):
        self.path = os.path.join(DATA_DIR, courses_file)

    def get_catalogue(self) -> list[dict]:
        if not os.path.exists(self.path):
            return []
        with open(self.path, "r", encoding="utf-8") as f:
            return json.load(f)


def get_training_source() -> TrainingSource:
    """Factory -- this is the single line you change to go live with real APIs."""
    return MockTrainingSource()
