import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { type CompetencyGap, fetchCompetencyGaps } from '../../services/api';
import { ArrowRight, ArrowLeft, MessageSquare, BookOpen, Filter, Search, ArrowUpDown, AlertCircle } from 'lucide-react';

export const SkillGapsPage: React.FC = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [gaps, setGaps] = useState<CompetencyGap[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'gap' | 'score' | 'name'>('gap');
  const [hoveredGapIndex, setHoveredGapIndex] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      if (!session.officialId) return;
      setLoading(true);
      try {
        const res = await fetchCompetencyGaps(session.officialId);
        setGaps(res);
      } catch (e) {
        console.error('Failed to load gaps:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [session.officialId]);

  const domains = ['All', 'Statistical', 'Technical', 'DigitalGovernance', 'Behavioural'];

  const filtered = gaps
    .filter((g) => {
      const matchDomain = selectedDomain === 'All' || g.domain.toLowerCase() === selectedDomain.toLowerCase();
      const matchSearch =
        !searchQuery.trim() ||
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (g.rationale && g.rationale.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchDomain && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'gap') return b.gap - a.gap;
      if (sortBy === 'score') return a.score - b.score;
      return a.name.localeCompare(b.name);
    });

  const topGapsForChart = [...gaps].sort((a, b) => b.gap - a.gap).slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/learner/profile')}
            className="text-xs font-semibold text-[#52657A] hover:text-[#2563D9] flex items-center gap-1.5 cursor-pointer mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Competency Profile</span>
          </button>
          <div className="mc-eyebrow mb-1">
            <span className="mc-eyebrow-dot" />
            <span>DIAGNOSTIC GAP MATRIX</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#102A43] tracking-tight">
            Skill Gap Analysis
          </h1>
          <p className="text-xs sm:text-sm text-[#52657A] mt-1">
            Deficits measured against the 80.0 standard benchmark with Gemini AI rationales.
          </p>
        </div>

        <button
          onClick={() => navigate('/learner/learning')}
          className="mc-btn-primary self-start sm:self-auto flex items-center gap-2"
        >
          <BookOpen className="w-4 h-4" />
          <span>Find Learning Courses</span>
        </button>
      </div>

      {/* Bklit UI Deficit Magnitude Spectrum Chart */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE3EA] shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#E8871A]" />
              <h3 className="text-base font-bold text-[#102A43] tracking-tight">
                Top Workforce Deficit Vectors (Bklit Precision Metric)
              </h3>
            </div>
            <p className="text-xs text-[#52657A] mt-0.5">
              Ranked magnitude of score gaps requiring targeted curriculum intervention.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-[#52657A]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8871A]" />
              <span>Critical Deficit (≥20 pts)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2563D9]" />
              <span>Moderate Deficit</span>
            </span>
          </div>
        </div>

        {/* SVG Horizontal Comparative Chart */}
        <div className="relative w-full overflow-x-auto">
          <svg className="w-full min-w-[640px] h-[190px]" viewBox="0 0 680 190">
            {/* Grid vertical lines (0 to 40 pts gap) */}
            {[0, 10, 20, 30, 40].map((val) => {
              const x = 200 + (val / 40) * 440;
              return (
                <g key={val}>
                  <line
                    x1={x}
                    y1="10"
                    x2={x}
                    y2="160"
                    stroke="#EDF2F7"
                    strokeWidth="1"
                    strokeDasharray="2 3"
                  />
                  <text
                    x={x}
                    y="176"
                    textAnchor="middle"
                    className="text-[9px] font-mono fill-slate-400 select-none"
                  >
                    -{val} pts
                  </text>
                </g>
              );
            })}

            {/* Horizontal rows for top 5 gaps */}
            {topGapsForChart.slice(0, 5).map((gap, idx) => {
              const y = 20 + idx * 28;
              const barWidth = Math.max(10, (gap.gap / 40) * 440);
              const isCritical = gap.gap >= 20;
              const isHovered = hoveredGapIndex === idx;

              return (
                <g
                  key={gap.competency_id}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredGapIndex(idx)}
                  onMouseLeave={() => setHoveredGapIndex(null)}
                >
                  {/* Competency Name */}
                  <text
                    x="190"
                    y={y + 13}
                    textAnchor="end"
                    className={`text-[10px] font-medium transition-colors ${
                      isHovered ? 'fill-[#2563D9] font-bold' : 'fill-[#102A43]'
                    }`}
                  >
                    {gap.name.length > 24 ? gap.name.slice(0, 22) + '…' : gap.name}
                  </text>

                  {/* Background track */}
                  <rect
                    x="200"
                    y={y + 3}
                    width="440"
                    height="14"
                    rx="3"
                    fill="#F7F9FC"
                  />

                  {/* Deficit bar */}
                  <rect
                    x="200"
                    y={y + 3}
                    width={barWidth}
                    height="14"
                    rx="3"
                    fill={isCritical ? '#E8871A' : '#2563D9'}
                    className="transition-all duration-300"
                    opacity={isHovered ? 1 : 0.88}
                  />

                  {/* Monospace Gap Value */}
                  <text
                    x={200 + barWidth + 8}
                    y={y + 14}
                    textAnchor="start"
                    className={`text-[9.5px] font-mono font-bold ${
                      isCritical ? 'fill-[#E8871A]' : 'fill-[#2563D9]'
                    }`}
                  >
                    -{Math.round(gap.gap)} pts
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Search & Sorting Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-[#DCE3EA] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#52657A]" />
          <input
            type="text"
            placeholder="Search competencies, topics or rationales..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-full bg-[#F7F9FC] border border-transparent focus:border-[#2563D9] outline-none text-[#102A43] placeholder:[#52657A]"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="flex items-center gap-1 text-xs font-bold uppercase text-[#52657A] tracking-wider">
            <ArrowUpDown className="w-3 h-3" />
            <span>Sort:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'gap' | 'score' | 'name')}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#F7F9FC] border border-[#DCE3EA] text-[#102A43] outline-none cursor-pointer hover:border-[#2563D9] transition-colors"
          >
            <option value="gap">Highest Deficit First</option>
            <option value="score">Lowest Current Score</option>
            <option value="name">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Domain Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#DCE3EA] pb-4">
        <div className="flex items-center gap-1 text-xs font-bold uppercase text-[#52657A] mr-2 tracking-wider">
          <Filter className="w-3 h-3" />
          <span>Domain:</span>
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

      {/* Gaps List */}
      {loading ? (
        <div className="py-16 text-center text-xs text-[#52657A]">
          Analyzing official competency gaps...
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-3xl border border-[#DCE3EA] text-xs text-[#52657A]">
          No competency gaps detected for this domain filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((gap) => {
            const isCritical = gap.gap >= 20;

            return (
              <div
                key={gap.competency_id}
                className="bg-white rounded-xl p-6 border border-[#DCE3EA] hover:border-[#2563D9]/40 hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F7F9FC] text-[#52657A] border border-[#DCE3EA]">
                      {gap.domain}
                    </span>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      isCritical
                        ? 'bg-[#FFF5F2] text-[#E8871A] border border-[#E8871A]/30'
                        : 'bg-blue-50 text-[#2563D9] border border-blue-200'
                    }`}>
                      Deficit: -{Math.round(gap.gap)} pts
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-[#102A43] mb-2">
                    {gap.name}
                  </h3>

                  {gap.rationale && (
                    <div className="mb-4 p-3.5 rounded-2xl bg-[#F7F9FC] border border-slate-100 text-xs text-[#52657A] flex items-start gap-2.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#E8871A] shrink-0 mt-0.5" />
                      <p className="leading-relaxed">
                        <strong className="text-[#102A43]">AI Rationale: </strong>
                        {gap.rationale}
                      </p>
                    </div>
                  )}

                  <div className="space-y-1.5 mb-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#52657A]">
                        Current Score: <strong className="font-mono text-[#102A43]">{gap.score}</strong>
                      </span>
                      <span className="text-[#52657A]">
                        Target Benchmark: <strong className="font-mono text-[#102A43]">{gap.target_score}</strong>
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(gap.score, 100)}%`,
                          backgroundColor: isCritical ? '#E8871A' : '#2563D9',
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-[#52657A]">
                    Gap to close: <strong className="font-mono text-[#102A43]">{Math.round(gap.gap)} pts</strong>
                  </span>
                  <button
                    onClick={() => navigate('/learner/learning', { state: { targetGap: gap.name } })}
                    className="text-xs font-semibold text-[#2563D9] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Find Learning</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
