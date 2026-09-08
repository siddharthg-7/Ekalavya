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
   HERO RADAR CHART (5 Axes matching exact specification)
   ===================================================================== */
const HeroProductRadarChart: React.FC = () => {
  const cx = 130;
  const cy = 115;
  const r = 68;

  const angles = [-90, -18, 54, 126, 198];
  const labels = [
    { text: 'Statistical Methods', x: cx, y: cy - r - 10, anchor: 'middle' },
    { text: 'Data Analysis', x: cx + r + 14, y: cy - 4, anchor: 'start' },
    { text: 'Digital Skills', x: cx + r * Math.cos((54 * Math.PI) / 180) + 12, y: cy + r * Math.sin((54 * Math.PI) / 180) + 10, anchor: 'start' },
    { text: 'Communication', x: cx + r * Math.cos((126 * Math.PI) / 180) - 12, y: cy + r * Math.sin((126 * Math.PI) / 180) + 10, anchor: 'end' },
    { text: 'Domain Knowledge', x: cx - r - 14, y: cy - 4, anchor: 'end' }
  ];

  const getPoint = (angleDeg: number, valRatio: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: cx + r * valRatio * Math.cos(rad),
      y: cy + r * valRatio * Math.sin(rad)
    };
  };

  const levels = [0.25, 0.5, 0.75, 1.0];
  const yourLevelValues = [0.85, 0.70, 0.48, 0.65, 0.78];
  const yourPoints = angles.map((a, i) => getPoint(a, yourLevelValues[i])).map(p => `${p.x},${p.y}`).join(' ');

  const expectedValues = [0.90, 0.88, 0.82, 0.80, 0.85];
  const expectedPoints = angles.map((a, i) => getPoint(a, expectedValues[i])).map(p => `${p.x},${p.y}`).join(' ');

  return (
    <svg viewBox="0 0 260 220" className="w-full max-w-[240px] h-auto overflow-visible select-none">
      {levels.map((lvl, idx) => {
        const pts = angles.map(a => getPoint(a, lvl)).map(p => `${p.x},${p.y}`).join(' ');
        return (
          <polygon
            key={idx}
            points={pts}
            fill={idx === levels.length - 1 ? '#F8FAFC' : 'none'}
            stroke="#E2E8F0"
            strokeWidth="1"
            strokeDasharray={idx < levels.length - 1 ? '2 2' : 'none'}
          />
        );
      })}

      {angles.map((a, idx) => {
        const p = getPoint(a, 1.0);
        return <line key={idx} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#CBD5E1" strokeWidth="1" />;
      })}

      {/* Expected Level (Light Blue / Dashed) */}
      <polygon
        points={expectedPoints}
        fill="rgba(56, 189, 248, 0.08)"
        stroke="#93C5FD"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />

      {/* Your Level (Solid Blue Filled) */}
      <polygon
        points={yourPoints}
        fill="rgba(37, 99, 215, 0.22)"
        stroke="#2563D9"
        strokeWidth="2.2"
      />

      {angles.map((a, idx) => {
        const p = getPoint(a, yourLevelValues[idx]);
        return <circle key={idx} cx={p.x} cy={p.y} r="3.5" fill="#2563D9" stroke="#FFFFFF" strokeWidth="1.5" />;
      })}

      {labels.map((lbl, idx) => (
        <text
          key={idx}
          x={lbl.x}
          y={lbl.y}
          textAnchor={lbl.anchor as any}
          className="text-[9px] font-semibold fill-slate-700 font-sans"
        >
          {lbl.text}
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

  // FAQ accordion tracker
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Interactive Adaptive Assessment Demo Step
  const [adaptiveStep, setAdaptiveStep] = useState<number>(0);

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
      a: 'Ekalavya compares an official’s evaluated proficiency across statistical, technical, digital governance, and behavioural domains against target proficiency benchmarks mandated for their designation in the National Competency Framework.'
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
      {/* ============================================================
          ACCESSIBILITY SKIP LINK & TOP UTILITY BAR
         ============================================================ */}
      <a
        href="#hero-section"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 z-50 bg-[#102A43] text-white px-4 py-2 rounded-md shadow-lg text-sm font-semibold"
      >
        Skip to main content
      </a>

      <div className="bg-[#071931] border-b border-white/10 text-slate-300 text-xs py-2 px-6 sm:px-10">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium tracking-wide">
              {language === 'EN'
                ? 'Government of India • Ministry of Statistics & Programme Implementation'
                : 'भारत सरकार • सांख्यिकी और कार्यक्रम कार्यान्वयन मंत्रालय'}
            </span>
          </div>

          <div className="flex items-center gap-5">
            {/* Font Size Controls */}
            <div className="flex items-center gap-1.5" aria-label="Text Size Controls">
              <span className="text-slate-400 text-[11px] mr-1">Text:</span>
              <button
                onClick={() => handleFontSizeChange('normal')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors ${
                  fontSize === 'normal'
                    ? 'bg-[#2563D9] text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Default Font Size"
              >
                A-
              </button>
              <button
                onClick={() => handleFontSizeChange('large')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors ${
                  fontSize === 'large'
                    ? 'bg-[#2563D9] text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Large Font Size"
              >
                A
              </button>
              <button
                onClick={() => handleFontSizeChange('larger')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors ${
                  fontSize === 'larger'
                    ? 'bg-[#2563D9] text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Extra Large Font Size"
              >
                A+
              </button>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center border-l border-white/15 pl-4">
              <button
                onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
                className="hover:text-white flex items-center gap-1.5 font-semibold text-xs transition-colors"
                title="Toggle Language"
              >
                <span>{language === 'EN' ? 'English (EN)' : 'हिंदी (HI)'}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          NAVIGATION HEADER (top 24px, 1240px max width)
         ============================================================ */}
      <header className="sticky top-0 z-40 bg-[#071931]/95 backdrop-blur-md border-b border-white/10 transition-all duration-200">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 py-5 flex items-center justify-between">
          {/* Left: Ekalavya Logo (150-165px wide) */}
          <Link to="/" className="no-underline flex items-center">
            <EkalavyaLogo variant="dark" size="md" />
          </Link>

          {/* Center: Desktop Navigation Links (28-34px spacing, 14-15px font) */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-slate-200">
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              How it works
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection('for-officials')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              For Officials
            </button>
            <button
              onClick={() => scrollToSection('for-organizations')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              For Organizations
            </button>
          </nav>

          {/* Right Action: Language + Get Started Button (~116x48px, 24px radius) */}
          <div className="hidden md:flex items-center gap-5">
            <span className="text-xs text-slate-300 font-semibold flex items-center gap-1 cursor-pointer hover:text-white">
              EN <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </span>

            <button
              onClick={() => navigate('/login')}
              className="bg-white hover:bg-slate-100 text-[#102A43] font-bold text-sm h-12 min-w-[116px] px-5 rounded-[24px] transition-all duration-150 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 text-[#102A43]" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#071931] border-b border-white/10 px-6 py-5 space-y-4">
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="block w-full text-left text-slate-200 hover:text-white py-2 text-base font-medium"
            >
              How it works
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="block w-full text-left text-slate-200 hover:text-white py-2 text-base font-medium"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection('for-officials')}
              className="block w-full text-left text-slate-200 hover:text-white py-2 text-base font-medium"
            >
              For Officials
            </button>
            <button
              onClick={() => scrollToSection('for-organizations')}
              className="block w-full text-left text-slate-200 hover:text-white py-2 text-base font-medium"
            >
              For Organizations
            </button>
            <div className="pt-3 border-t border-white/10">
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-white text-[#102A43] py-3.5 rounded-full font-bold text-center flex items-center justify-center gap-2 text-base"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ============================================================
          SECTION 01 — HERO (Exact UI Design Specs)
         ============================================================ */}
      <section
        id="hero-section"
        className="relative overflow-hidden bg-[#071931] text-white min-h-screen flex flex-col pt-14 pb-[160px] lg:pt-20"
      >
        <div
          className="absolute inset-0 z-0 opacity-80 bg-cover bg-right lg:bg-center"
          style={{ backgroundImage: `url('/images/hero_official_desk.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071931] via-[#071931]/90 to-[#071931]/40 z-0" />

        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 relative z-10 w-full flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-8">
            {/* Left Column: Hero Text (Max-w ~620px, 64-68px headline) */}
            <div className="lg:col-span-6 space-y-6 max-w-[620px]">
              {/* Eyebrow (36-40px height, blue dot, dark translucent) */}
              <div className="inline-flex items-center gap-2.5 h-9 px-4 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
                <span className="text-xs font-bold tracking-wider text-cyan-200 uppercase font-mono">
                  AI-POWERED COMPETENCY INTELLIGENCE
                </span>
              </div>

              {/* Main Headline (64-68px, 700/750 weight, ~1.02 line height, clean light blue gradient #8CCBFF -> #4FA4F5) */}
              <h1 className="text-white text-5xl sm:text-6xl lg:text-[66px] font-extrabold leading-[1.02] tracking-tight font-['Noto_Sans',sans-serif]">
                Turn Your Potential{' '}
                <br className="hidden sm:inline" />
                Into{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8CCBFF] to-[#4FA4F5]">
                  Greater Impact.
                </span>
              </h1>

              {/* Description (Max-w ~570px, 17-18px font, 1.5 line height, 85% white) */}
              <p className="text-[17.5px] text-white/85 leading-relaxed max-w-[570px] font-normal">
                Understand your competencies, identify skill gaps, get personalized learning, and
                measure real progress — all in one place.
              </p>

              {/* Get Started Button (54-58px height, ~165px width, white bg, navy text, pill radius, Arrow) */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-5 flex-wrap">
                  <button
                    onClick={() => navigate('/login')}
                    className="inline-flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-[#102A43] font-bold text-base h-14 min-w-[165px] px-7 rounded-full transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5 text-[#102A43]" />
                  </button>

                  <span className="text-sm text-slate-300 font-medium">
                    Free to use • No complicated setup
                  </span>
                </div>
              </div>

              {/* Scroll Indicator (Bottom-left, subtle, no bouncing animation) */}
              <div className="pt-4 flex items-center gap-2.5 text-xs text-slate-400 font-medium">
                <button
                  onClick={() => scrollToSection('problem-section')}
                  className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer"
                >
                  <span className="w-7 h-7 rounded-full border border-slate-600 flex items-center justify-center text-xs">
                    ↓
                  </span>
                  <span>Scroll to explore</span>
                </button>
              </div>
            </div>

            {/* Right Column: Realistic Laptop Frame + Flat Ekalavya Screen */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-end relative">
              {/* Realistic Laptop Device Frame */}
              <div className="w-full max-w-[530px] bg-[#1E293B] rounded-[20px] p-2.5 shadow-2xl border border-slate-700/60 relative">
                {/* Camera dot */}
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500 mx-auto mb-1.5" />

                {/* Flat Ekalavya Dashboard Screen */}
                <div className="bg-white rounded-xl overflow-hidden shadow-inner border border-slate-200">
                  {/* Screen Header */}
                  <div className="bg-[#F8FAFC] border-b border-slate-200 px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src="/images/ekalavya_logo.png" alt="Ekalavya" className="w-4 h-4 object-contain" />
                      <span className="font-bold text-xs text-[#102A43]">Ekalavya</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                      <div className="w-4 h-4 rounded-full bg-slate-300 text-[9px] font-bold text-[#102A43] flex items-center justify-center">
                        AK
                      </div>
                      <span>Welcome, <strong className="text-[#102A43]">Arjun Kumar</strong></span>
                      <ChevronDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </div>

                  {/* Screen Body */}
                  <div className="grid grid-cols-12 min-h-[240px]">
                    {/* Compact Sidebar */}
                    <div className="col-span-3 bg-[#F8FAFC] border-r border-slate-200 p-2 space-y-1 text-[10px] font-medium text-slate-600">
                      <div className="px-2 py-1.5 rounded-lg bg-[#2563D9] text-white font-semibold flex items-center gap-1">
                        <span>📊</span> Dashboard
                      </div>
                      <div className="px-2 py-1.5 rounded-lg hover:bg-slate-200/60 flex items-center gap-1">
                        <span>👤</span> My Profile
                      </div>
                      <div className="px-2 py-1.5 rounded-lg hover:bg-slate-200/60 flex items-center gap-1">
                        <span>🎯</span> Learning Path
                      </div>
                      <div className="px-2 py-1.5 rounded-lg hover:bg-slate-200/60 flex items-center gap-1">
                        <span>📝</span> Assessments
                      </div>
                      <div className="px-2 py-1.5 rounded-lg hover:bg-slate-200/60 flex items-center gap-1">
                        <span>📈</span> Progress
                      </div>
                    </div>

                    {/* Main Dashboard Area */}
                    <div className="col-span-9 p-3 space-y-2 bg-white">
                      {/* Title & Legend */}
                      <div className="flex items-center justify-between">
                        <h4 className="text-[11px] font-bold text-[#102A43]">My Competency Profile</h4>
                        <div className="flex items-center gap-2 text-[9px] font-semibold">
                          <span className="flex items-center gap-1 text-[#2563D9]">
                            <span className="w-2 h-2 rounded-full bg-[#2563D9]" /> Your Level
                          </span>
                          <span className="flex items-center gap-1 text-[#93C5FD]">
                            <span className="w-2 h-2 rounded-full bg-[#93C5FD]" /> Expected Level
                          </span>
                        </div>
                      </div>

                      {/* Radar Chart + Insight Card Layout */}
                      <div className="grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-7 flex justify-center">
                          <HeroProductRadarChart />
                        </div>

                        <div className="col-span-5 space-y-2">
                          <div className="p-2.5 rounded-xl bg-[#FFF8F0] border border-[#FDBA74] space-y-1">
                            <div className="text-[10.5px] font-bold text-[#9A3A0A] flex items-center gap-1">
                              <span>🎯</span> 3 Priority Gaps Identified
                            </div>
                            <p className="text-[9.5px] text-slate-600 leading-tight">
                              Get a personalized learning path to bridge the gaps.
                            </p>
                          </div>

                          <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-[9.5px] text-slate-500">
                            <div className="font-semibold text-slate-700">Next Diagnostic:</div>
                            <div>Technical Methods (Adaptive)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Laptop Base Lip */}
                <div className="w-20 h-1 bg-slate-600 rounded-full mx-auto mt-2" />
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            HERO BOTTOM TRUST BAR — Absolutely positioned at bottom: 40px
            Spec: ~1200px × 110px, translucent dark panel, 4 columns with
            vertical dividers. Position: bottom 35–45px inside hero.
           ============================================================ */}
        <div className="absolute bottom-[40px] left-0 right-0 z-10 px-6 sm:px-8">
          <div className="max-w-[1200px] mx-auto bg-[#071931]/90 backdrop-blur-md border border-white/[0.12] rounded-2xl shadow-2xl" style={{height: '110px'}}>
            <div className="h-full grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/[0.10]">
              {/* Column 1 */}
              <div className="flex flex-col justify-center px-7 py-4 space-y-1">
                <div className="font-bold text-[13px] text-white tracking-tight">Competency Framework</div>
                <p className="text-[11.5px] text-slate-400 leading-snug">Role-based skill intelligence</p>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col justify-center px-7 py-4 space-y-1">
                <div className="font-bold text-[13px] text-white tracking-tight">iGOT Karmayogi</div>
                <p className="text-[11.5px] text-slate-400 leading-snug">Curated learning ecosystem</p>
              </div>

              {/* Column 3 */}
              <div className="flex flex-col justify-center px-7 py-4 space-y-1">
                <div className="font-bold text-[13px] text-white tracking-tight">NSSTA</div>
                <p className="text-[11.5px] text-slate-400 leading-snug">Domain-relevant resources</p>
              </div>

              {/* Column 4 */}
              <div className="flex flex-col justify-center px-7 py-4 space-y-1">
                <div className="font-bold text-[13px] text-white tracking-tight">AI-Powered Assessments</div>
                <p className="text-[11.5px] text-slate-400 leading-snug">Adaptive & personalized</p>
              </div>
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
