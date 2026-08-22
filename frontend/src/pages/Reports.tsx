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
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(activeIncident, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `RESQAi_${activeIncident.incident_id}_Report.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="flex-grow p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-65px)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-navyLight pb-2">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-100 flex items-center">
            <FileText className="h-5 w-5 text-accentCyan mr-2" />
            INCIDENT AUDIT REPORTS
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">POST-DISASTER COMPLIANCE & EXPORTS OFFICE</p>
        </div>

        <div className="flex items-center space-x-2 font-mono text-[10px]">
          <button
            onClick={handleGenerate}
            className="bg-accentCyan/15 hover:bg-accentCyan/25 text-accentCyan border border-accentCyan/45 px-3 py-1.5 rounded transition-colors font-bold flex items-center space-x-1"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>GENERATE REPORT</span>
          </button>
          <button 
            onClick={() => alert("PDF print generation initialized in silent mock mode.")}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-3 py-1.5 rounded transition-colors flex items-center space-x-1"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>EXPORT PDF</span>
          </button>
          <button
            onClick={handleDownloadJson}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-3 py-1.5 rounded transition-colors flex items-center space-x-1"
          >
            <Download className="h-3.5 w-3.5" />
            <span>DOWNLOAD JSON</span>
          </button>
        </div>
      </div>

      {/* Grid listing report content */}
      <div className="glass-panel p-6 max-w-4xl mx-auto font-mono text-xs space-y-6 border border-navyLight/75 bg-navyMedium/40 relative">
        <div className="absolute top-6 right-6 select-none opacity-10">
          <FileCheck className="h-28 w-28 text-accentCyan" />
        </div>

        {/* Report Header */}
        <div className="border-b border-navyLight/60 pb-4 text-center space-y-1">
          <h2 className="text-lg font-black tracking-widest text-slate-200">RESQAi DISASTER OPERATIONS REPORT</h2>
          <p className="text-[10px] text-slate-500 uppercase">EOC DIGITAL INCIDENT RECORD SHEET</p>
        </div>

        {/* Core parameters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-navyLight/40 pb-4">
          <div className="space-y-0.5">
            <span className="text-[9px] text-slate-500 uppercase">INCIDENT ID</span>
            <p className="text-slate-200 font-bold">{activeIncident.incident_id}</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[9px] text-slate-500 uppercase">DISASTER TYPE</span>
            <p className="text-brandOrange font-bold uppercase">{activeIncident.disaster_type.replace('_', ' ')}</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[9px] text-slate-500 uppercase">LOCATION</span>
            <p className="text-slate-200">{activeIncident.location}</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[9px] text-slate-500 uppercase">DETECTION TIME</span>
            <p className="text-slate-200">{activeIncident.timestamp} UTC</p>
          </div>
        </div>

        {/* Evaluation telemetry */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-navyLight/40 pb-4">
          <div className="space-y-0.5">
            <span className="text-[9px] text-slate-500 uppercase">MODEL CONFIDENCE</span>
            <p className="text-accentCyan font-bold">{activeIncident.confidence}%</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[9px] text-slate-500 uppercase">SEVERITY LEVEL</span>
            <p className="text-brandRed font-black">{activeIncident.severity}</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[9px] text-slate-500 uppercase">PEOPLE AT RISK</span>
            <p className="text-slate-200 font-bold">{activeIncident.people_at_risk.toLocaleString()}</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[9px] text-slate-500 uppercase">TEAMS DEPLOYED</span>
            <p className="text-slate-200">
              {activeIncident.disaster_type === 'FIRE' && activePlanVersion === 2
                ? 'Fire_02, Med_01'
                : activeIncident.assigned_teams.join(', ')}
            </p>
          </div>
        </div>

        {/* Plan Details */}
        <div className="space-y-4">
          <div className="bg-black/30 border border-navyLight p-3 rounded space-y-1">
            <span className="text-[9px] text-slate-500 uppercase font-black">INITIAL DECISION PLAN (v1)</span>
            <p className="text-slate-300">
              {activeIncident.disaster_type === 'FIRE' 
                ? 'Evacuate floor occupancy via primary Exit B corridor. Dispatch Fire Team 02 for suppression.' 
                : activeIncident.current_plan}
            </p>
          </div>

          {activeIncident.disaster_type === 'FIRE' && isExitBlocked && (
            <>
              <div className="bg-brandRed/5 border border-brandRed/35 p-3 rounded space-y-1 text-brandRed font-bold">
                <span className="text-[9px] text-slate-500 uppercase font-black block">ENVIRONMENTAL STATE CHANGE DETECTED</span>
                <p>Sensor warning: EXIT B compromised. Access path completely blocked by collapsed ceiling debris.</p>
              </div>

              <div className="bg-brandGreen/5 border border-brandGreen/35 p-3 rounded space-y-1">
                <span className="text-[9px] text-slate-500 uppercase font-black block">RE-PLANNED AI RESPONSE FRAMEWORK (v2)</span>
                <p className="text-slate-350">Exit B is blocked. Shift evacuation path to EXIT C. Retain Fire Team 02 for suppression. Dispatch Medical Team 01 for triage staging at exit.</p>
              </div>
            </>
          )}

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <span className="text-[9px] text-slate-500 uppercase">FINAL LOGISTICS ROUTE</span>
              <p className="text-brandGreen font-bold mt-1">
                {activeIncident.disaster_type === 'FIRE' 
                  ? (activePlanVersion === 2 ? 'EXIT C NORTH ROUTE' : 'EXIT B WEST ROUTE')
                  : 'Tactical detour routes established'}
              </p>
            </div>
            <div>
              <span className="text-[9px] text-slate-500 uppercase">INCIDENT FINAL STATUS</span>
              <p className="text-brandGreen font-black mt-1 flex items-center">
                <CheckCircle className="h-4 w-4 mr-1 animate-pulse" />
                {activeIncident.status}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
