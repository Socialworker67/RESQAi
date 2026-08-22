import React from 'react';
import { useDemo } from '../state/DemoContext';
import { Flame, AlertTriangle, Users, ShieldAlert, Cpu } from 'lucide-react';

export const CommandCenterKPIs: React.FC = () => {
  const { incidents, teams, activePlanVersion } = useDemo();

  const activeIncidents = incidents.filter(inc => inc.status !== 'RESOLVED');
  const criticalIncidents = activeIncidents.filter(inc => inc.severity === 'CRITICAL');
  const totalPeopleAtRisk = activeIncidents.reduce((acc, curr) => acc + curr.people_at_risk, 0);
  const assignedTeams = teams.filter(t => t.status === 'Assigned').length;

  const kpis = [
    {
      title: 'Active Incidents',
      value: activeIncidents.length,
      icon: Flame,
      color: 'text-brandOrange',
      bgGlow: 'bg-brandOrange/10 border-brandOrange/20'
    },
    {
      title: 'Critical Incidents',
      value: criticalIncidents.length,
      icon: AlertTriangle,
      color: 'text-brandRed animate-pulse',
      bgGlow: 'bg-brandRed/10 border-brandRed/20 shadow-cyberRed'
    },
    {
      title: 'People at Risk',
      value: totalPeopleAtRisk.toLocaleString(),
      icon: Users,
      color: 'text-brandAmber',
      bgGlow: 'bg-brandAmber/10 border-brandAmber/20'
    },
    {
      title: 'Assigned Teams',
      value: `${assignedTeams}/${teams.length}`,
      icon: ShieldAlert,
      color: 'text-brandBlue',
      bgGlow: 'bg-brandBlue/10 border-brandBlue/20'
    },
    {
      title: 'Active AI Plan Version',
      value: `v${activePlanVersion}.0`,
      icon: Cpu,
      color: 'text-accentCyan',
      bgGlow: 'bg-accentCyan/10 border-accentCyan/20 shadow-cyberCyan'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {kpis.map((kpi, idx) => (
        <div 
          key={idx} 
          className={`p-3 rounded-md border backdrop-blur-md transition-all duration-300 ${kpi.bgGlow}`}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase text-slate-400 tracking-wider select-none">{kpi.title}</span>
            <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
          </div>
          <div className="mt-2 flex items-baseline">
            <span className="text-2xl font-black font-mono tracking-tight text-slate-100">{kpi.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
