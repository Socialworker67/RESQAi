export interface CrowdDataPoint {
  time: string;
  count: number;
  density: number;
  gateBCapacity: number;
  gateCCapacity: number;
  riskLevel: 'SAFE' | 'WARNING' | 'CRITICAL';
}

export const crowdHistoryData: CrowdDataPoint[] = [
  { time: '13:00', count: 120, density: 0.8, gateBCapacity: 95, gateCCapacity: 98, riskLevel: 'SAFE' },
  { time: '13:15', count: 240, density: 1.6, gateBCapacity: 90, gateCCapacity: 98, riskLevel: 'SAFE' },
  { time: '13:30', count: 480, density: 3.2, gateBCapacity: 85, gateCCapacity: 95, riskLevel: 'WARNING' },
  { time: '13:45', count: 850, density: 5.7, gateBCapacity: 45, gateCCapacity: 92, riskLevel: 'WARNING' },
  { time: '13:58', count: 1284, density: 8.7, gateBCapacity: 12, gateCCapacity: 90, riskLevel: 'CRITICAL' },
  { time: '14:15', count: 980, density: 6.6, gateBCapacity: 8, gateCCapacity: 70, riskLevel: 'CRITICAL' },
  { time: '14:30', count: 520, density: 3.5, gateBCapacity: 5, gateCCapacity: 48, riskLevel: 'WARNING' },
  { time: '14:45', count: 280, density: 1.9, gateBCapacity: 15, gateCCapacity: 32, riskLevel: 'SAFE' }
];

export const crowdMetrics = {
  activeCount: 1284,
  activeDensity: 8.7,
  safetyThreshold: 4.0,
  riskStatus: 'CRITICAL',
  movementFlow: 'CONGESTED',
  exitCapacity: {
    gateA: 'NORMAL',
    gateB: 'LOW/RESTRICTED',
    gateC: 'HIGH/AVAILABLE',
    gateD: 'HIGH/AVAILABLE'
  }
};
