import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSessionSummary, type SessionSummary } from '../../services/api';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, AlertTriangle, ArrowRight, BookOpen, ShieldCheck } from 'lucide-react';

export const AssessmentResultPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [summary, setSummary] = useState<SessionSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!sessionId) return;
      setLoading(true);
      try {
        const data = await getSessionSummary(sessionId);
        setSummary(data);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        console.error('Failed to load session summary:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [sessionId]);

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-4">
      {loading ? (
        <div className="py-24 text-center text-xs text-[var(--mc-slate-gray)] flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-[var(--mc-ink)] border-t-transparent rounded-full animate-spin" />
          <span>Synchronizing assessment evaluation metrics...</span>
        </div>
      ) : summary ? (
        <div className="bg-white rounded-[40px] p-8 sm:p-12 border border-[var(--mc-border-light)] text-center shadow-lg space-y-8 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-20 h-20 rounded-full bg-[var(--mc-ink)] text-white flex items-center justify-center mx-auto shadow-md">
            <Award className="w-10 h-10 text-[var(--mc-yellow)]" />
          </div>

          <div>
            <h1 className="text-3xl font-medium text-[var(--mc-ink)]">
              Assessment Result
            </h1>
            <p className="text-xs sm:text-sm text-[var(--mc-slate-gray)] mt-1 max-w-md mx-auto">
              Diagnostic metrics recorded. Mastered competencies receive a permanent +10 point score boost in the official database.
            </p>
          </div>

          {/* Score Pills */}
          <div className="inline-flex items-center gap-6 px-8 py-4 rounded-full bg-[var(--mc-canvas)]">
            <div>
              <div className="text-3xl font-bold text-[var(--mc-ink)]">
                {summary.score} / {summary.total}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--mc-slate-gray)] font-bold">
                Questions Correct
              </div>
            </div>
            <div className="w-px h-8 bg-gray-300" />
            <div>
              <div className="text-3xl font-bold text-emerald-600">
                {summary.total > 0 ? Math.round((summary.score / summary.total) * 100) : 100}%
              </div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--mc-slate-gray)] font-bold">
                Proficiency Rating
              </div>
            </div>
          </div>

          {/* Mastered vs Needs Practice */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Concepts Mastered (+10 pts)
              </h4>
              <ul className="text-xs text-emerald-950 space-y-1.5 font-medium">
                {summary.concepts_mastered && summary.concepts_mastered.length > 0 ? (
                  summary.concepts_mastered.map((c, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500 italic">No concepts reached mastery tier this round.</li>
                )}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Needs Reinforcement
              </h4>
              <ul className="text-xs text-amber-950 space-y-1.5 font-medium">
                {summary.concepts_needing_practice && summary.concepts_needing_practice.length > 0 ? (
                  summary.concepts_needing_practice.map((c, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span>•</span>
                      <span>{c}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500 italic">All evaluated concepts proficient!</li>
                )}
              </ul>
            </div>
          </div>

          {/* Action Navigation Paths */}
          <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('/learner/learning')}
              className="mc-btn-primary px-6 py-3 text-xs flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Continue with Recommended Courses</span>
            </button>

            <button
              onClick={() => navigate('/learner')}
              className="mc-btn-secondary px-6 py-3 text-xs flex items-center gap-2"
            >
              <span>Return to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center p-8 bg-white rounded-3xl border border-[var(--mc-border-light)] text-xs text-[var(--mc-slate-gray)]">
          Summary record unavailable.
        </div>
      )}
    </div>
  );
};
