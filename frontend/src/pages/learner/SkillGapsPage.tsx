import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { type CompetencyGap, fetchCompetencyGaps } from '../../services/api';
import { ArrowRight, ArrowLeft, MessageSquare, BookOpen, Filter, Search, ArrowUpDown } from 'lucide-react';

export const SkillGapsPage: React.FC = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [gaps, setGaps] = useState<CompetencyGap[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'gap' | 'score' | 'name'>('gap');

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/learner/profile')}
            className="text-xs font-semibold text-[var(--mc-slate-gray)] hover:text-[var(--mc-ink)] flex items-center gap-1 cursor-pointer mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Competency Profile</span>
          </button>
          <div className="mc-eyebrow mb-1">
            <span className="mc-eyebrow-dot" />
            <span>DIAGNOSTIC GAP MATRIX</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-medium text-[var(--mc-ink)]">
            Skill Gap Analysis
          </h1>
          <p className="text-xs sm:text-sm text-[var(--mc-slate-gray)] mt-1">
            Deficits measured against the 80.0 benchmark with Gemini LLM rationales.
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

      {/* Search & Sorting Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-[var(--mc-border-light)] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--mc-slate-gray)]" />
          <input
            type="text"
            placeholder="Search competencies, topics or rationales..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-full bg-[var(--mc-canvas)] border border-transparent focus:border-[var(--mc-ink)] outline-none text-[var(--mc-ink)] placeholder:[var(--mc-slate-gray)]"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="flex items-center gap-1 text-xs font-bold uppercase text-[var(--mc-slate-gray)] tracking-wider">
            <ArrowUpDown className="w-3 h-3" />
            <span>Sort:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'gap' | 'score' | 'name')}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[var(--mc-canvas)] border border-[var(--mc-border-light)] text-[var(--mc-ink)] outline-none cursor-pointer"
          >
            <option value="gap">Highest Deficit First</option>
            <option value="score">Lowest Current Score</option>
            <option value="name">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Domain Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[var(--mc-border-light)] pb-4">
        <div className="flex items-center gap-1 text-xs font-bold uppercase text-[var(--mc-slate-gray)] mr-2 tracking-wider">
          <Filter className="w-3 h-3" />
          <span>Domain:</span>
        </div>
        {domains.map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDomain(d)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              selectedDomain === d
                ? 'bg-[var(--mc-ink)] text-white shadow-xs'
                : 'bg-white hover:bg-gray-100 text-[var(--mc-granite)] border border-[var(--mc-border-light)]'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Gaps List */}
      {loading ? (
        <div className="py-16 text-center text-xs text-[var(--mc-slate-gray)]">
          Analyzing official competency gaps...
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-3xl border border-[var(--mc-border-light)] text-xs text-[var(--mc-granite)]">
          No competency gaps detected for this domain.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((gap) => {
            const isCritical = gap.gap >= 20;

            return (
              <div
                key={gap.competency_id}
                className="bg-white rounded-[28px] p-6 border border-[var(--mc-border-light)] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[var(--mc-canvas)] text-[var(--mc-slate-gray)]">
                      {gap.domain}
                    </span>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      isCritical
                        ? 'bg-[#FFF5F2] text-[var(--mc-signal-orange)] border border-[var(--mc-signal-orange)]/30'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      Deficit: -{Math.round(gap.gap)} pts
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-[var(--mc-ink)] mb-2">
                    {gap.name}
                  </h3>

                  {gap.rationale && (
                    <div className="mb-4 p-3 rounded-2xl bg-[#FAFAF9] border border-gray-100 text-xs text-[var(--mc-granite)] flex items-start gap-2">
                      <MessageSquare className="w-3.5 h-3.5 text-[var(--mc-signal-orange)] shrink-0 mt-0.5" />
                      <p className="leading-relaxed">
                        <strong className="text-[var(--mc-ink)]">AI Rationale: </strong>
                        {gap.rationale}
                      </p>
                    </div>
                  )}

                  <div className="space-y-1.5 mb-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-[var(--mc-slate-gray)]">Current Score: {gap.score}</span>
                      <span className="text-[var(--mc-ink)]">Target Benchmark: {gap.target_score}</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.min(gap.score, 100)}%`,
                          backgroundColor: isCritical ? 'var(--mc-signal-orange)' : 'var(--mc-ink)',
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-[var(--mc-slate-gray)]">
                    Target gap to close: {Math.round(gap.gap)} pts
                  </span>
                  <button
                    onClick={() => navigate('/learner/learning', { state: { targetGap: gap.name } })}
                    className="text-xs font-semibold text-[var(--mc-link-blue)] hover:underline flex items-center gap-1 cursor-pointer"
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
