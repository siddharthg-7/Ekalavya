import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAdminDashboard, type AdminDashboardData } from '../../services/api';
import { Users, TrendingUp, Award, Layers, ArrowRight } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="mc-eyebrow mb-1">
            <span className="mc-eyebrow-dot" />
            <span>EXECUTIVE CADRE OVERSIGHT</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-medium text-[var(--mc-ink)]">
            Organization Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[var(--mc-slate-gray)] mt-1">
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
        <div className="py-12 text-center text-xs text-[var(--mc-slate-gray)]">
          Aggregating ministry-wide telemetry...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div 
              onClick={() => navigate('/admin/officials')}
              className="mc-card-lifted p-6 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--mc-slate-gray)]">
                  Enrolled Cadres
                </span>
                <Users className="w-5 h-5 text-[var(--mc-signal-orange)]" />
              </div>
              <div className="text-3xl font-bold text-[var(--mc-ink)]">
                {data.total_officials}
              </div>
              <span className="text-xs text-[var(--mc-link-blue)] font-semibold mt-3 flex items-center gap-1">
                <span>View Directory</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>

            <div 
              onClick={() => navigate('/admin/competencies')}
              className="mc-card-lifted p-6 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--mc-slate-gray)]">
                  #1 Cadre Deficit
                </span>
                <TrendingUp className="w-5 h-5 text-[var(--mc-signal-orange)]" />
              </div>
              <div className="text-2xl font-bold text-[var(--mc-signal-orange)] truncate">
                {data.projected_training_priority[0] || 'Technical'}
              </div>
              <span className="text-xs text-[var(--mc-signal-orange)] font-semibold mt-3 flex items-center gap-1">
                <span>Inspect Gaps</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>

            <div 
              onClick={() => navigate('/admin/training')}
              className="mc-card-lifted p-6 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--mc-slate-gray)]">
                  Repository Courses
                </span>
                <Award className="w-5 h-5 text-[var(--mc-link-blue)]" />
              </div>
              <div className="text-3xl font-bold text-[var(--mc-ink)]">
                38 Courses
              </div>
              <span className="text-xs text-[var(--mc-link-blue)] font-semibold mt-3 flex items-center gap-1">
                <span>Effectiveness Matrix</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>

            <div 
              onClick={() => navigate('/admin/demand')}
              className="mc-card-lifted p-6 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--mc-slate-gray)]">
                  Projected Priorities
                </span>
                <Layers className="w-5 h-5 text-purple-900" />
              </div>
              <div className="text-2xl font-bold text-purple-900">
                4 Domains
              </div>
              <span className="text-xs text-purple-900 font-semibold mt-3 flex items-center gap-1">
                <span>Demand Forecast</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>

          {/* Quick Hub Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-[32px] p-8 border border-[var(--mc-border-light)] shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-[var(--mc-ink)]">
                  Average Competency Deficit by Domain
                </h3>
                <button
                  onClick={() => navigate('/admin/competencies')}
                  className="text-xs font-semibold text-[var(--mc-link-blue)] hover:underline flex items-center gap-1"
                >
                  <span>Detailed Radar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-4">
                {Object.entries(data.avg_gap_by_domain).map(([dom, gap]) => (
                  <div key={dom} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{dom}</span>
                      <span className="text-[var(--mc-signal-orange)]">-{gap} pts</span>
                    </div>
                    <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[var(--mc-ink)]"
                        style={{ width: `${Math.min((gap / 35) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[32px] p-8 border border-[var(--mc-border-light)] shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-medium text-[var(--mc-ink)] mb-1">
                  Upcoming NSSTA Priority Sequence
                </h3>
                <p className="text-xs text-[var(--mc-slate-gray)] mb-6">
                  Recommended curriculum batch schedule based on highest average workforce deficits.
                </p>

                <div className="space-y-2.5">
                  {data.projected_training_priority.map((dom, i) => (
                    <div key={dom} className="p-3 rounded-xl bg-[var(--mc-canvas)]/60 flex items-center gap-3 text-xs">
                      <div className="w-6 h-6 rounded-full bg-[var(--mc-ink)] text-white flex items-center justify-center font-bold">
                        {i + 1}
                      </div>
                      <span className="font-semibold text-[var(--mc-ink)]">{dom}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 mt-6 flex justify-end">
                <button
                  onClick={() => navigate('/admin/demand')}
                  className="text-xs font-semibold text-[var(--mc-link-blue)] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Skill Demand</span>
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
