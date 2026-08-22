import React, { useState, useEffect } from 'react';
import { useDemo } from '../state/DemoContext';
import { Activity, ShieldAlert, Cpu, Database, Play } from 'lucide-react';

export const Topbar: React.FC = () => {
  const { cvEngineOnline, aiAgentOnline, dbOnline, simReady } = useDemo();
  const [time, setTime] = useState<string>(new Date().toISOString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toISOString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.replace('T', ' ').substring(0, 19) + ' UTC';

  return (
    <header className="border-b border-navyLight bg-navyDark/90 backdrop-blur-md px-6 py-3 flex items-center justify-between z-10 sticky top-0">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-accentCyan/20 blur-sm animate-pulse-slow"></div>
          <ShieldAlert className="h-6 w-6 text-accentCyan relative" />
        </div>
        <div>
          <span className="font-mono text-xs font-bold tracking-widest text-accentCyan uppercase">Live Operational Console</span>
          <h1 className="text-xl font-bold tracking-tight text-slate-100 flex items-center">
            RESQA<span className="text-accentCyan font-extrabold">i</span>
            <span className="ml-2 text-[10px] bg-accentCyan/10 border border-accentCyan/30 text-accentCyan px-1.5 py-0.5 rounded font-mono font-medium">v1.0-PROTOTYPE</span>
          </h1>
        </div>
      </div>

      {/* Clock and system heartbeats */}
      <div className="flex items-center space-x-6">
        <div className="font-mono text-sm text-slate-400 bg-navyMedium border border-navyLight px-3 py-1.5 rounded select-none">
          {formattedTime}
        </div>

        {/* Engine status indicators */}
        <div className="hidden md:flex items-center space-x-4 text-xs font-mono">
          <div className="flex items-center space-x-1.5">
            <Cpu className={`h-3.5 w-3.5 ${cvEngineOnline ? 'text-brandGreen' : 'text-brandRed animate-pulse'}`} />
            <span className="text-slate-400">CV Engine:</span>
            <span className={cvEngineOnline ? 'text-brandGreen font-semibold' : 'text-brandRed font-semibold'}>
              {cvEngineOnline ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>

          <div className="flex items-center space-x-1.5">
            <Activity className={`h-3.5 w-3.5 ${aiAgentOnline ? 'text-brandGreen animate-pulse-slow' : 'text-brandRed animate-pulse'}`} />
            <span className="text-slate-400">AI Commander:</span>
            <span className={aiAgentOnline ? 'text-brandGreen font-semibold' : 'text-brandRed font-semibold'}>
              {aiAgentOnline ? 'ACTIVE' : 'OFFLINE'}
            </span>
          </div>

          <div className="flex items-center space-x-1.5">
            <Database className={`h-3.5 w-3.5 ${dbOnline ? 'text-brandGreen' : 'text-brandRed'}`} />
            <span className="text-slate-400">Database:</span>
            <span className={dbOnline ? 'text-brandGreen font-semibold' : 'text-brandRed font-semibold'}>
              {dbOnline ? 'ONLINE' : 'DEGRADED'}
            </span>
          </div>

          <div className="flex items-center space-x-1.5">
            <Play className={`h-3.5 w-3.5 ${simReady ? 'text-brandGreen' : 'text-slate-500'}`} />
            <span className="text-slate-400">Simulation:</span>
            <span className={simReady ? 'text-accentCyan font-semibold' : 'text-slate-500 font-semibold'}>
              {simReady ? 'READY' : 'OFFLINE'}
            </span>
          </div>
        </div>

        {/* Operator Badge */}
        <div className="flex items-center space-x-2 border-l border-navyLight pl-4">
          <div className="h-2 w-2 rounded-full bg-brandGreen animate-pulse"></div>
          <div className="text-left leading-none">
            <p className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Human-in-the-loop</p>
            <p className="text-xs font-semibold text-slate-200">EOC Operator</p>
          </div>
        </div>
      </div>
    </header>
  );
};
