import { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Activity,
  HeartPulse,
  Heart,
  Droplets,
  Scale,
  X,
  User,
  Phone,
  Clock,
  MessageCircle,
  Thermometer,
  Wind,
  Coffee,
  Moon,
  TrendingDown,
} from 'lucide-react';
import { patients } from '../data/mockData';
import './Patients.css';

const getRiskColor = (risk) => {
  switch(risk) {
    case 'High': return 'danger';
    case 'Moderate': return 'warning';
    case 'Low': return 'success';
    default: return 'info';
  }
};

export default function Patients() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterRisk, setFilterRisk] = useState('All');

  const filteredPatients = patients.filter(
    (p) => filterRisk === 'All' || p.overall_risk === filterRisk
  );

  return (
    <div className="page-container" style={{ display: 'flex', gap: '1.5rem', height: '100%' }}>
      {/* Main Content Area */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div className="patients-header animate-fade-in">
          <div>
            <h1>Patient Directory</h1>
            <p className="text-muted">Comprehensive clinical records and risk assessments.</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-primary" onClick={() => setShowAddModal(true)} id="add-patient">
              <Plus size={16} /> Add Patient
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="toolbar animate-fade-in delay-1">
          <div className="search-bar" style={{ width: 300 }}>
            <Search size={18} />
            <input type="text" placeholder="Search by name or clinic..." />
          </div>

          <div className="filters-group">
            <div className="filter-select">
              <Filter size={16} />
              <select 
                value={filterRisk} 
                onChange={(e) => setFilterRisk(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none' }}
              >
                <option value="All">All Overall Risks</option>
                <option value="Low">Low Risk</option>
                <option value="Moderate">Moderate Risk</option>
                <option value="High">High Risk</option>
              </select>
            </div>
            <button className="btn btn-secondary btn-sm">
              More Filters
            </button>
          </div>
        </div>

        {/* Grid View */}
        <div className="patients-grid animate-fade-in delay-2" style={{ marginTop: '1.5rem' }}>
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              className="patient-card card"
              onClick={() => setSelectedPatient(patient)}
              style={{ cursor: 'pointer' }}
              id={`patient-card-${patient.id}`}
            >
              <div className="patient-card-header">
                <div className="patient-info">
                  <div className="avatar" style={{ background: patient.color, color: '#fff' }}>
                    {patient.avatar}
                  </div>
                  <div>
                    <h3>{patient.name}</h3>
                    <p className="text-sm text-muted">{patient.age} yrs • {patient.health_center}</p>
                  </div>
                </div>
                <button
                  className="btn-ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <MoreVertical size={18} />
                </button>
              </div>

              <div className="patient-vitals">
                <div className="vital-metric">
                  <HeartPulse size={14} className="text-muted" />
                  <span>{patient.systolic_bp}/{patient.diastolic_bp} BP</span>
                </div>
                <div className="vital-metric">
                  <Activity size={14} className="text-muted" />
                  <span>{patient.heart_rate} bpm</span>
                </div>
                <div className="vital-metric">
                  <Droplets size={14} className="text-muted" />
                  <span>{patient.blood_gluc} mg/dL</span>
                </div>
                <div className="vital-metric">
                  <Scale size={14} className="text-muted" />
                  <span>BMI: {patient.bmi}</span>
                </div>
              </div>

              <div className="patient-card-footer">
                <div className="patient-risks">
                  <span className={`badge badge-${getRiskColor(patient.heart_risk)}`} title="Heart Risk">
                    <Heart size={10} style={{ marginRight: 4 }} /> {patient.heart_risk}
                  </span>
                  <span className={`badge badge-${getRiskColor(patient.overall_risk)}`} title="Overall Risk">
                    Overall {patient.overall_risk}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide-out Detail Drawer */}
      <div className={`patient-drawer ${selectedPatient ? 'open' : ''}`}>
        {selectedPatient && (
          <div className="drawer-content">
            <div className="drawer-header">
              <div className="drawer-header-info">
                <div className="avatar avatar-lg" style={{ background: selectedPatient.color, color: '#fff' }}>
                  {selectedPatient.avatar}
                </div>
                <div>
                  <h2>{selectedPatient.name}</h2>
                  <p className="text-muted">{selectedPatient.age} yrs • {selectedPatient.health_center}</p>
                </div>
              </div>
              <button className="btn-ghost" onClick={() => setSelectedPatient(null)} id="close-drawer">
                <X size={20} />
              </button>
            </div>

            <div className="drawer-body">
              {/* Risk Profile Section */}
              <div className="drawer-section">
                <h3>Risk Profile</h3>
                <div className="grid grid-2 gap-sm" style={{ marginTop: '0.5rem' }}>
                  <div className={`card stat-card ${getRiskColor(selectedPatient.overall_risk)}`} style={{ padding: '1rem' }}>
                    <span className="text-xs text-muted">Overall Risk</span>
                    <strong style={{ display: 'block', fontSize: '1.25rem', marginTop: 4 }}>{selectedPatient.overall_risk}</strong>
                  </div>
                  <div className={`card stat-card ${getRiskColor(selectedPatient.heart_risk)}`} style={{ padding: '1rem' }}>
                    <span className="text-xs text-muted">Heart Risk</span>
                    <strong style={{ display: 'block', fontSize: '1.25rem', marginTop: 4 }}>{selectedPatient.heart_risk}</strong>
                  </div>
                  <div className={`card stat-card ${getRiskColor(selectedPatient.diabetic_risk)}`} style={{ padding: '1rem' }}>
                    <span className="text-xs text-muted">Diabetic Risk</span>
                    <strong style={{ display: 'block', fontSize: '1.25rem', marginTop: 4 }}>{selectedPatient.diabetic_risk}</strong>
                  </div>
                  <div className={`card stat-card ${getRiskColor(selectedPatient.hypertension_risk)}`} style={{ padding: '1rem' }}>
                    <span className="text-xs text-muted">Hypertension</span>
                    <strong style={{ display: 'block', fontSize: '1.25rem', marginTop: 4 }}>{selectedPatient.hypertension_risk}</strong>
                  </div>
                </div>
              </div>

              {/* Clinical Vitals Section */}
              <div className="drawer-section border-top">
                <h3>Clinical Vitals</h3>
                <div className="timeline" style={{ marginTop: '1rem' }}>
                  <div className="timeline-item">
                    <HeartPulse size={16} className="timeline-icon" style={{ background: 'rgba(255,107,107,0.1)', color: '#ff6b6b' }} />
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <strong>Blood Pressure</strong>
                        <span className="text-muted">{selectedPatient.systolic_bp} / {selectedPatient.diastolic_bp} mmHg</span>
                      </div>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <Activity size={16} className="timeline-icon" style={{ background: 'rgba(32,201,151,0.1)', color: '#20c997' }} />
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <strong>Heart Rate & SpO2</strong>
                        <span className="text-muted">{selectedPatient.heart_rate} bpm • {selectedPatient.oxygen_sat}% O2</span>
                      </div>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <Droplets size={16} className="timeline-icon" style={{ background: 'rgba(116,192,252,0.1)', color: '#74c0fc' }} />
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <strong>Blood Glucose</strong>
                        <span className="text-muted">{selectedPatient.blood_gluc} mg/dL</span>
                      </div>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <Thermometer size={16} className="timeline-icon" style={{ background: 'rgba(252,196,25,0.1)', color: '#fcc419' }} />
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <strong>Temperature & Resp Rate</strong>
                        <span className="text-muted">{selectedPatient.temperature}°F • {selectedPatient.respiratory_rate} breaths/min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Symptoms & Lifestyle Section */}
              <div className="drawer-section border-top">
                <h3>Symptoms & Lifestyle</h3>
                <div className="metrics-list" style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div className="metric-row">
                    <span className="text-sm text-muted">Chest Discomfort</span>
                    <strong className="text-sm" style={{textTransform:'capitalize'}}>{selectedPatient.chest_discomfort}</strong>
                  </div>
                  <div className="metric-row">
                    <span className="text-sm text-muted">Breathlessness</span>
                    <strong className="text-sm" style={{textTransform:'capitalize'}}>{selectedPatient.breathlessness}</strong>
                  </div>
                  <div className="metric-row">
                    <span className="text-sm text-muted">Fatigue</span>
                    <strong className="text-sm" style={{textTransform:'capitalize'}}>{selectedPatient.fatigue}</strong>
                  </div>
                  <div className="metric-row" style={{ marginTop: 8, paddingTop: 8, borderTop: '1px dashed rgba(255,255,255,0.1)'}}>
                    <span className="text-sm text-muted"><Coffee size={14} style={{verticalAlign:'middle', marginRight:4}} /> Stress Level</span>
                    <strong className="text-sm" style={{textTransform:'capitalize'}}>{selectedPatient.stress_level}</strong>
                  </div>
                  <div className="metric-row">
                    <span className="text-sm text-muted"><Moon size={14} style={{verticalAlign:'middle', marginRight:4}} /> Sleep Duration</span>
                    <strong className="text-sm">{selectedPatient.sleep_duration} hrs</strong>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="drawer-footer">
              <button className="btn btn-secondary" style={{ flex: 1 }}>Update Vitals</button>
              <button className="btn btn-primary" style={{ flex: 1 }}>Schedule Assessment</button>
            </div>
          </div>
        )}
      </div>

      {/* Add Patient Modal (Stub) */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem' }}>
            <h2>New Patient Clinical Entry</h2>
            <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Enter patient vitals and health history.</p>
            <div className="form-grid">
              <div className="input-group full-width"><label>Full Name</label><input className="input-field" /></div>
              <div className="input-group"><label>Age</label><input className="input-field" type="number" /></div>
              <div className="input-group"><label>Systolic BP</label><input className="input-field" type="number" /></div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setShowAddModal(false)}>Save Patient</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
