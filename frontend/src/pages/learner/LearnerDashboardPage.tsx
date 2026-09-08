import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { type LearnerDashboardData, fetchLearnerDashboard } from '../../services/api';
import { 
  Target, 
  ArrowRight, 
  BookOpen, 
  Brain, 
  TrendingUp, 
  Activity, 
  AlertCircle 
} from 'lucide-react';

export const LearnerDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { session, currentOfficial } = useAuth();
  const [data, setData] = useState<LearnerDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!session.officialId) return;
      setLoading(true);
      try {
        const res = await fetchLearnerDashboard(session.officialId);
        setData(res);
      } catch (e) {
        console.error('Failed to load dashboard:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [session.officialId]);

  const scores = data?.competency_scores || [];
  const avgScore = scores.length > 0 
    ? Math.round(scores.reduce((acc, c) => acc + Number(c.score), 0) / scores.length)
    : 68;
  const criticalGaps = scores.filter(s => (s.target_score - s.score) >= 20).length;
  const quizAttempts = data?.quiz_attempts || [];

  return (
    <div className="space-y-10">
      {/* Official Welcome Banner */}
      <div className="bg-white rounded-[36px] p-8 border border-[var(--mc-border-light)] shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-[var(--mc-ink)] text-white text-2xl font-bold flex items-center justify-center shrink-0">
              {currentOfficial?.name ? currentOfficial.name.charAt(0) : 'O'}
            </div>
            <div>
              <div className="mc-eyebrow mb-1">
                <span className="mc-eyebrow-dot" />
                <span>OFFICIAL COMPETENCY PORTAL</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-medium text-[var(--mc-ink)]">
                Welcome back, {currentOfficial?.name || 'Official'}
              </h1>
              <p className="text-xs sm:text-sm text-[var(--mc-slate-gray)] mt-0.5">
                {currentOfficial?.designation} • {currentOfficial?.department}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/learner/gaps')}
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-[var(--mc-canvas)] text-[var(--mc-ink)] hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Analyze Skill Gaps
            </button>
            <button
              onClick={() => navigate('/learner/assessments/new')}
              className="mc-btn-primary text-xs py-2.5 px-5 flex items-center gap-2"
            >
              <Brain className="w-3.5 h-3.5 text-[var(--mc-yellow)]" />
              <span>Launch Assessment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Vital Metrics Grid */}
      {loading ? (
        <div className="py-12 text-center text-xs text-[var(--mc-slate-gray)] flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-[var(--mc-ink)] border-t-transparent rounded-full animate-spin" />
          <span>Synchronizing competency telemetry...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Metric 1 */}
          <div 
            onClick={() => navigate('/learner/profile')}
            className="mc-card-lifted p-6 cursor-pointer group"
          >
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--mc-slate-gray)] mb-2">
              <span>Cadre Average Score</span>
              <Activity className="w-4 h-4 text-[var(--mc-signal-orange)]" />
            </div>
            <div className="text-3xl font-bold text-[var(--mc-ink)]">
              {avgScore}%
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-3 overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${avgScore}%`,
                  backgroundColor: avgScore >= 75 ? '#10B981' : 'var(--mc-signal-orange)'
                }}
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-[var(--mc-link-blue)] font-semibold">
              <span>View Profile</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Metric 2 */}
          <div 
            onClick={() => navigate('/learner/gaps')}
            className="mc-card-lifted p-6 cursor-pointer group"
          >
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--mc-slate-gray)] mb-2">
              <span>Critical Skill Gaps</span>
              <AlertCircle className="w-4 h-4 text-[var(--mc-signal-orange)]" />
            </div>
            <div className="text-3xl font-bold text-[var(--mc-signal-orange)]">
              {criticalGaps} High Priority
            </div>
            <p className="text-xs text-[var(--mc-slate-gray)] mt-3">
              Competencies trailing the 80.0 benchmark by ≥ 20 points.
            </p>
            <div className="mt-4 flex items-center justify-between text-xs text-[var(--mc-signal-orange)] font-semibold">
              <span>Resolve Gaps</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Metric 3 */}
          <div 
            onClick={() => navigate('/learner/progress')}
            className="mc-card-lifted p-6 cursor-pointer group"
          >
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--mc-slate-gray)] mb-2">
              <span>Adaptive Tests Completed</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-bold text-[var(--mc-ink)]">
              {quizAttempts.length}
            </div>
            <p className="text-xs text-[var(--mc-slate-gray)] mt-3">
              {quizAttempts.length > 0 
                ? `Latest: ${quizAttempts[0].score}/${quizAttempts[0].total} points scored`
                : 'No assessments completed yet'}
            </p>
            <div className="mt-4 flex items-center justify-between text-xs text-emerald-700 font-semibold">
              <span>View Progress</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      )}

      {/* Navigation Quick Hub Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          onClick={() => navigate('/learner/profile')}
          className="p-6 rounded-[28px] bg-white border border-[var(--mc-border-light)] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-[var(--mc-canvas)] text-[var(--mc-signal-orange)] flex items-center justify-center mb-3">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[var(--mc-ink)] mb-1">Competency Profile</h3>
            <p className="text-xs text-[var(--mc-slate-gray)] leading-relaxed">
              33 domain competencies mapped to your MoSPI official cadre.
            </p>
          </div>
          <span className="text-xs font-semibold text-[var(--mc-ink)] mt-4 flex items-center gap-1">
            <span>Explore</span> →
          </span>
        </div>

        <div 
          onClick={() => navigate('/learner/gaps')}
          className="p-6 rounded-[28px] bg-white border border-[var(--mc-border-light)] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-[var(--mc-canvas)] text-[var(--mc-signal-orange)] flex items-center justify-center mb-3">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[var(--mc-ink)] mb-1">Skill Gap Analysis</h3>
            <p className="text-xs text-[var(--mc-slate-gray)] leading-relaxed">
              AI rationales and deficit measurements below the 80.0 standard.
            </p>
          </div>
          <span className="text-xs font-semibold text-[var(--mc-ink)] mt-4 flex items-center gap-1">
            <span>Review</span> →
          </span>
        </div>

        <div 
          onClick={() => navigate('/learner/learning')}
          className="p-6 rounded-[28px] bg-white border border-[var(--mc-border-light)] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-[var(--mc-canvas)] text-[var(--mc-link-blue)] flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[var(--mc-ink)] mb-1">Personalized Learning</h3>
            <p className="text-xs text-[var(--mc-slate-gray)] leading-relaxed">
              iGOT and NSSTA courses matched by vector similarity.
            </p>
          </div>
          <span className="text-xs font-semibold text-[var(--mc-ink)] mt-4 flex items-center gap-1">
            <span>Catalog</span> →
          </span>
        </div>

        <div 
          onClick={() => navigate('/learner/assessments')}
          className="p-6 rounded-[28px] bg-white border border-[var(--mc-border-light)] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-[var(--mc-canvas)] text-emerald-600 flex items-center justify-center mb-3">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[var(--mc-ink)] mb-1">Assessments</h3>
            <p className="text-xs text-[var(--mc-slate-gray)] leading-relaxed">
              Adaptive diagnostic tests with real-time concept remediation.
            </p>
          </div>
          <span className="text-xs font-semibold text-[var(--mc-ink)] mt-4 flex items-center gap-1">
            <span>Practice</span> →
          </span>
        </div>
      </div>
    </div>
  );
};
