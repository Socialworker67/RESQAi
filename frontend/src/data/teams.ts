import { Team } from '../types';

export const initialTeams: Team[] = [
  { id: 'T-FIRE-01', name: 'Fire Team 01', type: 'Fire', status: 'Available', location: 'Station 1' },
  { id: 'T-FIRE-02', name: 'Fire Team 02', type: 'Fire', status: 'Assigned', location: 'Sector 2 (Building A)', eta: '4 min', current_incident: 'INC-2026-001' },
  { id: 'T-FIRE-03', name: 'Fire Team 03', type: 'Fire', status: 'Available', location: 'Station 2' },
  
  { id: 'T-MED-01', name: 'Medical Team 01', type: 'Medical', status: 'Available', location: 'General Hospital' },
  { id: 'T-MED-02', name: 'Medical Team 02', type: 'Medical', status: 'Available', location: 'City Clinic' },
  { id: 'T-MED-03', name: 'Medical Team 03', type: 'Medical', status: 'Assigned', location: 'NH-48 Junction', eta: '6 min', current_incident: 'INC-2026-002' },
  
  { id: 'T-POL-01', name: 'Police Team 01', type: 'Police', status: 'Assigned', location: 'NH-48 Junction', eta: '2 min', current_incident: 'INC-2026-002' },
  { id: 'T-POL-02', name: 'Police Team 02', type: 'Police', status: 'Assigned', location: 'Stadium Gate B', eta: '5 min', current_incident: 'INC-2026-005' },
  { id: 'T-POL-03', name: 'Police Team 03', type: 'Police', status: 'Available', location: 'Headquarters' },
  
  { id: 'T-RESC-01', name: 'Rescue Team 01', type: 'Rescue', status: 'Assigned', location: 'Stadium Gate B', eta: '8 min', current_incident: 'INC-2026-005' },
  { id: 'T-RESC-02', name: 'Rescue Team 02', type: 'Rescue', status: 'Available', location: 'Rescue Depot' },
  { id: 'T-RESC-04', name: 'Rescue Team 04', type: 'Rescue', status: 'Assigned', location: 'Sector 4', eta: '11 min', current_incident: 'INC-2026-004' },
  
  { id: 'T-HAZ-01', name: 'Hazmat Team 01', type: 'Hazmat', status: 'Assigned', location: 'Factory Zone C', eta: '7 min', current_incident: 'INC-2026-003' },
  { id: 'T-HAZ-02', name: 'Hazmat Team 02', type: 'Hazmat', status: 'Available', location: 'Hazmat Depot' },
];
