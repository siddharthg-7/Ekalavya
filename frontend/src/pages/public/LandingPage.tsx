import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { EkalavyaLogo } from '../../components/EkalavyaLogo';
import {
  ArrowRight,
  ChevronDown,
  Compass,
  BookOpen,
  Building2,
  Brain,
  MapPin,
  Users,
  BarChart3,
  Target,
  TrendingUp,
  Building,
  FileText,
  Cpu,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Menu,
  X
} from 'lucide-react';

/* =====================================================================
   SVG PENTAGON RADAR CHART COMPONENT (Matching Reference Mockup)
   ===================================================================== */
const CompetencyRadarChart: React.FC = () => {
  const cx = 140;
  const cy = 135;
  const r = 80;

  // 5 Axes angles in degrees (Top, Right, Bottom-Right, Bottom-Left, Left)
  const angles = [-90, -18, 54, 126, 198];

  const labels = [
    { text: 'Statistical Methods', x: cx, y: cy - r - 14, anchor: 'middle' },
    { text: 'Data Analysis', x: cx + r + 18, y: cy - 10, anchor: 'start' },
    { text: 'Digital Skills', x: cx + r * Math.cos((54 * Math.PI) / 180) + 14, y: cy + r * Math.sin((54 * Math.PI) / 180) + 14, anchor: 'start' },
    { text: 'Administration', x: cx + r * Math.cos((126 * Math.PI) / 180) - 14, y: cy + r * Math.sin((126 * Math.PI) / 180) + 14, anchor: 'end' },
    { text: 'Domain Knowledge', x: cx - r - 18, y: cy - 10, anchor: 'end' }
  ];

  const getPoint = (angleDeg: number, valRatio: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: cx + r * valRatio * Math.cos(rad),
      y: cy + r * valRatio * Math.sin(rad)
    };
  };

  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];
  const currentValues = [0.82, 0.72, 0.45, 0.65, 0.75];
  const currentPoints = angles.map((a, i) => getPoint(a, currentValues[i])).map(p => `${p.x},${p.y}`).join(' ');

  const targetValues = [0.90, 0.88, 0.80, 0.82, 0.85];
  const targetPoints = angles.map((a, i) => getPoint(a, targetValues[i])).map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="relative w-full flex items-center justify-center py-2 select-none">
      <svg viewBox="0 0 280 270" className="w-full max-w-[280px] h-auto overflow-visible">
        {/* Concentric Grid Pentagons */}
        {levels.map((level, idx) => {
          const pts = angles.map(a => getPoint(a, level)).map(p => `${p.x},${p.y}`).join(' ');
          return (
            <polygon
              key={idx}
              points={pts}
              fill={idx === levels.length - 1 ? '#F8FAFC' : 'none'}
              stroke="#E2E8F0"
              strokeWidth="1"
              strokeDasharray={idx < levels.length - 1 ? '3 3' : 'none'}
            />
          );
        })}

        {/* Radial Axis Lines */}
        {angles.map((a, idx) => {
          const p = getPoint(a, 1.0);
          return (
            <line
              key={idx}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke="#CBD5E1"
              strokeWidth="1"
            />
          );
        })}

        {/* Expected Level Polygon (Dashed Orange Line) */}
        <polygon
          points={targetPoints}
          fill="rgba(232, 135, 26, 0.08)"
          stroke="#E8871A"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />

        {/* Current / Key Level Polygon (Solid Blue Filled) */}
        <polygon
          points={currentPoints}
          fill="rgba(37, 99, 215, 0.22)"
          stroke="#2563D9"
          strokeWidth="2.5"
        />

        {/* Data Point Markers */}
        {angles.map((a, idx) => {
          const p = getPoint(a, currentValues[idx]);
          return (
            <circle
              key={idx}
              cx={p.x}
              cy={p.y}
              r="4"
              fill="#2563D9"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
          );
        })}

        {/* Labels */}
        {labels.map((lbl, idx) => (
          <text
            key={idx}
            x={lbl.x}
            y={lbl.y}
            textAnchor={lbl.anchor as any}
            className="text-[10px] font-semibold fill-slate-700 font-sans"
          >
            {lbl.text}
          </text>
        ))}
      </svg>
    </div>
  );
};

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqList = [
    {
      q: 'What is Ekalavya?',
      a: 'Ekalavya is an AI-powered competency intelligence and personalized learning platform engineered for government officials. It benchmarks individual capabilities against institutional role requirements, discovers targeted learning modules from iGOT Karmayogi & NSSTA, and administers adaptive diagnostics to measure real skill growth.'
    },
    {
      q: 'Is the platform free to use?',
      a: 'Yes. Ekalavya is a public-service capacity intelligence initiative designed for all government statistical and administrative officials with zero licensing fees or subscription barriers.'
    },
    {
      q: 'Is this a replacement for iGOT?',
      a: 'No. Ekalavya works synergistically with iGOT Karmayogi and NSSTA. Ekalavya acts as the intelligent diagnostic layer that identifies your exact skill gaps and directs you directly to the relevant course modules on iGOT.'
    },
    {
      q: 'What kind of learning resources are recommended?',
      a: 'Our semantic AI matching engine scans official curricula catalogues across iGOT Karmayogi and NSSTA to map verified modules directly to your specific competency gaps.'
    },
    {
      q: 'How does the AI identify skill gaps?',
      a: 'Ekalavya compares an official’s evaluated proficiency across statistical, technical, digital governance, and behavioural domains against target benchmarks mandated for their designation in the National Competency Framework.'
    },
    {
      q: 'Can organizations use this platform?',
      a: 'Yes. Cadre administrators, division heads, and training directors receive anonymized workforce intelligence heatmaps, aggregate competency deficit alerts, and curriculum effectiveness analytics across entire directorates.'
    },
    {
      q: 'Are the assessments adaptive?',
      a: 'Yes. Questions dynamically adjust based on your responses. Correct answers elevate difficulty while incorrect answers pause escalation to provide remedial concept reinforcement.'
    },
    {
      q: 'How is my data handled?',
      a: 'All officer data and assessment records are protected using strict government-grade security standards with sandbox compatibility mode for seamless demo exploration.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#102A43] font-['Noto_Sans',sans-serif] selection:bg-[#2563D9] selection:text-white">
      {/* ============================================================
          ACCESSIBILITY SKIP LINK
         ============================================================ */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 z-50 bg-[#102A43] text-white px-4 py-2 rounded-md shadow-lg text-sm font-semibold"
      >
        Skip to main content
      </a>

      {/* ============================================================
          NAVIGATION HEADER
         ============================================================ */}
      <header className="sticky top-0 z-40 bg-[#071931]/95 backdrop-blur-md border-b border-white/10 transition-all duration-200">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-3.5 flex items-center justify-between">
          {/* Ekalavya Logo + Tagline */}
          <Link to="/" className="no-underline flex items-center">
            <EkalavyaLogo variant="dark" size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-200">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors cursor-pointer">
              Home
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition-colors cursor-pointer">
              How it Works
            </button>
            <button onClick={() => scrollToSection('for-officials')} className="hover:text-white transition-colors cursor-pointer">
              For Officials
            </button>
            <button onClick={() => scrollToSection('for-organizations')} className="hover:text-white transition-colors cursor-pointer">
              For Organizations
            </button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-white transition-colors cursor-pointer">
              FAQ
            </button>
          </nav>

          {/* Right Action: Language + Get Started Pill */}
          <div className="hidden md:flex items-center gap-5">
            <span className="text-xs text-slate-300 font-semibold flex items-center gap-1 cursor-pointer hover:text-white">
              EN <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </span>

            <button
              onClick={() => navigate('/login')}
              className="bg-white hover:bg-slate-100 text-[#102A43] font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-150 shadow-md hover:shadow-lg cursor-pointer flex items-center gap-1.5"
            >
              <span>Get Started</span>
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
          <div className="md:hidden bg-[#071931] border-b border-white/10 px-6 py-4 space-y-3">
            <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left text-slate-200 py-2 text-sm font-medium">
              How it Works
            </button>
            <button onClick={() => scrollToSection('for-officials')} className="block w-full text-left text-slate-200 py-2 text-sm font-medium">
              For Officials
            </button>
            <button onClick={() => scrollToSection('for-organizations')} className="block w-full text-left text-slate-200 py-2 text-sm font-medium">
              For Organizations
            </button>
            <button onClick={() => scrollToSection('faq')} className="block w-full text-left text-slate-200 py-2 text-sm font-medium">
              FAQ
            </button>
            <div className="pt-2 border-t border-white/10">
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-white text-[#102A43] py-3 rounded-full font-semibold text-center flex items-center justify-center gap-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ============================================================
          SECTION 01 — HERO (Exact Reference Match)
         ============================================================ */}
      <section
        id="hero"
        className="relative overflow-hidden bg-[#071931] text-white pt-12 pb-20 lg:pt-16 lg:pb-28"
      >
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity bg-cover bg-center"
          style={{ backgroundImage: `url('/images/hero_official_desk.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071931] via-[#071931]/95 to-[#071931]/80 z-0" />

        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Hero Text & White Pill CTA */}
            <div className="lg:col-span-6 space-y-6">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#00B4D8] animate-pulse" />
                <span className="text-xs font-bold tracking-wider text-cyan-200 uppercase font-mono">
                  AI-POWERED COMPETENCY INTELLIGENCE
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-white text-4xl sm:text-5xl lg:text-[60px] font-extrabold leading-[1.1] tracking-tight font-['Noto_Sans',sans-serif]">
                Turn Your Potential{' '}
                <br className="hidden sm:inline" />
                Into{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#38BDF8] to-[#00B4D8]">
                  Greater Impact.
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-normal">
                Understand your competencies, identify skill gaps, get personalized learning, and
                measure real progress — all in one place.
              </p>

              {/* Primary CTA Pill */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => navigate('/login')}
                    className="inline-flex items-center gap-3 bg-white hover:bg-slate-100 text-[#102A43] font-bold text-base px-7 py-3.5 rounded-full transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Get Started</span>
                    <span className="w-7 h-7 rounded-full bg-[#102A43] text-white flex items-center justify-center text-xs">
                      →
                    </span>
                  </button>

                  <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                    Free to use • No complicated setup
                  </span>
                </div>

                <p className="text-xs text-slate-400 font-medium sm:hidden">
                  Free to use • No complicated setup
                </p>
              </div>

              {/* Scroll prompt */}
              <div className="pt-6 flex items-center gap-2 text-xs text-slate-400 font-medium">
                <button
                  onClick={() => scrollToSection('ecosystem')}
                  className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer"
                >
                  <span className="w-7 h-7 rounded-full border border-slate-600 flex items-center justify-center text-xs">
                    ↓
                  </span>
                  <span>Scroll to explore</span>
                </button>
              </div>
            </div>

            {/* Right Column: Hero Product Preview Card with SVG Pentagon Radar Chart */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-end relative">
              {/* Background Typographic Overlay Poster */}
              <div className="absolute top-2 right-4 text-right opacity-20 pointer-events-none select-none hidden sm:block">
                <div className="text-3xl font-extrabold tracking-tight text-white leading-tight font-mono">
                  Skilled<br />Officials<br />Stronger<br />India
                </div>
              </div>

              {/* White Product UI Card */}
              <div className="w-full max-w-[460px] bg-white text-[#102A43] border border-slate-200 rounded-2xl p-6 shadow-2xl relative z-10">
                {/* Header Profile Info */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#102A43] text-white font-bold text-xs flex items-center justify-center">
                      AK
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#102A43]">Amit Kumar</div>
                      <div className="text-[10px] text-slate-500 font-medium">Deputy Director • MoSPI</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#2563D9] bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                    Official Profile
                  </span>
                </div>

                {/* Radar Chart Title & Legend */}
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-800">
                    My Competency Profile
                  </h3>
                  <div className="flex items-center gap-3 text-[10px] font-semibold">
                    <span className="flex items-center gap-1 text-[#2563D9]">
                      <span className="w-2 h-2 rounded-full bg-[#2563D9]" /> Key Level
                    </span>
                    <span className="flex items-center gap-1 text-[#E8871A]">
                      <span className="w-2 h-2 rounded-full border border-[#E8871A]" /> Expected Level
                    </span>
                  </div>
                </div>

                {/* SVG Pentagon Radar Chart */}
                <CompetencyRadarChart />

                {/* Floating Orange Callout Badge */}
                <div className="mt-3 p-3.5 rounded-xl bg-[#FFF8F0] border border-[#FDBA74] flex items-start gap-3 shadow-xs">
                  <div className="w-7 h-7 rounded-full bg-[#E8871A] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#9A3A0A]">2 Priority Gaps Identified</div>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                      Get personalized learning path to bridge the gaps.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 02 — SOCIAL PROOF / TRUST STRIP
         ============================================================ */}
      <section id="ecosystem" className="py-14 bg-white border-b border-[#DCE3EA] text-center">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-[#52657A] mb-8">
            BUILT FOR INDIA’S GOVERNMENT LEARNING ECOSYSTEM
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            {/* 01 Competency Framework */}
            <div className="p-5 rounded-2xl border border-[#DCE3EA] bg-[#F7F9FC] flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#2563D9] flex items-center justify-center mb-3">
                <Compass className="w-5 h-5" />
              </div>
              <div className="font-bold text-sm text-[#102A43]">Competency Framework</div>
            </div>

            {/* 02 iGOT Karmayogi */}
            <div className="p-5 rounded-2xl border border-[#DCE3EA] bg-[#F7F9FC] flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#E8871A] flex items-center justify-center mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="font-bold text-sm text-[#102A43]">iGOT Karmayogi</div>
            </div>

            {/* 03 NSSTA */}
            <div className="p-5 rounded-2xl border border-[#DCE3EA] bg-[#F7F9FC] flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-xl bg-slate-200 text-[#102A43] flex items-center justify-center mb-3">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="font-bold text-sm text-[#102A43]">NSSTA</div>
            </div>

            {/* 04 AI-Powered Learning & Assessment */}
            <div className="p-5 rounded-2xl border border-[#DCE3EA] bg-[#F7F9FC] flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-3">
                <Brain className="w-5 h-5" />
              </div>
              <div className="font-bold text-sm text-[#102A43]">AI-Powered Learning & Assessment</div>
            </div>
          </div>

          <p className="text-xs text-[#52657A] mt-6 font-medium">
            Empowering a more skilled, capable and future-ready government workforce.
          </p>
        </div>
      </section>

      {/* ============================================================
          SECTION 03 — PROBLEM (THE CHALLENGE)
         ============================================================ */}
      <section className="py-20 lg:py-28 bg-[#F7F9FC]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side: Problem Description & 3 White Cards */}
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs font-bold font-mono uppercase tracking-wider text-[#52657A]">
                THE CHALLENGE
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#102A43] tracking-tight leading-tight">
                Access to Learning is{' '}
                <span className="text-[#2563D9]">Not Enough.</span>
              </h2>

              <p className="text-base text-[#52657A] leading-relaxed">
                Many officials face unclear skill gaps, generic training, and no measurable feedback —
                making it difficult to build the right skills for greater impact.
              </p>

              {/* 3 Problem Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-white border border-[#DCE3EA] shadow-xs space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-[#102A43]">Unclear Skill Gaps</h3>
                  <p className="text-xs text-[#52657A] leading-normal">
                    Difficult to know what to focus on.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#DCE3EA] shadow-xs space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-[#102A43]">One-Size-Fits-All Learning</h3>
                  <p className="text-xs text-[#52657A] leading-normal">
                    Same training for different needs.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#DCE3EA] shadow-xs space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-[#102A43]">No Measurable Progress</h3>
                  <p className="text-xs text-[#52657A] leading-normal">
                    Hard to track real improvement.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side: Official Photo with 3 Floating Question Pills */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative rounded-3xl overflow-hidden border border-[#DCE3EA] shadow-xl max-w-md w-full">
                <img
                  src="/images/challenge_official_workspace.jpg"
                  alt="Government official reviewing documents"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/60 via-transparent to-transparent" />

                {/* Floating Question Pill 1 */}
                <div className="absolute top-6 right-4 max-w-xs bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg border border-[#DCE3EA] text-xs font-semibold text-[#102A43] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2563D9]" />
                  <span>Which course is right for me?</span>
                </div>

                {/* Floating Question Pill 2 */}
                <div className="absolute top-28 right-4 max-w-xs bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg border border-[#DCE3EA] text-xs font-semibold text-[#102A43] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E8871A]" />
                  <span>Am I learning the right skills?</span>
                </div>

                {/* Floating Question Pill 3 */}
                <div className="absolute bottom-8 right-4 max-w-xs bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg border border-[#DCE3EA] text-xs font-semibold text-[#102A43] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>How do I know if I'm improving?</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 04 — SOLUTION (OUR SOLUTION)
         ============================================================ */}
      <section className="py-20 lg:py-28 bg-white border-t border-b border-[#DCE3EA]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
            <div className="text-xs font-bold font-mono uppercase tracking-wider text-[#52657A]">
              OUR SOLUTION
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#102A43] tracking-tight">
              A Smarter Way to Learn and Grow.
            </h2>
            <p className="text-base text-[#52657A] leading-relaxed">
              Ekalavya combines AI and the government learning ecosystem to give you personalized learning,
              adaptive assessments, and measurable progress.
            </p>
          </div>

          {/* 6 Color-Tinted Feature Cards Grid (3x2) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Light Blue */}
            <div className="p-7 rounded-2xl bg-blue-50/60 border border-blue-100 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#102A43]">Personalized Competency Profile</h3>
              <p className="text-xs text-[#52657A] leading-relaxed">
                Based on your role, department and experience.
              </p>
            </div>

            {/* Card 2: Light Orange */}
            <div className="p-7 rounded-2xl bg-amber-50/60 border border-amber-100 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E8871A] text-white flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#102A43]">AI Skill-Gap Analysis</h3>
              <p className="text-xs text-[#52657A] leading-relaxed">
                Find the skills you need to focus on.
              </p>
            </div>

            {/* Card 3: Light Green */}
            <div className="p-7 rounded-2xl bg-emerald-50/60 border border-emerald-100 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#16845B] text-white flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#102A43]">Relevant Learning Recommendations</h3>
              <p className="text-xs text-[#52657A] leading-relaxed">
                Discover curated iGOT and NSSTA courses.
              </p>
            </div>

            {/* Card 4: Light Purple */}
            <div className="p-7 rounded-2xl bg-purple-50/60 border border-purple-100 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#102A43]">Adaptive Assessments</h3>
              <p className="text-xs text-[#52657A] leading-relaxed">
                Practice with AI-generated questions and get instant feedback.
              </p>
            </div>

            {/* Card 5: Light Emerald */}
            <div className="p-7 rounded-2xl bg-teal-50/60 border border-teal-100 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#102A43]">Track Your Progress</h3>
              <p className="text-xs text-[#52657A] leading-relaxed">
                See real improvement over time.
              </p>
            </div>

            {/* Card 6: Light Peach */}
            <div className="p-7 rounded-2xl bg-orange-50/60 border border-orange-100 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#102A43]">Organization Insights</h3>
              <p className="text-xs text-[#52657A] leading-relaxed">
                Help your department make better capacity-building decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 05 — HOW IT WORKS
         ============================================================ */}
      <section id="how-it-works" className="py-20 lg:py-28 bg-[#F7F9FC]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
            <div className="text-xs font-bold font-mono uppercase tracking-wider text-[#52657A]">
              HOW IT WORKS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#102A43] tracking-tight">
              From Insight to Impact in 4 Simple Steps.
            </h2>
          </div>

          {/* 4 Steps Horizontal Flow with Connecting Arrows */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="bg-white border border-[#DCE3EA] rounded-2xl p-6 relative flex flex-col items-start space-y-3">
              <div className="flex items-center justify-between w-full">
                <div className="w-9 h-9 rounded-full bg-[#2563D9] text-white font-bold text-sm flex items-center justify-center">
                  1
                </div>
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563D9] flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
              </div>
              <h3 className="font-bold text-base text-[#102A43]">Create Your Profile</h3>
              <p className="text-xs text-[#52657A] leading-relaxed">
                Tell us about your role and experience.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-[#DCE3EA] rounded-2xl p-6 relative flex flex-col items-start space-y-3">
              <div className="flex items-center justify-between w-full">
                <div className="w-9 h-9 rounded-full bg-[#E8871A] text-white font-bold text-sm flex items-center justify-center">
                  2
                </div>
                <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#E8871A] flex items-center justify-center">
                  <Cpu className="w-4 h-4" />
                </div>
              </div>
              <h3 className="font-bold text-base text-[#102A43]">Get AI Insights</h3>
              <p className="text-xs text-[#52657A] leading-relaxed">
                Identify your skill gaps instantly.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-[#DCE3EA] rounded-2xl p-6 relative flex flex-col items-start space-y-3">
              <div className="flex items-center justify-between w-full">
                <div className="w-9 h-9 rounded-full bg-[#16845B] text-white font-bold text-sm flex items-center justify-center">
                  3
                </div>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#16845B] flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
              </div>
              <h3 className="font-bold text-base text-[#102A43]">Learn & Assess</h3>
              <p className="text-xs text-[#52657A] leading-relaxed">
                Follow personalized recommendations and take adaptive quizzes.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white border border-[#DCE3EA] rounded-2xl p-6 relative flex flex-col items-start space-y-3">
              <div className="flex items-center justify-between w-full">
                <div className="w-9 h-9 rounded-full bg-purple-600 text-white font-bold text-sm flex items-center justify-center">
                  4
                </div>
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4" />
                </div>
              </div>
              <h3 className="font-bold text-base text-[#102A43]">Track Your Growth</h3>
              <p className="text-xs text-[#52657A] leading-relaxed">
                See your improvement and continue building new skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 06 — TESTIMONIALS / OUTCOMES
         ============================================================ */}
      <section id="for-officials" className="py-20 lg:py-28 bg-white border-t border-b border-[#DCE3EA]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-bold font-mono uppercase tracking-wider text-[#52657A] mb-1">
                TRUSTED BY GOVERNMENT PROFESSIONALS
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#102A43] tracking-tight">
                Built for Those Who Build a Stronger India.
              </h2>
            </div>

            {/* Carousel Arrow Controls */}
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-full border border-[#DCE3EA] flex items-center justify-center text-[#52657A] hover:bg-slate-50 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="w-9 h-9 rounded-full border border-[#DCE3EA] flex items-center justify-center text-[#52657A] hover:bg-slate-50 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="p-7 rounded-2xl bg-[#F7F9FC] border border-[#DCE3EA] flex flex-col justify-between space-y-6">
              <p className="text-sm text-[#52657A] leading-relaxed italic">
                “Ekalavya helped me identify the exact skills I needed to work on. The personalized recommendations saved a lot of time.”
              </p>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center font-bold text-xs text-[#102A43]">
                  AS
                </div>
                <div>
                  <div className="text-sm font-bold text-[#102A43]">Amrita Sharma</div>
                  <div className="text-xs text-[#52657A]">Statistical Officer</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="p-7 rounded-2xl bg-[#F7F9FC] border border-[#DCE3EA] flex flex-col justify-between space-y-6">
              <p className="text-sm text-[#52657A] leading-relaxed italic">
                “The adaptive assessments are a game changer. I can see real improvement in my competencies.”
              </p>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center font-bold text-xs text-[#102A43]">
                  RV
                </div>
                <div>
                  <div className="text-sm font-bold text-[#102A43]">Rohit Verma</div>
                  <div className="text-xs text-[#52657A]">Data Analyst</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="p-7 rounded-2xl bg-[#F7F9FC] border border-[#DCE3EA] flex flex-col justify-between space-y-6">
              <p className="text-sm text-[#52657A] leading-relaxed italic">
                “As an administrator, it gives us a clear view of skill gaps across departments. Very useful for planning.”
              </p>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center font-bold text-xs text-[#102A43]">
                  SK
                </div>
                <div>
                  <div className="text-sm font-bold text-[#102A43]">S. Krishnan</div>
                  <div className="text-xs text-[#52657A]">Department Head</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 07 — FAQ (2-COLUMN GRID MATCHING MOCKUP)
         ============================================================ */}
      <section id="faq" className="py-20 lg:py-28 bg-[#F7F9FC]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="text-xs font-bold font-mono uppercase tracking-wider text-[#52657A] mb-1">
                FREQUENTLY ASKED QUESTIONS
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#102A43] tracking-tight">
                Answers to Common Questions.
              </h2>
            </div>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-xs font-semibold text-[#2563D9] hover:underline hidden sm:inline-block"
            >
              View all FAQs
            </button>
          </div>

          {/* 2-Column FAQ Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {faqList.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-[#DCE3EA] rounded-xl p-5 transition-all shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between text-left font-bold text-sm sm:text-base text-[#102A43] cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <span className="ml-3 flex-shrink-0 text-slate-400">
                      {isOpen ? <Minus className="w-4 h-4 text-[#2563D9]" /> : <Plus className="w-4 h-4 text-slate-400" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="mt-3 pt-3 border-t border-slate-100 text-xs sm:text-sm text-[#52657A] leading-relaxed">
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
          SECTION 08 — FINAL CTA (MOUNTAIN BACKGROUND WITH GRAPHIC)
         ============================================================ */}
      <section
        className="relative py-24 lg:py-32 bg-[#071931] text-white overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(7, 25, 49, 0.94) 40%, rgba(16, 42, 67, 0.85) 100%), url('/images/cta_mountain_landscape.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Side Text & Blue CTA */}
            <div className="lg:col-span-8 space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-['Noto_Sans',sans-serif] leading-tight">
                Ready to Build Your Skills <br />
                for a Greater Tomorrow?
              </h2>

              <p className="text-base sm:text-lg text-slate-300 font-normal max-w-xl">
                Start your learning journey with Ekalavya today.
              </p>

              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => navigate('/login')}
                    className="inline-flex items-center gap-3 bg-[#2563D9] hover:bg-[#1D4ED8] text-white font-semibold text-base px-8 py-3.5 rounded-full transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                    Free to use • No complicated setup
                  </span>
                </div>

                <p className="text-xs text-slate-400 font-medium sm:hidden">
                  Free to use • No complicated setup
                </p>
              </div>
            </div>

            {/* Right Side Stacked Typography Graphic */}
            <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end border-l lg:border-l-0 border-white/10 pl-6 lg:pl-0">
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-300 leading-tight space-y-1 font-mono">
                <div className="text-white">Learn</div>
                <div className="text-blue-400">Grow</div>
                <div className="text-emerald-400">Serve</div>
                <div className="text-amber-400 text-lg font-bold">A Stronger India</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 09 — FOOTER (DEEP NAVY)
         ============================================================ */}
      <footer className="bg-[#071931] text-slate-400 text-xs border-t border-white/10 pt-16 pb-12">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12 pb-8 border-b border-white/10">
            {/* Left Brand logo & Tagline */}
            <EkalavyaLogo variant="dark" size="md" />

            {/* Nav links */}
            <div className="flex flex-wrap gap-6 text-slate-300 font-medium text-xs">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors cursor-pointer">
                Home
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition-colors cursor-pointer">
                About
              </button>
              <button onClick={() => scrollToSection('for-officials')} className="hover:text-white transition-colors cursor-pointer">
                For Officials
              </button>
              <button onClick={() => scrollToSection('for-organizations')} className="hover:text-white transition-colors cursor-pointer">
                For Organizations
              </button>
              <button onClick={() => scrollToSection('faq')} className="hover:text-white transition-colors cursor-pointer">
                FAQ
              </button>
              <a href="mailto:support@ekalavya.gov.in" className="hover:text-white transition-colors">
                Help
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex gap-4 text-slate-400 text-xs">
              <span className="hover:text-white cursor-pointer">Privacy</span>
              <span className="hover:text-white cursor-pointer">Terms</span>
              <span className="hover:text-white cursor-pointer">Accessibility</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-4">
            <div>© 2025 Ekalavya. All rights reserved.</div>
            <div>Ministry of Statistics and Programme Implementation (MoSPI)</div>
          </div>
        </div>
      </footer>
    </div>
  );
};
