import React, { useState } from 'react';
import { type OfficialDetail, type OfficialCreate, createOfficial } from '../services/api';
import { X, UserPlus, Sparkles, Building, Briefcase, GraduationCap, Award } from 'lucide-react';

interface CreateOfficialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOfficialCreated: (official: OfficialDetail) => void;
}

export const CreateOfficialModal: React.FC<CreateOfficialModalProps> = ({
  isOpen,
  onClose,
  onOfficialCreated,
}) => {
  const [formData, setFormData] = useState<OfficialCreate>({
    name: '',
    designation: 'Senior Statistical Officer',
    department: 'Survey Design & Research Division (SDRD)',
    job_role: 'Survey Sampling & Estimation',
    education: 'M.Stat / M.Sc. Statistics',
    experience_years: 5,
    past_trainings: ['Official Statistics Induction'],
    role: 'learner',
  });
  const [trainingsInput, setTrainingsInput] = useState('Official Statistics Induction, PLFS Methodology');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setSubmitting(true);
    try {
      const past_trainings = trainingsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const created = await createOfficial({
        ...formData,
        past_trainings,
      });

      onOfficialCreated(created);
      onClose();
    } catch (err) {
      console.error('Failed to create official:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-[32px] max-w-xl w-full p-8 shadow-2xl border border-[var(--mc-border-light)] relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[var(--mc-canvas)] text-[var(--mc-ink)] hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--mc-canvas)] text-[var(--mc-signal-orange)] text-xs font-bold uppercase tracking-wider mb-2">
            <UserPlus className="w-3.5 h-3.5" />
            <span>Profile Provisioning</span>
          </div>
          <h2 className="text-2xl font-medium text-[var(--mc-ink)] tracking-tight">
            Register MoSPI Cadre Official
          </h2>
          <p className="text-xs text-[var(--mc-slate-gray)] mt-1">
            Creates a live profile in the database. The AI baseline engine will instantly evaluate their job role, department, and past trainings to compute baseline competency scores.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--mc-ink)] mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Dr. Vikramaditya Sen"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl bg-[var(--mc-canvas)] border border-transparent focus:border-[var(--mc-ink)] outline-none text-sm text-[var(--mc-ink)]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--mc-ink)] mb-1.5 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[var(--mc-light-orange)]" />
                <span>Designation</span>
              </label>
              <input
                type="text"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl bg-[var(--mc-canvas)] border border-transparent focus:border-[var(--mc-ink)] outline-none text-sm text-[var(--mc-ink)]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--mc-ink)] mb-1.5 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[var(--mc-light-orange)]" />
                <span>Department</span>
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl bg-[var(--mc-canvas)] border border-transparent focus:border-[var(--mc-ink)] outline-none text-sm text-[var(--mc-ink)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--mc-ink)] mb-1.5">
                Specific Job Role
              </label>
              <input
                type="text"
                value={formData.job_role}
                onChange={(e) => setFormData({ ...formData, job_role: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl bg-[var(--mc-canvas)] border border-transparent focus:border-[var(--mc-ink)] outline-none text-sm text-[var(--mc-ink)]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--mc-ink)] mb-1.5 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[var(--mc-light-orange)]" />
                <span>Experience (Years)</span>
              </label>
              <input
                type="number"
                min="0"
                max="45"
                value={formData.experience_years}
                onChange={(e) => setFormData({ ...formData, experience_years: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-2xl bg-[var(--mc-canvas)] border border-transparent focus:border-[var(--mc-ink)] outline-none text-sm text-[var(--mc-ink)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--mc-ink)] mb-1.5 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-[var(--mc-light-orange)]" />
              <span>Academic Background</span>
            </label>
            <input
              type="text"
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl bg-[var(--mc-canvas)] border border-transparent focus:border-[var(--mc-ink)] outline-none text-sm text-[var(--mc-ink)]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--mc-ink)] mb-1.5">
              Past Completed Trainings (comma separated)
            </label>
            <textarea
              rows={2}
              value={trainingsInput}
              onChange={(e) => setTrainingsInput(e.target.value)}
              placeholder="e.g. Survey Sampling NSSTA, Python Data Science iGOT"
              className="w-full px-4 py-2.5 rounded-2xl bg-[var(--mc-canvas)] border border-transparent focus:border-[var(--mc-ink)] outline-none text-sm text-[var(--mc-ink)] resize-none"
            />
          </div>

          {/* Action CTA */}
          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-full text-xs font-semibold text-[var(--mc-granite)] hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !formData.name.trim()}
              className="mc-btn-primary flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[var(--mc-yellow)]" />
              <span>{submitting ? 'Registering...' : 'Register Official'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
