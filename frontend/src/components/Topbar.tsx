import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDemo } from '../state/DemoContext';
import { 
  Bell, 
  Settings, 
  Cpu, 
  Activity, 
  Database, 
  Play, 
  ChevronRight
} from 'lucide-react';

export const Topbar: React.FC = () => {
  const { cvEngineOnline, aiAgentOnline, dbOnline, simReady } = useDemo();
  const [time, setTime] = useState<string>(new Date().toISOString());
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toISOString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.replace('T', ' ').substring(0, 19) + ' LOCAL';

  // Map route pathname to friendly breadcrumb
  const getPageTitle = (path: string) => {
    const segments = path.split('/');
    const primary = segments[1];
    
    switch (primary) {
      case 'command-center': return 'Command Center';
      case 'incidents': return 'Active Incidents';
      case 'live-detection': return 'Live Detection';
      case 'disaster-scenarios': return 'Disaster Scenarios';
      case 'ai-commander': return 'AI Commander';
      case 'response-planning': return 'Response Planning';
      case 'teams': return 'Emergency Teams';
      case 'map': return 'Operations Map';
      case 'datasets-models': return 'Datasets & Models';
      case 'reports': return 'Reports';
      case 'analytics': return 'Analytics';
      case 'settings': return 'Settings';
      default: return 'Command Center';
    }
  };

  const pageTitle = getPageTitle(location.pathname);

  return (
    <header className="border-b border-borderMuted bg-navyMedium/95 backdrop-blur-md px-6 py-3.5 flex items-center justify-between z-40 sticky top-0 h-[65px] select-none">
      
      {/* Left: Breadcrumbs */}
      <div className="flex items-center space-x-2 font-mono">
        <Link 
          to="/command-center"
          className="text-textMuted hover:text-textSecondary font-black text-xs tracking-wider"
        >
          RESQAi
        </Link>
        <ChevronRight className="h-3 w-3 text-textMuted" />
        <span className="text-accentCyan font-bold text-xs tracking-wide">
          {pageTitle}
        </span>
      </div>

      {/* Center: System Status heartbeats */}
      <div className="hidden lg:flex items-center space-x-6 text-[10px] font-mono border-x border-borderMuted px-6">
        <div className="flex items-center space-x-2">
          <Cpu className={`h-3.5 w-3.5 ${cvEngineOnline ? 'text-brandGreen' : 'text-brandRed animate-pulse'}`} />
          <span className="text-textMuted uppercase">CV ENGINE</span>
          <span className={cvEngineOnline ? 'text-brandGreen font-bold' : 'text-brandRed font-bold animate-pulse'}>
            {cvEngineOnline ? 'ONLINE' : 'OFFLINE'}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Activity className={`h-3.5 w-3.5 ${aiAgentOnline ? 'text-brandGreen animate-pulse-slow' : 'text-brandRed animate-pulse'}`} />
          <span className="text-textMuted uppercase">AI COMMANDER</span>
          <span className={aiAgentOnline ? 'text-brandGreen font-bold' : 'text-brandRed font-bold animate-pulse'}>
            {aiAgentOnline ? 'ONLINE' : 'OFFLINE'}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Database className={`h-3.5 w-3.5 ${dbOnline ? 'text-brandGreen' : 'text-brandRed'}`} />
          <span className="text-textMuted uppercase">DATABASE</span>
          <span className={dbOnline ? 'text-brandGreen font-bold' : 'text-brandRed font-bold'}>
            {dbOnline ? 'ONLINE' : 'DEGRADED'}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Play className={`h-3.5 w-3.5 ${simReady ? 'text-accentCyan' : 'text-textMuted'}`} />
          <span className="text-textMuted uppercase">SIMULATION</span>
          <span className={simReady ? 'text-accentCyan font-bold' : 'text-textMuted font-semibold'}>
            {simReady ? 'READY' : 'OFFLINE'}
          </span>
        </div>
      </div>

      {/* Right: Clock & User Avatar */}
      <div className="flex items-center space-x-4">
        {/* Clock */}
        <div className="font-mono text-xs text-textSecondary bg-navyLight border border-borderMuted px-3 py-1.5 rounded-lg select-none shadow-sm hidden md:block">
          {formattedTime}
        </div>

        {/* Action icons */}
        <div className="flex items-center space-x-2 border-l border-borderMuted pl-4">
          <button 
            className="p-1.5 text-textMuted hover:text-textSecondary hover:bg-navyLight rounded-lg transition-colors relative cursor-pointer"
            onClick={() => alert("Notification center is operational. No critical errors detected.")}
          >
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-brandRed animate-pulse"></span>
          </button>

          <Link 
            to="/settings" 
            className="p-1.5 text-textMuted hover:text-textSecondary hover:bg-navyLight rounded-lg transition-colors cursor-pointer"
          >
            <Settings className="h-4.5 w-4.5" />
          </Link>
        </div>

        {/* Operator initials badge */}
        <div className="flex items-center space-x-2.5 border-l border-borderMuted pl-4">
          <div className="flex flex-col text-right leading-tight hidden sm:block">
            <span className="text-[9px] text-textMuted uppercase font-semibold">Human-in-the-loop</span>
            <span className="text-xs font-bold text-textPrimary">EP Operator</span>
          </div>
          <div className="h-8 w-8 rounded-lg bg-accentCyan/10 border border-accentCyan/30 text-accentCyan flex items-center justify-center font-bold text-xs select-none shadow-cyberCyan/10">
            EP
          </div>
        </div>

      </div>
    </header>
  );
};
export default Topbar;
