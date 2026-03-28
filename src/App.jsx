import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import VoiceAI from './pages/VoiceAI';
import Workflows from './pages/Workflows';
import Campaigns from './pages/Campaigns';
import Analytics from './pages/Analytics';
import Languages from './pages/Languages';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';
import Help from './pages/Help';

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <Router>
      <div className="app-layout">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <div className={`main-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <Header onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/voice-ai" element={<VoiceAI />} />
            <Route path="/workflows" element={<Workflows />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/languages" element={<Languages />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
