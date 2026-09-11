// API Client for MoSPI Primer Platform with resilient fallback mock data
// Aligned with Primer-api (PS 26101 - AI Skill Intelligence Platform)

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface OfficialSummary {
  id: string;
  name: string;
  designation: string;
  department: string;
}

export interface OfficialDetail extends OfficialSummary {
  job_role?: string;
  education?: string;
  experience_years?: number;
  past_trainings?: string[];
  role?: string;
  created_at?: string;
}

export interface OfficialCreate {
  name: string;
  designation?: string;
  department?: string;
  job_role?: string;
  education?: string;
  experience_years?: number;
  past_trainings?: string[];
  role?: string;
}

export interface CompetencyGap {
  competency_id: string;
  domain: 'Statistical' | 'Technical' | 'DigitalGovernance' | 'Behavioural' | string;
  name: string;
  score: number;
  target_score: number;
  gap: number;
  rationale?: string;
}

export interface CourseRecommendation {
  course_id: string;
  title: string;
  domain?: string;
  source: 'iGOT' | 'NSSTA' | string;
  duration_hrs?: number;
  url?: string;
  reason: string;
  score: number;
  addresses_gap?: string;
}

export interface QuizQuestion {
  question_id: string;
  question: string;
  options: string[];
  competency_name: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | string;
  is_remedial: boolean;
}

export interface AnswerResponse {
  is_correct: boolean;
  correct_option: string;
  explanation: string;
  action: 'continue' | 'remediate' | 'escalate' | 'session_complete' | string;
  concept_name: string;
  new_difficulty: string;
  session_status: 'in_progress' | 'completed' | string;
}

export interface SessionSummary {
  score: number;
  total: number;
  concepts_mastered: string[];
  concepts_needing_practice: string[];
  taken_at?: string;
}

export interface CompetencyScoreWithDetail {
  id?: string;
  competency_id: string;
  domain: string;
  competency_name: string;
  score: number;
  target_score: number;
  updated_at?: string;
}

export interface QuizAttemptRecord {
  id?: string;
  quiz_id?: string;
  session_id?: string;
  official_id?: string;
  score: number;
  total: number;
  concepts_mastered: string[];
  concepts_needing_practice: string[];
  taken_at: string;
}

export interface LearnerDashboardData {
  official: OfficialDetail;
  competency_scores: CompetencyScoreWithDetail[];
  quiz_attempts: QuizAttemptRecord[];
}

export interface AdminDashboardData {
  total_officials: number;
  total_courses?: number;
  total_competencies?: number;
  avg_gap_by_domain: Record<string, number>;
  projected_training_priority: string[];
}

export interface TrainingEffectivenessCourse {
  courseTitle: string;
  shortTitle: string;
  source: string;
  enrolled: number;
  completionRate: number;
  preAvgScore: number;
  postAvgScore: number;
  delta: string;
  status: string;
}

export interface TrainingEffectivenessData {
  total_officials: number;
  total_courses: number;
  total_attempts: number;
  avg_improvement: string;
  completion_rate: string;
  courses: TrainingEffectivenessCourse[];
}

// ============================================================================
// Fallback / Initial Seed Data (matches Neon PostgreSQL Database)
// ============================================================================

