import React from 'react';

interface FeatureProgressProps {
  activeStep: number;
  totalSteps: number;
  onSelectStep?: (index: number) => void;
  stepNames: string[];
}

export const FeatureProgress: React.FC<FeatureProgressProps> = ({
  activeStep,
  totalSteps,
  onSelectStep,
  stepNames,
}) => {
  return (
    <div className="flex flex-col gap-3 py-2">
      {/* Horizontal Progress Track on top */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: totalSteps }).map((_, idx) => {
          const isActive = activeStep === idx;
          const isPassed = activeStep > idx;

          return (
            <button
              key={idx}
              onClick={() => onSelectStep && onSelectStep(idx)}
              className="group relative flex items-center py-1.5 cursor-pointer focus:outline-none"
              aria-label={`Jump to capability 0${idx + 1}: ${stepNames[idx] || ''}`}
              title={`0${idx + 1} • ${stepNames[idx] || ''}`}
            >
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-10 bg-[#2563D9]'
                    : isPassed
                    ? 'w-5 bg-[#16845B]'
                    : 'w-4 bg-[#DCE3EA] group-hover:bg-[#CBD5E1]'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Discrete Step Indicators with Journey Tags */}
      <div className="flex items-center gap-4 text-xs font-mono">
        {Array.from({ length: totalSteps }).map((_, idx) => {
          const isActive = activeStep === idx;
          const isPassed = activeStep > idx;

          return (
            <button
              key={idx}
              onClick={() => onSelectStep && onSelectStep(idx)}
              className={`transition-all cursor-pointer font-bold ${
                isActive
                  ? 'text-[#2563D9] scale-105'
                  : isPassed
                  ? 'text-[#16845B]'
                  : 'text-[#94A3B8] hover:text-[#64748B]'
              }`}
            >
              0{idx + 1}
            </button>
          );
        })}
        <span className="text-[11px] font-sans font-medium text-[#64748B] ml-2">
          Step {activeStep + 1} of {totalSteps}
        </span>
      </div>
    </div>
  );
};
