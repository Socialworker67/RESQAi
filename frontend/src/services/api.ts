import { Incident, Team, DatasetInfo } from '../types';
import { initialIncidents } from '../data/incidents';
import { initialTeams } from '../data/teams';
import { datasetsInfo } from '../data/datasets';
import { crowdHistoryData, CrowdDataPoint } from '../data/crowd';

// API configuration helper. Change USE_MOCK to false when connecting to FastAPI.
const API_BASE_URL = 'http://localhost:8000/api';
const USE_MOCK = true;

export const getIncidents = async (): Promise<Incident[]> => {
  if (!USE_MOCK) {
    try {
      const response = await fetch(`${API_BASE_URL}/incidents`);
      return await response.json();
    } catch (e) {
      console.warn("FastAPI backend connection failed. Falling back to local state.", e);
    }
  }
  return new Promise((resolve) => {
    resolve([...initialIncidents]);
  });
};

export const getIncident = async (id: string): Promise<Incident | undefined> => {
  if (!USE_MOCK) {
    try {
      const response = await fetch(`${API_BASE_URL}/incidents/${id}`);
      return await response.json();
    } catch (e) {
      console.warn("FastAPI backend connection failed. Falling back to local state.", e);
    }
  }
  return new Promise((resolve) => {
    const incident = initialIncidents.find((inc) => inc.incident_id === id);
    resolve(incident);
  });
};

export const getTeams = async (): Promise<Team[]> => {
  if (!USE_MOCK) {
    try {
      const response = await fetch(`${API_BASE_URL}/teams`);
      return await response.json();
    } catch (e) {
      console.warn("FastAPI backend connection failed. Falling back to local state.", e);
    }
  }
  return new Promise((resolve) => {
    resolve([...initialTeams]);
  });
};

export const getDatasets = async (): Promise<DatasetInfo[]> => {
  if (!USE_MOCK) {
    try {
      const response = await fetch(`${API_BASE_URL}/datasets`);
      return await response.json();
    } catch (e) {
      console.warn("FastAPI backend connection failed. Falling back to local state.", e);
    }
  }
  return new Promise((resolve) => {
    resolve([...datasetsInfo]);
  });
};

export const getCrowdData = async (): Promise<CrowdDataPoint[]> => {
  return new Promise((resolve) => {
    resolve([...crowdHistoryData]);
  });
};

export const getAIStatus = async (): Promise<{ status: string; latency: number; accuracy: number }> => {
  return new Promise((resolve) => {
    resolve({ status: 'Operational', latency: 0.96, accuracy: 96.8 });
  });
};

export const getResponsePlan = async (version: number): Promise<{ version: number; steps: string[] }> => {
  return new Promise((resolve) => {
    if (version === 2) {
      resolve({
        version: 2,
        steps: [
          'Debris/Congestion registered at Exit B',
          'Rerouting evacuation flow to Exit C',
          'Retaining Police Control Team at Sector',
          'Deploying Medical emergency ambulance to Exit C staging'
        ]
      });
    } else {
      resolve({
        version: 1,
        steps: [
          'Identify crowd gathers at Gate B',
          'Direct evacuation ingress via Gate B',
          'Dispatch Police Control Team to staging gate'
        ]
      });
    }
  });
};

export const triggerSimulation = async (type: string): Promise<boolean> => {
  console.log(`Starting mock simulation trigger for: ${type}`);
  return true;
};

export const triggerReplan = async (incidentId: string): Promise<boolean> => {
  console.log(`Starting mock re-planning trigger for: ${incidentId}`);
  return true;
};
