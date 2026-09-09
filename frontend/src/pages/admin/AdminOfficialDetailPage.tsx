import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Briefcase,
  GraduationCap,
  Calendar,
  AlertCircle,
  BookOpen,
  BarChart3
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
      <div className="bg-white border border-[#DCE3EA] rounded-2xl p-16 text-center text-[#52657A] animate-fadeIn">
        <div className="animate-spin w-8 h-8 border-2 border-[#DCE3EA] border-t-[#2563D9] rounded-full mx-auto mb-3" />
        <p className="text-sm">Loading official dossier & competency telemetry...</p>
      </div>
    );
  }

  if (error || !official) {
    return (
      <div className="bg-white border border-[#DCE3EA] rounded-2xl p-12 text-center text-[#52657A] animate-fadeIn">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
        <h2 className="text-lg font-bold text-[#102A43] mb-2">Official Record Not Found</h2>
        <p className="text-sm text-[#52657A] max-w-md mx-auto mb-6">
          {error || `Unable to locate official profile for identifier: ${id}`}
        </p>
        <Link
          to="/admin/officials"
          className="mc-btn-primary inline-flex items-center px-4 py-2 text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Return to Officials Directory
        </Link>
      </div>
    );
  }

  // Domain grouped data for Bklit Radar
  const domainRadarItems = [
    { label: 'Statistical Methodology', domain: 'Statistical', target: 80 },
    { label: 'Technical & Python ETL', domain: 'Technical', target: 80 },
    { label: 'Digital Governance & SDMX', domain: 'DigitalGovernance', target: 80 },
    { label: 'Behavioural Leadership', domain: 'Behavioural', target: 80 },
  ].map(d => {
    const matching = gaps.filter(g => g.domain.toLowerCase() === d.domain.toLowerCase());
    const avgScore = matching.length > 0
      ? Math.round(matching.reduce((acc, curr) => acc + curr.score, 0) / matching.length)
      : 70;
    return {
      ...d,
      current: avgScore,
      gap: Math.max(0, d.target - avgScore),
    };
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header & Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-xs text-[#52657A] mb-3">
          <Link to="/admin" className="hover:text-[#2563D9] transition-colors">
            Admin
          </Link>
          <span>/</span>
          <Link to="/admin/officials" className="hover:text-[#2563D9] transition-colors">
            Officials
          </Link>
          <span>/</span>
          <span className="text-[#102A43] font-semibold">{official.name}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-[#102A43] text-white font-bold text-xl flex items-center justify-center shrink-0">
              {official.name
                .split(' ')
                .map(n => n[0])
                .join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-[#102A43]">{official.name}</h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-[#F7F9FC] text-[#52657A] border border-[#DCE3EA]">
                  {official.id}
                </span>
              </div>
              <p className="text-sm font-medium text-[#52657A] mt-0.5">{official.designation}</p>
            </div>
          </div>

          <Link
            to="/admin/officials"
            className="inline-flex items-center text-sm font-medium text-[#52657A] hover:text-[#2563D9] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Officials
          </Link>
        </div>
      </div>

      {/* Dossier Card */}
      <div className="bg-white border border-[#DCE3EA] rounded-2xl p-6 shadow-xs">
        <h2 className="text-xs font-bold text-[#52657A] uppercase tracking-wider mb-4">
          Cadre Profile & Service Dossier
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          <div>
            <div className="text-xs text-[#52657A] flex items-center gap-1.5 mb-1">
              <Building2 className="w-3.5 h-3.5" /> Department / Division
            </div>
            <div className="font-semibold text-[#102A43]">{official.department}</div>
          </div>

          <div>
            <div className="text-xs text-[#52657A] flex items-center gap-1.5 mb-1">
              <Briefcase className="w-3.5 h-3.5" /> Operational Role
            </div>
            <div className="font-semibold text-[#102A43]">{official.job_role || 'Statistical Officer'}</div>
          </div>

          <div>
            <div className="text-xs text-[#52657A] flex items-center gap-1.5 mb-1">
              <GraduationCap className="w-3.5 h-3.5" /> Academic Qualification
            </div>
            <div className="font-semibold text-[#102A43]">{official.education || 'N/A'}</div>
          </div>

          <div>
            <div className="text-xs text-[#52657A] flex items-center gap-1.5 mb-1">
              <Calendar className="w-3.5 h-3.5" /> Experience
            </div>
            <div className="font-semibold text-[#102A43]">
              {official.experience_years ? `${official.experience_years} years in service` : 'N/A'}
            </div>
          </div>
        </div>

        {official.past_trainings && official.past_trainings.length > 0 && (
          <div className="mt-5 pt-4 border-t border-slate-100">
            <span className="text-xs font-bold text-[#52657A] uppercase tracking-wider block mb-2">
              Prior MoSPI / NSSTA Completed Trainings
            </span>
            <div className="flex flex-wrap gap-2">
              {official.past_trainings.map((t, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-[#F7F9FC] text-[#52657A] text-xs rounded-md border border-[#DCE3EA]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bklit UI Individual Competency Radar */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE3EA] shadow-2xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#2563D9]" />
              <h3 className="text-base font-bold text-[#102A43] tracking-tight">
                Official Capability Radar (Bklit Geometric Telemetry)
              </h3>
            </div>
            <p className="text-xs text-[#52657A] mt-0.5">
              Domain polygon calibration compared against the 80.0 national cadre requirement.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-[#52657A]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2563D9]" />
              <span>Evaluated Mastery</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-0.5 border-t-2 border-dashed border-[#E8871A]" />
              <span>Target Benchmark (80)</span>
            </span>
          </div>
        </div>

        {/* SVG Radar */}
        <div className="relative w-full h-[260px] flex items-center justify-center my-2">
          <svg className="w-full h-full" viewBox="-160 -160 320 320">
            {/* Concentric rings */}
            {[0.25, 0.5, 0.75, 1.0].map((r, i) => (
              <circle
                key={i}
                cx="0"
                cy="0"
                r={120 * r}
                fill="none"
                stroke="#EDF2F7"
                strokeWidth="0.8"
                strokeDasharray={i === 3 ? "0" : "2 3"}
              />
            ))}

            {/* Target 80 Polygon */}
            {(() => {
              const benchPoints = domainRadarItems.map((d, i) => {
                const angle = (i * 2 * Math.PI) / domainRadarItems.length - Math.PI / 2;
                const r = (d.target / 100) * 120;
                return `${r * Math.cos(angle)},${r * Math.sin(angle)}`;
              }).join(' ');

              return (
                <polygon
                  points={benchPoints}
                  fill="none"
                  stroke="#E8871A"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                  opacity={0.7}
                />
              );
            })()}

            {/* Axes & Labels */}
            {domainRadarItems.map((d, i) => {
              const angle = (i * 2 * Math.PI) / domainRadarItems.length - Math.PI / 2;
              const x = 120 * Math.cos(angle);
              const y = 120 * Math.sin(angle);
              const labelX = 142 * Math.cos(angle);
              const labelY = 142 * Math.sin(angle);

              return (
                <g key={d.domain}>
                  <line
                    x1="0"
                    y1="0"
                    x2={x}
                    y2={y}
                    stroke="#DCE3EA"
                    strokeWidth="0.8"
                  />
                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor={labelX > 10 ? 'start' : labelX < -10 ? 'end' : 'middle'}
                    dominantBaseline="central"
                    className="text-[9.5px] font-semibold fill-[#102A43]"
                  >
                    {d.domain} ({d.current})
                  </text>
                </g>
              );
            })}

            {/* Current Score Polygon */}
            {(() => {
              const points = domainRadarItems.map((d, i) => {
                const angle = (i * 2 * Math.PI) / domainRadarItems.length - Math.PI / 2;
                const r = (d.current / 100) * 120;
                return `${r * Math.cos(angle)},${r * Math.sin(angle)}`;
              }).join(' ');

              return (
                <polygon
                  points={points}
                  fill="rgba(37, 99, 217, 0.16)"
                  stroke="#2563D9"
                  strokeWidth="2.5"
                />
              );
            })()}

            {/* Data Points */}
            {domainRadarItems.map((d, i) => {
              const angle = (i * 2 * Math.PI) / domainRadarItems.length - Math.PI / 2;
              const r = (d.current / 100) * 120;
              const cx = r * Math.cos(angle);
              const cy = r * Math.sin(angle);

              return (
                <circle
                  key={d.domain}
                  cx={cx}
                  cy={cy}
                  r={4.5}
                  fill="#FFFFFF"
                  stroke="#2563D9"
                  strokeWidth="2.5"
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Competency Gap Analysis */}
      <div className="bg-white border border-[#DCE3EA] rounded-2xl shadow-xs overflow-hidden">
        <div className="p-6 border-b border-[#DCE3EA] flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-[#102A43]">Competency Mastery & Gap Matrix</h2>
            <p className="text-xs text-[#52657A] mt-0.5">
              Live diagnostic evaluation evaluated against MoSPI job framework standards
            </p>
          </div>
          <span className="text-xs font-mono text-[#52657A]">{gaps.length} Evaluated Dimensions</span>
        </div>

        <div className="divide-y divide-slate-100">
          {gaps.map(gap => (
            <div key={gap.competency_id} className="p-6 hover:bg-blue-50/20 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#F7F9FC] text-[#52657A] border border-[#DCE3EA]">
                      {gap.domain}
                    </span>
                    <h3 className="font-semibold text-sm text-[#102A43]">{gap.name}</h3>
                  </div>
                  {gap.rationale && (
                    <p className="text-xs text-[#52657A] mt-1.5 max-w-2xl">{gap.rationale}</p>
                  )}
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-xs text-[#52657A] block">Current / Target</span>
                    <span className="text-sm font-bold font-mono text-[#102A43]">
                      {gap.score} / {gap.target_score}
                    </span>
                  </div>
                  <div className="text-right w-24">
                    <span className="text-xs text-[#52657A] block">Status</span>
                    <span
                      className={`text-xs font-bold font-mono px-2 py-0.5 rounded-full ${
                        gap.gap >= 20
                          ? 'bg-amber-50 text-[#E8871A] border border-amber-200'
                          : gap.gap > 0
                          ? 'bg-blue-50 text-[#2563D9] border border-blue-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
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
                      ? 'bg-[#16845B]'
                      : 'bg-[#2563D9]'
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
        <div className="bg-white border border-[#DCE3EA] rounded-2xl p-6 shadow-xs">
          <h2 className="text-base font-semibold text-[#102A43] mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#2563D9]" />
            AI-Recommended Training for {official.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.slice(0, 4).map(rec => (
              <div
                key={rec.course_id}
                className="border border-[#DCE3EA] rounded-2xl p-4 bg-[#F7F9FC] hover:border-[#2563D9]/40 hover:bg-white transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white text-[#52657A] border border-[#DCE3EA]">
                      {rec.source} • {rec.duration_hrs || 16} hrs
                    </span>
                    <h3 className="font-semibold text-sm text-[#102A43] mt-2">{rec.title}</h3>
                  </div>
                  <span className="text-xs font-bold text-[#16845B] font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {rec.score}% Match
                  </span>
                </div>
                <p className="text-xs text-[#52657A] mt-2 leading-relaxed">{rec.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
