import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, AlertCircle, Compass, ShieldAlert, Cpu, Database, Award } from 'lucide-react';
import { fetchAdminDashboard, type AdminDashboardData } from '../../services/api';

export const SkillDemandPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState<AdminDashboardData | null>(null);

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

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header & Back Navigation */}
      <div>
        <Link
          to="/admin"
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 mb-3 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Admin Dashboard
        </Link>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
              Skill Demand & Workforce Priorities
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Projected capacity building priorities computed by the MoSPI AI Skill Intelligence engine.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
              <Target className="w-3.5 h-3.5 mr-1 text-amber-600" />
              Strategic Planning Matrix (FY 2026-27)
            </span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-400">
          <div className="animate-spin w-8 h-8 border-2 border-slate-300 border-t-slate-800 rounded-full mx-auto mb-3" />
          <p className="text-sm">Evaluating workforce competency demand vectors...</p>
        </div>
      ) : adminData?.projected_training_priority && adminData.projected_training_priority.length > 0 ? (
        <div className="space-y-6">
          {/* Priority Hierarchy Cards */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-600" />
                Ranked Training Intervention Sequence
              </h2>
              <span className="text-xs text-slate-500">Ordered by aggregated workforce competency deficit</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {adminData.projected_training_priority.map((domain, index) => {
                const IconComponent = domainIcons[domain] || Target;
                const avgGap = adminData.avg_gap_by_domain[domain] || 0;
                return (
                  <div
                    key={domain}
                    className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="font-semibold text-slate-900 flex items-center gap-1.5">
                            <IconComponent className="w-4 h-4 text-slate-600" />
                            {domain}
                          </h3>
                          <p className="text-xs text-slate-500 mt-1">
                            {domainDescriptions[domain] || 'Institutional core competency track.'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-3">
                        <span className="text-xs font-medium text-slate-400 block">Avg Gap</span>
                        <span className="text-lg font-bold text-rose-600 font-mono">
                          {avgGap.toFixed(1)} pts
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
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Immediate Action Recommendation
              </div>
              <h4 className="font-semibold text-slate-900 text-base mb-1">
                Technical Data Science Induction
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                With a 24.8 point average deficit across divisions, initiate batch enrollments in automated Python pipelines via iGOT Karmayogi before Q3 statistical releases.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Policy Compliance Demand
              </div>
              <h4 className="font-semibold text-slate-900 text-base mb-1">
                SDMX & DPDP Regulatory Cohort
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                19.4 point gap in Digital Governance indicates urgency for specialized NSSTA seminars on microdata privacy and global statistical exchange standards.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                NSSTA Capacity Alignment
              </div>
              <h4 className="font-semibold text-slate-900 text-base mb-1">
                Advanced Survey Methodology
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Calibrate 24-hour intensive laboratory sessions at NSSTA Greater Noida campus focusing on Small Area Estimation models for sub-district data.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-900 mb-1">No Skill Demand Data Configured</h3>
          <p className="text-sm max-w-md mx-auto text-slate-500">
            The MoSPI telemetry server does not currently have demand projections configured for this division.
          </p>
        </div>
      )}
    </div>
  );
};
