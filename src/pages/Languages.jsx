import {
  Globe,
  CheckCircle,
  TrendingUp,
  Volume2,
  Users,
  Activity,
} from 'lucide-react';
import { supportedLanguages, languageStats } from '../data/mockData';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';

const langDetails = supportedLanguages.map((lang, i) => ({
  name: lang,
  accuracy: Math.floor(Math.random() * 5 + 93),
  calls: Math.floor(Math.random() * 3000 + 200),
  patients: Math.floor(Math.random() * 1500 + 100),
  active: true,
  dialects: Math.floor(Math.random() * 4 + 1),
}));

export default function Languages() {
  return (
    <div className="page-container">
      <div className="patients-header animate-fade-in">
        <div>
          <h1>Language Center</h1>
          <p className="text-muted">
            Manage 22 Indian languages with regional dialect support. Configure accuracy thresholds and voice models.
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-3 gap-lg animate-fade-in delay-1">
        <div className="card stat-card teal">
          <div className="stat-header">
            <div className="stat-icon teal"><Globe size={22} /></div>
          </div>
          <div className="stat-body">
            <span className="stat-value">22</span>
            <span className="stat-label">Languages Active</span>
          </div>
        </div>
        <div className="card stat-card indigo">
          <div className="stat-header">
            <div className="stat-icon indigo"><Volume2 size={22} /></div>
          </div>
          <div className="stat-body">
            <span className="stat-value">67+</span>
            <span className="stat-label">Dialects Supported</span>
          </div>
        </div>
        <div className="card stat-card cool">
          <div className="stat-header">
            <div className="stat-icon cool"><TrendingUp size={22} /></div>
          </div>
          <div className="stat-body">
            <span className="stat-value">95.2%</span>
            <span className="stat-label">Avg. Accuracy</span>
          </div>
        </div>
      </div>

      {/* Distribution Chart + Table */}
      <div className="dashboard-grid" style={{ marginTop: '1.5rem' }}>
        <div className="card animate-fade-in delay-2">
          <div className="card-header">
            <h3>Call Distribution by Language</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={languageStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#868e96" fontSize={11} />
              <YAxis stroke="#868e96" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="value" name="% Share" radius={[6, 6, 0, 0]}>
                {languageStats.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card animate-fade-in delay-3">
          <div className="card-header">
            <h3>Language Performance</h3>
          </div>
          <div style={{ maxHeight: 320, overflowY: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Language</th>
                  <th>Accuracy</th>
                  <th>Dialects</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {langDetails.slice(0, 12).map((lang) => (
                  <tr key={lang.name}>
                    <td><strong style={{ color: '#fff' }}>{lang.name}</strong></td>
                    <td>
                      <div className="adherence-cell">
                        <span>{lang.accuracy}%</span>
                        <div className="progress-bar" style={{ width: 50 }}>
                          <div className="progress-fill teal" style={{ width: `${lang.accuracy}%` }} />
                        </div>
                      </div>
                    </td>
                    <td>{lang.dialects}</td>
                    <td><span className="badge badge-success">Active</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
