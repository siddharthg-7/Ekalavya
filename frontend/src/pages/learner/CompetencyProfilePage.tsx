import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { type CompetencyGap, fetchCompetencyGaps } from '../../services/api';
import { ArrowRight, ArrowLeft, CheckCircle2, BarChart3, Filter } from 'lucide-react';

export const CompetencyProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { session, currentOfficial } = useAuth();
  const [scores, setScores] = useState<CompetencyGap[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState<string>('All');

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

  const domains = ['All', 'Statistical', 'Technical', 'DigitalGovernance', 'Behavioural'];

  const filteredScores = scores.filter(s => 
    selectedDomain === 'All' || s.domain.toLowerCase() === selectedDomain.toLowerCase()
  );

  // Grouped domain averages for Bklit Chart
  const domainStats = domains.filter(d => d !== 'All').map(dom => {
    const matching = scores.filter(s => s.domain.toLowerCase() === dom.toLowerCase());
    const avgScore = matching.length > 0 
      ? Math.round(matching.reduce((acc, curr) => acc + curr.score, 0) / matching.length)
      : 70;
    const avgTarget = matching.length > 0 
      ? Math.round(matching.reduce((acc, curr) => acc + curr.target_score, 0) / matching.length)
      : 80;
    return {
      domain: dom,
      score: avgScore,
      target: avgTarget,
      count: matching.length,
    };
  });

  return (
    <div className="space-y-8">
      {/* Header with Back Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/learner')}
            className="text-xs font-semibold text-[#52657A] hover:text-[#2563D9] flex items-center gap-1.5 cursor-pointer mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>
          <div className="mc-eyebrow mb-1">
            <span className="mc-eyebrow-dot" />
            <span>CADRE COMPETENCY INVENTORY</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#102A43] tracking-tight">
            Competency Profile
          </h1>
          <p className="text-xs sm:text-sm text-[#52657A] mt-1">
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
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE3EA] shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#102A43] text-white text-lg font-bold flex items-center justify-center shrink-0">
                {currentOfficial.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-base font-bold text-[#102A43]">
                  {currentOfficial.name}
                </h3>
                <p className="text-xs text-[#52657A]">
                  {currentOfficial.designation} • {currentOfficial.department}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#F7F9FC] text-[#52657A] border border-[#DCE3EA]">
                    Exp: {currentOfficial.experience_years} Years
                  </span>
                  <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#F7F9FC] text-[#52657A] border border-[#DCE3EA]">
                    Edu: {currentOfficial.education}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col text-xs text-[#52657A] border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
              <span className="font-semibold text-[#102A43] mb-1">Past Training Portfolio:</span>
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

      {/* Bklit UI Domain Benchmark Chart */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE3EA] shadow-2xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#2563D9]" />
              <h3 className="text-base font-bold text-[#102A43] tracking-tight">
                Domain Proficiency Benchmarks (Bklit Metric Matrix)
              </h3>
            </div>
            <p className="text-xs text-[#52657A] mt-0.5">
              Aggregated domain mastery compared with the 80.0 national target benchmark.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-[#52657A]">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-[#2563D9]" />
              <span>Current Score</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-0.5 border-t-2 border-dashed border-[#E8871A]" />
              <span>Target Standard (80)</span>
            </span>
          </div>
        </div>

        {/* SVG Bklit Precision Chart */}
        <div className="relative w-full h-[220px] sm:h-[240px]">
          <svg className="w-full h-full" viewBox="0 0 700 200" preserveAspectRatio="none">
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((val) => {
              const y = 160 - (val / 100) * 140;
              return (
                <g key={val}>
                  <line
                    x1="60"
                    y1={y}
                    x2="680"
                    y2={y}
                    stroke="#EDF2F7"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <text
                    x="48"
                    y={y + 3}
                    textAnchor="end"
                    className="text-[9px] font-mono fill-slate-400 select-none"
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {/* Target 80 Benchmark Line */}
            <line
              x1="60"
              y1={160 - (80 / 100) * 140}
              x2="680"
              y2={160 - (80 / 100) * 140}
              stroke="#E8871A"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.8"
            />
            <text
              x="685"
              y={160 - (80 / 100) * 140 + 3}
              textAnchor="start"
              className="text-[9px] font-mono font-bold fill-[#E8871A] select-none"
            >
              80.0
            </text>

            {/* Bars for 4 Domains */}
            {domainStats.map((item, idx) => {
              const xCenter = 120 + idx * 150;
              const barWidth = 44;
              const barHeight = (item.score / 100) * 140;
              const y = 160 - barHeight;
              const isPassing = item.score >= item.target;

              return (
                <g key={item.domain} className="group cursor-pointer">
                  {/* Background track */}
                  <rect
                    x={xCenter - barWidth / 2}
                    y={20}
                    width={barWidth}
                    height={140}
                    rx="4"
                    fill="#F7F9FC"
                  />
                  {/* Actual Score Bar */}
                  <rect
                    x={xCenter - barWidth / 2}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    rx="4"
                    fill={isPassing ? '#16845B' : '#2563D9'}
                    className="transition-all duration-300 hover:brightness-110"
                  />
                  {/* Monospace score badge on top of bar */}
                  <text
                    x={xCenter}
                    y={y - 6}
                    textAnchor="middle"
                    className="text-[10px] font-mono font-bold fill-[#102A43]"
                  >
                    {item.score}
                  </text>
                  {/* Domain Label */}
                  <text
                    x={xCenter}
                    y={180}
                    textAnchor="middle"
                    className="text-[10px] font-semibold fill-[#52657A]"
                  >
                    {item.domain}
                  </text>
                  <text
                    x={xCenter}
                    y={193}
                    textAnchor="middle"
                    className="text-[8.5px] font-mono fill-slate-400"
                  >
                    {item.count} items
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Domain Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#DCE3EA] pb-4">
        <div className="flex items-center gap-1 text-xs font-bold uppercase text-[#52657A] mr-2 tracking-wider">
          <Filter className="w-3 h-3" />
          <span>Filter Domain:</span>
        </div>
        {domains.map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDomain(d)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              selectedDomain === d
                ? 'bg-[#2563D9] text-white shadow-xs'
                : 'bg-white hover:bg-blue-50/50 text-[#52657A] border border-[#DCE3EA]'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Competency Score Distribution */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-[#102A43]">
            Mapped Domain Competencies ({filteredScores.length})
          </h3>
          <span className="text-xs text-[#52657A] font-mono">
            {filteredScores.filter(c => c.score >= c.target_score).length} of {filteredScores.length} Proficient
          </span>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs text-[#52657A]">
            Loading competency framework scores...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredScores.map((c) => {
              const isProficient = c.score >= c.target_score;
              return (
                <div
                  key={c.competency_id}
                  className="bg-white rounded-2xl p-5 border border-[#DCE3EA] hover:border-[#2563D9]/40 hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F7F9FC] text-[#52657A] border border-[#DCE3EA]">
                        {c.domain}
                      </span>
                      {isProficient ? (
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Proficient
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                          Gap: -{Math.round(c.target_score - c.score)} pts
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-[#102A43] mb-3">
                      {c.name}
                    </h4>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#52657A]">
                        Current: <strong className="font-mono text-[#102A43]">{c.score}</strong>
                      </span>
                      <span className="text-[#52657A]">
                        Target: <strong className="font-mono text-[#102A43]">{c.target_score}</strong>
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden relative">
                      {/* Target threshold marker */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-[#E8871A] z-10"
                        style={{ left: `${c.target_score}%` }}
                        title={`Target: ${c.target_score}`}
                      />
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(c.score, 100)}%`,
                          backgroundColor: isProficient ? '#16845B' : '#2563D9',
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
