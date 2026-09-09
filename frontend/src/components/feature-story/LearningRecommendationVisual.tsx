import React from 'react';
import { BookOpen, Award, CheckCircle2, ArrowDown, Building2 } from 'lucide-react';
import { motion } from 'motion/react';

interface LearningRecommendationVisualProps {
  isActive?: boolean;
}

export const LearningRecommendationVisual: React.FC<LearningRecommendationVisualProps> = ({ isActive = true }) => {
  return (
    <div className="w-full bg-[#FFFFFF] rounded-2xl border border-[#DCE3EA] shadow-md overflow-hidden flex flex-col">
      {/* Console Top Header */}
      <div className="px-5 py-3.5 bg-[#F8FAFC] border-b border-[#DCE3EA] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-4 h-4 text-[#16845B]" />
          <span className="text-xs font-mono font-bold text-[#102A43] uppercase tracking-wider">
            Curriculum Alignment Engine
          </span>
        </div>
        <span className="text-[11px] font-mono font-bold text-[#16845B] bg-[#E6F4EA] px-2.5 py-0.5 rounded border border-[#CEEAD6]">
          iGOT & NSSTA REPOSITORY LINK
        </span>
      </div>

      {/* Main Container */}
      <div className="p-6 sm:p-7 space-y-5">
        {/* Step 1: Originating Deficit */}
        <div className="p-3.5 rounded-xl bg-[#FFF8F0] border border-[#FEE2C5] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E8871A] block">
              IDENTIFIED SKILL DEFICIT
            </span>
            <h4 className="text-xs sm:text-sm font-bold text-[#102A43]">
              Python & Automated Survey ETL
            </h4>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono font-bold text-[#D9383A] bg-[#FCE8E6] px-2 py-0.5 rounded border border-[#F5C2C7]">
              Current: 42%
            </span>
            <span className="text-[10px] text-[#52657A] block mt-0.5">Target: 80%</span>
          </div>
        </div>

        {/* Dynamic Connector */}
        <div className="flex justify-center -my-2">
          <div className="w-7 h-7 rounded-full bg-[#EDF2F7] border border-[#CBD5E1] flex items-center justify-center text-[#2563D9]">
            <ArrowDown className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Step 2: Primary National Recommendation Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.8, scale: 0.98 }}
          transition={{ duration: 0.4 }}
          className="p-5 sm:p-6 rounded-xl bg-[#FFFFFF] border-2 border-[#2563D9]/30 shadow-sm space-y-4"
        >
          {/* Badge Row */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-full bg-[#E6F4EA] border border-[#CEEAD6] text-[#16845B] font-mono font-bold text-xs flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>94% Competency Match</span>
            </span>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#52657A]">
              <Building2 className="w-3.5 h-3.5 text-[#2563D9]" />
              <span>iGOT Karmayogi • NSSTA</span>
            </div>
          </div>

          {/* Course Details */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#102A43] leading-snug">
              Python for Government Data Processing & ETL
            </h3>
            <p className="text-xs text-[#52657A] mt-1.5 leading-relaxed">
              Targeted curriculum engineered for statistical officers to automate survey tabulation, schema validation, and data pipelines for MoSPI surveys.
            </p>
          </div>

          {/* Module Competencies Covered */}
          <div className="flex flex-wrap gap-2 pt-1 text-xs font-medium text-[#102A43]">
            <span className="px-2.5 py-1 rounded-md bg-[#F1F5F9] border border-[#E2E8F0] flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#16845B]" />
              Python 3.12 Fundamentals
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#F1F5F9] border border-[#E2E8F0] flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#16845B]" />
              PLFS Data Cleaning Pipelines
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#F1F5F9] border border-[#E2E8F0] flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#16845B]" />
              Survey Analytics & Verification
            </span>
          </div>

          {/* Expected Outcome Impact Banner */}
          <div className="p-3 rounded-lg bg-[#EBF3FE] border border-[#BFDBFE] flex items-center justify-between text-xs">
            <span className="text-[#1E40AF] font-semibold">
              Expected Competency Delta:
            </span>
            <span className="font-mono font-bold text-[#2563D9]">
              +38 pts (Meets 80% Benchmark)
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
