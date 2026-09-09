import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, AlertCircle, Compass, ShieldAlert, Cpu, Database, Award, BarChart3 } from 'lucide-react';
import { fetchAdminDashboard, type AdminDashboardData } from '../../services/api';

export const SkillDemandPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState<AdminDashboardData | null>(null);
  const [hoveredDomain, setHoveredDomain] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAdminDashboard();
        setAdminData(data);
      } catch (err) {
        console.error('Failed to load admin demand data', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const domainIcons: Record<string, any> = {
    Technical: Cpu,
    DigitalGovernance: ShieldAlert,
    Statistical: Database,
    Behavioural: Award
  };

  const domainDescriptions: Record<string, string> = {
    Technical: 'Automated survey ETL, Python/R scientific computation, and modern database aggregation for PLFS and ASI workflows.',
    DigitalGovernance: 'SDMX standards, National Data Governance Framework compliance, and DPDP Act differential privacy mechanisms.',
    Statistical: 'Small Area Estimation, multi-stage sample weight calibration, and System of National Accounts (SNA 2008) balancing.',
    Behavioural: 'Cross-ministerial statistical coordination, technical communication, and leadership in data dissemination.'
  };

  const domainPriorities = adminData?.projected_training_priority || ['Technical', 'DigitalGovernance', 'Statistical', 'Behavioural'];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header & Back Navigation */}
      <div>
        <Link
          to="/admin"
          className="inline-flex items-center text-sm font-medium text-[#52657A] hover:text-[#2563D9] mb-3 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Admin Dashboard
        </Link>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#102A43] tracking-tight">
              Skill Demand & Workforce Priorities
            </h1>
            <p className="text-xs sm:text-sm text-[#52657A] mt-1">
              Projected capacity building priorities computed by the MoSPI AI Skill Intelligence engine.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-[#E8871A] border border-amber-200">
              <Target className="w-3.5 h-3.5 mr-1 text-[#E8871A]" />
              Strategic Planning Matrix (FY 2026-27)
            </span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-white border border-[#DCE3EA] rounded-2xl p-12 text-center text-[#52657A]">
          <div className="animate-spin w-8 h-8 border-2 border-[#DCE3EA] border-t-[#2563D9] rounded-full mx-auto mb-3" />
          <p className="text-sm">Evaluating workforce competency demand vectors...</p>
        </div>
      ) : domainPriorities.length > 0 ? (
        <div className="space-y-6">
          {/* Bklit UI Workforce Skill Demand Priority Chart */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE3EA] shadow-2xs relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#2563D9]" />
                  <h3 className="text-base font-bold text-[#102A43] tracking-tight">
                    Projected Cadre Capacity Need (Bklit Forecast Grid)
                  </h3>
                </div>
                <p className="text-xs text-[#52657A] mt-0.5">
                  Ordered by computed intervention priority and workforce capability deficit.
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-medium text-[#52657A]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E8871A]" />
                  <span>Deficit Gap Metric</span>
                </span>
              </div>
            </div>

            {/* SVG Horizontal Comparative Matrix */}
            <div className="relative w-full h-[200px]">
              <svg className="w-full h-full" viewBox="0 0 680 180" preserveAspectRatio="none">
                {/* Horizontal Coordinate lines */}
                {[0, 10, 20, 30, 40].map((val) => {
                  const x = 180 + (val / 40) * 460;
                  return (
                    <g key={val}>
                      <line
                        x1={x}
                        y1="10"
                        x2={x}
                        y2="150"
                        stroke="#EDF2F7"
                        strokeWidth="1"
                        strokeDasharray="2 3"
                      />
                      <text
                        x={x}
                        y="165"
                        textAnchor="middle"
                        className="text-[9px] font-mono fill-slate-400 select-none"
                      >
                        -{val} pts
                      </text>
                    </g>
                  );
                })}

                {/* 4 Priority Bars */}
                {domainPriorities.map((domain, idx) => {
                  const avgGap = adminData?.avg_gap_by_domain[domain] || (32 - idx * 5);
                  const y = 18 + idx * 32;
                  const barWidth = Math.max(20, (avgGap / 40) * 460);
                  const isHovered = hoveredDomain === domain;

                  return (
                    <g
                      key={domain}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredDomain(domain)}
                      onMouseLeave={() => setHoveredDomain(null)}
                    >
                      {/* Priority Rank & Domain */}
                      <text
                        x="170"
                        y={y + 15}
                        textAnchor="end"
                        className={`text-[11px] font-semibold transition-colors ${
                          isHovered ? 'fill-[#2563D9] font-bold' : 'fill-[#102A43]'
                        }`}
                      >
                        #{idx + 1} {domain}
                      </text>

                      {/* Track */}
                      <rect
                        x="180"
                        y={y + 3}
                        width="460"
                        height="18"
                        rx="4"
                        fill="#F7F9FC"
                      />

                      {/* Bar */}
                      <rect
                        x="180"
                        y={y + 3}
                        width={barWidth}
                        height="18"
                        rx="4"
                        fill={avgGap >= 20 ? '#E8871A' : '#2563D9'}
                        className="transition-all duration-300"
                        opacity={isHovered ? 1 : 0.88}
                      />

                      {/* Gap Text */}
                      <text
                        x={180 + barWidth + 8}
                        y={y + 16}
                        textAnchor="start"
                        className="text-[10px] font-mono font-bold fill-[#102A43]"
                      >
                        -{avgGap.toFixed(1)} pts
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Priority Hierarchy Cards */}
          <div className="bg-white border border-[#DCE3EA] rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-[#102A43] flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#2563D9]" />
                Ranked Training Intervention Sequence
              </h2>
              <span className="text-xs text-[#52657A]">Ordered by aggregated workforce competency deficit</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {domainPriorities.map((domain, index) => {
                const IconComponent = domainIcons[domain] || Target;
                const avgGap = adminData?.avg_gap_by_domain[domain] || 0;
                return (
                  <div
                    key={domain}
                    className="border border-[#DCE3EA] rounded-2xl p-4 bg-[#F7F9FC] hover:bg-white hover:border-[#2563D9]/40 hover:shadow-xs transition-all relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-[#102A43] text-white font-bold text-xs flex items-center justify-center font-mono">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="font-semibold text-[#102A43] flex items-center gap-1.5 text-sm">
                            <IconComponent className="w-4 h-4 text-[#52657A]" />
                            {domain}
                          </h3>
                          <p className="text-xs text-[#52657A] mt-1">
                            {domainDescriptions[domain] || 'Institutional core competency track.'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-3">
                        <span className="text-xs font-medium text-[#52657A] block">Avg Gap</span>
                        <span className="text-base font-bold text-[#E8871A] font-mono">
                          -{avgGap.toFixed(1)} pts
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Allocation Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white border border-[#DCE3EA] rounded-2xl p-5 shadow-xs">
              <div className="text-xs font-bold text-[#52657A] uppercase tracking-wider mb-2">
                Immediate Action Recommendation
              </div>
              <h4 className="font-semibold text-[#102A43] text-base mb-1">
                Technical Data Science Induction
              </h4>
              <p className="text-xs text-[#52657A] leading-relaxed">
                With a 24.8 point average deficit across divisions, initiate batch enrollments in automated Python pipelines via iGOT Karmayogi before Q3 statistical releases.
              </p>
            </div>

            <div className="bg-white border border-[#DCE3EA] rounded-2xl p-5 shadow-xs">
              <div className="text-xs font-bold text-[#52657A] uppercase tracking-wider mb-2">
                Policy Compliance Demand
              </div>
              <h4 className="font-semibold text-[#102A43] text-base mb-1">
                SDMX & DPDP Regulatory Cohort
              </h4>
              <p className="text-xs text-[#52657A] leading-relaxed">
                19.4 point gap in Digital Governance indicates urgency for specialized NSSTA seminars on microdata privacy and global statistical exchange standards.
              </p>
            </div>

            <div className="bg-white border border-[#DCE3EA] rounded-2xl p-5 shadow-xs">
              <div className="text-xs font-bold text-[#52657A] uppercase tracking-wider mb-2">
                NSSTA Capacity Alignment
              </div>
              <h4 className="font-semibold text-[#102A43] text-base mb-1">
                Advanced Survey Methodology
              </h4>
              <p className="text-xs text-[#52657A] leading-relaxed">
                Calibrate 24-hour intensive laboratory sessions at NSSTA Greater Noida campus focusing on Small Area Estimation models for sub-district data.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-[#DCE3EA] rounded-2xl p-12 text-center text-[#52657A]">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-[#102A43] mb-1">No Skill Demand Data Configured</h3>
          <p className="text-sm max-w-md mx-auto text-[#52657A]">
            The MoSPI telemetry server does not currently have demand projections configured for this division.
          </p>
        </div>
      )}
    </div>
  );
};
