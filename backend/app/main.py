import logging
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from app.routers import officials, recommendations, quiz, dashboard

logger = logging.getLogger(__name__)

app = FastAPI(
    title="PS 26101 - AI Skill Intelligence Platform (iGOT integration)",
    description="Competency gap analysis, training recommendations (iGOT + NSSTA merged), "
                 "and AI-generated quizzes for India's Official Statistical System.",
    version="0.1.0",
)

# Wide open for hackathon demo speed -- tighten before anything resembling production.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.exception("Unhandled error on %s %s: %s", request.method, request.url.path, exc)
    response = JSONResponse(
        status_code=500,
        content={"detail": str(exc)},
    )
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    return response


app.include_router(officials.router)
app.include_router(recommendations.router)
app.include_router(quiz.router)
app.include_router(dashboard.router)


@app.get("/")
def root():
    return {"status": "ok", "service": "PS 26101 backend"}


@app.get("/health")
def health():
    return {"status": "healthy"}
