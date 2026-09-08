import React, { useState } from 'react';
import { type OfficialDetail, type OfficialCreate, createOfficial } from '../services/api';
import { X, UserPlus, ShieldCheck, Buildings, Briefcase, GraduationCap, Trophy } from '@phosphor-icons/react';

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
    experience_years: 6,
    education: 'M.Sc. Statistics',
    past_trainings: ['Survey Sampling Methodology', 'Data Quality Audits'],
    role: 'learner',
  });

  const [trainingsInput, setTrainingsInput] = useState<string>(
    'Survey Sampling Methodology, Data Quality Audits'
  );
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setSubmitting(true);
    try {
      const parsedTrainings = trainingsInput
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const payload: OfficialCreate = {
        ...formData,
        past_trainings: parsedTrainings,
      };

      const newOfficial = await createOfficial(payload);
      onOfficialCreated(newOfficial);
      onClose();
    } catch (err) {
      console.error('Failed to create official:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[var(--mc-border-light)] relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 transition-colors text-[var(--mc-slate-gray)] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-[var(--mc-canvas)] flex items-center justify-center text-[var(--mc-ink)]">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[var(--mc-ink)]">Register MoSPI Official</h2>
            <p className="text-xs text-[var(--mc-slate-gray)]">
              Add a new official to track competency gaps and training paths
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--mc-ink)] mb-1.5">
              Full Official Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Dr. Rajesh Verma"
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
                <Buildings className="w-3.5 h-3.5 text-[var(--mc-light-orange)]" />
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
                <Trophy className="w-3.5 h-3.5 text-[var(--mc-light-orange)]" />
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
              <ShieldCheck className="w-4 h-4 text-[var(--mc-yellow)]" />
              <span>{submitting ? 'Registering...' : 'Register Official'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
