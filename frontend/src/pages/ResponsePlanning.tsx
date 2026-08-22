import React from 'react';
import { useDemo } from '../state/DemoContext';
import { FileSpreadsheet, AlertTriangle, ShieldCheck, Clock, MapPin, RefreshCw, XCircle } from 'lucide-react';

export const ResponsePlanning: React.FC = () => {
  const { incidents, activeIncidentId, isExitBlocked, activePlanVersion } = useDemo();
  const activeIncident = incidents.find(inc => inc.incident_id === activeIncidentId) || incidents[0];

  return (
    <div className="flex-grow p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-65px)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-navyLight pb-2">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-100 flex items-center">
            <FileSpreadsheet className="h-5 w-5 text-accentCyan mr-2" />
            AI RESPONSE PLAN DELEGATION
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">PLAN HISTORY & RISK CORRIDOR LOGISTICS</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Active plan layout (2/3 col) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-panel p-4 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-navyLight/50 pb-2">
              <span className="font-bold text-slate-200">ACTIVE DISPATCH FRAMEWORK</span>
              <span className="text-[10px] text-accentCyan bg-accentCyan/10 border border-accentCyan/30 px-1.5 py-0.5 rounded font-black">
                PLAN v{activeIncident.disaster_type === 'FIRE' ? activePlanVersion : activeIncident.plan_version}.0
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-slate-500 text-[10px] uppercase">Incident Ref</span>
                <p className="text-slate-200 font-bold">{activeIncident.incident_id} ({activeIncident.disaster_type})</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 text-[10px] uppercase">Severity Index / Risk Score</span>
                <p className="text-brandRed font-black flex items-center">
                  <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                  {activeIncident.severity} (CONF: {activeIncident.confidence}%)
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 text-[10px] uppercase">Active Evacuation Route</span>
                <p className="text-brandGreen font-bold">
                  {activeIncident.disaster_type === 'FIRE' 
                    ? (activePlanVersion === 2 ? 'EXIT C NORTH corridor' : 'EXIT B WEST corridor')
                    : 'Tactical detour routes established'}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 text-[10px] uppercase">Blocked Routes</span>
                <p className="text-brandRed font-bold flex items-center">
                  {activeIncident.disaster_type === 'FIRE' && isExitBlocked ? (
                    <>
                      <XCircle className="h-3.5 w-3.5 mr-1" />
                      <span>EXIT B (Compromised)</span>
                    </>
                  ) : (
                    'None'
                  )}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-navyLight/40">
              <span className="text-[10px] text-slate-500 uppercase block mb-1">Assigned Dispatch Response Teams</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {activeIncident.disaster_type === 'FIRE' && activePlanVersion === 2 ? (
                  <>
                    <span className="bg-brandBlue/10 border border-brandBlue/35 text-brandBlue px-2.5 py-1 rounded text-[10px] font-bold">Fire Team 02</span>
                    <span className="bg-brandBlue/10 border border-brandBlue/35 text-brandBlue px-2.5 py-1 rounded text-[10px] font-bold">Medical Team 01</span>
                  </>
                ) : (
                  activeIncident.assigned_teams.map((t, idx) => (
                    <span key={idx} className="bg-brandBlue/10 border border-brandBlue/35 text-brandBlue px-2.5 py-1 rounded text-[10px] font-bold">{t}</span>
                  ))
                )}
              </div>
            </div>

            <div className="bg-black/30 border border-navyLight p-3 rounded text-slate-350 text-[11px] leading-relaxed">
              <span className="font-bold text-accentCyan uppercase block mb-1">PLAN SUMMARY INSTRUCTION:</span>
              {activeIncident.disaster_type === 'FIRE' && activePlanVersion === 2
                ? 'Exit B is blocked. Shift evacuation to EXIT C staging. Fire Team 02 suppression active. Medical Team 01 staging at exit.'
                : activeIncident.current_plan}
            </div>
          </div>
        </div>

        {/* Plan History (1/3 col) */}
        <div className="lg:col-span-1 space-y-4">
          <div className="glass-panel p-4 space-y-3 font-mono text-xs">
            <div className="flex items-center space-x-1.5 border-b border-navyLight/50 pb-2">
              <Clock className="h-4 w-4 text-slate-400" />
              <h3 className="font-bold text-slate-300">PLAN HISTORY</h3>
            </div>

            <div className="space-y-3">
              {/* Plan v2 */}
              {activeIncident.disaster_type === 'FIRE' && activePlanVersion === 2 && (
                <div className="border border-brandGreen/35 bg-brandGreen/5 p-2 rounded">
                  <div className="flex items-center justify-between border-b border-brandGreen/20 pb-1 mb-1">
                    <span className="font-black text-brandGreen">PLAN v2.0 (ACTIVE)</span>
                    <span className="text-[9px] text-slate-400">14:32:40</span>
                  </div>
                  <ul className="text-[10px] text-slate-300 space-y-1">
                    <li>▪ Route: Exit C</li>
                    <li>▪ Resource: Fire_02 + Med_01</li>
                    <li>▪ State: Execution Running</li>
                  </ul>
                </div>
              )}

              {/* Plan v1 */}
              <div className={`border p-2 rounded ${
                activeIncident.disaster_type === 'FIRE' && isExitBlocked 
                  ? 'border-brandRed/20 bg-brandRed/5 text-slate-500' 
                  : 'border-accentCyan/35 bg-navyDark/35 text-slate-300'
              }`}>
                <div className="flex items-center justify-between border-b border-white/5 pb-1 mb-1">
                  <span className={`font-black ${activeIncident.disaster_type === 'FIRE' && isExitBlocked ? 'text-brandRed font-semibold line-through' : 'text-accentCyan'}`}>
                    PLAN v1.0 {activeIncident.disaster_type === 'FIRE' && isExitBlocked ? '(SUPERSEDED)' : '(ACTIVE)'}
                  </span>
                  <span className="text-[9px] text-slate-500">{activeIncident.timestamp}</span>
                </div>
                <ul className="text-[10px] space-y-1">
                  <li>▪ Route: Exit B (West Corridor)</li>
                  <li>▪ Resource: Fire Team 02</li>
                  <li>▪ State: {activeIncident.disaster_type === 'FIRE' && isExitBlocked ? 'Route Blocked' : 'Execution Running'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
