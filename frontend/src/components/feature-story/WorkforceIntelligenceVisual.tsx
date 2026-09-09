import React from 'react';
import { Building2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface WorkforceIntelligenceVisualProps {
  isActive?: boolean;
}

export const WorkforceIntelligenceVisual: React.FC<WorkforceIntelligenceVisualProps> = ({ isActive = true }) => {
  const departments = [
    {
      name: 'Survey Design & Research (SDRD)',
      readiness: 84,
      status: 'HIGH READINESS',
      badgeColor: 'bg-[#E6F4EA] text-[#16845B] border-[#CEEAD6]',
      barColor: 'bg-[#16845B]',
    },
    {
      name: 'National Accounts Division (NAD)',
      readiness: 78,
      status: 'HIGH READINESS',
      badgeColor: 'bg-[#E6F4EA] text-[#16845B] border-[#CEEAD6]',
      barColor: 'bg-[#16845B]',
    },
    {
      name: 'Field Operations Division (FOD)',
      readiness: 62,
      status: 'INTERVENTION PRIORITY',
      badgeColor: 'bg-[#FFF4E6] text-[#E8871A] border-[#FEE2C5]',
      barColor: 'bg-[#E8871A]',
    },
    {
      name: 'Data Informatics & Innovation (DIID)',
      readiness: 54,
      status: 'INTERVENTION PRIORITY',
      badgeColor: 'bg-[#FCE8E6] text-[#D9383A] border-[#F5C2C7]',
      barColor: 'bg-[#D9383A]',
    },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] rounded-2xl border border-[#DCE3EA] shadow-md overflow-hidden flex flex-col">
      {/* Top Header */}
      <div className="px-5 py-3.5 bg-[#F8FAFC] border-b border-[#DCE3EA] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Building2 className="w-4 h-4 text-[#2563D9]" />
          <span className="text-xs font-mono font-bold text-[#102A43] uppercase tracking-wider">
            Ministry Workforce Console
          </span>
        </div>
        <span className="text-[11px] font-mono font-bold text-[#2563D9] bg-[#EBF3FE] px-2.5 py-0.5 rounded border border-[#BFDBFE]">
          CADRE OVERSIGHT ACTIVE
        </span>
      </div>

      {/* Main Container */}
      <div className="p-6 sm:p-7 space-y-5">
        {/* Directorate Readiness Heatmap List */}
        <div className="space-y-3">
          {departments.map((dept, idx) => (
            <motion.div
              key={dept.name}
              initial={{ opacity: 0, x: -8 }}
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.8, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#DCE3EA] space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-xs font-bold text-[#102A43]">{dept.name}</span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border self-start sm:self-auto ${dept.badgeColor}`}>
                  {dept.status}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-full bg-[#E2E8F0] h-2.5 rounded-full overflow-hidden relative">
                  <div
                    className={`${dept.barColor} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${dept.readiness}%` }}
                  />
                  <div
                    className="absolute top-0 bottom-0 left-[80%] w-1 bg-[#16845B] z-10"
                    title="80% Standard"
                  />
                </div>
                <span className="font-mono text-xs font-bold text-[#102A43] w-12 text-right">
                  {dept.readiness}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Deep-Dive Highlight: Field Operations Division (FOD) */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#FFF8F0] border border-[#FEE2C5] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#E8871A]" />
              <h4 className="text-xs sm:text-sm font-bold text-[#102A43]">
                Field Operations Division (FOD) Target Drill
              </h4>
            </div>
            <span className="text-[11px] font-mono font-bold text-[#D9383A] bg-white px-2 py-0.5 rounded border border-[#FEE2C5]">
              Readiness Gap: 18 pts
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
            <div className="p-2.5 rounded-lg bg-white border border-[#FEE2C5]">
              <span className="text-[10.5px] text-[#52657A] block">Current Readiness</span>
              <strong className="text-sm font-mono text-[#E8871A]">62%</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-[#FEE2C5]">
              <span className="text-[10.5px] text-[#52657A] block">Cadre Benchmark</span>
              <strong className="text-sm font-mono text-[#16845B]">80%</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-[#FEE2C5] col-span-2 sm:col-span-1">
              <span className="text-[10.5px] text-[#52657A] block">Identified Priority Areas</span>
              <span className="text-[11px] font-bold text-[#102A43] block truncate">
                Survey Data Capture
              </span>
            </div>
          </div>

          <div className="text-xs text-[#52657A] pt-1 flex items-start gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#16845B] mt-0.5 flex-shrink-0" />
            <span>
              <strong className="text-[#102A43]">Recommended Action:</strong> Targeted field-operations training & tablet survey workflow refresher.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
