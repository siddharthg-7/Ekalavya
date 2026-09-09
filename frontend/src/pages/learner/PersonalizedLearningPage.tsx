import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { type CourseRecommendation, fetchRecommendations } from '../../services/api';
import { Clock, ArrowRight, ArrowLeft, Target } from 'lucide-react';

export const PersonalizedLearningPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { session } = useAuth();

  const [courses, setCourses] = useState<CourseRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'recommended' | 'in_progress' | 'completed'>('recommended');
  const [providerFilter, setProviderFilter] = useState<'All' | 'iGOT' | 'NSSTA'>('All');

  const targetGap = location.state?.targetGap as string | undefined;

  useEffect(() => {
    async function load() {
      if (!session.officialId) return;
      setLoading(true);
      try {
        const res = await fetchRecommendations(session.officialId);
        setCourses(res);
      } catch (e) {
        console.error('Failed to load courses:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [session.officialId]);

  // Tab counts
  const inProgressCourses = courses.slice(0, 2);
  const completedCourses = courses.slice(2, 5);

  const displayedCourses = activeTab === 'recommended' 
    ? courses 
    : activeTab === 'in_progress' 
      ? inProgressCourses 
      : completedCourses;

  const filtered = displayedCourses.filter(c => {
    if (providerFilter !== 'All' && c.source.toUpperCase() !== providerFilter.toUpperCase()) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 font-['Noto_Sans','Inter',sans-serif]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/learner/gaps')}
            className="text-xs font-semibold text-[#52657A] hover:text-[#2563D9] flex items-center gap-1.5 cursor-pointer mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Skill Gaps</span>
          </button>
          <div className="mc-eyebrow mb-1">
            <span className="mc-eyebrow-dot" />
            <span>CURRICULUM HARMONIZATION</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#102A43] tracking-tight">
            Personalized Learning
          </h1>
          <p className="text-xs sm:text-sm text-[#52657A] mt-1">
            Curated courses from iGOT Karmayogi and NSSTA mapped directly to your competency deficits.
          </p>
        </div>

        {targetGap && (
          <div className="px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-[#E8871A] flex items-center gap-1.5 self-start sm:self-auto">
            <Target className="w-3.5 h-3.5" />
            <span>Targeting Gap: {targetGap}</span>
          </div>
        )}
      </div>

      {/* Pathway Tabs (Recommended / In Progress / Completed) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DCE3EA] pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('recommended')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'recommended'
                ? 'bg-[#102A43] text-white shadow-2xs'
                : 'bg-white hover:bg-slate-50 text-[#52657A] border border-[#DCE3EA]'
            }`}
          >
            Recommended ({courses.length})
          </button>
          <button
            onClick={() => setActiveTab('in_progress')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'in_progress'
                ? 'bg-[#2563D9] text-white shadow-2xs'
                : 'bg-white hover:bg-slate-50 text-[#52657A] border border-[#DCE3EA]'
            }`}
          >
            In Progress (2)
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'completed'
                ? 'bg-[#16845B] text-white shadow-2xs'
                : 'bg-white hover:bg-slate-50 text-[#52657A] border border-[#DCE3EA]'
            }`}
          >
            Completed (3)
          </button>
        </div>

        {/* Source Filter */}
        <div className="flex items-center gap-1.5 text-xs text-[#52657A]">
          <span className="font-semibold text-[#102A43]">Source:</span>
          {(['All', 'iGOT', 'NSSTA'] as const).map((prov) => (
            <button
              key={prov}
              onClick={() => setProviderFilter(prov)}
              className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                providerFilter === prov
                  ? 'bg-slate-200 text-[#102A43]'
                  : 'text-[#52657A] hover:bg-slate-100'
              }`}
            >
              {prov}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      {loading ? (
        <div className="py-16 text-center text-xs text-[#52657A]">
          Matching training courses from iGOT and NSSTA...
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-2xl border border-[#DCE3EA] text-xs text-[#52657A]">
          No courses found for this filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((course, idx) => {
            const isIgot = course.source.toUpperCase() === 'IGOT';
            const progressPct = activeTab === 'completed' ? 100 : activeTab === 'in_progress' ? (idx === 0 ? 65 : 40) : null;

            return (
              <div
                key={course.course_id}
                className="bg-white rounded-2xl p-6 border border-[#DCE3EA] hover:border-[#2563D9]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      isIgot 
                        ? 'bg-blue-50 text-[#2563D9] border-blue-200' 
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}>
                      {course.source} Module
                    </span>
                    <div className="flex items-center gap-2">
                      {course.duration_hrs && (
                        <span className="flex items-center gap-1 text-[11px] text-[#52657A]">
                          <Clock className="w-3 h-3" />
                          {course.duration_hrs} hrs
                        </span>
                      )}
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono">
                        {Math.round(course.score)}% Match
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-[#102A43] mb-2">
                    {course.title}
                  </h3>

                  {course.addresses_gap && (
                    <div className="mb-3">
                      <span className="text-[11px] font-semibold text-[#E8871A] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                        Bridges: {course.addresses_gap}
                      </span>
                    </div>
                  )}

                  <div className="p-3.5 rounded-xl bg-[#F7F9FC] text-xs text-[#52657A] mb-4 border border-[#DCE3EA]">
                    <span className="font-semibold text-[#102A43]">Curriculum Alignment: </span>
                    {course.reason}
                  </div>

                  {/* Progress bar if in progress or completed */}
                  {progressPct !== null && (
                    <div className="mb-4 space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-[#52657A]">
                        <span>Course Completion</span>
                        <span className="font-mono font-bold text-[#102A43]">{progressPct}%</span>
                      </div>
                      <div className="w-full bg-[#EDF2F7] h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${progressPct === 100 ? 'bg-[#16845B]' : 'bg-[#2563D9]'}`}
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#DCE3EA] flex items-center justify-between">
                  <button
                    onClick={() => navigate(`/learner/learning/${course.course_id}`, { state: { course } })}
                    className="mc-btn-primary px-4 py-2 text-xs flex items-center gap-1.5"
                  >
                    <span>{activeTab === 'in_progress' ? 'Continue' : 'Open'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => navigate(`/learner/learning/${course.course_id}`, { state: { course } })}
                    className="text-xs font-semibold text-[#52657A] hover:text-[#2563D9] cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
