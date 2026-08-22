import React from 'react';
import { useDemo } from '../state/DemoContext';
import { Users, Truck } from 'lucide-react';

export const EmergencyTeams: React.FC = () => {
  const { teams } = useDemo();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-brandGreen/10 border-brandGreen/35 text-brandGreen font-bold';
      case 'Assigned':
        return 'bg-brandOrange/10 border-brandOrange/35 text-brandOrange font-bold';
      case 'En Route':
        return 'bg-brandBlue/10 border-brandBlue/35 text-brandBlue font-bold';
      case 'Busy':
        return 'bg-brandRed/10 border-brandRed/35 text-brandRed font-bold';
      default:
        return 'bg-slate-800 text-slate-400';
    }
  };

  return (
    <div className="flex-grow p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-65px)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-navyLight pb-2">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-100 flex items-center">
            <Users className="h-5 w-5 text-accentCyan mr-2" />
            EMERGENCY RESPONSE TEAMS REGISTRY
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">CREW TELEMETRY & AVAILABILITY INDEX</p>
        </div>
      </div>

      {/* Grid view */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {teams.map((t) => {
          return (
            <div key={t.id} className="glass-panel p-3 border border-navyLight/70 flex items-start space-x-3 font-mono text-xs hover:border-accentCyan/30 transition-colors">
              <div className="p-2 bg-navyLight rounded border border-navyLight">
                <Truck className="h-5 w-5 text-accentCyan" />
              </div>
              <div className="flex-grow space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-200">{t.name}</h3>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded border ${getStatusBadge(t.status)}`}>
                    {t.status}
                  </span>
                </div>
                
                <div className="space-y-1 mt-2 text-[10px] text-slate-400">
                  <p>
                    <span className="text-slate-500 font-black">TYPE:</span>{' '}
                    <span className="text-slate-200">{t.type} Unit</span>
                  </p>
                  <p>
                    <span className="text-slate-500 font-black">LOCATION:</span>{' '}
                    <span className="text-slate-200">{t.location}</span>
                  </p>
                  {t.eta && (
                    <p>
                      <span className="text-slate-500 font-black">ETA:</span>{' '}
                      <span className="text-accentCyan font-bold">{t.eta}</span>
                    </p>
                  )}
                  {t.current_incident && (
                    <p>
                      <span className="text-slate-500 font-black">INCIDENT:</span>{' '}
                      <span className="text-brandOrange font-bold">{t.current_incident}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
