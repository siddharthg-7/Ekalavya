import React from 'react';
import { Target, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface SkillGapVisualProps {
  isActive?: boolean;
}

export const SkillGapVisual: React.FC<SkillGapVisualProps> = ({ isActive = true }) => {
  const gaps = [
    {
      title: 'Python Automated Survey Data & ETL',
      evaluated: 42,
      benchmark: 80,
      gap: 38,
      priority: 'HIGH PRIORITY',
      priorityColor: 'bg-[#FCE8E6] text-[#D9383A] border-[#F5C2C7]',
      barColor: 'bg-[#E8871A]',
      action: 'Direct iGOT Python ETL curriculum mapping',
    },
    {
      title: 'National Data Security Standards',
      evaluated: 32,
      benchmark: 60,
      gap: 28,
      priority: 'MEDIUM PRIORITY',
      priorityColor: 'bg-[#FFF4E6] text-[#E8871A] border-[#FEE2C5]',
      barColor: 'bg-[#E8871A]',
      action: 'NSSTA Data Governance & Privacy protocol module',
    },
    {
      title: 'Statistical & Sampling Theory',
      evaluated: 82,
      benchmark: 80,
      gap: 0,
      priority: 'BENCHMARK MET',
      priorityColor: 'bg-[#E6F4EA] text-[#16845B] border-[#CEEAD6]',
      barColor: 'bg-[#16845B]',
      action: 'Proficiency confirmed — maintain through annual refreshers',
    },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] rounded-2xl border border-[#DCE3EA] shadow-md overflow-hidden flex flex-col">
      {/* Top Header */}
      <div className="px-5 py-3.5 bg-[#F8FAFC] border-b border-[#DCE3EA] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Target className="w-4 h-4 text-[#2563D9]" />
          <span className="text-xs font-mono font-bold text-[#102A43] uppercase tracking-wider">
            Curriculum Mapping Intelligence
          </span>
        </div>
        <span className="text-[11px] font-mono font-bold text-[#2563D9] bg-[#EBF3FE] px-2.5 py-0.5 rounded border border-[#BFDBFE]">
          DELTA ALGORITHM ACTIVE
        </span>
      </div>

      {/* Main Container */}
      <div className="p-6 sm:p-7 space-y-6">
        {/* Core Intelligence Flow Metric Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#DCE3EA] text-center">
            <span className="text-[11px] font-mono font-semibold text-[#52657A] uppercase block">
              Current Level
            </span>
            <span className="text-2xl font-bold font-mono text-[#102A43] mt-0.5 block">
              42%
            </span>
            <span className="text-[10px] text-[#52657A]">Evaluated baseline</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#DCE3EA] text-center">
            <span className="text-[11px] font-mono font-semibold text-[#52657A] uppercase block">
              Cadre Benchmark
            </span>
            <span className="text-2xl font-bold font-mono text-[#16845B] mt-0.5 block">
              80%
            </span>
            <span className="text-[10px] text-[#52657A]">Mandated standard</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FFF4E6] border border-[#FEE2C5] text-center">
            <span className="text-[11px] font-mono font-semibold text-[#E8871A] uppercase block">
              Calculated Gap
            </span>
            <span className="text-2xl font-bold font-mono text-[#D9383A] mt-0.5 block">
              38 pts
            </span>
            <span className="text-[10px] text-[#D9383A] font-semibold">Priority Delta</span>
          </div>
        </div>

        {/* Intelligence Pipeline Flow Ribbon */}
        <div className="p-3 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-between text-[11px] font-semibold text-[#475569]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563D9]" />
            Evaluated Level
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-[#94A3B8]" />
          <span>Cadre Benchmark</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#94A3B8]" />
          <span className="text-[#D9383A] font-bold">Deficit Gap</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#94A3B8]" />
          <span className="text-[#16845B] font-bold">Course Action</span>
        </div>

        {/* Skill Gap Breakdown List */}
        <div className="space-y-3.5">
          {gaps.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.8, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="p-4 rounded-xl bg-[#FFFFFF] border border-[#DCE3EA] hover:border-[#CBD5E1] transition-colors space-y-2.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <span className="text-xs font-bold text-[#102A43]">{item.title}</span>
                <span className={`text-[10.5px] font-mono font-bold px-2 py-0.5 rounded border self-start sm:self-auto ${item.priorityColor}`}>
                  {item.priority}
                </span>
              </div>

              {/* Progress & Target Marker */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-[#52657A]">
                  <span>Evaluated: <strong className="text-[#102A43]">{item.evaluated}%</strong></span>
                  <span>Target Benchmark: <strong className="text-[#16845B]">{item.benchmark}%</strong></span>
                </div>
                <div className="w-full bg-[#EDF2F7] h-2.5 rounded-full overflow-hidden relative">
                  <div
                    className={`${item.barColor} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${item.evaluated}%` }}
                  />
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-[#16845B] z-10"
                    style={{ left: `${item.benchmark}%` }}
                    title={`Benchmark (${item.benchmark}%)`}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11.5px] text-[#475569] pt-0.5">
                {item.gap > 0 ? (
                  <AlertCircle className="w-3.5 h-3.5 text-[#E8871A] flex-shrink-0" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16845B] flex-shrink-0" />
                )}
                <span>{item.action}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
