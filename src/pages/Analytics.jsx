import { useState } from 'react';
import {
  Download,
  Users,
  HeartPulse,
  Activity,
  ArrowUpRight,
  RefreshCw,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
} from 'recharts';
import { patients, healthCenterStats, riskDistribution, bmiDistribution } from '../data/mockData';
import './Analytics.css';

const radarData = [
  { metric: 'Avg Heart Risk', value: 72 },
  { metric: 'Avg Diabetic Risk', value: 65 },
  { metric: 'Avg Hypertension', value: 80 },
  { metric: 'Obesity Prevalence', value: 45 },
  { metric: 'Avg Stress Level', value: 68 },
  { metric: 'Poor Diet Quality', value: 55 },
];

const bloodPressureTrend = patients.map((p) => ({
  name: p.name.split(' ')[0], // First name
  systolic: p.systolic_bp,
  diastolic: p.diastolic_bp,
}));

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color }}>
          {entry.name}: <strong>{entry.value}</strong>
        </p>
      ))}
    </div>
  );
};

export default function Analytics() {
  const [dateRange, setDateRange] = useState('6m');

  return (
    <div className="page-container">
      {/* Header */}
      <div className="patients-header animate-fade-in">
        <div>
          <h1>Clinical Analytics & Reports</h1>
          <p className="text-muted">
            Population health metrics, risk stratifications, and clinical trends.
          </p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary" id="export-report">
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      {/* High-level metrics based on clinical data */}
      <div className="grid grid-3 gap-lg animate-fade-in delay-1" style={{ marginTop: '1.5rem' }}>
        {[
          { label: 'Total High Risk', value: '3', change: '+2', type: 'negative', icon: HeartPulse, color: 'warm' },
          { label: 'Average BMI', value: '27.7', change: '+0.4', type: 'negative', icon: Users, color: 'indigo' },
          { label: 'Active Screenings', value: '8', change: '100%', type: 'positive', icon: Activity, color: 'teal' },
        ].map((metric, i) => (
          <div key={i} className={`card stat-card ${metric.color}`}>
            <div className="stat-header">
              <div className={`stat-icon ${metric.color}`}>
                <metric.icon size={22} />
              </div>
            </div>
            <div className="stat-body">
              <span className="stat-value">{metric.value}</span>
              <span className="stat-label">{metric.label}</span>
            </div>
            <div className={`stat-change ${metric.type}`}>
              <ArrowUpRight size={14} />
              <span>{metric.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="dashboard-grid" style={{ marginTop: '1.5rem' }}>
        {/* Quality/Risk Radar */}
        <div className="card animate-fade-in delay-2">
          <div className="card-header">
            <div>
              <h3>Population Risk Profile</h3>
              <p className="text-sm text-muted">Multi-dimensional view of average risks</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
              <PolarGrid stroke="rgba(255,255,255,0.08)" />
              <PolarAngleAxis dataKey="metric" stroke="#868e96" fontSize={11} />
              <PolarRadiusAxis domain={[0, 100]} stroke="rgba(255,255,255,0.05)" fontSize={10} />
              <Radar
                name="Risk Score"
                dataKey="value"
                stroke="#ff6b6b"
                fill="#ff6b6b"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Health Center Distribution */}
        <div className="card animate-fade-in delay-3">
          <div className="card-header">
            <div>
              <h3>Health Center Analysis</h3>
              <p className="text-sm text-muted">Patient volume and risk distribution by center</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={healthCenterStats} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#868e96" fontSize={11} />
              <YAxis yAxisId="left" stroke="#868e96" fontSize={12} />
              <YAxis yAxisId="right" orientation="right" stroke="#868e96" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36}/>
              <Bar yAxisId="left" dataKey="patients" fill="#5c7cfa" radius={[4, 4, 0, 0]} name="Total Patients" />
              <Bar yAxisId="left" dataKey="highRisk" fill="#ff6b6b" radius={[4, 4, 0, 0]} name="High Risk Count" />
              <Line yAxisId="right" type="monotone" dataKey="avgBMI" stroke="#20c997" name="Avg BMI" strokeWidth={3} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Blood Pressure Trend across Patients */}
      <div className="card animate-fade-in delay-1" style={{ marginTop: '1.5rem' }}>
        <div className="card-header">
          <div>
            <h3>Systolic vs Diastolic BP Scatter</h3>
            <p className="text-sm text-muted">Patient cohort blood pressure readings</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={bloodPressureTrend} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="name" stroke="#868e96" fontSize={12} />
            <YAxis stroke="#868e96" fontSize={12} domain={[60, 180]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="step" dataKey="systolic" stroke="#fcc419" strokeWidth={3} dot={{ r: 4 }} name="Systolic BP" />
            <Line type="step" dataKey="diastolic" stroke="#5c7cfa" strokeWidth={3} dot={{ r: 4 }} name="Diastolic BP" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Population Health Table */}
      <div className="card animate-fade-in" style={{ marginTop: '1.5rem' }}>
        <div className="card-header">
          <div>
            <h3>Detailed Clinical Roster</h3>
            <p className="text-sm text-muted">Comprehensive patient details and clinical markers</p>
          </div>
          <button className="btn btn-secondary btn-sm">
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Health Center</th>
                <th>Heart Rate (bpm)</th>
                <th>SpO2 (%)</th>
                <th>BMI</th>
                <th>Overall Risk</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((row) => (
                <tr key={row.id}>
                  <td>
                    <strong style={{ color: '#fff' }}>{row.name}</strong>
                  </td>
                  <td>{row.health_center}</td>
                  <td>
                    <div className="adherence-cell">
                      <span>{row.heart_rate}</span>
                      <div className="progress-bar" style={{ width: 60 }}>
                        <div
                          className={`progress-fill ${row.heart_rate > 100 ? 'warm' : 'teal'}`}
                          style={{ width: `${Math.min((row.heart_rate / 150) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td>{row.oxygen_sat}%</td>
                  <td>{row.bmi} ({row.bmi_categ})</td>
                  <td>
                    <span className={`badge badge-${row.overall_risk === 'High' ? 'danger' : row.overall_risk === 'Moderate' ? 'warning' : 'success'}`}>
                      {row.overall_risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
