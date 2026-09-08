import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { generateQuizFromDocument, resetSimulatedSession } from '../../services/api';
import { UploadCloud, FileText, ArrowRight, ArrowLeft, AlertTriangle } from 'lucide-react';

export const AssessmentGenerationPage: React.FC = () => {
  const navigate = useNavigate();
  const { session } = useAuth();

  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sampleManuals = [
    {
      name: 'Foundations_of_Survey_Design_for_Official_Statistics_Complete_Manual.pdf',
      title: 'Survey Design & Sampling Architecture',
      pages: '48 pages',
      domain: 'Statistical Methodology'
    },
    {
      name: 'Advanced_Sample_Survey_Design_Complete_Manual.pdf',
      title: 'Weight Calibration & Small Area Estimation',
      pages: '64 pages',
      domain: 'Advanced Statistics'
    },
    {
      name: 'Professional_Communication_for_Government_Officials_Complete_Manual.pdf',
      title: 'Inter-Ministerial Briefings & Reporting',
      pages: '32 pages',
      domain: 'Behavioural Leadership'
    },
    {
      name: 'Project_Management_for_Government_Programmes_Complete_Manual.pdf',
      title: 'MoSPI Scheme Monitoring & Audit',
      pages: '40 pages',
      domain: 'Governance & Execution'
    }
  ];

  const handleStartWithFile = async (file: File) => {
    if (!session.officialId) return;
    setUploading(true);
    setErrorMessage(null);
    resetSimulatedSession();

    try {
      const res = await generateQuizFromDocument(file, session.officialId);
      // Navigate to adaptive assessment route with session_id
      navigate(`/learner/assessments/${res.session_id}`, {
        state: { title: res.title }
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to generate assessment from document.');
      setUploading(false);
    }
  };

  const handleSelectSample = async (sampleName: string) => {
    setSelectedFileName(sampleName);
    setUploading(true);
    setErrorMessage(null);

    try {
      const resp = await fetch(`/sample_materials/${sampleName}`);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const blob = await resp.blob();
      const realFile = new File([blob], sampleName, { type: 'application/pdf' });
      await handleStartWithFile(realFile);
    } catch (err: any) {
      console.warn('Real PDF fallback:', err.message);
      const mockFile = new File(['%PDF-1.4 sample content for MoSPI training'], sampleName, {
        type: 'application/pdf'
      });
      await handleStartWithFile(mockFile);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFileName(file.name);
      handleStartWithFile(file);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-2">
      <button
        onClick={() => navigate('/learner/assessments')}
        className="text-xs font-semibold text-[var(--mc-slate-gray)] hover:text-[var(--mc-ink)] flex items-center gap-1.5 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Assessments</span>
      </button>

      <div>
        <div className="mc-eyebrow mb-1">
          <span className="mc-eyebrow-dot" />
          <span>DOCUMENT DIAGNOSTIC ENGINE</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-medium text-[var(--mc-ink)]">
          Generate Adaptive Assessment
        </h1>
        <p className="text-xs sm:text-sm text-[var(--mc-slate-gray)] mt-1">
          Upload a MoSPI manual (PDF or PPTX) or launch with pre-loaded official training materials.
        </p>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
        className="bg-white rounded-[36px] p-10 sm:p-14 border-2 border-dashed border-[var(--mc-border-light)] hover:border-[var(--mc-ink)] text-center transition-all cursor-pointer shadow-xs group"
      >
        <div className="max-w-md mx-auto flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-[var(--mc-canvas)] text-[var(--mc-ink)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-8 h-8 text-[var(--mc-signal-orange)]" />
          </div>

          <h3 className="text-xl font-medium text-[var(--mc-ink)] mb-2">
            Drop your training material here
          </h3>
          <p className="text-xs text-[var(--mc-slate-gray)] mb-6">
            Supports official PDF or PPTX manuals. The AI parses tables, formulas, and definitions.
          </p>

          <label className="mc-btn-primary cursor-pointer text-xs py-2.5 px-6">
            <span>Browse Local Document</span>
            <input
              type="file"
              accept=".pdf,.pptx"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  setSelectedFileName(file.name);
                  handleStartWithFile(file);
                }
              }}
            />
          </label>

          {uploading && (
            <div className="mt-6 flex items-center gap-2.5 text-xs text-[var(--mc-granite)]">
              <div className="w-4 h-4 border-2 border-[var(--mc-ink)] border-t-transparent rounded-full animate-spin" />
              <span>Analyzing {selectedFileName || 'document'} and constructing adaptive session...</span>
            </div>
          )}

          {errorMessage && (
            <div className="mt-4 p-3 rounded-2xl bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      </div>

      {/* 1-Click Preloaded Manuals */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-[var(--mc-ink)]">
              Or Select Official MoSPI Curriculum Manual
            </h3>
            <p className="text-xs text-[var(--mc-slate-gray)]">
              Pre-loaded PDFs for instant demonstration testing
            </p>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[var(--mc-canvas)] text-[var(--mc-granite)]">
            Instant Test
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sampleManuals.map((manual) => (
            <div
              key={manual.name}
              onClick={() => handleSelectSample(manual.name)}
              className="bg-white rounded-2xl p-5 border border-[var(--mc-border-light)] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-xl bg-[var(--mc-canvas)] text-[var(--mc-signal-orange)] flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--mc-slate-gray)] bg-[var(--mc-canvas)] px-2 py-0.5 rounded-full">
                    {manual.pages}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-[var(--mc-ink)] group-hover:text-[var(--mc-signal-orange)] transition-colors mb-1">
                  {manual.title}
                </h4>
                <p className="text-xs text-[var(--mc-slate-gray)]">
                  {manual.domain}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[var(--mc-ink)]">
                <span>Launch Quiz</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
