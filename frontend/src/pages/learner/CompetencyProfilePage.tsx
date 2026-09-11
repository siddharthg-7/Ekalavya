import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { type CompetencyGap, type OfficialDetail, fetchCompetencyGaps, fetchOfficialDetail } from '../../services/api';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  BarChart3, 
  Filter, 
  Search, 
  Brain, 
  SlidersHorizontal 
} from 'lucide-react';

export const CompetencyProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { session, currentOfficial } = useAuth();
  const [official, setOfficial] = useState<OfficialDetail | null>(currentOfficial);
  const [scores, setScores] = useState<CompetencyGap[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'proficient' | 'gap'>('all');
  const [sortBy, setSortBy] = useState<'gap' | 'score' | 'name'>('gap');

  useEffect(() => {
    let isMounted = true;
    async function load() {
      const activeId = session.officialId || currentOfficial?.id || 'ddbffb96-2eb5-4246-b7ed-4c5065f3ac15';
      setLoading(true);
      try {
        const [gapsData, offData] = await Promise.all([
          fetchCompetencyGaps(activeId),
          !currentOfficial ? fetchOfficialDetail(activeId) : Promise.resolve(currentOfficial)
        ]);
        if (isMounted) {
          setScores(gapsData);
          if (offData) setOfficial(offData);
        }
      } catch (e) {
        console.error('Failed to load profile competencies:', e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => { isMounted = false; };
  }, [session.officialId, currentOfficial]);

  const domains = ['All', 'Statistical', 'Technical', 'DigitalGovernance', 'Behavioural'];

  const filteredScores = scores
    .filter(s => {
      const matchesDomain = selectedDomain === 'All' || s.domain.toLowerCase() === selectedDomain.toLowerCase();
      const matchesSearch = !searchQuery.trim() || 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.rationale && s.rationale.toLowerCase().includes(searchQuery.toLowerCase()));
      const isProficient = s.score >= s.target_score;
      const matchesStatus = statusFilter === 'all' 
        ? true 
        : statusFilter === 'proficient' 
          ? isProficient 
          : !isProficient;
      return matchesDomain && matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'gap') {
        const gapA = Math.max(0, a.target_score - a.score);
        const gapB = Math.max(0, b.target_score - b.score);
        return gapB - gapA;
      }
      if (sortBy === 'score') return b.score - a.score;
      return a.name.localeCompare(b.name);
    });

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
      label: dom === 'DigitalGovernance' ? 'Digital Governance' : dom,
      score: avgScore,
      target: avgTarget,
      count: matching.length,
    };
  });

  return (
    <div className="space-y-8 font-['Noto_Sans','Inter',sans-serif] max-w-[1440px] mx-auto">
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
          <h1 className="text-2xl sm:text-3xl font-bold text-[#102A43] tracking-tight">
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

      {/* 4 Summary Telemetry KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => setStatusFilter('all')}
          className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer ${
            statusFilter === 'all' ? 'border-[#102A43] ring-1 ring-[#102A43] shadow-xs' : 'border-[#DCE3EA] hover:border-slate-300'
          }`}
          title="Click to view all competencies"
        >
          <div className="text-[11px] font-bold text-[#52657A] uppercase tracking-wider">Total Competencies</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#102A43] font-mono mt-1">
            {scores.length || 33}
          </div>
          <div className="text-xs text-slate-400 mt-1">Mapped to Ministry Cadre</div>
        </div>

        <div 
          onClick={() => setStatusFilter('proficient')}
          className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer ${
            statusFilter === 'proficient' ? 'border-[#16845B] ring-1 ring-[#16845B] bg-emerald-50/20 shadow-xs' : 'border-[#DCE3EA] hover:border-emerald-300'
          }`}
          title="Click to filter proficient competencies (≥80)"
        >
          <div className="text-[11px] font-bold text-[#16845B] uppercase tracking-wider">Proficient (≥80)</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#16845B] font-mono mt-1">
            {scores.filter(s => s.score >= s.target_score).length}
          </div>
          <div className="text-xs text-emerald-600 mt-1">Verified Standards Met</div>
        </div>

        <div 
          onClick={() => setStatusFilter('gap')}
          className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer ${
            statusFilter === 'gap' ? 'border-[#E8871A] ring-1 ring-[#E8871A] bg-amber-50/20 shadow-xs' : 'border-[#DCE3EA] hover:border-amber-300'
          }`}
          title="Click to filter priority capability gaps (<80)"
        >
          <div className="text-[11px] font-bold text-[#E8871A] uppercase tracking-wider">Priority Gaps (&lt;80)</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#E8871A] font-mono mt-1">
            {scores.filter(s => s.score < s.target_score).length}
          </div>
          <div className="text-xs text-amber-600 mt-1">Upskilling Targets</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#DCE3EA] shadow-2xs">
          <div className="text-[11px] font-bold text-[#2563D9] uppercase tracking-wider">Average Alignment</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#2563D9] font-mono mt-1">
            {scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b.score, 0) / scores.length) : 68}%
          </div>
          <div className="text-xs text-blue-600 mt-1">Overall Cadre Proficiency</div>
        </div>
      </div>

      {/* Profile Overview Card */}
      {official ? (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE3EA] shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#102A43] text-white text-xl font-bold flex items-center justify-center shrink-0 shadow-xs">
                {official.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#102A43]">
                  {official.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#52657A] font-medium">
                  {official.designation} • {official.department}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#F7F9FC] text-[#52657A] border border-[#DCE3EA]">
                    Experience: {official.experience_years} Years
                  </span>
                  <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#F7F9FC] text-[#52657A] border border-[#DCE3EA]">
                    Education: {official.education}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col text-xs text-[#52657A] border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 max-w-sm">
              <span className="font-semibold text-[#102A43] mb-1.5 uppercase tracking-wider text-[11px]">
                Past Training Portfolio:
              </span>
              {official.past_trainings && official.past_trainings.length > 0 ? (
                <ul className="space-y-1">
                  {official.past_trainings.map((t, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#2563D9] font-bold">•</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="italic text-slate-400">Official Statistics Induction (iGOT)</span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-6 border border-[#DCE3EA] animate-pulse h-28" />
      )}

      {/* Bklit UI Domain Benchmark Chart */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE3EA] shadow-2xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#2563D9]" />
              <h3 className="text-base sm:text-lg font-bold text-[#102A43] tracking-tight">
                Domain Proficiency Benchmarks (Bklit Metric Matrix)
              </h3>
            </div>
            <p className="text-xs text-[#52657A] mt-0.5">
              Aggregated domain mastery across all 33 competencies compared with the 80.0 national target benchmark.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-[#52657A]">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-[#2563D9]" />
              <span>Current Score</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-0.5 border-t-2 border-dashed border-[#E8871A]" />
              <span>Target Standard (80.0)</span>
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
              const barWidth = 48;
              const barHeight = (item.score / 100) * 140;
              const y = 160 - barHeight;
              const isPassing = item.score >= item.target;

              return (
                <g 
                  key={item.domain} 
                  className="group cursor-pointer"
                  onClick={() => setSelectedDomain(item.domain)}
                >
                  {/* Background track */}
                  <rect
                    x={xCenter - barWidth / 2}
                    y={20}
                    width={barWidth}
                    height={140}
                    rx="6"
                    fill="#F7F9FC"
                  />
                  {/* Actual Score Bar */}
                  <rect
                    x={xCenter - barWidth / 2}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    rx="6"
                    fill={isPassing ? '#16845B' : '#2563D9'}
                    className="transition-all duration-300 group-hover:brightness-110"
                  />
                  {/* Monospace score badge on top of bar */}
                  <text
                    x={xCenter}
                    y={y - 6}
                    textAnchor="middle"
                    className="text-[11px] font-mono font-bold fill-[#102A43]"
                  >
                    {item.score}%
                  </text>
                  {/* Domain Label */}
                  <text
                    x={xCenter}
                    y={180}
                    textAnchor="middle"
                    className="text-[10px] font-bold fill-[#52657A] group-hover:fill-[#2563D9]"
                  >
                    {item.label}
                  </text>
                  <text
                    x={xCenter}
                    y={193}
                    textAnchor="middle"
                    className="text-[9px] font-mono fill-slate-400"
                  >
                    {item.count} competencies
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Controls Bar: Search, Domain Filters, Status Filter, Sorting */}
      <div className="bg-white rounded-2xl p-5 border border-[#DCE3EA] shadow-2xs space-y-4">
        {/* Search & Sort Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#52657A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search competencies by name, keyword, or rationale..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-[#F7F9FC] border border-[#DCE3EA] text-[#102A43] text-xs font-medium focus:border-[#2563D9] focus:bg-white outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Status Filter */}
            <div className="flex items-center gap-1 bg-[#F7F9FC] p-1 rounded-xl border border-[#DCE3EA] text-xs">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  statusFilter === 'all' ? 'bg-[#2563D9] text-white shadow-xs' : 'text-[#52657A] hover:text-[#102A43]'
                }`}
              >
                All ({scores.length})
              </button>
              <button
                onClick={() => setStatusFilter('proficient')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  statusFilter === 'proficient' ? 'bg-[#16845B] text-white shadow-xs' : 'text-[#52657A] hover:text-[#102A43]'
                }`}
              >
                Proficient ({scores.filter(s => s.score >= s.target_score).length})
              </button>
              <button
                onClick={() => setStatusFilter('gap')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  statusFilter === 'gap' ? 'bg-[#E8871A] text-white shadow-xs' : 'text-[#52657A] hover:text-[#102A43]'
                }`}
              >
                Gaps ({scores.filter(s => s.score < s.target_score).length})
              </button>
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-1.5 text-xs text-[#52657A]">
              <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="h-9 px-2.5 rounded-lg bg-[#F7F9FC] border border-[#DCE3EA] text-xs font-semibold text-[#102A43] outline-none cursor-pointer"
              >
                <option value="gap">Largest Gap First</option>
                <option value="score">Highest Score First</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1 text-xs font-bold uppercase text-[#52657A] mr-1 tracking-wider">
            <Filter className="w-3 h-3" />
            <span>Domain:</span>
          </div>
          {domains.map((d) => {
            const label = d === 'DigitalGovernance' ? 'Digital Governance' : d;
            const count = d === 'All' ? scores.length : scores.filter(s => s.domain.toLowerCase() === d.toLowerCase()).length;
            return (
              <button
                key={d}
                onClick={() => setSelectedDomain(d)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedDomain === d
                    ? 'bg-[#102A43] text-white shadow-xs'
                    : 'bg-[#F7F9FC] hover:bg-slate-200 text-[#52657A] border border-[#DCE3EA]'
                }`}
              >
                <span>{label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  selectedDomain === d ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Competency Score Distribution */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#102A43] tracking-tight">
            Mapped Competency Portfolio ({filteredScores.length} of {scores.length})
          </h3>
          <span className="text-xs text-[#52657A] font-mono">
            Target Standard: 80.0 pts
          </span>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs text-[#52657A]">
            Loading live cadre competency framework scores...
          </div>
        ) : filteredScores.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#DCE3EA] text-sm text-[#52657A]">
            No competencies match the selected filters or search query.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredScores.map((c) => {
              const isProficient = c.score >= c.target_score;
              const gapPts = Math.max(0, Math.round(c.target_score - c.score));
              const domainClean = c.domain === 'DigitalGovernance' ? 'Digital Governance' : c.domain;
              const isHighPriority = !isProficient && gapPts >= 15;

              return (
                <div
                  key={c.competency_id}
                  className={`bg-white rounded-2xl p-6 border transition-all flex flex-col justify-between group ${
                    isHighPriority 
                      ? 'border-amber-300/80 hover:border-amber-500 shadow-2xs bg-amber-50/10' 
                      : 'border-[#DCE3EA] hover:border-[#2563D9]/50 hover:shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F7F9FC] text-[#52657A] border border-[#DCE3EA]">
                        {domainClean}
                      </span>
                      {isProficient ? (
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Proficient
                        </span>
                      ) : isHighPriority ? (
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs">
                          Priority Deficit: -{gapPts} pts
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                          Gap: -{gapPts} pts
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-bold text-[#102A43] group-hover:text-[#2563D9] transition-colors mb-2">
                      {c.name}
                    </h4>

                    {c.rationale && (
                      <p className="text-xs text-[#52657A] leading-relaxed mb-4 line-clamp-2">
                        {c.rationale}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#52657A]">
                        Current Score: <strong className="font-mono text-[#102A43] text-sm">{c.score}</strong>
                      </span>
                      <span className="text-[#52657A]">
                        Target Standard: <strong className="font-mono text-[#102A43] text-sm">{c.target_score}</strong>
                      </span>
                    </div>

                    {/* Progress Bar with Orange Benchmark Marker */}
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden relative">
                      <div
                        className="absolute top-0 bottom-0 w-1 bg-[#E8871A] z-10"
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

                    {/* Quick Assessment Launcher */}
                    <div className="pt-2 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-400 font-mono">
                        {isProficient ? 'Verified Competency' : 'Action Recommended'}
                      </span>
                      <button
                        onClick={() => navigate('/learner/assessments/new')}
                        className="text-xs font-semibold text-[#2563D9] hover:text-[#1D4ED8] flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Brain className="w-3.5 h-3.5" />
                        <span>Assess Skill</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
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
