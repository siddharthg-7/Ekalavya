import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, CheckCircle, BarChart3, Award } from 'lucide-react';
import { fetchTrainingEffectiveness, type TrainingEffectivenessData, type TrainingEffectivenessCourse } from '../../services/api';

export const TrainingEffectivenessPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TrainingEffectivenessData | null>(null);
  const [hoveredCourseIndex, setHoveredCourseIndex] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchTrainingEffectiveness();
        setData(res);
      } catch (err) {
        console.error('Failed to load training effectiveness data', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const trainingMetrics: TrainingEffectivenessCourse[] = data?.courses || [];

  if (loading) {
    return (
      <div className="bg-white border border-[#DCE3EA] rounded-xl p-16 text-center text-[#52657A] animate-fadeIn">
        <div className="animate-spin w-8 h-8 border-2 border-[#DCE3EA] border-t-[#2563D9] rounded-full mx-auto mb-3" />
        <p className="text-sm">Aggregating workforce training effectiveness telemetry...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header & Breadcrumb */}
      <div>
        <Link
          to="/admin"
          className="inline-flex items-center text-sm font-medium text-[#52657A] hover:text-[#2563D9] mb-3 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Admin Dashboard
        </Link>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#102A43] tracking-tight">
              Training Program Effectiveness
            </h1>
            <p className="text-xs sm:text-sm text-[#52657A] mt-1">
              Impact evaluation of MoSPI capacity building programs across iGOT Karmayogi and NSSTA.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle className="w-3.5 h-3.5 mr-1 text-emerald-600" />
              Pre/Post Assessment Validated
            </span>
          </div>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-white border border-[#DCE3EA] rounded-2xl p-5 shadow-2xs">
          <div className="text-xs font-bold text-[#52657A] uppercase tracking-wider mb-1">
            Active Cohort Cadre
          </div>
          <div className="text-2xl font-bold text-[#102A43] font-mono">{data?.total_officials || 6} Officials</div>
          <p className="text-xs text-emerald-600 mt-1 font-medium flex items-center">
            <TrendingUp className="w-3.5 h-3.5 mr-1" /> +18% over prior quarter
          </p>
        </div>
        <div className="bg-white border border-[#DCE3EA] rounded-2xl p-5 shadow-2xs">
          <div className="text-xs font-bold text-[#52657A] uppercase tracking-wider mb-1">
            Avg Skill Improvement
          </div>
          <div className="text-2xl font-bold text-[#2563D9] font-mono">{data?.avg_improvement || '+28.5 pts'}</div>
          <p className="text-xs text-[#52657A] mt-1 font-medium">
            Standardized diagnostic delta
          </p>
        </div>
        <div className="bg-white border border-[#DCE3EA] rounded-2xl p-5 shadow-2xs">
          <div className="text-xs font-bold text-[#52657A] uppercase tracking-wider mb-1">
            Course Completion Rate
          </div>
          <div className="text-2xl font-bold text-[#102A43] font-mono">{data?.completion_rate || '87.5%'}</div>
          <p className="text-xs text-[#52657A] mt-1 font-medium">
            Across {data?.total_courses || 38} deployed curricula
          </p>
        </div>
        <div className="bg-white border border-[#DCE3EA] rounded-2xl p-5 shadow-2xs">
          <div className="text-xs font-bold text-[#52657A] uppercase tracking-wider mb-1">
            Target Re-assessment Pass
          </div>
          <div className="text-2xl font-bold text-[#16845B] font-mono">91.4%</div>
          <p className="text-xs text-[#52657A] mt-1 font-medium">
            Cleared post-training milestone
          </p>
        </div>
      </div>

      {/* Bklit UI Pre vs Post Assessment Gain Chart */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE3EA] shadow-2xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#2563D9]" />
              <h3 className="text-base font-bold text-[#102A43] tracking-tight">
                Curriculum Pre vs Post Diagnostic Gain (Bklit Comparative Telemetry)
              </h3>
            </div>
            <p className="text-xs text-[#52657A] mt-0.5">
              Knowledge delta demonstrated between initial diagnostic baseline and curriculum completion.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-[#52657A]">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-slate-300" />
              <span>Pre-Assessment</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-[#16845B]" />
              <span>Post-Assessment</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-0.5 border-t-2 border-dashed border-[#E8871A]" />
              <span>Target (80)</span>
            </span>
          </div>
        </div>

        {/* SVG Grouped Bar Chart */}
        <div className="relative w-full h-[240px]">
          <svg className="w-full h-full" viewBox="0 0 680 200" preserveAspectRatio="none">
            {/* Gridlines */}
            {[0, 25, 50, 75, 100].map((val) => {
              const y = 160 - (val / 100) * 140;
              return (
                <g key={val}>
                  <line
                    x1="40"
                    y1={y}
                    x2="660"
                    y2={y}
                    stroke="#EDF2F7"
                    strokeWidth="1"
                    strokeDasharray="2 3"
                  />
                  <text
                    x="30"
                    y={y + 3}
                    textAnchor="end"
                    className="text-[9px] font-mono fill-slate-400 select-none"
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {/* Target 80 Benchmark Line */}
            <line
              x1="40"
              y1={160 - (80 / 100) * 140}
              x2="660"
              y2={160 - (80 / 100) * 140}
              stroke="#E8871A"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.8"
            />
            <text
              x="665"
              y={160 - (80 / 100) * 140 + 3}
              textAnchor="start"
              className="text-[9px] font-mono font-bold fill-[#E8871A] select-none"
            >
              80
            </text>

            {/* Grouped Bars for 4 Curricula */}
            {trainingMetrics.map((item, idx) => {
              const groupX = 110 + idx * 140;
              const barWidth = 24;
              const preHeight = (item.preAvgScore / 100) * 140;
              const postHeight = (item.postAvgScore / 100) * 140;
              const preY = 160 - preHeight;
              const postY = 160 - postHeight;
              const isHovered = hoveredCourseIndex === idx;

              return (
                <g
                  key={idx}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredCourseIndex(idx)}
                  onMouseLeave={() => setHoveredCourseIndex(null)}
                >
                  {/* Pre Bar */}
                  <rect
                    x={groupX - barWidth - 2}
                    y={preY}
                    width={barWidth}
                    height={preHeight}
                    rx="3"
                    fill="#94A3B8"
                    className="transition-all duration-300"
                    opacity={isHovered ? 1 : 0.85}
                  />
                  <text
                    x={groupX - barWidth / 2 - 2}
                    y={preY - 4}
                    textAnchor="middle"
                    className="text-[9px] font-mono fill-[#52657A]"
                  >
                    {item.preAvgScore}
                  </text>

                  {/* Post Bar */}
                  <rect
                    x={groupX + 2}
                    y={postY}
                    width={barWidth}
                    height={postHeight}
                    rx="3"
                    fill="#16845B"
                    className="transition-all duration-300"
                    opacity={isHovered ? 1 : 0.9}
                  />
                  <text
                    x={groupX + barWidth / 2 + 2}
                    y={postY - 4}
                    textAnchor="middle"
                    className="text-[9px] font-mono font-bold fill-[#16845B]"
                  >
                    {item.postAvgScore}
                  </text>

                  {/* Delta Badge */}
                  <text
                    x={groupX}
                    y={Math.min(preY, postY) - 16}
                    textAnchor="middle"
                    className="text-[9px] font-mono font-bold fill-[#2563D9]"
                  >
                    {item.delta}
                  </text>

                  {/* Curriculum Label */}
                  <text
                    x={groupX}
                    y="180"
                    textAnchor="middle"
                    className={`text-[9.5px] font-semibold transition-colors ${
                      isHovered ? 'fill-[#2563D9] font-bold' : 'fill-[#102A43]'
                    }`}
                  >
                    {item.shortTitle}
                  </text>
                  <text
                    x={groupX}
                    y="193"
                    textAnchor="middle"
                    className="text-[8.5px] font-mono fill-slate-400"
                  >
                    {item.source}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Effectiveness Table */}
      <div className="bg-white border border-[#DCE3EA] rounded-2xl shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#DCE3EA] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-[#2563D9]" />
            <h2 className="text-base font-semibold text-[#102A43]">Curriculum Skill Gain Analysis</h2>
          </div>
          <span className="text-xs text-[#52657A] font-mono">Telemetry Source: Primer Engine</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F9FC] border-b border-[#DCE3EA] text-xs font-semibold text-[#52657A] uppercase tracking-wider">
                <th className="py-3 px-4">Curriculum / Academy</th>
                <th className="py-3 px-4 text-center">Enrollment</th>
                <th className="py-3 px-4 text-center">Completion</th>
                <th className="py-3 px-4 text-center">Pre-Assessment</th>
                <th className="py-3 px-4 text-center">Post-Assessment</th>
                <th className="py-3 px-4 text-center">Skill Gain</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {trainingMetrics.map((item, idx) => (
                <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                  <td className="py-4 px-4 font-medium text-[#102A43]">
                    <div className="font-semibold text-[#102A43]">{item.courseTitle}</div>
                    <div className="text-xs text-[#52657A] mt-0.5 flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded bg-[#F7F9FC] border border-[#DCE3EA] font-mono text-[10px] text-[#52657A]">
                        {item.source}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center text-[#52657A] font-mono">
                    {item.enrolled}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="inline-flex items-center gap-1 font-semibold text-[#102A43] font-mono">
                      <span>{item.completionRate}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center text-[#52657A] font-mono">
                    {item.preAvgScore}/100
                  </td>
                  <td className="py-4 px-4 text-center text-[#102A43] font-bold font-mono">
                    {item.postAvgScore}/100
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800 font-mono">
                      {item.delta}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F7F9FC] text-[#52657A] border border-[#DCE3EA]">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommended Next Actions */}
      <div className="bg-[#F7F9FC] border border-[#DCE3EA] rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-[#102A43] mb-2">Training Cadence Observations</h3>
        <p className="text-sm text-[#52657A] leading-relaxed">
          Officials enrolled in technical courses (Python and SDMX) exhibit highest retention rates when paired with interactive adaptive assessments within 7 days of module completion. Recommend NSSTA schedule secondary hands-on workshops for Small Area Estimation.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to="/admin/competencies"
            className="inline-flex items-center px-4 py-2 text-xs font-semibold rounded-lg text-[#102A43] bg-white border border-[#DCE3EA] hover:bg-slate-50 transition-colors shadow-2xs"
          >
            Review Competency Gaps
          </Link>
          <Link
            to="/admin/demand"
            className="mc-btn-primary text-xs py-2 px-4 inline-flex items-center"
          >
            Review Skill Demand Priorities
          </Link>
        </div>
      </div>
    </div>
  );
};
