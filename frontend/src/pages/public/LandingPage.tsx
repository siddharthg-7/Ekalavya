import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { EkalavyaLogo } from '../../components/EkalavyaLogo';
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Brain,
  BookOpen,
  Award,
  Sparkles,
  Building2,
  Users,
  Compass,
  Zap,
  Menu,
  X
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  // Accessibility state
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'larger'>('normal');
  const [language, setLanguage] = useState<'EN' | 'HI'>('EN');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // FAQ open item tracker
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
      a: 'Ekalavya is an AI-powered competency intelligence and personalized learning platform engineered for government officials. It benchmarks individual capabilities against institutional role requirements, discovers targeted learning from academies like iGOT Karmayogi and NSSTA, and administers adaptive diagnostics to measure real skill growth.'
    },
    {
      q: 'How does Ekalavya identify competency gaps?',
      a: 'Ekalavya compares an official’s current evaluated proficiency across statistical, technical, digital governance, and behavioural domains against target proficiency levels mandated for their designation and division in the National Competency Framework.'
    },
    {
      q: 'Is Ekalavya free to use?',
      a: 'Yes. Ekalavya is a public-service capacity intelligence initiative designed for all central, state, and departmental statistical and administrative officials with zero licensing fees or subscription barriers.'
    },
    {
      q: 'How are learning recommendations generated?',
      a: 'Our semantic AI matching engine scans official curricula catalogues across iGOT Karmayogi and the National Statistical Systems Training Academy (NSSTA). Courses are matched directly to specific competency deficits rather than generic search tags.'
    },
    {
      q: 'Are the assessments adaptive?',
      a: 'Yes. Unlike static multiple-choice tests, Ekalavya evaluates your understanding in real time. When you answer correctly, question complexity escalates. When an error is detected, the engine diagnoses the exact underlying concept and introduces remedial reinforcement.'
    },
    {
      q: 'What happens when I answer incorrectly?',
      a: 'The engine pauses difficulty escalation, highlights the conceptual principle that was misunderstood, and serves a targeted remedial question on that exact concept to build foundational confidence before advancing.'
    },
    {
      q: 'Is Ekalavya a replacement for iGOT?',
      a: 'No. Ekalavya works synergistically with iGOT Karmayogi and institutional academies like NSSTA. Ekalavya serves as the intelligent diagnostic and navigation layer, guiding officials directly to the precise modules on iGOT that solve their unique skill gaps.'
    },
    {
      q: 'Can organizations use Ekalavya?',
      a: 'Yes. Cadre administrators, division heads, and training directors receive anonymized workforce intelligence heatmaps, aggregate competency deficit alerts, and curriculum effectiveness analytics across entire directorates.'
    },
    {
      q: 'How is my competency profile updated?',
      a: 'Competency profile scores are updated when an official completes verified adaptive assessments or course milestone diagnostics. The AI engine recalculates proficiency delta and updates the official mastery record.'
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

      <div className="bg-[#071931] border-b border-white/10 text-slate-300 text-xs py-1.5 px-6 sm:px-10">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium tracking-wide">
              {language === 'EN'
                ? 'Government of India • Ministry of Statistics & Programme Implementation'
                : 'भारत सरकार • सांख्यिकी और कार्यक्रम कार्यान्वयन मंत्रालय'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Font Size Controls */}
            <div className="flex items-center gap-1.5" aria-label="Text Size Controls">
              <span className="text-slate-400 text-[11px] mr-1">Text:</span>
              <button
                onClick={() => handleFontSizeChange('normal')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-colors ${
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
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-colors ${
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
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-colors ${
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
            <div className="flex items-center border-l border-white/15 pl-3">
              <button
                onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
                className="hover:text-white flex items-center gap-1 font-semibold text-xs transition-colors"
                title="Toggle Language"
              >
                <span>{language === 'EN' ? 'English (EN)' : 'हिंदी (HI)'}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          FLOATING / CONTAINED NAVIGATION
         ============================================================ */}
      <header className="sticky top-0 z-40 bg-[#071931]/95 backdrop-blur-md border-b border-white/10 transition-all duration-200">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-3.5 flex items-center justify-between">
          {/* Official Ekalavya Brand Logo */}
          <Link to="/" className="no-underline flex items-center">
            <EkalavyaLogo variant="dark" size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-200">
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              How it works
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
            <button
              onClick={() => scrollToSection('faq')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              FAQ
            </button>
          </nav>

          {/* Right Action: Language + Get Started */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-xs text-slate-300 font-semibold flex items-center gap-1">
              EN <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </span>

            {/* ONLY Primary Navigation Action */}
            <button
              onClick={() => navigate('/login')}
              className="bg-[#2563D9] hover:bg-[#1D4ED8] text-white px-5 py-2.5 rounded-full text-sm font-semibold tracking-tight transition-all duration-150 shadow-sm hover:shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
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
          <div className="md:hidden bg-[#071931] border-b border-white/10 px-6 py-4 space-y-3 animate-fadeIn">
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="block w-full text-left text-slate-200 hover:text-white py-2 text-sm font-medium"
            >
              How it works
            </button>
            <button
              onClick={() => scrollToSection('for-officials')}
              className="block w-full text-left text-slate-200 hover:text-white py-2 text-sm font-medium"
            >
              For Officials
            </button>
            <button
              onClick={() => scrollToSection('for-organizations')}
              className="block w-full text-left text-slate-200 hover:text-white py-2 text-sm font-medium"
            >
              For Organizations
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="block w-full text-left text-slate-200 hover:text-white py-2 text-sm font-medium"
            >
              FAQ
            </button>
            <div className="pt-2 border-t border-white/10">
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-[#2563D9] text-white py-3 rounded-xl font-semibold text-center flex items-center justify-center gap-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ============================================================
          SECTION 01 — HERO
         ============================================================ */}
      <section
        id="hero-section"
        className="relative overflow-hidden bg-[#071931] text-white pt-12 pb-24 lg:pt-20 lg:pb-32"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(7, 25, 49, 0.94) 30%, rgba(16, 42, 67, 0.88) 100%), url('/images/hero_official_desk.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Hero Text & Single Primary CTA */}
            <div className="lg:col-span-6 space-y-6">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#00B4D8]" />
                <span className="text-xs font-bold tracking-wider text-cyan-200 uppercase font-mono">
                  AI-POWERED COMPETENCY INTELLIGENCE
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-white text-4xl sm:text-5xl lg:text-[64px] font-extrabold leading-[1.08] tracking-tight font-['Noto_Sans',sans-serif]">
                Turn Your Potential{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#38BDF8] to-[#00B4D8]">
                  Into Greater Impact.
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-normal">
                Understand your competencies, identify skill gaps, get personalized learning, and
                measure real progress — all in one place.
              </p>

              {/* Primary CTA */}
              <div className="pt-2 space-y-3">
                <div>
                  <button
                    onClick={() => navigate('/login')}
                    className="inline-flex items-center gap-3 bg-[#2563D9] hover:bg-[#1D4ED8] text-white font-semibold text-base px-8 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Subtext under CTA */}
                <p className="text-xs text-slate-400 font-medium">
                  Free to use <span className="mx-2">•</span> No complicated setup
                </p>
              </div>

              {/* Scroll prompt */}
              <div className="pt-6 flex items-center gap-2 text-xs text-slate-400 font-medium">
                <button
                  onClick={() => scrollToSection('ecosystem')}
                  className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-full border border-slate-600 flex items-center justify-center text-[10px]">
                    ↓
                  </span>
                  <span>Scroll to explore</span>
                </button>
              </div>
            </div>

            {/* Right Column: Realistic Product UI Preview */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-end">
              {/* Likelihood of Achievement Strip */}
              <div className="w-full max-w-lg mb-3 px-4 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between text-[11px] font-mono font-bold tracking-wider text-slate-300">
                <span className="text-cyan-300">IDENTIFY</span>
                <span className="text-slate-500">→</span>
                <span className="text-blue-300">LEARN</span>
                <span className="text-slate-500">→</span>
                <span className="text-emerald-300">ASSESS</span>
                <span className="text-slate-500">→</span>
                <span className="text-amber-300">IMPROVE</span>
              </div>

              {/* Realistic Application Preview Card */}
              <div className="w-full max-w-lg bg-[#0F2238] border border-white/15 rounded-2xl p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                {/* Subtle top frame controls */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-xs font-mono text-slate-400 ml-2">
                      portal.ekalavya.gov.in
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    Verified Profile
                  </span>
                </div>

                {/* Card Title & Score */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h2 className="text-xs uppercase font-mono font-bold tracking-widest text-cyan-300">
                      MY COMPETENCY PROFILE
                    </h2>
                    <div className="text-sm font-semibold text-white mt-0.5">
                      Deputy Director • Sampling Methodology
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white font-mono">68%</div>
                    <div className="text-[10px] text-slate-400">Overall Competency</div>
                  </div>
                </div>

                {/* 4 Competency Bars */}
                <div className="space-y-3 mb-6">
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-200">Statistical Methods</span>
                      <span className="font-mono text-emerald-400 font-bold">82%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#16845B] h-full rounded-full" style={{ width: '82%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-200">Python</span>
                      <span className="font-mono text-amber-400 font-bold">42%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#E8871A] h-full rounded-full" style={{ width: '42%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-200">Cybersecurity</span>
                      <span className="font-mono text-rose-400 font-bold">32%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-rose-500 h-full rounded-full" style={{ width: '32%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-200">Survey Design</span>
                      <span className="font-mono text-blue-400 font-bold">54%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#2563D9] h-full rounded-full" style={{ width: '54%' }} />
                    </div>
                  </div>
                </div>

                {/* Insight Card */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-[#102A43] to-[#14385E] border border-cyan-500/20">
                  <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold font-mono">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>3 Priority Gaps Identified</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    “Your personalized learning path is ready.”
                  </p>
                  <div className="mt-3">
                    <button
                      onClick={() => navigate('/demo')}
                      className="text-xs font-semibold text-white bg-[#2563D9] hover:bg-[#1D4ED8] px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <span>View Learning Path</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 02 — SOCIAL PROOF / TRUST
         ============================================================ */}
      <section
        id="ecosystem"
        className="py-14 bg-white border-b border-[#DCE3EA] text-center"
      >
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-[#52657A] mb-8">
            Built for India’s Government Learning Ecosystem
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            {/* 01 Competency Framework */}
            <div className="p-5 rounded-xl border border-[#DCE3EA] bg-[#F7F9FC] flex flex-col items-center justify-center">
              <Compass className="w-6 h-6 text-[#2563D9] mb-2" />
              <div className="font-bold text-sm text-[#102A43]">Competency Framework</div>
              <p className="text-xs text-[#52657A] mt-1">National Cadre Benchmark</p>
            </div>

            {/* 02 iGOT Karmayogi */}
            <div className="p-5 rounded-xl border border-[#DCE3EA] bg-[#F7F9FC] flex flex-col items-center justify-center">
              <BookOpen className="w-6 h-6 text-[#16845B] mb-2" />
              <div className="font-bold text-sm text-[#102A43]">iGOT Karmayogi</div>
              <p className="text-xs text-[#52657A] mt-1">Integrated Module Sync</p>
            </div>

            {/* 03 NSSTA */}
            <div className="p-5 rounded-xl border border-[#DCE3EA] bg-[#F7F9FC] flex flex-col items-center justify-center">
              <Building2 className="w-6 h-6 text-[#E8871A] mb-2" />
              <div className="font-bold text-sm text-[#102A43]">NSSTA Academy</div>
              <p className="text-xs text-[#52657A] mt-1">Specialized Methodologies</p>
            </div>

            {/* 04 AI-Powered Learning & Assessment */}
            <div className="p-5 rounded-xl border border-[#DCE3EA] bg-[#F7F9FC] flex flex-col items-center justify-center">
              <Brain className="w-6 h-6 text-[#2563D9] mb-2" />
              <div className="font-bold text-sm text-[#102A43]">AI Learning & Assessment</div>
              <p className="text-xs text-[#52657A] mt-1">Adaptive Skill Diagnostics</p>
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
            {/* Left side: Problem Description & 3 Areas */}
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs font-bold font-mono uppercase tracking-wider text-[#2563D9]">
                THE CHALLENGE
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#102A43] tracking-tight leading-tight">
                Access to Learning Is Not Enough.
              </h2>

              <p className="text-base sm:text-lg text-[#52657A] leading-relaxed">
                Knowing what to learn, why it matters, and whether it is actually improving your
                competencies can be difficult.
              </p>

              {/* 3 Problem Areas */}
              <div className="space-y-4 pt-4">
                <div className="p-5 rounded-xl bg-white border border-[#DCE3EA] shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 font-mono font-bold text-sm flex items-center justify-center flex-shrink-0">
                    01
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#102A43]">Unclear Skill Gaps</h3>
                    <p className="text-xs sm:text-sm text-[#52657A] mt-1">
                      Officials often complete standard trainings without clarity on which
                      specific competencies their role actually demands.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-white border border-[#DCE3EA] shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 font-mono font-bold text-sm flex items-center justify-center flex-shrink-0">
                    02
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#102A43]">One-Size-Fits-All Learning</h3>
                    <p className="text-xs sm:text-sm text-[#52657A] mt-1">
                      Different officials have vastly different backgrounds and career milestones;
                      generic course assignments waste critical time.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-white border border-[#DCE3EA] shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563D9] font-mono font-bold text-sm flex items-center justify-center flex-shrink-0">
                    03
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#102A43]">Limited Feedback</h3>
                    <p className="text-xs sm:text-sm text-[#52657A] mt-1">
                      A certificate of course completion does not measure demonstrated competency or
                      identify which operational concepts require reinforcement.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Visual showing the problem with floating questions */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#DCE3EA] shadow-lg">
                <img
                  src="/images/challenge_official_workspace.jpg"
                  alt="Government official contemplating learning pathways"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/85 via-[#102A43]/30 to-transparent" />

                {/* Floating Question Badges */}
                <div className="absolute top-6 right-6 max-w-xs bg-white/95 backdrop-blur-md p-3.5 rounded-xl shadow-lg border border-[#DCE3EA] text-xs font-semibold text-[#102A43] flex items-center gap-2.5 animate-fadeIn">
                  <span className="w-2 h-2 rounded-full bg-[#2563D9]" />
                  <span>“Which skill should I improve?”</span>
                </div>

                <div className="absolute top-24 left-6 max-w-xs bg-white/95 backdrop-blur-md p-3.5 rounded-xl shadow-lg border border-[#DCE3EA] text-xs font-semibold text-[#102A43] flex items-center gap-2.5 animate-fadeIn">
                  <span className="w-2 h-2 rounded-full bg-[#E8871A]" />
                  <span>“Which course is relevant to my role?”</span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 bg-[#102A43]/90 backdrop-blur-md p-4 rounded-xl border border-white/15 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-sm font-medium">“Am I actually improving?”</span>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-300">Competency Query</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 04 — SOLUTION (THE EKALAVYA APPROACH)
         ============================================================ */}
      <section className="py-20 lg:py-28 bg-white border-t border-b border-[#DCE3EA]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
            <div className="text-xs font-bold font-mono uppercase tracking-wider text-[#2563D9]">
              THE EKALAVYA APPROACH
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#102A43] tracking-tight">
              From Competency Gaps to Measurable Growth.
            </h2>
            <p className="text-base sm:text-lg text-[#52657A] leading-relaxed">
              Ekalavya brings competency intelligence, personalized learning, adaptive assessment
              and progress measurement into one continuous learning experience.
            </p>
          </div>

          {/* Central Product System Visualization */}
          <div className="bg-[#071931] text-white p-8 sm:p-12 rounded-2xl border border-white/15 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00B4D8]" />
                <span className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                  Continuous Competency Intelligence Pipeline
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">Real-time Telemetry</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 relative">
              {/* Step 1 */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors">
                <div className="text-xs font-mono font-bold text-cyan-300 mb-2">01</div>
                <div className="font-bold text-sm mb-1">ROLE</div>
                <p className="text-[11px] text-slate-400">Designation & Cadre Framework</p>
              </div>

              {/* Step 2 */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors">
                <div className="text-xs font-mono font-bold text-blue-300 mb-2">02</div>
                <div className="font-bold text-sm mb-1">PROFILE</div>
                <p className="text-[11px] text-slate-400">Baseline Competency Matrix</p>
              </div>

              {/* Step 3 */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors">
                <div className="text-xs font-mono font-bold text-amber-300 mb-2">03</div>
                <div className="font-bold text-sm mb-1">GAP ANALYSIS</div>
                <p className="text-[11px] text-slate-400">AI-Ranked Skill Deficits</p>
              </div>

              {/* Step 4 */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors">
                <div className="text-xs font-mono font-bold text-emerald-300 mb-2">04</div>
                <div className="font-bold text-sm mb-1">LEARNING</div>
                <p className="text-[11px] text-slate-400">Curated iGOT & NSSTA Modules</p>
              </div>

              {/* Step 5 */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors">
                <div className="text-xs font-mono font-bold text-purple-300 mb-2">05</div>
                <div className="font-bold text-sm mb-1">ASSESSMENT</div>
                <p className="text-[11px] text-slate-400">Live Adaptive Diagnostic</p>
              </div>

              {/* Step 6 */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors">
                <div className="text-xs font-mono font-bold text-emerald-400 mb-2">06</div>
                <div className="font-bold text-sm mb-1">GROWTH</div>
                <p className="text-[11px] text-slate-400">Demonstrated Score Mastery</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero guesswork • Every recommendation targets a validated deficit</span>
              </span>
              <button
                onClick={() => navigate('/demo')}
                className="text-cyan-300 hover:text-white font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <span>Experience Interactive Pipeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 05 — FEATURES (6 VARIED EDITORIAL LAYOUTS)
         ============================================================ */}
      <section id="for-officials" className="py-20 lg:py-28 bg-[#F7F9FC]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 space-y-16">
          <div className="max-w-2xl">
            <div className="text-xs font-bold font-mono uppercase tracking-wider text-[#2563D9] mb-2">
              CORE CAPABILITIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#102A43] tracking-tight">
              An Intelligent System Tailored to Public Service.
            </h2>
            <p className="text-base text-[#52657A] mt-2">
              Designed with precision to solve real workflow bottlenecks for officials and
              directorates.
            </p>
          </div>

          {/* Feature 01 & 02 Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Feature 01: PERSONALIZED COMPETENCY PROFILE */}
            <div className="lg:col-span-6 bg-white border border-[#DCE3EA] rounded-2xl p-8 shadow-xs flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold font-mono uppercase tracking-wider text-[#2563D9] mb-1">
                  FEATURE 01
                </div>
                <h3 className="text-2xl font-bold text-[#102A43] mb-2">
                  Personalized Competency Profile
                </h3>
                <p className="text-sm text-[#52657A] mb-6">
                  “See where your competencies stand.”
                </p>

                {/* Visual: Radar / Domain Matrix */}
                <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#DCE3EA] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#102A43]">Statistical & Sampling</span>
                    <span className="font-mono text-emerald-700 font-bold">82% • Advanced</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#16845B] h-full" style={{ width: '82%' }} />
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="font-semibold text-[#102A43]">Python & Automated ETL</span>
                    <span className="font-mono text-amber-700 font-bold">45% • Developing</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#E8871A] h-full" style={{ width: '45%' }} />
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="font-semibold text-[#102A43]">SDMX Metadata Standards</span>
                    <span className="font-mono text-blue-700 font-bold">50% • Intermediate</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#2563D9] h-full" style={{ width: '50%' }} />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-[#52657A]">
                <span>Evaluated across 4 institutional domains</span>
                <span className="font-semibold text-[#2563D9]">Live Profile Sync →</span>
              </div>
            </div>

            {/* Feature 02: AI SKILL-GAP ANALYSIS */}
            <div className="lg:col-span-6 bg-white border border-[#DCE3EA] rounded-2xl p-8 shadow-xs flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold font-mono uppercase tracking-wider text-[#E8871A] mb-1">
                  FEATURE 02
                </div>
                <h3 className="text-2xl font-bold text-[#102A43] mb-2">AI Skill-Gap Analysis</h3>
                <p className="text-sm text-[#52657A] mb-6">
                  Focus development where it matters most.
                </p>

                {/* Visual: Current vs Required Competency Bar */}
                <div className="p-5 rounded-xl bg-[#F7F9FC] border border-[#DCE3EA] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-base text-[#102A43]">Python</span>
                    <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700">
                      Gap: 38%
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-[#52657A]">Current: <strong className="text-[#102A43]">42%</strong></span>
                      <span className="text-[#52657A]">Target: <strong className="text-[#16845B]">80%</strong></span>
                    </div>

                    <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden relative">
                      {/* Current proficiency bar */}
                      <div className="bg-[#E8871A] h-full rounded-full transition-all duration-500" style={{ width: '42%' }} />
                      {/* Target threshold line */}
                      <div className="absolute top-0 bottom-0 left-[80%] w-1 bg-[#16845B] z-10" title="Target Benchmark (80%)" />
                    </div>
                  </div>

                  <p className="text-xs text-[#52657A] bg-white p-3 rounded-lg border border-[#DCE3EA]">
                    AI analysis flags Python data processing as a priority bottleneck for upcoming PLFS survey automated releases.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-[#52657A]">
                <span>Automated Gemini AI diagnosis</span>
                <span className="font-semibold text-[#E8871A]">Direct Learning Match →</span>
              </div>
            </div>
          </div>

          {/* Feature 03: RELEVANT LEARNING RECOMMENDATIONS */}
          <div className="bg-white border border-[#DCE3EA] rounded-2xl p-8 lg:p-10 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="text-xs font-bold font-mono uppercase tracking-wider text-[#16845B]">
                  FEATURE 03
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#102A43]">
                  Relevant Learning Recommendations
                </h3>
                <p className="text-sm text-[#52657A] leading-relaxed">
                  Spend less time searching and more time learning.
                </p>
                <p className="text-xs text-[#52657A] leading-relaxed">
                  Instead of scrolling through thousands of unrelated courses, Ekalavya extracts
                  the specific curricula on iGOT Karmayogi and NSSTA that bridge your evaluated
                  deficits.
                </p>
              </div>

              <div className="lg:col-span-7">
                {/* Course Recommendation Card matching prompt specs */}
                <div className="p-6 rounded-2xl border border-[#DCE3EA] bg-[#F7F9FC] shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 font-mono font-bold text-xs flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>94% Competency Match</span>
                    </span>
                    <span className="text-xs font-mono font-semibold text-[#52657A]">iGOT Karmayogi</span>
                  </div>

                  <h4 className="text-lg font-bold text-[#102A43]">
                    Python for Government Data Analysis
                  </h4>

                  <div className="flex flex-wrap gap-2 text-xs font-medium text-[#16845B]">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200">
                      ✓ Python
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200">
                      ✓ Data Processing
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200">
                      ✓ Statistical Analysis
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 04: ADAPTIVE ASSESSMENTS (STRONGEST VISUAL TREATMENT) */}
          <div className="bg-[#071931] text-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-white/15 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono font-bold mb-4">
                <Zap className="w-3.5 h-3.5" />
                <span>FEATURE 04 • SIGNATURE CAPABILITY</span>
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                Adaptive Assessments
              </h3>
              <p className="text-base sm:text-lg text-slate-300 mt-3 font-normal">
                “Assessments respond to what you know.”
              </p>
            </div>

            {/* Interactive Loop Visual Demonstration */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Flow Explanation Steps */}
              <div className="lg:col-span-5 space-y-4">
                <div
                  onClick={() => setAdaptiveStep(0)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    adaptiveStep === 0
                      ? 'bg-white/15 border-cyan-400 text-white shadow-md'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <div className="text-xs font-mono font-bold text-cyan-300">STEP 1</div>
                  <div className="font-bold text-sm text-white">Diagnostic Question Served</div>
                  <p className="text-xs mt-1 text-slate-300">
                    Question pitched at evaluated baseline difficulty (Intermediate).
                  </p>
                </div>

                <div
                  onClick={() => setAdaptiveStep(1)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    adaptiveStep === 1
                      ? 'bg-white/15 border-rose-400 text-white shadow-md'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <div className="text-xs font-mono font-bold text-rose-300">STEP 2</div>
                  <div className="font-bold text-sm text-white">Concept Error Detected</div>
                  <p className="text-xs mt-1 text-slate-300">
                    Engine detects gap in Finite Population Correction (FPC) sampling factor.
                  </p>
                </div>

                <div
                  onClick={() => setAdaptiveStep(2)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    adaptiveStep === 2
                      ? 'bg-white/15 border-amber-400 text-white shadow-md'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <div className="text-xs font-mono font-bold text-amber-300">STEP 3</div>
                  <div className="font-bold text-sm text-white">Remedial Concept Reinforcement</div>
                  <p className="text-xs mt-1 text-slate-300">
                    Engine lowers complexity and serves clarifying question on identical concept.
                  </p>
                </div>

                <div
                  onClick={() => setAdaptiveStep(3)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    adaptiveStep === 3
                      ? 'bg-white/15 border-emerald-400 text-white shadow-md'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <div className="text-xs font-mono font-bold text-emerald-300">STEP 4</div>
                  <div className="font-bold text-sm text-white">Mastery & Score Update</div>
                  <p className="text-xs mt-1 text-slate-300">
                    Concept resolved; +10 points added to official competency record.
                  </p>
                </div>
              </div>

              {/* Right Column: Simulated Live Quiz UI */}
              <div className="lg:col-span-7 bg-[#0F2238] border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-xs font-mono">
                  <span className="text-slate-400">SESSION: DIA-9021</span>
                  <span className="text-cyan-300">QUESTION 2 OF 4</span>
                </div>

                <h4 className="text-base font-semibold text-white mb-4 leading-snug">
                  In stratified multistage sampling for the Periodic Labour Force Survey (PLFS), why
                  are weights calibrated against Census projections?
                </h4>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-200 flex items-center justify-between">
                    <span>
                      A) To correct frame under-coverage and ensure demographic consistency
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 ml-2" />
                  </div>
                  <div className="p-3 rounded-lg border border-white/10 bg-white/5 text-slate-400 flex items-center justify-between">
                    <span>B) To artificially deflate variance estimates</span>
                    <span className="text-slate-600 font-mono">Option B</span>
                  </div>
                </div>

                {/* Adaptive Feedback Callout */}
                <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-blue-900/60 to-cyan-900/40 border border-cyan-500/30 text-xs">
                  <div className="font-bold text-cyan-300 flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Engine Action: Concept Mastered (+10 pts)</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Accurate calibration rationale verified. Difficulty escalating to Small Area
                    Empirical Bayes Estimators.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 05 & 06 Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Feature 05: MEASURE YOUR PROGRESS */}
            <div className="lg:col-span-6 bg-white border border-[#DCE3EA] rounded-2xl p-8 shadow-xs flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold font-mono uppercase tracking-wider text-[#16845B] mb-1">
                  FEATURE 05
                </div>
                <h3 className="text-2xl font-bold text-[#102A43] mb-2">Measure Your Progress</h3>
                <p className="text-sm text-[#52657A] mb-6">
                  See demonstrated learning reflected in your competency profile.
                </p>

                {/* Visual: Before / After progression matching prompt spec */}
                <div className="p-5 rounded-xl bg-[#F7F9FC] border border-[#DCE3EA] space-y-4">
                  <div className="flex items-center justify-between font-bold text-base text-[#102A43]">
                    <span>Cybersecurity</span>
                    <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-full">
                      +16 points
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                      <div className="text-xs text-[#52657A] font-mono font-semibold">BEFORE</div>
                      <div className="text-3xl font-bold text-[#102A43] font-mono mt-1">32%</div>
                      <span className="text-[11px] text-slate-500">Initial Diagnostic</span>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-emerald-300 bg-emerald-50/50">
                      <div className="text-xs text-emerald-700 font-mono font-bold">AFTER</div>
                      <div className="text-3xl font-bold text-emerald-700 font-mono mt-1">48%</div>
                      <span className="text-[11px] text-emerald-800 font-semibold">
                        Post-Assessment
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-[#52657A]">
                Verifiable trajectory backed by adaptive test records
              </div>
            </div>

            {/* Feature 06: WORKFORCE INTELLIGENCE */}
            <div
              id="for-organizations"
              className="lg:col-span-6 bg-white border border-[#DCE3EA] rounded-2xl p-8 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-bold font-mono uppercase tracking-wider text-[#2563D9] mb-1">
                  FEATURE 06
                </div>
                <h3 className="text-2xl font-bold text-[#102A43] mb-2">Workforce Intelligence</h3>
                <p className="text-sm text-[#52657A] mb-6">
                  “Help organizations see capability gaps at scale.”
                </p>

                {/* Visual: Heatmap */}
                <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#DCE3EA] space-y-2.5 text-xs">
                  <div className="flex items-center justify-between font-semibold text-[#102A43]">
                    <span>Survey Design & Research (SDRD)</span>
                    <span className="text-emerald-700 font-mono font-bold">84% Ready</span>
                  </div>
                  <div className="flex items-center justify-between font-semibold text-[#102A43] pt-1">
                    <span>National Accounts Division (NAD)</span>
                    <span className="text-blue-700 font-mono font-bold">78% Ready</span>
                  </div>
                  <div className="flex items-center justify-between font-semibold text-[#102A43] pt-1">
                    <span>Field Operations Division (FOD)</span>
                    <span className="text-amber-700 font-mono font-bold">62% Ready</span>
                  </div>
                  <div className="flex items-center justify-between font-semibold text-[#102A43] pt-1">
                    <span>Data Informatics & Innovation (DIID)</span>
                    <span className="text-rose-600 font-mono font-bold">54% Ready</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-[#52657A]">
                <span>Cadre-wide deficit visibility</span>
                <span className="font-semibold text-[#2563D9]">Admin Analytics Console →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 06 — HOW IT WORKS
         ============================================================ */}
      <section id="how-it-works" className="py-20 lg:py-28 bg-white border-t border-b border-[#DCE3EA]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
            <div className="text-xs font-bold font-mono uppercase tracking-wider text-[#2563D9]">
              HOW IT WORKS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#102A43] tracking-tight">
              Four Steps. One Clear Learning Journey.
            </h2>
            <p className="text-base text-[#52657A]">
              A structured roadmap built so every officer can take control of their competency
              growth.
            </p>
          </div>

          {/* 4 Steps Journey */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-[#F7F9FC] border border-[#DCE3EA] rounded-2xl p-6 relative">
              <div className="w-10 h-10 rounded-full bg-[#102A43] text-white font-mono font-bold text-sm flex items-center justify-center mb-4">
                01
              </div>
              <h3 className="font-bold text-base text-[#102A43] mb-1">CREATE YOUR PROFILE</h3>
              <p className="text-xs text-[#52657A] leading-relaxed">
                Enter your designation, division, and past statistical or administrative service
                records.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#F7F9FC] border border-[#DCE3EA] rounded-2xl p-6 relative">
              <div className="w-10 h-10 rounded-full bg-[#2563D9] text-white font-mono font-bold text-sm flex items-center justify-center mb-4">
                02
              </div>
              <h3 className="font-bold text-base text-[#102A43] mb-1">IDENTIFY YOUR GAPS</h3>
              <p className="text-xs text-[#52657A] leading-relaxed">
                AI evaluates your current skills against target benchmarks and reveals prioritized
                deficits.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#F7F9FC] border border-[#DCE3EA] rounded-2xl p-6 relative">
              <div className="w-10 h-10 rounded-full bg-[#16845B] text-white font-mono font-bold text-sm flex items-center justify-center mb-4">
                03
              </div>
              <h3 className="font-bold text-base text-[#102A43] mb-1">LEARN & ASSESS</h3>
              <p className="text-xs text-[#52657A] leading-relaxed">
                Engage directly in curated iGOT/NSSTA courses and take real-time adaptive quiz
                diagnostics.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#F7F9FC] border border-[#DCE3EA] rounded-2xl p-6 relative">
              <div className="w-10 h-10 rounded-full bg-[#E8871A] text-white font-mono font-bold text-sm flex items-center justify-center mb-4">
                04
              </div>
              <h3 className="font-bold text-base text-[#102A43] mb-1">TRACK YOUR GROWTH</h3>
              <p className="text-xs text-[#52657A] leading-relaxed">
                Watch verified milestones reflect automatically on your official competency record.
              </p>
            </div>
          </div>

          {/* Reassurance text */}
          <div className="mt-12 text-center text-xs font-semibold text-[#52657A]">
            No complicated setup. No course hunting. No one-size-fits-all assessment.
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 07 — OUTCOMES (DESIGNED AROUND WORKFORCE NEEDS)
         ============================================================ */}
      <section className="py-20 lg:py-28 bg-[#F7F9FC]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#102A43] tracking-tight">
              Designed Around Real Workforce Needs.
            </h2>
            <p className="text-base text-[#52657A]">
              Tailored value architectures for individual officers, cadre leadership, and training
              academies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: Government Officials */}
            <div className="bg-white border border-[#DCE3EA] rounded-2xl p-8 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563D9] flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2563D9] mb-1">
                GOVERNMENT OFFICIALS
              </h3>
              <h4 className="text-xl font-bold text-[#102A43] mb-3">
                “Know what to learn next.”
              </h4>
              <ul className="space-y-2.5 text-xs text-[#52657A] leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Eliminates ambiguity on role competency requirements.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Direct links to official iGOT and NSSTA training modules.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Constructive, non-punitive adaptive diagnostic tests.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Organizations */}
            <div className="bg-white border border-[#DCE3EA] rounded-2xl p-8 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#16845B] flex items-center justify-center mb-6">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#16845B] mb-1">
                ORGANIZATIONS
              </h3>
              <h4 className="text-xl font-bold text-[#102A43] mb-3">
                “Understand where capability gaps exist.”
              </h4>
              <ul className="space-y-2.5 text-xs text-[#52657A] leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Division-level competency heatmaps and deficits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Data-driven workforce succession and capacity planning.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Evidence-based budget and training resource allocations.</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Training Teams */}
            <div className="bg-white border border-[#DCE3EA] rounded-2xl p-8 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#E8871A] flex items-center justify-center mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#E8871A] mb-1">
                TRAINING TEAMS
              </h3>
              <h4 className="text-xl font-bold text-[#102A43] mb-3">
                “Build more targeted learning experiences.”
              </h4>
              <ul className="space-y-2.5 text-xs text-[#52657A] leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Identifies exact topics where cadres struggle during diagnostics.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Pre/post score delta telemetry validates course impact.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Instant document-to-quiz generation from official PDF manuals.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 08 — FAQ (ACCESSIBLE ACCORDION)
         ============================================================ */}
      <section id="faq" className="py-20 lg:py-28 bg-white border-t border-b border-[#DCE3EA]">
        <div className="max-w-[960px] mx-auto px-6 sm:px-10">
          <div className="text-center space-y-3 mb-12">
            <div className="text-xs font-bold font-mono uppercase tracking-wider text-[#2563D9]">
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#102A43] tracking-tight">
              Answers to Common Questions.
            </h2>
            <p className="text-sm text-[#52657A]">
              Everything you need to know about the Ekalavya platform and mission.
            </p>
          </div>

          <div className="divide-y divide-[#DCE3EA] border-t border-b border-[#DCE3EA]">
            {faqItems.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between text-left py-2 font-semibold text-base text-[#102A43] hover:text-[#2563D9] transition-colors cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <span className="ml-4 flex-shrink-0 text-[#52657A]">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="pt-2 pb-3 text-sm text-[#52657A] leading-relaxed animate-fadeIn">
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
          SECTION 09 — FINAL CTA (SOOTHING MOUNTAIN LANDSCAPE)
         ============================================================ */}
      <section
        className="relative py-24 lg:py-32 bg-[#071931] text-white overflow-hidden text-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(7, 25, 49, 0.92) 0%, rgba(16, 42, 67, 0.88) 100%), url('/images/cta_mountain_landscape.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-[800px] mx-auto px-6 sm:px-10 space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-['Noto_Sans',sans-serif] leading-tight">
            Ready to Build Your Skills for a Greater Tomorrow?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto font-normal">
            Start your learning journey with Ekalavya today.
          </p>

          <div className="pt-4 space-y-3">
            <div>
              <button
                onClick={() => navigate('/login')}
                className="inline-flex items-center gap-3 bg-[#2563D9] hover:bg-[#1D4ED8] text-white font-semibold text-base px-9 py-4 rounded-full transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400 font-medium">
              Free to use <span className="mx-2">•</span> No complicated setup
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 10 — FOOTER (DEEP NAVY)
         ============================================================ */}
      <footer className="bg-[#071931] text-slate-400 text-xs border-t border-white/10 pt-16 pb-12">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
            {/* Left Brand info */}
            <div className="md:col-span-4 space-y-4">
              <EkalavyaLogo variant="dark" size="md" />
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm mt-3">
                An AI-powered competency intelligence and personalized learning platform designed to
                empower India’s public service cadre with measurable, continuous skill growth.
              </p>
            </div>

            {/* Platform Links */}
            <div className="md:col-span-3 space-y-3">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200">
                PLATFORM
              </div>
              <ul className="space-y-2">
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

            {/* Support Links */}
            <div className="md:col-span-3 space-y-3">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200">
                SUPPORT
              </div>
              <ul className="space-y-2">
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

            {/* Legal Links */}
            <div className="md:col-span-2 space-y-3">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200">
                LEGAL
              </div>
              <ul className="space-y-2">
                <li>
                  <span className="hover:text-white cursor-pointer">Privacy Policy</span>
                </li>
                <li>
                  <span className="hover:text-white cursor-pointer">Terms of Service</span>
                </li>
                <li>
                  <span className="hover:text-white cursor-pointer">Sitemap</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-4">
            <div>© Ekalavya. All rights reserved.</div>
            <div>Ministry of Statistics and Programme Implementation (MoSPI)</div>
          </div>
        </div>
      </footer>
    </div>
  );
};
