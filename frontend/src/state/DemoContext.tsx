import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Incident, Team, VisionEvent } from '../types';
import { initialIncidents } from '../data/incidents';
import { initialTeams } from '../data/teams';

interface DemoContextType {
  incidents: Incident[];
  teams: Team[];
  logs: VisionEvent[];
  activeIncidentId: string;
  isDemoRunning: boolean;
  demoStep: number;
  isExitBlocked: boolean;
  activePlanVersion: number;
  cvEngineOnline: boolean;
  aiAgentOnline: boolean;
  dbOnline: boolean;
  simReady: boolean;
  activeTab: string; // Live vision tab: 'LIVE', 'VIDEO', 'SIMULATION', 'DATASET'
  isPresentationMode: boolean;
  setPresentationMode: (mode: boolean) => void;
  setActiveTab: (tab: string) => void;
  setActiveIncidentId: (id: string) => void;
  triggerReplan: () => void;
  blockExit: () => void;
  increaseRisk: () => void;
  completeIncident: () => void;
  resetDemo: () => void;
  startDemo: () => void;
  triggerManualIncident: (type: 'FIRE' | 'ROAD_ACCIDENT' | 'INDUSTRIAL_ACCIDENT' | 'BUILDING_COLLAPSE' | 'CROWD') => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [logs, setLogs] = useState<VisionEvent[]>([
    { time: '14:30:00', message: 'System Initialized. CV Models Loaded.', type: 'system' },
    { time: '14:30:15', message: 'Perception Layer Online (D-Fire, BDD100K, MVTec AD, xBD, ShanghaiTech)', type: 'info' }
  ]);
  const [activeIncidentId, setActiveIncidentId] = useState<string>('INC-2026-005'); // Default to Crowd Crush
  const [isDemoRunning, setIsDemoRunning] = useState<boolean>(false);
  const [demoStep, setDemoStep] = useState<number>(0);
  const [isExitBlocked, setIsExitBlocked] = useState<boolean>(false);
  const [activePlanVersion, setActivePlanVersion] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>('LIVE');
  const [isPresentationMode, setIsPresentationMode] = useState<boolean>(false);

  // Node engine states
  const [cvEngineOnline, setCvEngineOnline] = useState<boolean>(true);
  const [aiAgentOnline, setAiAgentOnline] = useState<boolean>(true);
  const [dbOnline, setDbOnline] = useState<boolean>(true);
  const [simReady, setSimReady] = useState<boolean>(true);

  const demoIntervalRef = useRef<any>(null);

  const addLog = (message: string, type: 'info' | 'warning' | 'alert' | 'system' = 'info') => {
    const now = new Date();
    const timeString = now.toTimeString().split(' ')[0];
    setLogs((prev) => [{ time: timeString, message, type }, ...prev]);
  };

  // Reset function
  const resetDemo = () => {
    if (demoIntervalRef.current) {
      clearTimeout(demoIntervalRef.current);
      demoIntervalRef.current = null;
    }
    setIsDemoRunning(false);
    setDemoStep(0);
    setIsExitBlocked(false);
    setActivePlanVersion(1);
    setActiveIncidentId('INC-2026-005'); // default back to crowd
    setIncidents(initialIncidents.map(inc => ({ ...inc })));
    setTeams(initialTeams.map(t => ({ ...t })));
    setLogs([
      { time: '14:30:00', message: 'System Initialized. CV Models Loaded.', type: 'system' },
      { time: '14:30:15', message: 'Perception Layer Online (D-Fire, BDD100K, MVTec AD, xBD, ShanghaiTech)', type: 'info' }
    ]);
    setCvEngineOnline(true);
    setAiAgentOnline(true);
    setDbOnline(true);
    setSimReady(true);
    setActiveTab('LIVE');
    addLog('Demo state reset. System ready.', 'system');
  };

  // Block route manually
  const blockExit = () => {
    if (isExitBlocked) return;
    setIsExitBlocked(true);

    const activeIncident = incidents.find(i => i.incident_id === activeIncidentId) || incidents[0];
    
    if (activeIncident.disaster_type === 'CROWD') {
      addLog('Telemetry Alert: GATE B plaza capacity saturated. Ingress/egress bottleneck detected.', 'warning');
      addLog('AI Agent -> STATE CHANGE REGISTERED (Gate B Congested)', 'alert');
    } else {
      addLog('Telemetry Alert: EXIT B access corridor obstructed by debris.', 'warning');
      addLog('AI Agent -> STATE CHANGE REGISTERED (Exit B Blocked)', 'alert');
    }
    
    // Automatically trigger re-planning if not running demo
    if (!isDemoRunning) {
      triggerReplan();
    }
  };

