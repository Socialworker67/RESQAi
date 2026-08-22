export type DisasterType = 'FIRE' | 'ROAD_ACCIDENT' | 'INDUSTRIAL_ACCIDENT' | 'BUILDING_COLLAPSE' | 'CROWD';

export interface Incident {
  incident_id: string;
  disaster_type: DisasterType;
  location: string;
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'SAFE';
  confidence: number;
  status: 'DETECTED' | 'UNDERSTANDING' | 'ASSESSING' | 'PLANNING' | 'ACTING' | 'MONITORING' | 'REPLANNING' | 'RESOLVED';
  timestamp: string;
  source: string;
  affected_zone: string;
  people_at_risk: number;
  assigned_teams: string[];
  current_plan: string;
  plan_version: number;

  // Disaster-specific fields
  fire_confidence?: number;
  smoke_confidence?: number;
  people_detected?: number;

  vehicles?: number;
  persons?: number;
  accident_confidence?: number;
  traffic_state?: string;
  ambulance_required?: boolean;

  anomaly_score?: number;
  workers_detected?: number;
  workers_at_risk?: number;
  hazard_zone?: string;

  buildings_analyzed?: number;
  minor_damage?: number;
  major_damage?: number;
  destroyed?: number;
  rescue_priority?: 'HIGH' | 'MEDIUM' | 'LOW';

  people_count?: number;
  density?: string;
  risk_zone?: string;
  movement_state?: string;
  entry_status?: string;
  exit_status?: string;
}

export interface Team {
  id: string;
  name: string;
  type: 'Fire' | 'Medical' | 'Police' | 'Rescue' | 'Hazmat';
  status: 'Available' | 'Assigned' | 'En Route' | 'Busy';
  location: string;
  eta?: string;
  current_incident?: string;
}

export interface VisionEvent {
  time: string;
  message: string;
  type: 'info' | 'warning' | 'alert' | 'system';
}

export interface DatasetInfo {
  name: string;
  disasterType: string;
  task: string;
  images: string;
  description: string;
  sourceUrl: string;
  modelStatus: string;
}
