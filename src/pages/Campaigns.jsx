import { useState } from 'react';
import {
  Calendar,
  Plus,
  Play,
  Pause,
  Clock,
  Users,
  Globe,
  TrendingUp,
  Eye,
  Edit2,
  MoreVertical,
  ChevronRight,
  Target,
  CheckCircle,
  X,
  Phone,
  Zap,
} from 'lucide-react';
import { campaigns } from '../data/mockData';
import './Campaigns.css';

export default function Campaigns() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="page-container">
      {/* Header */}
      <div className="patients-header animate-fade-in">
        <div>
          <h1>Campaign Management</h1>
          <p className="text-muted">
            Schedule and manage automated patient outreach campaigns across languages and segments.
          </p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={() => setShowCreate(true)} id="create-campaign">
            <Plus size={16} /> New Campaign
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-3 gap-lg animate-fade-in delay-1">
        <div className="card stat-card teal">
          <div className="stat-header">
            <div className="stat-icon teal">
              <Target size={22} />
            </div>
          </div>
          <div className="stat-body">
            <span className="stat-value">3</span>
            <span className="stat-label">Active Campaigns</span>
          </div>
        </div>
        <div className="card stat-card indigo">
          <div className="stat-header">
            <div className="stat-icon indigo">
              <Users size={22} />
            </div>
          </div>
          <div className="stat-body">
            <span className="stat-value">6,482</span>
            <span className="stat-label">Total Enrolled</span>
          </div>
        </div>
        <div className="card stat-card cool">
          <div className="stat-header">
            <div className="stat-icon cool">
              <CheckCircle size={22} />
            </div>
          </div>
          <div className="stat-body">
            <span className="stat-value">78%</span>
            <span className="stat-label">Avg. Reach Rate</span>
          </div>
        </div>
      </div>

      {/* Campaign List */}
      <div className="campaign-list animate-fade-in delay-2" style={{ marginTop: '1.5rem' }}>
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="campaign-card card" id={`campaign-${campaign.id}`}>
            <div className="campaign-header">
              <div className="campaign-title-section">
                <div className={`campaign-status-icon ${campaign.status.toLowerCase()}`}>
                  {campaign.status === 'Active' ? (
                    <Play size={16} />
                  ) : campaign.status === 'Scheduled' ? (
                    <Clock size={16} />
                  ) : (
                    <Pause size={16} />
                  )}
                </div>
                <div>
                  <h3>{campaign.name}</h3>
                  <div className="campaign-dates">
                    <Calendar size={12} />
                    <span>{campaign.startDate} → {campaign.endDate}</span>
                  </div>
                </div>
              </div>
              <div className="campaign-header-right">
                <span className={`badge badge-${campaign.status === 'Active' ? 'success' : campaign.status === 'Scheduled' ? 'info' : 'warning'}`}>
                  {campaign.status}
                </span>
                <button className="btn-ghost">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>

            <div className="campaign-body">
              <div className="campaign-progress-section">
                <div className="campaign-progress-header">
                  <span className="text-sm">Progress</span>
                  <span className="campaign-progress-value">{campaign.progress}%</span>
                </div>
                <div className="progress-bar" style={{ height: 8 }}>
                  <div
                    className="progress-fill teal"
                    style={{ width: `${campaign.progress}%` }}
                  />
                </div>
                <div className="campaign-progress-meta">
                  <span>{campaign.reached.toLocaleString()} / {campaign.totalPatients.toLocaleString()} patients reached</span>
                </div>
              </div>

              <div className="campaign-details">
                <div className="campaign-detail">
                  <Users size={14} />
                  <span>{campaign.totalPatients.toLocaleString()} enrolled</span>
                </div>
                <div className="campaign-detail">
                  <Globe size={14} />
                  <span>{campaign.languages.join(', ')}</span>
                </div>
                <div className="campaign-detail">
                  <Phone size={14} />
                  <span>{campaign.reached.toLocaleString()} calls made</span>
                </div>
              </div>
            </div>

            <div className="campaign-footer">
              <div className="campaign-languages">
                {campaign.languages.map((lang) => (
                  <span key={lang} className="badge badge-primary">{lang}</span>
                ))}
              </div>
              <div className="campaign-actions">
                <button className="btn btn-secondary btn-sm">
                  <Eye size={14} /> Details
                </button>
                {campaign.status === 'Active' && (
                  <button className="btn btn-secondary btn-sm">
                    <Pause size={14} /> Pause
                  </button>
                )}
                {campaign.status === 'Scheduled' && (
                  <button className="btn btn-primary btn-sm">
                    <Play size={14} /> Start Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Campaign Modal */}
      {showCreate && (
        <div className="modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} id="create-campaign-modal">
            <div className="modal-header">
              <h2>Create New Campaign</h2>
              <button className="btn-ghost" onClick={() => setShowCreate(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="input-group full-width">
                  <label>Campaign Name</label>
                  <input className="input-field" placeholder="e.g., April Cardiac Outreach" />
                </div>
                <div className="input-group">
                  <label>Start Date</label>
                  <input className="input-field" type="date" />
                </div>
                <div className="input-group">
                  <label>End Date</label>
                  <input className="input-field" type="date" />
                </div>
                <div className="input-group">
                  <label>Target Segment</label>
                  <select className="input-field">
                    <option>All Patients</option>
                    <option>Diabetes</option>
                    <option>Hypertension</option>
                    <option>Post-Surgery</option>
                    <option>Cardiac</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Workflow Template</label>
                  <select className="input-field">
                    <option>Post-Discharge Follow-Up</option>
                    <option>Diabetes Management</option>
                    <option>Appointment Reminder</option>
                    <option>Hypertension Check-in</option>
                  </select>
                </div>
                <div className="input-group full-width">
                  <label>Languages</label>
                  <div className="language-checkboxes">
                    {['Hindi', 'Tamil', 'Bengali', 'Telugu', 'Marathi', 'Urdu', 'Malayalam', 'Gujarati'].map((lang) => (
                      <label key={lang} className="checkbox-label">
                        <input type="checkbox" defaultChecked={['Hindi', 'Tamil'].includes(lang)} />
                        {lang}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setShowCreate(false)}>
                <Zap size={16} /> Launch Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
