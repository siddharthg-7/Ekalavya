"""
Run once after applying schema.sql:  python seed_data.py
Loads the competency framework and curated course catalogue into Neon.
"""
import json
import os
from app.database import fetch_one, execute

DATA_DIR = os.path.join(os.path.dirname(__file__), "app", "data")


def seed_competencies():
    existing = fetch_one("SELECT count(*) AS count FROM competencies")
    if existing["count"] > 0:
        print(f"Skipping competencies -- {existing['count']} already present.")
        return
    with open(os.path.join(DATA_DIR, "competency_framework.json")) as f:
        competencies = json.load(f)
    for c in competencies:
        execute(
            "INSERT INTO competencies (domain, name, description) VALUES (%s, %s, %s)",
            (c["domain"], c["name"], c.get("description", "")),
        )
    print(f"Inserted {len(competencies)} competencies.")


def seed_courses():
    existing = fetch_one("SELECT count(*) AS count FROM courses")
    if existing["count"] > 0:
        print(f"Skipping courses -- {existing['count']} already present.")
        return
    with open(os.path.join(DATA_DIR, "courses_seed.json")) as f:
        courses = json.load(f)
    for c in courses:
        execute(
            """
            INSERT INTO courses (title, description, domain, sub_skill, level, duration_hrs, source, url)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """,
            (c["title"], c["description"], c["domain"], c["sub_skill"], c["level"], c["duration_hrs"], c["source"], c["url"]),
        )
    print(f"Inserted {len(courses)} courses.")


if __name__ == "__main__":
    seed_competencies()
    seed_courses()
    print("Done.")
