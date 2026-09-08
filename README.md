# Ekalavya (एकलव्य)
### *Learn Today. Serve Better.*

> **AI-Powered Competency Intelligence and Personalized Learning Platform**  
> Custom-engineered for India's Ministry of Statistics and Programme Implementation (**MoSPI**), the Indian Statistical Service (**ISS**), and Subordinate Statistical Service (**SSS**) cadres.

---

## 🏛️ Executive Summary

Ekalavya transforms civil service capacity building from static periodic training into an **adaptive, closed-loop competency intelligence lifecycle**. It ingests government training materials, maps official knowledge against a national standard 33-competency framework across 4 operational domains, diagnoses individual and organizational skill deficits, recommends harmonized learning pathways (iGOT Karmayogi + NSSTA), and conducts dynamic adaptive assessments with real-time remediation.

---

## 📐 Unified System Architecture

```mermaid
graph TD
    subgraph Client ["Frontend Architecture (React 19 + TypeScript + Vite + Tailwind v4)"]
        Public["Public Workflow (/login, /demo, /help)"]
        Learner["Learner Journey (/learner/*)"]
        Admin["Admin Oversight (/admin/*)"]
        AuthContext["Auth Context & Session Persistence"]
        ApiClient["Resilient API Client (Live Backend + Fallbacks)"]
    end

    subgraph BackendEngine ["FastAPI Backend Architecture"]
        API["FastAPI App (app/main.py)"]
        CompEngine["Competency Engine (competency_engine.py)"]
        RecEngine["Recommendation Engine (iGOT + NSSTA Catalog)"]
        QuizEngine["Adaptive Diagnostic Quiz Engine (quiz_engine.py)"]
        Embedding["Sentence Transformers (all-MiniLM-L6-v2)"]
        GeminiService["Multimodal AI Service (Google GenAI / Groq)"]
        DocParser["Document Parsing Engine (pdfplumber, pypdf, pymupdf, pptx)"]
    end

    subgraph Storage ["Database & External Catalogs"]
        NeonDB[("Neon Serverless PostgreSQL + pgvector")]
        iGOTCatalog[("iGOT Karmayogi Course Registry")]
        NSSTACatalog[("NSSTA Specialized Training Catalog")]
    end

    Client -->|HTTP / REST| API
    API --> CompEngine
    API --> RecEngine
    API --> QuizEngine
    RecEngine --> Embedding
    QuizEngine --> GeminiService
    QuizEngine --> DocParser
    CompEngine --> NeonDB
    RecEngine --> NeonDB
    RecEngine --> iGOTCatalog
    RecEngine --> NSSTACatalog
```

---

## 🧭 Complete Route Map

### 🌐 Public Routes
| Path | Component | Description |
| :--- | :--- | :--- |
| `/` | `LandingPage` | Immersive national platform overview, value propositions & interactive guides |
| `/login` | `LoginPage` | Official authentication gateway with Parichay SSO prototype & sandbox demo button |
| `/demo` | `DemoPage` | Interactive persona selector (`Government Official` or `Administrator`) |
| `/help` | `HelpPage` | User guides, FAQ, and methodology explanations |
| `/accessibility` | `AccessibilityPage` | WCAG 2.1 AA & GIGW compliance statements |
| `*` | `NotFoundPage` | Role-aware 404 handler with contextual return actions |

### 🎓 Learner Journey Routes (Protected: `role: learner` + `officialId`)
| Path | Component | Description |
| :--- | :--- | :--- |
| `/learner` | `LearnerDashboardPage` | Executive telemetry, average score, critical deficit counter & entrypoints |
| `/learner/profile` | `CompetencyProfilePage` | Official dossier, past training history & 33-competency mapped inventory |
| `/learner/gaps` | `SkillGapsPage` | Interactive gap matrix with live search, domain filters, and deficit sorting |
| `/learner/learning` | `PersonalizedLearningPage` | Matched courses from iGOT & NSSTA with match percentages & bridge tags |
| `/learner/learning/:id` | `LearningDetailPage` | Full module curriculum, hours, accreditation & direct enrollment CTAs |
| `/learner/assessments` | `AssessmentsPage` | Past assessment attempts, score summaries & creation launcher |
| `/learner/assessments/new` | `AssessmentGenerationPage`| Document uploader for PDF/PPT manuals with pre-seeded MoSPI samples |
| `/learner/assessments/:sessionId` | `AdaptiveAssessmentPage` | Dynamic single-question loop, instant validation & automatic remediation |
| `/learner/assessments/:sessionId/result` | `AssessmentResultPage`| Diagnostic report, concepts mastered (+10 pts) & practice recommendations |
| `/learner/progress` | `ProgressPage` | Historical capacity growth trajectory & audit log |

