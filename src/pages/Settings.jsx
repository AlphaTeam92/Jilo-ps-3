import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Globe,
  Database,
  Key,
  Palette,
  Monitor,
  Save,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import { useState } from 'react';

export default function Settings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);
  const [autoEscalate, setAutoEscalate] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const Toggle = ({ value, onChange }) => (
    <button
      className={`settings-toggle ${value ? 'active' : ''}`}
      onClick={() => onChange(!value)}
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        background: value ? 'var(--primary-500)' : 'var(--gray-600)',
        position: 'relative',
        transition: 'all 0.2s',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 3,
          left: value ? 23 : 3,
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: '#fff',
          transition: 'left 0.2s',
        }}
      />
    </button>
  );

  return (
    <div className="page-container">
      <div className="patients-header animate-fade-in">
        <div>
          <h1>Settings</h1>
          <p className="text-muted">Configure platform preferences, integrations, and security.</p>
        </div>
        <button className="btn btn-primary" id="save-settings">
          <Save size={16} /> Save Changes
        </button>
      </div>

      <div className="grid grid-2 gap-lg" style={{ marginTop: '1rem' }}>
        {/* Profile */}
        <div className="card animate-fade-in delay-1">
          <div className="card-header">
            <h3><User size={18} style={{ verticalAlign: 'middle', marginRight: 8 }} /> Profile</h3>
          </div>
          <div className="form-grid" style={{ marginTop: '0.5rem' }}>
            <div className="input-group">
              <label>Full Name</label>
              <input className="input-field" defaultValue="Dr. Rohit Agarwal" />
            </div>
            <div className="input-group">
              <label>Role</label>
              <input className="input-field" defaultValue="Chief Medical Officer" disabled />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input className="input-field" defaultValue="rohit@jilocare.com" />
            </div>
            <div className="input-group">
              <label>Phone</label>
              <input className="input-field" defaultValue="+91 98765 00000" />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card animate-fade-in delay-2">
          <div className="card-header">
            <h3><Bell size={18} style={{ verticalAlign: 'middle', marginRight: 8 }} /> Notifications</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
            {[
              { label: 'Email Notifications', desc: 'Receive alerts via email', value: emailNotif, set: setEmailNotif },
              { label: 'SMS Notifications', desc: 'Receive critical alerts via SMS', value: smsNotif, set: setSmsNotif },
              { label: 'Auto-Escalation', desc: 'Automatically escalate high-risk cases', value: autoEscalate, set: setAutoEscalate },
              { label: 'Dark Mode', desc: 'Use dark theme for the interface', value: darkMode, set: setDarkMode },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                <div>
                  <strong style={{ fontSize: '0.875rem', color: '#fff', display: 'block' }}>{item.label}</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>{item.desc}</span>
                </div>
                <Toggle value={item.value} onChange={item.set} />
              </div>
            ))}
          </div>
        </div>

        {/* Supabase Config */}
        <div className="card animate-fade-in delay-3">
          <div className="card-header">
            <h3><Database size={18} style={{ verticalAlign: 'middle', marginRight: 8 }} /> Supabase Configuration</h3>
          </div>
          <div className="form-grid" style={{ marginTop: '0.5rem' }}>
            <div className="input-group full-width">
              <label>Supabase URL</label>
              <input className="input-field" placeholder="https://xxxxx.supabase.co" />
            </div>
            <div className="input-group full-width">
              <label>Anon Key</label>
              <input className="input-field" type="password" placeholder="Your anon key" />
            </div>
          </div>
          <p className="text-xs text-muted" style={{ marginTop: '0.5rem' }}>
            Configure your Supabase PostgreSQL connection for data storage and authentication.
          </p>
        </div>

        {/* Security */}
        <div className="card animate-fade-in delay-4">
          <div className="card-header">
            <h3><Shield size={18} style={{ verticalAlign: 'middle', marginRight: 8 }} /> Security</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
            <button className="btn btn-secondary w-full">
              <Key size={16} /> Change Password
            </button>
            <button className="btn btn-secondary w-full">
              <Shield size={16} /> Enable Two-Factor Auth
            </button>
            <button className="btn btn-secondary w-full">
              <Monitor size={16} /> Active Sessions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
