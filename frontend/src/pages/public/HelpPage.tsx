import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Brain, Target, ShieldCheck } from 'lucide-react';

export const HelpPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">
      <button
        onClick={() => navigate(-1)}
        className="text-xs font-semibold text-[var(--mc-slate-gray)] hover:text-[var(--mc-ink)] flex items-center gap-1.5 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back</span>
      </button>

      <div>
        <div className="mc-eyebrow mb-2">
          <span className="mc-eyebrow-dot" />
          <span>HELP & DOCUMENTATION</span>
        </div>
        <h1 className="text-3xl font-medium text-[var(--mc-ink)]">
          Ekalavya Platform Guide
        </h1>
        <p className="text-xs sm:text-sm text-[var(--mc-slate-gray)] mt-1">
          Understanding the competency diagnostic engine and Mission Karmayogi integration.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-[28px] p-6 border border-[var(--mc-border-light)]">
          <h3 className="text-base font-semibold text-[var(--mc-ink)] mb-2 flex items-center gap-2">
            <Target className="w-4 h-4 text-[var(--mc-signal-orange)]" />
            <span>How Competency Scores are Calculated</span>
          </h3>
          <p className="text-xs text-[var(--mc-granite)] leading-relaxed">
            The platform applies a two-stage evaluation: a rule-based heuristic baseline derived from your MoSPI job role, department, and past trainings, followed by an LLM refinement pass that provides clear contextual rationales.
          </p>
        </div>

        <div className="bg-white rounded-[28px] p-6 border border-[var(--mc-border-light)]">
          <h3 className="text-base font-semibold text-[var(--mc-ink)] mb-2 flex items-center gap-2">
            <Brain className="w-4 h-4 text-[var(--mc-link-blue)]" />
            <span>How Adaptive Assessments Work</span>
          </h3>
          <p className="text-xs text-[var(--mc-granite)] leading-relaxed">
            Assessments do not serve fixed question sheets. Questions are served one at a time. If an official struggles with a concept, the engine automatically drops difficulty and injects targeted remediation questions directly from the uploaded manual.
          </p>
        </div>

        <div className="bg-white rounded-[28px] p-6 border border-[var(--mc-border-light)]">
          <h3 className="text-base font-semibold text-[var(--mc-ink)] mb-2 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Course Catalog Sources</span>
          </h3>
          <p className="text-xs text-[var(--mc-granite)] leading-relaxed">
            Curriculum pathways aggregate directly from Mission Karmayogi's iGOT national portal and the National Statistical Systems Training Academy (NSSTA) residential courses.
          </p>
        </div>
      </div>
    </div>
  );
};