export const FALLBACK_OFFICIALS: OfficialDetail[] = [
  {
    id: "ddbffb96-2eb5-4246-b7ed-4c5065f3ac15",
    name: "Anjali Sharma",
    designation: "Deputy Director",
    department: "National Statistical Office - Survey Design and Research Division (SDRD)",
    job_role: "Sampling and Survey Methodology Lead",
    education: "M.Stat (Indian Statistical Institute, Kolkata)",
    experience_years: 9,
    past_trainings: ["Advanced Sample Survey Design (NSSTA)", "Official Statistics Induction (iGOT)"],
    role: "learner"
  },
  {
    id: "6f24d808-f6f7-4988-a7ff-9a6c076ed91c",
    name: "Rajesh Kumar Verma",
    designation: "Joint Director",
    department: "National Statistical Office - National Accounts Division (NAD)",
    job_role: "GDP Compilation and SUT Modeling",
    education: "M.Sc. Economics (Delhi School of Economics)",
    experience_years: 6,
    past_trainings: ["System of National Accounts 2008 (NSSTA)"],
    role: "learner"
  },
  {
    id: "3f6a5973-22d5-4bfb-86c4-d0cd2d1cc3d0",
    name: "Priya Nair",
    designation: "Assistant Director",
    department: "Computer Centre - Data Systems Division",
    job_role: "Data Systems Architect & Database Administrator",
    education: "B.Tech Computer Science + PG Diploma in Big Data",
    experience_years: 5,
    past_trainings: ["Cloud Infrastructure for Governance (iGOT)", "Cybersecurity Frameworks"],
    role: "learner"
  },
  {
    id: "b4f1eefd-06f0-4690-b849-4364cf989272",
    name: "Suresh Iyer",
    designation: "Regional Director",
    department: "National Sample Survey Office - Field Operations Division",
    job_role: "Household Survey Supervisor & CAPI Auditor",
    education: "B.Sc. Statistics (Gujarat University)",
    experience_years: 12,
    past_trainings: ["PLFS Field Enumeration Handbook"],
    role: "learner"
  },
  {
    id: "ef2aaa16-6c0d-425f-b21b-d963382bce7e",
    name: "Meera Joshi",
    designation: "Section Officer",
    department: "Social Statistics Division - SDG Monitoring Cell",
    job_role: "SDG Indicators Tracking & Social Statistics Reporting",
    education: "M.Sc. Applied Statistics (University of Kerala)",
    experience_years: 7,
    past_trainings: ["Time Series Forecasting with R (NSSTA)"],
    role: "learner"
  },
  {
    id: "0fc0f4f0-e9a0-4a75-ae8e-a233abef0623",
    name: "Arvind Menon",
    designation: "Deputy Director General",
    department: "Training Division - NSSTA",
    job_role: "Statistical Dissemination & Inter-Ministerial Data Governance",
    education: "Ph.D. Economics (JNU)",
    experience_years: 18,
    past_trainings: ["Senior Leadership Development (DoPT)", "SDMX Standards Workshop"],
    role: "admin"
  }
];

export const FALLBACK_GAPS: Record<string, CompetencyGap[]> = {
  "ddbffb96-2eb5-4246-b7ed-4c5065f3ac15": [
    { competency_id: "c1", domain: "Statistical", name: "Sample Weight Calibration", score: 72, target_score: 85, gap: 13, rationale: "Strong theoretical base from M.Stat; calibration on multi-round PLFS non-response warrants refresh." },
    { competency_id: "c2", domain: "Statistical", name: "Small Area Estimation", score: 58, target_score: 80, gap: 22, rationale: "Fay-Herriot and empirical Bayes models require focused hands-on training for sub-district statistics." },
    { competency_id: "c3", domain: "Technical", name: "Python for Data Processing", score: 45, target_score: 75, gap: 30, rationale: "Prior workflow relied predominantly on SAS/SPSS; automated ETL migration needed." },
    { competency_id: "c4", domain: "Technical", name: "R for Survey Analysis", score: 78, target_score: 85, gap: 7, rationale: "Proficient in survey design packages; minor update for complex survey replication weights." },
    { competency_id: "c5", domain: "DigitalGovernance", name: "Statistical Metadata Standards (SDMX)", score: 50, target_score: 80, gap: 30, rationale: "Crucial for inter-agency dissemination and global UN statistical compliance." },
    { competency_id: "c6", domain: "DigitalGovernance", name: "Data Privacy & Anonymization", score: 65, target_score: 80, gap: 15, rationale: "Differential privacy integration for open microdata under India DPDP Act." },
    { competency_id: "c7", domain: "Behavioural", name: "Technical Presentation Skills", score: 70, target_score: 80, gap: 10, rationale: "Effective executive briefing for National Statistical Commission committee reviews." },
  ],
  "6f24d808-f6f7-4988-a7ff-9a6c076ed91c": [
    { competency_id: "c8", domain: "Statistical", name: "System of National Accounts (SNA 2008)", score: 82, target_score: 90, gap: 8, rationale: "Solid grasp of GDP compilation; needs update on digital economy capitalization." },
    { competency_id: "c9", domain: "Statistical", name: "Supply and Use Tables (SUT)", score: 68, target_score: 85, gap: 17, rationale: "Commodity balance balancing algorithms require practical refresher." },
    { competency_id: "c10", domain: "Technical", name: "SQL for Complex Aggregation", score: 55, target_score: 80, gap: 25, rationale: "Direct querying of corporate MCA-21 database returns high optimization gain." },
    { competency_id: "c11", domain: "DigitalGovernance", name: "Inter-Agency Data Sharing Protocols", score: 60, target_score: 80, gap: 20, rationale: "Standardized API consumption from RBI and GSTN data streams." },
    { competency_id: "c12", domain: "Behavioural", name: "Cross-Department Collaboration", score: 74, target_score: 80, gap: 6, rationale: "Coordination with Ministry of Finance and state DES departments." },
  ]
};

