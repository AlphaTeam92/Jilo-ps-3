import { useState } from 'react';
import {
  Bell,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  Info,
  X,
  Filter,
  Trash2,
  CheckCheck,
  Clock,
} from 'lucide-react';
import { alerts as initialAlerts } from '../data/mockData';

const allAlerts = [
  ...initialAlerts,
  {
    id: 5, type: 'critical', title: 'System Overload Warning',
    message: 'Voice AI engine CPU usage exceeded 90%. Auto-scaling initiated.',
    time: '4 hours ago', read: false,
  },
  {
    id: 6, type: 'info', title: 'New Language Pack Available',
    message: 'Konkani dialect pack v2.1 is ready for deployment.',
    time: '5 hours ago', read: true,
  },
  {
    id: 7, type: 'warning', title: 'Low Adherence Trend',
    message: 'COPD patient segment shows 12% drop in adherence this week.',
    time: '6 hours ago', read: true,
  },
  {
    id: 8, type: 'success', title: 'Campaign Milestone',
    message: 'March Diabetes Outreach has reached 900 of 1250 target patients.',
    time: '8 hours ago', read: true,
  },
];

const iconMap = {
  critical: <AlertCircle size={18} />,
  warning: <AlertTriangle size={18} />,
  success: <CheckCircle size={18} />,
  info: <Info size={18} />,
};

const colorMap = {
  critical: 'danger',
  warning: 'warning',
  success: 'success',
  info: 'info',
};

export default function Alerts() {
  const [alertList, setAlertList] = useState(allAlerts);
  const [filter, setFilter] = useState('all');

  const filtered = alertList.filter((a) =>
    filter === 'all' ? true : filter === 'unread' ? !a.read : a.type === filter
  );

  const markAllRead = () => {
    setAlertList(alertList.map((a) => ({ ...a, read: true })));
  };

  const dismissAlert = (id) => {
    setAlertList(alertList.filter((a) => a.id !== id));
  };

  return (
    <div className="page-container">
      <div className="patients-header animate-fade-in">
        <div>
          <h1>Alerts & Notifications</h1>
          <p className="text-muted">
            Stay on top of critical patient events, system alerts, and care milestones.
          </p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={markAllRead} id="mark-all-read">
            <CheckCheck size={16} /> Mark All Read
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar card animate-fade-in delay-1">
        <div className="filter-pills">
          <span className="filter-label"><Filter size={14} /> Filter:</span>
          {['all', 'unread', 'critical', 'warning', 'info', 'success'].map((f) => (
            <button
              key={f}
              className={`filter-pill ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Alert List */}
      <div className="alert-list animate-fade-in delay-2">
        {filtered.map((alert) => (
          <div
            key={alert.id}
            className={`alert-card card ${!alert.read ? 'unread' : ''}`}
            id={`alert-${alert.id}`}
          >
            <div className={`alert-card-icon ${colorMap[alert.type]}`}>
              {iconMap[alert.type]}
            </div>
            <div className="alert-card-content">
              <div className="alert-card-top">
                <h4>{alert.title}</h4>
                <div className="alert-card-meta">
                  <span className={`badge badge-${colorMap[alert.type]}`}>{alert.type}</span>
                  <span className="text-xs text-muted">
                    <Clock size={10} /> {alert.time}
                  </span>
                </div>
              </div>
              <p className="text-sm" style={{ color: 'var(--gray-400)', lineHeight: 1.5 }}>
                {alert.message}
              </p>
            </div>
            <button
              className="btn-ghost"
              onClick={() => dismissAlert(alert.id)}
              title="Dismiss"
            >
              <X size={16} />
            </button>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="empty-state">
            <Bell size={48} />
            <h3>No alerts found</h3>
            <p className="text-muted">All caught up! No notifications match your filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
