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
        <div className="py-24 text-center text-xs text-[#52657A] flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-[#2563D9] border-t-transparent rounded-full animate-spin" />
          <span>Synchronizing assessment evaluation metrics...</span>
        </div>
      ) : summary ? (
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-[#DCE3EA] text-center shadow-2xs space-y-8 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-14 h-14 rounded-full bg-[#102A43] text-white flex items-center justify-center mx-auto shadow-2xs">
            <Award className="w-7 h-7 text-[#8CCBFF]" />
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#102A43] tracking-tight">
              Assessment Result
            </h1>
            <p className="text-xs sm:text-sm text-[#52657A] mt-1 max-w-md mx-auto">
              Diagnostic metrics recorded. Mastered competencies receive a permanent +10 point score boost in the official database.
            </p>
          </div>

          {/* Score Pills */}
          <div className="inline-flex items-center gap-6 px-8 py-4 rounded-xl bg-[#F7F9FC] border border-[#DCE3EA]">
            <div>
              <div className="text-3xl font-bold text-[#102A43] font-mono">
                {summary.score} / {summary.total}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-[#52657A] font-bold">
                Questions Correct
              </div>
            </div>
            <div className="w-px h-8 bg-[#DCE3EA]" />
            <div>
              <div className="text-3xl font-bold text-[#16845B] font-mono">
                {summary.total > 0 ? Math.round((summary.score / summary.total) * 100) : 100}%
              </div>
              <div className="text-[10px] uppercase tracking-wider text-[#52657A] font-bold">
                Proficiency Rating
              </div>
            </div>
          </div>

          {/* Mastered vs Needs Practice */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#16845B]" />
                Concepts Mastered (+10 pts)
              </h4>
              <ul className="text-xs text-emerald-950 space-y-1.5 font-medium">
                {summary.concepts_mastered && summary.concepts_mastered.length > 0 ? (
                  summary.concepts_mastered.map((c, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16845B] shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-slate-500 italic">No concepts reached mastery tier this round.</li>
                )}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-[#E8871A]" />
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
                  <li className="text-slate-500 italic">All evaluated concepts proficient!</li>
                )}
              </ul>
            </div>
          </div>

          {/* Action Navigation Paths */}
          <div className="pt-4 border-t border-[#DCE3EA] flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('/learner/learning')}
              className="mc-btn-primary px-6 py-2.5 text-xs flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Continue Learning</span>
            </button>

            <button
              onClick={() => navigate('/learner')}
              className="px-6 py-2.5 rounded-full bg-white hover:bg-slate-50 text-[#102A43] border border-[#DCE3EA] text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>Return to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center p-8 bg-white rounded-3xl border border-[#DCE3EA] text-xs text-[#52657A]">
          Summary record unavailable.
        </div>
      )}
    </div>
  );
};
