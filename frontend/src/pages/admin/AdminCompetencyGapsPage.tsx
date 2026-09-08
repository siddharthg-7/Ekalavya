import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAdminDashboard, fetchOfficials, type AdminDashboardData, type OfficialDetail } from '../../services/api';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const AdminCompetencyGapsPage: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [officials, setOfficials] = useState<OfficialDetail[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="space-y-8">
      <div>
        <button
          onClick={() => navigate('/admin')}
          className="text-xs font-semibold text-[var(--mc-slate-gray)] hover:text-[var(--mc-ink)] flex items-center gap-1 cursor-pointer mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Admin Dashboard</span>
        </button>
        <div className="mc-eyebrow mb-1">
          <span className="mc-eyebrow-dot" />
          <span>WORKFORCE DEFICIT AUDIT</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-medium text-[var(--mc-ink)]">
          Organization Competency Gaps
        </h1>
        <p className="text-xs sm:text-sm text-[var(--mc-slate-gray)] mt-1">
          Aggregated workforce deficits below the 80.0 standard target score.
        </p>
      </div>

      {/* Domain Breakdown */}
      {loading || !data ? (
        <div className="py-12 text-center text-xs text-[var(--mc-slate-gray)]">
          Aggregating organization-wide competency deficits...
        </div>
      ) : (
        <>
          <div className="bg-white rounded-[32px] p-8 border border-[var(--mc-border-light)] shadow-xs">
            <h3 className="text-base font-semibold text-[var(--mc-ink)] mb-6">
              Average Deficit by Operational Domain
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(data.avg_gap_by_domain).map(([dom, gap]) => (
                <div key={dom} className="p-5 rounded-2xl bg-[var(--mc-canvas)]/60 border border-[var(--mc-border-light)]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--mc-slate-gray)] mb-1">
                    {dom}
                  </div>
                  <div className="text-2xl font-bold text-[var(--mc-signal-orange)]">
                    -{gap} pts
                  </div>
                  <p className="text-[11px] text-[var(--mc-slate-gray)] mt-2">
                    Workforce average below 80.0 benchmark
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Officials with Action Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[var(--mc-ink)]">
              Monitored Cadre Officials ({officials.length})
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {officials.map((off) => (
                <div
                  key={off.id}
                  onClick={() => navigate(`/admin/officials/${off.id}`)}
                  className="bg-white rounded-2xl p-5 border border-[var(--mc-border-light)] hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--mc-ink)] text-white flex items-center justify-center text-sm font-bold shrink-0">
                      {off.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--mc-ink)] group-hover:text-[var(--mc-signal-orange)] transition-colors">
                        {off.name}
                      </h4>
                      <p className="text-xs text-[var(--mc-slate-gray)]">
                        {off.designation} • {off.department}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs text-[var(--mc-link-blue)] font-semibold flex items-center gap-1">
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
