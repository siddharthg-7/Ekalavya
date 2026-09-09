import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export const AccessibilityPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">
      <button
        onClick={() => navigate(-1)}
        className="text-xs font-semibold text-[#52657A] hover:text-[#2563D9] flex items-center gap-1.5 cursor-pointer transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back</span>
      </button>

      <div>
        <div className="mc-eyebrow mb-2">
          <span className="mc-eyebrow-dot" />
          <span>INCLUSIVITY & STANDARDS</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#102A43] tracking-tight">
          Accessibility Statement
        </h1>
        <p className="text-xs sm:text-sm text-[#52657A] mt-1">
          Committed to GIGW (Guidelines for Indian Government Websites) and WCAG 2.1 AA accessibility standards.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-[#DCE3EA] shadow-2xs space-y-4 text-xs text-[#52657A] leading-relaxed">
        <p>
          Ekalavya is engineered to ensure all government officials, regardless of physical or technical capability, can navigate competency assessments and access training.
        </p>
        <ul className="space-y-2 font-medium">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>High-contrast semantic typography compliant with contrast ratio requirements</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Full keyboard navigability for interactive diagnostic assessments</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>ARIA labels and live announcements for adaptive difficulty transitions</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
