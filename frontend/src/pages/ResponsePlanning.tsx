import React from 'react';
import { useDemo } from '../state/DemoContext';
import { FileSpreadsheet, AlertTriangle, Clock, XCircle } from 'lucide-react';

export const ResponsePlanning: React.FC = () => {
  const { incidents, activeIncidentId, isExitBlocked, activePlanVersion } = useDemo();
  const activeIncident = incidents.find(inc => inc.incident_id === activeIncidentId) || incidents[0];

  const isCrowd = activeIncident.disaster_type === 'CROWD';

  return (
    <div className="flex-grow p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-65px)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-borderMuted pb-2">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-textPrimary flex items-center">
            <FileSpreadsheet className="h-5 w-5 text-accentCyan mr-2" />
            AI RESPONSE PLAN DELEGATION
          </h1>
          <p className="text-xs text-textMuted font-mono mt-1">PLAN HISTORY & RISK CORRIDOR LOGISTICS</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Active plan layout (2/3 col) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-panel p-5 space-y-4 font-mono text-xs border border-borderMuted">
            <div className="flex items-center justify-between border-b border-borderMuted/45 pb-2.5">
              <span className="font-bold text-textSecondary uppercase">ACTIVE DISPATCH FRAMEWORK</span>
              <span className="text-[10px] text-accentCyan bg-accentCyan/10 border border-accentCyan/30 px-1.5 py-0.5 rounded font-black">
                PLAN v{activePlanVersion}.0
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-textMuted text-[9px] uppercase font-bold block">Incident Reference</span>
                <p className="text-textPrimary font-bold">{activeIncident.incident_id} ({activeIncident.disaster_type})</p>
              </div>

              <div className="space-y-1">
                <span className="text-textMuted text-[9px] uppercase font-bold block">Severity Index / Risk Score</span>
                <p className="text-brandRed font-black flex items-center">
                  <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                  {activeIncident.severity} (CONF: {activeIncident.confidence}%)
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-textMuted text-[9px] uppercase font-bold block">Active Evacuation Corridor</span>
                <p className="text-brandGreen font-bold">
                  {isCrowd 
                    ? (activePlanVersion === 2 ? 'GATE C (DIVERSION)' : 'GATE B (PRIMARY)')
                    : (activePlanVersion === 2 ? 'EXIT C NORTH corridor' : 'EXIT B WEST corridor')}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-textMuted text-[9px] uppercase font-bold block">Obstructed Corridor</span>
                <p className="text-brandRed font-bold flex items-center">
                  {isExitBlocked ? (
                    <>
                      <XCircle className="h-3.5 w-3.5 mr-1" />
                      <span>{isCrowd ? 'GATE B (Saturated / Congested)' : 'EXIT B (Blocked by debris)'}</span>
                    </>
                  ) : (
                    'None Detected'
                  )}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-borderMuted/30">
              <span className="text-[9px] text-textMuted uppercase font-bold block mb-1">Assigned Dispatch Response Teams</span>
              <div className="flex flex-wrap gap-2 mt-1.5">
                {isCrowd && activePlanVersion === 2 ? (
                  <>
                    <span className="bg-brandBlue/10 border border-brandBlue/35 text-brandBlue px-2.5 py-1 rounded text-[10px] font-bold">Police Team 02</span>
                    <span className="bg-brandBlue/10 border border-brandBlue/35 text-brandBlue px-2.5 py-1 rounded text-[10px] font-bold">Rescue Team 01</span>
                    <span className="bg-brandBlue/10 border border-brandBlue/35 text-brandBlue px-2.5 py-1 rounded text-[10px] font-bold">Medical Team 01</span>
                  </>
                ) : (
                  activeIncident.assigned_teams.map((t, idx) => (
                    <span key={idx} className="bg-brandBlue/10 border border-brandBlue/35 text-brandBlue px-2.5 py-1 rounded text-[10px] font-bold">{t}</span>
                  ))
                )}
              </div>
            </div>

            <div className="bg-black/35 border border-borderMuted/30 p-3 rounded-lg text-textSecondary text-[11px] leading-relaxed mt-2.5">
              <span className="font-bold text-accentCyan uppercase block mb-1">PLAN SUMMARY DIRECTIVE:</span>
              {isCrowd && activePlanVersion === 2
                ? 'Gate B congested. Shift evacuation flow to Gate C. Dispatch Medical Team 01 for staging. Police Team 02 staging active. Rescue Team 01 staging active.'
                : activeIncident.current_plan}
            </div>
          </div>
        </div>

        {/* Plan History (1/3 col) */}
        <div className="lg:col-span-1 space-y-4">
          <div className="glass-panel p-4 space-y-3 font-mono text-xs border border-borderMuted bg-navyMedium/60">
            <div className="flex items-center space-x-1.5 border-b border-borderMuted pb-2.5">
              <Clock className="h-4.5 w-4.5 text-textMuted" />
              <h3 className="font-bold text-textSecondary uppercase">PLAN DECISION RECORD</h3>
            </div>

            <div className="space-y-3">
              {/* Plan v2 */}
              {activePlanVersion === 2 && (
                <div className="border border-brandGreen/35 bg-brandGreen/5 p-3 rounded-lg">
                  <div className="flex items-center justify-between border-b border-brandGreen/20 pb-1.5 mb-1.5">
                    <span className="font-black text-brandGreen">PLAN v2.0 (ACTIVE)</span>
                    <span className="text-[9px] text-textMuted">14:32:40</span>
                  </div>
                  <ul className="text-[10px] text-textSecondary space-y-1.5">
                    <li>▪ Corridor: {isCrowd ? 'Gate C' : 'Exit C'}</li>
                    <li>▪ Logistics: {isCrowd ? 'Pol_02, Resc_01, Med_01' : 'Fire_02, Med_01'}</li>
                    <li>▪ State: Dispatch Coordinated</li>
                  </ul>
                </div>
              )}

              {/* Plan v1 */}
              <div className={`border p-3 rounded-lg ${
                isExitBlocked 
                  ? 'border-brandRed/20 bg-brandRed/5 text-textMuted' 
                  : 'border-accentCyan/35 bg-navyDark/35 text-textSecondary'
              }`}>
                <div className="flex items-center justify-between border-b border-borderMuted/30 pb-1.5 mb-1.5">
                  <span className={`font-black ${isExitBlocked ? 'text-brandRed font-semibold line-through' : 'text-accentCyan'}`}>
                    PLAN v1.0 {isExitBlocked ? '(SUPERSEDED)' : '(ACTIVE)'}
                  </span>
                  <span className="text-[9px] text-textMuted">{activeIncident.timestamp}</span>
                </div>
                <ul className="text-[10px] space-y-1.5">
                  <li>▪ Corridor: {isCrowd ? 'Gate B' : 'Exit B'}</li>
                  <li>▪ Logistics: {isCrowd ? 'Police Team 02' : 'Fire Team 02'}</li>
                  <li>▪ State: {isExitBlocked ? 'Corridor Congested' : 'Dispatch Coordinated'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
export default ResponsePlanning;
