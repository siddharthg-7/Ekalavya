import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { EkalavyaLogo } from '../../components/EkalavyaLogo';
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Compass,
  BookOpen,
  Building2,
  Brain,
  Users,
  CheckCircle2,
  Sparkles,
  Zap,
  Award,
  Menu,
  X
} from 'lucide-react';

/* =====================================================================
   HERO KEYFRAME ANIMATIONS (inline style block)
   Respects prefers-reduced-motion.
   ===================================================================== */
const heroAnimStyles = `
  @keyframes ekHeroFadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ekProductSlideUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ekTrustFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @media (prefers-reduced-motion: reduce) {
    .ek-hero-content, .ek-hero-product, .ek-hero-trust { animation: none !important; opacity: 1 !important; }
  }
  .ek-hero-content {
    animation: ekHeroFadeUp 0.72s cubic-bezier(0.22,1,0.36,1) 0.15s both;
  }
  .ek-hero-product {
    animation: ekProductSlideUp 0.82s cubic-bezier(0.22,1,0.36,1) 0.38s both;
  }
  .ek-hero-trust {
    animation: ekTrustFadeIn 0.6s ease 0.7s both;
  }
  .ek-scroll-pulse {
    animation: ekTrustFadeIn 1.8s ease-in-out 1.2s infinite alternate;
  }
`;

/* =====================================================================
   RADAR CHART — 5 Axes matching exact specification
   Statistical Methods / Data Analysis / Digital Skills /
   Communication / Domain Knowledge
   ===================================================================== */
