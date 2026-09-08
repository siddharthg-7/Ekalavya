from pydantic import BaseModel
from typing import Optional


class OfficialCreate(BaseModel):
    name: str
    designation: Optional[str] = None
    department: Optional[str] = None
    job_role: Optional[str] = None
    education: Optional[str] = None
    experience_years: Optional[float] = None
    past_trainings: Optional[list[str]] = []
    role: str = "learner"


class CompetencyScoreOut(BaseModel):
    competency_id: str
    domain: str
    name: str
    score: float
    target_score: float
    gap: float


class RecommendationOut(BaseModel):
    course_id: str
    title: str
    domain: Optional[str]
    source: str            # "iGOT" or "NSSTA"
    duration_hrs: Optional[float]
    url: Optional[str]      # placeholder link for the demo -- swap for real iGOT/NSSTA URL when API access exists
    reason: str
    score: float


class QuizQuestionOut(BaseModel):
    question: str
    options: list[str]
    correct_option: str
    explanation: str


class QuizGenerateResponse(BaseModel):
    quiz_id: str
    session_id: str
    title: str
    total_questions_queued: int


class NextQuestionOut(BaseModel):
    question_id: str
    question: str
    options: list[str]
    competency_name: str
    difficulty: str
    is_remedial: bool


class AnswerRequest(BaseModel):
    session_id: str
    question_id: str
    selected_option: str


class AnswerResponse(BaseModel):
    is_correct: bool
    correct_option: str
    explanation: str
    action: str                 # "remediate" | "escalate" | "continue" | "session_complete"
    concept_name: str
    new_difficulty: str
    session_status: str         # "in_progress" | "completed"
