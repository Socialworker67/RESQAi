import React from 'react';
import { useDemo } from '../state/DemoContext';
import { CommandCenterKPIs } from '../components/CommandCenterKPIs';
import { OperationsMap } from '../components/OperationsMap';
import { PlanEvolution } from '../components/PlanEvolution';
import { AgentLog } from '../components/AgentLog';
import { 
  Flame, 
  Activity, 
  UserCheck, 
  Skull, 
  Compass, 
  Shuffle, 
  ChevronsRight, 
  AlertOctagon,
  ShieldCheck,
  Brain,
  HelpCircle,
  PlayCircle,
  RotateCcw,
  AlertCircle,
  Users
} from 'lucide-react';

export const CommandCenter: React.FC = () => {
  const {
    incidents,
    activeIncidentId,
    isExitBlocked,
    activePlanVersion,
    isDemoRunning,
    demoStep,
    startDemo,
    resetDemo,
    blockExit,
    increaseRisk,
    triggerReplan,
    completeIncident,
    triggerManualIncident
  } = useDemo();

  const activeIncident = incidents.find(inc => inc.incident_id === activeIncidentId) || incidents[0];

  // Helper to format severity colors
  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'CRITICAL':
        return 'bg-brandRed/10 border-brandRed/30 text-brandRed font-bold';
      case 'HIGH':
        return 'bg-brandOrange/10 border-brandOrange/30 text-brandOrange font-bold';
      case 'MODERATE':
        return 'bg-brandAmber/10 border-brandAmber/30 text-brandAmber';
      case 'SAFE':
        return 'bg-brandGreen/10 border-brandGreen/30 text-brandGreen';
      default:
        return 'bg-slate-800 text-slate-400';
    }
  };

  // Helper to format incident status indicators
  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'RESOLVED':
        return 'text-brandGreen';
      case 'REPLANNING':
        return 'text-brandRed animate-pulse';
      case 'PLANNING':
        return 'text-accentCyan animate-pulse';
      case 'ACTING':
        return 'text-brandBlue animate-pulse-slow';
      default:
        return 'text-slate-400';
    }
  };

  // Structured decisions for each disaster type
  const getAIDecisionContent = () => {
    if (activeIncident.disaster_type === 'FIRE') {
      const versionStr = activePlanVersion === 2 ? '02' : '01';
      const actionText = activePlanVersion === 2 
        ? 'Shift evacuation route to Exit C. Retain Fire Team 02. Dispatch Medical Team 01 for triage.' 
        : 'Evacuate floor occupancy via primary Exit B corridor. Dispatch Fire Team 02 for suppression.';
      const reasonText = activePlanVersion === 2
        ? 'Structural failure has blocked the primary Exit B access hallway. Emergency re-routing required.'
        : 'Sensory models suggest early stage fire threat on Level 2 threatening secondary offices.';
      
      return {
        detection: 'Fire & Smoke anomaly registered in Sector 2 (Building A)',
        confidence: `${activeIncident.fire_confidence || activeIncident.confidence}%`,
        decision: activePlanVersion === 2 ? 'Initiate DYNAMIC RE-PLANNING (Compromised Evacuation Path)' : 'Classify as CRITICAL - Active Evacuation Required',
        reason: reasonText,
        action: actionText,
        result: activePlanVersion === 2 ? 'Coordinated evacuation shift active' : 'Plan v1 broadcast to emergency team',
        version: versionStr
      };
    } else if (activeIncident.disaster_type === 'ROAD_ACCIDENT') {
      return {
        detection: 'Multi-vehicle impact event detected on highway artery NH-48',
        confidence: `${activeIncident.accident_confidence || activeIncident.confidence}%`,
        decision: 'Classify incident as HIGH (Traffic Congestion & Rescue Hazard)',
        reason: 'Collision blocks lane 2 and 3 of three-lane freeway. Flow rate down by 75%. Occupants inside vehicles.',
        action: 'Dispatch Medical Team 03 (Ambulance), Dispatch Police Team 01 to set detour, broadcast alerts to oncoming traffic.',
        result: 'Detour routing and emergency lane clearance established.',
        version: '01'
      };
    } else if (activeIncident.disaster_type === 'INDUSTRIAL_ACCIDENT') {
      return {
        detection: 'Unsupervised defect detection: Pressure valve leakage at Line 4',
        confidence: `${activeIncident.anomaly_score || activeIncident.confidence}% (Anomaly score)`,
        decision: 'Classify incident as HIGH (Hazardous Materials plume)',
        reason: 'Sensor registers critical pressure spike on Valve 4B. Hazardous materials risk near occupied assembly spaces.',
        action: 'Dispatch Hazmat Team 01. Send digital override trigger for Valve 4B shutdown. Lock ventilation in Room 2.',
        result: 'Vessel isolation activated; Hazmat containment zone established.',
        version: '01'
      };
    } else if (activeIncident.disaster_type === 'BUILDING_COLLAPSE') {
      return {
        detection: 'Pre/Post damage assessment: Building G1 collapsed, G2 structurally compromised',
        confidence: `${activeIncident.confidence}%`,
        decision: 'Classify incident as CRITICAL - Search & Rescue prioritization',
        reason: 'Satellite and reconnaissance drone models indicate total compromise of structural integrity of G1 Block.',
        action: 'Dispatch Rescue Team 04. Launch post-event structural drone scanners. Establish safe staging area Alpha.',
        result: 'Search & rescue grid scan active; heavy machinery staging initialized.',
        version: '01'
      };
    } else {
      // Crowd
      return {
        detection: 'Crowd counting estimation: Gate B density beyond safety limit',
        confidence: `${activeIncident.confidence}%`,
        decision: 'Classify incident as CRITICAL - Crowd Crush mitigation active',
        reason: 'Crowd density estimated at 5.4 people/sqm at Gate B corridor. High probability of friction or stampede.',
        action: 'Dispatch Police Team 02 & Rescue Team 01. Override gate turnstiles to open mode. Route crowd flow to Gates C and D.',
        result: 'Gate override signals sent; directional announcements activated.',
        version: '01'
      };
    }
  };

  const aiDecision = getAIDecisionContent();

  return (
    <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-65px)]">
      {/* Top KPIs Summary */}
      <CommandCenterKPIs />

      {/* Main operational workspace */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 items-start">
        {/* Left Column: Active Incidents List (1/4 width) */}
        <div className="xl:col-span-1 space-y-3">
          <div className="flex items-center justify-between border-b border-navyLight pb-2">
            <span className="font-mono text-xs font-bold text-slate-300">ACTIVE INCIDENTS FEED</span>
            <span className="font-mono text-[10px] text-accentCyan bg-accentCyan/15 px-1.5 py-0.5 rounded animate-pulse">LIVE FEED</span>
          </div>

          <div className="space-y-2 overflow-y-auto max-h-[700px] pr-1">
            {incidents.map((inc) => {
              const isActive = inc.incident_id === activeIncidentId;
              let Icon = Flame;
              if (inc.disaster_type === 'ROAD_ACCIDENT') Icon = Compass;
              if (inc.disaster_type === 'INDUSTRIAL_ACCIDENT') Icon = Activity;
              if (inc.disaster_type === 'BUILDING_COLLAPSE') Icon = AlertOctagon;
              if (inc.disaster_type === 'CROWD') Icon = Users;

              return (
                <div
                  key={inc.incident_id}
                  onClick={() => triggerManualIncident(inc.disaster_type)}
                  className={`p-3 rounded border cursor-pointer transition-all duration-200 select-none ${
                    isActive 
                      ? 'bg-navyMedium border-accentCyan shadow-cyberCyan' 
                      : 'bg-navyMedium/60 border-navyLight/50 hover:bg-navyMedium hover:border-navyLight text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate-400 font-bold">{inc.incident_id}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded border ${getSeverityBadge(inc.severity)}`}>
                      {inc.severity}
                    </span>
                  </div>
                  
                  <div className="mt-2 flex items-center space-x-2">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-accentCyan' : 'text-slate-500'}`} />
                    <span className="font-bold text-xs text-slate-200 uppercase tracking-tight">{inc.disaster_type.replace('_', ' ')}</span>
                  </div>

                  <p className="mt-1 text-[11px] text-slate-400 truncate">{inc.location}</p>

                  <div className="mt-3 pt-2 border-t border-navyLight/30 flex items-center justify-between font-mono text-[9px]">
                    <span className="flex items-center space-x-1">
                      <span className="text-slate-500">Confidence:</span>
                      <span className="text-slate-200 font-semibold">{inc.confidence}%</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="text-slate-500">Risk:</span>
                      <span className="text-slate-200 font-semibold">{inc.people_at_risk.toLocaleString()} at risk</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center Column: Map & Plan Evolution (2/4 width) */}
        <div className="xl:col-span-2 space-y-4">
          
          {/* Operations Map */}
          <OperationsMap />

          {/* Demo Execution / Control bar */}
          <div className="p-3 bg-navyMedium/60 border border-navyLight/75 rounded flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-slate-400 font-bold">SIMULATION STATUS:</span>
              {isDemoRunning ? (
                <span className="flex items-center space-x-1.5 text-accentCyan font-bold animate-pulse">
                  <span className="h-2.5 w-2.5 rounded-full bg-accentCyan animate-ping"></span>
                  <span>EXECUTING DEMO STEP {demoStep}/10</span>
                </span>
              ) : (
                <span className="text-slate-400 uppercase">Awaiting trigger</span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <button 
                onClick={startDemo} 
                className="bg-accentCyan/10 border border-accentCyan/40 hover:bg-accentCyan/20 text-accentCyan px-3 py-1.5 rounded flex items-center space-x-1 font-bold transition-colors"
                disabled={isDemoRunning}
              >
                <PlayCircle className="h-4 w-4" />
                <span>RUN DEMO</span>
              </button>
              <button 
                onClick={resetDemo} 
                className="bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded flex items-center space-x-1 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>RESET</span>
              </button>
            </div>
          </div>

          {/* Hero interactive Plan Evolution */}
          <PlanEvolution />

          {/* Scrolling System Terminal Event Log */}
          <AgentLog />
        </div>

        {/* Right Column: AI Commander (1/4 width) */}
        <div className="xl:col-span-1 space-y-3">
          <div className="flex items-center justify-between border-b border-navyLight pb-2">
            <div className="flex items-center space-x-2">
              <Brain className="h-4 w-4 text-accentCyan" />
              <span className="font-mono text-xs font-bold text-slate-300">AI COMMANDER</span>
            </div>
            <div className="flex items-center space-x-1 text-[10px] text-brandGreen font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-brandGreen animate-pulse"></span>
              <span>ONLINE</span>
            </div>
          </div>

          {/* AI Decision Panel */}
          <div className="bg-navyMedium/60 border border-navyLight/70 rounded p-4 space-y-4 font-mono text-xs leading-relaxed">
            <div className="flex items-center justify-between border-b border-navyLight/40 pb-2">
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-slate-200">ANALYZING INCIDENT</span>
              </div>
              <span className="text-[10px] text-accentCyan bg-accentCyan/10 border border-accentCyan/30 px-1.5 py-0.5 rounded font-black">
                PLAN v{aiDecision.version}
              </span>
            </div>

            {/* Decision explanation list */}
            <div className="space-y-3">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black block">Detection</span>
                <p className="text-slate-100 mt-0.5 text-xs">{aiDecision.detection}</p>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black block">Confidence</span>
                <p className="text-slate-100 mt-0.5 text-xs text-accentCyan font-bold">{aiDecision.confidence}</p>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black block">Decision</span>
                <p className="text-slate-100 mt-0.5 text-xs text-brandOrange font-semibold">{aiDecision.decision}</p>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black block">Reason</span>
                <p className="text-slate-300 mt-0.5 text-xs">{aiDecision.reason}</p>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black block">Action</span>
                <div className="mt-1 bg-black/40 border border-navyLight/40 p-2 rounded text-slate-200 space-y-1">
                  {aiDecision.action.split('. ').map((act, i) => act && (
                    <div key={i} className="flex items-start space-x-1">
                      <span className="text-accentCyan font-bold">➔</span>
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-navyLight/40">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black block">Result</span>
                <p className="text-brandGreen mt-0.5 text-xs font-semibold">{aiDecision.result}</p>
              </div>
            </div>
          </div>

          {/* Quick Sandbox Controls */}
          <div className="bg-navyMedium/60 border border-navyLight/70 rounded p-4 space-y-3">
            <div className="border-b border-navyLight/40 pb-2 flex items-center space-x-1 text-slate-300">
              <span className="font-mono text-xs font-bold">MANUAL SIMULATION INTERRUPTS</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
              <button 
                onClick={blockExit}
                disabled={activeIncident.disaster_type !== 'FIRE' || isExitBlocked}
                className="bg-brandRed/10 border border-brandRed/40 hover:bg-brandRed/20 text-brandRed p-2 rounded text-center transition-colors disabled:opacity-40"
              >
                BLOCK EXIT B
              </button>
              <button 
                onClick={triggerReplan}
                disabled={activeIncident.disaster_type !== 'FIRE' || activePlanVersion === 2}
                className="bg-accentCyan/10 border border-accentCyan/40 hover:bg-accentCyan/20 text-accentCyan p-2 rounded text-center transition-colors disabled:opacity-40"
              >
                TRIGGER RE-PLAN
              </button>
              <button 
                onClick={increaseRisk}
                className="bg-brandOrange/10 border border-brandOrange/40 hover:bg-brandOrange/20 text-brandOrange p-2 rounded text-center transition-colors"
              >
                INCREASE RISK
              </button>
              <button 
                onClick={completeIncident}
                className="bg-brandGreen/10 border border-brandGreen/40 hover:bg-brandGreen/20 text-brandGreen p-2 rounded text-center transition-colors"
              >
                RESOLVE INCIDENT
              </button>
            </div>
            
            {activeIncident.disaster_type !== 'FIRE' && (
              <div className="bg-brandAmber/5 border border-brandAmber/20 p-2 rounded text-[9px] font-mono text-brandAmber flex items-center space-x-1">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>Custom detour & exits are fully simulated on Fire incident.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
