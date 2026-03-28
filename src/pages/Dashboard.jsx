import { useState } from 'react';
import {
  Users,
  HeartPulse,
  Activity,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  MoreHorizontal,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  patients,
  dashboardClinicalStats,
  riskDistribution,
  bmiDistribution,
  alerts,
} from '../data/mockData';
import './Dashboard.css';

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

export default function Dashboard() {
  const statCards = [
    { id: 1, label: 'Total Patients', value: dashboardClinicalStats.totalPatients, change: '+12%', type: 'positive', icon: Users, color: 'teal' },
    { id: 2, label: 'High Risk Patients', value: dashboardClinicalStats.highRiskCount, change: '+2', type: 'negative', icon: AlertTriangle, color: 'warm' },
    { id: 3, label: 'Average BMI', value: dashboardClinicalStats.avgBMI, change: '+0.4', type: 'negative', icon: Activity, color: 'indigo' },
    { id: 4, label: 'Avg Heart Rate', value: dashboardClinicalStats.avgHeartRate, change: 'Stable', type: 'positive', icon: HeartPulse, color: 'cool' },
  ];

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'High': return 'danger';
      case 'Moderate': return 'warning';
      case 'Low': return 'success';
      default: return 'info';
    }
  };

  return (
    <div className="page-container">
      {/* Welcome Banner */}
      <div className="welcome-banner animate-fade-in">
        <div className="welcome-content">
          <div className="welcome-text">
            <h1>Patient Risk Dashboard</h1>
            <p>Comprehensive clinical overview and risk prediction metrics.</p>
          </div>
          <div className="welcome-stats">
            <div className="live-indicator">
              <ShieldAlert size={14} />
              <span>Avg Overall Risk: {dashboardClinicalStats.avgOverallRisk}</span>
            </div>
            <div className="live-indicator" style={{ borderColor: 'rgba(252, 196, 25, 0.4)' }}>
              <Activity size={14} color="var(--warning)" />
              <span>Avg BP: {dashboardClinicalStats.avgBP}</span>
            </div>
          </div>
        </div>
        <div className="welcome-decoration">
          <div className="deco-circle deco-1" />
          <div className="deco-circle deco-2" />
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-4 gap-lg" style={{ marginTop: '1.5rem' }}>
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className={`card stat-card ${stat.color} animate-fade-in delay-${index + 1}`}>
              <div className="stat-header">
                <div className={`stat-icon ${stat.color}`}>
                  <Icon size={22} />
                </div>
                <button className="btn-ghost">
                  <MoreHorizontal size={18} />
                </button>
              </div>
              <div className="stat-body">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
              <div className={`stat-change ${stat.type}`}>
                {stat.type === 'positive' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                <span>{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="dashboard-grid" style={{ marginTop: '1.5rem' }}>
        {/* Risk Distribution Pie Chart */}
        <div className="card chart-card animate-fade-in delay-1">
          <div className="card-header">
            <div>
              <h3>Overall Risk Distribution</h3>
              <p className="text-sm text-muted">Population health stratification</p>
            </div>
          </div>
          <div className="chart-container pie-container">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend">
              {riskDistribution.map((risk) => (
                <div key={risk.name} className="legend-item">
                  <span className="legend-dot" style={{ background: risk.color }} />
                  <span className="legend-label">{risk.name}</span>
                  <span className="legend-value">{risk.value} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BMI Categories Area Chart */}
        <div className="card chart-card animate-fade-in delay-2">
          <div className="card-header">
            <div>
              <h3>BMI Categories</h3>
              <p className="text-sm text-muted">Patient distribution across weight classes</p>
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={bmiDistribution}>
                <defs>
                  <linearGradient id="bmiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5c7cfa" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#5c7cfa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="category" stroke="#868e96" fontSize={12} />
                <YAxis stroke="#868e96" fontSize={12} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#5c7cfa"
                  fill="url(#bmiGradient)"
                  strokeWidth={3}
                  name="Patients"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Patients Table */}
      <div className="card animate-fade-in delay-3" style={{ marginTop: '1.5rem' }}>
        <div className="card-header">
          <div>
            <h3>Patient Health Roster</h3>
            <p className="text-sm text-muted">Clinical records and assessed risk factors</p>
          </div>
          <button className="btn btn-secondary btn-sm">View Full Roster</button>
        </div>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Vitals (BP/HR)</th>
                <th>Gluc / SpO2</th>
                <th>BMI Snapshot</th>
                <th>Heart Risk</th>
                <th>Overall Risk</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.slice(0, 5).map((patient) => (
                <tr key={patient.id}>
                  <td>
                    <div className="patient-cell">
                      <div className="avatar" style={{ background: patient.color, color: '#fff' }}>
                        {patient.avatar}
                      </div>
                      <div>
                        <strong>{patient.name}</strong>
                        <span className="text-xs text-muted">{patient.age} yrs • {patient.health_center}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <strong>{patient.systolic_bp}/{patient.diastolic_bp}</strong>
                      <span className="text-xs text-muted">{patient.heart_rate} bpm</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <strong>{patient.blood_gluc} mg/dL</strong>
                      <span className="text-xs text-muted">{patient.oxygen_sat}% SpO2</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <strong>{patient.bmi}</strong>
                      <span className="text-xs text-muted">{patient.bmi_categ}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${getRiskColor(patient.heart_risk)}`}>
                      {patient.heart_risk}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge-${getRiskColor(patient.overall_risk)}`}>
                      {patient.overall_risk}
                    </span>
                  </td>
                  <td>
                    <button className="btn-ghost" title="View Record">
                      <Eye size={16} />
                    </button>
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
