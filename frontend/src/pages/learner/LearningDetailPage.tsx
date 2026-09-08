import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { type CourseRecommendation, FALLBACK_RECOMMENDATIONS } from '../../services/api';
import { ArrowLeft, ExternalLink, Brain, Clock, Award, Sparkles } from 'lucide-react';

export const LearningDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // Try to read course from location state, or fallback to lookup
  const course: CourseRecommendation = location.state?.course || 
    FALLBACK_RECOMMENDATIONS.find(c => c.course_id === id) || 
    FALLBACK_RECOMMENDATIONS[0];

  const isIgot = course.source.toUpperCase() === 'IGOT';

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-2">
      <button
        onClick={() => navigate('/learner/learning')}
        className="text-xs font-semibold text-[var(--mc-slate-gray)] hover:text-[var(--mc-ink)] flex items-center gap-1.5 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Course Recommendations</span>
      </button>

      <div className="bg-white rounded-[36px] p-8 sm:p-10 border border-[var(--mc-border-light)] shadow-sm space-y-6">
        {/* Badges */}
        <div className="flex items-center justify-between gap-3">
          <span className={`text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border ${
            isIgot 
              ? 'bg-blue-50 text-[var(--mc-link-blue)] border-blue-200' 
              : 'bg-amber-50 text-amber-800 border-amber-200'
          }`}>
            {course.source} Learning Module
          </span>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            {Math.round(course.score)}% Competency Alignment
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-medium text-[var(--mc-ink)] mb-3 leading-tight">
            {course.title}
          </h1>
          {course.addresses_gap && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#FFF5F2] text-[var(--mc-signal-orange)] border border-[var(--mc-signal-orange)]/20">
              Directly Bridges: {course.addresses_gap}
            </span>
          )}
        </div>

        {/* Metadata Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100 text-xs">
          <div className="p-3.5 rounded-2xl bg-[var(--mc-canvas)]/60">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--mc-slate-gray)] block mb-1">
              Estimated Duration
            </span>
            <span className="text-sm font-semibold text-[var(--mc-ink)] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[var(--mc-slate-gray)]" />
              {course.duration_hrs || 16} Hours
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[var(--mc-canvas)]/60">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--mc-slate-gray)] block mb-1">
              Accreditation
            </span>
            <span className="text-sm font-semibold text-[var(--mc-ink)] flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              Govt. Certified
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[var(--mc-canvas)]/60 col-span-2 sm:col-span-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--mc-slate-gray)] block mb-1">
              Platform Source
            </span>
            <span className="text-sm font-semibold text-[var(--mc-ink)]">
              {course.source} Portal
            </span>
          </div>
        </div>

        {/* Rationale */}
        <div className="p-5 rounded-2xl bg-[var(--mc-surface-lifted)] border border-[var(--mc-border-light)]">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--mc-slate-gray)] mb-1.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[var(--mc-signal-orange)]" />
            <span>AI Recommendation Justification</span>
          </div>
          <p className="text-xs sm:text-sm text-[var(--mc-granite)] leading-relaxed">
            {course.reason}
          </p>
        </div>

        {/* Action CTAs */}
        <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <a
            href={course.url || 'https://igotkarmayogi.gov.in'}
            target="_blank"
            rel="noreferrer"
            className="mc-btn-primary py-3 px-6 text-xs flex items-center gap-2 no-underline"
          >
            <span>Launch on {course.source}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => navigate('/learner/assessments/new')}
            className="px-6 py-3 rounded-full bg-[var(--mc-canvas)] hover:bg-gray-200 text-[var(--mc-ink)] text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Brain className="w-3.5 h-3.5 text-[var(--mc-signal-orange)]" />
            <span>Take Diagnostic Assessment</span>
          </button>
        </div>
      </div>
    </div>
  );
};
