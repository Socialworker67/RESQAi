import React, { useState } from 'react';
import { useDemo } from '../state/DemoContext';
import { Settings, Play, ShieldAlert, Cpu, Database, AlertCircle, Sparkles } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const {
    incidents,
    activeIncidentId,
    isExitBlocked,
    activePlanVersion,
    isDemoRunning,
    startDemo,
    resetDemo,
    blockExit,
    increaseRisk,
    triggerReplan,
    completeIncident,
    triggerManualIncident
  } = useDemo();

  // Local state for settings and tabs
  const [activeSubTab, setActiveSubTab] = useState<'SIMULATOR' | 'SYSTEM'>('SIMULATOR');
  
  // Simulated error states
  const [cvOffline, setCvOffline] = useState(false);
  const [agentOffline, setAgentOffline] = useState(false);
  const [dbDegraded, setDbDegraded] = useState(false);

  // Scenario specific input states
  const [fireIntensity, setFireIntensity] = useState(75);
  const [smokeIntensity, setSmokeIntensity] = useState(60);
  const [trafficDensity, setTrafficDensity] = useState(80);
  const [anomalySeverity, setAnomalySeverity] = useState(45);
  const [crowdCount, setCrowdCount] = useState(1284);

  const activeIncident = incidents.find(inc => inc.incident_id === activeIncidentId) || incidents[0];

  return (
    <div className="flex-grow p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-65px)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-navyLight pb-2">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-100 flex items-center">
            <Settings className="h-5 w-5 text-accentCyan mr-2" />
            SYSTEM CONFIGURATION & SIMULATION ENGINE
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">EOC CONTROL ENGINE & SIMULATION OVERRIDES</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-navyLight/60 font-mono text-[10px]">
        <button
          onClick={() => setActiveSubTab('SIMULATOR')}
          className={`px-4 py-2 border-b-2 transition-all ${
            activeSubTab === 'SIMULATOR'
              ? 'border-accentCyan text-accentCyan font-bold'
              : 'border-transparent text-slate-450 hover:text-slate-200 text-slate-400'
          }`}
        >
          SIMULATION ENGINE CONTROLLER
        </button>
        <button
          onClick={() => setActiveSubTab('SYSTEM')}
          className={`px-4 py-2 border-b-2 transition-all ${
            activeSubTab === 'SYSTEM'
              ? 'border-accentCyan text-accentCyan font-bold'
              : 'border-transparent text-slate-450 hover:text-slate-200 text-slate-400'
          }`}
        >
          SYSTEM CONFIGS & FALLBACKS
        </button>
      </div>

      {activeSubTab === 'SIMULATOR' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Scenario Selector & Specific inputs (2/3 col) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-panel p-4 space-y-4 font-mono text-xs">
              <span className="font-bold text-slate-200 block border-b border-navyLight/40 pb-2">
                1. SELECT SIMULATION SCENARIO
              </span>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {incidents.map((inc) => (
                  <button
                    key={inc.incident_id}
                    onClick={() => triggerManualIncident(inc.disaster_type)}
                    className={`p-2.5 rounded border text-center transition-colors font-bold uppercase text-[9px] ${
                      inc.incident_id === activeIncidentId
                        ? 'bg-accentCyan/15 text-accentCyan border-accentCyan shadow-cyberCyan'
                        : 'bg-navyDark border-navyLight text-slate-450 hover:bg-navyMedium hover:text-slate-350 text-slate-400'
                    }`}
                  >
                    {inc.disaster_type.replace('_', ' ')}
                  </button>
                ))}
              </div>

              {/* Scenario specific controls */}
              <div className="pt-4 border-t border-navyLight/40 space-y-4">
                <span className="font-bold text-slate-300 block uppercase">
                  2. ADJUST PARAMETERS: {activeIncident.disaster_type.replace('_', ' ')}
                </span>

                {activeIncident.disaster_type === 'FIRE' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-slate-450 text-[10px]">Fire Intensity ({fireIntensity}%)</label>
                      <input 
                        type="range" min="10" max="100" value={fireIntensity} onChange={(e) => setFireIntensity(parseInt(e.target.value))}
                        className="w-full accent-accentCyan bg-navyDark border border-navyLight rounded h-1 cursor-pointer"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-450 text-[10px]">Smoke Obscuration ({smokeIntensity}%)</label>
                      <input 
                        type="range" min="10" max="100" value={smokeIntensity} onChange={(e) => setSmokeIntensity(parseInt(e.target.value))}
                        className="w-full accent-accentCyan bg-navyDark border border-navyLight rounded h-1 cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {activeIncident.disaster_type === 'ROAD_ACCIDENT' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-slate-450 text-[10px]">Traffic Lane Congestion ({trafficDensity}%)</label>
                      <input 
                        type="range" min="10" max="100" value={trafficDensity} onChange={(e) => setTrafficDensity(parseInt(e.target.value))}
                        className="w-full accent-accentCyan bg-navyDark border border-navyLight rounded h-1 cursor-pointer"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-450 text-[10px]">Ambulance Required</label>
                      <p className="text-brandRed font-bold mt-1 text-xs">YES (DISPATCH MEDICAL 03)</p>
                    </div>
                  </div>
                )}

                {activeIncident.disaster_type === 'INDUSTRIAL_ACCIDENT' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-slate-450 text-[10px]">Plume Density / Anomaly Score ({anomalySeverity}%)</label>
                      <input 
                        type="range" min="10" max="100" value={anomalySeverity} onChange={(e) => setAnomalySeverity(parseInt(e.target.value))}
                        className="w-full accent-accentCyan bg-navyDark border border-navyLight rounded h-1 cursor-pointer"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-450 text-[10px]">Active Hazard Plume</label>
                      <p className="text-brandOrange font-bold mt-1 text-xs">VALVE 4B TOXIC VAPOR</p>
                    </div>
                  </div>
                )}

                {activeIncident.disaster_type === 'BUILDING_COLLAPSE' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-slate-450 text-[10px]">Collapsed Blocks count</label>
                      <p className="text-brandRed font-black mt-1 text-xs">1 FULL COLLAPSE (G1) / 2 COMPROMISED (G2)</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-450 text-[10px]">Heavy Machinery Stage Status</label>
                      <p className="text-brandBlue font-bold mt-1 text-xs">STAGING CRANE ON STANDBY</p>
                    </div>
                  </div>
                )}

                {activeIncident.disaster_type === 'CROWD' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-slate-450 text-[10px]">Estimated PAX count ({crowdCount})</label>
                      <input 
                        type="range" min="200" max="3000" value={crowdCount} onChange={(e) => setCrowdCount(parseInt(e.target.value))}
                        className="w-full accent-accentCyan bg-navyDark border border-navyLight rounded h-1 cursor-pointer"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-450 text-[10px]">Bottleneck gate flow</label>
                      <p className="text-brandRed font-bold mt-1 text-xs">CRITICAL GATE CONGESTION</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Simulation Engine Controls (1/3 col) */}
          <div className="lg:col-span-1 space-y-4">
            <div className="glass-panel p-4 space-y-4 font-mono text-xs border border-navyLight/75">
              <span className="font-bold text-slate-200 block border-b border-navyLight/40 pb-2">
                3. EXECUTION CONTROLLERS
              </span>

              <div className="space-y-2">
                {/* Standard buttons matching specifications */}
                <button
                  onClick={startDemo}
                  disabled={isDemoRunning}
                  className="w-full bg-accentCyan/15 hover:bg-accentCyan/25 border border-accentCyan/40 text-accentCyan p-2 rounded flex items-center justify-center space-x-1.5 font-bold transition-colors disabled:opacity-40"
                >
                  <Play className="h-4 w-4" />
                  <span>START SIMULATION (DEMO)</span>
                </button>

                <button
                  onClick={() => alert(`Sensory trigger broadcast for incident ${activeIncident.incident_id}`)}
                  className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 p-2 rounded text-center transition-colors text-slate-350"
                >
                  TRIGGER INCIDENT SENSORS
                </button>

                <button
                  onClick={blockExit}
                  disabled={activeIncident.disaster_type !== 'FIRE' || isExitBlocked}
                  className="w-full bg-brandRed/10 hover:bg-brandRed/20 border border-brandRed/35 text-brandRed p-2 rounded text-center transition-colors disabled:opacity-40"
                >
                  BLOCK ROUTE / EXIT B
                </button>

                <button
                  onClick={increaseRisk}
                  className="w-full bg-brandOrange/10 hover:bg-brandOrange/20 border border-brandOrange/35 text-brandOrange p-2 rounded text-center transition-colors"
                >
                  INCREASE RISK RATING
                </button>

                <button
                  onClick={triggerReplan}
                  disabled={activeIncident.disaster_type !== 'FIRE' || activePlanVersion === 2}
                  className="w-full bg-accentCyan/10 hover:bg-accentCyan/20 border border-accentCyan/35 text-accentCyan p-2 rounded text-center transition-colors disabled:opacity-40"
                >
                  TRIGGER AI RE-PLANNING
                </button>

                <button
                  onClick={resetDemo}
                  className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-750 p-2 rounded text-center transition-colors text-slate-400"
                >
                  RESET SIMULATOR STATE
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto glass-panel p-6 space-y-6 font-mono text-xs border border-navyLight/75">
          <div className="border-b border-navyLight/50 pb-3 flex items-center space-x-1 text-slate-300">
            <ShieldAlert className="h-4 w-4 text-accentCyan" />
            <span className="font-bold text-slate-200">SYSTEM FALLBACK MODULES</span>
          </div>

          <div className="space-y-4">
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              To test the resilience of the RESQAi command deck, you can manually disconnect systems below. Fallback modes activate immediately.
            </p>

            {/* Fallback 1: CV engine */}
            <div className="flex items-center justify-between border-b border-navyLight/30 pb-3">
              <div>
                <h4 className="font-bold text-slate-200">Computer Vision Perception Engine</h4>
                <p className="text-[10px] text-slate-500">Toggles live inference feeds.</p>
              </div>
              <button
                onClick={() => setCvOffline(!cvOffline)}
                className={`px-3 py-1 rounded border text-[10px] font-bold transition-all ${
                  cvOffline 
                    ? 'bg-brandRed/15 border-brandRed text-brandRed animate-pulse' 
                    : 'bg-brandGreen/10 border-brandGreen/35 text-brandGreen'
                }`}
              >
                {cvOffline ? 'CV OFFLINE' : 'CV ONLINE'}
              </button>
            </div>

            {/* Fallback 2: AI Agent */}
            <div className="flex items-center justify-between border-b border-navyLight/30 pb-3">
              <div>
                <h4 className="font-bold text-slate-200">AI Commander Decision Unit</h4>
                <p className="text-[10px] text-slate-500">Toggles agent auto-planning.</p>
              </div>
              <button
                onClick={() => setAgentOffline(!agentOffline)}
                className={`px-3 py-1 rounded border text-[10px] font-bold transition-all ${
                  agentOffline 
                    ? 'bg-brandRed/15 border-brandRed text-brandRed animate-pulse' 
                    : 'bg-brandGreen/10 border-brandGreen/35 text-brandGreen'
                }`}
              >
                {agentOffline ? 'AGENT OFFLINE' : 'AGENT ONLINE'}
              </button>
            </div>

            {/* Fallback 3: DB degraded */}
            <div className="flex items-center justify-between border-b border-navyLight/30 pb-3">
              <div>
                <h4 className="font-bold text-slate-200">System Transaction Store</h4>
                <p className="text-[10px] text-slate-500">Toggles state-store synchronization.</p>
              </div>
              <button
                onClick={() => setDbDegraded(!dbDegraded)}
                className={`px-3 py-1 rounded border text-[10px] font-bold transition-all ${
                  dbDegraded 
                    ? 'bg-brandRed/15 border-brandRed text-brandRed animate-pulse' 
                    : 'bg-brandGreen/10 border-brandGreen/35 text-brandGreen'
                }`}
              >
                {dbDegraded ? 'STORE DEGRADED' : 'STORE ONLINE'}
              </button>
            </div>
          </div>

          {/* Active Error Alerts HUD */}
          {(cvOffline || agentOffline || dbDegraded) && (
            <div className="p-4 bg-brandRed/10 border border-brandRed/30 rounded text-brandRed space-y-2">
              <span className="font-black flex items-center text-[10px]">
                <AlertCircle className="h-4 w-4 mr-1.5 animate-pulse" />
                SYSTEM ERROR STATE FALLBACK ACTIVATED
              </span>
              <ul className="list-disc list-inside text-[10px] pl-1 space-y-1">
                {cvOffline && <li>CV ENGINE OFFLINE - Using Simulation Mode</li>}
                {agentOffline && <li>AI COMMANDER OFFLINE - Using Demo Agent</li>}
                {dbDegraded && <li>STATE STORE DEGRADED - Using local demo state</li>}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
