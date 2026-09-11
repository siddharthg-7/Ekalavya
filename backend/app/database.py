"""
Plain Postgres access for Neon -- a thread-safe connection pool plus three helpers
(fetch_all / fetch_one / execute) used by every router instead of an ORM.
Kept intentionally thin: for a 40-hour build, raw parameterized SQL is faster
to write and debug than wiring up SQLAlchemy models for ~10 tables.
"""
import logging
import psycopg2
from psycopg2 import pool
from psycopg2.extras import RealDictCursor
from app.config import settings

logger = logging.getLogger(__name__)

_pool: pool.ThreadedConnectionPool | None = None


def get_pool() -> pool.ThreadedConnectionPool:
    global _pool
    if _pool is None or getattr(_pool, "closed", False):
        if not settings.NEON_DATABASE_URL:
            raise RuntimeError(
                "NEON_DATABASE_URL not set. Copy .env.example to .env and paste your Neon connection string."
            )
        _pool = pool.ThreadedConnectionPool(1, 20, dsn=settings.NEON_DATABASE_URL)
    return _pool


def fetch_all(sql: str, params: tuple = ()) -> list[dict]:
    p = get_pool()
    conn = p.getconn()
    close_conn = False
    try:
        if getattr(conn, "closed", 0) != 0:
            close_conn = True
            conn = p.getconn()
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(sql, params)
            return [dict(r) for r in cur.fetchall()]
    except Exception:
        close_conn = True
        raise
    finally:
        try:
            p.putconn(conn, close=close_conn)
        except Exception as err:
            logger.debug("Safely caught putconn exception: %s", err)


def fetch_one(sql: str, params: tuple = ()) -> dict | None:
    rows = fetch_all(sql, params)
    return rows[0] if rows else None


def execute(sql: str, params: tuple = ()) -> dict | None:
    """For INSERT/UPDATE/DELETE. Include a RETURNING clause to get the row back."""
    p = get_pool()
    conn = p.getconn()
    close_conn = False
    try:
        if getattr(conn, "closed", 0) != 0:
            close_conn = True
            conn = p.getconn()
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(sql, params)
            row = None
            if cur.description:  # only true if RETURNING was used
                fetched = cur.fetchone()
                row = dict(fetched) if fetched else None
            conn.commit()
            return row
    except Exception:
        close_conn = True
        try:
            conn.rollback()
        except Exception:
            pass
        raise
    finally:
        try:
            p.putconn(conn, close=close_conn)
        except Exception as err:
            logger.debug("Safely caught putconn exception: %s", err)


def resolve_official(official_id: str) -> dict | None:
    """Safely resolves an official by UUID or legacy name/slug without Postgres type errors."""
    try:
        if not official_id:
            return fetch_one("SELECT * FROM officials ORDER BY created_at ASC LIMIT 1")

        # 1. Check if official_id is a valid UUID
        import uuid
        try:
            uuid_val = str(uuid.UUID(str(official_id).strip()))
            row = fetch_one("SELECT * FROM officials WHERE id = %s", (uuid_val,))
            if row:
                return row
        except (ValueError, AttributeError):
            pass

        # 2. Try matching by slug / name parts (e.g. "f102-rajesh-verma" -> "rajesh")
        clean = str(official_id).lower().replace("-", " ").replace("_", " ").strip()
        words = [w for w in clean.split() if len(w) > 2 and not w.startswith("f10")]
        for w in words:
            row = fetch_one("SELECT * FROM officials WHERE lower(name) LIKE %s LIMIT 1", (f"%{w}%",))
            if row:
                return row

        # 3. Fallback to first official in the database
        return fetch_one("SELECT * FROM officials ORDER BY created_at ASC LIMIT 1")
    except Exception as e:
        logger.warning("resolve_official query failed: %s", e)
        return None


