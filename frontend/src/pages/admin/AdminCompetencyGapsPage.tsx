import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAdminDashboard, fetchOfficials, type AdminDashboardData, type OfficialDetail } from '../../services/api';
import { ArrowLeft, ArrowRight, BarChart3 } from 'lucide-react';

export const AdminCompetencyGapsPage: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [officials, setOfficials] = useState<OfficialDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredDomain, setHoveredDomain] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [adminRes, offRes] = await Promise.all([
          fetchAdminDashboard(),
          fetchOfficials(),
        ]);
        setData(adminRes);
        setOfficials(offRes.data);
      } catch (e) {
        console.error('Failed to load admin gaps:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const domainEntries = data ? Object.entries(data.avg_gap_by_domain) : [];

  return (
    <div className="space-y-8">
      <div>
        <button
          onClick={() => navigate('/admin')}
          className="text-xs font-semibold text-[#52657A] hover:text-[#2563D9] flex items-center gap-1.5 cursor-pointer mb-2 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Admin Dashboard</span>
        </button>
        <div className="mc-eyebrow mb-1">
          <span className="mc-eyebrow-dot" />
          <span>WORKFORCE DEFICIT AUDIT</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#102A43] tracking-tight">
          Organization Competency Gaps
        </h1>
        <p className="text-xs sm:text-sm text-[#52657A] mt-1">
          Aggregated workforce deficits below the 80.0 standard target score.
        </p>
      </div>

      {/* Domain Breakdown */}
      {loading || !data ? (
        <div className="py-12 text-center text-xs text-[#52657A]">
          Aggregating organization-wide competency deficits...
        </div>
      ) : (
        <>
          {/* Bklit UI Domain Deficit Bar Spectrum */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE3EA] shadow-2xs relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#2563D9]" />
                  <h3 className="text-base font-bold text-[#102A43] tracking-tight">
                    Domain Deficit Severity (Bklit Metric Matrix)
                  </h3>
                </div>
                <p className="text-xs text-[#52657A] mt-0.5">
                  Comparative average deficit across domains measured against MoSPI cadre standards.
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-medium text-[#52657A]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E8871A]" />
                  <span>Deficit Magnitude</span>
                </span>
              </div>
            </div>

            {/* SVG Bklit Chart */}
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

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE3EA] shadow-2xs">
            <h3 className="text-base font-semibold text-[#102A43] mb-6">
              Average Deficit Summary by Operational Domain
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(data.avg_gap_by_domain).map(([dom, gap]) => (
                <div key={dom} className="p-5 rounded-2xl bg-[#F7F9FC] border border-[#DCE3EA]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#52657A] mb-1">
                    {dom}
                  </div>
                  <div className="text-2xl font-bold text-[#E8871A] font-mono">
                    -{gap} pts
                  </div>
                  <p className="text-[11px] text-[#52657A] mt-2">
                    Workforce average below 80.0 benchmark
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Officials with Action Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#102A43]">
              Monitored Cadre Officials ({officials.length})
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {officials.map((off) => (
                <div
                  key={off.id}
                  onClick={() => navigate(`/admin/officials/${off.id}`)}
                  className="bg-white rounded-2xl p-5 border border-[#DCE3EA] hover:border-[#2563D9]/40 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#102A43] text-white flex items-center justify-center text-sm font-bold shrink-0">
                      {off.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#102A43] group-hover:text-[#2563D9] transition-colors">
                        {off.name}
                      </h4>
                      <p className="text-xs text-[#52657A]">
                        {off.designation} • {off.department}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs text-[#2563D9] font-semibold flex items-center gap-1">
                    <span>Inspect Profile</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
