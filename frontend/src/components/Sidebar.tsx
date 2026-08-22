import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDemo } from '../state/DemoContext';
import { motion } from 'framer-motion';
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
  Zap,
  ChevronLeft,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { isDemoRunning, demoStep, isPresentationMode } = useDemo();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

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
  ];

  // If presentation mode is on, hide the sidebar entirely
  if (isPresentationMode) {
    return null;
  }

  return (
    <aside 
      className={`border-r border-borderMuted bg-navyMedium flex flex-col justify-between select-none shrink-0 h-[calc(100vh-65px)] transition-all duration-300 relative ${
        isCollapsed ? 'w-[72px]' : 'w-64'
      }`}
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-4 -right-3 bg-navyLight hover:bg-elevated border border-borderMuted text-accentCyan p-1 rounded-full z-20 cursor-pointer shadow-md transition-colors"
      >
        {isCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
      </button>

      {/* Header and Logo Block */}
      <div className="p-4 border-b border-borderMuted flex items-center space-x-3 overflow-hidden">
        <div className="relative shrink-0">
          <div className="absolute -inset-1 rounded bg-accentCyan/20 blur-sm animate-pulse-slow"></div>
          <div className="relative bg-navyLight border border-accentCyan/40 p-2 rounded">
            <ShieldAlert className="h-5 w-5 text-accentCyan" />
          </div>
        </div>
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="flex flex-col select-none"
          >
            <span className="font-sans font-black tracking-wider text-sm text-textPrimary leading-none">RESQAi</span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-textMuted mt-0.5">AI DISASTER COMMAND</span>
          </motion.div>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 overflow-y-auto space-y-1 px-3">
        {navItems.map((item) => (
          <div key={item.path} className="relative group">
            <NavLink
              to={item.path}
              className={({ isActive }) => 
                `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-150 group font-mono text-xs ${
                  isActive 
                    ? 'bg-navyLight border border-accentCyan/30 text-textPrimary shadow-cyberCyan/10' 
                    : 'text-textMuted hover:bg-navyLight/50 hover:text-textSecondary'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`h-4.5 w-4.5 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                    isActive ? 'text-accentCyan' : 'text-textMuted group-hover:text-textSecondary'
                  }`} />
                  {!isCollapsed && (
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="truncate font-sans font-semibold tracking-wide"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </>
              )}
            </NavLink>

            {/* Collapsed Tooltip */}
            {isCollapsed && (
              <div className="absolute left-16 top-1/2 -translate-y-1/2 ml-2 bg-navyLight border border-borderMuted px-3 py-1.5 rounded-md text-textPrimary text-xs font-sans font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-30 shadow-lg">
                {item.name}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Demo status & System Operational Block */}
      <div className="p-4 border-t border-borderMuted bg-navyMedium space-y-3 font-mono text-xs shrink-0">
        {isDemoRunning && (
          <div className="p-2 bg-accentCyan/5 border border-accentCyan/20 rounded-lg text-center overflow-hidden">
            <span className="flex items-center justify-center space-x-1.5 text-accentCyan text-[10px] font-black">
              <Zap className="h-3.5 w-3.5 animate-bounce" />
              {!isCollapsed ? <span>DEMO STEP {demoStep}/10</span> : <span>{demoStep}/10</span>}
            </span>
          </div>
        )}
        
        <div className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-lg select-none border transition-all duration-300 ${
          isCollapsed ? 'border-brandGreen/20 bg-brandGreen/5 text-brandGreen' : 'border-brandGreen/30 bg-brandGreen/10 text-brandGreen'
        }`}>
          <div className="h-2 w-2 rounded-full bg-brandGreen animate-pulse shrink-0"></div>
          {!isCollapsed && (
            <span className="font-bold tracking-widest text-[9px] uppercase font-sans">System Operational</span>
          )}
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