  // Trigger replan
  const triggerReplan = () => {
    addLog('AI Agent -> RE-PLANNING INITIATED', 'system');
    setIncidents(prev => prev.map(inc => {
      if (inc.incident_id === activeIncidentId) {
        return {
          ...inc,
          status: 'REPLANNING'
        };
      }
      return inc;
    }));

    setTimeout(() => {
      setIncidents(prev => prev.map(inc => {
        if (inc.incident_id === activeIncidentId) {
          if (inc.disaster_type === 'CROWD') {
            return {
              ...inc,
              status: 'ACTING',
              plan_version: 2,
              current_plan: 'Gate B is congested. Shift evacuation flow to Gate C. Dispatch Medical Team 01 for staging. Police Team 02 staging active. Rescue Team 01 staging active.',
              assigned_teams: ['Police Team 02', 'Rescue Team 01', 'Medical Team 01']
            };
          } else {
            // Fire fallback
            return {
              ...inc,
              status: 'ACTING',
              plan_version: 2,
              current_plan: 'Exit B is blocked. Re-routing evacuation via Exit C. Fire Team 02 retained. Medical Team 01 reassigned to Exit C.',
              assigned_teams: ['Fire Team 02', 'Medical Team 01']
            };
          }
        }
        return inc;
      }));

      setTeams(prev => prev.map(t => {
        if (t.id === 'T-MED-01') {
          return { ...t, status: 'Assigned', current_incident: activeIncidentId, eta: '3 min' };
        }
        if (activeIncidentId === 'INC-2026-005' && t.id === 'T-RESC-01') {
          return { ...t, status: 'Assigned', current_incident: activeIncidentId, eta: '5 min' };
        }
        return t;
      }));
      setActivePlanVersion(2);
      addLog('Route Recalculation -> Alternative exit GATE C designated.', 'info');
      addLog('Medical Team 01 deployed to staging zone Gate C.', 'info');
      addLog('AI Response Plan v2 activated.', 'system');
    }, 2000);
  };

  const increaseRisk = () => {
    setIncidents(prev => prev.map(inc => {
      if (inc.incident_id === activeIncidentId) {
        addLog(`Incident ${inc.incident_id} risk severity escalated to CRITICAL!`, 'alert');
        return { ...inc, severity: 'CRITICAL', confidence: Math.min(99.9, inc.confidence + 3.1) };
      }
      return inc;
    }));
  };

  const completeIncident = () => {
    setIncidents(prev => prev.map(inc => {
      if (inc.incident_id === activeIncidentId) {
        addLog(`Incident ${inc.incident_id} marked as RESOLVED. Risk level stabilized.`, 'system');
        return { ...inc, status: 'RESOLVED', severity: 'SAFE', people_at_risk: 0 };
      }
      return inc;
    }));
    setTeams(prev => prev.map(t => {
      if (t.current_incident === activeIncidentId) {
        return { ...t, status: 'Available', current_incident: undefined, eta: undefined };
      }
      return t;
    }));
  };

  const triggerManualIncident = (type: 'FIRE' | 'ROAD_ACCIDENT' | 'INDUSTRIAL_ACCIDENT' | 'BUILDING_COLLAPSE' | 'CROWD') => {
    const matched = incidents.find(inc => inc.disaster_type === type);
    if (matched) {
      setActiveIncidentId(matched.incident_id);
      setIsExitBlocked(false);
      setActivePlanVersion(matched.plan_version);
      addLog(`Selected active incident: ${matched.incident_id} (${type})`, 'info');
    }
  };

  const setPresentationMode = (mode: boolean) => {
    setIsPresentationMode(mode);
  };

  // Run the 10-step demo
  const startDemo = () => {
    resetDemo();
    setIsDemoRunning(true);
    setDemoStep(1);
  };

