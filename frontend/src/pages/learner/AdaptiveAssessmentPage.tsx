import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  getNextQuestion, 
  submitQuizAnswer, 
  parseOptionLetter, 
  cleanOptionBody, 
  type QuizQuestion, 
  type AnswerResponse 
} from '../../services/api';
import { 
  Brain, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight
} from 'lucide-react';

export const AdaptiveAssessmentPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const quizTitle = location.state?.title || 'Adaptive Diagnostic Session';

  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [answerResult, setAnswerResult] = useState<AnswerResponse | null>(null);
  const [loadingQuestion, setLoadingQuestion] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [questionCount, setQuestionCount] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  // Load next question from backend
  const loadNext = async () => {
    if (!sessionId) return;
    setLoadingQuestion(true);
    setSelectedLetter(null);
    setAnswerResult(null);
    setError(null);

    try {
      const q = await getNextQuestion(sessionId);
      if ('question' in q) {
        setCurrentQuestion(q);
      } else if (q.status === 'completed') {
        // Completed -> route to result page
        navigate(`/learner/assessments/${sessionId}/result`, { replace: true });
      } else {
        throw new Error('Unexpected question response.');
      }
    } catch (err: any) {
      console.error('Failed to load next question:', err);
      setError('Unable to fetch the next adaptive question.');
    } finally {
      setLoadingQuestion(false);
    }
  };

  useEffect(() => {
    loadNext();
  }, [sessionId]);

  const handleSubmit = async () => {
    if (!selectedLetter || !currentQuestion || !sessionId) return;

    setSubmitting(true);
    try {
      const res = await submitQuizAnswer({
        session_id: sessionId,
        question_id: currentQuestion.question_id,
        selected_option: selectedLetter,
      });
      setAnswerResult(res);
    } catch (err) {
      console.error('Submission error:', err);
      setError('Failed to submit your response. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = () => {
    if (answerResult?.session_status === 'completed') {
      navigate(`/learner/assessments/${sessionId}/result`, { replace: true });
    } else {
      setQuestionCount((prev) => prev + 1);
      loadNext();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-2">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--mc-border-light)]">
        <div className="flex items-center gap-3">
          <span className="text-[11px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-[var(--mc-canvas)] text-[var(--mc-granite)]">
            Question #{questionCount}
          </span>
          <span className="text-xs text-[var(--mc-slate-gray)] font-medium truncate max-w-[200px] sm:max-w-md">
            {quizTitle}
          </span>
        </div>

        {currentQuestion && (
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-bold px-3 py-0.5 rounded-full border ${
              currentQuestion.difficulty === 'Advanced'
                ? 'bg-purple-50 text-purple-700 border-purple-200'
                : currentQuestion.difficulty === 'Intermediate'
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>
              Level: {currentQuestion.difficulty}
            </span>

            {currentQuestion.is_remedial && (
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FFF5F2] text-[var(--mc-signal-orange)] border border-[var(--mc-signal-orange)]/30 flex items-center gap-1">
                <Brain className="w-3 h-3" />
                Remedial
              </span>
            )}
          </div>
        )}
      </div>

      {/* Remedial Intervention Cue */}
      {currentQuestion?.is_remedial && (
        <div className="p-4 rounded-2xl bg-[#FFF5F2] border border-[var(--mc-signal-orange)]/20 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-[var(--mc-signal-orange)] shrink-0 mt-0.5" />
          <div className="text-xs">
            <h4 className="font-bold uppercase tracking-wider text-[var(--mc-signal-orange)]">
              Reinforcing Core Concept: {currentQuestion.competency_name}
            </h4>
            <p className="text-[var(--mc-granite)] mt-0.5">
              The AI identified ambiguity in prior responses. This foundational check reinforces core principles before climbing back up.
            </p>
          </div>
        </div>
      )}

      {/* Loading state */}
      {loadingQuestion && (
        <div className="bg-white rounded-[32px] p-16 text-center border border-[var(--mc-border-light)] text-xs text-[var(--mc-slate-gray)] flex flex-col items-center justify-center gap-3">
          <div className="w-6 h-6 border-2 border-[var(--mc-ink)] border-t-transparent rounded-full animate-spin" />
          <span>Adapting your next question from the curriculum...</span>
        </div>
      )}

      {/* Error state */}
      {error && !loadingQuestion && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={loadNext}
            className="font-bold underline cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* Active Question Card */}
      {!loadingQuestion && currentQuestion && (
        <div className="bg-white rounded-[36px] p-8 sm:p-10 border border-[var(--mc-border-light)] shadow-sm space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--mc-slate-gray)]">
              Target Competency: <strong className="text-[var(--mc-ink)]">{currentQuestion.competency_name}</strong>
            </span>
            <h2 className="text-xl sm:text-2xl font-medium text-[var(--mc-ink)] leading-snug mt-2">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const optLetter = parseOptionLetter(option, idx);
              const optBody = cleanOptionBody(option);
              const isSelected = selectedLetter === optLetter;
              const isAnswered = answerResult !== null;

              const isCorrectOption = isAnswered && (
                answerResult.correct_option.trim().toUpperCase() === optLetter ||
                cleanOptionBody(answerResult.correct_option).toLowerCase() === optBody.toLowerCase()
              );
              const isWrongSelection = isAnswered && isSelected && !answerResult.is_correct;

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => setSelectedLetter(optLetter)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-start gap-4 cursor-pointer ${
                    isCorrectOption
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-medium'
                      : isWrongSelection
                        ? 'bg-red-50 border-red-400 text-red-950 font-medium'
                        : isSelected
                          ? 'bg-[var(--mc-canvas)] border-[var(--mc-ink)] text-[var(--mc-ink)] font-medium shadow-xs'
                          : 'bg-white hover:bg-gray-50 border-gray-200 text-[var(--mc-granite)]'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                    isCorrectOption
                      ? 'bg-emerald-600 text-white'
                      : isWrongSelection
                        ? 'bg-red-600 text-white'
                        : isSelected
                          ? 'bg-[var(--mc-ink)] text-white'
                          : 'border border-gray-300 text-gray-500'
                  }`}>
                    {optLetter}
                  </div>
                  <span className="text-xs sm:text-sm leading-relaxed flex-1 pt-1">
                    {optBody}
                  </span>
                  {isCorrectOption && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
                  {isWrongSelection && <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />}
                </button>
              );
            })}
          </div>

          {/* Submit / Next Button */}
          {!answerResult ? (
            <div className="flex justify-end pt-2">
              <button
                disabled={!selectedLetter || submitting}
                onClick={handleSubmit}
                className={`mc-btn-primary px-8 py-3 text-xs flex items-center gap-2 ${
                  !selectedLetter || submitting ? 'opacity-40 cursor-not-allowed' : ''
                }`}
              >
                <span>{submitting ? 'Evaluating...' : 'Submit Answer'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-gray-100 space-y-4 animate-in fade-in duration-150">
              <div className={`p-4 rounded-2xl border ${
                answerResult.is_correct
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-[#FFF5F2] border-[var(--mc-signal-orange)]/20 text-amber-950'
              }`}>
                <div className="flex items-center gap-2 font-semibold text-xs mb-1">
                  {answerResult.is_correct ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Correct Analysis</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 text-[var(--mc-signal-orange)]" />
                      <span>Conceptual Discrepancy</span>
                    </>
                  )}
                </div>
                <p className="text-xs leading-relaxed">
                  {answerResult.explanation}
                </p>

                {/* Adaptive Action Notice */}
                <div className="mt-3 pt-2.5 border-t border-black/5 flex items-center justify-between text-[11px] font-semibold">
                  <span>Engine Action:</span>
                  <span className="uppercase tracking-wider">
                    {answerResult.action === 'escalate' && '⚡ Consecutive Correct • Escalating Level'}
                    {answerResult.action === 'remediate' && `🔄 Reinforcing: ${answerResult.concept_name}`}
                    {answerResult.action === 'continue' && '➡️ Calibrating Assessment Queue'}
                    {answerResult.action === 'session_complete' && '🏁 Assessment Completed'}
                  </span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="mc-btn-primary px-8 py-3 text-xs flex items-center gap-2"
                >
                  <span>
                    {answerResult.session_status === 'completed'
                      ? 'View Assessment Result'
                      : 'Next Question'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
