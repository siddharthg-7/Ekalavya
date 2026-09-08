import React, { useState, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Handle,
  Position,
  type NodeProps,
  type Node,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
  UserCheck,
  Target,
  BookOpen,
  TrendUp,
  Info,
  CheckCircle,
  ShieldCheck
} from '@phosphor-icons/react';


export interface JourneyStepNodeData extends Record<string, unknown> {
  num: string;
  badge: string;
  title: string;
  desc: string;
  numColor: string;
  accentHex: string;
  iconName: 'UserCheck' | 'Target' | 'BookOpen' | 'TrendUp';
  telemetryNote: string;
}

export type CustomStepNode = Node<JourneyStepNodeData, 'journeyNode'>;

const renderIcon = (name: JourneyStepNodeData['iconName'], className: string) => {
  switch (name) {
    case 'UserCheck': return <UserCheck className={className} />;
    case 'Target': return <Target className={className} />;
    case 'BookOpen': return <BookOpen className={className} />;
    case 'TrendUp': return <TrendUp className={className} />;
    default: return <UserCheck className={className} />;
  }
};

const JourneyNodeComponent: React.FC<NodeProps<CustomStepNode>> = ({ data, selected }) => {
  return (
    <div
      className={`w-[260px] rounded-2xl p-5 transition-all duration-300 relative text-white bg-[#0D2644] border ${
        selected
          ? 'border-[#22D3EE] ring-2 ring-[#22D3EE]/40 shadow-xl shadow-cyan-500/20 scale-105 bg-[#12335B]'
          : 'border-slate-700/70 hover:border-slate-400 hover:bg-[#113054]'
      }`}
    >
      {/* Target handle for incoming edge */}
      {data.num !== '01' && (
        <Handle
          type="target"
          position={Position.Left}
          style={{ background: data.accentHex, width: 10, height: 10, border: '2px solid #071B35' }}
        />
      )}

      {/* Node Top Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 rounded-xl bg-white/10 text-white flex items-center justify-center">
          {renderIcon(data.iconName, 'w-5 h-5 text-white')}
        </div>
        <span className={`font-mono text-sm font-black ${data.numColor}`}>
          {data.num}
        </span>
      </div>

      {/* Title & Badge */}
      <div className="text-[10px] font-mono font-bold tracking-widest text-cyan-300 uppercase mb-1">
        STEP {data.num} • {data.badge}
      </div>
      <div className="font-extrabold text-sm sm:text-base tracking-tight text-white mb-2 leading-tight">
        {data.title}
      </div>
      <p className="text-xs text-slate-300 leading-relaxed font-normal">
        {data.desc}
      </p>

      {/* Source handle for outgoing edge */}
      {data.num !== '04' && (
        <Handle
          type="source"
          position={Position.Right}
          style={{ background: data.accentHex, width: 10, height: 10, border: '2px solid #071B35' }}
        />
      )}
    </div>
  );
};

const nodeTypes = {
  journeyNode: JourneyNodeComponent,
};

