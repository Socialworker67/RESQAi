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
  activeTab: string; // Live vision tab: 'LIVE', 'VIDEO', 'SIMULATION'
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
  const [activeIncidentId, setActiveIncidentId] = useState<string>('INC-2026-001');
  const [isDemoRunning, setIsDemoRunning] = useState<boolean>(false);
  const [demoStep, setDemoStep] = useState<number>(0);
  const [isExitBlocked, setIsExitBlocked] = useState<boolean>(false);
  const [activePlanVersion, setActivePlanVersion] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>('LIVE');

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
      clearInterval(demoIntervalRef.current);
      demoIntervalRef.current = null;
    }
    setIsDemoRunning(false);
    setDemoStep(0);
    setIsExitBlocked(false);
    setActivePlanVersion(1);
    setActiveIncidentId('INC-2026-001');
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
    addLog('Incident route obstruction: EXIT B BLOCKED!', 'warning');
    addLog('AI Agent -> STATE CHANGE DETECTED', 'alert');
    
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
          return {
            ...inc,
            status: 'ACTING',
            plan_version: 2,
            current_plan: 'Exit B is blocked. Re-routing evacuation via Exit C. Fire Team 02 retained. Medical Team 01 reassigned to Exit C.',
            assigned_teams: ['Fire Team 02', 'Medical Team 01']
          };
        }
        return inc;
      }));
      setTeams(prev => prev.map(t => {
        if (t.id === 'T-MED-01') {
          return { ...t, status: 'Assigned', current_incident: activeIncidentId, eta: '3 min' };
        }
        return t;
      }));
      setActivePlanVersion(2);
      addLog('Route planner recalculation -> EXIT C selected.', 'info');
      addLog('Medical Team 01 reassigned to Exit C.', 'info');
      addLog('AI Plan v2 activated.', 'system');
    }, 2000);
  };

  const increaseRisk = () => {
    setIncidents(prev => prev.map(inc => {
      if (inc.incident_id === activeIncidentId) {
        addLog(`Incident ${inc.incident_id} risk severity escalated to CRITICAL!`, 'alert');
        return { ...inc, severity: 'CRITICAL', confidence: Math.min(99.9, inc.confidence + 4.5) };
      }
      return inc;
    }));
  };

  const completeIncident = () => {
    setIncidents(prev => prev.map(inc => {
      if (inc.incident_id === activeIncidentId) {
        addLog(`Incident ${inc.incident_id} marked as RESOLVED. All evacuees safe.`, 'system');
        return { ...inc, status: 'RESOLVED', severity: 'SAFE' };
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

  // Run the 10-step demo
  const startDemo = () => {
    resetDemo();
    setIsDemoRunning(true);
    setDemoStep(1);
  };

  // Handle Demo Steps
  useEffect(() => {
    if (!isDemoRunning || demoStep === 0) return;

    const stepDuration = 6000; // 6 seconds per step

    demoIntervalRef.current = setTimeout(() => {
      const nextStep = demoStep + 1;
      if (nextStep > 10) {
        setIsDemoRunning(false);
        if (demoIntervalRef.current) clearTimeout(demoIntervalRef.current);
        return;
      }
      setDemoStep(nextStep);
    }, stepDuration);

    // Apply side-effects for each step
    switch (demoStep) {
      case 1:
        // FIRE Detected
        setActiveIncidentId('INC-2026-001');
        setActiveTab('LIVE');
        setIncidents(prev => prev.map(inc => {
          if (inc.incident_id === 'INC-2026-001') {
            return { ...inc, status: 'DETECTED', severity: 'CRITICAL', plan_version: 1, people_at_risk: 0 };
          }
          return inc;
        }));
        addLog('Vision event received: Thermal anomaly registered.', 'warning');
        addLog('Fire + Smoke detection model YOLOv8: Confidence = 94.2%', 'info');
        addLog('Incident INC-2026-001 (Building A Fire) created.', 'alert');
        break;
      
      case 2:
        // People at risk
        setIncidents(prev => prev.map(inc => {
          if (inc.incident_id === 'INC-2026-001') {
            return { ...inc, status: 'UNDERSTANDING', people_at_risk: 17 };
          }
          return inc;
        }));
        addLog('Object Tracking: 17 occupants identified within affected building segment.', 'info');
        addLog('Threat Profile: Floor 2 evacuation route threatened by smoke.', 'warning');
        break;
      
      case 3:
        // Risk assessment Critical
        setIncidents(prev => prev.map(inc => {
          if (inc.incident_id === 'INC-2026-001') {
            return { ...inc, status: 'ASSESSING', severity: 'CRITICAL' };
          }
          return inc;
        }));
        addLog('Agentic AI: Risk Score = 9.8/10 (CRITICAL). Evacuation corridors compromised.', 'alert');
        break;
      
      case 4:
        // Fire Team assigned
        setIncidents(prev => prev.map(inc => {
          if (inc.incident_id === 'INC-2026-001') {
            return { ...inc, status: 'PLANNING' };
          }
          return inc;
        }));
        setTeams(prev => prev.map(t => {
          if (t.id === 'T-FIRE-02') {
            return { ...t, status: 'Assigned', current_incident: 'INC-2026-001', eta: '4 min' };
          }
          return t;
        }));
        addLog('Response Planner: Recommended resource Fire Team 02 assigned.', 'info');
        break;
      
      case 5:
        // Exit B selected
        setIncidents(prev => prev.map(inc => {
          if (inc.incident_id === 'INC-2026-001') {
            return { ...inc, status: 'ACTING' };
          }
          return inc;
        }));
        addLog('Route Planner: Exit B designated as optimal evacuation route.', 'info');
        addLog('AI Plan v1 broadcast to emergency team.', 'system');
        break;
      
      case 6:
        // Exit B blocked
        setIsExitBlocked(true);
        addLog('Sensory Check: Debris fall blocks access to EXIT B corridor.', 'warning');
        addLog('AI Agent -> STATE CHANGE DETECTED: Route Invalidated.', 'alert');
        break;
      
      case 7:
        // AI Re-planning
        setIncidents(prev => prev.map(inc => {
          if (inc.incident_id === 'INC-2026-001') {
            return { ...inc, status: 'REPLANNING' };
          }
          return inc;
        }));
        addLog('AI Agent: Initiating dynamic route recalculation.', 'system');
        break;
      
      case 8:
        // Exit C selected
        addLog('Route Recalculated: Alternative path via EXIT C selected.', 'info');
        addLog('Resource Check: Medical Team 01 dispatched to Exit C staging zone.', 'info');
        break;
      
      case 9:
        // Plan v1 -> Plan v2
        setIncidents(prev => prev.map(inc => {
          if (inc.incident_id === 'INC-2026-001') {
            return {
              ...inc,
              status: 'ACTING',
              plan_version: 2,
              current_plan: 'EXIT B blocked. Shift evacuation to EXIT C. Fire Team 02 suppression active. Medical Team 01 staging at exit.',
              assigned_teams: ['Fire Team 02', 'Medical Team 01']
            };
          }
          return inc;
        }));
        setTeams(prev => prev.map(t => {
          if (t.id === 'T-MED-01') {
            return { ...t, status: 'Assigned', current_incident: 'INC-2026-001', eta: '3 min' };
          }
          return t;
        }));
        setActivePlanVersion(2);
        addLog('AI Response Plan v2 activated.', 'system');
        break;
      
      case 10:
        // Incident Controlled
        setIncidents(prev => prev.map(inc => {
          if (inc.incident_id === 'INC-2026-001') {
            return { ...inc, status: 'RESOLVED', severity: 'SAFE', people_at_risk: 0 };
          }
          return inc;
        }));
        setTeams(prev => prev.map(t => {
          if (t.current_incident === 'INC-2026-001') {
            return { ...t, status: 'Available', current_incident: undefined, eta: undefined };
          }
          return t;
        }));
        addLog('EOC Confirmation: Building A fire suppressed. All 17 occupants safely evacuated.', 'system');
        addLog('Incident INC-2026-001 resolved successfully.', 'info');
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
