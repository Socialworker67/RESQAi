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
  Area,
  Line
} from 'recharts';
import { TrendingUp, Clock, Zap, CheckCircle } from 'lucide-react';
import { crowdHistoryData } from '../data/crowd';

export const Analytics: React.FC = () => {
  // Configured chart colors
  const indigoColor = '#6366F1';
  const cyanColor = '#38BDF8';
  const redColor = '#EF4444';
  const orangeColor = '#F97316';
  const amberColor = '#F59E0B';
  const greenColor = '#22C55E';

  const disasterTypeData = [
    { name: 'Fire (D-Fire)', count: 12, confidence: 93.8 },
    { name: 'Road (BDD100K)', count: 24, confidence: 89.2 },
    { name: 'Industrial (MVTec)', count: 8, confidence: 85.0 },
    { name: 'Collapse (xBD)', count: 5, confidence: 91.1 },
    { name: 'Crowd (STech)', count: 15, confidence: 96.8 }
  ];

  const severityData = [
    { name: 'Critical', value: 17, color: redColor },
    { name: 'High', value: 25, color: orangeColor },
    { name: 'Moderate', value: 12, color: amberColor },
    { name: 'Safe/Resolved', value: 40, color: greenColor }
  ];

  const latencyHistory = [
    { period: '10:00', detection: 1.2, response: 4.8, replan: 1.8 },
    { period: '11:00', detection: 0.9, response: 3.5, replan: 1.5 },
    { period: '12:00', detection: 1.4, response: 5.2, replan: 2.1 },
    { period: '13:00', detection: 0.7, response: 2.9, replan: 1.1 },
    { period: '14:00', detection: 0.96, response: 3.9, replan: 1.54 }
  ];

  return (
    <div className="flex-grow p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-65px)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-borderMuted pb-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-textPrimary flex items-center">
            <TrendingUp className="h-5 w-5 text-accentCyan mr-2 animate-pulse" />
            OPERATIONAL ANALYTICS
          </h1>
          <p className="text-xs text-textMuted font-mono mt-1">EOC EFFICIENCY INDEX & DATASET INFERENCE STATISTICS</p>
        </div>
      </div>

      {/* KPI Stats widgets */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-navyMedium border border-borderMuted rounded-xl font-mono text-xs">
          <span className="text-[10px] text-textMuted block uppercase font-bold">AVG DETECTION LATENCY</span>
          <p className="text-2xl font-black text-textPrimary mt-1">0.96s</p>
          <span className="text-[9px] text-brandGreen font-bold flex items-center mt-1">
            <Clock className="h-3 w-3 mr-1" />
            Within SLA (-15% change)
          </span>
        </div>
        <div className="p-4 bg-navyMedium border border-borderMuted rounded-xl font-mono text-xs">
          <span className="text-[10px] text-textMuted block uppercase font-bold">AVG DISPATCH RESPONSE</span>
          <p className="text-2xl font-black text-textPrimary mt-1">3.9 min</p>
          <span className="text-[9px] text-brandGreen font-bold flex items-center mt-1">
            <CheckCircle className="h-3 w-3 mr-1" />
            Crews dispatched (-1.2m change)
          </span>
        </div>
        <div className="p-4 bg-navyMedium border border-borderMuted rounded-xl font-mono text-xs">
          <span className="text-[10px] text-textMuted block uppercase font-bold">AVG RE-PLAN SPEED</span>
          <p className="text-2xl font-black text-accentCyan mt-1">1.54s</p>
          <span className="text-[9px] text-accentCyan font-bold flex items-center mt-1">
            <Zap className="h-3 w-3 mr-1 animate-bounce" />
            AI planner (+8% speed)
          </span>
        </div>
        <div className="p-4 bg-navyMedium border border-borderMuted rounded-xl font-mono text-xs">
          <span className="text-[10px] text-textMuted block uppercase font-bold">RESOLVED INCIDENTS</span>
          <p className="text-2xl font-black text-brandGreen mt-1">94 cases</p>
          <span className="text-[9px] text-textMuted font-bold flex items-center mt-1">
            Success Rate: 98.9%
          </span>
        </div>
      </div>

      {/* Recharts graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Crowd Density & Counts Over Time (Real dataset metric) */}
        <div className="glass-panel p-4 space-y-3 font-mono text-xs border border-borderMuted bg-navyMedium/45">
          <div className="flex items-center justify-between border-b border-borderMuted/30 pb-2">
            <span className="font-bold text-textSecondary uppercase">Crowd Density / Counts Over Time</span>
            <span className="text-[9px] text-accentCyan bg-accentCyan/10 px-1.5 py-0.5 rounded border border-accentCyan/30">
              ShanghaiTech Test Segment A
            </span>
          </div>
          <div className="h-[250px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={crowdHistoryData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={indigoColor} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={indigoColor} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.08)" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={10} />
                <YAxis yAxisId="left" stroke="#64748b" fontSize={10} label={{ value: 'Count (pax)', angle: -90, position: 'insideLeft', style: { fill: '#64748b', fontSize: '9px' } }} />
                <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={10} label={{ value: 'Density (pax/m²)', angle: 90, position: 'insideRight', style: { fill: '#64748b', fontSize: '9px' } }} />
                <Tooltip contentStyle={{ backgroundColor: '#0B1626', border: '1px solid rgba(148, 163, 184, 0.16)', fontFamily: 'monospace' }} />
                <Legend wrapperStyle={{ fontSize: '9px' }} />
                <Area yAxisId="left" type="monotone" dataKey="count" stroke={indigoColor} fillOpacity={1} fill="url(#colorCount)" name="People Count" />
                <Line yAxisId="right" type="monotone" dataKey="density" stroke={cyanColor} strokeWidth={2} name="Crowd Density" dot={{ r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Disaster Type counts */}
        <div className="glass-panel p-4 space-y-3 font-mono text-xs border border-borderMuted bg-navyMedium/45">
          <span className="font-bold text-textSecondary uppercase block border-b border-borderMuted/30 pb-2">INCIDENTS BY DISASTER TYPE</span>
          <div className="h-[250px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={disasterTypeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.08)" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={9} />
                <YAxis stroke="#64748b" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#0B1626', border: '1px solid rgba(148, 163, 184, 0.16)', fontFamily: 'monospace' }} />
                <Legend wrapperStyle={{ fontSize: '9px' }} />
                <Bar dataKey="count" fill={indigoColor} name="Total Incidents" />
                <Bar dataKey="confidence" fill={cyanColor} name="Avg Confidence (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Severity counts */}
        <div className="glass-panel p-4 space-y-3 font-mono text-xs border border-borderMuted bg-navyMedium/45">
          <span className="font-bold text-textSecondary uppercase block border-b border-borderMuted/30 pb-2">INCIDENT SEVERITY PROFILE</span>
          <div className="h-[250px] w-full flex items-center justify-center mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={6}
                  dataKey="value"
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0B1626', border: '1px solid rgba(148, 163, 184, 0.16)', fontFamily: 'monospace' }} />
                <Legend wrapperStyle={{ fontSize: '9px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Latency History */}
        <div className="glass-panel p-4 space-y-3 font-mono text-xs border border-borderMuted bg-navyMedium/45">
          <span className="font-bold text-textSecondary uppercase block border-b border-borderMuted/30 pb-2">OPERATIONAL LATENCY & RESPONSE TRACK</span>
          <div className="h-[250px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={latencyHistory}>
                <defs>
                  <linearGradient id="colorReplan" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={cyanColor} stopOpacity={0.35}/>
                    <stop offset="95%" stopColor={cyanColor} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.08)" />
                <XAxis dataKey="period" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#0B1626', border: '1px solid rgba(148, 163, 184, 0.16)', fontFamily: 'monospace' }} />
                <Legend wrapperStyle={{ fontSize: '9px' }} />
                <Area type="monotone" dataKey="replan" stroke={cyanColor} fillOpacity={1} fill="url(#colorReplan)" name="AI Re-plan (s)" />
                <Line type="monotone" dataKey="detection" stroke={indigoColor} strokeWidth={2} name="Detection Latency (s)" dot={{ r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};
export default Analytics;
