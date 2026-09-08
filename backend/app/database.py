"""
Plain Postgres access for Neon -- a small connection pool plus three helpers
(fetch_all / fetch_one / execute) used by every router instead of an ORM.
Kept intentionally thin: for a 40-hour build, raw parameterized SQL is faster
to write and debug than wiring up SQLAlchemy models for ~10 tables.
"""
import psycopg2
from psycopg2 import pool
from psycopg2.extras import RealDictCursor
from app.config import settings

_pool: pool.SimpleConnectionPool | None = None


def get_pool() -> pool.SimpleConnectionPool:
    global _pool
    if _pool is None:
        if not settings.NEON_DATABASE_URL:
            raise RuntimeError(
                "NEON_DATABASE_URL not set. Copy .env.example to .env and paste your Neon connection string."
            )
        _pool = pool.SimpleConnectionPool(1, 10, dsn=settings.NEON_DATABASE_URL)
    return _pool


def fetch_all(sql: str, params: tuple = ()) -> list[dict]:
    conn = get_pool().getconn()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(sql, params)
            return [dict(r) for r in cur.fetchall()]
    finally:
        get_pool().putconn(conn)


def fetch_one(sql: str, params: tuple = ()) -> dict | None:
    rows = fetch_all(sql, params)
    return rows[0] if rows else None


def execute(sql: str, params: tuple = ()) -> dict | None:
    """For INSERT/UPDATE/DELETE. Include a RETURNING clause to get the row back."""
    conn = get_pool().getconn()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(sql, params)
            row = None
            if cur.description:  # only true if RETURNING was used
                fetched = cur.fetchone()
                row = dict(fetched) if fetched else None
            conn.commit()
            return row
    except Exception:
        conn.rollback()
        raise
    finally:
        get_pool().putconn(conn)
