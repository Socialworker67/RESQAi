import React, { useState, useEffect } from 'react';
import { useDemo } from '../state/DemoContext';
import { Flame, AlertTriangle, Users, ShieldAlert, RefreshCw, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Sub-component for animating number count-up on mount
const AnimatedCount: React.FC<{ value: number; duration?: number }> = ({ value, duration = 1200 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setDisplayValue(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration]);

  return <span>{displayValue.toLocaleString()}</span>;
};

export const CommandCenterKPIs: React.FC = () => {
  const { incidents, teams, activePlanVersion } = useDemo();

  const activeIncidents = incidents.filter(inc => inc.status !== 'RESOLVED');
  const criticalIncidents = activeIncidents.filter(inc => inc.severity === 'CRITICAL');
  const totalPeopleAtRisk = activeIncidents.reduce((acc, curr) => acc + curr.people_at_risk, 0);
  const assignedTeams = teams.filter(t => t.status === 'Assigned').length;

  const kpis = [
    {
      title: 'Active Incidents',
      value: activeIncidents.length || 5,
      icon: Flame,
      color: 'text-brandOrange',
      bgGlow: 'bg-navyLight hover:border-brandOrange/30 border-borderMuted text-textPrimary',
      trend: 'STABLE',
      trendUp: null,
      sparklinePoints: '5,15 20,10 35,18 50,14 65,12 80,15 95,14'
    },
    {
      title: 'Critical Incidents',
      value: criticalIncidents.length || 2,
      icon: AlertTriangle,
      color: 'text-brandRed animate-pulse',
      bgGlow: 'bg-navyLight border-borderMuted shadow-cyberRed/5 hover:border-brandRed/30',
      trend: '+12%',
      trendUp: true,
      sparklinePoints: '5,18 20,15 35,12 50,16 65,10 80,6 95,4'
    },
    {
      title: 'People at Risk',
      value: totalPeopleAtRisk || 1426,
      icon: Users,
      color: 'text-brandAmber',
      bgGlow: 'bg-navyLight border-borderMuted hover:border-brandAmber/30',
      trend: '-18%',
      trendUp: false,
      sparklinePoints: '5,5 20,8 35,12 50,15 65,11 80,16 95,20'
    },
    {
      title: 'Response Teams',
      value: teams.length || 12,
      icon: ShieldAlert,
      color: 'text-brandBlue',
      bgGlow: 'bg-navyLight border-borderMuted hover:border-brandBlue/30',
      trend: `${assignedTeams} ACTIVE`,
      trendUp: true,
      sparklinePoints: '5,15 20,15 35,10 50,10 65,12 80,8 95,6'
    },
    {
      title: 'AI Re-plans',
      value: activePlanVersion === 2 ? 8 : 7,
      icon: RefreshCw,
      color: 'text-accentCyan',
      bgGlow: 'bg-navyLight border-borderMuted shadow-cyberCyan/5 hover:border-accentCyan/30',
      trend: '+8.4%',
      trendUp: true,
      sparklinePoints: '5,16 20,12 35,15 50,10 65,8 80,9 95,5'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {kpis.map((kpi, idx) => (
        <div 
          key={idx} 
          className={`p-4 rounded-xl border backdrop-blur-lg transition-all duration-300 relative group flex flex-col justify-between h-[105px] ${kpi.bgGlow}`}
        >
          {/* Top Row: Label and Icon */}
          <div className="flex items-center justify-between select-none">
            <span className="font-mono text-[9px] uppercase text-textMuted tracking-wider font-bold">{kpi.title}</span>
            <kpi.icon className={`h-4.5 w-4.5 ${kpi.color}`} />
          </div>
          
          {/* Middle Row: Numeric Indicator */}
          <div className="mt-1 flex items-baseline">
            <span className="text-2xl font-black font-mono tracking-tight text-textPrimary">
              <AnimatedCount value={kpi.value} />
            </span>
          </div>

          {/* Bottom Row: Sparkline and Trend Indicator */}
          <div className="flex items-center justify-between mt-1 pt-1 border-t border-borderMuted/30 select-none">
            {/* Mini visual sparkline */}
            <svg className="w-16 h-5 shrink-0" viewBox="0 0 100 20">
              <polyline
                fill="none"
                stroke={kpi.trendUp === true ? '#ef4444' : kpi.trendUp === false ? '#22c55e' : '#38bdf8'}
                strokeWidth="1.5"
                points={kpi.sparklinePoints}
              />
            </svg>

            {/* Trend percentage details */}
            <span className={`font-mono text-[8px] font-bold flex items-center space-x-0.5 ${
              kpi.trendUp === true ? 'text-brandRed' : kpi.trendUp === false ? 'text-brandGreen' : 'text-accentCyan'
            }`}>
              {kpi.trendUp === true && <ArrowUpRight className="h-3 w-3" />}
              {kpi.trendUp === false && <ArrowDownRight className="h-3 w-3" />}
              <span>{kpi.trend}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CommandCenterKPIs;
