import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { type CompetencyGap, fetchCompetencyGaps } from '../../services/api';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const CompetencyProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { session, currentOfficial } = useAuth();
  const [scores, setScores] = useState<CompetencyGap[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!session.officialId) return;
      setLoading(true);
      try {
        const res = await fetchCompetencyGaps(session.officialId);
        setScores(res);
      } catch (e) {
        console.error('Failed to load profile competencies:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [session.officialId]);

  return (
    <div className="space-y-8">
      {/* Header with Back Navigation */}
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
            <span>CADRE COMPETENCY INVENTORY</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-medium text-[var(--mc-ink)]">
            Competency Profile
          </h1>
          <p className="text-xs sm:text-sm text-[var(--mc-slate-gray)] mt-1">
            Official profile baseline and competency scores across 4 operational domains.
          </p>
        </div>

        <button
          onClick={() => navigate('/learner/gaps')}
          className="mc-btn-primary self-start sm:self-auto flex items-center gap-2"
        >
          <span>View Skill Gaps</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Profile Overview Card */}
      {currentOfficial && (
        <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-[var(--mc-border-light)] shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[var(--mc-ink)] text-white text-xl font-bold flex items-center justify-center shrink-0">
                {currentOfficial.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--mc-ink)]">
                  {currentOfficial.name}
                </h3>
                <p className="text-xs text-[var(--mc-slate-gray)]">
                  {currentOfficial.designation} • {currentOfficial.department}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[var(--mc-canvas)] text-[var(--mc-granite)]">
                    Exp: {currentOfficial.experience_years} Years
                  </span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[var(--mc-canvas)] text-[var(--mc-granite)]">
                    Edu: {currentOfficial.education}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col text-xs text-[var(--mc-slate-gray)] border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
              <span className="font-semibold text-[var(--mc-ink)] mb-1">Past Training Portfolio:</span>
              {currentOfficial.past_trainings && currentOfficial.past_trainings.length > 0 ? (
                <ul className="space-y-1">
                  {currentOfficial.past_trainings.map((t, i) => (
                    <li key={i}>• {t}</li>
                  ))}
                </ul>
              ) : (
                <span className="italic">None recorded</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Competency Score Distribution */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-[var(--mc-ink)]">
          Mapped Domain Competencies ({scores.length})
        </h3>

        {loading ? (
          <div className="py-12 text-center text-xs text-[var(--mc-slate-gray)]">
            Loading competency framework scores...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scores.map((c) => {
              const isProficient = c.score >= c.target_score;
              return (
                <div
                  key={c.competency_id}
                  className="bg-white rounded-2xl p-5 border border-[var(--mc-border-light)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[var(--mc-canvas)] text-[var(--mc-slate-gray)]">
                        {c.domain}
                      </span>
                      {isProficient && (
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Proficient
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-[var(--mc-ink)] mb-3">
                      {c.name}
                    </h4>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-gray-100">
                    <div className="flex justify-between text-xs">
                      <span className="text-[var(--mc-slate-gray)]">Current: <strong>{c.score}</strong></span>
                      <span className="text-[var(--mc-ink)]">Benchmark: {c.target_score}</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(c.score, 100)}%`,
                          backgroundColor: isProficient ? '#10B981' : 'var(--mc-ink)',
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
