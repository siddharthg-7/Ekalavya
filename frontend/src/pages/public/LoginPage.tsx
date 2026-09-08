import React, { useState, useEffect, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { EkalavyaLogo } from '../../components/EkalavyaLogo';
import {
  User,
  Lock,
  Eye,
  EyeSlash,
  ShieldCheck,
  ArrowRight,
  ShieldWarning,
  UserCheck,
  Users
} from '@phosphor-icons/react';

/* -------------------------------------------------------------------
   Government Architectural Lottie Player Component
   Uses URL: https://lottie.host/f3cd31fb-838f-48c2-abae-52956fc535b7/e4RAkB5ITj.lottie
   ------------------------------------------------------------------- */
const LottieGovernmentBuilding: React.FC = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.customElements && window.customElements.get('dotlottie-player')) {
      setScriptLoaded(true);
      return;
    }
    const existing = document.querySelector('script[data-dotlottie-script]');
    if (existing) {
      setScriptLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs';
    script.type = 'module';
    script.setAttribute('data-dotlottie-script', 'true');
    script.onload = () => setScriptLoaded(true);
    document.head.appendChild(script);
  }, []);

  return (
    <div className="absolute top-[90px] right-[2%] sm:top-[100px] sm:right-[4%] lg:top-[70px] lg:right-[5%] w-[280px] sm:w-[360px] lg:w-[420px] h-[140px] sm:h-[170px] lg:h-[200px] pointer-events-none z-0 overflow-hidden opacity-75 transition-opacity duration-300">
      {scriptLoaded ? (
        // @ts-ignore - custom dotlottie-player web component
        <dotlottie-player
          src="https://lottie.host/f3cd31fb-838f-48c2-abae-52956fc535b7/e4RAkB5ITj.lottie"
          background="transparent"
          speed="0.8"
          style={{ width: '100%', height: '100%', filter: 'brightness(1.5) contrast(1.1)' }}
          loop
          autoplay
        />
      ) : (
        <iframe
          src="https://lottie.host/embed/f3cd31fb-838f-48c2-abae-52956fc535b7/e4RAkB5ITj.lottie"
          title="Ekalavya Institutional Architectural Signature"
          className="w-full h-full border-0 pointer-events-none opacity-75"
          style={{ border: 'none', background: 'transparent', filter: 'brightness(1.5) contrast(1.1)' }}
        />
      )}
    </div>
  );
};

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  
  const [accountType, setAccountType] = useState<'official' | 'admin'>('official');
  const [officialId, setOfficialId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [signInError, setSignInError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignInSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!officialId.trim() || !password.trim()) {
      setSignInError('Please fill in both your official ID and password.');
      return;
    }
    setIsSubmitting(true);
    // Sandbox handling
    setTimeout(() => {
      setIsSubmitting(false);
      setSignInError(
        'Parichay Govt SSO is currently operating in sandbox mode. Click "Explore Demo →" below to enter the interactive workspace.'
      );
    }, 400);
  };

  const animFadeUp = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, delay }
        };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#08233D] text-[#102A43] font-['Noto_Sans','Inter',sans-serif] overflow-x-hidden">
      
      {/* ═════════════════════════════════════════════════════════════════
          LEFT PANEL — BRAND & PRODUCT STORY (approx 50% width, #08233D)
         ═════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Ekalavya Brand Story"
        className="w-full lg:w-[50%] min-h-screen bg-[#08233D] text-white p-8 sm:p-12 lg:p-14 xl:p-16 flex flex-col justify-between relative overflow-hidden shrink-0 border-r border-[#DCE3EA]/10"
      >
        {/* Subtle geometric network lines (3–7% opacity) */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-[0.04] z-0">
          <svg className="w-full h-full" viewBox="0 0 800 900" fill="none" stroke="#8CCBFF">
            <path d="M 80,120 L 280,120 L 420,260 L 420,420 L 220,520 Z" strokeWidth="1.2" strokeDasharray="6 6" />
            <path d="M 280,120 L 580,80 L 680,280 L 420,260" strokeWidth="1.2" />
            <path d="M 420,420 L 620,520 L 520,720 L 220,520" strokeWidth="1.2" strokeDasharray="4 4" />
            <circle cx="80" cy="120" r="4" fill="#8CCBFF" />
            <circle cx="280" cy="120" r="5" fill="#8CCBFF" />
            <circle cx="420" cy="260" r="4" fill="#8CCBFF" />
            <circle cx="580" cy="80" r="4" fill="#8CCBFF" />
            <circle cx="680" cy="280" r="5" fill="#8CCBFF" />
            <circle cx="420" cy="420" r="6" fill="#8CCBFF" />
            <circle cx="620" cy="520" r="4" fill="#8CCBFF" />
            <circle cx="220" cy="520" r="5" fill="#8CCBFF" />
            <circle cx="520" cy="720" r="4" fill="#8CCBFF" />
          </svg>
        </div>

        {/* Top: Logo Header */}
        <motion.div {...animFadeUp(0)} className="relative z-20 pt-2">
          <Link to="/" aria-label="Ekalavya Home" className="inline-block focus:outline-none focus:ring-2 focus:ring-[#8CCBFF] rounded">
            <div className="w-[180px]">
              <EkalavyaLogo variant="dark" size="md" />
            </div>
          </Link>
        </motion.div>

        {/* Middle Content Stack */}
        <div className="relative z-10 my-10 lg:my-14 space-y-8 max-w-[540px]">
          
          {/* Main Headline */}
          <motion.div {...animFadeUp(0.1)}>
            <h1 className="text-[38px] sm:text-[46px] lg:text-[52px] font-bold tracking-tight text-white leading-[1.08] font-['Noto_Sans','Inter',sans-serif]">
              Build the skills<br />
              <span className="text-[#8CCBFF]">that matter.</span>
            </h1>
          </motion.div>

          {/* Short Supporting Statement */}
          <motion.p {...animFadeUp(0.18)} className="text-[17px] font-normal leading-[1.5] text-white/80 max-w-[500px]">
            Understand where you are.<br />
            Know what to improve.<br />
            Build the capabilities that create greater impact.
          </motion.p>

          {/* Competency Journey (4 Connected Stages) */}
          <motion.div {...animFadeUp(0.26)} className="pt-2">
            <div className="inline-flex items-center gap-3 sm:gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-xs text-xs sm:text-sm font-medium text-slate-300">
              <span className="text-white font-semibold">UNDERSTAND</span>
              <span className="text-[#8CCBFF] text-xs font-mono">→</span>
              <span className="text-[#8CCBFF] font-semibold">IDENTIFY</span>
              <span className="text-[#8CCBFF] text-xs font-mono">→</span>
              <span className="text-white font-semibold">LEARN</span>
              <span className="text-[#8CCBFF] text-xs font-mono">→</span>
              <span className="text-white font-semibold">IMPROVE</span>
            </div>
          </motion.div>

        </div>

        {/* Government Architectural Lottie Signature */}
        <LottieGovernmentBuilding />
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          RIGHT PANEL — AUTHENTICATION INTERFACE (approx 50% width, #FFFFFF)
         ═════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Authentication Form"
        className="w-full lg:w-[50%] min-h-screen bg-white text-[#102A43] p-8 sm:p-12 lg:p-14 xl:p-16 flex flex-col justify-between shrink-0"
      >
        {/* Top Utility Links */}
        <div className="flex items-center justify-end gap-6 text-sm font-medium text-[#52657A]">
          <Link to="/help" className="hover:text-[#2563D9] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563D9] rounded px-1">
            Help
          </Link>
          <Link to="/accessibility" className="hover:text-[#2563D9] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563D9] rounded px-1">
            Accessibility
          </Link>
        </div>

        {/* Vertically Centered Content Container */}
        <motion.div {...animFadeUp(0.1)} className="max-w-[440px] w-full mx-auto my-auto py-8 space-y-7">
          
          {/* Header */}
          <div>
            <h2 className="text-[34px] sm:text-[40px] font-bold text-[#102A43] tracking-tight leading-none mb-2 font-['Noto_Sans','Inter',sans-serif]">
              Welcome back.
            </h2>
            <p className="text-[16px] font-normal text-[#52657A] leading-relaxed">
              Sign in to continue to your Ekalavya workspace.
            </p>
          </div>

          {/* Role Selection (Segmented Control / ARIA Tabs) */}
          <div
            role="tablist"
            aria-label="Select Account Role"
            className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-[#F7F9FC] border border-[#DCE3EA] h-[48px] items-center"
          >
            <button
              id="tab-official"
              role="tab"
              aria-selected={accountType === 'official'}
              aria-controls="panel-official"
              type="button"
              onClick={() => setAccountType('official')}
              className={`h-full rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563D9] ${
                accountType === 'official'
                  ? 'bg-[#2563D9] text-white shadow-xs'
                  : 'text-[#52657A] hover:text-[#102A43] bg-transparent border-0'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Official</span>
            </button>

            <button
              id="tab-admin"
              role="tab"
              aria-selected={accountType === 'admin'}
              aria-controls="panel-admin"
              type="button"
              onClick={() => setAccountType('admin')}
              className={`h-full rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563D9] ${
                accountType === 'admin'
                  ? 'bg-[#2563D9] text-white shadow-xs'
                  : 'text-[#52657A] hover:text-[#102A43] bg-transparent border-0'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Administrator</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSignInSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label htmlFor="officialIdInput" className="block text-xs font-bold uppercase tracking-wider text-[#102A43] mb-1.5">
                Government Email / Official ID
              </label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-[#52657A] absolute left-3.5 pointer-events-none" />
                <input
                  id="officialIdInput"
                  type="text"
                  placeholder="Enter your official ID"
                  value={officialId}
                  onChange={(e) => {
                    setOfficialId(e.target.value);
                    setSignInError(null);
                  }}
                  className="w-full h-[50px] pl-10 pr-4 rounded-[9px] bg-white border border-[#DCE3EA] text-[#102A43] text-sm font-medium focus:border-[#2563D9] focus:ring-2 focus:ring-[#2563D9]/20 outline-none transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="passwordInput" className="block text-xs font-bold uppercase tracking-wider text-[#102A43] mb-1.5">
                Password / OTP
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-[#52657A] absolute left-3.5 pointer-events-none" />
                <input
                  id="passwordInput"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setSignInError(null);
                  }}
                  className="w-full h-[50px] pl-10 pr-11 rounded-[9px] bg-white border border-[#DCE3EA] text-[#102A43] text-sm font-medium focus:border-[#2563D9] focus:ring-2 focus:ring-[#2563D9]/20 outline-none transition-all placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-[#52657A] hover:text-[#102A43] transition-colors bg-transparent border-0 cursor-pointer p-1 rounded focus:outline-none focus:ring-2 focus:ring-[#2563D9]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeSlash className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {signInError && (
              <div role="alert" className="p-3.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                <ShieldWarning className="w-4 h-4 text-[#E8871A] shrink-0 mt-0.5" />
                <p className="leading-relaxed font-medium">{signInError}</p>
              </div>
            )}

            {/* Primary Action Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-[50px] rounded-[9px] bg-[#2563D9] hover:bg-[#1D4ED8] active:translate-y-[1px] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-[#2563D9]"
            >
              <span>{isSubmitting ? 'Signing in…' : 'Sign In'}</span>
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#DCE3EA]" />
            </div>
            <span className="relative px-3 bg-white text-xs font-bold text-[#52657A] uppercase tracking-wider">
              OR
            </span>
          </div>

          {/* Demo Access Secondary Action */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => navigate('/demo')}
              className="w-full h-[50px] rounded-[9px] bg-white hover:bg-slate-50 text-[#2563D9] font-bold text-sm transition-colors border border-[#2563D9] flex items-center justify-center gap-2 cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-[#2563D9]"
            >
              <ShieldCheck className="w-4 h-4 text-[#2563D9]" />
              <span>Explore Demo</span>
              <ArrowRight className="w-4 h-4 text-[#2563D9]" />
            </button>

            <p className="text-xs text-center text-[#52657A] font-normal">
              Explore a pre-configured Ekalavya workspace without an account.
            </p>
          </div>

          {/* Security & Trust Reassurance */}
          <div className="pt-2 text-center text-xs text-[#52657A] font-medium">
            Secure access &nbsp;•&nbsp; Designed for official and administrative use
          </div>
        </motion.div>

        {/* Minimal Footer */}
        <div className="pt-6 border-t border-[#DCE3EA] text-xs text-[#52657A] flex items-center justify-between">
          <div>© Ekalavya</div>
          <div className="flex items-center gap-4 font-medium">
            <Link to="/help" className="hover:text-[#102A43] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563D9] rounded px-1">
              Privacy
            </Link>
            <Link to="/accessibility" className="hover:text-[#102A43] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563D9] rounded px-1">
              Accessibility
            </Link>
            <Link to="/help" className="hover:text-[#102A43] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563D9] rounded px-1">
              Help
            </Link>
          </div>
        </div>

      </section>

    </div>
  );
};