export const PipelineReactFlow: React.FC = () => {
  const [selectedNodeData, setSelectedNodeData] = useState<JourneyStepNodeData | null>(null);

  const initialNodes: CustomStepNode[] = useMemo(
    () => [
      {
        id: 'step-1',
        type: 'journeyNode',
        position: { x: 20, y: 35 },
        data: {
          num: '01',
          badge: 'PROFILE SETUP',
          title: 'CREATE YOUR PROFILE',
          desc: 'Enter your designation, division, and past statistical or administrative service records.',
          numColor: 'text-[#22D3EE]',
          accentHex: '#22D3EE',
          iconName: 'UserCheck',
          telemetryNote: 'MoSPI cadre framework loads initial role metadata and past training achievements.',
        },
      },
      {
        id: 'step-2',
        type: 'journeyNode',
        position: { x: 320, y: 35 },
        data: {
          num: '02',
          badge: 'AI ANALYSIS',
          title: 'IDENTIFY YOUR GAPS',
          desc: 'AI evaluates your current skills against target benchmarks and reveals prioritized deficits.',
          numColor: 'text-[#F59E0B]',
          accentHex: '#F59E0B',
          iconName: 'Target',
          telemetryNote: 'Algorithmic delta engine identifies domain deficits like Python ETL or Sampling Variance.',
        },
      },
      {
        id: 'step-3',
        type: 'journeyNode',
        position: { x: 620, y: 35 },
        data: {
          num: '03',
          badge: 'CURRICULUM & DIAGNOSTIC',
          title: 'LEARN & ASSESS',
          desc: 'Engage directly in curated iGOT/NSSTA courses and take real-time adaptive quiz diagnostics.',
          numColor: 'text-[#10B981]',
          accentHex: '#10B981',
          iconName: 'BookOpen',
          telemetryNote: 'Direct links to official iGOT/NSSTA modules coupled with real-time adaptive diagnostic tests.',
        },
      },
      {
        id: 'step-4',
        type: 'journeyNode',
        position: { x: 920, y: 35 },
        data: {
          num: '04',
          badge: 'SCORE MASTERY',
          title: 'TRACK YOUR GROWTH',
          desc: 'Watch verified milestones reflect automatically on your official competency record.',
          numColor: 'text-[#38BDF8]',
          accentHex: '#38BDF8',
          iconName: 'TrendUp',
          telemetryNote: 'Demonstrated mastery is automatically updated in verified institutional records.',
        },
      },
    ],
    []
  );

  const initialEdges: Edge[] = useMemo(
    () => [
      {
        id: 'edge-1-2',
        source: 'step-1',
        target: 'step-2',
        animated: true,
        style: { stroke: '#22D3EE', strokeWidth: 2.5 },
      },
      {
        id: 'edge-2-3',
        source: 'step-2',
        target: 'step-3',
        animated: true,
        style: { stroke: '#F59E0B', strokeWidth: 2.5 },
      },
      {
        id: 'edge-3-4',
        source: 'step-3',
        target: 'step-4',
        animated: true,
        style: { stroke: '#10B981', strokeWidth: 2.5 },
      },
    ],
    []
  );

  return (
    <div className="w-full bg-[#071B35] rounded-[28px] border border-white/10 shadow-2xl p-6 sm:p-8 overflow-hidden">
      {/* Flow Canvas Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono font-bold uppercase tracking-widest mb-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>HOW IT WORKS</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Four Steps. One Clear Learning Journey.
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-300 bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl shrink-0">
          <Info className="w-4 h-4 text-cyan-400" />
          <span>Interactive React Flow Canvas — Click any step</span>
        </div>
      </div>

      {/* React Flow Viewport */}
      <div className="w-full h-[250px] rounded-2xl overflow-hidden bg-[#0A213D] border border-white/10 relative">
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          nodesDraggable={false}
          nodesConnectable={false}
          zoomOnScroll={false}
          panOnScroll={false}
          preventScrolling={false}
          onNodeClick={(_, node) => setSelectedNodeData(node.data as unknown as JourneyStepNodeData)}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={22} size={1} color="rgba(255, 255, 255, 0.16)" />
        </ReactFlow>
      </div>

      {/* Interactive Telemetry Inspector Banner */}
      {selectedNodeData && (
        <div className="mt-5 p-4 rounded-2xl bg-white/10 border border-[#22D3EE]/40 text-white text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in duration-200 shadow-lg">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <span className={`font-mono font-bold text-xs uppercase ${selectedNodeData.numColor}`}>
                STEP {selectedNodeData.num} TELEMETRY ENGINE:
              </span>{' '}
              <span className="text-slate-200">{selectedNodeData.telemetryNote}</span>
            </div>
          </div>
          <button
            onClick={() => setSelectedNodeData(null)}
            className="text-cyan-300 hover:text-white font-semibold text-xs shrink-0 cursor-pointer underline"
          >
            Close Inspector
          </button>
        </div>
      )}

      {/* Tagline Footer */}
      <div className="mt-6 pt-5 border-t border-white/10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-[#A0B8D5] font-medium">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
          <span className="flex items-center gap-1.5 text-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            No complicated setup
          </span>
          <span className="flex items-center gap-1.5 text-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            No course hunting
          </span>
          <span className="flex items-center gap-1.5 text-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            No one-size-fits-all assessment
          </span>
        </div>
        <span className="text-cyan-300 font-mono text-xs font-semibold">Institutional Grade • MoSPI</span>
      </div>
    </div>
  );
};
