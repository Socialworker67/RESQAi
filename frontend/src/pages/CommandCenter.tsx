import React, { useState } from 'react';
import { useDemo } from '../state/DemoContext';
import { CommandCenterKPIs } from '../components/CommandCenterKPIs';
import { OperationsMap } from '../components/OperationsMap';
import { PlanEvolution } from '../components/PlanEvolution';
import { AgentLog } from '../components/AgentLog';
import { 
  Flame, 
  Activity, 
  Compass, 
  AlertOctagon,
  Brain,
  PlayCircle,
  RotateCcw,
  AlertCircle,
  Users,
  Pause,
  TrendingUp,
  Layout
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
    triggerManualIncident,
    isPresentationMode,
    setPresentationMode
  } = useDemo();

  const activeIncident = incidents.find(inc => inc.incident_id === activeIncidentId) || incidents[0];

  // Helper to format severity colors
  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'CRITICAL':
        return 'bg-brandRed/10 border-brandRed/35 text-brandRed font-black shadow-cyberRed/10';
      case 'HIGH':
        return 'bg-brandOrange/10 border-brandOrange/35 text-brandOrange font-bold';
      case 'MODERATE':
        return 'bg-brandAmber/10 border-brandAmber/35 text-brandAmber';
      case 'SAFE':
        return 'bg-brandGreen/10 border-brandGreen/35 text-brandGreen font-bold';
      default:
        return 'bg-slate-800 text-slate-400';
    }
  };

  // Structured decisions for each disaster type
  const getAIDecisionContent = () => {
    if (activeIncident.disaster_type === 'CROWD') {
      const versionStr = activePlanVersion === 2 ? '2' : '1';
      const actionText = activePlanVersion === 2 
        ? 'Shift evacuation flow to Gate C. Dispatch Medical Team 01 for staging. Retain Police Team 02 at corridor.' 
        : 'Open Gate B turnstiles. Deploy Police Team 02 to guide ingress flow.';
      const recommendationText = activePlanVersion === 2
        ? 'Open Exit C, Restrict Gate B Ingress, Deploy Medical Team 01'
        : 'Open Exit B, Deploy Police Team 02';
      
      return {
        detection: 'Crowd density anomaly detected at Gate B Plaza',
        confidence: `${activeIncident.confidence}% (ShanghaiTech CSD)`,
        assessment: 'Critical crowd congestion (8.7 persons/m²)',
        risk: 'High probability of dangerous crowd pressure',
        action: actionText,
        recommendation: recommendationText,
        version: versionStr,
        decisionTime: '1.8s',
        status: activeIncident.status === 'RESOLVED' ? 'STABILIZED' : 'EXECUTING'
      };
    } else if (activeIncident.disaster_type === 'FIRE') {
      const versionStr = activePlanVersion === 2 ? '2' : '1';
      const actionText = activePlanVersion === 2 
        ? 'Shift evacuation to Exit C corridor. Retain Fire Team 02. Dispatch Medical Team 01.' 
        : 'Evacuate floor occupancy via primary Exit B corridor. Dispatch Fire Team 02 for suppression.';
      
      return {
        detection: 'Fire & Smoke anomaly registered in Sector 2 (Building A)',
        confidence: `${activeIncident.fire_confidence || activeIncident.confidence}% (D-Fire Model)`,
        assessment: 'Active Combustion Hazard on Floor 2',
        risk: 'High probability of corridor smoke inhalation',
        action: actionText,
        recommendation: 'Open Exit C, Deploy Medical Team, Deploy Suppression unit',
        version: versionStr,
        decisionTime: '2.1s',
        status: activeIncident.status === 'RESOLVED' ? 'STABILIZED' : 'EXECUTING'
      };
    } else if (activeIncident.disaster_type === 'ROAD_ACCIDENT') {
      return {
        detection: 'Multi-vehicle collision on highway NH-48',
        confidence: '87.0% (BDD100K Model)',
        assessment: 'Traffic lane block (75% flow reduction)',
        risk: 'Secondary collision and driver injury risk',
        action: 'Dispatch Police Team 01 Detour. Dispatch Medical Team 03 (Ambulance).',
        recommendation: 'Block lanes 2 & 3, route highway bypass detour, clear emergency shoulder',
        version: '1',
        decisionTime: '1.4s',
        status: 'EXECUTING'
      };
    } else if (activeIncident.disaster_type === 'INDUSTRIAL_ACCIDENT') {
      return {
        detection: 'Pressure valve defect leakage at Assembly Line 4',
        confidence: '87.0% (MVTec AD PatchCore)',
        assessment: 'Hazardous gaseous plume containment active',
        risk: 'Toxic fume inhalation in confined assembly spaces',
        action: 'Isolate Room 2 ventilation. Dispatch Hazmat Team 01. Shut down Valve 4B.',
        recommendation: 'Shut down Line 4 feed lines, evacuate Assembly hall 2, activate exhaust scrubbing',
        version: '1',
        decisionTime: '1.9s',
        status: 'EXECUTING'
      };
    } else {
      return {
        detection: 'Satellite Damage Assessment: G1 building collapsed',
        confidence: '91.5% (xBD Damage Assessment)',
        assessment: 'Structural collapse / debris entrapment',
        risk: 'Casualty risk in collapsed building structure',
        action: 'Dispatch Rescue Team 04 with heavy crane. Deploy post-event structural recon drone.',
        recommendation: 'Establish safe staging grid, dispatch search canine unit, deploy acoustic sensors',
        version: '1',
        decisionTime: '2.4s',
        status: 'EXECUTING'
      };
    }
  };

  const aiDecision = getAIDecisionContent();

  // Stepper timeline items for demo mode steps
  const demoStepsList = [
    { title: 'Detection', desc: 'Crowd density detected' },
    { title: 'Count', desc: '1,284 people identified' },
    { title: 'Threshold', desc: 'Safety limit exceeded' },
    { title: 'Assess', desc: 'Risk set to CRITICAL' },
    { title: 'Route v1', desc: 'Gate B selected' },
    { title: 'Bottleneck', desc: 'Gate B congested' },
    { title: 'Re-planning', desc: 'AI agent re-evaluation' },
    { title: 'Route v2', desc: 'Gate C selected' },
    { title: 'Dispatch', desc: 'Medical staging deployed' },
    { title: 'Stabilized', desc: 'Risk controlled' }
  ];

  return (
    <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-65px)]">
      {/* Top Banner and Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-borderMuted pb-3 gap-3">
        <div>
          <div className="flex items-center space-x-2 font-mono">
            <span className="text-[10px] bg-brandRed/15 border border-brandRed/45 text-brandRed px-2 py-0.5 rounded font-black uppercase tracking-widest animate-pulse">
              LIVE OPERATIONS
            </span>
            <span className="text-[10px] bg-accentCyan/15 border border-accentCyan/45 text-accentCyan px-2 py-0.5 rounded font-black uppercase tracking-widest">
              DEMO ENGINE READY
            </span>
          </div>
          <h1 className="text-2xl font-black text-textPrimary tracking-tight mt-1">
            EMERGENCY COMMAND CENTER
          </h1>
          <p className="text-xs text-textMuted font-sans">
            AI-assisted disaster detection, risk assessment, and dynamic response planning.
          </p>
        </div>

        {/* Presentation & Mode toggles */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setPresentationMode(!isPresentationMode)}
            className={`px-3 py-1.5 rounded-lg border font-mono text-[11px] font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
              isPresentationMode 
                ? 'bg-accentCyan/20 text-accentCyan border-accentCyan/60 shadow-cyberCyan' 
                : 'bg-navyLight hover:bg-elevated border-borderMuted text-textSecondary'
            }`}
          >
            <Layout className="h-4 w-4" />
            <span>{isPresentationMode ? 'EXIT PRESENTATION' : 'PRESENTATION MODE'}</span>
          </button>
        </div>
      </div>

      {/* Top KPIs Summary */}
      <CommandCenterKPIs />

      {/* Main operational workspace: Responsive Grid */}
      <div className={`grid grid-cols-1 gap-4 items-start ${
        isPresentationMode ? 'xl:grid-cols-3' : 'xl:grid-cols-4'
      }`}>
        
        {/* Left Column: Active Incidents Feed (Hidden or standard depending on presentation Mode) */}
        {!isPresentationMode && (
          <div className="xl:col-span-1 space-y-3">
            <div className="flex items-center justify-between border-b border-borderMuted pb-2">
              <span className="font-mono text-[10px] font-black text-textMuted tracking-wider">ACTIVE INCIDENTS FEED</span>
              <span className="font-mono text-[9px] text-accentCyan bg-accentCyan/10 border border-accentCyan/30 px-1.5 py-0.5 rounded animate-pulse">
                MONITORING LIVE
              </span>
            </div>

            <div className="space-y-2 overflow-y-auto max-h-[700px] pr-1">
              {incidents.map((inc) => {
                const isActive = inc.incident_id === activeIncidentId;
                const isDatasetMode = inc.disaster_type === 'CROWD';
                let Icon = Flame;
                if (inc.disaster_type === 'ROAD_ACCIDENT') Icon = Compass;
                if (inc.disaster_type === 'INDUSTRIAL_ACCIDENT') Icon = Activity;
                if (inc.disaster_type === 'BUILDING_COLLAPSE') Icon = AlertOctagon;
                if (inc.disaster_type === 'CROWD') Icon = Users;

                return (
                  <div
                    key={inc.incident_id}
                    onClick={() => triggerManualIncident(inc.disaster_type)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-200 select-none relative group ${
                      isActive 
                        ? 'bg-navyLight border-accentCyan shadow-cyberCyan text-textPrimary' 
                        : 'bg-navyLight/60 border-borderMuted/60 hover:bg-navyLight hover:border-borderMuted text-textMuted'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] font-black text-textMuted">{inc.incident_id}</span>
                      <div className="flex space-x-1 items-center">
                        <span className={`text-[8px] px-1.5 py-0.5 rounded-md border font-black ${
                          isDatasetMode ? 'bg-accentCyan/15 border-accentCyan/30 text-accentCyan' : 'bg-slate-800 border-slate-700 text-textMuted'
                        }`}>
                          {isDatasetMode ? 'DATASET' : 'SIMULATED'}
                        </span>
                        <span className={`text-[8px] px-1.5 py-0.5 rounded border ${getSeverityBadge(inc.severity)}`}>
                          {inc.severity}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-2.5 flex items-center space-x-2">
                      <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-accentCyan' : 'text-textMuted group-hover:text-textSecondary'}`} />
                      <span className="font-bold text-xs text-textPrimary uppercase tracking-tight font-sans">
                        {inc.disaster_type.replace('_', ' ')}
                      </span>
                    </div>

                    <p className="mt-1 text-[11px] text-textSecondary truncate">{inc.location}</p>

                    <div className="mt-3.5 pt-2 border-t border-borderMuted/20 flex items-center justify-between font-mono text-[9px]">
                      <span className="flex items-center space-x-1">
                        <span>Confidence:</span>
                        <span className="text-textPrimary font-bold">{inc.confidence}%</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>Risk:</span>
                        <span className="text-textPrimary font-bold">{inc.people_at_risk.toLocaleString()} at risk</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Center Column: Map, Timelines & Controls (Fills 2 cols or 2/3 cols) */}
        <div className={`space-y-4 ${
          isPresentationMode ? 'xl:col-span-2' : 'xl:col-span-2'
        }`}>
          
          {/* Operations Map */}
          <OperationsMap />

          {/* Stepper Timeline & Demo Controller */}
          <div className="glass-panel p-4 space-y-4 border border-borderMuted">
            <div className="flex items-center justify-between font-mono text-xs border-b border-borderMuted pb-2">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-accentCyan animate-pulse" />
                <span className="font-bold text-textSecondary uppercase">HERO DEMO TIMELINE ENGINE</span>
              </div>
              <div className="text-[9px] text-textMuted uppercase font-semibold">
                ShanghaiTech Ingress Evacuation
              </div>
            </div>

            {/* Stepper Dots & Labels */}
            <div className="relative pt-2 pb-1 overflow-x-auto scrollbar-none select-none">
              <div className="flex justify-between items-center min-w-[550px] relative">
                {/* Connecting Line */}
                <div className="absolute top-[13px] left-2 right-2 h-0.5 bg-borderMuted z-0"></div>
                <div 
                  className="absolute top-[13px] left-2 h-0.5 bg-accentCyan transition-all duration-500 z-0" 
                  style={{ width: `${demoStep > 0 ? ((demoStep - 1) / 9) * 100 : 0}%` }}
                ></div>

                {demoStepsList.map((step, idx) => {
                  const stepNum = idx + 1;
                  const isActive = demoStep === stepNum;
                  const isCompleted = demoStep > stepNum;

                  return (
                    <div key={idx} className="flex flex-col items-center z-10 relative text-center w-12 font-mono">
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center border text-[10px] font-black transition-all duration-300 ${
                        isActive 
                          ? 'bg-accentCyan text-navyDark border-accentCyan shadow-cyberCyan scale-110 font-black' 
                          : isCompleted 
                          ? 'bg-brandGreen/10 text-brandGreen border-brandGreen/40' 
                          : 'bg-navyLight text-textMuted border-borderMuted hover:text-textSecondary'
                      }`}>
                        {stepNum}
                      </div>
                      <span className={`text-[8px] font-bold mt-1.5 truncate w-14 ${
                        isActive ? 'text-accentCyan' : isCompleted ? 'text-brandGreen' : 'text-textMuted'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step Description HUD */}
            {isDemoRunning && demoStep > 0 && (
              <div className="p-3 bg-black/40 border border-borderMuted rounded-xl font-mono text-[11px] text-textSecondary flex items-start space-x-2 animate-pulse-slow">
                <AlertCircle className="h-4.5 w-4.5 text-accentCyan shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-accentCyan">STEP {demoStep} ACTIVE:</span>{' '}
                  <span>{demoStepsList[demoStep - 1].desc}</span>
                </div>
              </div>
            )}

            {/* Demo Controller Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs pt-1 border-t border-borderMuted/30">
              <div className="flex items-center space-x-2.5">
                <span className="text-textMuted font-bold">SIMULATION:</span>
                {isDemoRunning ? (
                  <span className="flex items-center space-x-1.5 text-accentCyan font-black animate-pulse">
                    <span className="h-2.5 w-2.5 rounded-full bg-accentCyan animate-ping"></span>
                    <span>RUNNING STEP {demoStep}/10</span>
                  </span>
                ) : (
                  <span className="text-textMuted uppercase font-medium">Awaiting simulation trigger</span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {!isDemoRunning ? (
                  <button 
                    onClick={startDemo} 
                    className="bg-accentCyan/10 border border-accentCyan/40 hover:bg-accentCyan/20 text-accentCyan px-4 py-1.5 rounded-lg flex items-center space-x-1.5 font-bold transition-all shadow-cyberCyan/5 cursor-pointer"
                  >
                    <PlayCircle className="h-4 w-4" />
                    <span>▶ START RESQAi DEMO</span>
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      // Pause simulation timer
                      alert("Simulation execution paused. Click Reset or Resume.");
                    }}
                    className="bg-brandAmber/10 border border-brandAmber/40 hover:bg-brandAmber/20 text-brandAmber px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-all cursor-pointer"
                  >
                    <Pause className="h-3.5 w-3.5" />
                    <span>PAUSE</span>
                  </button>
                )}
                
                <button 
                  onClick={resetDemo} 
                  className="bg-navyLight border border-borderMuted hover:bg-elevated text-textSecondary px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-all cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>RESET</span>
                </button>
              </div>
            </div>
          </div>

          {/* Hero interactive Plan Evolution */}
          <PlanEvolution />

          {/* Scrolling System Terminal Event Log */}
          <AgentLog />
        </div>

        {/* Right Column: AI Commander (Structured Decision Logic) */}
        <div className="xl:col-span-1 space-y-3">
          <div className="flex items-center justify-between border-b border-borderMuted pb-2">
            <div className="flex items-center space-x-2">
              <Brain className="h-4.5 w-4.5 text-accentCyan" />
              <span className="font-mono text-[10px] font-black text-textMuted tracking-wider">🧠 AI COMMANDER</span>
            </div>
            <div className="flex items-center space-x-1 text-[10px] text-brandGreen font-mono font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-brandGreen animate-pulse"></span>
              <span>ONLINE</span>
            </div>
          </div>

          {/* AI Decision Panel (Structured Reasoning only, no chain-of-thought) */}
          <div className="glass-panel p-4.5 space-y-4 font-mono text-xs leading-relaxed border border-borderMuted">
            <div className="flex items-center justify-between border-b border-borderMuted/45 pb-2.5">
              <span className="font-black text-textPrimary uppercase tracking-wider">STATUS: ANALYZING INCIDENT</span>
              <span className="text-[10px] text-accentCyan bg-accentCyan/10 border border-accentCyan/35 px-2 py-0.5 rounded font-black">
                PLAN v{aiDecision.version}
              </span>
            </div>

            <div className="space-y-3.5">
              <div>
                <span className="text-[9px] text-textMuted uppercase tracking-widest font-black block">DETECTION</span>
                <p className="text-textPrimary mt-1 text-xs font-semibold">{aiDecision.detection}</p>
              </div>

              <div>
                <span className="text-[9px] text-textMuted uppercase tracking-widest font-black block">CONFIDENCE</span>
                <div className="mt-1 flex items-center space-x-3">
                  <p className="text-accentCyan text-xs font-black shrink-0">{aiDecision.confidence}</p>
                  <div className="w-full bg-navyDark border border-borderMuted h-2 rounded overflow-hidden">
                    <div className="bg-accentCyan h-full shadow-cyberCyan" style={{ width: `${parseFloat(aiDecision.confidence)}%` }}></div>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[9px] text-textMuted uppercase tracking-widest font-black block">ASSESSMENT</span>
                <p className="text-brandOrange mt-1 text-xs font-bold uppercase">{aiDecision.assessment}</p>
              </div>

              <div>
                <span className="text-[9px] text-textMuted uppercase tracking-widest font-black block">RISK</span>
                <p className="text-brandRed mt-1 text-xs font-semibold">{aiDecision.risk}</p>
              </div>

              <div>
                <span className="text-[9px] text-textMuted uppercase tracking-widest font-black block">ACTION</span>
                <p className="text-textSecondary mt-1 text-xs leading-relaxed bg-black/40 border border-borderMuted/30 p-2.5 rounded-lg">
                  {aiDecision.action}
                </p>
              </div>

              <div className="pt-2 border-t border-borderMuted/40">
                <span className="text-[9px] text-textMuted uppercase tracking-widest font-black block">RECOMMENDATION</span>
                <div className="mt-1 bg-accentCyan/5 border border-accentCyan/20 p-2.5 rounded-lg text-accentCyan space-y-1.5 font-sans font-semibold text-xs">
                  {aiDecision.recommendation.split(', ').map((rec, i) => (
                    <div key={i} className="flex items-start space-x-1.5">
                      <span className="text-accentCyan font-bold">➔</span>
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2.5 border-t border-borderMuted/40 grid grid-cols-2 gap-2 text-[9px] text-textMuted">
                <div>
                  <span className="block font-black uppercase text-[8px]">DECISION TIME</span>
                  <span className="text-textPrimary font-bold text-xs mt-0.5 block">{aiDecision.decisionTime}</span>
                </div>
                <div>
                  <span className="block font-black uppercase text-[8px]">STATUS</span>
                  <span className="text-brandGreen font-bold text-xs mt-0.5 block">{aiDecision.status}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Sandbox Controls */}
          <div className="glass-panel p-4 space-y-3.5 border border-borderMuted bg-navyMedium/80">
            <div className="border-b border-borderMuted/40 pb-2 flex items-center space-x-1 text-textSecondary font-mono text-[10px] font-black tracking-wider">
              <span>MANUAL DISASTER INTERRUPTS</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono select-none">
              <button 
                onClick={blockExit}
                disabled={isExitBlocked}
                className="bg-brandRed/10 border border-brandRed/35 hover:bg-brandRed/20 text-brandRed p-2.5 rounded-lg text-center transition-colors font-bold disabled:opacity-40 cursor-pointer"
              >
                {activeIncident.disaster_type === 'CROWD' ? 'CONGEST GATE B' : 'BLOCK EXIT B'}
              </button>
              <button 
                onClick={triggerReplan}
                disabled={activePlanVersion === 2 || !isExitBlocked}
                className="bg-accentCyan/10 border border-accentCyan/35 hover:bg-accentCyan/20 text-accentCyan p-2.5 rounded-lg text-center transition-colors font-bold disabled:opacity-40 cursor-pointer"
              >
                TRIGGER RE-PLAN
              </button>
              <button 
                onClick={increaseRisk}
                className="bg-brandOrange/10 border border-brandOrange/35 hover:bg-brandOrange/20 text-brandOrange p-2.5 rounded-lg text-center transition-colors font-bold cursor-pointer"
              >
                ESCALATE RISK
              </button>
              <button 
                onClick={completeIncident}
                className="bg-brandGreen/10 border border-brandGreen/35 hover:bg-brandGreen/20 text-brandGreen p-2.5 rounded-lg text-center transition-colors font-bold cursor-pointer"
              >
                RESOLVE SCENARIO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommandCenter;
