import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { EkalavyaLogo } from '../../components/EkalavyaLogo';
import TiltedCard from '../../components/TiltedCard';
import { PipelineReactFlow } from '../../components/PipelineReactFlow';

import {
  ArrowRight,
  CaretDown,
  CaretUp,
  Buildings,
  Users,
  CheckCircle,
  Briefcase,
  UserCheck,
  Target,
  BookOpen,
  ClipboardText,
  TrendUp,
  Bank,
  ShieldCheck,
  List,
  X
} from '@phosphor-icons/react';

const heroAnimStyles = `
  @keyframes ekFadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ekFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @media (prefers-reduced-motion: reduce) {
    .ek-fade-up,.ek-fade-up-2,.ek-fade-up-3,.ek-fade-in { animation: none !important; opacity: 1 !important; }
  }
  .ek-fade-up   { animation: ekFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.10s both; }
  .ek-fade-up-2 { animation: ekFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.22s both; }
  .ek-fade-up-3 { animation: ekFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.34s both; }
  .ek-fade-in   { animation: ekFadeIn 0.6s ease 0.55s both; }
  .ek-nav-btn { background:transparent; border:0; padding:0; cursor:pointer; font-family:inherit; }
  .ek-nav-btn:hover { color:#fff !important; }
  .ek-cta-nav:hover  { background:#f1f5f9 !important; }
  .ek-cta-main:hover { background:#f1f5f9 !important; transform:translateY(-1px); box-shadow:0 20px 48px rgba(0,0,0,0.5) !important; }
  .ek-scroll-btn:hover .ek-scroll-circle { border-color:rgba(255,255,255,0.6) !important; }
  .ek-hero-header-inner { padding:22px 92px !important; }
  .ek-feature-wrap { position:absolute; left:94px; width:min(1266px,calc(100% - 188px)); bottom:30px; z-index:20; }
  .ek-feature-panel { background:rgba(24,29,42,.78); border:1px solid rgba(255,255,255,.12); border-radius:18px; backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); box-shadow:0 12px 38px rgba(0,0,0,.25); overflow:hidden; }
  .ek-feature-grid { display:grid; grid-template-columns:repeat(4,1fr); height:127px; }
  .ek-feature-item { display:flex; align-items:center; gap:16px; padding:0 28px; }
  .ek-feature-item + .ek-feature-item { border-left:1px solid rgba(255,255,255,.12); }
  .ek-feature-tagline { padding-top:36px; text-align:center; font-size:11px; font-weight:600; letter-spacing:.20em; text-transform:uppercase; color:#5EAFFF; }
  .ek-gov-mark { position:absolute; right:68px; bottom:17px; z-index:5; display:flex; align-items:flex-end; gap:13px; opacity:.31; pointer-events:none; }
  .ek-loading-screen { position:fixed; inset:0; z-index:9999; display:grid; place-items:center; background:#070b12; transition:opacity .45s ease; }
  .ek-loading-screen video { width:100%; height:100%; object-fit:cover; }
  .ek-hero-logo { transform:scale(1.18); transform-origin:left center; }
  @keyframes ekButtonSpin { to { transform:rotate(1turn); } }
  @keyframes ekCardReveal { from { opacity:.45; transform:translateY(56px) scale(.985); } to { opacity:1; transform:translateY(0) scale(1); } }
  .ek-shimmer-button { position:relative; display:inline-flex; overflow:hidden; align-items:center; justify-content:center; padding:1px; border:0; border-radius:999px; cursor:pointer; background:transparent; transition:transform .3s ease, box-shadow .3s ease; font-family:inherit; }
  .ek-shimmer-button:hover { transform:translateY(-2px); box-shadow:0 0 25px rgba(255,255,255,.1); }
  .ek-shimmer-button::before { content:''; position:absolute; inset:-100%; background:conic-gradient(from 90deg at 50% 50%, transparent 0%, transparent 75%, #fff 100%); opacity:0; transition:opacity .3s ease; animation:ekButtonSpin 3s linear infinite; }
  .ek-shimmer-button:hover::before { opacity:1; }
  .ek-shimmer-button::after { content:''; position:absolute; inset:0; border-radius:999px; background:#18181b; transition:opacity .3s ease; }
  .ek-shimmer-button:hover::after { opacity:0; }
  .ek-shimmer-button__content { position:relative; z-index:1; display:flex; align-items:center; justify-content:center; gap:10px; width:100%; height:100%; border-radius:999px; padding:14px 25px; background:#18181b; color:#a1a1aa; box-shadow:inset 0 1px 0 rgba(255,255,255,.1); transition:color .3s ease, background .3s ease; font-size:16px; font-weight:600; line-height:24px; }
  .ek-shimmer-button:hover .ek-shimmer-button__content { color:#fff; background:#18181b; }
  .ek-shimmer-button--compact .ek-shimmer-button__content { min-width:155px; padding:12px 23px; font-size:15px; }
  .ek-shimmer-button svg { transition:transform .3s ease; }
  .ek-shimmer-button:hover svg { transform:translateX(2px); }
  @media (min-width: 1024px) {
    .ek-story-card { position:sticky; top:96px; box-shadow:0 22px 55px rgba(15,42,67,.11); }
  }
  @supports (animation-timeline: view()) {
    .ek-story-card { animation:ekCardReveal linear both; animation-timeline:view(); animation-range:entry 8% cover 38%; }
  }
  @media (max-width: 767px) {
    .ek-hero-header-inner { padding:20px 28px !important; }
    .ek-feature-wrap { position:relative; left:auto; width:auto; bottom:auto; margin:24px 24px 0; }
    .ek-feature-grid { grid-template-columns:repeat(2,1fr); height:auto; }
    .ek-feature-item { min-height:92px; padding:14px; gap:10px; }
    .ek-feature-item:nth-child(3) { border-left:0; border-top:1px solid rgba(255,255,255,.12); }
    .ek-feature-item:nth-child(4) { border-top:1px solid rgba(255,255,255,.12); }
    .ek-feature-item > div:last-child > div:first-child { font-size:12px !important; }
    .ek-feature-item > div:last-child > div:last-child { font-size:11px !important; }
    .ek-feature-tagline { padding:15px 8px 0; font-size:9px; line-height:1.5; }
    .ek-gov-mark { display:none; }
    .ek-shimmer-button { width:100%; }
  }
`;

