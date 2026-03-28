import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Search,
  Bell,
  Moon,
  Sun,
  Menu,
  ChevronDown,
  User,
  LogOut,
  Settings,
  X,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { alerts } from '../../data/mockData';
import './Header.css';

const pageTitles = {
  '/': 'Dashboard',
  '/patients': 'Patient Management',
  '/voice-ai': 'Voice AI Engine',
  '/workflows': 'Workflow Builder',
  '/campaigns': 'Campaigns',
  '/analytics': 'Analytics & Reports',
  '/languages': 'Language Center',
  '/alerts': 'Alerts & Notifications',
  '/settings': 'Settings',
  '/help': 'Help & Support',
};

export default function Header({ onMenuToggle }) {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const pageTitle = pageTitles[location.pathname] || 'Dashboard';
  const unreadCount = alerts.filter(a => !a.read).length;

  useEffect(() => {
    const handleClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical': return <AlertCircle size={16} className="alert-icon critical" />;
      case 'warning': return <AlertTriangle size={16} className="alert-icon warning" />;
      case 'success': return <CheckCircle size={16} className="alert-icon success" />;
      default: return <Info size={16} className="alert-icon info" />;
    }
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <button className="mobile-menu-btn" onClick={onMenuToggle} id="mobile-menu-toggle">
          <Menu size={22} />
        </button>
        <div className="page-title-section">
          <h1 className="page-title">{pageTitle}</h1>
          <span className="page-breadcrumb">Home / {pageTitle}</span>
        </div>
      </div>

      <div className="header-right">
        {/* Search */}
        <div className="header-search" id="global-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search patients, calls, workflows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <kbd className="search-shortcut">⌘K</kbd>
        </div>

        {/* Notifications */}
        <div className="header-dropdown" ref={notifRef}>
          <button
            className="header-icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            id="notification-bell"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="notification-dot">{unreadCount}</span>
            )}
          </button>

          {showNotifications && (
            <div className="dropdown-panel notifications-panel" id="notifications-dropdown">
              <div className="dropdown-header">
                <h3>Notifications</h3>
                <button className="text-sm" style={{ color: 'var(--primary-400)' }}>
                  Mark all read
                </button>
              </div>
              <div className="dropdown-body">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`notification-item ${!alert.read ? 'unread' : ''}`}
                  >
                    {getAlertIcon(alert.type)}
                    <div className="notification-content">
                      <strong>{alert.title}</strong>
                      <p>{alert.message}</p>
                      <span className="notification-time">{alert.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="dropdown-footer">
                <button>View All Notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="header-dropdown" ref={profileRef}>
          <button
            className="profile-btn"
            onClick={() => setShowProfile(!showProfile)}
            id="profile-menu"
          >
            <div className="profile-avatar">
              <span>DR</span>
            </div>
            {/* This span is intentionally hidden at small sizes */}
            <span className="profile-name">Dr. Rohit</span>
            <ChevronDown size={14} />
          </button>

          {showProfile && (
            <div className="dropdown-panel profile-panel" id="profile-dropdown">
              <div className="profile-info">
                <div className="profile-avatar-lg">
                  <span>DR</span>
                </div>
                <div>
                  <strong>Dr. Rohit Agarwal</strong>
                  <p className="text-sm text-muted">Chief Medical Officer</p>
                </div>
              </div>
              <div className="dropdown-divider" />
              <button className="dropdown-item">
                <User size={16} /> My Profile
              </button>
              <button className="dropdown-item">
                <Settings size={16} /> Settings
              </button>
              <div className="dropdown-divider" />
              <button className="dropdown-item danger">
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
