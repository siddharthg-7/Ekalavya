import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { type LearnerDashboardData, fetchLearnerDashboard } from '../../services/api';
import { Brain, Plus, Clock, CheckCircle2, Award, ArrowRight, ArrowLeft } from 'lucide-react';

export const AssessmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [data, setData] = useState<LearnerDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!session.officialId) return;
      setLoading(true);
      try {
        const res = await fetchLearnerDashboard(session.officialId);
        setData(res);
      } catch (e) {
        console.error('Failed to load assessments:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [session.officialId]);

  const attempts = data?.quiz_attempts || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/learner')}
            className="text-xs font-semibold text-[#52657A] hover:text-[#2563D9] flex items-center gap-1.5 cursor-pointer mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>
          <div className="mc-eyebrow mb-1">
            <span className="mc-eyebrow-dot" />
            <span>ASSESSMENT ENGINE</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#102A43] tracking-tight">
            Diagnostic Assessments
          </h1>
          <p className="text-xs sm:text-sm text-[#52657A] mt-1">
            Adaptive, generative evaluations powered by Gemini and calibrated to your competency gaps.
          </p>
        </div>

        <button
          onClick={() => navigate('/learner/assessments/new')}
          className="mc-btn-primary self-start sm:self-auto flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Assessment</span>
        </button>
      </div>

      {/* Hero CTA Box */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE3EA] shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-[#2563D9] flex items-center justify-center shrink-0 border border-blue-100">
            <Brain className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#102A43]">
              Evaluate Knowledge from Training Manuals
            </h3>
            <p className="text-xs text-[#52657A] mt-0.5 max-w-xl">
              Upload any PDF or PPT training document. The AI extracts concepts, determines your starting difficulty, and runs a real-time remedial check on incorrect responses.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/learner/assessments/new')}
          className="mc-btn-primary px-6 py-3 text-xs shrink-0 flex items-center gap-2"
        >
          <span>Start Assessment</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Past Assessment History */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-[#102A43]">
          Completed Diagnostic Sessions ({attempts.length})
        </h3>

        {loading ? (
          <div className="py-12 text-center text-xs text-[#52657A]">
            Loading past assessment records...
          </div>
        ) : attempts.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-[#DCE3EA] text-xs text-[#52657A]">
            No completed assessments yet. Click "Create New Assessment" to generate your first adaptive diagnostic.
          </div>
        ) : (
          <div className="space-y-4">
            {attempts.map((att, idx) => (
              <div
                key={att.id || idx}
                className="bg-white rounded-2xl p-5 border border-[#DCE3EA] hover:border-[#2563D9]/40 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#102A43] text-white flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-[#8CCBFF]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-[#102A43]">
                        Adaptive Assessment Diagnostic
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono">
                        Score: {att.score} / {att.total}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {att.concepts_mastered && att.concepts_mastered.map((cm, i) => (
                        <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {cm} (+10 pts)
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-[#52657A] flex items-center gap-1.5 self-end sm:self-center font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{new Date(att.taken_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
