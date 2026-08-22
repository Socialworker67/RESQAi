import React, { useState } from 'react';
import { useDemo } from '../state/DemoContext';
import { Camera, Video, Play, Maximize, AlertCircle, Eye } from 'lucide-react';

export const LiveDetection: React.FC = () => {
  const { incidents, activeIncidentId, triggerManualIncident } = useDemo();
  const [mediaTab, setMediaTab] = useState<'LIVE' | 'VIDEO' | 'SIMULATION'>('LIVE');
  const activeIncident = incidents.find(inc => inc.incident_id === activeIncidentId) || incidents[0];

  const getMediaContent = () => {
    // Return custom mock SVGs that represent real video frames with bounding boxes.
    if (activeIncident.disaster_type === 'FIRE') {
      return (
        <svg viewBox="0 0 640 360" className="w-full h-full bg-[#050014]">
          {/* Mock Video Frame */}
          <rect width="100%" height="100%" fill="#0a0518" />
          <circle cx="320" cy="180" r="120" fill="rgba(239, 68, 68, 0.1)" className="animate-pulse" />
          
          {/* Flame shapes */}
          <path d="M 280 240 Q 320 140 360 240 Z" fill="rgba(249, 115, 22, 0.4)" stroke="#ef4444" strokeWidth="2" className="animate-pulse" />
          <path d="M 300 240 Q 320 170 340 240 Z" fill="rgba(245, 158, 11, 0.6)" className="animate-pulse-slow" />
          
          {/* Bounding Box: FIRE */}
          <rect x="250" y="130" width="140" height="120" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,2" />
          <rect x="250" y="105" width="90" height="25" fill="#ef4444" />
          <text x="255" y="122" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="monospace">🔥 FIRE 94.2%</text>

          {/* Bounding Box: SMOKE */}
          <rect x="200" y="70" width="240" height="190" fill="none" stroke="#f97316" strokeWidth="1.5" />
          <rect x="200" y="45" width="100" height="25" fill="#f97316" />
          <text x="205" y="62" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="monospace">💨 SMOKE 91.7%</text>

          {/* Bounding Box: PERSON */}
          <rect x="120" y="180" width="50" height="110" fill="none" stroke="#00f0ff" strokeWidth="1.5" />
          <rect x="120" y="160" width="80" height="20" fill="#00f0ff" />
          <text x="125" y="174" fill="#030712" fontSize="10" fontWeight="bold" fontFamily="monospace">👤 PERSON 97.1%</text>

          {/* Bounding Box: PERSON */}
          <rect x="490" y="190" width="50" height="100" fill="none" stroke="#00f0ff" strokeWidth="1.5" />
          <rect x="490" y="170" width="80" height="20" fill="#00f0ff" />
          <text x="495" y="184" fill="#030712" fontSize="10" fontWeight="bold" fontFamily="monospace">👤 PERSON 95.8%</text>

          {/* HUD scan overlay */}
          <line x1="30" y1="180" x2="610" y2="180" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="320" y1="30" x2="320" y2="330" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="1" strokeDasharray="5,5" />
        </svg>
      );
    } else if (activeIncident.disaster_type === 'ROAD_ACCIDENT') {
      return (
        <svg viewBox="0 0 640 360" className="w-full h-full bg-[#050014]">
          <rect width="100%" height="100%" fill="#0a0518" />
          {/* Roads lanes */}
          <line x1="100" y1="360" x2="280" y2="0" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
          <line x1="540" y1="360" x2="360" y2="0" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
          <line x1="320" y1="360" x2="320" y2="0" stroke="rgba(255, 255, 255, 0.1)" strokeDasharray="10,10" />

          {/* Crashed Cars */}
          <rect x="260" y="180" width="60" height="40" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2" transform="rotate(25, 290, 200)" />
          <rect x="290" y="160" width="55" height="35" fill="rgba(249, 115, 22, 0.2)" stroke="#f97316" strokeWidth="1.5" transform="rotate(-15, 317, 177)" />

          {/* Bounding Box: ACCIDENT */}
          <rect x="240" y="120" width="150" height="130" fill="none" stroke="#ef4444" strokeWidth="2" />
          <rect x="240" y="95" width="115" height="25" fill="#ef4444" />
          <text x="245" y="112" fill="#fff" fontSize="10" fontWeight="bold" fontFamily="monospace">🚨 ACCIDENT 87.0%</text>

          {/* Bounding Box: VEHICLE */}
          <rect x="80" y="240" width="90" height="70" fill="none" stroke="#10b981" strokeWidth="1.5" />
          <rect x="80" y="220" width="90" height="20" fill="#10b981" />
          <text x="85" y="234" fill="#fff" fontSize="10" fontWeight="bold" fontFamily="monospace">🚗 VEHICLE 98.4%</text>
        </svg>
      );
    } else if (activeIncident.disaster_type === 'INDUSTRIAL_ACCIDENT') {
      return (
        <svg viewBox="0 0 640 360" className="w-full h-full bg-[#050014]">
          <rect width="100%" height="100%" fill="#0a0518" />
          {/* Pressure valve machinery */}
          <circle cx="320" cy="180" r="80" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="6" />
          <line x1="320" y1="100" x2="320" y2="260" stroke="rgba(255,255,255,0.15)" strokeWidth="6" transform="rotate(45, 320, 180)" />

          {/* Chemical leak cloud */}
          <ellipse cx="360" cy="160" rx="90" ry="50" fill="rgba(249, 115, 22, 0.15)" className="animate-pulse" />

          {/* Bounding Box: ANOMALY */}
          <rect x="220" y="80" width="220" height="200" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="6,3" />
          <rect x="220" y="55" width="130" height="25" fill="#f97316" />
          <text x="225" y="72" fill="#fff" fontSize="10" fontWeight="bold" fontFamily="monospace">⚠️ ANOMALY SCORE 87%</text>

          {/* Worker Bounding Box */}
          <rect x="130" y="140" width="50" height="140" fill="none" stroke="#00f0ff" strokeWidth="1.5" />
          <rect x="130" y="120" width="90" height="20" fill="#00f0ff" />
          <text x="135" y="134" fill="#030712" fontSize="9" fontWeight="bold" fontFamily="monospace">👤 WORKER 99.2%</text>
        </svg>
      );
    } else if (activeIncident.disaster_type === 'BUILDING_COLLAPSE') {
      return (
        <svg viewBox="0 0 640 360" className="w-full h-full bg-[#050014]">
          <rect width="100%" height="100%" fill="#0a0518" />
          {/* Satellite Building view */}
          <rect x="120" y="80" width="140" height="100" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" strokeWidth="1.5" />
          <text x="190" y="135" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">G4: INTACT</text>

          {/* Collapsed Building */}
          <path d="M 380 220 L 420 150 L 510 190 L 480 240 Z" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="1.5" />
          <line x1="390" y1="180" x2="490" y2="230" stroke="#ef4444" strokeWidth="1.5" />

          {/* Bounding Box: DAMAGE */}
          <rect x="360" y="130" width="170" height="130" fill="none" stroke="#ef4444" strokeWidth="2" />
          <rect x="360" y="105" width="135" height="25" fill="#ef4444" />
          <text x="365" y="122" fill="#fff" fontSize="10" fontWeight="bold" fontFamily="monospace">🏗️ DESTROYED (G1) 91.5%</text>
        </svg>
      );
    } else {
      // Crowd
      return (
        <svg viewBox="0 0 640 360" className="w-full h-full bg-[#050014]">
          <rect width="100%" height="100%" fill="#0a0518" />
          {/* Heatmap overlay */}
          <circle cx="320" cy="180" r="110" fill="rgba(239,68,68,0.2)" className="animate-pulse" />
          <circle cx="320" cy="180" r="60" fill="rgba(239,68,68,0.3)" />

          {/* Bounding Box: CROWD */}
          <rect x="180" y="60" width="280" height="240" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="8,4" />
          <rect x="180" y="35" width="130" height="25" fill="#ef4444" />
          <text x="185" y="52" fill="#fff" fontSize="10" fontWeight="bold" fontFamily="monospace">🚨 CROWD CRUSH 96.8%</text>
          
          <text x="320" y="185" fill="#fff" fontSize="12" fontWeight="black" textAnchor="middle" fontFamily="monospace">DENSITY: 5.4 PAX/M²</text>
        </svg>
      );
    }
  };

  return (
    <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-65px)]">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-navyLight pb-2">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-100 flex items-center">
            <Eye className="h-5 w-5 text-accentCyan mr-2" />
            LIVE COMPUTER VISION FEED
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">SENSORY RECONNAISSANCE LAYER & BOUNDING BOX ANALYSIS</p>
        </div>
        <div className="text-[10px] text-brandOrange bg-brandOrange/15 border border-brandOrange/30 px-2 py-0.5 rounded font-mono font-bold">
          {mediaTab === 'LIVE' ? 'CV SIMULATOR IN USE' : 'SIMULATION MODE'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Column: Media feed panel (3/4 width) */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Main Feed Container */}
          <div className="relative border border-navyLight/80 rounded bg-black overflow-hidden shadow-cyberCyan">
            {/* Viewport Header Tabs */}
            <div className="bg-navyMedium/90 border-b border-navyLight/70 px-4 py-2 flex items-center justify-between z-10">
              <div className="flex items-center space-x-2 font-mono text-xs">
                <button 
                  onClick={() => setMediaTab('LIVE')}
                  className={`px-3 py-1 rounded transition-colors ${mediaTab === 'LIVE' ? 'bg-accentCyan/25 text-accentCyan border border-accentCyan/50 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <span className="flex items-center space-x-1">
                    <Camera className="h-3.5 w-3.5" />
                    <span>LIVE CAMERA</span>
                  </span>
                </button>
                <button 
                  onClick={() => setMediaTab('VIDEO')}
                  className={`px-3 py-1 rounded transition-colors ${mediaTab === 'VIDEO' ? 'bg-accentCyan/25 text-accentCyan border border-accentCyan/50 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <span className="flex items-center space-x-1">
                    <Video className="h-3.5 w-3.5" />
                    <span>RECORDED VIDEO</span>
                  </span>
                </button>
                <button 
                  onClick={() => setMediaTab('SIMULATION')}
                  className={`px-3 py-1 rounded transition-colors ${mediaTab === 'SIMULATION' ? 'bg-accentCyan/25 text-accentCyan border border-accentCyan/50 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <span className="flex items-center space-x-1">
                    <Play className="h-3.5 w-3.5" />
                    <span>SIMULATOR VIEW</span>
                  </span>
                </button>
              </div>

              <div className="flex items-center space-x-1">
                <span className="h-2 w-2 rounded-full bg-brandGreen animate-pulse"></span>
                <span className="font-mono text-[9px] text-brandGreen font-bold uppercase">{mediaTab} STREAM</span>
              </div>
            </div>

            {/* Media Canvas Body */}
            <div className="aspect-video relative">
              {getMediaContent()}
              
              {/* Scanline grid */}
              <div className="absolute inset-0 pointer-events-none border-b border-accentCyan/5 bg-gradient-to-b from-transparent to-accentCyan/5 animate-scanline" />
              
              {/* Camera metadata HUD overlays */}
              <div className="absolute top-14 left-4 font-mono text-[10px] text-accentCyan bg-navyDark/80 px-2 py-1 rounded border border-accentCyan/20">
                CAM: {activeIncident.source}
              </div>
              
              <div className="absolute top-14 right-4 font-mono text-[10px] text-accentCyan bg-navyDark/80 px-2 py-1 rounded border border-accentCyan/20">
                LOC: {activeIncident.affected_zone}
              </div>

              <div className="absolute bottom-4 left-4 font-mono text-[10px] text-brandRed bg-navyDark/90 px-2 py-1 rounded border border-brandRed/30 flex items-center space-x-1">
                <AlertCircle className="h-3.5 w-3.5 text-brandRed animate-pulse" />
                <span>SIMULATED OPERATIONAL MEDIA FEED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: CV Stats / Selection list (1/4 width) */}
        <div className="lg:col-span-1 space-y-3">
          <div className="bg-navyMedium/60 border border-navyLight/75 p-4 rounded space-y-4 font-mono text-xs">
            <div className="border-b border-navyLight pb-2">
              <span className="font-bold text-slate-300">CV TARGET ANALYSIS</span>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-black">ACTIVE FEED FOR</span>
                <span className="block mt-1 font-bold text-slate-200">{activeIncident.incident_id}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-black">DISASTER TYPE</span>
                <span className="block mt-1 font-bold text-brandOrange uppercase">{activeIncident.disaster_type.replace('_', ' ')}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-black">AFFECTED ZONE</span>
                <span className="block mt-1 text-slate-300">{activeIncident.affected_zone}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-black">INFERENCE STATUS</span>
                <span className="block mt-1 text-brandGreen font-bold animate-pulse">RUNNING IN REALTIME</span>
              </div>
            </div>
          </div>

          <div className="bg-navyMedium/60 border border-navyLight/75 p-4 rounded space-y-3">
            <span className="font-mono text-xs font-bold text-slate-300 block mb-2">CHOOSE FEED DATASET</span>
            <div className="space-y-1">
              {incidents.map((inc) => (
                <button
                  key={inc.incident_id}
                  onClick={() => triggerManualIncident(inc.disaster_type)}
                  className={`w-full text-left font-mono text-[10px] p-2 rounded transition-colors flex items-center justify-between ${
                    inc.incident_id === activeIncidentId 
                      ? 'bg-accentCyan/10 text-accentCyan border border-accentCyan/30 font-bold' 
                      : 'text-slate-400 hover:bg-navyDark'
                  }`}
                >
                  <span className="uppercase">{inc.disaster_type.replace('_', ' ')}</span>
                  <span className="text-[9px] text-slate-500">{inc.incident_id}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
