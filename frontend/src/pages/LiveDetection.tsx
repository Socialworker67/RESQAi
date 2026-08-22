import React, { useState } from 'react';
import { useDemo } from '../state/DemoContext';
import { AlertCircle, Eye, Info } from 'lucide-react';

export const LiveDetection: React.FC = () => {
  const { incidents, activeIncidentId, triggerManualIncident } = useDemo();
  const [activeTab, setActiveTab] = useState<'CAMERA' | 'VIDEO' | 'DATASET' | 'SIMULATION'>('DATASET');
  const activeIncident = incidents.find(inc => inc.incident_id === activeIncidentId) || incidents[0];

  const getMediaContent = () => {
    if (activeIncident.disaster_type === 'CROWD') {
      return (
        <svg viewBox="0 0 640 360" className="w-full h-full bg-[#07111F] font-mono select-none">
          {/* Simulated Image Grid */}
          <rect width="100%" height="100%" fill="#0A1220" />
          
          {/* Representative crowd circles and points representing ShanghaiTech model estimation */}
          <g opacity="0.8">
            <circle cx="200" cy="150" r="45" fill="rgba(239, 68, 68, 0.25)" />
            <circle cx="280" cy="190" r="50" fill="rgba(239, 68, 68, 0.35)" />
            <circle cx="340" cy="140" r="40" fill="rgba(239, 68, 68, 0.25)" />
            <circle cx="420" cy="180" r="55" fill="rgba(239, 68, 68, 0.4)" />
            <circle cx="480" cy="120" r="30" fill="rgba(239, 68, 68, 0.2)" />
          </g>

          {/* Individual Bounding point annotations representing head counts */}
          <g fill="#38BDF8" stroke="#07111F" strokeWidth="0.5">
            <circle cx="200" cy="140" r="2.5" />
            <circle cx="210" cy="150" r="2.5" />
            <circle cx="205" cy="130" r="2.5" />
            <circle cx="190" cy="160" r="2.5" />
            <circle cx="220" cy="155" r="2.5" />
            
            <circle cx="270" cy="180" r="2.5" />
            <circle cx="285" cy="195" r="2.5" />
            <circle cx="295" cy="175" r="2.5" />
            <circle cx="280" cy="210" r="2.5" />
            <circle cx="260" cy="190" r="2.5" />

            <circle cx="330" cy="130" r="2.5" />
            <circle cx="345" cy="145" r="2.5" />
            <circle cx="350" cy="125" r="2.5" />
            <circle cx="325" cy="150" r="2.5" />

            <circle cx="410" cy="170" r="2.5" />
            <circle cx="425" cy="195" r="2.5" />
            <circle cx="435" cy="160" r="2.5" />
            <circle cx="400" cy="180" r="2.5" />
            <circle cx="445" cy="190" r="2.5" />

            <circle cx="475" cy="115" r="2.5" />
            <circle cx="485" cy="125" r="2.5" />
            <circle cx="490" cy="110" r="2.5" />
          </g>

          {/* Density Heatmap HUD contours */}
          <path d="M 180 180 Q 300 240 450 180" fill="none" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="1.5" strokeDasharray="3,3" />
          
          {/* Bounding Box: CROWD CRUSH */}
          <rect x="150" y="70" width="380" height="230" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeDasharray="6,4" />
          
          {/* Tag labels */}
          <rect x="150" y="42" width="160" height="28" fill="#EF4444" rx="4" />
          <text x="160" y="60" fill="#FFF" fontSize="10" fontWeight="black" fontFamily="monospace">🚨 CROWD RISK 96.8%</text>

          {/* Text Overlays showing counts */}
          <g transform="translate(165, 95)" font-family="sans-serif">
            <rect x="0" y="0" width="180" height="55" fill="rgba(7, 17, 31, 0.95)" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="1.5" rx="6" />
            <text x="15" y="20" fill="#CBD5E1" fontSize="10" fontWeight="bold">PERSON COUNT: 1,284 PAX</text>
            <text x="15" y="34" fill="#EF4444" fontSize="10" fontWeight="black">DENSITY: 8.7 persons/m²</text>
            <text x="15" y="46" fill="#F8FAFC" fontSize="8" fontWeight="medium">ZONE: GATE B CORRIDOR</text>
          </g>

          {/* HUD Target crosshair */}
          <path d="M 320 20 L 320 340 M 40 180 L 600 180" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" strokeDasharray="5,5" />
          <circle cx="320" cy="180" r="30" fill="none" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1" />
        </svg>
      );
    } else if (activeIncident.disaster_type === 'FIRE') {
      return (
        <svg viewBox="0 0 640 360" className="w-full h-full bg-[#07111F] font-mono select-none">
          <rect width="100%" height="100%" fill="#0A1220" />
          <circle cx="320" cy="180" r="120" fill="rgba(239, 68, 68, 0.08)" className="animate-pulse" />
          
          <path d="M 280 240 Q 320 140 360 240 Z" fill="rgba(249, 115, 22, 0.35)" stroke="#EF4444" strokeWidth="2" className="animate-pulse" />
          <path d="M 300 240 Q 320 170 340 240 Z" fill="rgba(245, 158, 11, 0.55)" className="animate-pulse-slow" />
          
          <rect x="250" y="130" width="140" height="120" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="4,2" />
          <rect x="250" y="105" width="90" height="25" fill="#EF4444" rx="3" />
          <text x="255" y="122" fill="#fff" fontSize="11" fontWeight="bold">🔥 FIRE 94.2%</text>

          <rect x="200" y="70" width="240" height="190" fill="none" stroke="#F97316" strokeWidth="1.5" />
          <rect x="200" y="45" width="100" height="25" fill="#F97316" rx="3" />
          <text x="205" y="62" fill="#fff" fontSize="11" fontWeight="bold">💨 SMOKE 91.7%</text>

          <rect x="120" y="180" width="50" height="110" fill="none" stroke="#38BDF8" strokeWidth="1.5" />
          <rect x="120" y="160" width="80" height="20" fill="#38BDF8" rx="2" />
          <text x="125" y="174" fill="#07111F" fontSize="10" fontWeight="bold">👤 PERSON 97%</text>
        </svg>
      );
    } else if (activeIncident.disaster_type === 'ROAD_ACCIDENT') {
      return (
        <svg viewBox="0 0 640 360" className="w-full h-full bg-[#07111F] font-mono select-none">
          <rect width="100%" height="100%" fill="#0A1220" />
          <line x1="100" y1="360" x2="280" y2="0" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
          <line x1="540" y1="360" x2="360" y2="0" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
          
          <rect x="260" y="180" width="60" height="40" fill="rgba(239, 68, 68, 0.2)" stroke="#EF4444" strokeWidth="2" transform="rotate(25, 290, 200)" />
          <rect x="290" y="160" width="55" height="35" fill="rgba(249, 115, 22, 0.2)" stroke="#F97316" strokeWidth="1.5" transform="rotate(-15, 317, 177)" />

          <rect x="240" y="120" width="150" height="130" fill="none" stroke="#EF4444" strokeWidth="2" />
          <rect x="240" y="95" width="115" height="25" fill="#EF4444" rx="3" />
          <text x="245" y="112" fill="#fff" fontSize="10" fontWeight="bold">🚨 ACCIDENT 87.0%</text>

          <rect x="80" y="240" width="90" height="70" fill="none" stroke="#22C55E" strokeWidth="1.5" />
          <rect x="80" y="220" width="90" height="20" fill="#22C55E" rx="2" />
          <text x="85" y="234" fill="#fff" fontSize="10" fontWeight="bold">🚗 VEHICLE 98%</text>
        </svg>
      );
    } else if (activeIncident.disaster_type === 'INDUSTRIAL_ACCIDENT') {
      return (
        <svg viewBox="0 0 640 360" className="w-full h-full bg-[#07111F] font-mono select-none">
          <rect width="100%" height="100%" fill="#0A1220" />
          <circle cx="320" cy="180" r="80" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="6" />
          <line x1="320" y1="100" x2="320" y2="260" stroke="rgba(255,255,255,0.15)" strokeWidth="6" transform="rotate(45, 320, 180)" />
          <ellipse cx="360" cy="160" rx="90" ry="50" fill="rgba(249, 115, 22, 0.15)" className="animate-pulse" />

          <rect x="220" y="80" width="220" height="200" fill="none" stroke="#F97316" strokeWidth="2" strokeDasharray="6,3" />
          <rect x="220" y="55" width="130" height="25" fill="#F97316" rx="3" />
          <text x="225" y="72" fill="#fff" fontSize="10" fontWeight="bold">⚠️ ANOMALY SCORE 87%</text>
        </svg>
      );
    } else {
      return (
        <svg viewBox="0 0 640 360" className="w-full h-full bg-[#07111F] font-mono select-none">
          <rect width="100%" height="100%" fill="#0A1220" />
          <rect x="120" y="80" width="140" height="100" fill="rgba(34, 197, 94, 0.1)" stroke="#22C55E" strokeWidth="1.5" />
          <text x="190" y="135" fill="#22C55E" fontSize="10" fontWeight="bold" textAnchor="middle">G4: INTACT</text>

          <path d="M 380 220 L 420 150 L 510 190 L 480 240 Z" fill="rgba(239, 68, 68, 0.15)" stroke="#EF4444" strokeWidth="1.5" />
          <rect x="360" y="130" width="170" height="130" fill="none" stroke="#EF4444" strokeWidth="2" />
          <rect x="360" y="105" width="135" height="25" fill="#EF4444" rx="3" />
          <text x="365" y="122" fill="#fff" fontSize="10" fontWeight="bold">🏗️ DESTROYED 91.5%</text>
        </svg>
      );
    }
  };

  return (
    <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-65px)]">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-borderMuted pb-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-textPrimary flex items-center">
            <Eye className="h-5 w-5 text-accentCyan mr-2 animate-pulse" />
            LIVE COMPUTER VISION SYSTEM
          </h1>
          <p className="text-xs text-textMuted font-mono mt-1">SENSORY TELEMETRY PIPELINE & INSTANT ANNOTATION LAYER</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Column: Media feed panel (3/4 width) */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Main Feed Container */}
          <div className="relative border border-borderMuted rounded-xl bg-black overflow-hidden shadow-cyberCyan/10">
            {/* Viewport Header Tabs (CAMERA, VIDEO, DATASET, SIMULATION) */}
            <div className="bg-navyMedium/90 border-b border-borderMuted px-4 py-2.5 flex items-center justify-between z-10">
              <div className="flex items-center space-x-2 font-mono text-xs select-none">
                {['CAMERA', 'VIDEO', 'DATASET', 'SIMULATION'].map((tab) => {
                  const isCurrent = activeTab === tab;
                  return (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={`px-3 py-1 rounded-md transition-all font-bold cursor-pointer ${
                        isCurrent 
                          ? 'bg-accentCyan/20 text-accentCyan border border-accentCyan/40' 
                          : 'text-textMuted hover:text-textSecondary hover:bg-navyLight/50'
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

              {/* Status Heartbeat */}
              <div className="flex items-center space-x-2 select-none">
                <span className="h-2.5 w-2.5 rounded-full bg-brandGreen animate-pulse"></span>
                <span className="font-mono text-[9px] text-brandGreen font-bold uppercase">{activeTab} ACTIVE</span>
              </div>
            </div>

            {/* Media Canvas Body */}
            <div className="aspect-video relative">
              {getMediaContent()}
              
              {/* Scanline grid overlay */}
              <div className="absolute inset-0 pointer-events-none border-b border-accentCyan/5 bg-gradient-to-b from-transparent to-accentCyan/5 animate-scanline" />
              
              {/* HUD overlays */}
              <div className="absolute top-14 left-4 font-mono text-[9px] text-accentCyan bg-navyDark/85 px-2.5 py-1 rounded-md border border-accentCyan/30">
                SOURCE: {activeIncident.source}
              </div>
              
              <div className="absolute top-14 right-4 font-mono text-[9px] text-accentCyan bg-navyDark/85 px-2.5 py-1 rounded-md border border-accentCyan/30">
                LOC: {activeIncident.affected_zone}
              </div>

              {/* MODEL INFERENCE WARNING BADGE (Requirement 21) */}
              <div className="absolute bottom-4 left-4 font-mono text-[9px] text-brandOrange bg-navyDark/90 px-2.5 py-1 rounded-md border border-brandOrange/35 flex items-center space-x-1.5 shadow-md">
                <AlertCircle className="h-3.5 w-3.5 text-brandOrange animate-pulse" />
                <span className="font-black uppercase tracking-wider">MODEL INFERENCE: SIMULATION</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: CV Stats / Selection list (1/4 width) */}
        <div className="lg:col-span-1 space-y-4">
          <div className="glass-panel p-4 space-y-4 font-mono text-xs border border-borderMuted bg-navyMedium/60">
            <div className="border-b border-borderMuted pb-2">
              <span className="font-bold text-textSecondary uppercase">PERCEPTION STATUS</span>
            </div>

            <div className="space-y-3.5">
              <div>
                <span className="text-[9px] text-textMuted uppercase font-black">Active Stream</span>
                <span className="block mt-1 font-bold text-textPrimary text-xs">{activeIncident.incident_id}</span>
              </div>
              <div>
                <span className="text-[9px] text-textMuted uppercase font-black">Disaster Category</span>
                <span className="block mt-1 font-black text-brandOrange uppercase text-xs">
                  {activeIncident.disaster_type.replace('_', ' ')}
                </span>
              </div>
              <div>
                <span className="text-[9px] text-textMuted uppercase font-black">Target Location</span>
                <span className="block mt-1 text-textSecondary">{activeIncident.location}</span>
              </div>
              <div>
                <span className="text-[9px] text-textMuted uppercase font-black">Sensor Input Type</span>
                <span className="block mt-1 text-accentCyan font-bold uppercase">{activeIncident.source.split(' ')[0]}</span>
              </div>
              <div className="pt-2 border-t border-borderMuted/30">
                <span className="text-[9px] text-textMuted uppercase font-black">Inference Method</span>
                <p className="mt-1 text-[11px] text-textSecondary flex items-center space-x-1 font-sans">
                  <Info className="h-3 w-3 text-accentCyan shrink-0" />
                  <span>
                    {activeIncident.disaster_type === 'CROWD' ? 'CSRNet Density Mapping' : 'YOLOv8 Class Bboxes'}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-4 space-y-3 border border-borderMuted bg-navyMedium/40">
            <span className="font-mono text-[10px] font-black text-textMuted block mb-2 uppercase tracking-wide">ACTIVE PERCEPTION FEEDS</span>
            <div className="space-y-1 select-none">
              {incidents.map((inc) => (
                <button
                  key={inc.incident_id}
                  onClick={() => triggerManualIncident(inc.disaster_type)}
                  className={`w-full text-left font-mono text-[10px] p-2.5 rounded-lg transition-all flex items-center justify-between border cursor-pointer ${
                    inc.incident_id === activeIncidentId 
                      ? 'bg-accentCyan/10 text-accentCyan border-accentCyan/30 font-bold' 
                      : 'text-textMuted hover:bg-navyLight border-transparent hover:text-textSecondary'
                  }`}
                >
                  <span className="uppercase">{inc.disaster_type.replace('_', ' ')}</span>
                  <span className="text-[8px] text-textMuted font-medium">{inc.incident_id}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LiveDetection;