export const FALLBACK_RECOMMENDATIONS: CourseRecommendation[] = [
  {
    course_id: "rec-101",
    title: "Small Area Estimation with R for Official Statistics",
    domain: "Statistical",
    source: "NSSTA",
    duration_hrs: 24,
    url: "https://nssta.gov.in/courses/sae-r",
    reason: "Directly bridges your 22-point gap in Small Area Estimation for sub-district statistical releases.",
    score: 94.5,
    addresses_gap: "Small Area Estimation"
  },
  {
    course_id: "rec-102",
    title: "Python for Data Processing & Automated ETL in Government",
    domain: "Technical",
    source: "iGOT",
    duration_hrs: 18,
    url: "https://igotkarmayogi.gov.in/courses/python-gov-etl",
    reason: "Targets high-priority gap in Technical Data Processing for modernizing SDRD data pipelines.",
    score: 91.0,
    addresses_gap: "Python for Data Processing"
  },
  {
    course_id: "rec-103",
    title: "Statistical Data and Metadata eXchange (SDMX) Global Implementation",
    domain: "DigitalGovernance",
    source: "NSSTA",
    duration_hrs: 16,
    url: "https://nssta.gov.in/courses/sdmx-metadata",
    reason: "Supports MoSPI data harmonization standards and inter-agency dissemination.",
    score: 88.0,
    addresses_gap: "Statistical Metadata Standards (SDMX)"
  },
  {
    course_id: "rec-104",
    title: "Data Anonymization and Differential Privacy in Public Dissemination",
    domain: "DigitalGovernance",
    source: "iGOT",
    duration_hrs: 12,
    url: "https://igotkarmayogi.gov.in/courses/data-privacy-dpdp",
    reason: "Essential for complying with India's DPDP Act when releasing microdata files.",
    score: 85.2,
    addresses_gap: "Data Privacy & Anonymization"
  },
  {
    course_id: "rec-105",
    title: "Effective Policy Briefing and Statistical Communication for Leaders",
    domain: "Behavioural",
    source: "iGOT",
    duration_hrs: 8,
    url: "https://igotkarmayogi.gov.in/courses/exec-communication",
    reason: "Strengthens senior presentations to inter-ministerial committees and policy stakeholders.",
    score: 82.0,
    addresses_gap: "Technical Presentation Skills"
  }
];

export const FALLBACK_ADMIN: AdminDashboardData = {
  total_officials: 6,
  total_courses: 38,
  total_competencies: 33,
  avg_gap_by_domain: {
    "Technical": 24.8,
    "DigitalGovernance": 19.4,
    "Statistical": 14.6,
    "Behavioural": 8.2
  },
  projected_training_priority: [
    "Technical",
    "DigitalGovernance",
    "Statistical",
    "Behavioural"
  ]
};