### 🛡️ Administrator Routes (Protected: `role: admin`)
| Path | Component | Description |
| :--- | :--- | :--- |
| `/admin` | `AdminDashboardPage` | Cadre-wide health telemetry, #1 training priority & department gap distribution |
| `/admin/competencies` | `AdminCompetencyGapsPage` | Ministry-wide gap analysis across Statistical, Technical, Governance & Behavioural |
| `/admin/training` | `TrainingEffectivenessPage`| Course utility scores, completion benchmarks & catalog recommendations |
| `/admin/demand` | `SkillDemandPage` | Projected skill needs based on emerging data governance mandates (DPDP, AI) |
| `/admin/officials` | `AdminOfficialsPage` | Statistical cadre directory with search, division filters & **official registration** |
| `/admin/officials/:id` | `AdminOfficialDetailPage` | Deep-dive individual dossier with historical competency logs & tailored courses |

---

## ⚡ Quick Start

### 1. Prerequisites
- **Node.js** (v18+)
- **Python** (3.11+)

### 2. Run Frontend (Port 5173)
```bash
# From repository root
npm run dev

# Or inside frontend folder
cd frontend
npm run dev
```
The React UI will run at **`http://localhost:5173/`**.

### 3. Run Backend FastAPI Service (Port 8000)
```bash
# From repository root
npm run backend

# Or inside backend folder
cd backend
npm run dev    # Or: python -m uvicorn app.main:app --reload --port 8000
```
The FastAPI backend REST server will run at **`http://localhost:8000/`**. (API Documentation at `http://localhost:8000/docs`).

> **Note on Resilient Architecture**:  
> If the backend or Neon PostgreSQL database is not connected, the frontend automatically switches to its **built-in simulated offline engine**. All pages, competency gap calculations, search/filtering, and adaptive assessment questions operate seamlessly without interruption.

---

## ⚙️ Environment Configuration

Copy `backend/.env.example` to `backend/.env` to configure live cloud services:

```env
# Neon Serverless PostgreSQL Connection String
NEON_DATABASE_URL=postgresql://YOUR_USER:YOUR_PASSWORD@YOUR_HOST/YOUR_DB?sslmode=require

# Google Gemini API Key (Free tier at https://aistudio.google.com/)
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
GEMINI_MODEL=gemini-2.0-flash

# Groq API Fallback (Optional, free tier at https://console.groq.com/)
GROQ_API_KEY=YOUR_GROQ_API_KEY
GROQ_MODEL=llama-3.3-70b-versatile
```

---

## 🧪 Verification & Testing Checklist

- [x] **Zero TypeScript / Build Errors**: Passes `tsc -b && vite build`.
- [x] **Route Guards**: Unauthenticated users visiting `/learner` or `/admin` are redirected to `/login`. Cross-role unauthorized access is trapped and routed appropriately.
- [x] **Session Persistence**: Demo official session persists in `localStorage` across page reloads.
- [x] **Clean Sign Out**: "Exit Demo" purges all active session tokens and returns cleanly to `/login`.
- [x] **Adaptive Quiz Loop**: Adheres to strict step-by-step next question API (`/quiz/session/{id}/next` and `/quiz/session/answer`).
- [x] **Cadre Management**: Real-time official registration modal directly inside the Admin Officials directory.
- [x] **Search & Sorting**: Instant real-time filtering and sorting across competency gaps and official directories.
