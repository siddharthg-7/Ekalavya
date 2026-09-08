from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import officials, recommendations, quiz, dashboard

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
    allow_methods=["*"],
    allow_headers=["*"],
)

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
