import React from 'react';
import { Link } from 'react-router-dom';
import { useDemo } from '../state/DemoContext';
import { Flame, Compass, Activity, AlertOctagon, Users, ShieldAlert, ArrowRight, BookOpen } from 'lucide-react';

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
      bg: 'bg-brandRed/10 border-brandRed/35 shadow-cyberRed/20',
      type: 'FIRE'
    },
    {
      title: 'Road Accident Scenario',
      dataset: 'BDD100K + HWID12',
      task: 'Road Scene / Vehicle / Person Understanding',
      description: 'Highway camera analysis of high-speed collision events, vehicular damage, lane obstructions, and pedestrian identification in low-visibility environments.',
      icon: Compass,
      color: 'text-brandOrange',
      bg: 'bg-brandOrange/10 border-brandOrange/35',
      type: 'ROAD_ACCIDENT'
    },
    {
      title: 'Industrial Accident Scenario',
      dataset: 'MVTec AD',
      task: 'Industrial Anomaly Detection',
      description: 'Factory supervisor scanning for mechanical defects, pipeline leaks, component anomalies, and worker safety zones on high-hazard processing lines.',
      icon: Activity,
      color: 'text-brandAmber',
      bg: 'bg-brandAmber/10 border-brandAmber/35',
      type: 'INDUSTRIAL_ACCIDENT'
    },
    {
      title: 'Building Collapse Scenario',
      dataset: 'xBD / xView2',
      task: 'Building Damage Assessment',
      description: 'Satellite reconnaissance mapping post-earthquake damage, classifying structures from unaffected to completely destroyed to schedule heavy rescue cranes.',
      icon: AlertOctagon,
      color: 'text-brandRed animate-pulse',
      bg: 'bg-brandRed/15 border-brandRed/40 shadow-cyberRed/20',
      type: 'BUILDING_COLLAPSE'
    },
    {
      title: 'Crowd Crush Scenario',
      dataset: 'ShanghaiTech',
      task: 'Crowd Counting + Density Estimation',
      description: 'Stadium and exit monitoring using optical flow and density mapping models to estimate occupancy crowd sizes and bottleneck hazards in high-ingress zones.',
      icon: Users,
      color: 'text-brandBlue',
      bg: 'bg-brandBlue/10 border-brandBlue/35',
      type: 'CROWD'
    }
  ];

  return (
    <div className="flex-grow p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-65px)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-navyLight pb-2">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-100 flex items-center">
            <ShieldAlert className="h-5 w-5 text-accentCyan mr-2" />
            SUPPORTED DISASTER SCENARIOS
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">AI PERCEPTION TASKS & DATASET NOMENCLATURES</p>
        </div>
      </div>

      {/* Grid listing exactly five cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {scenarios.map((sc, idx) => (
          <div key={idx} className={`p-4 rounded border backdrop-blur-md flex flex-col justify-between ${sc.bg}`}>
            <div>
              <div className="flex items-center justify-between border-b border-navyLight pb-2 mb-3">
                <div className="flex items-center space-x-2">
                  <sc.icon className={`h-5 w-5 ${sc.color}`} />
                  <span className="font-bold font-mono text-sm text-slate-200">{sc.title}</span>
                </div>
                <span className="font-mono text-[9px] bg-accentCyan/10 border border-accentCyan/30 text-accentCyan px-1.5 py-0.5 rounded font-black">
                  {sc.dataset}
                </span>
              </div>
              <div className="font-mono text-xs space-y-2 text-slate-400">
                <p>
                  <span className="text-slate-500 font-black">PERCEPTION TASK:</span>{' '}
                  <span className="text-slate-200 font-semibold">{sc.task}</span>
                </p>
                <p className="leading-relaxed mt-2 text-[11px]">{sc.description}</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-navyLight/40 grid grid-cols-2 gap-2 font-mono text-[10px]">
              <button
                onClick={() => triggerManualIncident(sc.type as any)}
                className="bg-accentCyan/10 hover:bg-accentCyan/20 text-accentCyan border border-accentCyan/30 py-1.5 rounded text-center transition-colors font-bold"
              >
                OPEN SIMULATION
              </button>
              <Link
                to="/datasets-models"
                className="bg-slate-800 hover:bg-slate-700 text-slate-350 border border-slate-700 py-1.5 rounded text-center inline-flex items-center justify-center space-x-1 transition-colors"
              >
                <BookOpen className="h-3 w-3" />
                <span>VIEW DATASET</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
