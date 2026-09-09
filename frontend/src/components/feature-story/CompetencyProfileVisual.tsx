import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface CompetencyProfileVisualProps {
  isActive?: boolean;
}

export const CompetencyProfileVisual: React.FC<CompetencyProfileVisualProps> = ({ isActive = true }) => {
  // 6 Domain Axes for the Bklit-style SVG Radar Chart
  const radarAxes = [
    { label: 'Statistical Theory', value: 82, bench: 80 },
    { label: 'Python ETL', value: 42, bench: 80 },
    { label: 'Data Security', value: 32, bench: 75 },
    { label: 'Survey Sampling', value: 78, bench: 75 },
    { label: 'National Accounts', value: 65, bench: 70 },
    { label: 'Field Protocols', value: 58, bench: 70 },
  ];

  const size = 260;
  const center = size / 2;
  const radius = 95;

  const getCoordinates = (value: number, index: number, total: number) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const currentPoints = radarAxes
    .map((d, i) => {
      const { x, y } = getCoordinates(d.value, i, radarAxes.length);
      return `${x},${y}`;
    })
    .join(' ');

  const benchPoints = radarAxes
    .map((d, i) => {
      const { x, y } = getCoordinates(d.bench, i, radarAxes.length);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="w-full bg-[#FFFFFF] rounded-2xl border border-[#DCE3EA] shadow-md overflow-hidden flex flex-col">
      {/* Console Top Header */}
      <div className="px-5 py-3.5 bg-[#F8FAFC] border-b border-[#DCE3EA] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#16845B] animate-pulse" />
          <span className="text-xs font-mono font-bold text-[#102A43] uppercase tracking-wider">
            Live Profile Telemetry
          </span>
          <span className="text-[11px] font-mono text-[#52657A] bg-[#EDF2F7] px-2 py-0.5 rounded border border-[#CBD5E1]">
            OFF-7042 (ISS Cadre)
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#16845B] font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>MoSPI Verified</span>
        </div>
      </div>

      {/* Main Visual Body */}
      <div className="p-6 sm:p-7 space-y-6">
        {/* Top Split: Radar on Left, Key Competency Bars on Right */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
          {/* Radar Chart */}
          <div className="sm:col-span-6 flex flex-col items-center justify-center relative">
            <svg width={size} height={size} className="overflow-visible">
              {/* Concentric Grid Rings */}
              {[0.25, 0.5, 0.75, 1.0].map((level, idx) => (
                <circle
                  key={idx}
                  cx={center}
                  cy={center}
                  r={radius * level}
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="1"
                  strokeDasharray={level === 1.0 ? '0' : '3 3'}
                />
              ))}

              {/* Radial Axis Spokes */}
              {radarAxes.map((_, i) => {
                const angle = (i * 2 * Math.PI) / radarAxes.length - Math.PI / 2;
                const x2 = center + radius * Math.cos(angle);
                const y2 = center + radius * Math.sin(angle);
                return <line key={i} x1={center} y1={center} x2={x2} y2={y2} stroke="#CBD5E1" strokeWidth="1" />;
              })}

              {/* Cadre Benchmark Polygon (Dashed Orange) */}
              <polygon
                points={benchPoints}
                fill="rgba(232, 135, 26, 0.06)"
                stroke="#E8871A"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />

              {/* Evaluated Level Polygon (Blue) */}
              <motion.polygon
                points={currentPoints}
                fill="rgba(37, 99, 217, 0.18)"
                stroke="#2563D9"
                strokeWidth="2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.8, scale: 0.95 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />

              {/* Data points */}
              {radarAxes.map((d, i) => {
                const { x, y } = getCoordinates(d.value, i, radarAxes.length);
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={3.5}
                    fill="#2563D9"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                );
              })}
            </svg>

            {/* Radar Legend */}
            <div className="flex items-center gap-4 mt-2 text-[11px] font-semibold text-[#52657A]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563D9]" />
                <span>Evaluated Level</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 border-t border-dashed border-[#E8871A]" />
                <span>Cadre Benchmark (80%)</span>
              </span>
            </div>
          </div>

          {/* Competency Level List */}
          <div className="sm:col-span-6 space-y-3.5">
            <div>
              <div className="flex justify-between items-center text-xs font-semibold mb-1">
                <span className="text-[#102A43] font-bold">Statistical & Sampling Theory</span>
                <span className="font-mono text-[#16845B] font-bold bg-[#E6F4EA] px-2 py-0.5 rounded text-[11px]">
                  82% • Advanced
                </span>
              </div>
              <div className="w-full bg-[#EDF2F7] h-2 rounded-full overflow-hidden">
                <div className="bg-[#16845B] h-full rounded-full transition-all duration-500" style={{ width: '82%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-semibold mb-1">
                <span className="text-[#102A43] font-bold">Python & Automated Survey ETL</span>
                <span className="font-mono text-[#E8871A] font-bold bg-[#FFF4E6] px-2 py-0.5 rounded text-[11px]">
                  42% • Developing
                </span>
              </div>
              <div className="w-full bg-[#EDF2F7] h-2 rounded-full overflow-hidden">
                <div className="bg-[#E8871A] h-full rounded-full transition-all duration-500" style={{ width: '42%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-semibold mb-1">
                <span className="text-[#102A43] font-bold">National Data Security Standards</span>
                <span className="font-mono text-[#D9383A] font-bold bg-[#FCE8E6] px-2 py-0.5 rounded text-[11px]">
                  32% • Focus Deficit
                </span>
              </div>
              <div className="w-full bg-[#EDF2F7] h-2 rounded-full overflow-hidden">
                <div className="bg-[#D9383A] h-full rounded-full transition-all duration-500" style={{ width: '32%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom AI Rationale Card */}
        <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#DCE3EA] space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-[#102A43]">Python Automated Survey Data</span>
            <span className="text-[11px] font-mono font-bold text-[#D9383A] bg-[#FCE8E6] px-2 py-0.5 rounded border border-[#F5C2C7]">
              Evaluated Deficit: 38%
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-2 rounded bg-white border border-[#E2E8F0]">
              <span className="text-[#52657A] text-[11px] block">Evaluated Level</span>
              <strong className="text-sm font-mono text-[#102A43]">42%</strong>
            </div>
            <div className="p-2 rounded bg-white border border-[#E2E8F0]">
              <span className="text-[#52657A] text-[11px] block">Cadre Benchmark</span>
              <strong className="text-sm font-mono text-[#16845B]">80%</strong>
            </div>
          </div>

          <p className="text-xs text-[#52657A] pt-1 leading-relaxed">
            <strong className="text-[#102A43]">AI Rationale:</strong> Automated Python ETL is required for upcoming PLFS survey release deadlines.
          </p>
        </div>
      </div>
    </div>
  );
};