const HeroProductRadarChart: React.FC = () => {
  const cx = 110;
  const cy = 100;
  const r  = 62;

  // Angles starting from top (-90°) going clockwise every 72°
  const angles = [-90, -18, 54, 126, 198];

  const getPoint = (angleDeg: number, valRatio: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: cx + r * valRatio * Math.cos(rad),
      y: cy + r * valRatio * Math.sin(rad)
    };
  };

  const levels = [0.25, 0.5, 0.75, 1.0];
  const yourLevelValues   = [0.82, 0.68, 0.50, 0.62, 0.76];
  const expectedValues    = [0.92, 0.88, 0.84, 0.80, 0.88];

  const yourPoints     = angles.map((a, i) => getPoint(a, yourLevelValues[i])).map(p => `${p.x},${p.y}`).join(' ');
  const expectedPoints = angles.map((a, i) => getPoint(a, expectedValues[i])).map(p => `${p.x},${p.y}`).join(' ');

  // Label positions — nudged per axis for readability in small space
  const labelData = [
    { text: 'Statistical', line2: 'Methods',   ...getPoint(-90,  1.28), anchor: 'middle' as const },
    { text: 'Data',        line2: 'Analysis',  ...getPoint(-18,  1.28), anchor: 'start'  as const },
    { text: 'Digital',     line2: 'Skills',    ...getPoint( 54,  1.26), anchor: 'start'  as const },
    { text: 'Communication', line2: '',        ...getPoint(126,  1.26), anchor: 'end'    as const },
    { text: 'Domain',     line2: 'Knowledge',  ...getPoint(198,  1.28), anchor: 'end'    as const },
  ];

  return (
    <svg viewBox="0 0 220 210" className="w-full h-auto overflow-visible select-none">
      {/* Grid rings */}
      {levels.map((lvl, idx) => {
        const pts = angles.map(a => getPoint(a, lvl)).map(p => `${p.x},${p.y}`).join(' ');
        return (
          <polygon
            key={idx}
            points={pts}
            fill={idx === levels.length - 1 ? '#F0F4F8' : 'none'}
            stroke="#D1D9E0"
            strokeWidth="0.8"
            strokeDasharray={idx < levels.length - 1 ? '2 2' : 'none'}
          />
        );
      })}

      {/* Axis spokes */}
      {angles.map((a, idx) => {
        const p = getPoint(a, 1.0);
        return <line key={idx} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#C5CDD6" strokeWidth="0.8" />;
      })}

      {/* Expected Level polygon — dashed light blue */}
      <polygon
        points={expectedPoints}
        fill="rgba(147, 197, 253, 0.10)"
        stroke="#93C5FD"
        strokeWidth="1.4"
        strokeDasharray="3 2"
      />

      {/* Your Level polygon — solid blue fill */}
      <polygon
        points={yourPoints}
        fill="rgba(37, 99, 215, 0.18)"
        stroke="#2563D9"
        strokeWidth="2"
      />

      {/* Data point dots */}
      {angles.map((a, idx) => {
        const p = getPoint(a, yourLevelValues[idx]);
        return <circle key={idx} cx={p.x} cy={p.y} r="3" fill="#2563D9" stroke="#FFFFFF" strokeWidth="1.5" />;
      })}

      {/* Axis labels — two-line where needed */}
      {labelData.map((lbl, idx) => (
        <text
          key={idx}
          x={lbl.x}
          y={lbl.y}
          textAnchor={lbl.anchor}
          fontSize="8"
          fontWeight="600"
          fill="#374151"
          fontFamily="'Noto Sans', sans-serif"
        >
          <tspan x={lbl.x} dy="0">{lbl.text}</tspan>
          {lbl.line2 && <tspan x={lbl.x} dy="9">{lbl.line2}</tspan>}
        </text>
      ))}
    </svg>
  );
};

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  // Accessibility state
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'larger'>('normal');
  const [language, setLanguage] = useState<'EN' | 'HI'>('EN');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Interactive Adaptive Assessment Demo Step (used in Feature 4 section)
  const [adaptiveStep, setAdaptiveStep] = useState<number>(0);
  // FAQ accordion tracker
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleFontSizeChange = (size: 'normal' | 'large' | 'larger') => {
    setFontSize(size);
    if (size === 'normal') {
      document.documentElement.style.fontSize = '16px';
    } else if (size === 'large') {
      document.documentElement.style.fontSize = '17.5px';
    } else {
      document.documentElement.style.fontSize = '19px';
    }
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqItems = [
    {
      q: 'What is Ekalavya?',
      a: 'Ekalavya is an AI-powered competency intelligence and personalized learning platform engineered for government officials. It benchmarks individual capabilities against institutional role requirements, discovers targeted learning modules from iGOT Karmayogi & NSSTA, and administers adaptive diagnostics to measure real skill growth.'
    },
    {
      q: 'How does Ekalavya identify competency gaps?',
      a: 'Ekalavya compares an official\u2019s evaluated proficiency across statistical, technical, digital governance, and behavioural domains against target proficiency benchmarks mandated for their designation in the National Competency Framework.'
    },
    {
      q: 'Is Ekalavya free to use?',
      a: 'Yes. Ekalavya is a public-service capacity intelligence initiative designed for all central, state, and departmental statistical and administrative officials with zero licensing fees or subscription barriers.'
    },
    {
      q: 'How are learning recommendations generated?',
      a: 'Our semantic AI matching engine scans official curricula catalogues across iGOT Karmayogi and NSSTA to map verified modules directly to specific competency deficits.'
    },
    {
      q: 'Are the assessments adaptive?',
      a: 'Yes. Unlike static multiple-choice tests, questions dynamically respond to your answers. Correct answers elevate difficulty while incorrect answers pause escalation to provide remedial concept reinforcement.'
    },
    {
      q: 'What happens when I answer incorrectly?',
      a: 'The engine pauses difficulty escalation, highlights the exact conceptual principle that was misunderstood, and serves a targeted remedial question on that concept to build foundational confidence.'
    },
    {
      q: 'Is Ekalavya a replacement for iGOT?',
      a: 'No. Ekalavya works synergistically with iGOT Karmayogi and NSSTA. Ekalavya serves as the intelligent diagnostic layer, guiding officials directly to the precise modules on iGOT that solve their unique skill gaps.'
    },
    {
      q: 'Can organizations use Ekalavya?',
      a: 'Yes. Cadre administrators, division heads, and training directors receive anonymized workforce intelligence heatmaps, aggregate competency deficit alerts, and curriculum effectiveness analytics across entire directorates.'
    },
    {
      q: 'How is my competency profile updated?',
      a: 'Competency profile scores update automatically when an official completes verified adaptive assessments or course milestone diagnostics. The AI engine recalculates proficiency delta and updates the official record.'
    },
    {
      q: 'Is Ekalavya connected to live government systems?',
      a: 'Ekalavya operates in sandbox compatibility with Mission Karmayogi and MoSPI cadre frameworks. The demo mode allows instant exploration without requiring confidential production credentials.'
    }
  ];

  return (
    <div
      id="main-content"
      className="min-h-screen bg-[#F7F9FC] text-[#102A43] font-['Noto_Sans',sans-serif] selection:bg-[#2563D9] selection:text-white"
    >
      {/* Inject hero animation keyframes */}
      <style>{heroAnimStyles}</style>

      {/* ============================================================
          ACCESSIBILITY SKIP LINK
         ============================================================ */}
      <a
        href="#hero-section"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 z-50 bg-[#102A43] text-white px-4 py-2 rounded-md shadow-lg text-sm font-semibold"
      >
        Skip to main content
      </a>

      {/* ============================================================
          TOP UTILITY BAR (gov branding + font size + language)
         ============================================================ */}
      <div className="bg-[#071931] border-b border-white/10 text-slate-300 text-xs py-2 px-6 sm:px-10">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium tracking-wide">
              {language === 'EN'
                ? 'Government of India \u2022 Ministry of Statistics & Programme Implementation'
                : '\u092D\u093E\u0930\u0924 \u0938\u0930\u0915\u093E\u0930 \u2022 \u0938\u093E\u0902\u0916\u094D\u092F\u093F\u0915\u0940 \u0914\u0930 \u0915\u093E\u0930\u094D\u092F\u0915\u094D\u0930\u092E \u0915\u093E\u0930\u094D\u092F\u093E\u0928\u094D\u0935\u092F\u0928 \u092E\u0902\u0924\u094D\u0930\u093E\u0932\u092F'}
            </span>
          </div>

          <div className="flex items-center gap-5">
            {/* Font Size Controls */}
            <div className="flex items-center gap-1.5" aria-label="Text Size Controls">
              <span className="text-slate-400 text-[11px] mr-1">Text:</span>
              {(['normal', 'large', 'larger'] as const).map((s, i) => (
                <button
                  key={s}
                  onClick={() => handleFontSizeChange(s)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors ${
                    fontSize === s ? 'bg-[#2563D9] text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title={s === 'normal' ? 'Default Font Size' : s === 'large' ? 'Large Font Size' : 'Extra Large Font Size'}
                >
                  {['A-', 'A', 'A+'][i]}
                </button>
              ))}
            </div>

            {/* Language Switcher */}
            <div className="flex items-center border-l border-white/15 pl-4">
              <button
                onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
                className="hover:text-white flex items-center gap-1.5 font-semibold text-xs transition-colors"
                title="Toggle Language"
              >
                <span>{language === 'EN' ? 'English (EN)' : '\u0939\u093F\u0902\u0926\u0940 (HI)'}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          HERO SECTION — ~820px tall, full-width, photo background.
          Navbar sits at top of hero (transparent, NOT sticky dark bar).
         ============================================================ */}
      <section
        id="hero-section"
        className="relative overflow-hidden bg-[#071931] text-white"
        style={{ minHeight: '820px' }}
      >
        {/* ── Background photograph ── */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/images/hero_official_desk.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* ── Gradient overlay: left stays dark for text, right retains warmth ── */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0"
          style={{
            background:
              'linear-gradient(to right, rgba(7,25,49,0.97) 0%, rgba(7,25,49,0.88) 38%, rgba(7,25,49,0.60) 60%, rgba(7,25,49,0.20) 100%)',
          }}
        />

        {/* ── Subtle bottom-to-top gradient for trust bar readability ── */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-0 h-40"
          style={{ background: 'linear-gradient(to top, rgba(7,25,49,0.85) 0%, transparent 100%)' }}
        />

        {/* ================================================================
            NAVBAR (transparent, sits inside the hero section)
           ================================================================ */}
        <header className="relative z-30 w-full">
          <div className="max-w-[1240px] mx-auto px-6 sm:px-8 flex items-center justify-between" style={{ paddingTop: '26px', paddingBottom: '26px' }}>

            {/* Left: Logo */}
            <Link to="/" className="no-underline flex items-center flex-shrink-0" aria-label="Ekalavya Home">
              <EkalavyaLogo variant="dark" size="md" />
            </Link>

            {/* Center: Desktop nav links */}
            <nav className="hidden md:flex items-center" style={{ gap: '32px' }} aria-label="Main navigation">
              {[
                { label: 'How it works', id: 'how-it-works' },
                { label: 'FAQ',          id: 'faq' },
                { label: 'For Officials', id: 'for-officials' },
                { label: 'For Organizations', id: 'for-organizations' },
              ].map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-slate-200 hover:text-white transition-colors duration-150 cursor-pointer whitespace-nowrap bg-transparent border-0 p-0"
                  style={{ fontSize: '14.5px', fontWeight: 500, letterSpacing: '0.01em' }}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right: EN + Get Started */}
            <div className="hidden md:flex items-center gap-4">
              <button
                className="text-slate-300 hover:text-white flex items-center gap-1 font-semibold bg-transparent border-0 cursor-pointer"
                style={{ fontSize: '13px' }}
                aria-label="Select language"
              >
                EN <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => navigate('/login')}
                className="bg-white hover:bg-slate-50 text-[#102A43] font-bold cursor-pointer flex items-center gap-1.5 transition-all duration-150 shadow-md hover:shadow-lg"
                style={{ fontSize: '14px', height: '48px', minWidth: '116px', padding: '0 20px', borderRadius: '24px', border: 'none' }}
                aria-label="Get Started with Ekalavya"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile drawer */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-[#071931]/98 backdrop-blur-md border-b border-white/10 px-6 py-5 space-y-1">
              {[
                { label: 'How it works', id: 'how-it-works' },
                { label: 'FAQ',          id: 'faq' },
                { label: 'For Officials', id: 'for-officials' },
                { label: 'For Organizations', id: 'for-organizations' },
              ].map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left text-slate-200 hover:text-white py-2.5 text-base font-medium border-0 bg-transparent cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => navigate('/login')}
                  className="w-full bg-white text-[#102A43] py-3.5 rounded-[24px] font-bold flex items-center justify-center gap-2 text-base border-0 cursor-pointer"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </header>

        {/* ================================================================
            HERO MAIN CONTENT AREA
            Left: text content. Right: product preview.
            Content starts ~110px below navbar.
           ================================================================ */}
        <div className="relative z-10 max-w-[1240px] mx-auto px-6 sm:px-8 w-full" style={{ paddingTop: '100px', paddingBottom: '170px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">

            {/* ──────────────────────────────────────────────────────
                LEFT COLUMN — Hero text content
                Starts at ~7% from left edge of page (handled by
                max-w container + px-6 sm:px-8 padding).
               ────────────────────────────────────────────────────── */}
            <div className="ek-hero-content max-w-[620px]">

              {/* Eyebrow pill: 36–40px height */}
              <div
                className="inline-flex items-center gap-2 rounded-full border border-white/15 backdrop-blur-sm"
                style={{
                  height: '38px',
                  paddingLeft: '14px',
                  paddingRight: '14px',
                  background: 'rgba(255,255,255,0.08)',
                  marginBottom: '24px',
                }}
              >
                <span
                  className="rounded-full bg-[#38BDF8]"
                  style={{ width: '7px', height: '7px', flexShrink: 0 }}
                />
                <span
                  className="font-mono font-bold uppercase tracking-widest text-cyan-200"
                  style={{ fontSize: '11px', letterSpacing: '0.08em' }}
                >
                  AI-Powered Competency Intelligence
                </span>
              </div>

              {/* Main headline: 64–68px, weight 750, tight leading */}
              <h1
                className="text-white font-extrabold"
                style={{
                  fontSize: 'clamp(46px, 5.2vw, 68px)',
                  fontWeight: 750,
                  lineHeight: 1.01,
                  letterSpacing: '-0.025em',
                  marginBottom: '22px',
                  maxWidth: '600px',
                }}
              >
                Turn Your Potential
                <br />
                Into{' '}
                <span
                  style={{
                    background: 'linear-gradient(90deg, #8CCBFF 0%, #4FA4F5 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Greater Impact.
                </span>
              </h1>

              {/* Supporting copy: 17–18px, 1.5 leading, 82% white */}
              <p
                className="font-normal"
                style={{
                  fontSize: '17.5px',
                  lineHeight: 1.55,
                  color: 'rgba(255,255,255,0.82)',
                  maxWidth: '540px',
                  marginBottom: '32px',
                }}
              >
                Understand your competencies, identify skill gaps, get
                personalized learning, and measure real progress — all
                in one place.
              </p>

              {/* Primary CTA: white pill, 54–58px height */}
              <div style={{ marginBottom: '14px' }}>
                <button
                  onClick={() => navigate('/login')}
                  className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 text-[#102A43] font-bold cursor-pointer transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                  style={{
                    fontSize: '15.5px',
                    height: '56px',
                    minWidth: '170px',
                    paddingLeft: '28px',
                    paddingRight: '28px',
                    borderRadius: '100px',
                    border: 'none',
                  }}
                  aria-label="Get Started with Ekalavya — free, no setup required"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Commitment reducer: 13px, slate-300 */}
              <p
                className="font-medium text-slate-300"
                style={{ fontSize: '13px', marginBottom: '28px' }}
              >
                Free to use &nbsp;•&nbsp; No complicated setup
              </p>

              {/* Scroll indicator — bottom-left, subtle fade pulse */}
              <button
                onClick={() => scrollToSection('problem-section')}
                className="ek-scroll-pulse flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0"
                style={{ fontSize: '12px', fontWeight: 500 }}
                aria-label="Scroll to explore"
              >
                <span
                  className="flex items-center justify-center rounded-full border border-slate-600"
                  style={{ width: '28px', height: '28px', fontSize: '13px', flexShrink: 0 }}
                >
                  ↓
                </span>
                Scroll to explore
              </button>
            </div>

            {/* ──────────────────────────────────────────────────────
                RIGHT COLUMN — Ekalavya product preview
                Laptop frame with flat dashboard screen.
               ────────────────────────────────────────────────────── */}
            <div className="ek-hero-product flex justify-center lg:justify-end">

              {/* Laptop outer chassis */}
              <div
                className="relative w-full shadow-2xl"
                style={{
                  maxWidth: '520px',
                  background: 'linear-gradient(160deg, #2A3A4E 0%, #1A2535 100%)',
                  borderRadius: '18px',
                  padding: '10px 10px 6px 10px',
                  border: '1px solid rgba(255,255,255,0.10)',
                  boxShadow: '0 32px 72px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)',
                }}
              >
                {/* Camera notch */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3A4A5E' }} />
                </div>

                {/* ── Dashboard screen ── */}
                <div
                  className="overflow-hidden"
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '10px',
                    border: '1px solid #E2E8F0',
                    minHeight: '290px',
                  }}
                >
                  {/* Screen top bar / browser chrome */}
                  <div
                    style={{
                      background: '#F8FAFC',
                      borderBottom: '1px solid #E2E8F0',
                      padding: '7px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    {/* App title */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                      <img
                        src="/images/ekalavya_logo.png"
                        alt=""
                        aria-hidden="true"
                        style={{ width: '16px', height: '16px', objectFit: 'contain' }}
                      />
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#102A43', letterSpacing: '-0.01em' }}>
                        Ekalavya
                      </span>
                    </div>
                    {/* Welcome text */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: '#52657A', fontWeight: 500 }}>
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          background: '#CBD5E1',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '7.5px',
                          fontWeight: 700,
                          color: '#102A43',
                        }}
                      >
                        AK
                      </div>
                      <span>Welcome, <strong style={{ color: '#102A43' }}>Arjun Kumar</strong></span>
                    </div>
                  </div>

                  {/* Screen body: sidebar + main */}
                  <div style={{ display: 'grid', gridTemplateColumns: '76px 1fr', minHeight: '255px' }}>

                    {/* Sidebar */}
                    <div
                      style={{
                        background: '#F8FAFC',
                        borderRight: '1px solid #E2E8F0',
                        padding: '10px 6px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                      }}
                    >
                      {[
                        { icon: '📊', label: 'Dashboard', active: true },
                        { icon: '👤', label: 'My Profile', active: false },
                        { icon: '🎯', label: 'Learning', active: false },
                        { icon: '📝', label: 'Assess.', active: false },
                        { icon: '📈', label: 'Progress', active: false },
                      ].map(item => (
                        <div
                          key={item.label}
                          style={{
                            padding: '5px 7px',
                            borderRadius: '7px',
                            background: item.active ? '#2563D9' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            fontSize: '9px',
                            fontWeight: item.active ? 600 : 500,
                            color: item.active ? '#FFFFFF' : '#64748B',
                            cursor: 'default',
                          }}
                        >
                          <span style={{ fontSize: '11px' }}>{item.icon}</span>
                          {item.label}
                        </div>
                      ))}
                    </div>

                    {/* Main dashboard area */}
                    <div style={{ padding: '10px 12px', background: '#FFFFFF' }}>

                      {/* Section heading + legend */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#102A43' }}>
                          My Competency Profile
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '8.5px', fontWeight: 600, color: '#2563D9' }}>
                            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#2563D9', display: 'inline-block' }} />
                            Your Level
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '8.5px', fontWeight: 600, color: '#93C5FD' }}>
                            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#93C5FD', display: 'inline-block' }} />
                            Expected Level
                          </span>
                        </div>
                      </div>

                      {/* Radar + insight card */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 130px', gap: '10px', alignItems: 'center' }}>
                        <HeroProductRadarChart />

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                          {/* Priority gaps card */}
                          <div
                            style={{
                              padding: '9px 10px',
                              borderRadius: '10px',
                              background: '#FFF8F0',
                              border: '1px solid #FDBA74',
                            }}
                          >
                            <div style={{ fontSize: '9.5px', fontWeight: 700, color: '#9A3A0A', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                              🎯 3 Priority Gaps Identified
                            </div>
                            <p style={{ fontSize: '8.5px', color: '#64748B', lineHeight: 1.4, margin: 0 }}>
                              Get a personalized learning path to bridge the gaps.
                            </p>
                          </div>

                          {/* Mini skill bars */}
                          {[
                            { label: 'Statistical Methods', pct: 82, gap: true },
                            { label: 'Data Analysis',       pct: 68, gap: true },
                            { label: 'Digital Skills',      pct: 50, gap: true },
                          ].map(skill => (
                            <div key={skill.label}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '7.5px', fontWeight: 600, color: '#374151', marginBottom: '2px' }}>
                                <span>{skill.label}</span>
                                <span style={{ color: skill.gap ? '#E8871A' : '#16845B' }}>{skill.pct}%</span>
                              </div>
                              <div style={{ height: '4px', borderRadius: '2px', background: '#E2E8F0', overflow: 'hidden' }}>
                                <div
                                  style={{
                                    height: '100%',
                                    width: `${skill.pct}%`,
                                    borderRadius: '2px',
                                    background: skill.gap ? '#2563D9' : '#16845B',
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Laptop base/hinge lip */}
                <div style={{ height: '8px', background: 'linear-gradient(to bottom, #1A2535, #141D2B)', borderRadius: '0 0 18px 18px', marginTop: '5px' }} />
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================
            TRUST BAR — Absolutely positioned at bottom: 40px
            ~1200px wide, exactly 110px tall, 4 columns with dividers.
           ================================================================ */}
        <div
          className="ek-hero-trust absolute left-0 right-0 z-20 px-6 sm:px-8"
          style={{ bottom: '40px' }}
        >
          <div
            className="max-w-[1200px] mx-auto backdrop-blur-md"
            style={{
              height: '110px',
              background: 'rgba(7,25,49,0.88)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                height: '100%',
              }}
            >
              {[
                { title: 'Competency Framework', sub: 'Role-based skill intelligence' },
                { title: 'iGOT Karmayogi',       sub: 'Curated learning ecosystem' },
                { title: 'NSSTA',                 sub: 'Domain-relevant resources' },
                { title: 'AI-Powered Assessments', sub: 'Adaptive & personalized' },
              ].map((col, idx) => (
                <div
                  key={col.title}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '0 28px',
                    borderLeft: idx > 0 ? '1px solid rgba(255,255,255,0.10)' : 'none',
                  }}
                >
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      letterSpacing: '-0.01em',
                      marginBottom: '5px',
                    }}
                  >
                    {col.title}
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#94A3B8', lineHeight: 1.35 }}>
                    {col.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ============================================================
          SECTION 02 — PROBLEM (Clear Editorial Statements)
         ============================================================ */}
      <section id="problem-section" className="py-24 lg:py-36 bg-[#F7F9FC]">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
            {/* Left side: Problem Description & 3 Clear Editorial Statements */}
            <div className="lg:col-span-6 space-y-8">
              <div className="text-xs font-bold font-mono uppercase tracking-wider text-[#2563D9]">
                THE CHALLENGE
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#102A43] tracking-tight leading-tight">
                Access to Learning Is Not Enough.
              </h2>

              <p className="text-base sm:text-lg text-[#52657A] leading-relaxed">
                Knowing what to learn, why it matters, and whether it is actually improving your
                competencies can be difficult.
              </p>

              {/* 3 Clear Editorial Statements */}
              <div className="space-y-5 pt-2">
                <div className="p-6 rounded-2xl bg-white border border-[#DCE3EA] shadow-xs flex items-start gap-5">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 font-mono font-bold text-sm flex items-center justify-center flex-shrink-0">
                    01
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#102A43]">Unclear Skill Gaps</h3>
                    <p className="text-sm text-[#52657A] mt-1 leading-relaxed">
                      Officials often complete standard trainings without clarity on which specific competencies their role actually demands.
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#DCE3EA] shadow-xs flex items-start gap-5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 font-mono font-bold text-sm flex items-center justify-center flex-shrink-0">
                    02
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#102A43]">One-Size-Fits-All Learning</h3>
                    <p className="text-sm text-[#52657A] mt-1 leading-relaxed">
                      Different officials can require different learning paths. Generic course assignments waste critical time.
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#DCE3EA] shadow-xs flex items-start gap-5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563D9] font-mono font-bold text-sm flex items-center justify-center flex-shrink-0">
                    03
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#102A43]">Limited Feedback</h3>
                    <p className="text-sm text-[#52657A] mt-1 leading-relaxed">
                      Learning completion does not always demonstrate competency or measure real operational mastery.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Large Meaningful Workspace Photo with 3 Floating Question Pills */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative rounded-3xl overflow-hidden border border-[#DCE3EA] shadow-2xl w-full max-w-lg">
                <img
                  src="/images/challenge_official_workspace.jpg"
                  alt="Government official reviewing documents"
                  className="w-full h-[460px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/75 via-[#102A43]/20 to-transparent" />

                {/* Floating Question Pill 1 */}
                <div className="absolute top-8 right-6 max-w-xs bg-white/95 backdrop-blur-md px-5 py-3 rounded-full shadow-xl border border-[#DCE3EA] text-xs font-semibold text-[#102A43] flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2563D9]" />
                  <span>Which course is right for me?</span>
                </div>

                {/* Floating Question Pill 2 */}
                <div className="absolute top-36 left-6 max-w-xs bg-white/95 backdrop-blur-md px-5 py-3 rounded-full shadow-xl border border-[#DCE3EA] text-xs font-semibold text-[#102A43] flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E8871A]" />
                  <span>Am I learning the right skills?</span>
                </div>

                {/* Floating Question Pill 3 */}
                <div className="absolute bottom-8 right-6 max-w-xs bg-white/95 backdrop-blur-md px-5 py-3 rounded-full shadow-xl border border-[#DCE3EA] text-xs font-semibold text-[#102A43] flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>How do I know if I'm improving?</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 03 — SOLUTION (THE EKALAVYA APPROACH & PIPELINE)
         ============================================================ */}
      <section className="py-24 lg:py-36 bg-white border-t border-b border-[#DCE3EA]">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
            <div className="text-xs font-bold font-mono uppercase tracking-wider text-[#2563D9]">
              THE EKALAVYA APPROACH
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold text-[#102A43] tracking-tight leading-tight">
              From Competency Gaps <br />
              to Measurable Growth.
            </h2>
            <p className="text-base sm:text-lg text-[#52657A] leading-relaxed">
              Ekalavya brings competency intelligence, personalized learning, adaptive assessment
              and progress measurement into one continuous learning experience.
            </p>
          </div>

          {/* Central Product System Pipeline */}
          <div className="bg-[#071931] text-white p-8 sm:p-12 lg:p-14 rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-10">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#00B4D8]" />
                <span className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                  Continuous Competency Intelligence Pipeline
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">Real-time Telemetry</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 relative">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors">
                <div className="text-xs font-mono font-bold text-cyan-300 mb-2">01</div>
                <div className="font-bold text-base mb-1">ROLE</div>
                <p className="text-xs text-slate-400">Designation & Cadre Framework</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors">
                <div className="text-xs font-mono font-bold text-blue-300 mb-2">02</div>
                <div className="font-bold text-base mb-1">PROFILE</div>
                <p className="text-xs text-slate-400">Baseline Competency Matrix</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors">
                <div className="text-xs font-mono font-bold text-amber-300 mb-2">03</div>
                <div className="font-bold text-base mb-1">GAP ANALYSIS</div>
                <p className="text-xs text-slate-400">AI-Ranked Skill Deficits</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors">
                <div className="text-xs font-mono font-bold text-emerald-300 mb-2">04</div>
                <div className="font-bold text-base mb-1">LEARNING</div>
                <p className="text-xs text-slate-400">Curated iGOT & NSSTA Modules</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors">
                <div className="text-xs font-mono font-bold text-purple-300 mb-2">05</div>
                <div className="font-bold text-base mb-1">ASSESSMENT</div>
                <p className="text-xs text-slate-400">Live Adaptive Diagnostic</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors">
                <div className="text-xs font-mono font-bold text-emerald-400 mb-2">06</div>
                <div className="font-bold text-base mb-1">GROWTH</div>
                <p className="text-xs text-slate-400">Demonstrated Score Mastery</p>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-300">
              <span className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Zero guesswork • Every recommendation targets a validated deficit</span>
              </span>
              <button
                onClick={() => navigate('/demo')}
                className="text-cyan-300 hover:text-white font-semibold flex items-center gap-2 cursor-pointer text-sm"
              >
                <span>Experience Interactive Pipeline</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 04 — FEATURES (Alternating Editorial Showcases)
         ============================================================ */}
      <section id="for-officials" className="py-24 lg:py-36 bg-[#F7F9FC]">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 space-y-16 lg:space-y-24">
          <div className="max-w-2xl">
            <div className="text-xs font-bold font-mono uppercase tracking-wider text-[#2563D9] mb-2">
              CORE CAPABILITIES
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#102A43] tracking-tight">
              An Intelligent System Tailored to Public Service.
            </h2>
            <p className="text-base sm:text-lg text-[#52657A] mt-3">
              Designed with precision to solve real workflow bottlenecks for officials and directorates.
            </p>
          </div>

          {/* FEATURE 1: Text Left, Product Visualization Right */}
          <div className="bg-white border border-[#DCE3EA] rounded-3xl p-8 sm:p-12 lg:p-14 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="text-xs font-bold font-mono uppercase tracking-wider text-[#2563D9]">
                  FEATURE 01
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#102A43]">
                  Personalized Competency Profile
                </h3>
                <p className="text-base sm:text-lg text-[#52657A] font-medium">
                  See where your competencies stand.
                </p>
                <p className="text-sm sm:text-base text-[#52657A] leading-relaxed">
                  Every official receives a dynamic competency profile mapped against official MoSPI cadre
                  standards, revealing clear strengths and focus areas.
                </p>
                <div className="pt-2">
                  <span className="font-semibold text-sm text-[#2563D9]">Live Profile Sync Active →</span>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="p-6 sm:p-8 rounded-2xl bg-[#F7F9FC] border border-[#DCE3EA] space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-[#102A43]">Statistical & Sampling</span>
                    <span className="font-mono text-emerald-700 font-bold">82% • Advanced</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#16845B] h-full" style={{ width: '82%' }} />
                  </div>

                  <div className="flex items-center justify-between text-sm pt-2">
                    <span className="font-bold text-[#102A43]">Python & Automated ETL</span>
                    <span className="font-mono text-amber-700 font-bold">42% • Developing</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#E8871A] h-full" style={{ width: '42%' }} />
                  </div>

                  <div className="flex items-center justify-between text-sm pt-2">
                    <span className="font-bold text-[#102A43]">Cybersecurity Standards</span>
                    <span className="font-mono text-rose-600 font-bold">32% • Critical Deficit</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full" style={{ width: '32%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FEATURE 2: Product Visualization Left, Text Right */}
          <div className="bg-white border border-[#DCE3EA] rounded-3xl p-8 sm:p-12 lg:p-14 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="p-6 sm:p-8 rounded-2xl bg-[#F7F9FC] border border-[#DCE3EA] space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-[#102A43]">Python</span>
                    <span className="font-mono font-bold text-xs px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700">
                      Gap: 38%
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-semibold">
                      <span className="text-[#52657A]">Current: <strong className="text-[#102A43]">42%</strong></span>
                      <span className="text-[#52657A]">Target: <strong className="text-[#16845B]">80%</strong></span>
                    </div>

                    <div className="w-full bg-slate-200 h-3.5 rounded-full overflow-hidden relative">
                      <div className="bg-[#E8871A] h-full rounded-full" style={{ width: '42%' }} />
                      <div className="absolute top-0 bottom-0 left-[80%] w-1.5 bg-[#16845B] z-10" title="Target Benchmark (80%)" />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#52657A] bg-white p-4 rounded-xl border border-[#DCE3EA] leading-relaxed">
                    AI analysis flags Python data processing as a priority bottleneck for upcoming PLFS survey automated releases.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
                <div className="text-xs font-bold font-mono uppercase tracking-wider text-[#E8871A]">
                  FEATURE 02
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#102A43]">
                  AI Skill-Gap Analysis
                </h3>
                <p className="text-base sm:text-lg text-[#52657A] font-medium">
                  Focus development where it matters most.
                </p>
                <p className="text-sm sm:text-base text-[#52657A] leading-relaxed">
                  Ekalavya computes the exact delta between your evaluated proficiency and required cadre benchmarks,
                  highlighting specific conceptual deficits.
                </p>
                <div className="pt-2">
                  <span className="font-semibold text-sm text-[#E8871A]">Direct Learning Match Active →</span>
                </div>
              </div>
            </div>
          </div>

          {/* FEATURE 3: Text Left, Product Visualization Right */}
          <div className="bg-white border border-[#DCE3EA] rounded-3xl p-8 sm:p-12 lg:p-14 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="text-xs font-bold font-mono uppercase tracking-wider text-[#16845B]">
                  FEATURE 03
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#102A43]">
                  Relevant Learning Recommendations
                </h3>
                <p className="text-base sm:text-lg text-[#52657A] font-medium">
                  Spend less time searching and more time learning.
                </p>
                <p className="text-sm sm:text-base text-[#52657A] leading-relaxed">
                  Instead of scrolling through thousands of unrelated courses, Ekalavya extracts the specific
                  curricula on iGOT Karmayogi and NSSTA that bridge your evaluated deficits.
                </p>
              </div>

              <div className="lg:col-span-6">
                <div className="p-6 sm:p-8 rounded-2xl border border-[#DCE3EA] bg-[#F7F9FC] shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 font-mono font-bold text-xs flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>94% Competency Match</span>
                    </span>
                    <span className="text-xs font-mono font-semibold text-[#52657A]">iGOT Karmayogi</span>
                  </div>

                  <h4 className="text-xl font-bold text-[#102A43]">
                    Python for Government Data Analysis
                  </h4>

                  <div className="flex flex-wrap gap-2 text-xs font-medium text-[#16845B] pt-2">
                    <span className="px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200">
                      ✓ Python
                    </span>
                    <span className="px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200">
                      ✓ Data Processing
                    </span>
                    <span className="px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200">
                      ✓ Statistical Analysis
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FEATURE 4: Large Full-Width Adaptive Assessment Showcase */}
          <div className="bg-[#071931] text-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-white/15 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono font-bold mb-4">
                <Zap className="w-4 h-4" />
                <span>FEATURE 04 • SIGNATURE CAPABILITY</span>
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                Adaptive Assessments
              </h3>
              <p className="text-base sm:text-lg text-slate-300 mt-3 font-normal">
                Assessments respond to what you know.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: 4 Diagnostic Steps */}
              <div className="lg:col-span-5 space-y-3.5">
                <div
                  onClick={() => setAdaptiveStep(0)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    adaptiveStep === 0
                      ? 'bg-white/15 border-cyan-400 text-white shadow-md'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <div className="text-xs font-mono font-bold text-cyan-300">QUESTION</div>
                  <div className="font-bold text-base text-white">Diagnostic Question Served</div>
                </div>

                <div
                  onClick={() => setAdaptiveStep(1)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    adaptiveStep === 1
                      ? 'bg-white/15 border-rose-400 text-white shadow-md'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <div className="text-xs font-mono font-bold text-rose-300">WRONG ANSWER</div>
                  <div className="font-bold text-base text-white">Engine Diagnoses Concept Error</div>
                </div>

                <div
                  onClick={() => setAdaptiveStep(2)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    adaptiveStep === 2
                      ? 'bg-white/15 border-amber-400 text-white shadow-md'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <div className="text-xs font-mono font-bold text-amber-300">REINFORCE SAME CONCEPT</div>
                  <div className="font-bold text-base text-white">Easier Question Served</div>
                </div>

                <div
                  onClick={() => setAdaptiveStep(3)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    adaptiveStep === 3
                      ? 'bg-white/15 border-emerald-400 text-white shadow-md'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <div className="text-xs font-mono font-bold text-emerald-300">CORRECT ANSWER</div>
                  <div className="font-bold text-base text-white">Mastery Verified & Score Elevated</div>
                </div>
              </div>

              {/* Right Column: Simulated Quiz Diagnostic Panel */}
              <div className="lg:col-span-7 bg-[#0F2238] border border-white/20 rounded-2xl p-7 sm:p-9 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5 text-xs font-mono">
                  <span className="text-slate-400">SESSION: DIA-9021</span>
                  <span className="text-cyan-300 font-bold">ADAPTIVE MODE</span>
                </div>

                <h4 className="text-lg font-semibold text-white mb-5 leading-snug">
                  In stratified sampling for the Periodic Labour Force Survey (PLFS), why are weights calibrated against Census projections?
                </h4>

                <div className="space-y-3 text-sm">
                  <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-200 flex items-center justify-between">
                    <span>A) To correct frame under-coverage and ensure demographic consistency</span>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 ml-2" />
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5 text-slate-400 flex items-center justify-between">
                    <span>B) To artificially deflate variance estimates</span>
                    <span className="text-slate-600 font-mono text-xs">Option B</span>
                  </div>
                </div>

                <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-blue-900/60 to-cyan-900/40 border border-cyan-500/30 text-xs sm:text-sm">
                  <div className="font-bold text-cyan-300 flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span>Engine Action: Concept Mastered (+16 pts)</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Calibration rationale verified. Proficiency updated on official profile.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FEATURE 5: Product Visualization Left, Text Right */}
          <div className="bg-white border border-[#DCE3EA] rounded-3xl p-8 sm:p-12 lg:p-14 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="p-6 sm:p-8 rounded-2xl bg-[#F7F9FC] border border-[#DCE3EA] space-y-5">
                  <div className="flex items-center justify-between font-bold text-lg text-[#102A43]">
                    <span>Cybersecurity</span>
                    <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-full">
                      +16 points
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200">
                      <div className="text-xs text-[#52657A] font-mono font-semibold">BEFORE</div>
                      <div className="text-3xl font-bold text-[#102A43] font-mono mt-1">32%</div>
                      <span className="text-xs text-slate-500">Initial Diagnostic</span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-emerald-300 bg-emerald-50/50">
                      <div className="text-xs text-emerald-700 font-mono font-bold">AFTER</div>
                      <div className="text-3xl font-bold text-emerald-700 font-mono mt-1">48%</div>
                      <span className="text-xs text-emerald-800 font-semibold">
                        Post-Assessment
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
                <div className="text-xs font-bold font-mono uppercase tracking-wider text-[#16845B]">
                  FEATURE 05
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#102A43]">
                  Measure Your Progress
                </h3>
                <p className="text-base sm:text-lg text-[#52657A] font-medium">
                  See demonstrated learning reflected in your competency profile.
                </p>
                <p className="text-sm sm:text-base text-[#52657A] leading-relaxed">
                  Competency records update strictly through demonstrated diagnostic achievements,
                  offering verifiable telemetry to both officers and cadres.
                </p>
              </div>
            </div>
          </div>

          {/* FEATURE 6: Text Left, Organization Intelligence Right */}
          <div
            id="for-organizations"
            className="bg-white border border-[#DCE3EA] rounded-3xl p-8 sm:p-12 lg:p-14 shadow-xs"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="text-xs font-bold font-mono uppercase tracking-wider text-[#2563D9]">
                  FEATURE 06
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#102A43]">
                  Workforce Intelligence
                </h3>
                <p className="text-base sm:text-lg text-[#52657A] font-medium">
                  Help organizations understand capability gaps at scale.
                </p>
                <p className="text-sm sm:text-base text-[#52657A] leading-relaxed">
                  Cadre administrators gain aggregate department-level heatmaps, enabling evidence-based
                  training investments and targeted capacity interventions.
                </p>
                <div className="pt-2">
                  <span className="font-semibold text-sm text-[#2563D9]">Admin Analytics Console Active →</span>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="p-6 sm:p-8 rounded-2xl bg-[#F7F9FC] border border-[#DCE3EA] space-y-3.5 text-sm">
                  <div className="flex items-center justify-between font-semibold text-[#102A43]">
                    <span>Survey Design & Research (SDRD)</span>
                    <span className="text-emerald-700 font-mono font-bold">84% Ready</span>
                  </div>
                  <div className="flex items-center justify-between font-semibold text-[#102A43] pt-2 border-t border-slate-200">
                    <span>National Accounts Division (NAD)</span>
                    <span className="text-blue-700 font-mono font-bold">78% Ready</span>
                  </div>
                  <div className="flex items-center justify-between font-semibold text-[#102A43] pt-2 border-t border-slate-200">
                    <span>Field Operations Division (FOD)</span>
                    <span className="text-amber-700 font-mono font-bold">62% Ready</span>
                  </div>
                  <div className="flex items-center justify-between font-semibold text-[#102A43] pt-2 border-t border-slate-200">
                    <span>Data Informatics & Innovation (DIID)</span>
                    <span className="text-rose-600 font-mono font-bold">54% Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 05 — HOW IT WORKS
         ============================================================ */}
      <section id="how-it-works" className="py-24 lg:py-36 bg-white border-t border-b border-[#DCE3EA]">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-4 mb-20">
            <div className="text-xs font-bold font-mono uppercase tracking-wider text-[#2563D9]">
              HOW IT WORKS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#102A43] tracking-tight">
              Four Steps. One Clear Learning Journey.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-7">
            <div className="bg-[#F7F9FC] border border-[#DCE3EA] rounded-3xl p-8 relative flex flex-col justify-between space-y-6">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#102A43] text-white font-mono font-bold text-base flex items-center justify-center mb-6">
                  01
                </div>
                <h3 className="font-bold text-lg text-[#102A43] mb-2">CREATE YOUR PROFILE</h3>
                <p className="text-sm text-[#52657A] leading-relaxed">
                  Enter your designation, division, and past statistical or administrative service records.
                </p>
              </div>
            </div>

            <div className="bg-[#F7F9FC] border border-[#DCE3EA] rounded-3xl p-8 relative flex flex-col justify-between space-y-6">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#2563D9] text-white font-mono font-bold text-base flex items-center justify-center mb-6">
                  02
                </div>
                <h3 className="font-bold text-lg text-[#102A43] mb-2">IDENTIFY YOUR GAPS</h3>
                <p className="text-sm text-[#52657A] leading-relaxed">
                  AI evaluates your current skills against target benchmarks and reveals prioritized deficits.
                </p>
              </div>
            </div>

            <div className="bg-[#F7F9FC] border border-[#DCE3EA] rounded-3xl p-8 relative flex flex-col justify-between space-y-6">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#16845B] text-white font-mono font-bold text-base flex items-center justify-center mb-6">
                  03
                </div>
                <h3 className="font-bold text-lg text-[#102A43] mb-2">LEARN & ASSESS</h3>
                <p className="text-sm text-[#52657A] leading-relaxed">
                  Engage directly in curated iGOT/NSSTA courses and take real-time adaptive quiz diagnostics.
                </p>
              </div>
            </div>

            <div className="bg-[#F7F9FC] border border-[#DCE3EA] rounded-3xl p-8 relative flex flex-col justify-between space-y-6">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E8871A] text-white font-mono font-bold text-base flex items-center justify-center mb-6">
                  04
                </div>
                <h3 className="font-bold text-lg text-[#102A43] mb-2">TRACK YOUR GROWTH</h3>
                <p className="text-sm text-[#52657A] leading-relaxed">
                  Watch verified milestones reflect automatically on your official competency record.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14 text-center text-sm font-semibold text-[#52657A]">
            No complicated setup. No course hunting. No one-size-fits-all assessment.
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 06 — OUTCOMES (WORKFORCE NEEDS)
         ============================================================ */}
      <section className="py-24 lg:py-36 bg-[#F7F9FC]">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-4 mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#102A43] tracking-tight">
              Designed Around Real Workforce Needs.
            </h2>
            <p className="text-base sm:text-lg text-[#52657A]">
              Tailored value architectures for individual officers, cadre leadership, and training academies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-[#DCE3EA] rounded-3xl p-8 sm:p-10 shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#2563D9] flex items-center justify-center mb-7">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2563D9] mb-1.5">
                GOVERNMENT OFFICIALS
              </h3>
              <h4 className="text-2xl font-bold text-[#102A43] mb-4">
                Know what to learn next.
              </h4>
              <ul className="space-y-3 text-sm text-[#52657A] leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Eliminates ambiguity on role competency requirements.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Direct links to official iGOT and NSSTA training modules.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Constructive, non-punitive adaptive diagnostic tests.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-[#DCE3EA] rounded-3xl p-8 sm:p-10 shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#16845B] flex items-center justify-center mb-7">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#16845B] mb-1.5">
                ORGANIZATIONS
              </h3>
              <h4 className="text-2xl font-bold text-[#102A43] mb-4">
                Understand where capability gaps exist.
              </h4>
              <ul className="space-y-3 text-sm text-[#52657A] leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Division-level competency heatmaps and deficits.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Data-driven workforce succession and capacity planning.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Evidence-based budget and training resource allocations.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-[#DCE3EA] rounded-3xl p-8 sm:p-10 shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#E8871A] flex items-center justify-center mb-7">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#E8871A] mb-1.5">
                TRAINING TEAMS
              </h3>
              <h4 className="text-2xl font-bold text-[#102A43] mb-4">
                Build more targeted learning experiences.
              </h4>
              <ul className="space-y-3 text-sm text-[#52657A] leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Identifies exact topics where cadres struggle during diagnostics.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Pre/post score delta telemetry validates course impact.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Instant document-to-quiz generation from official PDF manuals.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 07 — FAQ (Accessible Accordion)
         ============================================================ */}
      <section id="faq" className="py-24 lg:py-36 bg-white border-t border-b border-[#DCE3EA]">
        <div className="max-w-[1000px] mx-auto px-6 sm:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="text-xs font-bold font-mono uppercase tracking-wider text-[#2563D9]">
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#102A43] tracking-tight">
              Answers to Common Questions.
            </h2>
            <p className="text-base text-[#52657A]">
              Everything you need to know about the Ekalavya platform and mission.
            </p>
          </div>

          <div className="divide-y divide-[#DCE3EA] border-t border-b border-[#DCE3EA]">
            {faqItems.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="py-5 sm:py-6">
                  <button
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    className="w-full flex items-center justify-between text-left py-2 font-bold text-base sm:text-lg text-[#102A43] hover:text-[#2563D9] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563D9] focus:ring-offset-2 rounded-lg px-2"
                  >
                    <span>{item.q}</span>
                    <span className="ml-4 flex-shrink-0 text-[#52657A]">
                      {isOpen ? <ChevronUp className="w-5 h-5 text-[#2563D9]" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      id={`faq-answer-${idx}`}
                      className="pt-3 pb-2 px-2 text-sm sm:text-base text-[#52657A] leading-relaxed animate-fadeIn"
                    >
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 08 — FINAL CTA (Mountain Landscape)
         ============================================================ */}
      <section
        className="relative py-28 lg:py-36 bg-[#071931] text-white overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(7, 25, 49, 0.94) 40%, rgba(16, 42, 67, 0.85) 100%), url('/images/cta_mountain_landscape.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-7">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-['Noto_Sans',sans-serif] leading-tight">
                Ready to Build Your Skills <br />
                for a Greater Tomorrow?
              </h2>

              <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal max-w-xl">
                Start your learning journey with Ekalavya today.
              </p>

              <div className="pt-3 space-y-3">
                <div className="flex items-center gap-5 flex-wrap">
                  <button
                    onClick={() => navigate('/login')}
                    className="inline-flex items-center gap-3 bg-[#2563D9] hover:bg-[#1D4ED8] text-white font-semibold text-base px-9 py-4 rounded-full transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <span className="text-sm text-slate-300 font-medium">
                    Free to use • No complicated setup
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end border-l lg:border-l-0 border-white/10 pl-8 lg:pl-0">
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-300 leading-tight space-y-1.5 font-mono">
                <div className="text-white">Learn</div>
                <div className="text-blue-400">Grow</div>
                <div className="text-emerald-400">Serve</div>
                <div className="text-amber-400 text-xl font-bold">A Stronger India</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 09 — FOOTER (DEEP NAVY)
         ============================================================ */}
      <footer className="bg-[#071931] text-slate-400 text-xs sm:text-sm border-t border-white/10 pt-20 pb-14">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-16">
            <div className="md:col-span-4 space-y-5">
              <EkalavyaLogo variant="dark" size="md" />
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm mt-3">
                An AI-powered competency intelligence and personalized learning platform designed to
                empower India’s public service cadre with measurable, continuous skill growth.
              </p>
            </div>

            <div className="md:col-span-3 space-y-4">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200">
                PLATFORM
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li>
                  <button
                    onClick={() => scrollToSection('how-it-works')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('for-officials')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    For Officials
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('for-organizations')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    For Organizations
                  </button>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-4">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200">
                SUPPORT
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li>
                  <button
                    onClick={() => scrollToSection('faq')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <Link to="/accessibility" className="hover:text-white transition-colors">
                    Accessibility
                  </Link>
                </li>
                <li>
                  <Link to="/help" className="hover:text-white transition-colors">
                    Help
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:support@ekalavya.gov.in"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200">
                LEGAL
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li>
                  <span className="hover:text-white cursor-pointer">Privacy</span>
                </li>
                <li>
                  <span className="hover:text-white cursor-pointer">Terms</span>
                </li>
                <li>
                  <span className="hover:text-white cursor-pointer">Sitemap</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-4 text-xs">
            <div>© Ekalavya. All rights reserved.</div>
            <div>Ministry of Statistics and Programme Implementation (MoSPI)</div>
          </div>
        </div>
      </footer>
    </div>
  );
};
