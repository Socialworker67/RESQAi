import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DemoProvider } from './state/DemoContext';
import { Topbar } from './components/Topbar';
import { Sidebar } from './components/Sidebar';
import { CommandCenter } from './pages/CommandCenter';
import { ActiveIncidents } from './pages/ActiveIncidents';
import { IncidentDetails } from './pages/IncidentDetails';
import { LiveDetection } from './pages/LiveDetection';
import { DisasterScenarios } from './pages/DisasterScenarios';
import { AICommander } from './pages/AICommander';
import { ResponsePlanning } from './pages/ResponsePlanning';
import { EmergencyTeams } from './pages/EmergencyTeams';
import { OperationsMapPage } from './pages/OperationsMapPage';
import { DatasetsModels } from './pages/DatasetsModels';
import { Reports } from './pages/Reports';
import { Analytics } from './pages/Analytics';
import { SettingsPage } from './pages/Settings';

function App() {
  return (
    <DemoProvider>
      <BrowserRouter>
        <div className="flex flex-col h-screen overflow-hidden crt-grid">
          {/* Top operational header bar */}
          <Topbar />
          
          <div className="flex flex-1 overflow-hidden">
            {/* Left navigation sidebar */}
            <Sidebar />
            
            {/* Main content display screen */}
            <main className="flex-1 bg-navyDark flex flex-col overflow-hidden relative">
              <Routes>
                {/* Default landing page is Command Center */}
                <Route path="/" element={<Navigate to="/command-center" replace />} />
                <Route path="/command-center" element={<CommandCenter />} />
                
                {/* Active Incidents feed & details */}
                <Route path="/incidents" element={<ActiveIncidents />} />
                <Route path="/incidents/:id" element={<IncidentDetails />} />
                
                {/* Live CV stream & Bounding boxes */}
                <Route path="/live-detection" element={<LiveDetection />} />
                
                {/* 5 specific scenarios */}
                <Route path="/disaster-scenarios" element={<DisasterScenarios />} />
                
                {/* AI Agent tool logs */}
                <Route path="/ai-commander" element={<AICommander />} />
                
                {/* Response routing paths & active plans */}
                <Route path="/response-planning" element={<ResponsePlanning />} />
                
                {/* Response crews status catalog */}
                <Route path="/teams" element={<EmergencyTeams />} />
                
                {/* Tactical map vectors full screen */}
                <Route path="/map" element={<OperationsMapPage />} />
                
                {/* AI perception layers & references */}
                <Route path="/datasets-models" element={<DatasetsModels />} />
                
                {/* Audit exports JSON/PDF */}
                <Route path="/reports" element={<Reports />} />
                
                {/* Efficiency index charts */}
                <Route path="/analytics" element={<Analytics />} />
                
                {/* Simulation engine overrides & fallbacks */}
                <Route path="/settings" element={<SettingsPage />} />
                
                {/* Catch-all redirect to Command Center */}
                <Route path="*" element={<Navigate to="/command-center" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </DemoProvider>
  );
}

export default App;