// In-memory store for newly created officials during session
let runtimeOfficials: OfficialDetail[] = [...FALLBACK_OFFICIALS];

// ============================================================================
// Utility Helpers
// ============================================================================

export function parseOptionLetter(optionText: string, index: number): string {
  const match = optionText.match(/^([A-Da-d])[\).\s]/);
  if (match) return match[1].toUpperCase();
  return ['A', 'B', 'C', 'D'][index] || 'A';
}

export function cleanOptionBody(optionText: string): string {
  return optionText.replace(/^([A-Da-d])[\).\s]+\s*/, '');
}

export async function checkBackendHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, { signal: AbortSignal.timeout(1500) });
    return res.ok;
  } catch {
    return false;
  }
}

// ============================================================================
// API Methods with automatic graceful fallback
// ============================================================================

export async function fetchOfficials(): Promise<{ data: OfficialDetail[]; isLive: boolean }> {
  try {
    const res = await fetch(`${API_BASE_URL}/officials`, { signal: AbortSignal.timeout(2500) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    // Merge runtime created custom officials that might not yet be in the database
    const combined = [...data];
    for (const ro of runtimeOfficials) {
      if (ro.id.startsWith('custom-') && !combined.some(o => o.id === ro.id)) {
        combined.push(ro);
      }
    }
    return { data: combined, isLive: true };
  } catch {
    return { data: runtimeOfficials, isLive: false };
  }
}

export async function createOfficial(payload: OfficialCreate): Promise<OfficialDetail> {
  try {
    const res = await fetch(`${API_BASE_URL}/officials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const created = await res.json();
    runtimeOfficials.unshift(created);
    return created;
  } catch {
    const syntheticId = `custom-${Date.now()}`;
    const newOfficial: OfficialDetail = {
      id: syntheticId,
      name: payload.name,
      designation: payload.designation || "Statistical Officer",
      department: payload.department || "Ministry of Statistics & Programme Implementation",
      job_role: payload.job_role || "Statistical Analyst",
      education: payload.education || "Postgraduate in Statistics",
      experience_years: payload.experience_years || 4,
      past_trainings: payload.past_trainings || ["Official Statistics Induction"],
      role: payload.role || "learner"
    };
    runtimeOfficials.unshift(newOfficial);
    return newOfficial;
  }
}

/**
 * Helper to execute fetch with timeout (default 15s) and automatic retry logic for Render free tier cold starts.
 */
export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries = 2,
  delayMs = 1500,
  timeoutMs = 20000
): Promise<Response> {
  for (let i = 0; i <= retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
      
      const combinedOptions: RequestInit = {
        ...options,
        signal: options.signal || controller.signal,
      };

      const res = await fetch(url, combinedOptions);
      clearTimeout(timeoutId);

      // If Render free tier proxy returns 502 Bad Gateway / 503 Service Unavailable, retry after delay
      if ((res.status === 502 || res.status === 503) && i < retries) {
        await new Promise(r => setTimeout(r, delayMs * (i + 1)));
        continue;
      }
      return res;
    } catch (err) {
      if (i === retries) throw err;
      await new Promise(r => setTimeout(r, delayMs * (i + 1)));
    }
  }
  throw new Error(`Failed to connect to ${url}`);
}

/**
 * Non-blocking background health check to trigger Render container warm-up on app load.
 */
export function pingBackendHealth(): void {
  fetch(`${API_BASE_URL}/health`, { mode: 'cors' }).catch(() => {
    // Silent catch -- background warmup ping
  });
}

export async function fetchOfficialDetail(id: string): Promise<OfficialDetail> {
  try {
    const res = await fetchWithRetry(`${API_BASE_URL}/officials/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    const found = runtimeOfficials.find(o => o.id === id);
    return found || runtimeOfficials[0];
  }
}

export async function fetchCompetencyGaps(officialId: string): Promise<CompetencyGap[]> {
  try {
    const res = await fetchWithRetry(`${API_BASE_URL}/officials/${officialId}/competency-gaps`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (Array.isArray(json)) return json;
    throw new Error("Invalid API response format");
  } catch {
    const fallback = FALLBACK_GAPS[officialId] || FALLBACK_GAPS["ddbffb96-2eb5-4246-b7ed-4c5065f3ac15"] || Object.values(FALLBACK_GAPS)[0] || [];
    return Array.isArray(fallback) ? fallback : [];
  }
}

export async function fetchRecommendations(officialId: string): Promise<CourseRecommendation[]> {
  try {
    const res = await fetchWithRetry(`${API_BASE_URL}/recommendations/${officialId}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return Array.isArray(json.recommendations) ? json.recommendations : [];
  } catch {
    return Array.isArray(FALLBACK_RECOMMENDATIONS) ? FALLBACK_RECOMMENDATIONS : [];
  }
}

export async function fetchLearnerDashboard(officialId: string): Promise<LearnerDashboardData> {
  try {
    const res = await fetchWithRetry(`${API_BASE_URL}/dashboard/learner/${officialId}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data && Array.isArray(data.competency_scores)) {
      return {
        official: data.official || (await fetchOfficialDetail(officialId)),
        competency_scores: Array.isArray(data.competency_scores) ? data.competency_scores : [],
        quiz_attempts: Array.isArray(data.quiz_attempts) ? data.quiz_attempts : []
      };
    }
    throw new Error("Invalid dashboard payload");
  } catch {
    const official = await fetchOfficialDetail(officialId);
    const rawGaps = await fetchCompetencyGaps(officialId);
    const gaps = Array.isArray(rawGaps) ? rawGaps : [];
    
    const competency_scores: CompetencyScoreWithDetail[] = gaps.map(g => ({
      competency_id: g.competency_id || `comp-${g.name}`,
      domain: g.domain || 'General',
      competency_name: g.name || 'Competency',
      score: Number(g.score) || 60,
      target_score: Number(g.target_score) || 80
    }));

    const quiz_attempts: QuizAttemptRecord[] = [
      {
        id: `att-demo-1`,
        quiz_id: `quiz-rec`,
        official_id: officialId,
        score: 4,
        total: 5,
        concepts_mastered: ["Survey Weight Calibration", "Finite Population Correction (FPC)"],
        concepts_needing_practice: ["Small Area Estimation"],
        taken_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
      }
    ];

    return { official, competency_scores, quiz_attempts };
  }
}

export async function fetchAdminDashboard(): Promise<AdminDashboardData> {
  try {
    const res = await fetchWithRetry(`${API_BASE_URL}/dashboard/admin`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return FALLBACK_ADMIN;
  }
}

export async function fetchCourseDetail(courseId: string): Promise<CourseRecommendation> {
  try {
    const res = await fetchWithRetry(`${API_BASE_URL}/recommendations/course/${courseId}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return {
      course_id: String(data.id),
      title: data.title,
      domain: data.domain,
      source: data.source,
      duration_hrs: Number(data.duration_hrs) || 16,
      url: data.url,
      reason: data.description || "Curated capacity building module for official statistics excellence.",
      score: 90.0,
      addresses_gap: data.sub_skill || data.domain
    };
  } catch {
    const found = FALLBACK_RECOMMENDATIONS.find(c => c.course_id === courseId);
    return found || FALLBACK_RECOMMENDATIONS[0];
  }
}

export async function fetchTrainingEffectiveness(): Promise<TrainingEffectivenessData> {
  try {
    const res = await fetchWithRetry(`${API_BASE_URL}/dashboard/admin/training-effectiveness`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return {
      total_officials: 6,
      total_courses: 38,
      total_attempts: 14,
      avg_improvement: "+28.5 pts",
      completion_rate: "87.5%",
      courses: [
        {
          courseTitle: 'Small Area Estimation with R for Official Statistics',
          shortTitle: 'Small Area Estimation',
          source: 'NSSTA',
          enrolled: 48,
          completionRate: 92,
          preAvgScore: 54,
          postAvgScore: 82,
          delta: '+28 pts',
          status: 'Active Cohort'
        },
        {
          courseTitle: 'Python for Data Processing & Automated ETL in Government',
          shortTitle: 'Python Automated ETL',
          source: 'iGOT',
          enrolled: 76,
          completionRate: 84,
          preAvgScore: 42,
          postAvgScore: 75,
          delta: '+33 pts',
          status: 'Continuous'
        },
        {
          courseTitle: 'Statistical Data and Metadata eXchange (SDMX) Standards',
          shortTitle: 'SDMX Standards',
          source: 'NSSTA',
          enrolled: 31,
          completionRate: 87,
          preAvgScore: 48,
          postAvgScore: 78,
          delta: '+30 pts',
          status: 'Completed'
        },
        {
          courseTitle: 'Data Anonymization and Differential Privacy in Dissemination',
          shortTitle: 'Differential Privacy',
          source: 'iGOT',
          enrolled: 52,
          completionRate: 79,
          preAvgScore: 58,
          postAvgScore: 81,
          delta: '+23 pts',
          status: 'Active Cohort'
        }
      ]
    };
  }
}

export async function generateQuizFromDocument(file: File, officialId: string): Promise<{
  quiz_id: string;
  session_id: string;
  title: string;
  total_questions_queued: number;
}> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('official_id', officialId);

  try {
    const res = await fetchWithRetry(`${API_BASE_URL}/quiz/generate`, {
      method: 'POST',
      body: formData,
    }, 1, 2000, 60000);

    if (res.ok) {
      return await res.json();
    }
    const err = await res.json().catch(() => ({ detail: `Upload failed with HTTP ${res.status}` }));
    throw new Error(err.detail || `Upload failed with HTTP ${res.status}`);
  } catch (error) {
    console.warn("Backend quiz generation offline or 502 during cold start, serving simulated session:", error);
    const simSessionId = `sim-session-${Date.now()}`;
    return {
      quiz_id: `quiz-sim-${Date.now()}`,
      session_id: simSessionId,
      title: `Adaptive Quiz: ${file.name}`,
      total_questions_queued: 4
    };
  }
}

export async function getNextQuestion(sessionId: string): Promise<QuizQuestion | { status: 'completed' }> {
  if (sessionId.startsWith('sim-session-')) {
    return getLocalSimulatedQuestion(sessionId);
  }
  try {
    const res = await fetchWithRetry(`${API_BASE_URL}/quiz/session/${sessionId}/next`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return getLocalSimulatedQuestion(sessionId);
  }
}

export async function submitQuizAnswer(payload: {
  session_id: string;
  question_id: string;
  selected_option: string;
}): Promise<AnswerResponse> {
  if (payload.session_id.startsWith('sim-session-')) {
    return processLocalSimulatedAnswer(payload);
  }
  try {
    const res = await fetchWithRetry(`${API_BASE_URL}/quiz/session/answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return processLocalSimulatedAnswer(payload);
  }
}

export async function getSessionSummary(sessionId: string): Promise<SessionSummary> {
  if (sessionId.startsWith('sim-session-')) {
    return {
      score: 3,
      total: 4,
      concepts_mastered: ["Survey Weight Calibration", "Finite Population Correction (FPC)"],
      concepts_needing_practice: ["Small Area Empirical Bayes Estimators"],
      taken_at: new Date().toISOString()
    };
  }
  try {
    const res = await fetchWithRetry(`${API_BASE_URL}/quiz/session/${sessionId}/summary`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return {
      score: 4,
      total: 5,
      concepts_mastered: ["Survey Weight Calibration", "Sampling Theory"],
      concepts_needing_practice: ["Small Area Estimation"],
      taken_at: new Date().toISOString()
    };
  }
}

// ============================================================================
// Simulated local adaptive questions
// ============================================================================

let simStep = 0;
const SIM_QUESTIONS: QuizQuestion[] = [
  {
    question_id: "q-1",
    question: "In stratified multistage sampling for the Periodic Labour Force Survey (PLFS), why are sampling weights adjusted with calibration estimators against Census projected population totals?",
    options: [
      "A) To correct for frame under-coverage, non-response bias, and ensure consistency with demographic totals",
      "B) To artificially decrease the sample variance without considering non-response",
      "C) To ensure every primary sampling unit (PSU) receives an equal number of sample households",
      "D) To replace standard error estimation with fixed administrative thresholds"
    ],
    competency_name: "Sample Weight Calibration",
    difficulty: "Intermediate",
    is_remedial: false
  },
  {
    question_id: "q-2",
    question: "When applying the Finite Population Correction (FPC) factor √(1 - n/N), what threshold of sampling fraction (n/N) is generally considered necessary before FPC significantly alters the variance estimate?",
    options: [
      "A) Greater than 5% (n/N > 0.05)",
      "B) Exactly 0.1%",
      "C) Only when n exceeds 100,000 observations regardless of N",
      "D) Only in non-probability convenience sampling"
    ],
    competency_name: "Finite Population Correction (FPC)",
    difficulty: "Intermediate",
    is_remedial: false
  },
  {
    question_id: "q-3",
    question: "Under the Fay-Herriot area-level model for Small Area Estimation (SAE), what happens when the design variance (sampling variance) of a direct estimate is exceptionally high?",
    options: [
      "A) The shrink parameter weights the composite estimator heavily toward the synthetic regression prediction based on auxiliary variables",
      "B) The estimator ignores the synthetic regression model and relies solely on the noisy direct estimate",
      "C) The small area sample is discarded and imputed with zero",
      "D) The design degrees of freedom are arbitrarily doubled"
    ],
    competency_name: "Small Area Empirical Bayes Estimators",
    difficulty: "Advanced",
    is_remedial: false
  },
  {
    question_id: "q-4",
    question: "[Remedial Concept Check] What is the primary difference between Probability Proportional to Size (PPS) systematic sampling and Simple Random Sampling (SRS)?",
    options: [
      "A) PPS assigns higher selection probability to larger clusters or villages based on population measure",
      "B) PPS guarantees identical sample units across all rounds without random start",
      "C) SRS requires auxiliary cluster measures while PPS does not",
      "D) PPS is only valid for continuous biological measurements"
    ],
    competency_name: "Survey Design & Probability Sampling",
    difficulty: "Beginner",
    is_remedial: true
  }
];

function getLocalSimulatedQuestion(_sessionId: string): QuizQuestion | { status: 'completed' } {
  if (simStep >= SIM_QUESTIONS.length) {
    return { status: 'completed' };
  }
  return SIM_QUESTIONS[simStep];
}

function processLocalSimulatedAnswer(payload: { selected_option: string }): AnswerResponse {
  const q = SIM_QUESTIONS[simStep] || SIM_QUESTIONS[0];
  const correctLetter = "A"; // option A is correct for simulated questions
  const selected = payload.selected_option.trim().toUpperCase();
  const isCorrect = selected === correctLetter || selected.startsWith("A");

  simStep++;

  return {
    is_correct: isCorrect,
    correct_option: correctLetter,
    explanation: isCorrect
      ? `Correct! ${q.competency_name} requires careful control of sampling variances and auxiliary alignment to ensure robust official releases.`
      : `The selected option is inaccurate. In ${q.competency_name}, the standard methodology balances design weights and auxiliary census projections to avoid biased estimates.`,
    action: isCorrect ? (simStep === 2 ? 'escalate' : 'continue') : 'remediate',
    concept_name: q.competency_name,
    new_difficulty: isCorrect ? 'Advanced' : 'Beginner',
    session_status: simStep >= SIM_QUESTIONS.length ? 'completed' : 'in_progress'
  };
}

export function resetSimulatedSession() {
  simStep = 0;
}
