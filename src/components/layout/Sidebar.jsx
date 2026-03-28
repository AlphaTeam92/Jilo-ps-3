import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Phone,
  GitBranch,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Activity,
  Sparkles,
  Globe,
  Calendar,
  Bell,
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard', badge: null },
  { path: '/patients', icon: Users, label: 'Patients', badge: '12.8K' },
  { path: '/voice-ai', icon: Phone, label: 'Voice AI Engine', badge: '234' },
  { path: '/workflows', icon: GitBranch, label: 'Workflow Builder', badge: null },
  { path: '/campaigns', icon: Calendar, label: 'Campaigns', badge: '3' },
  { path: '/analytics', icon: BarChart3, label: 'Analytics', badge: null },
  { path: '/languages', icon: Globe, label: 'Languages', badge: '22' },
  { path: '/alerts', icon: Bell, label: 'Alerts', badge: '2' },
];

const bottomItems = [
  { path: '/settings', icon: Settings, label: 'Settings' },
  { path: '/help', icon: HelpCircle, label: 'Help & Support' },
];

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          <Activity size={24} />
          <div className="logo-pulse" />
        </div>
        {!collapsed && (
          <div className="logo-text">
            <span className="logo-name">JiloCare</span>
            <span className="logo-tag">PS3 Platform</span>
          </div>
        )}
      </div>

      {/* Toggle */}
      <button className="sidebar-toggle" onClick={onToggle} id="sidebar-toggle">
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Nav */}
      <nav className="sidebar-nav">
        <div className="nav-section">
          {!collapsed && <span className="nav-section-label">Main Menu</span>}
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'active' : ''}`
              }
              id={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="nav-icon-wrapper">
                <item.icon size={20} />
                {collapsed && <span className="nav-tooltip">{item.label}</span>}
              </div>
              {!collapsed && (
                <>
                  <span className="nav-label">{item.label}</span>
                  {item.badge && (
                    <span className="nav-badge">{item.badge}</span>
                  )}
                </>
              )}
              {location.pathname === item.path && (
                <div className="nav-active-indicator" />
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Bottom */}
      <div className="sidebar-bottom">
        {bottomItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            <div className="nav-icon-wrapper">
              <item.icon size={20} />
              {collapsed && <span className="nav-tooltip">{item.label}</span>}
            </div>
            {!collapsed && <span className="nav-label">{item.label}</span>}
          </NavLink>
        ))}

        {/* AI Status */}
        {!collapsed && (
          <div className="ai-status-card">
            <div className="ai-status-header">
              <Sparkles size={16} className="ai-sparkle" />
              <span>AI Engine Active</span>
            </div>
            <div className="ai-status-bar">
              <div className="ai-status-fill" style={{ width: '87%' }} />
            </div>
            <span className="ai-status-text">95.2% accuracy • 22 languages</span>
          </div>
        )}
      </div>
    </aside>
  );
}
