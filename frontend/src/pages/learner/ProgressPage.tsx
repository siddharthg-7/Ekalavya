import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { type LearnerDashboardData, fetchLearnerDashboard } from '../../services/api';
import { ArrowLeft, Award, CheckCircle2, Clock, Brain } from 'lucide-react';

export const ProgressPage: React.FC = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
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
        console.error('Failed to load progress telemetry:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [session.officialId]);

  const scores = data?.competency_scores || [];
  const attempts = data?.quiz_attempts || [];
  const avgScore = scores.length > 0 
    ? Math.round(scores.reduce((acc, c) => acc + Number(c.score), 0) / scores.length)
    : 70;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/learner')}
            className="text-xs font-semibold text-[var(--mc-slate-gray)] hover:text-[var(--mc-ink)] flex items-center gap-1 cursor-pointer mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>
          <div className="mc-eyebrow mb-1">
            <span className="mc-eyebrow-dot" />
            <span>CAPACITY GROWTH TRAJECTORY</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-medium text-[var(--mc-ink)]">
            Progress & Achievements
          </h1>
          <p className="text-xs sm:text-sm text-[var(--mc-slate-gray)] mt-1">
            Historical assessment telemetry and competency point milestones.
          </p>
        </div>

        <button
          onClick={() => navigate('/learner/assessments/new')}
          className="mc-btn-primary self-start sm:self-auto flex items-center gap-2"
        >
          <Brain className="w-4 h-4 text-[var(--mc-yellow)]" />
          <span>New Assessment</span>
        </button>
      </div>

      {/* Trajectory Stats Card */}
      <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-[var(--mc-border-light)] shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--mc-slate-gray)] block mb-1">
              Overall Proficiency Index
            </span>
            <span className="text-3xl font-bold text-[var(--mc-ink)]">{avgScore}%</span>
            <p className="text-[11px] text-[var(--mc-granite)] mt-1">Average across all 33 evaluated competencies</p>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--mc-slate-gray)] block mb-1">
              Completed Adaptive Quizzes
            </span>
            <span className="text-3xl font-bold text-emerald-600">{attempts.length}</span>
            <p className="text-[11px] text-[var(--mc-granite)] mt-1">Diagnostic sessions stored in Neon database</p>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--mc-slate-gray)] block mb-1">
              Target Standard Benchmark
            </span>
            <span className="text-3xl font-bold text-[var(--mc-signal-orange)]">80.0</span>
            <p className="text-[11px] text-[var(--mc-granite)] mt-1">National Cadre Target Score</p>
          </div>
        </div>
      </div>

      {/* Assessment Audit Log */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-[var(--mc-ink)]">
          Assessment Log History
        </h3>

        {loading ? (
          <div className="py-12 text-center text-xs text-[var(--mc-slate-gray)]">
            Loading assessment logs...
          </div>
        ) : attempts.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-[var(--mc-border-light)] text-xs text-[var(--mc-slate-gray)]">
            No assessment attempts on record yet.
          </div>
        ) : (
          <div className="space-y-3">
            {attempts.map((att, i) => (
              <div
                key={att.id || i}
                className="bg-white rounded-2xl p-5 border border-[var(--mc-border-light)] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--mc-ink)] text-white flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-[var(--mc-light-orange)]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[var(--mc-ink)]">
                        Adaptive Session #{attempts.length - i}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {att.score} / {att.total} Correct ({Math.round((att.score / att.total) * 100)}%)
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {att.concepts_mastered && att.concepts_mastered.map((cm, idx) => (
                        <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {cm}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-[var(--mc-slate-gray)] flex items-center gap-1.5 self-end sm:self-center">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{new Date(att.taken_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
