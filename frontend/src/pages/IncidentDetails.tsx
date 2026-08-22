import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDemo } from '../state/DemoContext';
import { Shield, ChevronLeft, Calendar, User, Compass, Server, CheckCircle, Flame, AlertCircle } from 'lucide-react';

export const IncidentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { incidents, teams, isExitBlocked, activePlanVersion } = useDemo();

  const incident = incidents.find(inc => inc.incident_id === id);

  if (!incident) {
    return (
      <div className="flex-grow p-6 flex flex-col items-center justify-center font-mono">
        <AlertCircle className="h-10 w-10 text-brandRed animate-bounce" />
        <h2 className="text-lg font-bold text-slate-200 mt-4">INCIDENT NOT FOUND</h2>
        <p className="text-xs text-slate-500 mt-2">The incident identifier [{id}] could not be resolved.</p>
        <Link to="/incidents" className="mt-6 bg-accentCyan/10 border border-accentCyan/40 text-accentCyan px-4 py-2 rounded text-xs hover:bg-accentCyan/20 transition-colors">
          RETURN TO INCIDENT BOARD
        </Link>
      </div>
    );
  }

  // Find teams assigned to this incident
  const assignedTeams = teams.filter(t => t.current_incident === incident.incident_id);

  // Helper to format severity colors
  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'CRITICAL':
        return 'bg-brandRed/10 border-brandRed/30 text-brandRed font-bold';
      case 'HIGH':
        return 'bg-brandOrange/10 border-brandOrange/30 text-brandOrange font-bold';
      case 'MODERATE':
        return 'bg-brandAmber/10 border-brandAmber/30 text-brandAmber';
      case 'SAFE':
        return 'bg-brandGreen/10 border-brandGreen/30 text-brandGreen font-bold';
      default:
        return 'bg-slate-800 text-slate-400';
    }
  };

  return (
    <div className="flex-grow p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-65px)]">
      {/* Top Breadcrumb */}
      <div className="flex items-center space-x-2">
        <Link to="/incidents" className="text-slate-400 hover:text-slate-200 flex items-center font-mono text-xs">
          <ChevronLeft className="h-4 w-4 mr-1" />
          <span>BACK TO INCIDENT BOARD</span>
        </Link>
      </div>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-navyLight pb-4">
        <div>
          <span className="font-mono text-xs text-accentCyan font-bold">{incident.incident_id}</span>
          <h1 className="text-2xl font-black text-slate-100 uppercase tracking-tight flex items-center mt-1">
            <Flame className="h-6 w-6 text-brandRed mr-2" />
            {incident.disaster_type.replace('_', ' ')} DETAILS
          </h1>
        </div>
        <div className="mt-2 md:mt-0 flex items-center space-x-3">
          <span className={`px-3 py-1 rounded text-xs border ${getSeverityBadge(incident.severity)}`}>
            {incident.severity}
          </span>
          <span className="font-mono text-xs bg-navyMedium border border-navyLight px-3 py-1 rounded text-slate-300">
            PLAN VERSION: v{incident.disaster_type === 'FIRE' ? activePlanVersion : incident.plan_version}.0
          </span>
        </div>
      </div>

      {/* Grid columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Core telemetry details (2/3 col) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-panel p-4 space-y-4">
            <h3 className="font-mono text-xs font-bold text-slate-300 border-b border-navyLight/50 pb-2">TELEMETRY & EVIDENCE DATA</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 text-[10px] uppercase">Location</span>
                <p className="text-slate-200 font-semibold">{incident.location}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 text-[10px] uppercase">Sensory Source</span>
                <p className="text-slate-200">{incident.source}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 text-[10px] uppercase">Detected Time</span>
                <p className="text-slate-200">{incident.timestamp}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 text-[10px] uppercase">Model Confidence</span>
                <p className="text-accentCyan font-bold">{incident.confidence}%</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 text-[10px] uppercase">Occupants at Risk</span>
                <p className="text-brandOrange font-bold">{incident.people_at_risk.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 text-[10px] uppercase">System Status</span>
                <p className="text-brandBlue font-bold">{incident.status}</p>
              </div>
            </div>

            {/* Disaster-specific data section */}
            <div className="pt-4 border-t border-navyLight/40 space-y-3">
              <h4 className="font-mono text-[11px] font-bold text-accentCyan uppercase">Disaster-Specific CV Inference Details</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
                {incident.disaster_type === 'FIRE' && (
                  <>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase">Fire Confidence</span>
                      <p className="text-brandRed font-semibold">{incident.fire_confidence}%</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase">Smoke Confidence</span>
                      <p className="text-brandOrange font-semibold">{incident.smoke_confidence}%</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase">Occupants Tracked</span>
                      <p className="text-slate-200">{incident.people_detected} persons</p>
                    </div>
                  </>
                )}

                {incident.disaster_type === 'ROAD_ACCIDENT' && (
                  <>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase">Vehicles Detected</span>
                      <p className="text-slate-200 font-semibold">{incident.vehicles}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase">Persons Involved</span>
                      <p className="text-slate-200 font-semibold">{incident.persons}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase">Traffic State</span>
                      <p className="text-brandOrange font-semibold">{incident.traffic_state}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase">Ambulance Required</span>
                      <p className="text-brandRed font-semibold">{incident.ambulance_required ? 'YES' : 'NO'}</p>
                    </div>
                  </>
                )}

                {incident.disaster_type === 'INDUSTRIAL_ACCIDENT' && (
                  <>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase">Anomaly Score</span>
                      <p className="text-brandRed font-semibold">{incident.anomaly_score}%</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase">Workers Tracked</span>
                      <p className="text-slate-200">{incident.workers_detected}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase">Workers in Plume</span>
                      <p className="text-brandOrange font-semibold">{incident.workers_at_risk}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase">Plume Radius</span>
                      <p className="text-brandRed font-semibold">{incident.hazard_zone}</p>
                    </div>
                  </>
                )}

                {incident.disaster_type === 'BUILDING_COLLAPSE' && (
                  <>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase">Buildings Scanned</span>
                      <p className="text-slate-200">{incident.buildings_analyzed}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase">Major Damage</span>
                      <p className="text-brandOrange font-semibold">{incident.major_damage} blocks</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase">Destroyed</span>
                      <p className="text-brandRed font-semibold">{incident.destroyed} blocks</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase">Rescue Priority</span>
                      <p className="text-brandRed font-bold">{incident.rescue_priority}</p>
                    </div>
                  </>
                )}

                {incident.disaster_type === 'CROWD' && (
                  <>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase">PAX Count</span>
                      <p className="text-slate-200 font-semibold">{incident.people_count}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase">Density Status</span>
                      <p className="text-brandRed font-semibold">{incident.density}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase">Movement Vector</span>
                      <p className="text-brandOrange">{incident.movement_state}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase">Gate Capacity</span>
                      <p className="text-slate-300">Entry: {incident.entry_status} | Exit: {incident.exit_status}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* AI Decision Panel & Plan Execution */}
          <div className="glass-panel p-4 space-y-3 font-mono text-xs">
            <h3 className="font-bold text-slate-200 border-b border-navyLight/50 pb-2">AI COMMAND SUPPORT ACTIONS</h3>
            <div>
              <span className="text-[10px] text-slate-500 uppercase">ACTIVE COMMAND PLAN</span>
              <p className="text-slate-200 font-semibold text-[13px] bg-black/45 border border-navyLight/60 p-3 rounded mt-1.5 leading-relaxed">
                {incident.disaster_type === 'FIRE' && activePlanVersion === 2
                  ? 'Exit B is blocked. Shift evacuation to EXIT C staging. Fire Team 02 suppression active. Medical Team 01 staging at exit C.'
                  : incident.current_plan}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
              <div>
                <span className="text-[10px] text-slate-500 uppercase">ACTIVE ROUTE</span>
                <p className="text-brandGreen font-semibold mt-1">
                  {incident.disaster_type === 'FIRE' 
                    ? (activePlanVersion === 2 ? 'EVACUATION STAGING VIA EXIT C' : 'PRIMARY EVACUATION THROUGH EXIT B')
                    : 'Tactical detour grid active'}
                </p>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase">BLOCKED CORRIDORS</span>
                <p className="text-brandRed font-semibold mt-1">
                  {incident.disaster_type === 'FIRE' && isExitBlocked ? 'EXIT B CORRIDOR (COLLAPSED DEBRIS)' : 'NONE'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Timeline & Crew Details (1/3 col) */}
        <div className="lg:col-span-1 space-y-4">
          {/* Assigned Teams */}
          <div className="glass-panel p-4 space-y-3">
            <h3 className="font-mono text-xs font-bold text-slate-300 border-b border-navyLight/50 pb-2">DISPATCHED UNITS</h3>
            <div className="space-y-2">
              {incident.disaster_type === 'FIRE' && activePlanVersion === 2 ? (
                <>
                  <div className="flex items-center justify-between border border-navyLight p-2 rounded bg-navyDark/50">
                    <div>
                      <p className="font-mono text-xs font-bold text-slate-200">Fire Team 02</p>
                      <p className="font-mono text-[10px] text-slate-500">Task: Fire Suppression</p>
                    </div>
                    <span className="font-mono text-[10px] bg-brandOrange/15 border border-brandOrange/35 text-brandOrange px-1.5 py-0.5 rounded uppercase font-bold">Assigned</span>
                  </div>
                  <div className="flex items-center justify-between border border-navyLight p-2 rounded bg-navyDark/50">
                    <div>
                      <p className="font-mono text-xs font-bold text-slate-200">Medical Team 01</p>
                      <p className="font-mono text-[10px] text-slate-500">Task: Evacuation Triage</p>
                    </div>
                    <span className="font-mono text-[10px] bg-brandOrange/15 border border-brandOrange/35 text-brandOrange px-1.5 py-0.5 rounded uppercase font-bold">Assigned</span>
                  </div>
                </>
              ) : (
                assignedTeams.map(t => (
                  <div key={t.id} className="flex items-center justify-between border border-navyLight p-2 rounded bg-navyDark/50">
                    <div>
                      <p className="font-mono text-xs font-bold text-slate-200">{t.name}</p>
                      <p className="font-mono text-[10px] text-slate-500">Type: {t.type} Crew</p>
                    </div>
                    <span className="font-mono text-[10px] bg-brandOrange/15 border border-brandOrange/35 text-brandOrange px-1.5 py-0.5 rounded uppercase font-bold">{t.status}</span>
                  </div>
                ))
              )}
              {assignedTeams.length === 0 && incident.disaster_type !== 'FIRE' && (
                <div className="text-slate-500 italic text-[11px] font-mono text-center py-4">No response crews assigned yet.</div>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div className="glass-panel p-4 space-y-3 font-mono text-xs">
            <h3 className="font-bold text-slate-300 border-b border-navyLight/50 pb-2">INCIDENT TIMELINE</h3>
            <div className="relative border-l border-navyLight/60 ml-2.5 pl-4 space-y-4">
              <div className="relative">
                <span className="absolute -left-[21px] top-0.5 h-2.5 w-2.5 rounded-full bg-brandRed"></span>
                <p className="text-[10px] text-slate-400">{incident.timestamp}</p>
                <p className="text-slate-200 font-semibold mt-0.5">Disaster Event Detection</p>
                <p className="text-[10px] text-slate-500">CV Model YOLO flagged thermal signatures.</p>
              </div>

              <div className="relative">
                <span className="absolute -left-[21px] top-0.5 h-2.5 w-2.5 rounded-full bg-accentCyan"></span>
                <p className="text-[10px] text-slate-400">14:32:12</p>
                <p className="text-slate-200 font-semibold mt-0.5">Plan v1 Formulated</p>
                <p className="text-[10px] text-slate-500">AI Commander recommended Exit B evacuation corridor.</p>
              </div>

              {incident.disaster_type === 'FIRE' && isExitBlocked && (
                <>
                  <div className="relative">
                    <span className="absolute -left-[21px] top-0.5 h-2.5 w-2.5 rounded-full bg-brandOrange"></span>
                    <p className="text-[10px] text-slate-400">14:32:35</p>
                    <p className="text-brandRed font-semibold mt-0.5">Route Blocked Alarm</p>
                    <p className="text-[10px] text-slate-500">Sensory checks flagged structural debris blocking Exit B.</p>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[21px] top-0.5 h-2.5 w-2.5 rounded-full bg-brandGreen"></span>
                    <p className="text-[10px] text-slate-400">14:32:40</p>
                    <p className="text-slate-200 font-semibold mt-0.5">Plan v2 Active (Re-planned)</p>
                    <p className="text-[10px] text-slate-500">Evacuation route shifted to Exit C. Medical team staged.</p>
                  </div>
                </>
              )}

              {incident.status === 'RESOLVED' && (
                <div className="relative">
                  <span className="absolute -left-[21px] top-0.5 h-2.5 w-2.5 rounded-full bg-brandGreen"></span>
                  <p className="text-[10px] text-slate-400">Resolved</p>
                  <p className="text-brandGreen font-bold mt-0.5">Incident Closed</p>
                  <p className="text-[10px] text-slate-500">EOC confirmed occupants evacuated and hazard controlled.</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
