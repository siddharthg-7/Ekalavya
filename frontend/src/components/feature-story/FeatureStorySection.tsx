import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ArrowRight } from '@phosphor-icons/react';
import { FeatureProgress } from './FeatureProgress';
import { CompetencyProfileVisual } from './CompetencyProfileVisual';
import { SkillGapVisual } from './SkillGapVisual';
import { LearningRecommendationVisual } from './LearningRecommendationVisual';
import { AdaptiveAssessmentVisual } from './AdaptiveAssessmentVisual';
import { ProgressVisual } from './ProgressVisual';
import { WorkforceIntelligenceVisual } from './WorkforceIntelligenceVisual';

export interface FeatureStoryData {
  id: string;
  num: string;
  journey: string;
  eyebrow: string;
  heading: string;
  description: string;
  body: string;
  contextAction: string;
  actionColor: string;
}

const FEATURE_STORIES: FeatureStoryData[] = [
  {
    id: 'profile',
    num: '01',
    journey: 'UNDERSTAND',
    eyebrow: 'FEATURE 01',
    heading: 'Personalized Competency Profile',
    description: 'Comprehensive visibility into officer capability baselines.',
    body: 'Every official receives a dynamic competency matrix continuously mapped against MoSPI cadre standards, highlighting specialized domain strengths and critical focus areas.',
    contextAction: 'Live Profile Telemetry Active',
    actionColor: '#2563D9',
  },
  {
    id: 'skill-gap',
    num: '02',
    journey: 'IDENTIFY',
    eyebrow: 'FEATURE 02',
    heading: 'AI Skill-Gap Analysis',
    description: 'Pinpoint capability gaps with surgical accuracy.',
    body: "Ekalavya calculates the exact delta between an official's evaluated score and cadre benchmark requirements, eliminating subjective evaluations in favor of data-backed insights.",
    contextAction: 'Curriculum Mapping Active',
    actionColor: '#E8871A',
  },
  {
    id: 'learning',
    num: '03',
    journey: 'LEARN',
    eyebrow: 'FEATURE 03',
    heading: 'Relevant Learning Recommendations',
    description: 'Targeted courses from official national repositories.',
    body: 'Instead of browsing uncurated catalogues, officers receive precise course matches from iGOT Karmayogi and NSSTA directly aligned with their identified skill gaps.',
    contextAction: 'National Repository Connected',
    actionColor: '#16845B',
  },
  {
    id: 'adaptive',
    num: '04',
    journey: 'ADAPT',
    eyebrow: 'FEATURE 04 • SIGNATURE CAPABILITY',
    heading: 'Adaptive Assessment Engine',
    description: 'Dynamic evaluation that adjusts difficulty based on officer responses in real time.',
    body: 'Unlike static examinations, our diagnostic engine evaluates conceptual comprehension dynamically—scaffolding misunderstood concepts before measuring certified mastery.',
    contextAction: 'Real-Time Dynamic Difficulty Active',
    actionColor: '#0EA5E9',
  },
  {
    id: 'progress',
    num: '05',
    journey: 'IMPROVE',
    eyebrow: 'FEATURE 05',
    heading: 'Measure Your Progress',
    description: 'Verifiable competency growth over time.',
    body: 'Competency profiles update strictly through verified assessment performance, creating transparent telemetry for officers and training authorities.',
    contextAction: 'Cryptographic Audit Trail Logged',
    actionColor: '#16845B',
  },
  {
    id: 'workforce',
    num: '06',
    journey: 'SCALE',
    eyebrow: 'FEATURE 06',
    heading: 'Workforce Intelligence',
    description: 'Help organizations understand capability gaps at scale.',
    body: 'Cadre administrators gain aggregate department-level heatmaps, enabling evidence-based training investments and targeted capacity interventions.',
    contextAction: 'Ministry Intelligence Active',
    actionColor: '#2563D9',
  },
];

