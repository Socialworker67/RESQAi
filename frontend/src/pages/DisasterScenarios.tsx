import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDemo } from '../state/DemoContext';
import { Flame, Compass, Activity, AlertOctagon, Users, ShieldAlert, ArrowRight, BookOpen, Info, CheckCircle } from 'lucide-react';

export const DisasterScenarios: React.FC = () => {
  const { triggerManualIncident } = useDemo();

  const scenarios = [
    {
      title: 'Fire Scenario',
      dataset: 'D-Fire',
      task: 'Fire + Smoke Detection',
      description: 'Detection and tracking of combustion anomalies, smoke column density, and human occupants in enclosed structures using thermal and visual wavelengths.',
      icon: Flame,
      color: 'text-brandRed',
      bg: 'bg-navyLight border-borderMuted hover:border-brandRed/35',
      type: 'FIRE',
      status: 'SIMULATION / PLACEHOLDER',
      inputFeed: 'Thermal anomalies scan, 1080p RGB optical feed',
      aiOutput: 'YOLOv8-based combustion & smoke bounding box vectors',
      riskScore: 'CRITICAL (9.4/10)',
      response: 'Dispatch Fire suppression units, calculate primary/secondary escape routes'
    },
    {
      title: 'Road Accident Scenario',
      dataset: 'BDD100K + HWID12',
      task: 'Road Scene / Vehicle / Person Understanding',
      description: 'Highway camera analysis of high-speed collision events, vehicular damage, lane obstructions, and pedestrian identification in low-visibility environments.',
      icon: Compass,
      color: 'text-brandOrange',
      bg: 'bg-navyLight border-borderMuted hover:border-brandOrange/35',
      type: 'ROAD_ACCIDENT',
      status: 'SIMULATION / PLACEHOLDER',
      inputFeed: 'CCTV highway traffic stream, infrared low-light sensors',
      aiOutput: 'Faster R-CNN multi-object lane blockage vector overlays',
      riskScore: 'HIGH (7.8/10)',
      response: 'Dispatch police patrol detour staging, dispatch emergency ambulance'
    },
    {
      title: 'Industrial Accident Scenario',
      dataset: 'MVTec AD',
      task: 'Industrial Anomaly Detection',
      description: 'Factory supervisor scanning for mechanical defects, pipeline leaks, component anomalies, and worker safety zones on high-hazard processing lines.',
      icon: Activity,
      color: 'text-brandAmber',
      bg: 'bg-navyLight border-borderMuted hover:border-brandAmber/35',
      type: 'INDUSTRIAL_ACCIDENT',
      status: 'SIMULATION / PLACEHOLDER',
      inputFeed: 'Industrial optical scanner, machinery pressure valves telemetry',
      aiOutput: 'PatchCore/Autoencoder reconstruction anomaly classification mapping',
      riskScore: 'HIGH (8.0/10)',
      response: 'Isolate machine segment room, close pressure overrides, dispatch Hazmat Unit'
    },
    {
      title: 'Building Collapse Scenario',
      dataset: 'xBD / xView2',
      task: 'Building Damage Assessment',
      description: 'Satellite reconnaissance mapping post-earthquake damage, classifying structures from unaffected to completely destroyed to schedule heavy rescue cranes.',
      icon: AlertOctagon,
      color: 'text-brandRed animate-pulse',
      bg: 'bg-navyLight border-borderMuted hover:border-brandRed/45 shadow-cyberRed/5',
      type: 'BUILDING_COLLAPSE',
      status: 'SIMULATION / PLACEHOLDER',
      inputFeed: 'Pre- & post-disaster satellite imagery, drone grid maps',
      aiOutput: 'U-Net segmentation maps of damaged/destroyed polygon clusters',
      riskScore: 'CRITICAL (9.1/10)',
      response: 'Map entrapment grid sectors, staging heavy cranes, deploy rescue teams'
    },
    {
      title: 'Crowd Crush Scenario',
      dataset: 'ShanghaiTech',
      task: 'Crowd Counting + Density Estimation',
      description: 'Stadium and exit monitoring using optical flow and density mapping models to estimate occupancy crowd sizes and bottleneck hazards in high-ingress zones.',
      icon: Users,
      color: 'text-accentCyan',
      bg: 'bg-navyLight border-accentCyan/30 hover:border-accentCyan/50 shadow-cyberCyan/5',
      type: 'CROWD',
      status: 'REAL DATASET AVAILABLE',
      inputFeed: 'CCTV dome security feeds, entrance turnstile gate logs',
      aiOutput: 'CSRNet crowd density maps and estimated headcount numbers',
      riskScore: 'CRITICAL (9.6/10)',
      response: 'Open Exit turnstiles to override mode, redirect crowd to Gates C & D'
    }
  ];

  const [selectedScenario, setSelectedScenario] = useState<typeof scenarios[0]>(scenarios[4]);

  const handleSelectScenario = (sc: typeof scenarios[0]) => {
    setSelectedScenario(sc);
    triggerManualIncident(sc.type as any);
  };

  return (
    <div className="flex-grow p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-65px)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-borderMuted pb-2">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-textPrimary flex items-center">
            <ShieldAlert className="h-5 w-5 text-accentCyan mr-2" />
            SUPPORTED DISASTER SCENARIOS
          </h1>
          <p className="text-xs text-textMuted font-mono mt-1">AI PERCEPTION LAYER DISASTER SCENARIO INDEX</p>
        </div>
      </div>

      {/* Grid listing exactly five cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {scenarios.map((sc, idx) => {
          const isSelected = selectedScenario.type === sc.type;
          const isReal = sc.type === 'CROWD';

          return (
            <div 
              key={idx} 
              onClick={() => handleSelectScenario(sc)}
              className={`p-4 rounded-xl border backdrop-blur-md flex flex-col justify-between cursor-pointer transition-all duration-300 relative ${
                isSelected 
                  ? 'border-accentCyan bg-navyMedium/95 shadow-cyberCyan text-textPrimary' 
                  : `${sc.bg} bg-navyMedium/50 text-textMuted`
              }`}
            >
              <div>
                <div className="flex items-center justify-between border-b border-borderMuted/30 pb-2 mb-2.5">
                  <div className="flex items-center space-x-1.5">
                    <sc.icon className={`h-4.5 w-4.5 ${sc.color}`} />
                    <span className="font-bold font-mono text-[11px] text-textSecondary uppercase">{sc.dataset}</span>
                  </div>
                  <span className={`text-[7px] font-black px-1 py-0.5 rounded border ${
                    isReal ? 'bg-accentCyan/10 border-accentCyan/30 text-accentCyan' : 'bg-slate-800 border-slate-700 text-textMuted'
                  }`}>
                    {isReal ? 'DATASET' : 'SIMULATION'}
                  </span>
                </div>
                <div className="font-mono text-[11px] space-y-1">
                  <h3 className="font-bold text-textPrimary text-xs mb-1 uppercase tracking-tight">{sc.title}</h3>
                  <p className="leading-relaxed text-[10px] text-textMuted line-clamp-3">{sc.description}</p>
                </div>
              </div>

              <div className="mt-3.5 pt-2 border-t border-borderMuted/20 flex justify-between items-center text-[9px] font-mono text-accentCyan font-bold">
                <span>INSPECT INFO</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Scenario detail inspection panel (Requirement 20) */}
      <div className="glass-panel p-5 border border-borderMuted bg-navyMedium/70 font-mono text-xs space-y-4">
        <div className="flex items-center justify-between border-b border-borderMuted pb-2.5">
          <div className="flex items-center space-x-2 text-textSecondary">
            <Info className="h-4.5 w-4.5 text-accentCyan" />
            <span className="font-bold uppercase">SCENARIO TELEMETRY REGISTRY: {selectedScenario.title}</span>
          </div>
          <span className={`text-[9.5px] font-black px-2 py-0.5 rounded-md border ${
            selectedScenario.type === 'CROWD'
              ? 'bg-brandGreen/10 border-brandGreen/35 text-brandGreen shadow-cyberGreen/10'
              : 'bg-brandOrange/10 border-brandOrange/35 text-brandOrange'
          }`}>
            {selectedScenario.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3.5">
          <div className="space-y-1">
            <span className="text-[9px] text-textMuted uppercase font-black block">INTEGRATED DATASET</span>
            <p className="text-textPrimary font-bold text-xs">{selectedScenario.dataset}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] text-textMuted uppercase font-black block">PERCEPTION TASK</span>
            <p className="text-accentCyan font-bold text-xs">{selectedScenario.task}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] text-textMuted uppercase font-black block">INPUT DATA FEED</span>
            <p className="text-textSecondary">{selectedScenario.inputFeed}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] text-textMuted uppercase font-black block">AI OUTPUT ANNOTATION</span>
            <p className="text-textSecondary">{selectedScenario.aiOutput}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] text-textMuted uppercase font-black block">RISK SEVERITY ESTIMATION</span>
            <p className="text-brandRed font-black">{selectedScenario.riskScore}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] text-textMuted uppercase font-black block">DISPATCH RESPONSE METHOD</span>
            <p className="text-textSecondary">{selectedScenario.response}</p>
          </div>
        </div>

        <div className="pt-3.5 border-t border-borderMuted/30 flex justify-between items-center text-[10px] select-none">
          <div className="flex items-center space-x-1.5 text-textMuted">
            <CheckCircle className="h-4 w-4 text-brandGreen" />
            <span>Interactive sandbox controls are enabled in the Command Center.</span>
          </div>

          <div className="flex space-x-2">
            <Link
              to="/datasets-models"
              className="bg-navyLight hover:bg-elevated border border-borderMuted px-3 py-1.5 rounded-lg flex items-center space-x-1 text-textSecondary font-bold transition-all"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>VIEW MODEL CARDS</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DisasterScenarios;
