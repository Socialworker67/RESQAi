import React, { useState } from 'react';
import { useDemo } from '../state/DemoContext';
import { Link } from 'react-router-dom';
import { Flame, Eye, Compass, Activity, AlertOctagon, Users, Shield, ArrowRight } from 'lucide-react';

export const ActiveIncidents: React.FC = () => {
  const { incidents, triggerManualIncident } = useDemo();
  const [filter, setFilter] = useState<'ALL' | 'CRITICAL' | 'HIGH' | 'RESOLVED'>('ALL');

  const filteredIncidents = incidents.filter(inc => {
    if (filter === 'ALL') return true;
    if (filter === 'CRITICAL') return inc.severity === 'CRITICAL' && inc.status !== 'RESOLVED';
    if (filter === 'HIGH') return inc.severity === 'HIGH' && inc.status !== 'RESOLVED';
    if (filter === 'RESOLVED') return inc.status === 'RESOLVED';
    return true;
  });

  const getDisasterIcon = (type: string) => {
    switch (type) {
      case 'FIRE':
        return <Flame className="h-4 w-4 text-brandRed" />;
      case 'ROAD_ACCIDENT':
        return <Compass className="h-4 w-4 text-brandOrange" />;
      case 'INDUSTRIAL_ACCIDENT':
        return <Activity className="h-4 w-4 text-brandAmber" />;
      case 'BUILDING_COLLAPSE':
        return <AlertOctagon className="h-4 w-4 text-brandRed animate-pulse" />;
      case 'CROWD':
        return <Users className="h-4 w-4 text-brandBlue" />;
      default:
        return <Shield className="h-4 w-4 text-slate-400" />;
    }
  };

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'CRITICAL':
        return 'bg-brandRed/10 border-brandRed/30 text-brandRed font-bold';
      case 'HIGH':
        return 'bg-brandOrange/10 border-brandOrange/30 text-brandOrange font-bold';
      case 'MODERATE':
        return 'bg-brandAmber/10 border-brandAmber/30 text-brandAmber';
      case 'SAFE':
        return 'bg-brandGreen/10 border-brandGreen/30 text-brandGreen font-bold';
      default:
        return 'bg-slate-850 border-slate-700 text-slate-400';
    }
  };

  return (
    <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-65px)]">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-navyLight pb-2">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-100 flex items-center">
            <Flame className="h-5 w-5 text-brandOrange mr-2 animate-pulse" />
            DISASTER INCIDENT BOARD
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">REAL-TIME INCIDENT LOGS & RESPONSE MATRIX</p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center space-x-2 font-mono text-[10px]">
          {['ALL', 'CRITICAL', 'HIGH', 'RESOLVED'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilter(lvl as any)}
              className={`px-2.5 py-1 rounded transition-colors border ${
                filter === lvl 
                  ? 'bg-accentCyan/25 text-accentCyan border-accentCyan/55 font-bold' 
                  : 'text-slate-400 border-navyLight bg-navyDark hover:bg-navyMedium'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Grid listing */}
      <div className="grid grid-cols-1 gap-3">
        <div className="glass-panel overflow-hidden border border-navyLight/70">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="bg-navyMedium/85 border-b border-navyLight/60 text-slate-400 select-none text-[10px]">
                <th className="p-3">ID</th>
                <th className="p-3">DISASTER TYPE</th>
                <th className="p-3">LOCATION</th>
                <th className="p-3">SEVERITY</th>
                <th className="p-3">CONFIDENCE</th>
                <th className="p-3">PEOPLE AT RISK</th>
                <th className="p-3">STATUS</th>
                <th className="p-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navyLight/30">
              {filteredIncidents.map((inc) => (
                <tr key={inc.incident_id} className="hover:bg-navyMedium/35 transition-colors">
                  <td className="p-3 font-bold text-slate-200">{inc.incident_id}</td>
                  <td className="p-3 flex items-center space-x-2">
                    {getDisasterIcon(inc.disaster_type)}
                    <span className="uppercase text-slate-200">{inc.disaster_type.replace('_', ' ')}</span>
                  </td>
                  <td className="p-3 text-slate-400">{inc.location}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[9px] border ${getSeverityBadge(inc.severity)}`}>
                      {inc.severity}
                    </span>
                  </td>
                  <td className="p-3 text-accentCyan font-bold">{inc.confidence}%</td>
                  <td className="p-3 text-slate-300">{inc.people_at_risk.toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`font-semibold text-[10px] ${
                      inc.status === 'RESOLVED' 
                        ? 'text-brandGreen' 
                        : inc.status === 'REPLANNING' 
                          ? 'text-brandRed animate-pulse' 
                          : 'text-accentCyan'
                    }`}>
                      {inc.status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => triggerManualIncident(inc.disaster_type)}
                      className="bg-accentCyan/10 hover:bg-accentCyan/20 text-accentCyan border border-accentCyan/30 px-2 py-1 rounded text-[10px] transition-colors"
                    >
                      Load in EOC
                    </button>
                    <Link
                      to={`/incidents/${inc.incident_id}`}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-2 py-1 rounded text-[10px] inline-flex items-center space-x-1 transition-colors"
                    >
                      <span>Details</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredIncidents.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500 italic">No incidents matching the filter found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
