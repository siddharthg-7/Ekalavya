import React from 'react';
import { TrendingUp, ShieldCheck, Milestone } from 'lucide-react';
import { motion } from 'motion/react';

interface ProgressVisualProps {
  isActive?: boolean;
}

export const ProgressVisual: React.FC<ProgressVisualProps> = ({ isActive = true }) => {
  const points = [
    { stage: 'Baseline', score: 32, label: 'Diagnostic' },
    { stage: 'Phase 1', score: 38, label: 'iGOT Module' },
    { stage: 'Phase 2', score: 42, label: 'Practical Drill' },
    { stage: 'Current', score: 48, label: 'Post-Assessment' },
  ];

  // SVG chart dimensions
  const width = 480;
  const height = 180;
  const paddingX = 40;
  const paddingY = 30;

  const minScore = 20;
  const maxScore = 90;

  const getX = (idx: number) => paddingX + (idx / (points.length - 1)) * (width - paddingX * 2);
  const getY = (score: number) => height - paddingY - ((score - minScore) / (maxScore - minScore)) * (height - paddingY * 2);

  const pathD = points
    .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(idx)} ${getY(p.score)}`)
    .join(' ');

  const areaD = `${pathD} L ${getX(points.length - 1)} ${height - paddingY} L ${getX(0)} ${height - paddingY} Z`;

  return (
    <div className="w-full bg-[#FFFFFF] rounded-2xl border border-[#DCE3EA] shadow-md overflow-hidden flex flex-col">
      {/* Console Header */}
      <div className="px-5 py-3.5 bg-[#F8FAFC] border-b border-[#DCE3EA] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <TrendingUp className="w-4 h-4 text-[#2563D9]" />
          <span className="text-xs font-mono font-bold text-[#102A43] uppercase tracking-wider">
            Diagnostic Growth Trajectory
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#16845B]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verifiable Audit Log</span>
        </div>
      </div>

      {/* Main Visual Container */}
      <div className="p-6 sm:p-7 space-y-6">
        {/* KPI Metric Summary Row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#DCE3EA] text-center">
            <span className="text-[10.5px] font-mono font-semibold text-[#52657A] uppercase block">
              Baseline
            </span>
            <span className="text-2xl font-bold font-mono text-[#102A43] mt-0.5 block">
              32%
            </span>
            <span className="text-[10px] text-[#52657A]">Initial attempt</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#E6F4EA] border border-[#CEEAD6] text-center">
            <span className="text-[10.5px] font-mono font-bold text-[#16845B] uppercase block">
              Current Level
            </span>
            <span className="text-2xl font-bold font-mono text-[#16845B] mt-0.5 block">
              48%
            </span>
            <span className="text-[10px] text-[#16845B] font-semibold">+16 pts verified</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FFF8F0] border border-[#FEE2C5] text-center">
            <span className="text-[10.5px] font-mono font-bold text-[#E8871A] uppercase block">
              Target Standard
            </span>
            <span className="text-2xl font-bold font-mono text-[#E8871A] mt-0.5 block">
              80%
            </span>
            <span className="text-[10px] text-[#E8871A]">Cadre benchmark</span>
          </div>
        </div>

        {/* SVG Trajectory Chart */}
        <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#DCE3EA] space-y-3">
          <div className="flex justify-between items-center text-xs font-semibold text-[#52657A]">
            <span>Competency Score Velocity</span>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1 text-[#2563D9]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563D9]" />
                Actual Growth
              </span>
              <span className="flex items-center gap-1 text-[#E8871A]">
                <span className="w-3.5 h-0.5 border-t border-dashed border-[#E8871A]" />
                Benchmark (80%)
              </span>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto max-h-[190px]">
              {/* Horizontal Grid lines */}
              {[30, 50, 70, 80].map((score) => (
                <g key={score}>
                  <line
                    x1={paddingX}
                    y1={getY(score)}
                    x2={width - paddingX}
                    y2={getY(score)}
                    stroke={score === 80 ? '#E8871A' : '#E2E8F0'}
                    strokeWidth={score === 80 ? '1.5' : '1'}
                    strokeDasharray={score === 80 ? '4 3' : '2 2'}
                  />
                  <text
                    x={paddingX - 8}
                    y={getY(score) + 3}
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="end"
                    fill={score === 80 ? '#E8871A' : '#94A3B8'}
                  >
                    {score}%
                  </text>
                </g>
              ))}

              {/* Shaded Area under Curve */}
              <path d={areaD} fill="rgba(37, 99, 217, 0.08)" />

              {/* Main Line with Motion */}
              <motion.path
                d={pathD}
                fill="none"
                stroke="#2563D9"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={isActive ? { pathLength: 1 } : { pathLength: 0.8 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />

              {/* Data points and labels */}
              {points.map((p, idx) => (
                <g key={p.stage}>
                  <circle
                    cx={getX(idx)}
                    cy={getY(p.score)}
                    r={idx === points.length - 1 ? 5.5 : 4}
                    fill={idx === points.length - 1 ? '#16845B' : '#2563D9'}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                  <text
                    x={getX(idx)}
                    y={getY(p.score) - 9}
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                    fill={idx === points.length - 1 ? '#16845B' : '#102A43'}
                  >
                    {p.score}%
                  </text>
                  <text
                    x={getX(idx)}
                    y={height - 8}
                    fontSize="9"
                    fontFamily="sans-serif"
                    fontWeight="500"
                    textAnchor="middle"
                    fill="#64748B"
                  >
                    {p.stage}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Audit Milestone Indicator */}
        <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#DCE3EA] flex items-center justify-between text-xs text-[#52657A]">
          <div className="flex items-center gap-2">
            <Milestone className="w-4 h-4 text-[#2563D9]" />
            <span>Next Milestone: <strong>National Statistical Accounts Drill</strong></span>
          </div>
          <span className="font-mono text-[11px] text-[#2563D9] font-bold">Target +12 pts</span>
        </div>
      </div>
    </div>
  );
};
