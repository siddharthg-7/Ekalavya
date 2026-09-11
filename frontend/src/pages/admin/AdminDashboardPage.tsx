import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAdminDashboard, type AdminDashboardData } from '../../services/api';
import { Users, TrendingUp, Award, Layers, ArrowRight, BarChart3 } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredDomain, setHoveredDomain] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetchAdminDashboard();
        setData(res);
      } catch (e) {
        console.error('Failed to load admin dashboard:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const domainEntries = data ? Object.entries(data.avg_gap_by_domain) : [];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="mc-eyebrow mb-1">
            <span className="mc-eyebrow-dot" />
            <span>EXECUTIVE CADRE OVERSIGHT</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#102A43] tracking-tight">
            Organization Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#52657A] mt-1">
            Ministry-wide competency health metrics and strategic capacity allocation projections.
          </p>
        </div>

        <button
          onClick={() => navigate('/admin/officials')}
          className="mc-btn-primary self-start sm:self-auto flex items-center gap-2"
        >
          <Users className="w-4 h-4" />
          <span>View All Officials</span>
        </button>
      </div>

      {/* Top Cards */}
      {loading || !data ? (
        <div className="py-12 text-center text-xs text-[#52657A]">
          Aggregating ministry-wide telemetry...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div 
              onClick={() => navigate('/admin/officials')}
              className="bg-white rounded-2xl p-6 border border-[#DCE3EA] hover:border-[#2563D9]/40 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#52657A]">
                    Enrolled Cadres
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2563D9] flex items-center justify-center border border-blue-100">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-[#102A43] font-mono">
                  {data.total_officials}
                </div>
              </div>
              <span className="text-xs text-[#2563D9] font-semibold mt-3 flex items-center gap-1">
                <span>View Directory</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>

            <div 
              onClick={() => navigate('/admin/competencies')}
              className="bg-white rounded-2xl p-6 border border-[#DCE3EA] hover:border-[#E8871A]/40 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#52657A]">
                    #1 Cadre Deficit
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#E8871A] flex items-center justify-center border border-amber-100">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-[#E8871A] truncate">
                  {data.projected_training_priority[0] || 'Technical'}
                </div>
              </div>
              <span className="text-xs text-[#E8871A] font-semibold mt-3 flex items-center gap-1">
                <span>Inspect Gaps</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>

            <div 
              onClick={() => navigate('/admin/training')}
              className="bg-white rounded-2xl p-6 border border-[#DCE3EA] hover:border-[#2563D9]/40 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#52657A]">
                    Repository Courses
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#16845B] flex items-center justify-center border border-emerald-100">
                    <Award className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-[#102A43] font-mono">
                  {data.total_courses || 38} Courses
                </div>
              </div>
              <span className="text-xs text-[#2563D9] font-semibold mt-3 flex items-center gap-1">
                <span>Effectiveness Matrix</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>

            <div 
              onClick={() => navigate('/admin/demand')}
              className="bg-white rounded-2xl p-6 border border-[#DCE3EA] hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#52657A]">
                    Projected Priorities
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-100">
                    <Layers className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-purple-900 font-mono">
                  {data.total_competencies ? `${data.total_competencies} Competencies` : '4 Domains'}
                </div>
              </div>
              <span className="text-xs text-purple-700 font-semibold mt-3 flex items-center gap-1">
                <span>Demand Forecast</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>

          {/* Bklit UI Ministry Workforce Competency Deficit Chart */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE3EA] shadow-2xs relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#2563D9]" />
                  <h3 className="text-base font-bold text-[#102A43] tracking-tight">
                    Average Workforce Competency Deficit (Bklit Grid Telemetry)
                  </h3>
                </div>
                <p className="text-xs text-[#52657A] mt-0.5">
                  Aggregate deficit points below standard target 80.0 across all registered cadre divisions.
                </p>
              </div>

              <button
                onClick={() => navigate('/admin/competencies')}
                className="text-xs font-semibold text-[#2563D9] hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
              >
                <span>Full Competency Matrix</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* SVG Bklit Bar Spectrum */}
            <div className="relative w-full h-[220px]">
              <svg className="w-full h-full" viewBox="0 0 680 180" preserveAspectRatio="none">
                {/* Horizontal Gridlines */}
                {[0, 10, 20, 30, 40].map((val) => {
                  const y = 140 - (val / 40) * 120;
                  return (
                    <g key={val}>
                      <line
                        x1="50"
                        y1={y}
                        x2="660"
                        y2={y}
                        stroke="#EDF2F7"
                        strokeWidth="1"
                        strokeDasharray="2 3"
                      />
                      <text
                        x="40"
                        y={y + 3}
                        textAnchor="end"
                        className="text-[9px] font-mono fill-slate-400 select-none"
                      >
                        -{val}
                      </text>
                    </g>
                  );
                })}

                {/* Bars for Domains */}
                {domainEntries.map(([dom, gap], idx) => {
                  const xCenter = 120 + idx * 140;
                  const barWidth = 48;
                  const barHeight = (gap / 40) * 120;
                  const y = 140 - barHeight;
                  const isHovered = hoveredDomain === dom;

                  return (
                    <g
                      key={dom}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredDomain(dom)}
                      onMouseLeave={() => setHoveredDomain(null)}
                    >
                      {/* Background track */}
                      <rect
                        x={xCenter - barWidth / 2}
                        y={20}
                        width={barWidth}
                        height={120}
                        rx="4"
                        fill="#F7F9FC"
                      />

                      {/* Deficit Bar */}
                      <rect
                        x={xCenter - barWidth / 2}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        rx="4"
                        fill={gap >= 20 ? '#E8871A' : '#2563D9'}
                        className="transition-all duration-300 hover:brightness-110"
                      />

                      {/* Monospace score badge */}
                      <text
                        x={xCenter}
                        y={y - 6}
                        textAnchor="middle"
                        className="text-[10px] font-mono font-bold fill-[#102A43]"
                      >
                        -{gap.toFixed(1)} pts
                      </text>

                      {/* Domain Label */}
                      <text
                        x={xCenter}
                        y={160}
                        textAnchor="middle"
                        className={`text-[10px] font-semibold transition-colors ${
                          isHovered ? 'fill-[#2563D9] font-bold' : 'fill-[#52657A]'
                        }`}
                      >
                        {dom}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Quick Hub Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE3EA] shadow-2xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold text-[#102A43] mb-1">
                  Upcoming NSSTA Priority Sequence
                </h3>
                <p className="text-xs text-[#52657A] mb-6">
                  Recommended curriculum batch schedule based on highest average workforce deficits.
                </p>

                <div className="space-y-2.5">
                  {data.projected_training_priority.map((dom, i) => (
                    <div key={dom} className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#DCE3EA]/60 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#102A43] text-white flex items-center justify-center font-bold text-[11px] font-mono">
                          {i + 1}
                        </div>
                        <span className="font-semibold text-[#102A43]">{dom}</span>
                      </div>
                      <span className="font-mono text-[#E8871A] font-bold">
                        -{data.avg_gap_by_domain[dom] || 0} pts gap
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-6 flex justify-end">
                <button
                  onClick={() => navigate('/admin/demand')}
                  className="text-xs font-semibold text-[#2563D9] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Skill Demand Forecast</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE3EA] shadow-2xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold text-[#102A43] mb-1">
                  Cadre Training Interventions
                </h3>
                <p className="text-xs text-[#52657A] mb-6">
                  Pre vs post diagnostic metrics show an average +28.5 point proficiency gain across active cohorts.
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-emerald-900">Pre/Post Assessment Clearance</div>
                      <div className="text-[11px] text-emerald-700 mt-0.5">Validated through adaptive diagnostic checks</div>
                    </div>
                    <span className="text-xl font-bold text-emerald-700 font-mono">91.4%</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-blue-900">Course Completion Benchmark</div>
                      <div className="text-[11px] text-blue-700 mt-0.5">Across 4 MoSPI-approved modules</div>
                    </div>
                    <span className="text-xl font-bold text-[#2563D9] font-mono">86.2%</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-6 flex justify-end">
                <button
                  onClick={() => navigate('/admin/training')}
                  className="text-xs font-semibold text-[#2563D9] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View Training Effectiveness</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