const ShimmerButton: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel?: string;
  compact?: boolean;
}> = ({ children, onClick, ariaLabel, compact = false }) => (
  <button type="button" onClick={onClick} aria-label={ariaLabel} className={`ek-shimmer-button${compact ? ' ek-shimmer-button--compact' : ''}`}>
    <span className="ek-shimmer-button__content">{children}</span>
  </button>
);

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading]           = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adaptiveStep, setAdaptiveStep]     = useState<number>(0);
  const [openFaqIndex, setOpenFaqIndex]     = useState<number|null>(0);

  const toggleFaq = (i: number) => setOpenFaqIndex(openFaqIndex === i ? null : i);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const faqItems = [
    { q: 'What is Ekalavya?', a: 'Ekalavya is an AI-powered competency intelligence and personalized learning platform engineered for government officials. It benchmarks individual capabilities against institutional role requirements, discovers targeted learning modules from iGOT Karmayogi & NSSTA, and administers adaptive diagnostics to measure real skill growth.' },
    { q: 'How does Ekalavya identify competency gaps?', a: 'Ekalavya compares an official\u2019s evaluated proficiency across statistical, technical, digital governance, and behavioural domains against target proficiency benchmarks mandated for their designation in the National Competency Framework.' },
    { q: 'Is Ekalavya free to use?', a: 'Yes. Ekalavya is a public-service capacity intelligence initiative designed for all central, state, and departmental statistical and administrative officials with zero licensing fees or subscription barriers.' },
    { q: 'How are learning recommendations generated?', a: 'Our semantic AI matching engine scans official curricula catalogues across iGOT Karmayogi and NSSTA to map verified modules directly to specific competency deficits.' },
    { q: 'Are the assessments adaptive?', a: 'Yes. Unlike static multiple-choice tests, questions dynamically respond to your answers. Correct answers elevate difficulty while incorrect answers pause escalation to provide remedial concept reinforcement.' },
    { q: 'What happens when I answer incorrectly?', a: 'The engine pauses difficulty escalation, highlights the exact conceptual principle that was misunderstood, and serves a targeted remedial question on that concept to build foundational confidence.' },
    { q: 'Is Ekalavya a replacement for iGOT?', a: 'No. Ekalavya works synergistically with iGOT Karmayogi and NSSTA. Ekalavya serves as the intelligent diagnostic layer, guiding officials directly to the precise modules on iGOT that solve their unique skill gaps.' },
    { q: 'Can organizations use Ekalavya?', a: 'Yes. Cadre administrators, division heads, and training directors receive anonymized workforce intelligence heatmaps, aggregate competency deficit alerts, and curriculum effectiveness analytics across entire directorates.' },
    { q: 'How is my competency profile updated?', a: 'Competency profile scores update automatically when an official completes verified adaptive assessments or course milestone diagnostics. The AI engine recalculates proficiency delta and updates the official record.' },
    { q: 'Is Ekalavya connected to live government systems?', a: 'Ekalavya operates in sandbox compatibility with Mission Karmayogi and MoSPI cadre frameworks. The demo mode allows instant exploration without requiring confidential production credentials.' },
  ];

  return (
    <div id="main-content" className="min-h-screen bg-[#F7F9FC] text-[#102A43]" style={{ fontFamily: "'Inter','Noto Sans',sans-serif" }}>
      <style>{heroAnimStyles}</style>
      {isLoading && (
        <div className="ek-loading-screen" aria-label="Loading Ekalavya">
          <video src="/sih-loading.mp4" autoPlay muted playsInline preload="auto" onEnded={() => setIsLoading(false)} onError={() => setIsLoading(false)} />
        </div>
      )}
      <a href="#hero-content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 z-[100] bg-[#102A43] text-white px-4 py-2 rounded-md shadow-lg text-sm font-semibold">Skip to main content</a>

      {/* ═══════════════════════════════════════════════════════
          HERO — 100vh, cinematic photo, left text content
         ═══════════════════════════════════════════════════════ */}
      <section id="hero-section" className="relative overflow-hidden text-white" style={{ minHeight: '100vh', background: '#080B12' }}>

        {/* BG photo */}
        <div aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:0, backgroundImage:"url('/images/hero_official_desk.jpg')", backgroundSize:'cover', backgroundPosition:'center center', backgroundRepeat:'no-repeat' }} />
        {/* Layer 1 — overall dark */}
        <div aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:1, background:'rgba(6,9,18,0.42)' }} />
        {/* Layer 2 — left-to-right gradient */}
        <div aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:2, background:'linear-gradient(to right,rgba(8,11,18,0.97) 0%,rgba(8,11,18,0.93) 26%,rgba(8,11,18,0.76) 42%,rgba(8,11,18,0.36) 60%,rgba(8,11,18,0.06) 80%,rgba(8,11,18,0.00) 100%)' }} />
        {/* Layer 3 — top vignette */}
        <div aria-hidden="true" style={{ position:'absolute', top:0, left:0, right:0, height:'130px', zIndex:3, background:'linear-gradient(to bottom,rgba(8,11,18,0.68) 0%,transparent 100%)' }} />
        {/* Layer 4 — bottom vignette */}
        <div aria-hidden="true" style={{ position:'absolute', bottom:0, left:0, right:0, height:'270px', zIndex:3, background:'linear-gradient(to top,rgba(8,11,18,0.97) 0%,rgba(8,11,18,0.75) 38%,transparent 100%)' }} />
        {/* Layer 5 — warm center glow */}
        <div aria-hidden="true" style={{ position:'absolute', zIndex:2, top:'25%', left:'32%', width:'42%', height:'55%', background:'radial-gradient(ellipse,rgba(175,95,25,0.07) 0%,transparent 70%)' }} />
        {/* Layer 6 — right blue tint */}
        <div aria-hidden="true" style={{ position:'absolute', zIndex:2, top:0, right:0, bottom:0, width:'48%', background:'linear-gradient(to left,rgba(12,36,86,0.20) 0%,transparent 100%)' }} />


        {/* ── NAVBAR ─────────────────────────────────────────────────── */}
        <header style={{ position:'relative', zIndex:30, width:'100%' }}>
          <div className="ek-hero-header-inner" style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between' }}>

            <Link to="/" aria-label="Ekalavya Home" style={{ textDecoration:'none', flexShrink:0 }}>
              <EkalavyaLogo variant="dark" size="lg" className="ek-hero-logo" />
            </Link>

            <nav className="hidden md:flex items-center" style={{ gap:'42px' }} aria-label="Main navigation">
              {[
                { label:'How it works',      id:'how-it-works' },
                { label:'FAQ',               id:'faq' },
                { label:'For Officials',     id:'for-officials' },
                { label:'For Organizations', id:'for-organizations' },
              ].map(link => (
                <button key={link.id} onClick={() => scrollToSection(link.id)}
                  className="ek-nav-btn whitespace-nowrap transition-colors duration-150"
                  style={{ fontSize:'15.5px', fontWeight:500, color:'rgba(255,255,255,0.88)', letterSpacing:'0.005em' }}>
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="hidden md:flex items-center" style={{ gap:'18px' }}>
              <button className="ek-nav-btn flex items-center gap-1.5 transition-colors duration-150"
                style={{ fontSize:'15px', fontWeight:500, color:'rgba(255,255,255,0.88)' }} aria-label="Select language">
                EN <CaretDown style={{ width:'14px', height:'14px', color:'rgba(255,255,255,0.55)' }} />
              </button>
              <ShimmerButton onClick={() => navigate('/login')} compact>Get Started</ShimmerButton>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2 rounded-lg"
              style={{ background:'transparent', border:'none', cursor:'pointer' }} aria-label="Toggle Navigation">
              {mobileMenuOpen ? <X style={{ width:24, height:24 }} /> : <List style={{ width:24, height:24 }} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div style={{ background:'rgba(8,11,18,0.97)', backdropFilter:'blur(16px)', borderBottom:'1px solid rgba(255,255,255,0.1)', padding:'16px 32px 24px' }}>
              {[{label:'How it works',id:'how-it-works'},{label:'FAQ',id:'faq'},{label:'For Officials',id:'for-officials'},{label:'For Organizations',id:'for-organizations'}].map(link => (
                <button key={link.id} onClick={() => scrollToSection(link.id)} style={{ display:'block', width:'100%', textAlign:'left', padding:'12px 0', color:'#fff', fontSize:'16px', fontWeight:500, background:'transparent', border:'none', cursor:'pointer', fontFamily:'inherit' }}>{link.label}</button>
              ))}
              <div style={{ marginTop:'12px', width:'100%' }}><ShimmerButton onClick={() => navigate('/login')}>Get Started</ShimmerButton></div>
            </div>
          )}
        </header>

        {/* ── HERO CONTENT ───────────────────────────────────────────── */}
        <div id="hero-content" style={{ position:'relative', zIndex:10, padding:'0 106px' }}>
          <div style={{ maxWidth:'700px', paddingTop:'66px', paddingBottom:'210px' }}>

            

            {/* Headline */}
            <h1 className="ek-fade-up-2" style={{ fontSize:'clamp(52px,5.5vw,72px)', fontWeight:800, lineHeight:1.01, letterSpacing:'-0.03em', color:'#FFFFFF', marginBottom:'24px', maxWidth:'680px' }}>
              Turn Your Potential<br />
              Into{' '}
              <span style={{ background:'linear-gradient(90deg,#8ACBFF 0%,#5EAFFF 45%,#3187F7 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                Greater Impact.
              </span>
            </h1>

            {/* Description */}
            <p className="ek-fade-up-3" style={{ fontSize:'19px', fontWeight:400, lineHeight:1.56, color:'rgba(255,255,255,0.78)', maxWidth:'590px', marginBottom:'36px', letterSpacing:'-0.005em' }}>
              Understand your competencies, identify skill gaps,<br />
              get personalized learning, and measure real progress —<br />
              all in one place.
            </p>

            {/* CTA row */}
            <div className="ek-fade-in" style={{ display:'flex', alignItems:'center', gap:'28px', marginBottom:'40px' }}>
              <ShimmerButton onClick={() => navigate('/login')} ariaLabel="Get Started with Ekalavya">
                Get Started
                <ArrowRight style={{ width:'20px', height:'20px' }} />
              </ShimmerButton>
              <span style={{ fontSize:'14px', fontWeight:500, color:'rgba(255,255,255,0.56)', whiteSpace:'nowrap' }}>
                Free to use &nbsp;•&nbsp; No complicated setup
              </span>
            </div>

            {/* Scroll indicator */}
            <button onClick={() => scrollToSection('problem-section')}
              className="ek-scroll-btn"
              style={{ background:'transparent', border:'none', padding:0, cursor:'pointer', display:'flex', alignItems:'center', gap:'12px', fontFamily:'inherit', transition:'all 0.2s' }}
              aria-label="Scroll to explore">
              <span className="ek-scroll-circle" style={{ width:'40px', height:'40px', borderRadius:'50%', border:'1px solid rgba(255,255,255,0.30)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'border-color 0.2s' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2v10M3 8l4 4 4-4" stroke="rgba(255,255,255,0.68)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ fontSize:'14px', fontWeight:500, color:'rgba(255,255,255,0.52)', letterSpacing:'0.01em' }}>Scroll to explore</span>
            </button>

          </div>
        </div>


        {/* ── FEATURE PANEL ──────────────────────────────────────────── */}
        <div className="ek-feature-wrap">
          <div className="ek-feature-panel">
            <div className="ek-feature-grid">
              {[
                { title:'Competency Framework', sub:'Role-based skill intelligence',
                  icon: <Briefcase className="w-5 h-5 text-[#5EAFFF]" /> },
                { title:'iGOT Karmayogi', sub:'Curated learning ecosystem',
                  icon: <BookOpen className="w-5 h-5 text-[#20C98A]" /> },
                { title:'NSSTA', sub:'Domain-relevant resources',
                  icon: <Bank className="w-5 h-5 text-[#5EAFFF]" /> },
                { title:'AI-Powered Assessments', sub:'Adaptive & personalized',
                  icon: <ClipboardText className="w-5 h-5 text-[#20C98A]" /> },
              ].map(col => (
                <div key={col.title} className="ek-feature-item">
                  <div style={{ flexShrink:0 }}>{col.icon}</div>
                  <div>
                    <div style={{ fontSize:'15px', fontWeight:700, color:'#FFFFFF', letterSpacing:'-0.015em', marginBottom:'4px' }}>{col.title}</div>
                    <div style={{ fontSize:'13px', fontWeight:400, color:'#9AA3B2', lineHeight:1.35 }}>{col.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="ek-feature-tagline">
            Empowering a more skilled, capable and future-ready government workforce.
          </div>
        </div>

      </section>

      {/* ============================================================
          SECTION 02 — PROBLEM (Clear Editorial Statements)
         ============================================================ */}
      <section id="problem-section" className="py-14 lg:py-20 bg-[#F7F9FC]">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
            {/* Left side: Problem Description & 3 Clear Editorial Statements */}
            <motion.div
              className="lg:col-span-6 space-y-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
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

              {/* 3 Clear Editorial Statements with Motion hover & entrance */}
              <div className="space-y-5 pt-2">
                {[
                  {
                    num: '01',
                    numBg: 'bg-rose-50 text-rose-600',
                    title: 'Unclear Skill Gaps',
                    desc: 'Officials often complete standard trainings without clarity on which specific competencies their role actually demands.'
                  },
                  {
                    num: '02',
                    numBg: 'bg-amber-50 text-amber-600',
                    title: 'One-Size-Fits-All Learning',
                    desc: 'Different officials can require different learning paths. Generic course assignments waste critical time.'
                  },
                  {
                    num: '03',
                    numBg: 'bg-blue-50 text-[#2563D9]',
                    title: 'Limited Feedback',
                    desc: 'Learning completion does not always demonstrate competency or measure real operational mastery.'
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={item.num}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    whileHover={{ y: -3, borderColor: '#B0C4DE' }}
                    className="p-6 rounded-2xl bg-white border border-[#DCE3EA] shadow-xs flex items-start gap-5 cursor-pointer transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-xl ${item.numBg} font-mono font-bold text-sm flex items-center justify-center flex-shrink-0`}>
                      {item.num}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#102A43]">{item.title}</h3>
                      <p className="text-sm text-[#52657A] mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right side: TiltedCard Component from React Bits with sleek clean overlay */}
            <motion.div
              className="lg:col-span-6 relative flex justify-center"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <TiltedCard
                imageSrc="/images/challenge_official_workspace.jpg"
                altText="Government official reviewing documents"
                captionText="Workspace Intelligence — Ekalavya Platform"
                containerHeight="500px"
                containerWidth="100%"
                imageHeight="500px"
                imageWidth="100%"
                rotateAmplitude={10}
                scaleOnHover={1.03}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <div className="w-full h-full relative pointer-events-none rounded-[15px] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/80 via-[#102A43]/15 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                      <div className="text-xs font-mono font-semibold tracking-wider text-cyan-300 uppercase">Institutional Competency System</div>
                      <div className="text-sm font-semibold text-slate-200">Public Administration & Statistical Cadre Analytics</div>
                    </div>
                  </div>
                }
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 03 — HOW IT WORKS (REACT FLOW INTERACTIVE PIPELINE)
         ============================================================ */}
      <section id="how-it-works" className="relative py-14 lg:py-20 bg-[#040D1A] border-t border-b border-white/10 overflow-hidden">

        <div className="max-w-[1320px] mx-auto px-6 sm:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
          >
            <PipelineReactFlow />
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          SECTION 04 — FEATURES (Alternating Editorial Showcases)
         ============================================================ */}
      <section id="for-officials" className="py-14 lg:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:grid lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-14 xl:gap-16">
          <div className="max-w-2xl lg:sticky lg:top-24 lg:self-start lg:pb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-xs font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>CORE CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0F172A] tracking-tight leading-[1.15]">
              An Intelligent System Tailored to Public Service.
            </h2>
            <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
              Designed with institutional precision to eliminate capability bottlenecks across MoSPI cadres, directorates, and field operations.
            </p>
          </div>

          <div className="mt-8 space-y-8 lg:mt-0 lg:space-y-10">
          {/* FEATURE 1: Text Left, Product Visualization Right */}
          <div className="ek-story-card bg-white border border-slate-200/80 rounded-[28px] p-8 sm:p-12 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#2563EB]">
                  <UserCheck className="w-4 h-4" />
                  <span>FEATURE 01</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                  Personalized Competency Profile
                </h3>
                <p className="text-base text-[#334155] font-semibold">
                  Comprehensive visibility into officer capability baselines.
                </p>
                <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                  Every official receives a dynamic competency matrix continuously mapped against MoSPI cadre standards, highlighting specialized domain strengths and critical focus areas.
                </p>
                <div className="pt-2 flex items-center gap-2 text-sm font-bold text-[#2563EB]">
                  <span>Live Profile Telemetry Active</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="p-6 sm:p-8 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-4 shadow-inner">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                    <span className="font-bold text-[#0F172A]">Statistical & Sampling Theory</span>
                    <span className="font-mono text-emerald-700 font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200">82% • Advanced</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: '82%' }} />
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm font-semibold pt-2">
                    <span className="font-bold text-[#0F172A]">Python & Automated Survey ETL</span>
                    <span className="font-mono text-amber-700 font-bold px-2.5 py-0.5 rounded-md bg-amber-50 border border-amber-200">42% • Developing</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '42%' }} />
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm font-semibold pt-2">
                    <span className="font-bold text-[#0F172A]">National Data Security Standards</span>
                    <span className="font-mono text-rose-700 font-bold px-2.5 py-0.5 rounded-md bg-rose-50 border border-rose-200">32% • Focus Deficit</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full" style={{ width: '32%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FEATURE 2: Product Visualization Left, Text Right */}
          <div className="ek-story-card bg-white border border-slate-200/80 rounded-[28px] p-8 sm:p-12 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="p-6 sm:p-8 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-[#0F172A]">Python Automated Survey Data</span>
                    <span className="font-mono font-bold text-xs px-3 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-800">
                      Evaluated Deficit: 38%
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm font-semibold">
                      <span className="text-[#64748B]">Evaluated Level: <strong className="text-[#0F172A]">42%</strong></span>
                      <span className="text-[#64748B]">Cadre Benchmark: <strong className="text-emerald-700">80%</strong></span>
                    </div>

                    <div className="w-full bg-slate-200 h-3.5 rounded-full overflow-hidden relative">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: '42%' }} />
                      <div className="absolute top-0 bottom-0 left-[80%] w-1.5 bg-emerald-600 z-10" title="Target Benchmark (80%)" />
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm text-[#475569] bg-white p-4 rounded-xl border border-slate-200 leading-relaxed font-medium">
                    <span className="font-bold text-[#0F172A]">AI Rationale:</span> Automated Python ETL is required for upcoming PLFS survey release deadlines.
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#D97706]">
                  <Target className="w-4 h-4" />
                  <span>FEATURE 02</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                  AI Skill-Gap Analysis
                </h3>
                <p className="text-base text-[#334155] font-semibold">
                  Pinpoint capability gaps with surgical accuracy.
                </p>
                <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                  Ekalavya calculates the exact delta between an official's evaluated score and cadre benchmark requirements, eliminating subjective evaluations in favor of data-backed insights.
                </p>
                <div className="pt-2 flex items-center gap-2 text-sm font-bold text-[#D97706]">
                  <span>Curriculum Mapping Active</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* FEATURE 3: Text Left, Product Visualization Right */}
          <div className="ek-story-card bg-white border border-slate-200/80 rounded-[28px] p-8 sm:p-12 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-600">
                  <BookOpen className="w-4 h-4" />
                  <span>FEATURE 03</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                  Relevant Learning Recommendations
                </h3>
                <p className="text-base text-[#334155] font-semibold">
                  Targeted courses from official national repositories.
                </p>
                <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                  Instead of browsing uncurated catalogues, officers receive precise course matches from iGOT Karmayogi and NSSTA directly aligned with their identified skill gaps.
                </p>
              </div>

              <div className="lg:col-span-6">
                <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-[#F8FAFC] shadow-inner space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 font-mono font-bold text-xs flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-emerald-600" />
                      <span>94% Competency Match</span>
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">iGOT Karmayogi</span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-[#0F172A]">
                    Python for Government Data Processing & ETL
                  </h4>

                  <div className="flex flex-wrap gap-2 text-xs font-semibold text-emerald-800 pt-2">
                    <span className="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200">
                      ✓ Python
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200">
                      ✓ Data Processing
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200">
                      ✓ Survey Analytics
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FEATURE 4: Large Full-Width Adaptive Assessment Showcase */}
          <div className="ek-story-card bg-[#071931] text-white rounded-[32px] p-8 sm:p-12 lg:p-14 border border-slate-700/60 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider mb-4">
                <Target className="w-4 h-4" />
                <span>FEATURE 04 • SIGNATURE CAPABILITY</span>
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                Adaptive Assessment Engine
              </h3>
              <p className="text-base sm:text-lg text-slate-300 mt-3 font-normal leading-relaxed">
                Dynamic evaluation that adjusts difficulty based on officer responses in real time.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: 4 Diagnostic Steps */}
              <div className="lg:col-span-5 space-y-3">
                <div
                  onClick={() => setAdaptiveStep(0)}
                  className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all ${
                    adaptiveStep === 0
                      ? 'bg-white/15 border-cyan-400 text-white shadow-lg'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <div className="text-xs font-mono font-bold text-cyan-300">STEP 01 • INITIAL SERVED</div>
                  <div className="font-bold text-sm sm:text-base text-white mt-1">Diagnostic Question Served</div>
                </div>

                <div
                  onClick={() => setAdaptiveStep(1)}
                  className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all ${
                    adaptiveStep === 1
                      ? 'bg-white/15 border-rose-400 text-white shadow-lg'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <div className="text-xs font-mono font-bold text-rose-300">STEP 02 • INCORRECT OPTION</div>
                  <div className="font-bold text-sm sm:text-base text-white mt-1">Engine Diagnoses Specific Deficit</div>
                </div>

                <div
                  onClick={() => setAdaptiveStep(2)}
                  className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all ${
                    adaptiveStep === 2
                      ? 'bg-white/15 border-amber-400 text-white shadow-lg'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <div className="text-xs font-mono font-bold text-amber-300">STEP 03 • CONCEPT REINFORCEMENT</div>
                  <div className="font-bold text-sm sm:text-base text-white mt-1">Targeted Scaffolding Question</div>
                </div>

                <div
                  onClick={() => setAdaptiveStep(3)}
                  className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all ${
                    adaptiveStep === 3
                      ? 'bg-white/15 border-emerald-400 text-white shadow-lg'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <div className="text-xs font-mono font-bold text-emerald-300">STEP 04 • MASTERY VERIFIED</div>
                  <div className="font-bold text-sm sm:text-base text-white mt-1">Score Elevated & Profile Updated</div>
                </div>
              </div>

              {/* Right Column: Simulated Quiz Diagnostic Panel */}
              <div className="lg:col-span-7 bg-[#0B1D33] border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5 text-xs font-mono">
                  <span className="text-slate-400">SESSION: DIA-9021</span>
                  <span className="text-cyan-300 font-bold px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30">ADAPTIVE MODE</span>
                </div>

                <h4 className="text-base sm:text-lg font-semibold text-white mb-5 leading-snug">
                  In stratified sampling for the Periodic Labour Force Survey (PLFS), why are weights calibrated against Census projections?
                </h4>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-3.5 sm:p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-200 flex items-center justify-between">
                    <span>A) To correct frame under-coverage and ensure demographic consistency</span>
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 ml-2" />
                  </div>
                  <div className="p-3.5 sm:p-4 rounded-xl border border-white/10 bg-white/5 text-slate-400 flex items-center justify-between">
                    <span>B) To artificially deflate variance estimates</span>
                    <span className="text-slate-500 font-mono text-xs">Option B</span>
                  </div>
                </div>

                <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-950/80 to-cyan-950/60 border border-cyan-500/30 text-xs sm:text-sm">
                  <div className="font-bold text-cyan-300 flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4" />
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
          <div className="ek-story-card bg-white border border-slate-200/80 rounded-[28px] p-8 sm:p-12 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="p-6 sm:p-8 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-5">
                  <div className="flex items-center justify-between font-bold text-base sm:text-lg text-[#0F172A]">
                    <span>National Data Security</span>
                    <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full">
                      +16 points gained
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200">
                      <div className="text-xs text-[#64748B] font-mono font-semibold">INITIAL DIAGNOSTIC</div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-mono mt-1">32%</div>
                      <span className="text-xs text-slate-500 font-medium">Baseline Score</span>
                    </div>

                    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-300 bg-emerald-50/50">
                      <div className="text-xs text-emerald-800 font-mono font-bold">POST-ASSESSMENT</div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono mt-1">48%</div>
                      <span className="text-xs text-emerald-800 font-semibold">
                        Demonstrated Growth
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-600">
                  <TrendUp className="w-4 h-4" />
                  <span>FEATURE 05</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                  Measure Your Progress
                </h3>
                <p className="text-base text-[#334155] font-semibold">
                  Verifiable competency growth over time.
                </p>
                <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                  Competency profiles update strictly through verified assessment performance, creating transparent telemetry for officers and training authorities.
                </p>
              </div>
            </div>
          </div>

          {/* FEATURE 6: Text Left, Organization Intelligence Right */}
          <div
            id="for-organizations"
            className="ek-story-card bg-white border border-[#DCE3EA] rounded-3xl p-8 sm:p-12 lg:p-14 shadow-xs"
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
                  <span className="font-semibold text-sm text-[#2563D9]">Admin Analytics Console Active ΓåÆ</span>
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
        </div>
      </section>



      {/* ============================================================
          SECTION 06 ΓÇö OUTCOMES (WORKFORCE NEEDS)
         ============================================================ */}
      <section className="py-14 lg:py-20 bg-[#F7F9FC]">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#102A43] tracking-tight">
              Designed Around Real Workforce Needs.
            </h2>
            <p className="text-base sm:text-lg text-[#475569]">
              Tailored value architectures for individual officers, cadre leadership, and national training academies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200/80 rounded-[28px] p-8 sm:p-10 shadow-sm hover:shadow-2xl hover:border-blue-300 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500" />
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-[#2563EB] flex items-center justify-center mb-6">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2563EB] mb-1.5">
                  GOVERNMENT OFFICIALS
                </h3>
                <h4 className="text-2xl font-extrabold text-[#0F172A] mb-4 tracking-tight">
                  Know what to learn next.
                </h4>
                <ul className="space-y-3 text-sm text-[#475569] leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Eliminates ambiguity on role competency requirements.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Direct links to official iGOT and NSSTA training modules.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Constructive, non-punitive adaptive diagnostic tests.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-[28px] p-8 sm:p-10 shadow-sm hover:shadow-2xl hover:border-emerald-300 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 to-teal-500" />
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mb-6">
                  <Buildings className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 mb-1.5">
                  ORGANIZATIONS
                </h3>
                <h4 className="text-2xl font-extrabold text-[#0F172A] mb-4 tracking-tight">
                  Understand capability deficits.
                </h4>
                <ul className="space-y-3 text-sm text-[#475569] leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Division-level competency heatmaps and deficits.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Data-driven workforce succession and capacity planning.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Evidence-based budget and training resource allocations.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-[28px] p-8 sm:p-10 shadow-sm hover:shadow-2xl hover:border-amber-300 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500" />
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-6">
                  <Bank className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 mb-1.5">
                  TRAINING TEAMS
                </h3>
                <h4 className="text-2xl font-extrabold text-[#0F172A] mb-4 tracking-tight">
                  Build targeted learning experiences.
                </h4>
                <ul className="space-y-3 text-sm text-[#475569] leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Identifies exact topics where cadres struggle during diagnostics.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Pre/post score delta telemetry validates course impact.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Instant document-to-quiz generation from official PDF manuals.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 07 — FAQ (Accessible Accordion)
         ============================================================ */}
      <section id="faq" className="py-14 lg:py-20 bg-white border-t border-b border-slate-200">
        <div className="max-w-[1000px] mx-auto px-6 sm:px-8">
          <div className="text-center space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#0F172A] tracking-tight">
              Answers to Common Questions.
            </h2>
            <p className="text-base text-[#64748B]">
              Everything you need to know about the Ekalavya platform and institutional mission.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="rounded-2xl bg-[#F8FAFC] border border-slate-200/80 overflow-hidden transition-all duration-200 hover:border-slate-300">
                  <button
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    className="w-full flex items-center justify-between text-left p-6 font-bold text-base sm:text-lg text-[#0F172A] hover:text-[#2563EB] transition-colors cursor-pointer focus:outline-none"
                  >
                    <span>{item.q}</span>
                    <span className="ml-4 flex-shrink-0 text-slate-400">
                      {isOpen ? <CaretUp className="w-5 h-5 text-[#2563EB]" /> : <CaretDown className="w-5 h-5" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      id={`faq-answer-${idx}`}
                      className="px-6 pb-6 text-sm sm:text-base text-[#475569] leading-relaxed border-t border-slate-200/60 pt-4"
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
        className="relative py-16 lg:py-22 bg-[#071931] text-white overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(7, 25, 49, 0.95) 40%, rgba(16, 42, 67, 0.88) 100%), url('/images/cta_mountain_landscape.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >

        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-7">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Ready to Build Your Skills <br />
                for a Greater Tomorrow?
              </h2>

              <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal max-w-xl">
                Start your competency learning journey with Ekalavya today.
              </p>

              <div className="pt-3 space-y-3">
                <div className="flex items-center gap-5 flex-wrap">
                  <ShimmerButton onClick={() => navigate('/login')}>
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5" />
                  </ShimmerButton>

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
      <footer className="bg-[#050E1A] text-slate-400 text-xs sm:text-sm border-t border-white/10 pt-20 pb-14">
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
