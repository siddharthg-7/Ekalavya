import { useState, useEffect } from 'react';
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

  const filtered = courses.filter(c => {
    if (providerFilter !== 'All' && c.source.toUpperCase() !== providerFilter.toUpperCase()) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/learner/gaps')}
            className="text-xs font-semibold text-[var(--mc-slate-gray)] hover:text-[var(--mc-ink)] flex items-center gap-1 cursor-pointer mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Skill Gaps</span>
          </button>
          <div className="mc-eyebrow mb-1">
            <span className="mc-eyebrow-dot" />
            <span>CURRICULUM HARMONIZATION</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-medium text-[var(--mc-ink)]">
            Personalized Learning
          </h1>
          <p className="text-xs sm:text-sm text-[var(--mc-slate-gray)] mt-1">
            Curated courses from iGOT Karmayogi and NSSTA matched to your competency gaps.
          </p>
        </div>

        {targetGap && (
          <div className="px-3.5 py-1.5 rounded-full bg-[#FFF5F2] border border-[var(--mc-signal-orange)]/20 text-xs font-semibold text-[var(--mc-signal-orange)] flex items-center gap-1.5 self-start sm:self-auto">
            <Target className="w-3.5 h-3.5" />
            <span>Targeting Gap: {targetGap}</span>
          </div>
        )}
      </div>

      {/* Provider Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[var(--mc-border-light)] pb-4">
        {(['All', 'iGOT', 'NSSTA'] as const).map((prov) => (
          <button
            key={prov}
            onClick={() => setProviderFilter(prov)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              providerFilter === prov
                ? 'bg-[var(--mc-ink)] text-white shadow-xs'
                : 'bg-white hover:bg-gray-100 text-[var(--mc-granite)] border border-[var(--mc-border-light)]'
            }`}
          >
            {prov === 'All' ? 'All Catalogues (38)' : `${prov} Courses`}
          </button>
        ))}
      </div>

      {/* Courses List */}
      {loading ? (
        <div className="py-16 text-center text-xs text-[var(--mc-slate-gray)]">
          Matching training courses from iGOT and NSSTA...
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-3xl border border-[var(--mc-border-light)] text-xs text-[var(--mc-granite)]">
          No courses found for this filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((course) => {
            const isIgot = course.source.toUpperCase() === 'IGOT';

            return (
              <div
                key={course.course_id}
                onClick={() => navigate(`/learner/learning/${course.course_id}`, { state: { course } })}
                className="bg-white rounded-[28px] p-6 border border-[var(--mc-border-light)] hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      isIgot 
                        ? 'bg-blue-50 text-[var(--mc-link-blue)] border-blue-200' 
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}>
                      {course.source} Catalog
                    </span>
                    <div className="flex items-center gap-2">
                      {course.duration_hrs && (
                        <span className="flex items-center gap-1 text-[11px] text-[var(--mc-slate-gray)]">
                          <Clock className="w-3 h-3" />
                          {course.duration_hrs} hrs
                        </span>
                      )}
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {Math.round(course.score)}% Match
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-[var(--mc-ink)] mb-2 group-hover:text-[var(--mc-signal-orange)] transition-colors">
                    {course.title}
                  </h3>

                  {course.addresses_gap && (
                    <div className="mb-3">
                      <span className="text-[11px] font-semibold text-[var(--mc-signal-orange)] bg-[#FFF5F2] px-2.5 py-0.5 rounded-full border border-[var(--mc-signal-orange)]/20">
                        Bridges: {course.addresses_gap}
                      </span>
                    </div>
                  )}

                  <div className="p-3 rounded-2xl bg-[var(--mc-canvas)]/60 text-xs text-[var(--mc-granite)] mb-4">
                    <span className="font-semibold text-[var(--mc-ink)]">Why Recommended: </span>
                    {course.reason}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[var(--mc-link-blue)]">
                  <span>View Details & Outline</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
