import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { type CourseRecommendation, fetchCourseDetail } from '../../services/api';
import { ArrowLeft, ExternalLink, Brain, Clock, Award, Target } from 'lucide-react';

export const LearningDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [course, setCourse] = React.useState<CourseRecommendation | null>(location.state?.course || null);
  const [loading, setLoading] = React.useState(!location.state?.course);

  React.useEffect(() => {
    if (course || !id) return;
    async function load() {
      setLoading(true);
      try {
        const data = await fetchCourseDetail(id!);
        setCourse(data);
      } catch (err) {
        console.error('Failed to load course details:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, course]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-24 text-center text-xs text-[#52657A] flex items-center justify-center gap-2">
        <div className="w-4 h-4 border-2 border-[#2563D9] border-t-transparent rounded-full animate-spin" />
        <span>Loading curriculum module dossier...</span>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-3xl mx-auto py-12 text-center text-xs text-[#52657A]">
        Course module details unavailable.
      </div>
    );
  }

  const isIgot = course.source.toUpperCase() === 'IGOT';

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-2">
      <button
        onClick={() => navigate('/learner/learning')}
        className="text-xs font-semibold text-[#52657A] hover:text-[#2563D9] flex items-center gap-1.5 cursor-pointer transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Course Recommendations</span>
      </button>

      <div className="bg-white rounded-2xl p-8 sm:p-10 border border-[#DCE3EA] shadow-2xs space-y-6">
        {/* Badges */}
        <div className="flex items-center justify-between gap-3">
          <span className={`text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border ${
            isIgot 
              ? 'bg-blue-50 text-[#2563D9] border-blue-200' 
              : 'bg-amber-50 text-amber-800 border-amber-200'
          }`}>
            {course.source} Learning Module
          </span>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono">
            {Math.round(course.score)}% Competency Alignment
          </span>
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#102A43] mb-3 leading-tight tracking-tight">
            {course.title}
          </h1>
          {course.addresses_gap && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 text-[#E8871A] border border-amber-200">
              Directly Bridges: {course.addresses_gap}
            </span>
          )}
        </div>

        {/* Metadata Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
          <div className="p-3.5 rounded-2xl bg-[#F7F9FC] border border-[#DCE3EA]/60">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#52657A] block mb-1">
              Estimated Duration
            </span>
            <span className="text-sm font-semibold text-[#102A43] flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5 text-[#52657A]" />
              {course.duration_hrs || 16} Hours
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F7F9FC] border border-[#DCE3EA]/60">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#52657A] block mb-1">
              Accreditation
            </span>
            <span className="text-sm font-semibold text-[#102A43] flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              Govt. Certified
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F7F9FC] border border-[#DCE3EA]/60 col-span-2 sm:col-span-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#52657A] block mb-1">
              Platform Source
            </span>
            <span className="text-sm font-semibold text-[#102A43]">
              {course.source} Portal
            </span>
          </div>
        </div>

        {/* Rationale */}
        <div className="p-5 rounded-2xl bg-[#F7F9FC] border border-[#DCE3EA]">
          <div className="text-xs font-bold uppercase tracking-wider text-[#52657A] mb-1.5 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-[#2563D9]" />
            <span>Curriculum Recommendation Justification</span>
          </div>
          <p className="text-xs sm:text-sm text-[#52657A] leading-relaxed">
            {course.reason}
          </p>
        </div>

        {/* Action CTAs */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
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
            className="px-6 py-3 rounded-full bg-white hover:bg-blue-50 text-[#2563D9] border border-blue-200 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Brain className="w-3.5 h-3.5 text-[#2563D9]" />
            <span>Take Diagnostic Assessment</span>
          </button>
        </div>
      </div>
    </div>
  );
};
