import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Activity } from 'lucide-react';
import { motion } from 'motion/react';

interface AdaptiveAssessmentVisualProps {
  isActive?: boolean;
}

export const AdaptiveAssessmentVisual: React.FC<AdaptiveAssessmentVisualProps> = ({ isActive = true }) => {
  const [selectedStep, setSelectedStep] = useState(3); // Default on mastery

  const steps = [
    {
      num: 'STEP 01',
      tag: 'INITIAL SERVED',
      title: 'Diagnostic Question Served',
      detail: 'Assesses baseline sampling knowledge',
    },
    {
      num: 'STEP 02',
      tag: 'INCORRECT OPTION',
      title: 'Engine Diagnoses Deficit',
      detail: 'Pauses difficulty escalation to isolate core premise',
    },
    {
      num: 'STEP 03',
      tag: 'REINFORCEMENT',
      title: 'Targeted Scaffolding Question',
      detail: 'Serves concept primer on calibration weights',
    },
    {
      num: 'STEP 04',
      tag: 'MASTERY VERIFIED',
      title: 'Score Elevated & Profile Updated',
      detail: 'Demonstrates verified competency delta (+16 pts)',
    },
  ];

  return (
    <div className="w-full bg-[#081B30] text-white rounded-2xl border border-slate-700/80 shadow-xl overflow-hidden flex flex-col">
      {/* Dark Console Header */}
      <div className="px-5 py-3.5 bg-[#051322] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
            Adaptive Diagnostic Engine
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-400">SESSION: DIA-9021</span>
          <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-2 py-0.5 rounded">
            ADAPTIVE MODE
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="p-6 sm:p-7 space-y-6">
        {/* Step Selector Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {steps.map((s, idx) => {
            const isCur = selectedStep === idx;
            return (
              <button
                key={s.num}
                onClick={() => setSelectedStep(idx)}
                className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                  isCur
                    ? 'bg-blue-600/30 border-cyan-400 text-white shadow-sm'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                }`}
              >
                <span className="text-[9.5px] font-mono font-bold text-cyan-300 block">
                  {s.num}
                </span>
                <span className="text-xs font-semibold text-slate-200 block truncate">
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Question Assessment Card */}
        <motion.div
          key={selectedStep}
          initial={{ opacity: 0, y: 8 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.8, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-5 sm:p-6 rounded-xl bg-[#0B223D] border border-white/15 space-y-4 shadow-inner"
        >
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/10 pb-3">
            <span>Competency: Stratified Sampling & Weights</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Prompt
            </span>
          </div>

          <h4 className="text-sm sm:text-base font-semibold text-white leading-snug">
            In stratified sampling for the Periodic Labour Force Survey (PLFS), why are weights calibrated against Census projections?
          </h4>

          {/* Options */}
          <div className="space-y-2.5 text-xs sm:text-sm pt-1">
            <div className="p-3.5 rounded-lg border border-emerald-500/50 bg-emerald-500/15 text-emerald-100 flex items-center justify-between">
              <span>A) To correct frame under-coverage and ensure demographic consistency</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 ml-2" />
            </div>
            <div className="p-3 rounded-lg border border-white/10 bg-white/5 text-slate-400 flex items-center justify-between">
              <span>B) To artificially deflate variance estimates</span>
              <span className="text-[11px] font-mono text-slate-500">Option B</span>
            </div>
          </div>

          {/* Diagnostic Resolution Banner */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-950/90 to-cyan-950/70 border border-cyan-500/30 text-xs">
            <div className="font-bold text-cyan-300 flex items-center gap-1.5 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Engine Action: Concept Mastered (+16 pts)</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11.5px]">
              Calibration rationale verified. Proficiency updated on official profile.
            </p>
          </div>
        </motion.div>

        {/* Growth Verification Telemetry */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">
              INITIAL DIAGNOSTIC
            </span>
            <span className="text-2xl font-bold font-mono text-white mt-0.5 block">
              32%
            </span>
            <span className="text-[10.5px] text-slate-400">Baseline Score</span>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-center">
            <span className="text-[10px] font-mono text-emerald-300 font-bold uppercase block">
              POST-ASSESSMENT
            </span>
            <span className="text-2xl font-bold font-mono text-emerald-400 mt-0.5 block">
              48%
            </span>
            <span className="text-[10.5px] text-emerald-300 font-semibold">+16 pts Demonstrated Growth</span>
          </div>
        </div>
      </div>
    </div>
  );
};
