import { Incident, Team, DatasetInfo } from '../types';
import { initialIncidents } from '../data/incidents';
import { initialTeams } from '../data/teams';
import { datasetsInfo } from '../data/datasets';

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
