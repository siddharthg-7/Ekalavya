import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Sparkles, ArrowRight, ShieldAlert } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [officialId, setOfficialId] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState<string | null>(null);

  const handleSignInSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Honest prototype check: backend does not implement production Govt SSO in MVP
    setSignInError(
      'Standard Government SSO authentication is currently in sandbox testing. Please use the "Continue with Demo" access flow below to test real system workflows.'
    );
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <div className="bg-white rounded-[36px] p-8 sm:p-10 border border-[var(--mc-border-light)] shadow-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-[var(--mc-canvas)] text-[var(--mc-ink)] flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-[var(--mc-signal-orange)]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-medium text-[var(--mc-ink)] tracking-tight">
            Official Access
          </h1>
          <p className="text-xs text-[var(--mc-slate-gray)] mt-1">
            Sign in with your MoSPI / Mission Karmayogi credentials
          </p>
        </div>

        {/* Prototype Form */}
        <form onSubmit={handleSignInSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--mc-ink)] mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[var(--mc-slate-gray)]" />
              <span>Official ID / Parichay Email</span>
            </label>
            <input
              type="text"
              placeholder="e.g. anjali.sharma@mospi.gov.in"
              value={officialId}
              onChange={(e) => {
                setOfficialId(e.target.value);
                setSignInError(null);
              }}
              className="w-full px-4 py-2.5 rounded-2xl bg-[var(--mc-canvas)] border border-transparent focus:border-[var(--mc-ink)] outline-none text-xs text-[var(--mc-ink)]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--mc-ink)] mb-1.5 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[var(--mc-slate-gray)]" />
              <span>Password / OTP</span>
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setSignInError(null);
              }}
              className="w-full px-4 py-2.5 rounded-2xl bg-[var(--mc-canvas)] border border-transparent focus:border-[var(--mc-ink)] outline-none text-xs text-[var(--mc-ink)]"
            />
          </div>

          {signInError && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{signInError}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors text-xs font-semibold cursor-pointer"
          >
            Sign In with Parichay SSO
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--mc-border-light)]" />
          </div>
          <span className="relative px-3 bg-white text-xs font-semibold text-[var(--mc-slate-gray)] uppercase tracking-wider">
            Or Prototype Access
          </span>
        </div>

        {/* Primary Demo Access CTA */}
        <button
          onClick={() => navigate('/demo')}
          className="w-full mc-btn-primary py-3.5 justify-center flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-[var(--mc-yellow)]" />
          <span>Continue with Demo</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="text-[11px] text-center text-[var(--mc-slate-gray)] mt-3">
          Instant access to pre-seeded MoSPI profiles & administrator analytics.
        </p>
      </div>
    </div>
  );
};
