import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Briefcase,
  GraduationCap,
  Calendar,
  AlertCircle,
  BookOpen
} from 'lucide-react';
import {
  fetchOfficialDetail,
  fetchCompetencyGaps,
  fetchRecommendations,
  type OfficialDetail,
  type CompetencyGap,
  type CourseRecommendation
} from '../../services/api';

export const AdminOfficialDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [official, setOfficial] = useState<OfficialDetail | null>(null);
  const [gaps, setGaps] = useState<CompetencyGap[]>([]);
  const [recommendations, setRecommendations] = useState<CourseRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!id) {
        setError('No official identifier provided.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [off, gapData, recData] = await Promise.all([
          fetchOfficialDetail(id),
          fetchCompetencyGaps(id),
          fetchRecommendations(id)
        ]);

        if (!off) {
          setError(`Official with ID "${id}" could not be found.`);
        } else {
          setOfficial(off);
          setGaps(gapData);
          setRecommendations(recData);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to retrieve official records.');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-16 text-center text-slate-400 animate-fadeIn">
        <div className="animate-spin w-8 h-8 border-2 border-slate-300 border-t-slate-800 rounded-full mx-auto mb-3" />
        <p className="text-sm">Loading official dossier & competency telemetry...</p>
      </div>
    );
  }

  if (error || !official) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-600 animate-fadeIn">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
        <h2 className="text-lg font-bold text-slate-900 mb-2">Official Record Not Found</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
          {error || `Unable to locate official profile for identifier: ${id}`}
        </p>
        <Link
          to="/admin/officials"
          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-slate-900 hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Return to Officials Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header & Breadcrumb */}
      <div>
        <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
          <Link to="/admin" className="hover:text-slate-800 transition-colors">
            Admin
          </Link>
          <span>/</span>
          <Link to="/admin/officials" className="hover:text-slate-800 transition-colors">
            Officials
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">{official.name}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-slate-900 text-white font-serif font-bold text-xl flex items-center justify-center flex-shrink-0">
              {official.name
                .split(' ')
                .map(n => n[0])
                .join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-serif font-bold text-slate-900">{official.name}</h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-slate-100 text-slate-700">
                  {official.id}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-600 mt-0.5">{official.designation}</p>
            </div>
          </div>

          <Link
            to="/admin/officials"
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Officials
          </Link>
        </div>
      </div>

      {/* Dossier Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Cadre Profile & Service Dossier
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          <div>
            <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
              <Building2 className="w-3.5 h-3.5" /> Department / Division
            </div>
            <div className="font-medium text-slate-900">{official.department}</div>
          </div>

          <div>
            <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
              <Briefcase className="w-3.5 h-3.5" /> Operational Role
            </div>
            <div className="font-medium text-slate-900">{official.job_role || 'Statistical Officer'}</div>
          </div>

          <div>
            <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
              <GraduationCap className="w-3.5 h-3.5" /> Academic Qualification
            </div>
            <div className="font-medium text-slate-900">{official.education || 'N/A'}</div>
          </div>

          <div>
            <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
              <Calendar className="w-3.5 h-3.5" /> Experience
            </div>
            <div className="font-medium text-slate-900">
              {official.experience_years ? `${official.experience_years} years in service` : 'N/A'}
            </div>
          </div>
        </div>

        {official.past_trainings && official.past_trainings.length > 0 && (
          <div className="mt-5 pt-4 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Prior MoSPI / NSSTA Completed Trainings
            </span>
            <div className="flex flex-wrap gap-2">
              {official.past_trainings.map((t, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-md border border-slate-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Competency Gap Analysis */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Competency Mastery & Gap Matrix</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Live diagnostic evaluation evaluated against MoSPI job framework standards
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">{gaps.length} Evaluated Dimensions</span>
        </div>

        <div className="divide-y divide-slate-100">
          {gaps.map(gap => (
            <div key={gap.competency_id} className="p-6 hover:bg-slate-50/50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {gap.domain}
                    </span>
                    <h3 className="font-semibold text-sm text-slate-900">{gap.name}</h3>
                  </div>
                  {gap.rationale && (
                    <p className="text-xs text-slate-500 mt-1.5 max-w-2xl">{gap.rationale}</p>
                  )}
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Current / Target</span>
                    <span className="text-sm font-bold font-mono text-slate-800">
                      {gap.score} / {gap.target_score}
                    </span>
                  </div>
                  <div className="text-right w-20">
                    <span className="text-xs text-slate-400 block">Gap</span>
                    <span
                      className={`text-sm font-bold font-mono ${
                        gap.gap > 20
                          ? 'text-rose-600'
                          : gap.gap > 10
                          ? 'text-amber-600'
                          : 'text-emerald-600'
                      }`}
                    >
                      {gap.gap > 0 ? `-${gap.gap} pts` : 'Target Met'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-3">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    gap.score >= gap.target_score
                      ? 'bg-emerald-500'
                      : gap.score >= 60
                      ? 'bg-blue-600'
                      : 'bg-amber-500'
                  }`}
                  style={{ width: `${Math.min(gap.score, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Training Interventions */}
      {recommendations.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            AI-Recommended Training for {official.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.slice(0, 4).map(rec => (
              <div
                key={rec.course_id}
                className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-200 text-slate-700">
                      {rec.source} • {rec.duration_hrs || 16} hrs
                    </span>
                    <h3 className="font-semibold text-sm text-slate-900 mt-2">{rec.title}</h3>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {rec.score}% Match
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{rec.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
