import React from 'react';
import { useDemo } from '../state/DemoContext';
import { datasetsInfo } from '../data/datasets';
import { Database, Link2, ExternalLink, Cpu, BookOpen } from 'lucide-react';

export const DatasetsModels: React.FC = () => {
  return (
    <div className="flex-grow p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-65px)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-navyLight pb-2">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-100 flex items-center">
            <Database className="h-5 w-5 text-accentCyan mr-2" />
            AI PERCEPTION LAYER
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">MODEL CARD INDEX & TRAINING DATASETS REFERENCE</p>
        </div>
      </div>

      {/* Grid listing five dataset cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {datasetsInfo.map((ds, idx) => {
          return (
            <div key={idx} className="glass-panel p-4 border border-navyLight/70 flex flex-col justify-between hover:border-accentCyan/30 transition-colors font-mono text-xs">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-navyLight pb-2">
                  <span className="font-black text-sm text-slate-100">{ds.name}</span>
                  <span className="text-[9px] bg-navyLight border border-navyLight text-slate-450 px-1.5 py-0.5 rounded uppercase font-bold select-none text-slate-400">
                    {ds.disasterType}
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  <p>
                    <span className="text-slate-500 font-black">TASK:</span>{' '}
                    <span className="text-accentCyan font-bold">{ds.task}</span>
                  </p>
                  <p>
                    <span className="text-slate-500 font-black">DATA VOLUME:</span>{' '}
                    <span className="text-slate-200">{ds.images}</span>
                  </p>
                  <p>
                    <span className="text-slate-500 font-black">STATUS:</span>{' '}
                    <span className="text-brandGreen font-bold">{ds.modelStatus}</span>
                  </p>
                  <p className="text-slate-400 leading-relaxed text-[11px] mt-2 font-sans pt-1">
                    {ds.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-navyLight/40 grid grid-cols-2 gap-2 text-[10px]">
                <a
                  href={ds.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 hover:bg-slate-700 border border-slate-700 py-1.5 rounded flex items-center justify-center space-x-1 text-slate-300 font-bold transition-colors"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>VIEW SOURCE</span>
                </a>
                <button className="bg-accentCyan/10 hover:bg-accentCyan/20 text-accentCyan border border-accentCyan/30 py-1.5 rounded flex items-center justify-center space-x-1 font-bold transition-colors">
                  <Cpu className="h-3.5 w-3.5" />
                  <span>MODEL DETAILS</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
