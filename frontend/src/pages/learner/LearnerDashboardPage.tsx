import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { type LearnerDashboardData, fetchLearnerDashboard } from '../../services/api';
import { 
  ArrowRight, 
  Brain, 
  Target
} from 'lucide-react';

export const LearnerDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { session, currentOfficial } = useAuth();
  
  const [data, setData] = useState<LearnerDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeHoveredKey, setActiveHoveredKey] = useState<string | null>(null);
  const [hoveredProgressIndex, setHoveredProgressIndex] = useState<number | null>(null);
  const [activeLearningStage, setActiveLearningStage] = useState<number>(1); // Step 02 active by default

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
  const avgScore = scores.length > 0 
    ? Math.round(scores.reduce((acc, c) => acc + Number(c.score), 0) / scores.length)
    : 68;

  // 6 Primary Competency Axes mapped to official's framework
  const radarAxes = [
    { key: 'sql_agg', label: 'SQL for Complex Aggregation', current: 55, target: 80, gap: 25 },
    { key: 'data_sharing', label: 'Inter-Agency Data Sharing', current: 60, target: 80, gap: 20 },
    { key: 'supply_tables', label: 'Supply & Use Tables', current: 68, target: 85, gap: 17 },
    { key: 'survey_design', label: 'Survey Sampling & Weights', current: 82, target: 80, gap: 0 },
    { key: 'report_drafting', label: 'National Accounts Reports', current: 85, target: 80, gap: 0 },
    { key: 'field_ops', label: 'Field Quality Auditing', current: 78, target: 80, gap: 2 },
  ];

  // If real scores exist, map top 6 to radarAxes
  const displayRadarData = scores.length >= 4
    ? scores.slice(0, 6).map((s, idx) => ({
        key: s.competency_id || `comp_${idx}`,
        label: s.competency_name,
        current: Number(s.score),
        target: Number(s.target_score) || 80,
        gap: Math.max(0, (Number(s.target_score) || 80) - Number(s.score))
      }))
    : radarAxes;

  // Ranked priority gaps (sorted by deficit)
  const priorityGaps = [...displayRadarData]
    .filter(d => d.gap > 0)
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 3);

  // Longitudinal trajectory points
  const historicalPoints = [
    { month: 'Jan', score: 58, delta: '+0.0', assessment: 'Baseline Assessment' },
    { month: 'Feb', score: 61, delta: '+3.0', assessment: 'iGOT Module 1 Complete' },
    { month: 'Mar', score: 65, delta: '+4.0', assessment: 'Adaptive Drill #1' },
    { month: 'Apr', score: 69, delta: '+4.0', assessment: 'NSSTA Workshop Drill' },
    { month: 'May', score: avgScore, delta: '+3.0', assessment: 'Active Telemetry' },
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
            Welcome back, {currentOfficial?.name || 'Rajesh'}.
          </h1>
          <p className="text-xs sm:text-sm text-[#52657A] font-medium flex flex-wrap items-center gap-1.5">
            <span>{currentOfficial?.designation || 'Senior Statistical Officer'}</span>
            <span className="text-slate-300">•</span>
            <span>Central Statistics Division</span>
            <span className="text-slate-300">•</span>
            <span>{currentOfficial?.department || 'National Accounts Division (NAD)'}</span>
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
            <div className="text-xl sm:text-2xl font-extrabold text-white leading-none font-mono">33</div>
            <div className="text-[11px] text-slate-300 mt-1">Competencies tracked</div>
          </div>
          <div className="text-center sm:text-left pl-6 sm:pl-10">
            <div className="text-xl sm:text-2xl font-extrabold text-[#E8871A] leading-none font-mono">{priorityGaps.length}</div>
            <div className="text-[11px] text-slate-300 mt-1">Priority gaps</div>
          </div>
          <div className="text-center sm:text-left pl-6 sm:pl-10">
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 leading-none font-mono">{avgScore}%</div>
            <div className="text-[11px] text-slate-300 mt-1">Alignment</div>
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
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-lg sm:text-xl font-bold text-[#102A43] tracking-tight">
                Your Competency Profile
              </h2>
              <div className="flex items-center gap-3 text-[11px] font-medium text-[#52657A]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2563D9]" /> Current
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-1 border-t-2 border-dashed border-[#E8871A]" /> Expected (80)
                </span>
              </div>
            </div>
            <p className="text-xs text-[#52657A] mb-4">
              33 domain competencies mapped to your role. Hover nodes or priority gaps to inspect delta.
            </p>

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
                  
                  const isHovered = activeHoveredKey === d.key;
                  const isMuted = activeHoveredKey !== null && activeHoveredKey !== d.key;

                  return (
                    <g key={d.key} className="transition-opacity duration-200" opacity={isMuted ? 0.35 : 1}>
                      {/* Axis line */}
                      <line 
                        x1="0" 
                        y1="0" 
                        x2={x} 
                        y2={y} 
                        stroke={isHovered ? '#2563D9' : '#DCE3EA'} 
                        strokeWidth={isHovered ? 2 : 0.8} 
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
                        {d.label.length > 20 ? d.label.slice(0, 18) + '…' : d.label}
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
                  const isHovered = activeHoveredKey === d.key;

                  return (
                    <circle
                      key={d.key}
                      cx={cx}
                      cy={cy}
                      r={isHovered ? 7 : 4.5}
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
                const item = displayRadarData.find(r => r.key === activeHoveredKey);
                if (!item) return null;
                return (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute bottom-3 left-3 p-3 rounded-xl bg-[#08233D] text-white text-xs space-y-1 shadow-lg border border-[#8CCBFF]/30 backdrop-blur-md z-20 pointer-events-none"
                  >
                    <div className="font-bold text-[#8CCBFF]">{item.label}</div>
                    <div className="flex items-center gap-3 text-[11px]">
                      <span>Current: <strong className="text-white font-mono">{item.current}</strong></span>
                      <span>Expected: <strong className="text-white font-mono">{item.target}</strong></span>
                      <span>Gap: <strong className="text-[#E8871A] font-mono">{item.gap} pts</strong></span>
                    </div>
                  </motion.div>
                );
              })()}
            </div>
          </div>

          <div className="pt-3 border-t border-[#DCE3EA] flex items-center justify-between text-xs text-[#52657A]">
            <span>Interactive measurement polygon</span>
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
      <section 
        aria-label="Next Best Learning Moves"
        className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE3EA] shadow-2xs space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#102A43] tracking-tight">
              Your next best learning moves
            </h2>
            <p className="text-xs text-[#52657A] mt-0.5">
              Personalized learning sequence mapped directly to identified competency deficits.
            </p>
          </div>

          <button
            onClick={() => handleAction('Curriculum Recommendations', '/learner/learning')}
            className="px-4 py-2 rounded-lg bg-[#16845B] hover:bg-[#126b4a] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-2xs self-start sm:self-auto"
          >
            <span>Continue Learning</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Connected Horizontal Progression (Vertical on Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-1">
          
          {/* Stage 01: Identified Gap */}
          <div 
            onMouseEnter={() => setActiveLearningStage(0)}
            onClick={() => handleAction('Skill Gap Analysis', '/learner/gaps')}
            className={`p-4 rounded-xl transition-all cursor-pointer ${
              activeLearningStage === 0 
                ? 'bg-amber-100/90 border-2 border-[#E8871A] shadow-xs' 
                : 'bg-amber-50/80 border border-amber-200 hover:shadow-xs'
            } text-amber-900`}
          >
            <div className="text-[10px] font-bold font-mono uppercase tracking-wider text-[#E8871A] mb-1">
              01 IDENTIFIED GAP
            </div>
            <div className="text-xs font-bold text-[#102A43]">SQL for Complex Aggregation</div>
            <p className="text-[11px] text-amber-800 mt-1 leading-snug">25 pt deficit below target 80 benchmark</p>
          </div>

          {/* Stage 02: Active Next Move (Growth Green Highlight) */}
          <div 
            onMouseEnter={() => setActiveLearningStage(1)}
            onClick={() => handleAction('Personalized Learning Module', '/learner/learning')}
            className={`p-4 rounded-xl transition-all cursor-pointer ${
              activeLearningStage === 1
                ? 'bg-emerald-50 border-2 border-[#16845B] shadow-xs'
                : 'bg-emerald-50/60 border border-emerald-300'
            } text-emerald-900`}
          >
            <div className="text-[10px] font-bold font-mono uppercase tracking-wider text-[#16845B] mb-1 flex items-center gap-1">
              <Target className="w-3 h-3 text-[#16845B]" /> 02 ACTIVE NEXT MOVE
            </div>
            <div className="text-xs font-bold text-[#102A43]">Advanced SQL for Official Surveys</div>
            <p className="text-[11px] text-emerald-800 mt-1 leading-snug">iGOT Karmayogi • 4.5 hrs verified</p>
          </div>

          {/* Stage 03: Practice */}
          <div 
            onMouseEnter={() => setActiveLearningStage(2)}
            onClick={() => handleAction('Adaptive Drill', '/learner/assessments/new')}
            className={`p-4 rounded-xl transition-all cursor-pointer ${
              activeLearningStage === 2
                ? 'bg-slate-100 border-2 border-[#2563D9] shadow-xs'
                : 'bg-[#F7F9FC] border border-[#DCE3EA] hover:bg-slate-100'
            } text-[#102A43]`}
          >
            <div className="text-[10px] font-bold font-mono uppercase tracking-wider text-[#52657A] mb-1">
              03 PRACTICE
            </div>
            <div className="text-xs font-bold text-[#102A43]">Survey Query Exercises</div>
            <p className="text-[11px] text-[#52657A] mt-1 leading-snug">Practical MoSPI aggregation drills</p>
          </div>

          {/* Stage 04: Reassess */}
          <div 
            onMouseEnter={() => setActiveLearningStage(3)}
            onClick={() => handleAction('Diagnostic Assessment', '/learner/assessments/new')}
            className={`p-4 rounded-xl transition-all cursor-pointer ${
              activeLearningStage === 3
                ? 'bg-slate-100 border-2 border-[#2563D9] shadow-xs'
                : 'bg-[#F7F9FC] border border-[#DCE3EA] hover:bg-slate-100'
            } text-[#102A43]`}
          >
            <div className="text-[10px] font-bold font-mono uppercase tracking-wider text-[#52657A] mb-1">
              04 REASSESS
            </div>
            <div className="text-xs font-bold text-[#102A43]">Dynamic Diagnostic</div>
            <p className="text-[11px] text-[#52657A] mt-1 leading-snug">Adaptive difficulty validation</p>
          </div>

          {/* Stage 05: Progress */}
          <div 
            onMouseEnter={() => setActiveLearningStage(4)}
            onClick={() => handleAction('Competency Progress', '/learner/progress')}
            className={`p-4 rounded-xl transition-all cursor-pointer ${
              activeLearningStage === 4
                ? 'bg-slate-100 border-2 border-[#2563D9] shadow-xs'
                : 'bg-[#F7F9FC] border border-[#DCE3EA] hover:bg-slate-100'
            } text-[#102A43]`}
          >
            <div className="text-[10px] font-bold font-mono uppercase tracking-wider text-[#52657A] mb-1">
              05 PROGRESS
            </div>
            <div className="text-xs font-bold text-[#102A43]">Profile Delta Verified</div>
            <p className="text-[11px] text-[#52657A] mt-1 leading-snug">Cadre benchmark updated</p>
          </div>

        </div>
      </section>

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
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Growth: +10.0 pts
            </span>
          </div>
        </div>

        {/* Minimal Longitudinal SVG Graph */}
        <div className="relative w-full h-44 sm:h-52 pt-4">
          <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
            
            {/* Horizontal Grid lines */}
            <line x1="0" y1="30" x2="500" y2="30" stroke="#F1F5F9" strokeDasharray="3 3" />
            <line x1="0" y1="65" x2="500" y2="65" stroke="#F1F5F9" strokeDasharray="3 3" />
            <line x1="0" y1="100" x2="500" y2="100" stroke="#F1F5F9" strokeDasharray="3 3" />

            {/* Target 80 Benchmark Line (Saffron #E8871A) */}
            <line x1="0" y1="35" x2="500" y2="35" stroke="#E8871A" strokeWidth="1.2" strokeDasharray="4 4" />
            <text x="495" y="28" textAnchor="end" className="text-[9px] fill-[#E8871A] font-bold font-mono">BENCHMARK (80.0)</text>

            {/* Trajectory Path (Intelligence Blue #2563D9) */}
            <path
              d="M 50,110 L 150,98 L 250,82 L 350,68 L 450,56"
              fill="none"
              stroke="#2563D9"
              strokeWidth="2.5"
            />

            {/* Data Nodes */}
            {historicalPoints.map((pt, i) => {
              const x = 50 + i * 100;
              const y = 150 - (pt.score / 100) * 150;
              const isHov = hoveredProgressIndex === i;

              return (
                <g key={i}>
                  <circle
                    cx={x}
                    cy={y}
                    r={isHov ? 6.5 : 4}
                    fill={isHov ? '#E8871A' : '#2563D9'}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredProgressIndex(i)}
                    onMouseLeave={() => setHoveredProgressIndex(null)}
                  />
                  <text x={x} y="142" textAnchor="middle" className="text-[10px] fill-[#52657A] font-semibold font-mono">
                    {pt.month}
                  </text>
                </g>
              );
            })}
          </svg>

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
