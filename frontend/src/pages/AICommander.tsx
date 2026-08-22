import React from 'react';
import { useDemo } from '../state/DemoContext';
import { 
  Brain, 
  Cpu, 
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
  RefreshCw,
  Clock,
  Activity,
  Layers
} from 'lucide-react';

export const AICommander: React.FC = () => {
  const { incidents, activeIncidentId, activePlanVersion } = useDemo();
  const activeIncident = incidents.find(inc => inc.incident_id === activeIncidentId) || incidents[0];

  // Core 7 system loop steps
  const coreSteps = [
    { name: 'DETECT', status: ['DETECTED', 'UNDERSTANDING', 'ASSESSING', 'PLANNING', 'ACTING', 'MONITORING', 'REPLANNING'], desc: 'CV sensor trigger' },
    { name: 'UNDERSTAND', status: ['UNDERSTANDING', 'ASSESSING', 'PLANNING', 'ACTING', 'MONITORING', 'REPLANNING'], desc: 'Disaster object categorization' },
    { name: 'ASSESS', status: ['ASSESSING', 'PLANNING', 'ACTING', 'MONITORING', 'REPLANNING'], desc: 'Severity / confidence scoring' },
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
      case 'RESOLVED': return 5;
      default: return 0;
    }
  };

  const currentStepIndex = getActiveStepIndex();

  // Structured decisions based on active incident (Section 15 structured reasoning)
  const getAIDecisionContent = () => {
    if (activeIncident.disaster_type === 'CROWD') {
      const versionStr = activePlanVersion === 2 ? 'v2' : 'v1';
      const actionText = activePlanVersion === 2 
        ? 'Deploy Crowd Control Team & medical triage staging. Shift evacuation route to Gate C corridor.' 
        : 'Deploy Police Team 02. Override entry turnstiles to open mode. Route flows to Gate B.';
      const recommendationText = activePlanVersion === 2
        ? ['Open Exit C', 'Restrict Gate B Ingress', 'Deploy Medical Team 01', 'Retain Police Team 02']
        : ['Open Exit B', 'Deploy Police Team 02', 'Deploy Rescue Team 01'];
      
      return {
        detection: 'Crowd density anomaly detected at Stadium Entrance Gate B Plaza',
        confidence: '96.8% (ShanghaiTech CSD Model)',
        assessment: 'Critical crowd congestion & bottleneck risk',
        risk: 'High probability of dangerous crowd pressure / stampede',
        action: actionText,
        recommendations: recommendationText,
        version: versionStr,
        decisionTime: '1.8s',
        status: activeIncident.status === 'RESOLVED' ? 'STABILIZED' : 'EXECUTING'
      };
    } else {
      // Fire fallback
      const versionStr = activePlanVersion === 2 ? 'v2' : 'v1';
      const actionText = activePlanVersion === 2
        ? 'Shift evacuation route to Exit C. Retain Fire Team 02. Dispatch Medical Team 01 to Exit C.'
        : 'Evacuate floor occupancy via primary Exit B corridor. Dispatch Fire Team 02 for suppression.';
      const recommendationText = activePlanVersion === 2
        ? ['Open Exit C corridor', 'Dispatch Medical Team 01 for triage', 'Retain Fire Team 02']
        : ['Evacuate Floor 2 via Exit B', 'Dispatch Fire Team 02'];
      
      return {
        detection: 'Fire & smoke combustion anomaly detected in Building A Segment Floor 2',
        confidence: '94.2% (YOLOv8 D-Fire Model)',
        assessment: 'Active structural fire hazard',
        risk: 'High probability of corridor smoke inhalation and occupant entrapment',
        action: actionText,
        recommendations: recommendationText,
        version: versionStr,
        decisionTime: '2.1s',
        status: activeIncident.status === 'RESOLVED' ? 'STABILIZED' : 'EXECUTING'
      };
    }
  };

  const aiDecision = getAIDecisionContent();

  const tools = [
    { name: 'Vision Analysis', desc: 'Runs inference models (YOLO, CSRNet) on live camera feeds.', icon: Eye, status: 'Active' },
    { name: 'Incident Tracking', desc: 'Registers, classifies, and updates active emergency lifecycle.', icon: AlertTriangle, status: 'Active' },
    { name: 'Risk Assessment', desc: 'Computes severity index scores and casualty risk values.', icon: Cpu, status: 'Active' },
    { name: 'Operations Map', desc: 'Maintains schematic vectors and coordinates team markers.', icon: MapPin, status: 'Active' },
    { name: 'Route Planning', desc: 'Calculates optimal evacuation routes avoiding fire/congestion.', icon: Navigation, status: 'Active' },
    { name: 'Team Dispatcher', desc: 'Coordinates availability and schedules emergency response teams.', icon: UserCheck, status: 'Active' },
    { name: 'Notifications Center', desc: 'Broadcasts sirens and SMS alerts to target sectors.', icon: Bell, status: 'Idle' },
    { name: 'Core Database', desc: 'Maintains state logs and sensory history inputs.', icon: Database, status: 'Active' },
    { name: 'Report Generator', desc: 'Generates exportable compliance reports for post-incident audits.', icon: FileText, status: 'Ready' }
  ];

  return (
    <div className="flex-grow p-4 space-y-5 overflow-y-auto max-h-[calc(100vh-65px)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-borderMuted pb-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-textPrimary flex items-center">
            <Brain className="h-5 w-5 text-accentCyan mr-2" />
            AI COMMANDER OPERATIONAL WORKSPACE
          </h1>
          <p className="text-xs text-textMuted font-mono mt-1">STRUCTURED REASONING ENGINE & RESPONSE LOGISTICS PANEL</p>
        </div>
      </div>

      {/* 7-Step Core System Loop (Flowchart) */}
      <div className="glass-panel p-4 space-y-3.5 border border-borderMuted bg-navyMedium/60">
        <span className="font-mono text-[10px] font-black text-textSecondary block uppercase tracking-wider">RESPONSE PROCESS PIPELINE LOOP</span>
        
        <div className="grid grid-cols-2 md:grid-cols-7 gap-2.5 items-center">
          {coreSteps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isActive = idx === currentStepIndex;

            let borderClass = 'border-borderMuted bg-navyDark text-textMuted';
            if (isActive) borderClass = 'border-accentCyan bg-accentCyan/10 text-accentCyan shadow-cyberCyan font-bold';
            if (isCompleted) borderClass = 'border-brandGreen/45 bg-brandGreen/5 text-brandGreen font-bold';

            return (
              <div key={idx} className="relative flex flex-col items-center select-none">
                <div className={`w-full py-2 px-1.5 rounded-lg border text-center font-mono text-[9px] transition-all duration-300 ${borderClass}`}>
                  <div className="flex items-center justify-center space-x-1">
                    {isCompleted && <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />}
                    {isActive && <RefreshCw className="h-3.5 w-3.5 shrink-0 animate-spin" />}
                    <span>{step.name}</span>
                  </div>
                  <p className="text-[8px] text-textMuted mt-1 uppercase font-normal truncate">{step.desc}</p>
                </div>
                {idx < 6 && (
                  <div className="hidden md:block absolute -right-[6px] top-[14px] z-10">
                    <ArrowRight className={`h-3 w-3 ${isCompleted ? 'text-brandGreen' : 'text-borderMuted'}`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid: Structured Decision Content & Tools */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Left Columns: Decision Logic (2/3 width) */}
        <div className="xl:col-span-2 space-y-4">
          <div className="glass-panel p-5 space-y-4 border border-borderMuted bg-navyMedium/90 font-mono text-xs leading-relaxed">
            <div className="flex items-center justify-between border-b border-borderMuted pb-3">
              <div className="flex items-center space-x-2 text-textSecondary">
                <Layers className="h-4.5 w-4.5 text-accentCyan" />
                <span className="font-bold">DECISION DATA STRUCTURE</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] text-accentCyan bg-accentCyan/10 border border-accentCyan/35 px-2 py-0.5 rounded font-black">
                  PLAN VERSION: {aiDecision.version}
                </span>
                <span className="text-[10px] text-brandGreen bg-brandGreen/10 border border-brandGreen/35 px-2 py-0.5 rounded font-black">
                  TIME: {aiDecision.decisionTime}
                </span>
              </div>
            </div>

            {/* Decision explanation rows (Requirement 15) */}
            <div className="space-y-4 font-mono">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 py-2 border-b border-borderMuted/30">
                <span className="text-[9px] text-textMuted uppercase font-black tracking-widest mt-0.5">DETECTION</span>
                <span className="md:col-span-3 text-textPrimary text-xs font-semibold">{aiDecision.detection}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 py-2 border-b border-borderMuted/30 items-center">
                <span className="text-[9px] text-textMuted uppercase tracking-widest font-black">CONFIDENCE</span>
                <div className="md:col-span-3 flex items-center space-x-3">
                  <span className="text-accentCyan font-black text-xs shrink-0">{aiDecision.confidence}</span>
                  <div className="w-full bg-navyDark border border-borderMuted h-2.5 rounded overflow-hidden">
                    <div className="bg-accentCyan h-full shadow-cyberCyan" style={{ width: '92.4%' }}></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 py-2 border-b border-borderMuted/30">
                <span className="text-[9px] text-textMuted uppercase tracking-widest font-black mt-0.5">ASSESSMENT</span>
                <span className="md:col-span-3 text-brandOrange font-bold text-xs uppercase">{aiDecision.assessment}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 py-2 border-b border-borderMuted/30">
                <span className="text-[9px] text-textMuted uppercase tracking-widest font-black mt-0.5">RISK</span>
                <span className="md:col-span-3 text-brandRed font-semibold text-xs">{aiDecision.risk}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 py-2 border-b border-borderMuted/30">
                <span className="text-[9px] text-textMuted uppercase tracking-widest font-black mt-0.5">ACTION</span>
                <span className="md:col-span-3 text-textSecondary text-xs leading-relaxed bg-black/35 p-3 rounded-lg border border-borderMuted/35">
                  {aiDecision.action}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 py-2">
                <span className="text-[9px] text-textMuted uppercase tracking-widest font-black mt-0.5">RECOMMENDATION</span>
                <div className="md:col-span-3 flex flex-wrap gap-2">
                  {aiDecision.recommendations.map((rec, i) => (
                    <span 
                      key={i} 
                      className="bg-accentCyan/10 border border-accentCyan/30 text-accentCyan px-2.5 py-1 rounded-md text-[10px] font-bold"
                    >
                      ✓ {rec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3.5 border-t border-borderMuted/50 flex justify-between font-mono text-[9px] text-textMuted">
                <div className="flex items-center space-x-1.5">
                  <Clock className="h-3.5 w-3.5 text-textMuted" />
                  <span>Cycle latency: 1.8 seconds</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Activity className="h-3.5 w-3.5 text-brandGreen animate-pulse" />
                  <span className="text-brandGreen font-bold uppercase">STATUS: {aiDecision.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Cognitive Tools Grid */}
        <div className="xl:col-span-1 space-y-4">
          <div className="glass-panel p-4 space-y-3.5 border border-borderMuted bg-navyMedium/60">
            <span className="font-mono text-[10px] font-black text-textSecondary block uppercase tracking-wider">INTEGRATED COGNITIVE TOOLS</span>
            
            <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1">
              {tools.map((tool, idx) => (
                <div key={idx} className="p-3 bg-navyMedium/70 border border-borderMuted/70 rounded-lg flex items-start space-x-3 hover:border-accentCyan/45 transition-colors">
                  <div className="p-2 bg-navyLight rounded border border-borderMuted shrink-0">
                    <tool.icon className="h-4.5 w-4.5 text-accentCyan" />
                  </div>
                  <div className="font-mono text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-textPrimary">{tool.name}</h3>
                      <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border select-none ${
                        tool.status === 'Active' 
                          ? 'bg-brandGreen/10 text-brandGreen border-brandGreen/30' 
                          : tool.status === 'Ready'
                          ? 'bg-brandBlue/10 text-brandBlue border border-brandBlue/30'
                          : 'bg-slate-800 text-textMuted border-slate-700'
                      }`}>
                        {tool.status}
                      </span>
                    </div>
                    <p className="text-textMuted text-[10px] leading-relaxed">{tool.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AICommander;
