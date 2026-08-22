import React from 'react';
import { useDemo } from '../state/DemoContext';
import { 
  Brain, 
  Cpu, 
  Settings2, 
  CheckCircle2, 
  Eye, 
  FileText, 
  AlertTriangle, 
  MapPin, 
  Navigation, 
  UserCheck, 
  Bell, 
  Database,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

export const AICommander: React.FC = () => {
  const { incidents, activeIncidentId } = useDemo();
  const activeIncident = incidents.find(inc => inc.incident_id === activeIncidentId) || incidents[0];

  // Core 7 system loop steps
  const coreSteps = [
    { name: 'DETECT', status: ['DETECTED', 'UNDERSTANDING', 'ASSESSING', 'PLANNING', 'ACTING', 'MONITORING', 'REPLANNING'], desc: 'CV sensor trigger' },
    { name: 'UNDERSTAND', status: ['UNDERSTANDING', 'ASSESSING', 'PLANNING', 'ACTING', 'MONITORING', 'REPLANNING'], desc: 'Disaster object categorization' },
    { name: 'ASSESS RISK', status: ['ASSESSING', 'PLANNING', 'ACTING', 'MONITORING', 'REPLANNING'], desc: 'Severity / confidence scoring' },
    { name: 'PLAN', status: ['PLANNING', 'ACTING', 'MONITORING', 'REPLANNING'], desc: 'Staging & evacuation routing' },
    { name: 'ACT', status: ['ACTING', 'MONITORING', 'REPLANNING'], desc: 'First responder team dispatch' },
    { name: 'MONITOR', status: ['MONITORING', 'REPLANNING'], desc: 'Realtime telemetry tracking' },
    { name: 'RE-PLAN', status: ['REPLANNING'], desc: 'Dynamic routing updates' }
  ];

  // Current step index based on activeIncident status
  const getActiveStepIndex = () => {
    switch (activeIncident.status) {
      case 'DETECTED': return 0;
      case 'UNDERSTANDING': return 1;
      case 'ASSESSING': return 2;
      case 'PLANNING': return 3;
      case 'ACTING': return 4;
      case 'MONITORING': return 5;
      case 'REPLANNING': return 6;
      case 'RESOLVED': return 5; // Monitoring/resolved
      default: return 0;
    }
  };

  const currentStepIndex = getActiveStepIndex();

  // Nine available tools
  const tools = [
    { name: 'Vision Analysis', desc: 'Runs inference models (YOLO, Autoencoders) on live feeds.', icon: Eye, status: 'Active' },
    { name: 'Incident Management', desc: 'Registers, classifies, and tracks lifecycle of emergencies.', icon: AlertTriangle, status: 'Active' },
    { name: 'Risk Assessment', desc: 'Computes severity index scores and casualty estimates.', icon: Cpu, status: 'Active' },
    { name: 'Map / Location', desc: 'Maintains absolute mapping vectors and EOC GPS coordinates.', icon: MapPin, status: 'Active' },
    { name: 'Route Planning', desc: 'Calculates shortest hazard-free routes using graph-nets.', icon: Navigation, status: 'Active' },
    { name: 'Emergency Team Assignment', desc: 'Coordinates team availabilities and schedules dispatcher crews.', icon: UserCheck, status: 'Active' },
    { name: 'Notification', desc: 'Broadcasts SMS alerts and siren commands to target areas.', icon: Bell, status: 'Idle' },
    { name: 'Database', desc: 'Maintains ACID state store of history logs and sensor inputs.', icon: Database, status: 'Active' },
    { name: 'Report Generation', desc: 'Generates exportable telemetry reports for compliance reviews.', icon: FileText, status: 'Ready' }
  ];

  return (
    <div className="flex-grow p-4 space-y-5 overflow-y-auto max-h-[calc(100vh-65px)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-navyLight pb-2">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-100 flex items-center">
            <Brain className="h-5 w-5 text-accentCyan mr-2" />
            AI COMMANDER OPERATIONAL WORKSPACE
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">DECISION LOGIC FLOW & RESOURCE ENGINE</p>
        </div>
      </div>

      {/* 7-Step Core System Loop (Flowchart) */}
      <div className="glass-panel p-4 space-y-3">
        <span className="font-mono text-xs font-bold text-slate-300 block mb-3">CORE SYSTEM WORKFLOW LOOP</span>
        
        <div className="grid grid-cols-2 md:grid-cols-7 gap-2 items-center">
          {coreSteps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isActive = idx === currentStepIndex;
            const isPending = idx > currentStepIndex;

            let borderClass = 'border-navyLight bg-navyDark text-slate-500';
            if (isActive) borderClass = 'border-accentCyan bg-accentCyan/10 text-accentCyan shadow-cyberCyan font-bold';
            if (isCompleted) borderClass = 'border-brandGreen/40 bg-brandGreen/5 text-brandGreen';

            return (
              <div key={idx} className="relative flex flex-col items-center">
                <div className={`w-full py-2.5 px-2 rounded border text-center font-mono text-[10px] transition-all duration-300 ${borderClass}`}>
                  <div className="flex items-center justify-center space-x-1">
                    {isCompleted && <CheckCircle2 className="h-3.5 w-3.5" />}
                    {isActive && <RefreshCw className="h-3.5 w-3.5 animate-spin-slow" />}
                    <span>{step.name}</span>
                  </div>
                  <p className="text-[8px] text-slate-500 mt-1 uppercase font-normal">{step.desc}</p>
                </div>
                {idx < 6 && (
                  <div className="hidden md:block absolute -right-[6px] top-[14px] z-10">
                    <ArrowRight className={`h-3.5 w-3.5 ${isCompleted ? 'text-brandGreen' : 'text-slate-700'}`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Nine Available Tools Grid */}
      <div className="space-y-3">
        <span className="font-mono text-xs font-bold text-slate-300 block border-b border-navyLight pb-1.5">INTEGRATED COGNITIVE TOOLS</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tools.map((tool, idx) => {
            return (
              <div key={idx} className="p-3 bg-navyMedium/60 border border-navyLight/70 rounded flex items-start space-x-3 hover:border-accentCyan/30 transition-colors">
                <div className="p-2 bg-navyLight rounded border border-navyLight">
                  <tool.icon className="h-5 w-5 text-accentCyan" />
                </div>
                <div className="font-mono text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-200">{tool.name}</h3>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                      tool.status === 'Active' 
                        ? 'bg-brandGreen/10 text-brandGreen border border-brandGreen/30' 
                        : 'bg-slate-800 text-slate-400 border border-slate-750'
                    }`}>
                      {tool.status}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[10px] leading-relaxed">{tool.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
