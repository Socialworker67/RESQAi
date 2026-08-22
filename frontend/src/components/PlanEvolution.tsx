import React from 'react';
import { useDemo } from '../state/DemoContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ArrowRight, ShieldCheck, RefreshCw, XCircle, AlertTriangle } from 'lucide-react';

export const PlanEvolution: React.FC = () => {
  const { isExitBlocked, activePlanVersion, isDemoRunning, demoStep } = useDemo();

  // Helper to determine the state of the AI agent
  // Step 6: exit blocked (demoStep === 6)
  // Step 7: agent replanning (demoStep === 7)
  // Step 8: route recalculating (demoStep === 8)
  // Step 9: plan v2 active (demoStep >= 9)

  const isReplanStep = isDemoRunning ? demoStep === 7 || demoStep === 8 : isExitBlocked && activePlanVersion === 1;
  const isV2Active = activePlanVersion === 2;

  return (
    <div className="glass-panel p-4 font-mono text-xs space-y-4 border border-navyLight">
      <div className="flex items-center justify-between border-b border-navyLight pb-2">
        <div className="flex items-center space-x-2">
          <RefreshCw className={`h-4 w-4 text-accentCyan ${isReplanStep ? 'animate-spin' : ''}`} />
          <span className="font-bold text-slate-300">AI PLAN EVOLUTION ENGINE</span>
        </div>
        <div className="text-[10px] text-slate-500">
          PLANNING_CYCLE: CLIENT_DYNAMIC
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
        {/* PLAN v1 Card */}
        <motion.div 
          className={`p-3 rounded border flex flex-col justify-between transition-all duration-300 ${
            isExitBlocked 
              ? 'border-brandRed/20 bg-brandRed/5 text-slate-400' 
              : 'border-accentCyan/30 bg-navyMedium shadow-cyberCyan text-slate-200'
          }`}
          layout
        >
          <div>
            <div className="flex items-center justify-between border-b border-navyLight pb-1.5 mb-2">
              <span className="font-black text-sm">PLAN v1.0</span>
              <span className={`px-1.5 py-0.5 rounded text-[9px] ${
                isExitBlocked ? 'bg-brandRed/10 text-brandRed border border-brandRed/30' : 'bg-accentCyan/10 text-accentCyan border border-accentCyan/30'
              }`}>
                {isExitBlocked ? 'SUPERSEDED' : 'ACTIVE'}
              </span>
            </div>
            <ul className="space-y-1.5 text-[11px]">
              <li className="flex items-start space-x-1">
                <span className="text-accentCyan">▪</span>
                <span>Incident: Fire Detected</span>
              </li>
              <li className="flex items-start space-x-1">
                <span className={isExitBlocked ? 'text-brandRed font-semibold line-through' : 'text-accentCyan'}>▪</span>
                <span className={isExitBlocked ? 'line-through text-slate-500' : ''}>Evac Route: EXIT B (Optimal)</span>
              </li>
              <li className="flex items-start space-x-1">
                <span className="text-accentCyan">▪</span>
                <span>Deploy: Fire Team 02</span>
              </li>
            </ul>
          </div>
          {isExitBlocked && (
            <div className="mt-3 pt-2 border-t border-brandRed/10 flex items-center space-x-1.5 text-[10px] text-brandRed font-semibold">
              <XCircle className="h-3.5 w-3.5" />
              <span>Route Compromised (Blocked)</span>
            </div>
          )}
        </motion.div>

        {/* Transition / Re-planning Indicator */}
        <div className="flex flex-col items-center justify-center p-2 rounded border border-navyLight/60 bg-navyDark/40">
          <AnimatePresence mode="wait">
            {isReplanStep ? (
              <motion.div 
                key="replanning-active"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center space-y-2 py-4"
              >
                <div className="inline-flex relative p-2 bg-brandRed/10 rounded-full border border-brandRed/30 animate-pulse">
                  <AlertTriangle className="h-5 w-5 text-brandRed" />
                </div>
                <p className="text-brandRed font-black text-[11px] animate-pulse">STATE CHANGE DETECTED</p>
                <div className="text-[10px] text-slate-400 space-y-1">
                  <p className="flex items-center justify-center space-x-1 text-accentCyan">
                    <RefreshCw className="h-3 w-3 animate-spin" />
                    <span>AI RE-PLANNING...</span>
                  </p>
                  <p className="text-[9px] text-slate-500">Route Recalculation Active</p>
                </div>
              </motion.div>
            ) : isV2Active ? (
              <motion.div 
                key="replan-completed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center space-y-2 py-4"
              >
                <div className="inline-flex p-2 bg-brandGreen/10 rounded-full border border-brandGreen/30">
                  <ShieldCheck className="h-5 w-5 text-brandGreen" />
                </div>
                <p className="text-brandGreen font-bold text-[11px]">RE-PLAN COMPLETED</p>
                <p className="text-[9px] text-slate-500">Execution Shifted</p>
                <ArrowRight className="h-4 w-4 text-brandGreen mx-auto animate-pulse" />
              </motion.div>
            ) : (
              <motion.div 
                key="static-route"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center space-y-1.5 py-4 text-slate-500"
              >
                <ShieldCheck className="h-5 w-5 text-slate-600 mx-auto" />
                <p className="text-[10px]">MONITORING ACTIVE</p>
                <p className="text-[8px]">Awaiting environmental triggers</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* PLAN v2 Card */}
        <motion.div 
          className={`p-3 rounded border flex flex-col justify-between transition-all duration-300 ${
            isV2Active 
              ? 'border-brandGreen/40 bg-navyMedium shadow-cyberCyan text-slate-100' 
              : 'border-navyLight bg-navyDark/20 text-slate-600'
          }`}
          layout
        >
          <div>
            <div className="flex items-center justify-between border-b border-navyLight pb-1.5 mb-2">
              <span className={`font-black text-sm ${isV2Active ? 'text-slate-100' : 'text-slate-600'}`}>PLAN v2.0</span>
              <span className={`px-1.5 py-0.5 rounded text-[9px] ${
                isV2Active ? 'bg-brandGreen/10 text-brandGreen border border-brandGreen/30' : 'bg-navyLight text-slate-600 border border-navyLight'
              }`}>
                {isV2Active ? 'ACTIVE' : 'STANDBY'}
              </span>
            </div>
            <ul className="space-y-1.5 text-[11px]">
              <li className="flex items-start space-x-1">
                <span className={isV2Active ? 'text-brandGreen' : 'text-slate-600'}>▪</span>
                <span>Incident: Fire Suppression Active</span>
              </li>
              <li className="flex items-start space-x-1">
                <span className={isV2Active ? 'text-brandGreen font-bold' : 'text-slate-600'}>▪</span>
                <span className={isV2Active ? 'text-accentCyan font-bold' : ''}>Evac Route: EXIT C (Shifted)</span>
              </li>
              <li className="flex items-start space-x-1">
                <span className={isV2Active ? 'text-brandGreen' : 'text-slate-600'}>▪</span>
                <span>Retained: Fire Team 02</span>
              </li>
              <li className="flex items-start space-x-1">
                <span className={isV2Active ? 'text-brandGreen font-bold' : 'text-slate-600'}>▪</span>
                <span className={isV2Active ? 'text-brandGreen font-bold' : ''}>Added: Medical Team 01</span>
              </li>
            </ul>
          </div>
          {isV2Active && (
            <div className="mt-3 pt-2 border-t border-brandGreen/10 flex items-center space-x-1.5 text-[10px] text-brandGreen font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Coordinated Dispatch Active</span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
