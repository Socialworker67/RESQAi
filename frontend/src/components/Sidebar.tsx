import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDemo } from '../state/DemoContext';
import { 
  LayoutDashboard, 
  Flame, 
  Eye, 
  MapPin, 
  Brain, 
  FileSpreadsheet, 
  Users, 
  Map, 
  Database, 
  FileText, 
  TrendingUp, 
  Settings,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { isDemoRunning, demoStep } = useDemo();

  const navItems = [
    { name: 'Command Center', path: '/command-center', icon: LayoutDashboard },
    { name: 'Active Incidents', path: '/incidents', icon: Flame },
    { name: 'Live Detection', path: '/live-detection', icon: Eye },
    { name: 'Disaster Scenarios', path: '/disaster-scenarios', icon: MapPin },
    { name: 'AI Commander', path: '/ai-commander', icon: Brain },
    { name: 'Response Planning', path: '/response-planning', icon: FileSpreadsheet },
    { name: 'Emergency Teams', path: '/teams', icon: Users },
    { name: 'Operations Map', path: '/map', icon: Map },
    { name: 'Datasets & Models', path: '/datasets-models', icon: Database },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'Analytics', path: '/analytics', icon: TrendingUp },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-navyLight bg-navyDark flex flex-col justify-between select-none shrink-0 h-[calc(100vh-65px)]">
      {/* Navigation Links */}
      <div className="flex-1 py-4 overflow-y-auto space-y-1 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center space-x-3 px-3 py-2.5 rounded transition-all duration-150 group font-mono text-xs ${
                isActive 
                  ? 'bg-navyLight border-l-2 border-accentCyan text-slate-100' 
                  : 'text-slate-400 hover:bg-navyMedium hover:text-slate-200'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`h-4 w-4 shrink-0 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-accentCyan' : 'text-slate-500 group-hover:text-slate-300'
                }`} />
                <span className="truncate">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Demo status / Bottom logo section */}
      <div className="p-4 border-t border-navyLight bg-navyDark space-y-3 font-mono text-xs">
        {isDemoRunning && (
          <div className="p-2 bg-accentCyan/5 border border-accentCyan/20 rounded animate-pulse text-center">
            <span className="flex items-center justify-center space-x-1.5 text-accentCyan">
              <Zap className="h-3 w-3" />
              <span>DEMO MODE: STEP {demoStep}/10</span>
            </span>
          </div>
        )}
        <div className="flex items-center justify-center space-x-2 py-2 px-3 bg-brandGreen/10 border border-brandGreen/30 rounded text-brandGreen select-none">
          <ShieldCheck className="h-4 w-4 animate-pulse" />
          <span className="font-bold tracking-widest text-[10px] uppercase">System Operational</span>
        </div>
      </div>
    </aside>
  );
};
