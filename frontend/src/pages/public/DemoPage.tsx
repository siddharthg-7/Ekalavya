import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { type OfficialDetail, fetchOfficials } from '../../services/api';
import { User, Shield, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export const DemoPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginAsDemoOfficial, loginAsAdmin } = useAuth();

  const [selectedRole, setSelectedRole] = useState<'learner' | 'admin' | null>(null);
  const [officials, setOfficials] = useState<OfficialDetail[]>([]);
  const [selectedOfficialId, setSelectedOfficialId] = useState<string>('');
  const [loadingOfficials, setLoadingOfficials] = useState(false);

  useEffect(() => {
    async function load() {
      setLoadingOfficials(true);
      try {
        const res = await fetchOfficials();
        setOfficials(res.data);
        if (res.data.length > 0) {
          setSelectedOfficialId(res.data[0].id);
        }
      } catch (e) {
        console.error('Failed to load officials for demo:', e);
      } finally {
        setLoadingOfficials(false);
      }
    }
    load();
  }, []);

  const handleContinue = async () => {
    if (selectedRole === 'admin') {
      loginAsAdmin();
      navigate('/admin', { replace: true });
    } else if (selectedRole === 'learner' && selectedOfficialId) {
      await loginAsDemoOfficial(selectedOfficialId);
      navigate('/learner', { replace: true });
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--mc-canvas)] text-[var(--mc-signal-orange)] text-xs font-bold uppercase tracking-wider mb-2 border border-[var(--mc-border-light)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Sandbox</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-medium text-[var(--mc-ink)] tracking-tight">
          Explore Ekalavya Demo
        </h1>
        <p className="text-xs sm:text-sm text-[var(--mc-slate-gray)] max-w-md mx-auto mt-2">
          Select an operational perspective to experience the personalized competency diagnostic loops and administrative oversight tools.
        </p>
      </div>

      {/* Step 1: Select Role */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Role 1: Government Official */}
        <div
          onClick={() => setSelectedRole('learner')}
          className={`p-6 rounded-[32px] border transition-all cursor-pointer flex flex-col justify-between ${
            selectedRole === 'learner'
              ? 'bg-white border-[var(--mc-ink)] shadow-md ring-2 ring-[var(--mc-ink)]/20'
              : 'bg-white hover:bg-gray-50 border-[var(--mc-border-light)]'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-[var(--mc-canvas)] flex items-center justify-center text-[var(--mc-ink)]">
                <User className="w-6 h-6 text-[var(--mc-signal-orange)]" />
              </div>
              {selectedRole === 'learner' && (
                <CheckCircle2 className="w-5 h-5 text-[var(--mc-signal-orange)]" />
              )}
            </div>
            <h3 className="text-xl font-medium text-[var(--mc-ink)] mb-1">
              Government Official
            </h3>
            <p className="text-xs text-[var(--mc-slate-gray)] leading-relaxed">
              Experience the learner journey: diagnose skill gaps, explore matched iGOT/NSSTA courses, and take adaptive assessments with live remediation.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 text-xs font-semibold text-[var(--mc-ink)] flex items-center justify-between">
            <span>Role: Learner</span>
            <span className="text-[var(--mc-signal-orange)]">Select Official →</span>
          </div>
        </div>

        {/* Role 2: Administrator */}
        <div
          onClick={() => setSelectedRole('admin')}
          className={`p-6 rounded-[32px] border transition-all cursor-pointer flex flex-col justify-between ${
            selectedRole === 'admin'
              ? 'bg-white border-purple-900 shadow-md ring-2 ring-purple-900/20'
              : 'bg-white hover:bg-gray-50 border-[var(--mc-border-light)]'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-900">
                <Shield className="w-6 h-6" />
              </div>
              {selectedRole === 'admin' && (
                <CheckCircle2 className="w-5 h-5 text-purple-900" />
              )}
            </div>
            <h3 className="text-xl font-medium text-[var(--mc-ink)] mb-1">
              Administrator
            </h3>
            <p className="text-xs text-[var(--mc-slate-gray)] leading-relaxed">
              Organization oversight: review ministry-wide competency gaps, training effectiveness, skill demand projections, and cadre distribution.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 text-xs font-semibold text-[var(--mc-ink)] flex items-center justify-between">
            <span>Role: Admin</span>
            <span className="text-purple-900">Organization View →</span>
          </div>
        </div>
      </div>

      {/* Step 2: If Government Official selected, pick official */}
      {selectedRole === 'learner' && (
        <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-[var(--mc-border-light)] shadow-xs animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-lg font-medium text-[var(--mc-ink)]">
                Select Synthetic MoSPI Official
              </h3>
              <p className="text-xs text-[var(--mc-slate-gray)]">
                Loaded directly from backend database records
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[var(--mc-canvas)] text-[var(--mc-granite)]">
              {officials.length} Profiles Available
            </span>
          </div>

          {loadingOfficials ? (
            <div className="py-8 text-center text-xs text-[var(--mc-slate-gray)]">
              Loading official profiles from backend...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
              {officials.map((off) => {
                const isSelected = off.id === selectedOfficialId;
                return (
                  <div
                    key={off.id}
                    onClick={() => setSelectedOfficialId(off.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'bg-[var(--mc-canvas)] border-[var(--mc-ink)] font-medium'
                        : 'hover:bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      isSelected ? 'bg-[var(--mc-ink)] text-white' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {off.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[var(--mc-ink)] truncate">
                          {off.name}
                        </span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[var(--mc-signal-orange)] shrink-0 ml-1" />}
                      </div>
                      <p className="text-[11px] text-[var(--mc-slate-gray)] truncate">
                        {off.designation}
                      </p>
                      <p className="text-[10px] text-[var(--mc-granite)] truncate mt-0.5">
                        {off.department}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Continue Button */}
      <div className="flex justify-end pt-2">
        <button
          disabled={!selectedRole || (selectedRole === 'learner' && !selectedOfficialId)}
          onClick={handleContinue}
          className={`mc-btn-primary px-8 py-3.5 flex items-center gap-2 ${
            !selectedRole || (selectedRole === 'learner' && !selectedOfficialId)
              ? 'opacity-40 cursor-not-allowed'
              : ''
          }`}
        >
          <span>Enter Ekalavya as {selectedRole === 'admin' ? 'Administrator' : 'Official'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
