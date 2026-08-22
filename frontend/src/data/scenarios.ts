import { Flame, Compass, Activity, AlertOctagon, Users, LucideIcon } from 'lucide-react';

export interface DisasterScenario {
  id: string;
  title: string;
  dataset: string;
  task: string;
  description: string;
  iconName: 'Flame' | 'Compass' | 'Activity' | 'AlertOctagon' | 'Users';
  color: string;
  bg: string;
  type: 'FIRE' | 'ROAD_ACCIDENT' | 'INDUSTRIAL_ACCIDENT' | 'BUILDING_COLLAPSE' | 'CROWD';
  status: 'SIMULATION' | 'DATASET MODE';
  riskScore: string;
  activeZone: string;
}

export const disasterScenarios: DisasterScenario[] = [
  {
    id: 'SC-FIRE',
    title: 'Fire Scenario',
    dataset: 'D-Fire',
    task: 'Fire + Smoke Detection',
    description: 'Detection and tracking of combustion anomalies, smoke column density, and human occupants in enclosed structures using thermal and visual wavelengths.',
    iconName: 'Flame',
    color: 'text-brandRed',
    bg: 'bg-brandRed/10 border-brandRed/35 shadow-cyberRed/20',
    type: 'FIRE',
    status: 'SIMULATION',
    riskScore: 'CRITICAL (9.4/10)',
    activeZone: 'Zone Alpha'
  },
  {
    id: 'SC-ROAD',
    title: 'Road Accident Scenario',
    dataset: 'BDD100K + HWID12',
    task: 'Road Scene / Vehicle / Person Understanding',
    description: 'Highway camera analysis of high-speed collision events, vehicular damage, lane obstructions, and pedestrian identification in low-visibility environments.',
    iconName: 'Compass',
    color: 'text-brandOrange',
    bg: 'bg-brandOrange/10 border-brandOrange/35',
    type: 'ROAD_ACCIDENT',
    status: 'SIMULATION',
    riskScore: 'HIGH (7.8/10)',
    activeZone: 'Highway Lane 2 & 3'
  },
  {
    id: 'SC-IND',
    title: 'Industrial Accident Scenario',
    dataset: 'MVTec AD',
    task: 'Industrial Anomaly Detection',
    description: 'Factory supervisor scanning for mechanical defects, pipeline leaks, component anomalies, and worker safety zones on high-hazard processing lines.',
    iconName: 'Activity',
    color: 'text-brandAmber',
    bg: 'bg-brandAmber/10 border-brandAmber/35',
    type: 'INDUSTRIAL_ACCIDENT',
    status: 'SIMULATION',
    riskScore: 'HIGH (8.0/10)',
    activeZone: 'Assembly Hall 2'
  },
  {
    id: 'SC-COLLAPSE',
    title: 'Building Collapse Scenario',
    dataset: 'xBD / xView2',
    task: 'Building Damage Assessment',
    description: 'Satellite reconnaissance mapping post-earthquake damage, classifying structures from unaffected to completely destroyed to schedule heavy rescue cranes.',
    iconName: 'AlertOctagon',
    color: 'text-brandRed animate-pulse',
    bg: 'bg-brandRed/15 border-brandRed/40 shadow-cyberRed/20',
    type: 'BUILDING_COLLAPSE',
    status: 'SIMULATION',
    riskScore: 'CRITICAL (9.1/10)',
    activeZone: 'Sector 4 East'
  },
  {
    id: 'SC-CROWD',
    title: 'Crowd Crush Scenario',
    dataset: 'ShanghaiTech',
    task: 'Crowd Counting + Density Estimation',
    description: 'Stadium and exit monitoring using optical flow and density mapping models to estimate occupancy crowd sizes and bottleneck hazards in high-ingress zones.',
    iconName: 'Users',
    color: 'text-accentCyan',
    bg: 'bg-accentCyan/10 border-accentCyan/35 shadow-cyberCyan/15',
    type: 'CROWD',
    status: 'DATASET MODE',
    riskScore: 'CRITICAL (9.6/10)',
    activeZone: 'Gate B Plaza'
  }
];
