import React from 'react';
import { useDemo } from '../state/DemoContext';
import { OperationsMap } from '../components/OperationsMap';
import { Map, Crosshair, ZoomIn, ZoomOut, Layers } from 'lucide-react';

export const OperationsMapPage: React.FC = () => {
  const { incidents, activeIncidentId, triggerManualIncident } = useDemo();
  const activeIncident = incidents.find(inc => inc.incident_id === activeIncidentId) || incidents[0];

  return (
    <div className="flex-grow p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-65px)] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-navyLight pb-2 shrink-0">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-100 flex items-center">
            <Map className="h-5 w-5 text-accentCyan mr-2" />
            LIVE OPERATIONS MAP ROOM
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">EOC TACTICAL MAP VECTOR VIEWPORT</p>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-4 gap-4 items-stretch min-h-[500px]">
        {/* Full-width Map Viewport (3/4 cols) */}
        <div className="xl:col-span-3 flex flex-col justify-between">
          <OperationsMap />
        </div>

        {/* Map Room Controls Panel (1/4 cols) */}
        <div className="xl:col-span-1 glass-panel p-4 space-y-4 font-mono text-xs flex flex-col justify-between border border-navyLight/75">
          <div className="space-y-4">
            <div className="border-b border-navyLight pb-2 flex items-center space-x-1.5 text-slate-350">
              <Layers className="h-4 w-4 text-accentCyan" />
              <span className="font-bold text-slate-350">TACTICAL LAYER MANAGER</span>
            </div>

            {/* Checkbox filters (simulated) */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-slate-350 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-navyLight text-accentCyan focus:ring-accentCyan" />
                <span>Thermal Hotspots (CV)</span>
              </label>
              <label className="flex items-center space-x-2 text-slate-350 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-navyLight text-accentCyan focus:ring-accentCyan" />
                <span>Evacuation Route Lines</span>
              </label>
              <label className="flex items-center space-x-2 text-slate-350 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-navyLight text-accentCyan focus:ring-accentCyan" />
                <span>Responder Crew GPS</span>
              </label>
              <label className="flex items-center space-x-2 text-slate-350 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-navyLight text-accentCyan focus:ring-accentCyan" />
                <span>Roadblocks / Compromised Paths</span>
              </label>
              <label className="flex items-center space-x-2 text-slate-350 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-navyLight text-accentCyan focus:ring-accentCyan" />
                <span>Safe Zones & Staging Areas</span>
              </label>
            </div>

            {/* Zoom / Navigation buttons */}
            <div className="space-y-2 pt-2 border-t border-navyLight/40">
              <span className="text-[10px] text-slate-500 uppercase">MAP CONTROLS</span>
              <div className="flex space-x-2">
                <button className="flex-1 bg-navyLight hover:bg-navyLight/70 border border-navyLight p-2 rounded text-center transition-colors flex items-center justify-center space-x-1">
                  <ZoomIn className="h-3.5 w-3.5" />
                  <span>ZOOM IN</span>
                </button>
                <button className="flex-1 bg-navyLight hover:bg-navyLight/70 border border-navyLight p-2 rounded text-center transition-colors flex items-center justify-center space-x-1">
                  <ZoomOut className="h-3.5 w-3.5" />
                  <span>ZOOM OUT</span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Grid selection */}
          <div className="pt-4 border-t border-navyLight/40 space-y-2">
            <span className="text-[10px] text-slate-500 uppercase">ACTIVE TARGET GRID</span>
            <div className="space-y-1">
              {incidents.map((inc) => (
                <button
                  key={inc.incident_id}
                  onClick={() => triggerManualIncident(inc.disaster_type)}
                  className={`w-full text-left p-2 rounded transition-colors flex items-center justify-between text-[10px] ${
                    inc.incident_id === activeIncidentId 
                      ? 'bg-accentCyan/10 text-accentCyan border border-accentCyan/30 font-bold' 
                      : 'text-slate-400 hover:bg-navyDark'
                  }`}
                >
                  <span className="uppercase">{inc.disaster_type.replace('_', ' ')}</span>
                  <span className="text-slate-500">{inc.incident_id}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
