import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { type LearnerDashboardData, fetchLearnerDashboard } from '../../services/api';
import { 
  ArrowRight, 
  Brain, 
  BookOpen,
  Sparkles,
  AlertCircle,
  Zap,
  Award,
  ChevronRight
} from 'lucide-react';

export const LearnerDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { session, currentOfficial } = useAuth();
  
  const [data, setData] = useState<LearnerDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeHoveredKey, setActiveHoveredKey] = useState<string | null>(null);
  const [hoveredProgressIndex, setHoveredProgressIndex] = useState<number | null>(null);
  const [activeLearningStage, setActiveLearningStage] = useState<number>(1); // Step 02 active by default
  const [selectedMoveGapIndex, setSelectedMoveGapIndex] = useState<number>(0);
  const [radarMode, setRadarMode] = useState<'balanced' | 'domains' | 'gaps'>('balanced');

  useEffect(() => {
    async function load() {
      if (!session.officialId) return;
      setLoading(true);
      try {
        const res = await fetchLearnerDashboard(session.officialId);
        setData(res);
      } catch (e) {
        console.error('Failed to load dashboard:', e);
        toast.error('Unable to fetch live competency telemetry');
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
    : 68;

  const formatDomain = (dom: string) => {
    if (dom === 'DigitalGovernance') return 'Digital Governance';
    return dom;
  };

  const allGaps = scores.map((s, idx) => ({
    key: s.competency_id || `comp_${idx}`,
    label: s.competency_name,
    domain: s.domain || 'General',
    current: Number(s.score),
    target: Number(s.target_score) || 80,
    gap: Math.max(0, (Number(s.target_score) || 80) - Number(s.score))
  }));

  const totalDeficitCount = allGaps.filter(g => g.gap > 0).length;

  // Domain aggregator
  const domainMap: Record<string, { totalScore: number; totalTarget: number; count: number }> = {};
  scores.forEach(s => {
    const d = s.domain || 'General';
    if (!domainMap[d]) domainMap[d] = { totalScore: 0, totalTarget: 0, count: 0 };
    domainMap[d].totalScore += Number(s.score);
    domainMap[d].totalTarget += Number(s.target_score) || 80;
    domainMap[d].count += 1;
  });

  const domainSummaries = Object.entries(domainMap).map(([d, stat]) => {
    const avg = Math.round(stat.totalScore / (stat.count || 1));
    const target = Math.round(stat.totalTarget / (stat.count || 1));
    return {
      domain: d,
      name: formatDomain(d),
      avgScore: avg,
      targetScore: target,
      gap: Math.max(0, target - avg),
      count: stat.count
    };
  });

  // Balanced 6-axis selection across all 4 domains
  const getBalancedRadarData = () => {
    if (scores.length < 4) {
      return [
        { key: 'sql_agg', label: 'SQL for Complex Aggregation', domain: 'Technical', current: 55, target: 80, gap: 25 },
        { key: 'data_sharing', label: 'Inter-Agency Data Sharing', domain: 'DigitalGovernance', current: 60, target: 80, gap: 20 },
        { key: 'supply_tables', label: 'Supply & Use Tables', domain: 'Statistical', current: 68, target: 85, gap: 17 },
        { key: 'survey_design', label: 'Survey Sampling & Weights', domain: 'Statistical', current: 82, target: 80, gap: 0 },
        { key: 'report_drafting', label: 'National Accounts Reports', domain: 'Behavioural', current: 85, target: 80, gap: 0 },
        { key: 'field_ops', label: 'Field Quality Auditing', domain: 'Technical', current: 78, target: 80, gap: 2 },
      ];
    }

    const byDomain: Record<string, typeof allGaps> = {
      Statistical: allGaps.filter(g => g.domain === 'Statistical').sort((a, b) => b.gap - a.gap),
      Technical: allGaps.filter(g => g.domain === 'Technical').sort((a, b) => b.gap - a.gap),
      DigitalGovernance: allGaps.filter(g => g.domain === 'DigitalGovernance').sort((a, b) => b.gap - a.gap),
      Behavioural: allGaps.filter(g => g.domain === 'Behavioural').sort((a, b) => b.gap - a.gap),
    };

    const selected: typeof allGaps = [];
    // 2 Statistical
    if (byDomain.Statistical?.[0]) selected.push(byDomain.Statistical[0]);
    if (byDomain.Statistical?.[1]) selected.push(byDomain.Statistical[1]);
    // 2 Technical
    if (byDomain.Technical?.[0]) selected.push(byDomain.Technical[0]);
    if (byDomain.Technical?.[1]) selected.push(byDomain.Technical[1]);
    // 1 Digital Governance
    if (byDomain.DigitalGovernance?.[0]) selected.push(byDomain.DigitalGovernance[0]);
    // 1 Behavioural
    if (byDomain.Behavioural?.[0]) selected.push(byDomain.Behavioural[0]);

    // If fewer than 6, fill from remaining highest gaps
    if (selected.length < 6) {
      const selectedKeys = new Set(selected.map(s => s.key));
      const remaining = [...allGaps].sort((a, b) => b.gap - a.gap).filter(g => !selectedKeys.has(g.key));
      selected.push(...remaining.slice(0, 6 - selected.length));
    }

    return selected;
  };

  // 4 Cadre Domain radar data
  const getDomainRadarData = () => {
    if (domainSummaries.length === 0) {
      return [
        { key: 'dom_stat', label: 'Statistical Domain', domain: 'Statistical', current: 74, target: 80, gap: 6 },
        { key: 'dom_tech', label: 'Technical Domain', domain: 'Technical', current: 65, target: 80, gap: 15 },
        { key: 'dom_gov', label: 'Digital Governance', domain: 'DigitalGovernance', current: 72, target: 80, gap: 8 },
        { key: 'dom_beh', label: 'Behavioural Domain', domain: 'Behavioural', current: 79, target: 80, gap: 1 },
      ];
    }
    return domainSummaries.map(ds => ({
      key: `dom_${ds.domain}`,
      label: ds.name,
      domain: ds.domain,
      current: ds.avgScore,
      target: ds.targetScore,
      gap: ds.gap
    }));
  };

  // Top 6 Deficits radar data
  const getTopGapsRadarData = () => {
    return [...allGaps].sort((a, b) => b.gap - a.gap).slice(0, 6);
  };

  // Dynamic radar data based on active mode
  const displayRadarData = radarMode === 'domains'
    ? getDomainRadarData()
    : radarMode === 'gaps'
      ? getTopGapsRadarData()
      : getBalancedRadarData();

  // Ranked priority gaps (sorted by deficit)
  const priorityGaps = [...allGaps]
    .filter(d => d.gap > 0)
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 3);

  // Longitudinal trajectory points from real quiz attempts
  const historicalPoints = attempts.length > 0
    ? attempts.slice(-5).reverse().map((att, i) => ({
        month: new Date(att.taken_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        score: Math.round((att.score / (att.total || 1)) * 100),
        delta: att.score >= 3 ? '+4.0' : '+1.0',
        assessment: att.concepts_mastered && att.concepts_mastered.length > 0
          ? `Mastered: ${att.concepts_mastered[0]}`
          : `Assessment #${i + 1} (${att.score}/${att.total})`
      }))
    : [
        { month: 'Baseline', score: Math.max(avgScore - 12, 45), delta: '+0.0', assessment: 'Profile Baseline' },
        { month: 'Current', score: avgScore, delta: '+3.0', assessment: 'Active Telemetry' },
      ];

  const handleAction = (label: string, path: string) => {
    toast.info(`Opening ${label}...`);
    navigate(path);
  };

  return (
    <div className="space-y-8 font-['Noto_Sans','Inter',sans-serif] max-w-[1440px] mx-auto">
      
      {/* ═════════════════════════════════════════════════════════════════
          1. EDITORIAL INTELLIGENCE WELCOME HEADER (Section 3)
         ═════════════════════════════════════════════════════════════════ */}
      <section 
        aria-label="Official Welcome"
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2"
      >
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-[#52657A] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8871A]" />
            <span>OFFICIAL COMPETENCY PORTAL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#102A43] tracking-tight">
            Welcome back, {currentOfficial?.name || 'Statistical Officer'}.
          </h1>
          <p className="text-xs sm:text-sm text-[#52657A] font-medium flex flex-wrap items-center gap-1.5">
            <span>{currentOfficial?.designation || 'Senior Statistical Officer'}</span>
            <span className="text-slate-300">•</span>
            <span>{currentOfficial?.department || 'National Accounts Division (NAD)'}</span>
            {currentOfficial?.job_role && (
              <>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-normal">{currentOfficial.job_role}</span>
              </>
            )}
          </p>
        </div>

        {/* Compact Editorial Action Rail */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleAction('Skill Gap Analysis', '/learner/gaps')}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-white text-[#102A43] hover:bg-slate-50 transition-colors border border-[#DCE3EA] shadow-2xs cursor-pointer"
          >
            Analyze Skill Gaps
          </button>
          <button
            onClick={() => handleAction('Adaptive Assessment', '/learner/assessments/new')}
            className="px-5 py-2 rounded-lg text-xs font-semibold bg-[#2563D9] hover:bg-[#1D4ED8] text-white transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Brain className="w-3.5 h-3.5 text-amber-300" />
            <span>Launch Assessment</span>
          </button>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          2. COMPETENCY TELEMETRY STRIP (Section 5)
         ═════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Competency Telemetry"
        className="bg-[#08233D] text-white rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#8CCBFF]/20"
      >
        {/* Left Live Status */}
        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider">
          <span className={`w-2 h-2 rounded-full ${loading ? 'bg-amber-400 animate-spin' : 'bg-emerald-400 animate-ping'} shrink-0`} />
          <span className="text-[#8CCBFF]">COMPETENCY TELEMETRY</span>
          <span className="text-slate-400 font-normal">● {loading ? 'SYNCHRONIZING' : 'SYNCHRONIZED'}</span>
        </div>

        {/* Right Numerical Metrics with Strong Hierarchy */}
        <div className="flex items-center gap-6 sm:gap-10 text-xs divide-x divide-white/10">
          <div className="text-center sm:text-left pl-0">
            <div className="text-xl sm:text-2xl font-extrabold text-white leading-none font-mono">{scores.length || 33}</div>
            <div className="text-[11px] text-slate-300 mt-1">Competencies tracked</div>
          </div>
          <div className="text-center sm:text-left pl-6 sm:pl-10">
            <div className="text-xl sm:text-2xl font-extrabold text-[#E8871A] leading-none font-mono">{totalDeficitCount}</div>
            <div className="text-[11px] text-slate-300 mt-1">Deficits (&lt;80)</div>
          </div>
          <div className="text-center sm:text-left pl-6 sm:pl-10">
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 leading-none font-mono">{avgScore}%</div>
            <div className="text-[11px] text-slate-300 mt-1">Avg Alignment</div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          3. MAIN VISUAL: COMPETENCY PROFILE (~60%) & PRIORITY GAPS (~40%)
             (Sections 6, 7, 8 - Signature Interactive Centerpiece)
         ═════════════════════════════════════════════════════════════════ */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT ~60% (lg:col-span-7): Large Interactive Competency Radar */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE3EA] shadow-2xs flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle architectural measurement background ticks */}
          <div className="absolute top-3 right-4 text-[9px] font-mono text-slate-300 select-none">
            GRID // 0.25 - 1.00 SCALE
          </div>

          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-[#102A43] tracking-tight">
                  Your Competency Profile
                </h2>
                <p className="text-xs text-[#52657A] mt-0.5">
                  {radarMode === 'domains' 
                    ? '4 core cadre domains aggregated against the 80 benchmark' 
                    : radarMode === 'gaps' 
                      ? 'Top 6 competency deficits ranked by improvement urgency'
                      : '6 balanced competencies spanning Statistical, Technical, Digital Governance & Behavioural'}
                </p>
              </div>

              {/* View Switcher Controls */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-[11px] font-semibold self-start sm:self-auto shrink-0 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setRadarMode('balanced')}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    radarMode === 'balanced'
                      ? 'bg-white text-[#102A43] shadow-xs font-bold'
                      : 'text-[#52657A] hover:text-[#102A43]'
                  }`}
                  title="2 Statistical, 2 Technical, 1 Digital Governance, 1 Behavioural"
                >
                  Balanced (4 Domains)
                </button>
                <button
                  type="button"
                  onClick={() => setRadarMode('domains')}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    radarMode === 'domains'
                      ? 'bg-white text-[#102A43] shadow-xs font-bold'
                      : 'text-[#52657A] hover:text-[#102A43]'
                  }`}
                  title="Cadre macro averages across 4 operational domains"
                >
                  Cadre Domains (4)
                </button>
                <button
                  type="button"
                  onClick={() => setRadarMode('gaps')}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    radarMode === 'gaps'
                      ? 'bg-white text-[#102A43] shadow-xs font-bold'
                      : 'text-[#52657A] hover:text-[#102A43]'
                  }`}
                  title="Top 6 highest capability deficits"
                >
                  Top Deficits (6)
                </button>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-[11px] font-medium text-[#52657A] mb-2 pb-1 border-b border-slate-100">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563D9]" /> Current Score
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1 border-t-2 border-dashed border-[#E8871A]" /> Expected Benchmark (80)
              </span>
              <span className="text-slate-400 ml-auto hidden sm:inline text-[10px]">
                Hover nodes or priority gaps to inspect delta
              </span>
            </div>

            {/* Large SVG Radar Chart */}
            <div className="relative w-full h-[320px] sm:h-[380px] flex items-center justify-center my-2">
              <svg className="w-full h-full" viewBox="-170 -170 340 340">
                
                {/* Concentric grid rings (25%, 50%, 75%, 100%) */}
                {[0.25, 0.5, 0.75, 1.0].map((r, i) => (
                  <circle
                    key={i}
                    cx="0"
                    cy="0"
                    r={130 * r}
                    fill="none"
                    stroke="#DCE3EA"
                    strokeWidth="0.8"
                    strokeDasharray={i === 3 ? "0" : "2 3"}
                  />
                ))}

                {/* Benchmark Polygon: Expected Level (80 pts = 0.8) */}
                {(() => {
                  const benchPoints = displayRadarData.map((d, i) => {
                    const angle = (i * 2 * Math.PI) / displayRadarData.length - Math.PI / 2;
                    const r = (d.target / 100) * 130;
                    return `${r * Math.cos(angle)},${r * Math.sin(angle)}`;
                  }).join(' ');

                  return (
                    <polygon
                      points={benchPoints}
                      fill="none"
                      stroke="#E8871A"
                      strokeWidth="1.2"
                      strokeDasharray="4 4"
                      opacity={0.65}
                    />
                  );
                })()}

                {/* Radar Axes & Labels */}
                {displayRadarData.map((d, i) => {
                  const angle = (i * 2 * Math.PI) / displayRadarData.length - Math.PI / 2;
                  const x = 130 * Math.cos(angle);
                  const y = 130 * Math.sin(angle);
                  const labelX = 155 * Math.cos(angle);
                  const labelY = 155 * Math.sin(angle);
                  
                  const isDirectHovered = activeHoveredKey === d.key;
                  const hoveredGapDomain = activeHoveredKey ? allGaps.find(g => g.key === activeHoveredKey)?.domain : null;
                  const isDomainMatchHovered = radarMode === 'domains' && Boolean(hoveredGapDomain && d.domain === hoveredGapDomain);
                  const isHovered = isDirectHovered || isDomainMatchHovered;
                  const isMuted = activeHoveredKey !== null && !isHovered;

                  return (
                    <g key={d.key} className="transition-opacity duration-200" opacity={isMuted ? 0.35 : 1}>
                      {/* Axis line */}
                      <line 
                        x1="0" 
                        y1="0" 
                        x2={x} 
                        y2={y} 
                        stroke={isHovered ? '#2563D9' : '#DCE3EA'} 
                        strokeWidth={isHovered ? 2.2 : 0.8} 
                      />
                      
                      {/* Axis Label */}
                      <text
                        x={labelX}
                        y={labelY}
                        textAnchor={labelX > 10 ? 'start' : labelX < -10 ? 'end' : 'middle'}
                        dominantBaseline="central"
                        className={`text-[9.5px] sm:text-[10px] select-none cursor-pointer transition-all ${
                          isHovered 
                            ? 'fill-[#2563D9] font-bold text-[11px]' 
                            : 'fill-[#52657A] font-medium'
                        }`}
                        onMouseEnter={() => setActiveHoveredKey(d.key)}
                        onMouseLeave={() => setActiveHoveredKey(null)}
                      >
                        {d.label.length > 22 ? d.label.slice(0, 20) + '…' : d.label}
                      </text>
                    </g>
                  );
                })}

                {/* Polygon Path: Current Score Layer */}
                {(() => {
                  const points = displayRadarData.map((d, i) => {
                    const angle = (i * 2 * Math.PI) / displayRadarData.length - Math.PI / 2;
                    const r = (d.current / 100) * 130;
                    return `${r * Math.cos(angle)},${r * Math.sin(angle)}`;
                  }).join(' ');

                  return (
                    <polygon
                      points={points}
                      fill="rgba(37, 99, 217, 0.16)"
                      stroke="#2563D9"
                      strokeWidth="2.5"
                    />
                  );
                })()}

                {/* Interactive Points on Current Polygon */}
                {displayRadarData.map((d, i) => {
                  const angle = (i * 2 * Math.PI) / displayRadarData.length - Math.PI / 2;
                  const r = (d.current / 100) * 130;
                  const cx = r * Math.cos(angle);
                  const cy = r * Math.sin(angle);
                  const isDirectHovered = activeHoveredKey === d.key;
                  const hoveredGapDomain = activeHoveredKey ? allGaps.find(g => g.key === activeHoveredKey)?.domain : null;
                  const isDomainMatchHovered = radarMode === 'domains' && Boolean(hoveredGapDomain && d.domain === hoveredGapDomain);
                  const isHovered = isDirectHovered || isDomainMatchHovered;

                  return (
                    <circle
                      key={d.key}
                      cx={cx}
                      cy={cy}
                      r={isHovered ? 7.5 : 4.5}
                      fill={isHovered ? '#E8871A' : '#2563D9'}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      className="cursor-pointer transition-all duration-200"
                      onMouseEnter={() => setActiveHoveredKey(d.key)}
                      onMouseLeave={() => setActiveHoveredKey(null)}
                    />
                  );
                })}
              </svg>

              {/* Floating Hover Metric Tooltip */}
              {activeHoveredKey && (() => {
                const item = displayRadarData.find(r => r.key === activeHoveredKey) ||
                  (radarMode === 'domains' 
                    ? displayRadarData.find(r => r.domain === allGaps.find(g => g.key === activeHoveredKey)?.domain) 
                    : null) ||
                  allGaps.find(g => g.key === activeHoveredKey);
                if (!item) return null;
                return (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute bottom-3 left-3 p-3 rounded-xl bg-[#08233D] text-white text-xs space-y-1 shadow-lg border border-[#8CCBFF]/30 backdrop-blur-md z-20 pointer-events-none max-w-[260px]"
                  >
                    <div className="font-bold text-[#8CCBFF] truncate">{item.label}</div>
                    <div className="flex items-center gap-3 text-[11px]">
                      <span>Current: <strong className="text-white font-mono">{item.current}</strong></span>
                      <span>Target: <strong className="text-white font-mono">{item.target}</strong></span>
                      <span>Gap: <strong className="text-[#E8871A] font-mono">{item.gap} pts</strong></span>
                    </div>
                  </motion.div>
                );
              })()}
            </div>

            {/* Domain Telemetry Mini-Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 pb-1 border-t border-[#DCE3EA]">
              {domainSummaries.map(ds => {
                const isDomActive = radarMode === 'domains';
                return (
                  <button
                    key={ds.domain}
                    type="button"
                    onClick={() => setRadarMode('domains')}
                    className={`p-2 rounded-lg border transition-all cursor-pointer text-center ${
                      isDomActive
                        ? 'bg-blue-50/80 border-blue-200 shadow-2xs'
                        : 'bg-slate-50/70 border-slate-200/60 hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">
                      {ds.name}
                    </div>
                    <div className="flex items-center justify-center gap-1.5 mt-0.5">
                      <span className="font-mono font-extrabold text-xs text-[#102A43]">
                        {ds.avgScore}%
                      </span>
                      <span className={`text-[10px] font-bold font-mono ${ds.gap > 0 ? 'text-[#E8871A]' : 'text-emerald-600'}`}>
                        {ds.gap > 0 ? `-${ds.gap}` : '✓'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-[#DCE3EA] flex items-center justify-between text-xs text-[#52657A]">
            <span>33 competencies across 4 Cadre Domains</span>
            <button
              onClick={() => handleAction('Full Competencies', '/learner/profile')}
              className="text-[#2563D9] font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Explore All 33 Competencies</span> →
            </button>
          </div>
        </div>

        {/* RIGHT ~40% (lg:col-span-5): Structured Ranked Priority Gaps (Section 8) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE3EA] shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-lg sm:text-xl font-bold text-[#102A43] tracking-tight">
                Priority Gaps
              </h2>
              <span className="text-[11px] font-bold text-[#E8871A] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                Action Required
              </span>
            </div>
            <p className="text-xs text-[#52657A] mb-4">
              Ranked capability deficits against cadre standards. Hover row to synchronize with radar.
            </p>

            {/* Structured Ranked List (No heavy cards, clean separators) */}
            <div className="divide-y divide-[#DCE3EA]">
              {priorityGaps.map((gap, idx) => {
                const isHovered = activeHoveredKey === gap.key;
                return (
                  <div
                    key={gap.key}
                    onMouseEnter={() => setActiveHoveredKey(gap.key)}
                    onMouseLeave={() => setActiveHoveredKey(null)}
                    onClick={() => {
                      toast.info(`Analyzing gap: ${gap.label}`);
                      navigate('/learner/gaps');
                    }}
                    className={`py-4 transition-all duration-200 cursor-pointer flex items-center justify-between group rounded-lg px-2 ${
                      isHovered ? 'bg-blue-50/70 -mx-2 px-4' : 'hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-mono font-bold text-[#52657A]">
                          0{idx + 1}
                        </span>
                        <h3 className="text-sm font-bold text-[#102A43] group-hover:text-[#2563D9] transition-colors">
                          {gap.label}
                        </h3>
                      </div>
                      <div className="text-[11px] text-[#52657A] flex items-center gap-3 pl-6 font-mono">
                        <span>TARGET <strong className="text-[#102A43]">{gap.target}</strong></span>
                        <span className="text-slate-300">|</span>
                        <span>CURRENT <strong className="text-[#102A43]">{gap.current}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-bold font-mono text-[#E8871A] bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                        {gap.gap} pt gap
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#52657A] group-hover:translate-x-1 group-hover:text-[#2563D9] transition-all" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#DCE3EA]">
            <button
              onClick={() => handleAction('Skill Gap Directory', '/learner/gaps')}
              className="w-full py-2.5 rounded-lg bg-[#F7F9FC] hover:bg-slate-200 text-[#102A43] font-bold text-xs transition-colors border border-[#DCE3EA] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore all skill gaps</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </section>

      {/* ═════════════════════════════════════════════════════════════════
          4. NEXT BEST LEARNING MOVES (Sections 10 & 11 - Connected Journey)
         ═════════════════════════════════════════════════════════════════ */}
      {(() => {
        const targetGap = priorityGaps[selectedMoveGapIndex] || priorityGaps[0] || {
          label: 'Statistical Methodology & Sampling',
          gap: 15,
          current: 65,
          target: 80,
          domain: 'Statistical',
          key: 'comp_default'
        };

        const learningSteps = [
          {
            id: 0,
            step: '01',
            title: 'IDENTIFIED GAP',
            headline: targetGap.label,
            sub: `Deficit: -${targetGap.gap} pts below target`,
            icon: AlertCircle,
            badge: `${targetGap.domain} Domain`,
            detailTitle: `Priority Capability Deficit: ${targetGap.label}`,
            detailDesc: `Your current proficiency score is ${targetGap.current} pts against the official MoSPI cadre benchmark of ${targetGap.target}.0 pts. Closing this ${targetGap.gap}-point gap is prioritized for your cadre advancement.`,
            ctaText: 'Analyze Skill Gap',
            ctaPath: '/learner/gaps'
          },
          {
            id: 1,
            step: '02',
            title: 'RECOMMENDED COURSE',
            headline: `Curriculum on ${targetGap.label.length > 20 ? targetGap.label.slice(0, 18) + '…' : targetGap.label}`,
            sub: 'iGOT Karmayogi & NSSTA accredited',
            icon: BookOpen,
            badge: 'iGOT Karmayogi',
            detailTitle: `Specialized Learning Module: ${targetGap.label}`,
            detailDesc: `Interactive 45-minute self-paced course tailored to bridge your ${targetGap.gap}-point deficit with Ministry case studies and practical statistical guidance.`,
            ctaText: 'Start iGOT Course',
            ctaPath: '/learner/learning'
          },
          {
            id: 2,
            step: '03',
            title: 'PRACTICAL DRILLS',
            headline: `${targetGap.domain} Queries`,
            sub: 'MoSPI sandbox aggregation drills',
            icon: Zap,
            badge: 'Hands-on Practice',
            detailTitle: `Practical Sandbox Exercises: ${targetGap.label}`,
            detailDesc: `Execute data aggregation, schema validation, and policy report compilation drills in a simulated MoSPI statistical sandbox.`,
            ctaText: 'Launch Practice Drills',
            ctaPath: '/learner/assessments/new'
          },
          {
            id: 3,
            step: '04',
            title: 'ADAPTIVE DIAGNOSTIC',
            headline: `Dynamic Difficulty Test`,
            sub: 'Recalibrates to answer correctness',
            icon: Brain,
            badge: 'Adaptive Engine',
            detailTitle: `Dynamic Diagnostic Validation: ${targetGap.label}`,
            detailDesc: `Take a 10-question adaptive assessment that dynamically adjusts difficulty based on your responses to verify real concept mastery.`,
            ctaText: 'Take Assessment',
            ctaPath: '/learner/assessments/new'
          },
          {
            id: 4,
            step: '05',
            title: 'BENCHMARK VERIFIED',
            headline: `Cadre Target Achieved`,
            sub: `Reach ${targetGap.target}.0 pts target standard`,
            icon: Award,
            badge: 'Profile Updated',
            detailTitle: `Cadre Proficiency Goal: ${targetGap.label}`,
            detailDesc: `Upon passing the diagnostic assessment, your profile mastery score automatically updates in real-time across national cadre records.`,
            ctaText: 'View Progress Trajectory',
            ctaPath: '/learner/progress'
          }
        ];

        const activeStep = learningSteps[activeLearningStage] || learningSteps[1];

        return (
          <section 
            aria-label="Next Best Learning Moves"
            className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE3EA] shadow-2xs space-y-6"
          >
            {/* Header & Gap Switcher */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#E8871A]" />
                  <h2 className="text-lg sm:text-xl font-bold text-[#102A43] tracking-tight">
                    Your next best learning moves
                  </h2>
                </div>
                <p className="text-xs text-[#52657A] mt-0.5">
                  Personalized learning sequence mapped directly to identified competency deficits.
                </p>
              </div>

              {/* Priority Gap Tabs */}
              {priorityGaps.length > 0 && (
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  <span className="text-[11px] font-bold uppercase text-[#52657A] mr-1 shrink-0">Focus Deficit:</span>
                  {priorityGaps.map((gap, idx) => (
                    <button
                      key={gap.key}
                      type="button"
                      onClick={() => {
                        setSelectedMoveGapIndex(idx);
                        setActiveLearningStage(1);
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                        selectedMoveGapIndex === idx
                          ? 'bg-[#102A43] text-white shadow-xs'
                          : 'bg-[#F7F9FC] hover:bg-slate-200 text-[#52657A] border border-[#DCE3EA]'
                      }`}
                    >
                      <span className="truncate max-w-[130px]">{gap.label}</span>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                        selectedMoveGapIndex === idx ? 'bg-amber-400 text-slate-900' : 'bg-amber-100 text-amber-900'
                      }`}>
                        -{gap.gap}pt
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 5-Step Horizontal Progression Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-1">
              {learningSteps.map((step, idx) => {
                const isActive = activeLearningStage === step.id;
                const StepIcon = step.icon;

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    whileHover={{ y: -3 }}
                    onClick={() => setActiveLearningStage(step.id)}
                    onMouseEnter={() => setActiveLearningStage(step.id)}
                    className={`p-4 rounded-xl transition-all cursor-pointer relative flex flex-col justify-between ${
                      isActive
                        ? step.id === 0
                          ? 'bg-amber-100/90 border-2 border-[#E8871A] shadow-xs'
                          : step.id === 1
                            ? 'bg-emerald-50 border-2 border-[#16845B] shadow-xs'
                            : 'bg-blue-50 border-2 border-[#2563D9] shadow-xs'
                        : 'bg-[#F7F9FC] border border-[#DCE3EA] hover:bg-slate-100/80'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className={`text-[10px] font-mono font-extrabold uppercase tracking-wider ${
                          isActive ? 'text-[#102A43]' : 'text-[#52657A]'
                        }`}>
                          {step.step} {step.title}
                        </span>
                        <StepIcon className={`w-3.5 h-3.5 ${
                          isActive ? 'text-[#2563D9]' : 'text-slate-400'
                        }`} />
                      </div>
                      <div className="text-xs font-bold text-[#102A43] leading-snug line-clamp-2">
                        {step.headline}
                      </div>
                      <p className="text-[11px] text-[#52657A] mt-1 leading-snug line-clamp-2">
                        {step.sub}
                      </p>
                    </div>

                    {/* Step indicator footer */}
                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                      <span>{step.badge}</span>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#2563D9]" />}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Active Stage Spotlight Card */}
            <motion.div
              key={activeStep.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="p-5 rounded-2xl bg-gradient-to-r from-[#08233D] to-[#102A43] text-white border border-[#8CCBFF]/30 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-5 mt-2"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 text-[#8CCBFF] border border-white/15 flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
                  {React.createElement(activeStep.icon, { className: "w-6 h-6" })}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-[#8CCBFF] bg-blue-500/20 px-2 py-0.5 rounded border border-blue-400/30">
                      STEP {activeStep.step} • {activeStep.title}
                    </span>
                    <span className="text-[10px] font-semibold text-amber-300">
                      ● {activeStep.badge}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {activeStep.detailTitle}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                    {activeStep.detailDesc}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleAction(activeStep.ctaText, activeStep.ctaPath)}
                className="px-5 py-2.5 rounded-xl bg-[#2563D9] hover:bg-[#1D4ED8] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-sm hover:shadow-md border border-white/20 self-start sm:self-auto"
              >
                <span>{activeStep.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </section>
        );
      })()}

      {/* ═════════════════════════════════════════════════════════════════
          5. ADAPTIVE ASSESSMENT SECTION (Section 12 - Integrated Dark Navy)
         ═════════════════════════════════════════════════════════════════ */}
      <section 
        aria-label="Adaptive Assessment Engine"
        className="bg-[#08233D] text-white rounded-2xl p-6 sm:p-8 border border-[#8CCBFF]/20 relative overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          
          {/* Left Text */}
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-blue-500/20 text-[#8CCBFF] text-[11px] font-bold font-mono uppercase tracking-wider border border-blue-400/30">
              <Brain className="w-3 h-3 text-[#8CCBFF]" />
              <span>ADAPTIVE ASSESSMENT ENGINE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Measure what you've improved.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Diagnostic tests dynamically recalibrate difficulty in response to your answers, serving real-time concept reinforcement when deficits are detected.
            </p>
          </div>

          {/* Right 3 Integrated Metrics & Launch CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-6 shrink-0">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 min-w-[76px]">
                <div className="text-lg font-extrabold text-white font-mono">12</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">QUESTIONS</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 min-w-[76px]">
                <div className="text-lg font-extrabold text-[#8CCBFF] font-mono">ADAPTIVE</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">DIFFICULTY</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 min-w-[76px]">
                <div className="text-lg font-extrabold text-emerald-400 font-mono">LIVE</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">REMEDIATION</div>
              </div>
            </div>

            <button
              onClick={() => handleAction('Adaptive Assessment Engine', '/learner/assessments/new')}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#2563D9] hover:bg-[#1D4ED8] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Launch Assessment</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>

        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          6. PROGRESS OVER TIME (Section 13)
         ═════════════════════════════════════════════════════════════════ */}
      <section 
        aria-label="Progress Over Time"
        className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE3EA] shadow-2xs space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#102A43] tracking-tight">
              Progress over time
            </h2>
            <p className="text-xs text-[#52657A] mt-0.5">
              Longitudinal competency score growth across verified diagnostic milestones.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {historicalPoints.length >= 2 && (() => {
              const deltaGrowth = historicalPoints[historicalPoints.length - 1].score - historicalPoints[0].score;
              return (
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                  deltaGrowth >= 0 
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-200' 
                    : 'text-amber-700 bg-amber-50 border-amber-200'
                }`}>
                  Growth: {deltaGrowth >= 0 ? `+${deltaGrowth}.0` : `${deltaGrowth}.0`} pts
                </span>
              );
            })()}
          </div>
        </div>

        {/* Dynamic Longitudinal SVG Graph */}
        <div className="relative w-full h-44 sm:h-52 pt-4">
          {(() => {
            const count = historicalPoints.length;
            const progressCoords = historicalPoints.map((pt, i) => {
              const x = count <= 1 ? 250 : 50 + i * (400 / Math.max(1, count - 1));
              const y = 140 - Math.min(105, Math.max(15, (pt.score / 100) * 115));
              return { x, y, pt };
            });
            const pathD = progressCoords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x},${c.y}`).join(' ');

            return (
              <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                {/* Horizontal Grid lines */}
                <line x1="0" y1="30" x2="500" y2="30" stroke="#F1F5F9" strokeDasharray="3 3" />
                <line x1="0" y1="65" x2="500" y2="65" stroke="#F1F5F9" strokeDasharray="3 3" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="#F1F5F9" strokeDasharray="3 3" />

                {/* Target 80 Benchmark Line (Saffron #E8871A) */}
                <line x1="0" y1="48" x2="500" y2="48" stroke="#E8871A" strokeWidth="1.2" strokeDasharray="4 4" />
                <text x="495" y="42" textAnchor="end" className="text-[9px] fill-[#E8871A] font-bold font-mono">BENCHMARK (80.0)</text>

                {/* Trajectory Path (Intelligence Blue #2563D9) */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#2563D9"
                  strokeWidth="2.5"
                />

                {/* Data Nodes */}
                {progressCoords.map((c, i) => {
                  const isHov = hoveredProgressIndex === i;

                  return (
                    <g key={i}>
                      <circle
                        cx={c.x}
                        cy={c.y}
                        r={isHov ? 6.5 : 4}
                        fill={isHov ? '#E8871A' : '#2563D9'}
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        className="cursor-pointer transition-all"
                        onMouseEnter={() => setHoveredProgressIndex(i)}
                        onMouseLeave={() => setHoveredProgressIndex(null)}
                      />
                      <text x={c.x} y="142" textAnchor="middle" className="text-[10px] fill-[#52657A] font-semibold font-mono">
                        {c.pt.month}
                      </text>
                    </g>
                  );
                })}
              </svg>
            );
          })()}

          {/* Clean Hover Tooltip */}
          {hoveredProgressIndex !== null && (() => {
            const pt = historicalPoints[hoveredProgressIndex];
            return (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-1 right-6 p-3 rounded-xl bg-[#08233D] text-white text-xs space-y-0.5 shadow-md border border-[#8CCBFF]/30 pointer-events-none z-20"
              >
                <div className="font-bold text-[#8CCBFF]">{pt.month} Assessment Checkpoint</div>
                <div>Competency Score: <strong className="text-white font-mono">{pt.score} pts</strong> ({pt.delta})</div>
                <div className="text-[11px] text-slate-300">{pt.assessment}</div>
              </motion.div>
            );
          })()}
        </div>
      </section>

    </div>
  );
};
