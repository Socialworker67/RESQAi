import React from 'react';
import { useDemo } from '../state/DemoContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck, RefreshCw, XCircle, AlertTriangle } from 'lucide-react';

export const PlanEvolution: React.FC = () => {
  const { incidents, activeIncidentId, isExitBlocked, activePlanVersion, isDemoRunning, demoStep, triggerReplan } = useDemo();
  const activeIncident = incidents.find(inc => inc.incident_id === activeIncidentId) || incidents[0];

  const isReplanStep = isDemoRunning ? demoStep === 7 || demoStep === 8 : isExitBlocked && activePlanVersion === 1;
  const isV2Active = activePlanVersion === 2;

  const isCrowd = activeIncident.disaster_type === 'CROWD';

  return (
    <div className="glass-panel p-4 font-mono text-xs space-y-4 border border-borderMuted">
      <div className="flex items-center justify-between border-b border-borderMuted pb-2.5">
        <div className="flex items-center space-x-2">
          <RefreshCw className={`h-4 w-4 text-accentCyan ${isReplanStep ? 'animate-spin' : ''}`} />
          <span className="font-bold text-textSecondary uppercase">AI PLAN EVOLUTION ENGINE</span>
        </div>
        <div className="text-[9px] bg-accentCyan/10 border border-accentCyan/35 text-accentCyan px-1.5 py-0.5 rounded font-black">
          CYCLE: DYNAMIC_DECISION_CORRIDOR
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch relative">
        {/* PLAN v1 Card */}
        <motion.div 
          className={`p-4 rounded-xl border flex flex-col justify-between transition-all duration-300 ${
            isExitBlocked 
              ? 'border-brandRed/20 bg-brandRed/5 text-textMuted' 
              : 'border-accentCyan/30 bg-navyMedium shadow-cyberCyan/5 text-textSecondary'
          }`}
          layout
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-borderMuted/30 pb-2">
              <span className="font-black text-sm">PLAN v1.0</span>
              <span className={`px-2 py-0.5 rounded-md text-[9px] font-black ${
                isExitBlocked ? 'bg-brandRed/10 text-brandRed border border-brandRed/30' : 'bg-accentCyan/10 text-accentCyan border border-accentCyan/30'
              }`}>
                {isExitBlocked ? 'SUPERSEDED' : 'ACTIVE'}
              </span>
            </div>
            
            {isCrowd ? (
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center space-x-2">
                  <span className="text-accentCyan text-xs">●</span>
                  <span>Crowd detected at entrance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={isExitBlocked ? 'text-brandRed line-through opacity-60' : 'text-accentCyan'}>●</span>
                  <span className={isExitBlocked ? 'line-through text-textMuted' : 'text-textPrimary font-semibold'}>Evac: Gate B (Primary Route)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-accentCyan">●</span>
                  <span>Assign: Police Team 02</span>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center space-x-2">
                  <span className="text-accentCyan text-xs">●</span>
                  <span>Fire anomaly detected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={isExitBlocked ? 'text-brandRed line-through opacity-60' : 'text-accentCyan'}>●</span>
                  <span className={isExitBlocked ? 'line-through text-textMuted' : 'text-textPrimary font-semibold'}>Evac: Exit B corridor</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-accentCyan">●</span>
                  <span>Assign: Fire Team 02</span>
                </div>
              </div>
            )}
          </div>
          
          {isExitBlocked && (
            <div className="mt-4 pt-2.5 border-t border-brandRed/10 flex items-center space-x-2 text-[10px] text-brandRed font-black uppercase">
              <XCircle className="h-4 w-4" />
              <span>{isCrowd ? 'Gate B Congested' : 'Exit B Compromised'}</span>
            </div>
          )}
        </motion.div>

        {/* Transition / Re-planning Indicator */}
        <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-borderMuted/60 bg-navyDark/40">
          <AnimatePresence mode="wait">
            {isReplanStep ? (
              <motion.div 
                key="replanning-active"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center space-y-3 py-4 w-full"
              >
                <div className="inline-flex relative p-2 bg-brandRed/10 rounded-full border border-brandRed/30 animate-pulse">
                  <AlertTriangle className="h-5 w-5 text-brandRed" />
                </div>
                <p className="text-brandRed font-black text-[10px] tracking-widest uppercase animate-pulse">STATE CHANGE REG.</p>
                <div className="text-[10px] text-textSecondary space-y-1.5 font-bold">
                  <p className="flex items-center justify-center space-x-1.5 text-accentCyan">
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    <span>AI RE-PLANNING...</span>
                  </p>
                  <div className="bg-black/30 border border-borderMuted p-1.5 rounded text-[8px] text-left text-textMuted space-y-1 font-mono uppercase">
                    <p className="flex justify-between"><span>Density check</span> <span className="text-brandRed">ALERT</span></p>
                    <p className="flex justify-between"><span>Exit Capacity</span> <span className="text-brandAmber">LOW</span></p>
                    <p className="flex justify-between"><span>Resource check</span> <span className="text-accentCyan">ACTIVE</span></p>
                  </div>
                </div>
              </motion.div>
            ) : isV2Active ? (
              <motion.div 
                key="replan-completed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center space-y-3 py-4"
              >
                <div className="inline-flex p-2 bg-brandGreen/10 rounded-full border border-brandGreen/30">
                  <ShieldCheck className="h-5 w-5 text-brandGreen" />
                </div>
                <p className="text-brandGreen font-bold text-[10px] tracking-wider">RE-PLAN COMPLETED</p>
                <p className="text-[9px] text-textMuted uppercase font-medium">Flow Shifted Safely</p>
                <ArrowRight className="h-4.5 w-4.5 text-brandGreen mx-auto animate-pulse" />
              </motion.div>
            ) : (
              <motion.div 
                key="static-route"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center space-y-2 py-4 text-textMuted"
              >
                <ShieldCheck className="h-5 w-5 text-slate-500 mx-auto" />
                <p className="text-[10px] font-bold tracking-wider">MONITORING ACTIVE</p>
                <p className="text-[9px] lowercase font-normal italic">awaiting telemetry interrupts</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* PLAN v2 Card */}
        <motion.div 
          className={`p-4 rounded-xl border flex flex-col justify-between transition-all duration-300 ${
            isV2Active 
              ? 'border-brandGreen/40 bg-navyMedium shadow-cyberCyan/5 text-textPrimary' 
              : 'border-borderMuted bg-navyDark/25 text-textMuted'
          }`}
          layout
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-borderMuted/30 pb-2">
              <span className={`font-black text-sm ${isV2Active ? 'text-textPrimary' : 'text-textMuted'}`}>PLAN v2.0</span>
              <span className={`px-2 py-0.5 rounded-md text-[9px] font-black ${
                isV2Active ? 'bg-brandGreen/10 text-brandGreen border border-brandGreen/30' : 'bg-navyLight text-textMuted border border-borderMuted'
              }`}>
                {isV2Active ? 'ACTIVE' : 'STANDBY'}
              </span>
            </div>

            {isCrowd ? (
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center space-x-2">
                  <span className={isV2Active ? 'text-brandGreen' : 'text-slate-650'}>●</span>
                  <span>Redirect: Gate C (Optimal route)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={isV2Active ? 'text-brandGreen' : 'text-slate-650'}>●</span>
                  <span>Retained: Police Team 02</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={isV2Active ? 'text-brandGreen' : 'text-slate-650'}>●</span>
                  <span>Added: Medical Team 01</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={isV2Active ? 'text-brandGreen' : 'text-slate-650'}>●</span>
                  <span>Evacuation routes updated</span>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center space-x-2">
                  <span className={isV2Active ? 'text-brandGreen' : 'text-slate-650'}>●</span>
                  <span>Redirect: Exit C (Alternate path)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={isV2Active ? 'text-brandGreen' : 'text-slate-650'}>●</span>
                  <span>Retained: Fire Team 02</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={isV2Active ? 'text-brandGreen' : 'text-slate-650'}>●</span>
                  <span>Added: Medical Team 01</span>
                </div>
              </div>
            )}
          </div>
          
          {isV2Active && (
            <div className="mt-4 pt-2.5 border-t border-brandGreen/15 flex items-center space-x-2 text-[10px] text-brandGreen font-black uppercase">
              <ShieldCheck className="h-4 w-4" />
              <span>Response Stabilized</span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Trigger Replan Quick Button (Section 17) */}
      {!isDemoRunning && isExitBlocked && !isV2Active && (
        <div className="flex justify-end pt-1">
          <button 
            onClick={triggerReplan}
            className="bg-accentCyan/10 hover:bg-accentCyan/20 text-accentCyan border border-accentCyan/30 px-3.5 py-1.5 rounded-lg font-bold transition-all text-[10px] animate-pulse"
          >
            EXECUTE DYNAMIC RE-PLAN
          </button>
        </div>
      )}
    </div>
  );
};
export default PlanEvolution;
