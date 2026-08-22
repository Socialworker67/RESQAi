import React, { useState } from 'react';
import { useDemo } from '../state/DemoContext';
import { FileText, Download, Printer, CheckCircle, RefreshCw, FileCheck } from 'lucide-react';

export const Reports: React.FC = () => {
  const { incidents, activeIncidentId, isExitBlocked, activePlanVersion } = useDemo();
  const activeIncident = incidents.find(inc => inc.incident_id === activeIncidentId) || incidents[0];
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 1500);
  };

  const handleDownloadJson = () => {
    const reportData = {
      reportId: `RSQ-2026-0822-001`,
      timestamp: new Date().toISOString(),
      incident: {
        id: activeIncident.incident_id,
        disaster: activeIncident.disaster_type,
        location: activeIncident.location,
        severity: activeIncident.severity,
        peopleAtRisk: activeIncident.people_at_risk,
        modelConfidence: activeIncident.confidence,
        planVersion: activePlanVersion,
        isObstructionPresent: isExitBlocked,
        finalStatus: activeIncident.status
      }
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `RESQAi_Audit_${activeIncident.incident_id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const isCrowd = activeIncident.disaster_type === 'CROWD';

  return (
    <div className="flex-grow p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-65px)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-borderMuted pb-2">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-textPrimary flex items-center">
            <FileText className="h-5 w-5 text-accentCyan mr-2 animate-pulse" />
            INCIDENT AUDIT REPORTS
          </h1>
          <p className="text-xs text-textMuted font-mono mt-1">POST-DISASTER COMPLIANCE & EXPORTS OFFICE</p>
        </div>

        <div className="flex items-center space-x-2 font-mono text-[10px] select-none">
          <button
            onClick={handleGenerate}
            className="bg-accentCyan/10 hover:bg-accentCyan/20 text-accentCyan border border-accentCyan/30 px-3.5 py-1.5 rounded-lg transition-all font-bold flex items-center space-x-1 cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>GENERATE REPORT</span>
          </button>
          <button 
            onClick={() => window.print()}
            className="bg-navyLight hover:bg-elevated text-textSecondary border border-borderMuted px-3.5 py-1.5 rounded-lg transition-all flex items-center space-x-1 cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>EXPORT PDF</span>
          </button>
          <button
            onClick={handleDownloadJson}
            className="bg-navyLight hover:bg-elevated text-textSecondary border border-borderMuted px-3.5 py-1.5 rounded-lg transition-all flex items-center space-x-1 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>DOWNLOAD JSON</span>
          </button>
        </div>
      </div>

      {/* Grid listing report content */}
      <div className="glass-panel p-6 max-w-4xl mx-auto font-mono text-xs space-y-6 border border-borderMuted/80 bg-navyMedium/30 relative">
        <div className="absolute top-6 right-6 select-none opacity-[0.03]">
          <FileCheck className="h-28 w-28 text-accentCyan" />
        </div>

        {/* Report Header */}
        <div className="border-b border-borderMuted/60 pb-4.5 text-center space-y-1.5">
          <h2 className="text-lg font-black tracking-widest text-textPrimary uppercase">RESQAi INCIDENT OPERATIONS REPORT</h2>
          <p className="text-[10px] text-textMuted uppercase font-bold tracking-wider">EOC OFFICIAL DIGITAL AUDIT RECORD SHEET</p>
        </div>

        {/* Core parameters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-borderMuted/35 pb-4">
          <div className="space-y-0.5">
            <span className="text-[9px] text-textMuted uppercase block">REPORT ID</span>
            <p className="text-textPrimary font-bold">RSQ-2026-0822-001</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[9px] text-textMuted uppercase block">DISASTER TYPE</span>
            <p className="text-brandOrange font-bold uppercase">{isCrowd ? 'Crowd Risk' : activeIncident.disaster_type.replace('_', ' ')}</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[9px] text-textMuted uppercase block">LOCATION</span>
            <p className="text-textPrimary font-semibold">{activeIncident.location}</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[9px] text-textMuted uppercase block">DETECTION TIME</span>
            <p className="text-textPrimary font-semibold">{activeIncident.timestamp} UTC</p>
          </div>
        </div>

        {/* Evaluation telemetry */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-borderMuted/35 pb-4">
          <div className="space-y-0.5">
            <span className="text-[9px] text-textMuted uppercase block">PERCEPTION DETECTION</span>
            <p className="text-accentCyan font-bold">{isCrowd ? 'ShanghaiTech Model' : 'YOLOv8 D-Fire Model'}</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[9px] text-textMuted uppercase block">SEVERITY LEVEL</span>
            <p className="text-brandRed font-black uppercase text-xs">{activeIncident.severity}</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[9px] text-textMuted uppercase block">PEOPLE AT RISK</span>
            <p className="text-textPrimary font-bold text-xs">{activeIncident.people_at_risk.toLocaleString()} occupants</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[9px] text-textMuted uppercase block">MODEL CONFIDENCE</span>
            <p className="text-textPrimary font-bold">{activeIncident.confidence}%</p>
          </div>
        </div>

        {/* Plan Details */}
        <div className="space-y-4">
          <div className="bg-black/30 border border-borderMuted p-3 rounded-lg space-y-1.5">
            <span className="text-[9px] text-textMuted uppercase font-black block">INITIAL DISPATCH PLAN (v1)</span>
            <p className="text-textSecondary leading-relaxed">
              {isCrowd 
                ? 'Route crowd evacuation flow via Gate B chute. Assign Police Team 02 to guide ingress crowd flow and open entry turnstiles.'
                : 'Evacuate floor occupancy via primary Exit B corridor. Dispatch Fire Team 02 for suppression.'}
            </p>
          </div>

          {isExitBlocked && (
            <>
              <div className="bg-brandRed/5 border border-brandRed/35 p-3 rounded-lg space-y-1 text-brandRed font-bold">
                <span className="text-[9px] text-textMuted uppercase font-black block">ENVIRONMENT STATE CHANGE DETECTED</span>
                <p>
                  {isCrowd 
                    ? 'Sensory Warning: Gate B Plaza density exceeded structural limit. Sudden crowd bottlenecking observed.' 
                    : 'Sensory Warning: Exit B access corridor blocked by collapsed ceiling structural debris.'}
                </p>
              </div>

              <div className="bg-brandGreen/5 border border-brandGreen/35 p-3 rounded-lg space-y-1.5">
                <span className="text-[9px] text-textMuted uppercase font-black block">RE-PLANNED AI RESPONSE FRAMEWORK (v2)</span>
                <p className="text-textSecondary leading-relaxed">
                  {isCrowd 
                    ? 'Gate B congested. Shift evacuation corridor redirection to Gate C and D. Dispatch Medical Team 01 to Gate C staging. Retain Police Team 02 at entrance.' 
                    : 'Exit B is blocked. Shift evacuation path to EXIT C. Retain Fire Team 02 for suppression. Dispatch Medical Team 01 for triage staging at exit.'}
                </p>
              </div>
            </>
          )}

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-borderMuted/30">
            <div>
              <span className="text-[9px] text-textMuted uppercase block">FINAL ROUTING DECISION</span>
              <p className="text-brandGreen font-bold mt-1 uppercase">
                {isExitBlocked 
                  ? (isCrowd ? 'GATE C/D DIVERSION ROUTES' : 'EXIT C NORTH CORRIDOR')
                  : (isCrowd ? 'GATE B PRIMARY PATH' : 'EXIT B WEST CORRIDOR')}
              </p>
            </div>
            <div>
              <span className="text-[9px] text-textMuted uppercase block">INCIDENT FINAL STATUS</span>
              <p className="text-brandGreen font-black mt-1 flex items-center">
                <CheckCircle className="h-4.5 w-full mr-1.5" />
                <span>{activeIncident.status === 'RESOLVED' ? 'STABILIZED / RESOLVED' : activeIncident.status}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Reports;