  // Handle Demo Steps
  useEffect(() => {
    if (!isDemoRunning || demoStep === 0) return;

    const stepDuration = 5500; // 5.5 seconds per step

    demoIntervalRef.current = setTimeout(() => {
      const nextStep = demoStep + 1;
      if (nextStep > 10) {
        setIsDemoRunning(false);
        if (demoIntervalRef.current) clearTimeout(demoIntervalRef.current);
        return;
      }
      setDemoStep(nextStep);
    }, stepDuration);

    // Apply side-effects for each step of the CROWD CRUSH scenario
    switch (demoStep) {
      case 1:
        // CROWD detected
        setActiveIncidentId('INC-2026-005');
        setActiveTab('LIVE');
        setIncidents(prev => prev.map(inc => {
          if (inc.incident_id === 'INC-2026-005') {
            return { ...inc, status: 'DETECTED', severity: 'MODERATE', plan_version: 1, people_at_risk: 0 };
          }
          return inc;
        }));
        addLog('Sensory event received: Crowd gathering registered at Stadium Gate B.', 'warning');
        addLog('Perception model (ShanghaiTech-CSRNet) loading inference frame...', 'info');
        break;
      
      case 2:
        // 1,284 people detected
        setIncidents(prev => prev.map(inc => {
          if (inc.incident_id === 'INC-2026-005') {
            return { ...inc, status: 'UNDERSTANDING', people_at_risk: 1284, severity: 'HIGH' };
          }
          return inc;
        }));
        addLog('ShanghaiTech Inference: Estimated headcount = 1,284 occupants in entrance plaza.', 'info');
        addLog('Threat Profile: High crowd ingress rate through Gate B funnel.', 'warning');
        break;
      
      case 3:
        // Density threshold exceeded
        setIncidents(prev => prev.map(inc => {
          if (inc.incident_id === 'INC-2026-005') {
            return { ...inc, status: 'ASSESSING', density: '8.7 persons/m²' };
          }
          return inc;
        }));
        addLog('YOLO point density check: Estimated density is 8.7 persons/m².', 'warning');
        addLog('Critical Warning: Safety threshold (4.0 persons/m²) exceeded!', 'alert');
        break;
      
      case 4:
        // Risk = CRITICAL
        setIncidents(prev => prev.map(inc => {
          if (inc.incident_id === 'INC-2026-005') {
            return { ...inc, status: 'ASSESSING', severity: 'CRITICAL' };
          }
          return inc;
        }));
        addLog('Agentic AI Risk Assessment: Critical crowd pressure warning (Risk Score 9.6/10).', 'alert');
        break;
      
      case 5:
        // Gate B selected
        setIncidents(prev => prev.map(inc => {
          if (inc.incident_id === 'INC-2026-005') {
            return { ...inc, status: 'PLANNING' };
          }
          return inc;
        }));
        setTeams(prev => prev.map(t => {
          if (t.id === 'T-POL-02') {
            return { ...t, status: 'Assigned', current_incident: 'INC-2026-005', eta: '3 min' };
          }
          return t;
        }));
        addLog('Response Planner: AI Plan v1 generated. Selected Exit Route: Gate B.', 'info');
        addLog('Resource Dispatch: Police Team 02 assigned to Gate B for flow control.', 'info');
        break;
      
      case 6:
        // Gate B congested detected
        setIsExitBlocked(true);
        setIncidents(prev => prev.map(inc => {
          if (inc.incident_id === 'INC-2026-005') {
            return { ...inc, status: 'ACTING' };
          }
          return inc;
        }));
        addLog('Real-time Telemetry: Gate B entrance flow restricted. Exit capacity low.', 'warning');
        addLog('AI Agent -> STATE CHANGE DETECTED: Gate B Congested!', 'alert');
        break;
      
      case 7:
        // AI RE-PLANNING
        setIncidents(prev => prev.map(inc => {
          if (inc.incident_id === 'INC-2026-005') {
            return { ...inc, status: 'REPLANNING' };
          }
          return inc;
        }));
        addLog('AI Agent: Initiating dynamic route and resource re-planning cycle.', 'system');
        break;
      
      case 8:
        // Gate C selected
        addLog('Route Recalculation: Optimal alternative Exit Gate C designated (Exit capacity normal).', 'info');
        addLog('Resource check: Dispatching Medical Team 01 to Gate C staging area.', 'info');
        break;
      
      case 9:
        // Plan v1 -> v2
        setIncidents(prev => prev.map(inc => {
          if (inc.incident_id === 'INC-2026-005') {
            return {
              ...inc,
              status: 'ACTING',
              plan_version: 2,
              current_plan: 'Gate B congested. Shift evacuation flow to Gate C. Dispatch Medical Team 01 for staging. Crowd Control Team retained.',
              assigned_teams: ['Police Team 02', 'Rescue Team 01', 'Medical Team 01']
            };
          }
          return inc;
        }));
        setTeams(prev => prev.map(t => {
          if (t.id === 'T-MED-01') {
            return { ...t, status: 'Assigned', current_incident: 'INC-2026-005', eta: '2 min' };
          }
          if (t.id === 'T-RESC-01') {
            return { ...t, status: 'Assigned', current_incident: 'INC-2026-005', eta: '4 min' };
          }
          return t;
        }));
        setActivePlanVersion(2);
        addLog('Plan Evolution: Plan v2 activated. Re-routing flow to Gate C.', 'system');
        break;
      
      case 10:
        // Response stabilized
        setIncidents(prev => prev.map(inc => {
          if (inc.incident_id === 'INC-2026-005') {
            return { ...inc, status: 'RESOLVED', severity: 'SAFE', people_at_risk: 0 };
          }
          return inc;
        }));
        setTeams(prev => prev.map(t => {
          if (t.current_incident === 'INC-2026-005') {
            return { ...t, status: 'Available', current_incident: undefined, eta: undefined };
          }
          return t;
        }));
        addLog('EOC Confirmation: Crowd density reduced to 2.1 persons/m². Bottleneck resolved.', 'system');
        addLog('Incident INC-2026-005 successfully stabilized. All occupants safe.', 'info');
        break;
    }

    return () => {
      if (demoIntervalRef.current) clearTimeout(demoIntervalRef.current);
    };
  }, [isDemoRunning, demoStep]);

  return (
    <DemoContext.Provider
      value={{
        incidents,
        teams,
        logs,
        activeIncidentId,
        isDemoRunning,
        demoStep,
        isExitBlocked,
        activePlanVersion,
        cvEngineOnline,
        aiAgentOnline,
        dbOnline,
        simReady,
        activeTab,
        isPresentationMode,
        setPresentationMode,
        setActiveTab,
        setActiveIncidentId,
        triggerReplan,
        blockExit,
        increaseRisk,
        completeIncident,
        resetDemo,
        startDemo,
        triggerManualIncident
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