export const FeatureStorySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  // Scroll listener for sticky desktop timeline
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScroll = rect.height - window.innerHeight;
      if (totalScroll <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll));
      const stepIndex = Math.min(FEATURE_STORIES.length - 1, Math.floor(progress * FEATURE_STORIES.length));

      setActiveStep(stepIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectStep = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const totalScroll = rect.height - window.innerHeight;
    const targetScrollY = window.scrollY + rect.top + (index / FEATURE_STORIES.length) * totalScroll + 20;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  const currentFeature = FEATURE_STORIES[activeStep];

  const renderVisual = (idx: number, isSticky = true) => {
    switch (idx) {
      case 0:
        return <CompetencyProfileVisual isActive={isSticky ? activeStep === 0 : true} />;
      case 1:
        return <SkillGapVisual isActive={isSticky ? activeStep === 1 : true} />;
      case 2:
        return <LearningRecommendationVisual isActive={isSticky ? activeStep === 2 : true} />;
      case 3:
        return <AdaptiveAssessmentVisual isActive={isSticky ? activeStep === 3 : true} />;
      case 4:
        return <ProgressVisual isActive={isSticky ? activeStep === 4 : true} />;
      case 5:
        return <WorkforceIntelligenceVisual isActive={isSticky ? activeStep === 5 : true} />;
      default:
        return <CompetencyProfileVisual />;
    }
  };

  return (
    <section id="for-officials" className="bg-[#F7F9FC] text-[#102A43] border-t border-b border-[#DCE3EA]">
      {/* ── DESKTOP STICKY SCROLL STORYTELLING (~580vh) ───────────── */}
      <div ref={containerRef} className="hidden lg:block relative" style={{ height: '580vh' }}>
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden py-12">
          <div className="max-w-[1300px] w-full mx-auto px-8 xl:px-12 grid grid-cols-12 gap-12 xl:gap-16 items-center">
            
            {/* LEFT COLUMN: Feature Narrative */}
            <div className="col-span-5 flex flex-col justify-center space-y-6 pr-4">
              {/* Institutional Section Banner */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3FE] border border-[#BFDBFE] text-[#2563D9] text-xs font-mono font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>CONTINUOUS COMPETENCY LOOP</span>
                </span>
                <span className="text-[11px] font-mono font-semibold text-[#64748B] uppercase">
                  {currentFeature.journey}
                </span>
              </div>

              {/* Animated Narrative Block */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFeature.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-4"
                >
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#2563D9]">
                    {currentFeature.eyebrow}
                  </div>

                  <h2 className="text-3xl xl:text-[36px] font-bold text-[#102A43] tracking-tight leading-[1.18]">
                    {currentFeature.heading}
                  </h2>

                  <p className="text-base font-semibold text-[#334E68] leading-snug">
                    {currentFeature.description}
                  </p>

                  <p className="text-sm text-[#52657A] leading-relaxed">
                    {currentFeature.body}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-xs font-bold font-mono" style={{ color: currentFeature.actionColor }}>
                    <span>{currentFeature.contextAction}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Minimal Navigation Progress Indicator */}
              <div className="pt-4 border-t border-[#DCE3EA]">
                <FeatureProgress
                  activeStep={activeStep}
                  totalSteps={FEATURE_STORIES.length}
                  onSelectStep={handleSelectStep}
                  stepNames={FEATURE_STORIES.map(s => s.heading)}
                />
              </div>
            </div>

            {/* RIGHT COLUMN: Interactive Product Visualization */}
            <div className="col-span-7 flex items-center justify-center">
              <div className="w-full max-w-[660px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 16, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -16, scale: 0.985 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    {renderVisual(activeStep, true)}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── MOBILE / TABLET SEQUENTIAL STORYTELLING FLOW ─────────── */}
      <div className="lg:hidden py-14 px-6 sm:px-8 space-y-14">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3FE] border border-[#BFDBFE] text-[#2563D9] text-xs font-mono font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CONTINUOUS COMPETENCY LOOP</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#102A43] tracking-tight">
            An Intelligent System Tailored to Public Service.
          </h2>
          <p className="text-xs sm:text-sm text-[#52657A] leading-relaxed">
            Ekalavya does not just assess officers. It creates a continuous competency intelligence loop across six interconnected capabilities.
          </p>
        </div>

        <div className="space-y-12">
          {FEATURE_STORIES.map((feature, idx) => (
            <div
              key={feature.id}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE3EA] shadow-xs space-y-6"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#2563D9] uppercase tracking-wider">
                    {feature.eyebrow}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#52657A] bg-[#EDF2F7] px-2 py-0.5 rounded">
                    {feature.journey}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#102A43] tracking-tight">
                  {feature.heading}
                </h3>

                <p className="text-xs sm:text-sm font-semibold text-[#334E68]">
                  {feature.description}
                </p>

                <p className="text-xs sm:text-sm text-[#52657A] leading-relaxed">
                  {feature.body}
                </p>
              </div>

              {/* Product Visual Container */}
              <div className="pt-2">
                {renderVisual(idx, false)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
