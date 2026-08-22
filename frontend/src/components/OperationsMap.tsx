import React from 'react';
import { useDemo } from '../state/DemoContext';
import { Flame, AlertTriangle, Crosshair, Navigation } from 'lucide-react';

export const OperationsMap: React.FC = () => {
  const { incidents, activeIncidentId, isExitBlocked, activePlanVersion } = useDemo();

  // Find currently active incident
  const activeIncident = incidents.find(inc => inc.incident_id === activeIncidentId) || incidents[0];

  const renderFireMap = () => {
    return (
      <svg viewBox="0 0 800 450" className="w-full h-full bg-[#07111F] font-mono select-none">
        {/* Grid lines */}
        <defs>
          <pattern id="gridMap" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(56, 189, 248, 0.05)" strokeWidth="1" />
          </pattern>
          <radialGradient id="fireGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#F97316" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="smokeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#94A3B8" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#gridMap)" />

        {/* Outer boundaries */}
        <rect x="50" y="50" width="700" height="350" fill="none" stroke="rgba(148, 163, 184, 0.16)" strokeWidth="2" />
        
        {/* Building A Structural Outlines */}
        <g stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1.5" fill="none">
          <rect x="150" y="100" width="500" height="220" strokeWidth="2" stroke="rgba(56, 189, 248, 0.4)" />
          <line x1="300" y1="100" x2="300" y2="320" />
          <line x1="480" y1="100" x2="480" y2="320" />
          <line x1="300" y1="210" x2="480" y2="210" />
          <line x1="150" y1="210" x2="250" y2="210" />
          
          <text x="220" y="140" fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="middle">OFFICE SEGMENT A</text>
          <text x="390" y="155" fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="middle">SERVER ROOM</text>
          <text x="390" y="270" fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="middle">STORAGE BLOCK</text>
          <text x="560" y="210" fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="middle">MAIN ENTRANCE LOBBY</text>
        </g>

        {/* Hazard Zone (Pulsing Fire Overlay) */}
        <circle cx="390" cy="180" r="85" fill="url(#smokeGlow)" className="animate-pulse" />
        <circle cx="390" cy="190" r="55" fill="url(#fireGlow)" className="animate-pulse-slow" />
        
        <g transform="translate(378, 175)" className="animate-bounce">
          <Flame className="h-6 w-6 text-brandRed" />
        </g>
        <text x="390" y="225" fill="#EF4444" fontSize="12" fontWeight="bold" textAnchor="middle" className="animate-pulse">FIRE CENTER (COMPROMISED)</text>

        {/* Exits */}
        <g transform="translate(140, 150)">
          <rect x="0" y="0" width="10" height="40" fill={isExitBlocked ? '#EF4444' : '#22C55E'} opacity="0.8" />
          <text x="-45" y="24" fill={isExitBlocked ? '#EF4444' : '#22C55E'} fontSize="10" fontWeight="bold">EXIT B</text>
        </g>

        <g transform="translate(640, 150)">
          <rect x="0" y="0" width="10" height="40" fill="#22C55E" opacity="0.8" />
          <text x="20" y="24" fill="#22C55E" fontSize="10" fontWeight="bold">EXIT C</text>
        </g>

        {/* Assembly Area (Safe Zone) */}
        <g transform="translate(680, 270)">
          <rect x="0" y="0" width="100" height="70" fill="rgba(34, 197, 94, 0.05)" stroke="#22C55E" strokeDasharray="3,3" strokeWidth="1.5" />
          <text x="50" y="30" fill="#22C55E" fontSize="10" textAnchor="middle" fontWeight="bold">SAFE ZONE</text>
          <text x="50" y="45" fill="#22C55E" fontSize="8" textAnchor="middle">ASSEMBLY AREA</text>
        </g>

        {/* Evacuation Routes */}
        {!isExitBlocked && activePlanVersion === 1 && (
          <path 
            d="M 330 250 Q 250 250 150 170" 
            fill="none" 
            stroke="#38BDF8" 
            strokeWidth="3" 
            strokeDasharray="6,4" 
            className="animate-pulse"
          />
        )}

        {isExitBlocked && (
          <path 
            d="M 330 250 Q 250 250 150 170" 
            fill="none" 
            stroke="#EF4444" 
            strokeWidth="2.5" 
            strokeDasharray="4,4" 
            opacity="0.5"
          />
        )}

        {activePlanVersion === 2 && (
          <path 
            d="M 330 250 Q 480 280 645 170" 
            fill="none" 
            stroke="#38BDF8" 
            strokeWidth="3.5" 
            strokeDasharray="8,4" 
            className="animate-pulse"
          />
        )}

        {isExitBlocked && (
          <g transform="translate(130, 155)">
            <circle cx="10" cy="15" r="14" fill="#07111F" stroke="#EF4444" strokeWidth="2.5" />
            <line x1="2" y1="7" x2="18" y2="23" stroke="#EF4444" strokeWidth="2.5" />
            <text x="10" y="40" fill="#EF4444" fontSize="10" fontWeight="bold" textAnchor="middle">BLOCKED</text>
          </g>
        )}

        {/* Teams Markers */}
        <g transform="translate(300, 270)">
          <circle cx="0" cy="0" r="10" fill="#6366F1" className="animate-pulse" />
          <text x="14" y="4" fill="#6366F1" fontSize="10" fontWeight="bold">FIRE_02</text>
        </g>

        {activePlanVersion === 2 && (
          <g transform="translate(680, 170)" className="animate-pulse">
            <circle cx="0" cy="0" r="10" fill="#22C55E" />
            <text x="14" y="4" fill="#22C55E" fontSize="10" fontWeight="bold">MED_01 (STAGING)</text>
          </g>
        )}
        
        {activePlanVersion === 2 ? (
          <g transform="translate(560, 230) rotate(-35)">
            <Navigation className="h-5 w-5 text-accentCyan animate-pulse" />
          </g>
        ) : (
          !isExitBlocked && (
            <g transform="translate(220, 210) rotate(-140)">
              <Navigation className="h-5 w-5 text-accentCyan animate-pulse" />
            </g>
          )
        )}
      </svg>
    );
  };

  const renderRoadMap = () => {
    return (
      <svg viewBox="0 0 800 450" className="w-full h-full bg-[#07111F] font-mono select-none">
        <defs>
          <pattern id="gridRoadMap" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(56, 189, 248, 0.05)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gridRoadMap)" />

        {/* Road Outline (NH-48) */}
        <rect x="50" y="160" width="700" height="120" fill="#0B1626" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="2" />
        <line x1="50" y1="220" x2="750" y2="220" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" strokeDasharray="15,10" />

        {/* Hazard - Accident Junction */}
        <g transform="translate(380, 220)">
          <circle cx="0" cy="0" r="30" fill="rgba(239, 68, 68, 0.2)" className="animate-pulse" />
          <circle cx="0" cy="0" r="12" fill="#EF4444" stroke="#07111F" strokeWidth="2" />
          <AlertTriangle className="h-5 w-5 text-textPrimary -translate-x-2.5 -translate-y-3" />
        </g>
        <text x="380" y="270" fill="#EF4444" fontSize="10" fontWeight="bold" textAnchor="middle">ACCIDENT POINT (LANE 2 & 3 COMPROMISED)</text>

        {/* Vehicles */}
        <rect x="180" y="180" width="25" height="12" fill="#F97316" rx="2" />
        <rect x="220" y="235" width="25" height="12" fill="#CBD5E1" rx="2" />
        <rect x="520" y="180" width="25" height="12" fill="#22C55E" rx="2" />

        {/* Police Blockade */}
        <g transform="translate(300, 160)">
          <line x1="0" y1="0" x2="0" y2="120" stroke="#EF4444" strokeWidth="4" strokeDasharray="8,4" />
          <text x="-10" y="60" fill="#EF4444" fontSize="10" fontWeight="bold" textAnchor="end">DETOUR POINT</text>
        </g>

        {/* Emergency Teams */}
        <g transform="translate(280, 245)">
          <circle cx="0" cy="0" r="8" fill="#6366F1" className="animate-pulse" />
          <text x="10" y="3" fill="#6366F1" fontSize="9" fontWeight="bold">POL_01</text>
        </g>
        <g transform="translate(340, 195)">
          <circle cx="0" cy="0" r="8" fill="#6366F1" className="animate-pulse" />
          <text x="10" y="3" fill="#6366F1" fontSize="9" fontWeight="bold">MED_03</text>
        </g>

        {/* Detour Route */}
        <path d="M 220 235 Q 260 235 280 200 T 320 140 T 450 140 T 520 180" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="5,5" className="animate-pulse" />
      </svg>
    );
  };

  const renderIndustrialMap = () => {
    return (
      <svg viewBox="0 0 800 450" className="w-full h-full bg-[#07111F] font-mono select-none">
        <rect width="100%" height="100%" fill="url(#gridRoadMap)" />
        {/* Industrial layout */}
        <rect x="80" y="60" width="640" height="320" fill="none" stroke="rgba(148, 163, 184, 0.16)" strokeWidth="2" />
        
        {/* Pipelines & Assembly corridors */}
        <g stroke="rgba(255,255,255,0.15)" strokeWidth="3" fill="none">
          <line x1="200" y1="60" x2="200" y2="380" />
          <line x1="550" y1="60" x2="550" y2="380" />
          <line x1="80" y1="220" x2="720" y2="220" />
        </g>

        {/* Valve 4B - Hazard source */}
        <g transform="translate(420, 150)">
          <circle cx="0" cy="0" r="45" fill="rgba(249, 115, 22, 0.15)" className="animate-pulse-slow" />
          <circle cx="0" cy="0" r="25" fill="rgba(249, 115, 22, 0.3)" />
          <circle cx="0" cy="0" r="8" fill="#F97316" />
          <text x="0" y="-32" fill="#F97316" fontSize="10" fontWeight="bold" textAnchor="middle">ANOMALY DETECTED: VALVE 4B</text>
        </g>

        {/* Safe assembly zone */}
        <rect x="600" y="280" width="100" height="80" fill="rgba(34, 197, 94, 0.05)" stroke="#22C55E" strokeWidth="1" strokeDasharray="5,3" />
        <text x="650" y="325" fill="#22C55E" fontSize="9" fontWeight="bold" textAnchor="middle">ASSEMBLY ZONE D</text>

        {/* Teams */}
        <g transform="translate(350, 150)">
          <circle cx="0" cy="0" r="8" fill="#6366F1" className="animate-pulse" />
          <text x="12" y="3" fill="#6366F1" fontSize="9" fontWeight="bold">HAZ_01</text>
        </g>
      </svg>
    );
  };

  const renderCollapseMap = () => {
    return (
      <svg viewBox="0 0 800 450" className="w-full h-full bg-[#07111F] font-mono select-none">
        <rect width="100%" height="100%" fill="url(#gridRoadMap)" />
        <g transform="translate(100, 80)">
          {/* G1 - Destroyed */}
          <rect x="0" y="0" width="140" height="100" fill="rgba(239, 68, 68, 0.2)" stroke="#EF4444" strokeWidth="2" />
          <text x="70" y="45" fill="#EF4444" fontSize="12" fontWeight="bold" textAnchor="middle">G1: DESTROYED</text>
          <text x="70" y="65" fill="#EF4444" fontSize="8" textAnchor="middle">CRITICAL ASSESS</text>

          {/* G2 - Major damage */}
          <rect x="220" y="0" width="140" height="100" fill="rgba(249, 115, 22, 0.15)" stroke="#F97316" strokeWidth="1.5" />
          <text x="290" y="45" fill="#F97316" fontSize="12" fontWeight="bold" textAnchor="middle">G2: MAJOR DAMAGE</text>

          {/* G3 - Minor damage */}
          <rect x="440" y="0" width="140" height="100" fill="rgba(245, 158, 11, 0.1)" stroke="#F59E0B" strokeWidth="1.5" />
          <text x="510" y="45" fill="#F59E0B" fontSize="11" fontWeight="bold" textAnchor="middle">G3: MINOR DAMAGE</text>

          {/* G4 - Intact */}
          <rect x="0" y="180" width="140" height="100" fill="rgba(34, 197, 94, 0.05)" stroke="#22C55E" strokeWidth="1.5" />
          <text x="70" y="225" fill="#22C55E" fontSize="12" fontWeight="bold" textAnchor="middle">G4: INTACT</text>

          {/* Staging & Rescue crane */}
          <rect x="220" y="180" width="360" height="100" fill="rgba(99, 102, 241, 0.05)" stroke="#6366F1" strokeWidth="1" strokeDasharray="5,5" />
          <text x="400" y="225" fill="#6366F1" fontSize="11" fontWeight="bold" textAnchor="middle">STAGING AREA ALPHA</text>
          
          <circle cx="260" cy="240" r="8" fill="#6366F1" className="animate-pulse" />
          <text x="272" y="243" fill="#6366F1" fontSize="9" fontWeight="bold">RESC_04</text>
        </g>
      </svg>
    );
  };

  const renderCrowdMap = () => {
    const isV2 = activePlanVersion === 2;
    
    return (
      <svg viewBox="0 0 800 450" className="w-full h-full bg-[#07111F] font-mono select-none">
        <defs>
          <pattern id="gridCrowdMap" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(56, 189, 248, 0.05)" strokeWidth="1" />
          </pattern>
          <radialGradient id="crowdHotspot" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.6" />
            <stop offset="40%" stopColor="#F97316" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#gridCrowdMap)" />
        
        {/* Stadium perimeter outline */}
        <path d="M 80 80 A 300 220 0 0 1 720 80" fill="none" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="3" />
        
        {/* Gate B bottleneck corridor */}
        <rect x="350" y="190" width="100" height="100" fill="none" stroke={isExitBlocked ? '#EF4444' : 'rgba(56, 189, 248, 0.4)'} strokeWidth="2" />
        <text x="400" y="245" fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="middle">GATE B CHUTE</text>

        {/* Heatmap rings for crowd density */}
        <g transform="translate(400, 160)">
          <circle cx="0" cy="0" r="90" fill="url(#crowdHotspot)" className="animate-pulse" />
          <circle cx="0" cy="0" r="55" fill="rgba(239, 68, 68, 0.35)" className="animate-pulse-slow" />
          <circle cx="0" cy="0" r="30" fill="rgba(239, 68, 68, 0.55)" />
          <text x="0" y="-105" fill="#EF4444" fontSize="11" fontWeight="bold" textAnchor="middle">CRITICAL CONGESTION ZONE (1,284 PAX)</text>
        </g>

        {/* Exit channels Gate C & D */}
        <path d="M 310 160 Q 180 230 180 330" fill="none" stroke={isV2 ? '#22C55E' : '#94A3B8'} strokeWidth={isV2 ? '3.5' : '2'} strokeDasharray={isV2 ? '0' : '6,4'} className={isV2 ? 'animate-pulse' : ''} />
        <path d="M 490 160 Q 620 230 620 330" fill="none" stroke={isV2 ? '#22C55E' : '#94A3B8'} strokeWidth={isV2 ? '3.5' : '2'} strokeDasharray={isV2 ? '0' : '6,4'} className={isV2 ? 'animate-pulse' : ''} />
        <text x="180" y="355" fill={isV2 ? '#22C55E' : '#94A3B8'} fontSize="10" fontWeight="bold" textAnchor="middle">GATE C (DIVERSION STAGE)</text>
        <text x="620" y="355" fill={isV2 ? '#22C55E' : '#94A3B8'} fontSize="10" fontWeight="bold" textAnchor="middle">GATE D (DIVERSION STAGE)</text>

        {/* Flow indicator to Gate B (Plan v1) */}
        {!isExitBlocked && (
          <path d="M 400 160 L 400 280" fill="none" stroke="#38BDF8" strokeWidth="3" strokeDasharray="8,4" className="animate-pulse" />
        )}

        {/* Gate B Congested Overlay */}
        {isExitBlocked && (
          <g transform="translate(375, 205)">
            <circle cx="25" cy="25" r="22" fill="#07111F" stroke="#EF4444" strokeWidth="3" />
            <line x1="12" y1="12" x2="38" y2="38" stroke="#EF4444" strokeWidth="3.5" />
            <text x="25" y="60" fill="#EF4444" fontSize="10" fontWeight="black" textAnchor="middle" className="animate-pulse">CONGESTED</text>
          </g>
        )}

        {/* Police Team 02 (Deployed to Gate B) */}
        <g transform="translate(325, 230)">
          <circle cx="0" cy="0" r="9" fill="#6366F1" className="animate-pulse" />
          <text x="-15" y="-12" fill="#6366F1" fontSize="9" fontWeight="bold">POL_02</text>
        </g>

        {/* Rescue Team 01 (Assigned in v2) */}
        {isV2 && (
          <g transform="translate(475, 230)">
            <circle cx="0" cy="0" r="9" fill="#6366F1" className="animate-pulse" />
            <text x="15" y="-12" fill="#6366F1" fontSize="9" fontWeight="bold">RESC_01</text>
          </g>
        )}

        {/* Medical Team 01 (Staging at Gate C on plan v2) */}
        {isV2 && (
          <g transform="translate(180, 310)" className="animate-pulse">
            <circle cx="0" cy="0" r="10" fill="#22C55E" />
            <text x="16" y="4" fill="#22C55E" fontSize="9" fontWeight="bold">MED_01 (STAGING)</text>
          </g>
        )}

        {/* Redirection arrows */}
        {isV2 && (
          <>
            <g transform="translate(230, 220) rotate(-130)">
              <Navigation className="h-4.5 w-4.5 text-accentCyan animate-pulse" />
            </g>
            <g transform="translate(570, 220) rotate(130)">
              <Navigation className="h-4.5 w-4.5 text-accentCyan animate-pulse" />
            </g>
          </>
        )}
      </svg>
    );
  };

  const getMapContent = () => {
    switch (activeIncident.disaster_type) {
      case 'FIRE':
        return renderFireMap();
      case 'ROAD_ACCIDENT':
        return renderRoadMap();
      case 'INDUSTRIAL_ACCIDENT':
        return renderIndustrialMap();
      case 'BUILDING_COLLAPSE':
        return renderCollapseMap();
      case 'CROWD':
        return renderCrowdMap();
      default:
        return renderFireMap();
    }
  };

  return (
    <div className="relative w-full h-[400px] border border-borderMuted rounded-xl bg-navyDark/90 overflow-hidden flex flex-col justify-between">
      {/* Map Header Toolbar */}
      <div className="bg-navyMedium/90 border-b border-borderMuted px-4 py-2.5 flex items-center justify-between z-10">
        <div className="flex items-center space-x-2">
          <Crosshair className="h-4 w-4 text-accentCyan animate-spin-slow" />
          <span className="font-mono text-[10px] tracking-wider font-bold text-textSecondary uppercase">TACTICAL SCHEMATIC MAP: {activeIncident.affected_zone}</span>
        </div>
        <div className="font-mono text-[9px] bg-accentCyan/10 border border-accentCyan/30 text-accentCyan px-2 py-0.5 rounded font-black">
          RENDER: VECTOR_SVG | FPS: 60
        </div>
      </div>

      {/* Map Body */}
      <div className="flex-1 relative">
        {getMapContent()}
        
        {/* Map grid scan overlay */}
        <div className="absolute inset-0 pointer-events-none border-b border-accentCyan/5 bg-gradient-to-b from-transparent to-accentCyan/5 animate-scanline" />
      </div>

      {/* Map Legend */}
      <div className="bg-navyMedium/90 border-t border-borderMuted px-4 py-2 text-[9px] font-mono grid grid-cols-3 md:grid-cols-6 gap-2 text-textMuted select-none">
        <div className="flex items-center space-x-1.5">
          <span className="h-2 w-2 rounded-full bg-brandRed"></span>
          <span>Critical Congestion</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="h-2 w-2 rounded-full bg-brandOrange"></span>
          <span>High Risk Zone</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="h-2 w-2 rounded-full bg-brandAmber"></span>
          <span>Warning / Bottleneck</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="h-2 w-2 rounded-full bg-brandGreen"></span>
          <span>Staging / Safe Exit</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="h-2 w-2 rounded-full bg-brandBlue"></span>
          <span>Assigned Team</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="h-2.5 w-4 border-b-2 border-dashed border-accentCyan"></span>
          <span>Evacuation Route</span>
        </div>
      </div>
    </div>
  );
};
export default OperationsMap;
