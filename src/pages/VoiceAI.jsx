import { useState } from 'react';
import {
  Phone,
  PhoneCall,
  PhoneOff,
  PhoneForwarded,
  Mic,
  MicOff,
  Volume2,
  Globe,
  Clock,
  Brain,
  Zap,
  BarChart3,
  Play,
  Pause,
  Settings,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Search,
  Filter,
  RefreshCw,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { callLogs, supportedLanguages } from '../data/mockData';
import './VoiceAI.css';

const accuracyData = [
  { time: '00:00', accuracy: 94.1 },
  { time: '04:00', accuracy: 94.5 },
  { time: '08:00', accuracy: 95.0 },
  { time: '12:00', accuracy: 95.2 },
  { time: '16:00', accuracy: 95.4 },
  { time: '20:00', accuracy: 95.1 },
  { time: '24:00', accuracy: 95.3 },
];

const sentimentColors = {
  Positive: '#51cf66',
  Neutral: '#74c0fc',
  Concerned: '#fcc419',
  Negative: '#ff6b6b',
};

export default function VoiceAI() {
  const [activeTab, setActiveTab] = useState('calls');
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="page-container">
      {/* Hero Section */}
      <div className="voice-hero animate-fade-in">
        <div className="voice-hero-content">
          <div className="voice-hero-left">
            <div className="voice-icon-large">
              <Mic size={32} />
              <div className="voice-ripple" />
              <div className="voice-ripple delay-1" />
              <div className="voice-ripple delay-2" />
            </div>
            <div>
              <h1>Voice AI Engine</h1>
              <p className="text-muted">
                Multilingual speech-to-text with 95.2% accuracy, emotion detection, and continuous learning from interactions.
              </p>
            </div>
          </div>
          <div className="voice-hero-stats">
            <div className="voice-mini-stat">
              <Brain size={18} />
              <div>
                <span className="mini-stat-value">95.2%</span>
                <span className="mini-stat-label">Accuracy</span>
              </div>
            </div>
            <div className="voice-mini-stat">
              <Globe size={18} />
              <div>
                <span className="mini-stat-value">22</span>
                <span className="mini-stat-label">Languages</span>
              </div>
            </div>
            <div className="voice-mini-stat">
              <Zap size={18} />
              <div>
                <span className="mini-stat-value">234</span>
                <span className="mini-stat-label">Active Calls</span>
              </div>
            </div>
            <div className="voice-mini-stat">
              <TrendingUp size={18} />
              <div>
                <span className="mini-stat-value">98.7%</span>
                <span className="mini-stat-label">Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tabs voice-tabs animate-fade-in delay-1">
        {[
          { id: 'calls', label: 'Call Logs', icon: Phone },
          { id: 'live', label: 'Live Monitor', icon: PhoneCall },
          { id: 'languages', label: 'Language Packs', icon: Globe },
          { id: 'performance', label: 'Performance', icon: BarChart3 },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            id={`voice-tab-${tab.id}`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Call Logs Tab */}
      {activeTab === 'calls' && (
        <div className="voice-section animate-fade-in">
          <div className="card">
            <div className="card-header">
              <div>
                <h3>Recent Voice Interactions</h3>
                <p className="text-sm text-muted">All AI-powered voice calls and their outcomes</p>
              </div>
              <div className="flex gap-sm">
                <button className="btn btn-secondary btn-sm">
                  <Filter size={14} /> Filter
                </button>
                <button className="btn btn-secondary btn-sm">
                  <RefreshCw size={14} /> Refresh
                </button>
              </div>
            </div>
            <div className="call-list">
              {callLogs.map((log) => (
                <div key={log.id} className="call-log-item" id={`call-log-${log.id}`}>
                  <div className={`call-type-badge ${log.status.toLowerCase()}`}>
                    {log.status === 'Completed' ? (
                      <CheckCircle size={18} />
                    ) : (
                      <AlertCircle size={18} />
                    )}
                  </div>
                  <div className="call-log-main">
                    <div className="call-log-top">
                      <div>
                        <strong>{log.patient}</strong>
                        <span className="badge badge-info" style={{ marginLeft: 8 }}>{log.type}</span>
                      </div>
                      <div className="call-log-meta-right">
                        <span className="badge badge-primary">{log.language}</span>
                        <span className="text-xs text-muted">{log.timestamp}</span>
                      </div>
                    </div>
                    <p className="call-log-summary">{log.summary}</p>
                    <div className="call-log-footer">
                      <span className="call-log-duration">
                        <Clock size={12} /> {log.duration}
                      </span>
                      <div className="sentiment-indicator">
                        <span
                          className="sentiment-dot"
                          style={{ background: sentimentColors[log.sentiment] }}
                        />
                        <span style={{ color: sentimentColors[log.sentiment] }}>
                          {log.sentiment}
                        </span>
                      </div>
                      <div className="call-log-actions">
                        <button className="btn btn-ghost btn-sm">
                          <Play size={12} /> Replay
                        </button>
                        <button className="btn btn-ghost btn-sm">Transcript</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Live Monitor Tab */}
      {activeTab === 'live' && (
        <div className="voice-section animate-fade-in">
          <div className="live-grid">
            {/* Live Waveform */}
            <div className="card live-card">
              <div className="card-header">
                <h3>Live Audio Stream</h3>
                <div className="live-badge">
                  <span className="live-dot" />
                  Recording
                </div>
              </div>
              <div className="waveform-container">
                <div className="waveform">
                  {Array.from({ length: 60 }).map((_, i) => (
                    <div
                      key={i}
                      className="waveform-bar"
                      style={{
                        height: `${Math.random() * 80 + 20}%`,
                        animationDelay: `${i * 0.05}s`,
                      }}
                    />
                  ))}
                </div>
                <div className="waveform-controls">
                  <button
                    className={`record-btn ${isRecording ? 'active' : ''}`}
                    onClick={() => setIsRecording(!isRecording)}
                  >
                    {isRecording ? <MicOff size={24} /> : <Mic size={24} />}
                  </button>
                  <div className="volume-control">
                    <Volume2 size={16} />
                    <div className="progress-bar" style={{ width: 120 }}>
                      <div className="progress-fill teal" style={{ width: '75%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Transcript */}
            <div className="card live-card">
              <div className="card-header">
                <h3>Real-time Transcript</h3>
                <span className="badge badge-primary">Hindi → English</span>
              </div>
              <div className="transcript-container">
                <div className="transcript-line patient">
                  <span className="transcript-speaker">Patient:</span>
                  <span className="transcript-text">
                    "Haan doctor sahab, main apni dawai subah aur shaam le raha hoon. Blood sugar bhi check kiya kal."
                  </span>
                  <span className="transcript-translation">
                    Translation: "Yes doctor, I am taking my medicine in the morning and evening. I also checked blood sugar yesterday."
                  </span>
                </div>
                <div className="transcript-line ai">
                  <span className="transcript-speaker">AI:</span>
                  <span className="transcript-text">
                    "Bahut accha! Aapka blood sugar kitna tha? Kya aapko koi side effects mehsoos ho rahe hain?"
                  </span>
                  <span className="transcript-translation">
                    Translation: "Very good! What was your blood sugar? Are you feeling any side effects?"
                  </span>
                </div>
                <div className="transcript-line patient">
                  <span className="transcript-speaker">Patient:</span>
                  <span className="transcript-text">
                    "Fasting mein 130 tha. Side effect nahi hai koi, bas thoda neend zyada aa rahi hai."
                  </span>
                  <span className="transcript-translation">
                    Translation: "Fasting was 130. No side effects, just feeling a bit more sleepy."
                  </span>
                </div>
                <div className="transcript-typing">
                  <span className="typing-indicator">
                    <span></span><span></span><span></span>
                  </span>
                  Patient is speaking...
                </div>
              </div>
              <div className="transcript-insights">
                <h4>AI Insights</h4>
                <div className="insight-tags">
                  <span className="insight-tag success">✓ Medication Adherent</span>
                  <span className="insight-tag info">Blood Sugar: 130 mg/dL (Fasting)</span>
                  <span className="insight-tag warning">⚠ Reported Drowsiness</span>
                  <span className="insight-tag neutral">Sentiment: Positive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Language Packs Tab */}
      {activeTab === 'languages' && (
        <div className="voice-section animate-fade-in">
          <div className="card">
            <div className="card-header">
              <div>
                <h3>Supported Languages & Dialects</h3>
                <p className="text-sm text-muted">22 Indian languages with regional dialect support</p>
              </div>
              <button className="btn btn-primary btn-sm">
                <Settings size={14} /> Configure
              </button>
            </div>
            <div className="language-grid">
              {supportedLanguages.map((lang, i) => (
                <div key={lang} className="language-card" id={`lang-${lang.toLowerCase()}`}>
                  <div className="lang-card-header">
                    <span className="lang-flag">{lang.slice(0, 2).toUpperCase()}</span>
                    <div>
                      <strong>{lang}</strong>
                      <span className="text-xs text-muted">Active</span>
                    </div>
                  </div>
                  <div className="lang-stats">
                    <div className="lang-stat">
                      <span className="lang-stat-value">{Math.floor(Math.random() * 5 + 93)}%</span>
                      <span className="lang-stat-label">Accuracy</span>
                    </div>
                    <div className="lang-stat">
                      <span className="lang-stat-value">{Math.floor(Math.random() * 2000 + 100)}</span>
                      <span className="lang-stat-label">Calls</span>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill teal"
                      style={{ width: `${Math.floor(Math.random() * 20 + 80)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <div className="voice-section animate-fade-in">
          <div className="grid grid-2 gap-lg">
            <div className="card">
              <div className="card-header">
                <h3>Accuracy Over Time</h3>
                <span className="badge badge-success">↑ 1.1% Today</span>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={accuracyData}>
                  <defs>
                    <linearGradient id="accGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#20c997" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#20c997" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="time" stroke="#868e96" fontSize={12} />
                  <YAxis domain={[93, 96]} stroke="#868e96" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#20c997"
                    fill="url(#accGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>Engine Metrics</h3>
              </div>
              <div className="metrics-grid">
                <div className="metric-item">
                  <div className="metric-header">
                    <span>Speech-to-Text Latency</span>
                    <span className="metric-value">142ms</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill teal" style={{ width: '85%' }} />
                  </div>
                </div>
                <div className="metric-item">
                  <div className="metric-header">
                    <span>Emotion Detection Accuracy</span>
                    <span className="metric-value">89.4%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill indigo" style={{ width: '89%' }} />
                  </div>
                </div>
                <div className="metric-item">
                  <div className="metric-header">
                    <span>Dialect Recognition</span>
                    <span className="metric-value">91.7%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill teal" style={{ width: '92%' }} />
                  </div>
                </div>
                <div className="metric-item">
                  <div className="metric-header">
                    <span>Noise Cancellation</span>
                    <span className="metric-value">97.2%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill teal" style={{ width: '97%' }} />
                  </div>
                </div>
                <div className="metric-item">
                  <div className="metric-header">
                    <span>Natural Language Understanding</span>
                    <span className="metric-value">93.8%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill indigo" style={{ width: '94%' }} />
                  </div>
                </div>
                <div className="metric-item">
                  <div className="metric-header">
                    <span>Model Training Freshness</span>
                    <span className="metric-value">2h ago</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill teal" style={{ width: '98%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
