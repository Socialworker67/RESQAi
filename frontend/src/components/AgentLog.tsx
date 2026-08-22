import React from 'react';
import { useDemo } from '../state/DemoContext';
import { Terminal } from 'lucide-react';

export const AgentLog: React.FC = () => {
  const { logs } = useDemo();

  return (
    <div className="bg-black/90 rounded border border-navyLight/70 p-3 h-[240px] flex flex-col font-mono text-[11px] leading-relaxed">
      {/* Terminal Title */}
      <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2 select-none shrink-0 text-slate-400">
        <div className="flex items-center space-x-1.5">
          <Terminal className="h-3.5 w-3.5 text-accentCyan animate-pulse" />
          <span className="font-bold text-[10px] tracking-wider text-slate-300">AGENT_ACTIVITY_LOG</span>
        </div>
        <div className="flex space-x-1">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-accentCyan animate-pulse"></span>
        </div>
      </div>

      {/* Log Feed */}
      <div className="flex-1 overflow-y-auto space-y-1 scrollbar-thin">
        {logs.map((log, idx) => {
          let colorClass = 'text-slate-300';
          if (log.type === 'alert') colorClass = 'text-brandRed font-semibold';
          if (log.type === 'warning') colorClass = 'text-brandOrange';
          if (log.type === 'system') colorClass = 'text-accentCyan font-medium';
          
          return (
            <div key={idx} className="flex items-start space-x-2 border-b border-white/[0.02] py-0.5">
              <span className="text-slate-500 select-none shrink-0">[{log.time}]</span>
              <span className={colorClass}>{log.message}</span>
            </div>
          );
        })}
        {logs.length === 0 && (
          <div className="text-slate-500 italic text-center py-10">No activities registered.</div>
        )}
      </div>
    </div>
  );
};
