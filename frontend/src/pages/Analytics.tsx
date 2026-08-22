import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area 
} from 'recharts';
import { TrendingUp, Flame, AlertCircle, Clock, Zap } from 'lucide-react';

export const Analytics: React.FC = () => {
  // Mock data for analytics graphs
  const disasterTypeData = [
    { name: 'Fire', count: 12, confidence: 93.8 },
    { name: 'Road Acc.', count: 24, confidence: 89.2 },
    { name: 'Ind. Anom.', count: 8, confidence: 85.0 },
    { name: 'Collapse', count: 5, confidence: 91.1 },
    { name: 'Crowd Density', count: 15, confidence: 95.4 }
  ];

  const severityData = [
    { name: 'Critical', value: 17, color: '#ef4444' },
    { name: 'High', value: 25, color: '#f97316' },
    { name: 'Moderate', value: 12, color: '#f59e0b' },
    { name: 'Safe/Resolved', value: 40, color: '#10b981' }
  ];

  const responseTimeHistory = [
    { period: '10:00', detection: 1.2, response: 4.8, replan: 1.8 },
    { period: '11:00', detection: 0.9, response: 3.5, replan: 1.5 },
    { period: '12:00', detection: 1.4, response: 5.2, replan: 2.1 },
    { period: '13:00', detection: 0.7, response: 2.9, replan: 1.1 },
    { period: '14:00', detection: 0.8, response: 3.1, replan: 1.2 }
  ];

  return (
    <div className="flex-grow p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-65px)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-navyLight pb-2">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-100 flex items-center">
            <TrendingUp className="h-5 w-5 text-accentCyan mr-2 animate-pulse" />
            OPERATIONAL ANALYTICS
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">EOC EFFICIENCY INDEX & MODEL RETRIEVAL METRICS</p>
        </div>
      </div>

      {/* KPI Stats widgets */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-3 bg-navyMedium/60 border border-navyLight/75 rounded font-mono text-xs">
          <span className="text-[10px] text-slate-500 block uppercase">Average Detection Latency</span>
          <p className="text-2xl font-black text-slate-200 mt-1">0.96s</p>
          <span className="text-[9px] text-brandGreen font-bold flex items-center mt-1">
            <Clock className="h-3 w-3 mr-1" />
            Within SLA (-15% change)
          </span>
        </div>
        <div className="p-3 bg-navyMedium/60 border border-navyLight/75 rounded font-mono text-xs">
          <span className="text-[10px] text-slate-500 block uppercase">Average Response Time</span>
          <p className="text-2xl font-black text-slate-200 mt-1">3.9 min</p>
          <span className="text-[9px] text-brandGreen font-bold flex items-center mt-1">
            <ShieldCheckIcon className="h-3 w-3 mr-1" />
            Crew dispatched (-1.2m change)
          </span>
        </div>
        <div className="p-3 bg-navyMedium/60 border border-navyLight/75 rounded font-mono text-xs">
          <span className="text-[10px] text-slate-500 block uppercase">Average Re-plan Time</span>
          <p className="text-2xl font-black text-accentCyan mt-1">1.54s</p>
          <span className="text-[9px] text-accentCyan font-bold flex items-center mt-1">
            <Zap className="h-3 w-3 mr-1" />
            AI agent speed (+8% efficiency)
          </span>
        </div>
        <div className="p-3 bg-navyMedium/60 border border-navyLight/75 rounded font-mono text-xs">
          <span className="text-[10px] text-slate-500 block uppercase">Completed / Closed Incidents</span>
          <p className="text-2xl font-black text-brandGreen mt-1">94 incidents</p>
          <span className="text-[9px] text-slate-500 font-bold flex items-center mt-1">
            Success Rate: 98.9%
          </span>
        </div>
      </div>

      {/* Recharts graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Disaster Type counts */}
        <div className="glass-panel p-4 space-y-3 font-mono text-xs border border-navyLight/75 bg-navyMedium/45">
          <span className="font-bold text-slate-350">INCIDENTS BY DISASTER TYPE</span>
          <div className="h-[260px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={disasterTypeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#0b1329', border: '1px solid #1c2541', fontFamily: 'monospace' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="count" fill="#3b82f6" name="Total Incidents" />
                <Bar dataKey="confidence" fill="#00f0ff" name="Avg Confidence (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Severity counts */}
        <div className="glass-panel p-4 space-y-3 font-mono text-xs border border-navyLight/75 bg-navyMedium/45">
          <span className="font-bold text-slate-350">INCIDENT SEVERITY PROFILE</span>
          <div className="h-[260px] w-full flex items-center justify-center mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0b1329', border: '1px solid #1c2541', fontFamily: 'monospace' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Efficiency timelines */}
        <div className="glass-panel p-4 space-y-3 font-mono text-xs border border-navyLight/75 bg-navyMedium/45 lg:col-span-2">
          <span className="font-bold text-slate-350">OPERATIONAL LATENCY HISTORY (SLA TRACK)</span>
          <div className="h-[260px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={responseTimeHistory}>
                <defs>
                  <linearGradient id="colorDetection" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorResponse" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="period" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#0b1329', border: '1px solid #1c2541', fontFamily: 'monospace' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Area type="monotone" dataKey="detection" stroke="#00f0ff" fillOpacity={1} fill="url(#colorDetection)" name="Avg Detection (s)" />
                <Area type="monotone" dataKey="response" stroke="#3b82f6" fillOpacity={1} fill="url(#colorResponse)" name="Avg Response (m)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

// Simple inline helper icon for SLA check
const ShieldCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
