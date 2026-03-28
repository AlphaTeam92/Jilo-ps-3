import { useState } from 'react';
import {
  GitBranch,
  Plus,
  Play,
  Pause,
  Copy,
  Trash2,
  Edit2,
  Settings,
  Eye,
  Users,
  Clock,
  CheckCircle,
  TrendingUp,
  ChevronRight,
  Search,
  MoreVertical,
  X,
  Phone,
  MessageSquare,
  AlertTriangle,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { workflowTemplates } from '../data/mockData';
import './Workflows.css';

const categories = ['All', 'Post-Discharge', 'Chronic Care', 'Reminders', 'Diagnostics', 'Maternal Care'];

export default function Workflows() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [showBuilder, setShowBuilder] = useState(false);

  const filteredWorkflows = workflowTemplates.filter(
    (w) => selectedCategory === 'All' || w.category === selectedCategory
  );

  return (
    <div className="page-container">
      {/* Header */}
      <div className="patients-header animate-fade-in">
        <div>
          <h1>Workflow Builder</h1>
          <p className="text-muted">
            Design interactive care scripts with conditional logic and schedule automated campaigns.
          </p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={() => setShowBuilder(true)} id="create-workflow">
            <Plus size={16} />
            Create Workflow
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="tabs animate-fade-in delay-1" style={{ width: 'fit-content', marginBottom: '1.5rem' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`tab ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Workflow Cards */}
      <div className="workflow-grid animate-fade-in delay-2">
        {filteredWorkflows.map((workflow) => (
          <div
            key={workflow.id}
            className="workflow-card card"
            id={`workflow-${workflow.id}`}
          >
            <div className="workflow-card-header">
              <div className="workflow-icon">
                <GitBranch size={20} />
              </div>
              <div className="workflow-card-info">
                <h4>{workflow.name}</h4>
                <span className="badge badge-primary">{workflow.category}</span>
              </div>
              <button className="btn-ghost">
                <MoreVertical size={16} />
              </button>
            </div>

            <p className="workflow-desc">{workflow.description}</p>

            <div className="workflow-metrics">
              <div className="workflow-metric">
                <Users size={14} />
                <span>{workflow.patients.toLocaleString()} patients</span>
              </div>
              <div className="workflow-metric">
                <GitBranch size={14} />
                <span>{workflow.steps} steps</span>
              </div>
              <div className="workflow-metric">
                <TrendingUp size={14} />
                <span>{workflow.successRate}% success</span>
              </div>
            </div>

            <div className="workflow-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill teal"
                  style={{ width: `${workflow.successRate}%` }}
                />
              </div>
            </div>

            <div className="workflow-card-footer">
              <span className={`badge ${workflow.active ? 'badge-success' : 'badge-warning'}`}>
                {workflow.active ? '● Active' : '○ Paused'}
              </span>
              <div className="workflow-card-actions">
                <button className="btn-icon" title={workflow.active ? 'Pause' : 'Resume'}>
                  {workflow.active ? <Pause size={14} /> : <Play size={14} />}
                </button>
                <button className="btn-icon" title="Edit" onClick={() => setSelectedWorkflow(workflow)}>
                  <Edit2 size={14} />
                </button>
                <button className="btn-icon" title="View">
                  <Eye size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Workflow Builder Modal */}
      {showBuilder && (
        <div className="modal-overlay" onClick={() => setShowBuilder(false)}>
          <div className="modal workflow-builder-modal" onClick={(e) => e.stopPropagation()} id="workflow-builder">
            <div className="modal-header">
              <h2>Create New Workflow</h2>
              <button className="btn-ghost" onClick={() => setShowBuilder(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="builder-form">
                <div className="input-group">
                  <label>Workflow Name</label>
                  <input className="input-field" placeholder="e.g., Post-Surgery Week 1 Follow-Up" />
                </div>
                <div className="input-group">
                  <label>Category</label>
                  <select className="input-field">
                    <option value="">Select category</option>
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="input-group">
                  <label>Description</label>
                  <textarea className="input-field" rows="2" placeholder="Brief description of this workflow..." />
                </div>
              </div>

              <h3 style={{ margin: '1.5rem 0 1rem' }}>Workflow Steps</h3>
              <div className="builder-steps">
                {/* Step 1 */}
                <div className="builder-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <div className="step-header">
                      <select className="input-field step-type-select">
                        <option>🔔 Voice Call</option>
                        <option>📱 SMS Reminder</option>
                        <option>⏱ Wait Period</option>
                        <option>🔀 Condition Check</option>
                      </select>
                    </div>
                    <div className="step-config">
                      <div className="input-group">
                        <label>Script Template</label>
                        <select className="input-field">
                          <option>Medication Adherence Check</option>
                          <option>Symptom Assessment</option>
                          <option>Appointment Reminder</option>
                          <option>General Well-being Check</option>
                        </select>
                      </div>
                      <div className="step-options">
                        <label className="checkbox-label">
                          <input type="checkbox" defaultChecked /> Enable emotion detection
                        </label>
                        <label className="checkbox-label">
                          <input type="checkbox" defaultChecked /> Auto-escalate on concern
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="step-connector">
                  <ArrowRight size={16} />
                </div>

                {/* Step 2 */}
                <div className="builder-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <div className="step-header">
                      <select className="input-field step-type-select">
                        <option>⏱ Wait Period</option>
                        <option>🔔 Voice Call</option>
                        <option>📱 SMS Reminder</option>
                        <option>🔀 Condition Check</option>
                      </select>
                    </div>
                    <div className="step-config">
                      <div className="input-group">
                        <label>Wait Duration</label>
                        <div className="flex gap-sm">
                          <input className="input-field" type="number" defaultValue="24" style={{ width: 80 }} />
                          <select className="input-field" style={{ width: 100 }}>
                            <option>Hours</option>
                            <option>Days</option>
                            <option>Minutes</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="step-connector">
                  <ArrowRight size={16} />
                </div>

                {/* Step 3 */}
                <div className="builder-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <div className="step-header">
                      <select className="input-field step-type-select">
                        <option>🔀 Condition Check</option>
                        <option>🔔 Voice Call</option>
                        <option>📱 SMS Reminder</option>
                        <option>⏱ Wait Period</option>
                      </select>
                    </div>
                    <div className="step-config">
                      <div className="condition-branches">
                        <div className="branch branch-yes">
                          <span className="branch-label badge-success">If Adherent</span>
                          <span className="text-sm text-muted">→ Schedule next check-in</span>
                        </div>
                        <div className="branch branch-no">
                          <span className="branch-label badge-danger">If Non-Adherent</span>
                          <span className="text-sm text-muted">→ Escalate to care coordinator</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="add-step-btn" id="add-workflow-step">
                  <Plus size={16} />
                  Add Step
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowBuilder(false)}>
                Cancel
              </button>
              <button className="btn btn-secondary">
                <Eye size={16} /> Preview
              </button>
              <button className="btn btn-primary" onClick={() => setShowBuilder(false)}>
                <Zap size={16} /> Create & Activate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Workflow Detail Drawer */}
      {selectedWorkflow && (
        <div className="patient-drawer-overlay" onClick={() => setSelectedWorkflow(null)}>
          <div className="patient-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h2>Workflow Details</h2>
              <button className="btn-ghost" onClick={() => setSelectedWorkflow(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="drawer-body">
              <div className="drawer-profile">
                <div className="workflow-icon" style={{ width: 64, height: 64 }}>
                  <GitBranch size={28} />
                </div>
                <h3>{selectedWorkflow.name}</h3>
                <span className="text-muted">{selectedWorkflow.category}</span>
                <div className="drawer-badges">
                  <span className={`badge ${selectedWorkflow.active ? 'badge-success' : 'badge-warning'}`}>
                    {selectedWorkflow.active ? 'Active' : 'Paused'}
                  </span>
                </div>
              </div>

              <div className="drawer-section">
                <h4>Overview</h4>
                <p className="text-sm" style={{ color: 'var(--gray-400)', lineHeight: 1.6 }}>
                  {selectedWorkflow.description}
                </p>
                <div className="drawer-info-grid" style={{ marginTop: '1rem' }}>
                  <div className="drawer-info-item">
                    <Users size={16} />
                    <div>
                      <span className="info-label">Enrolled</span>
                      <span className="info-value">{selectedWorkflow.patients.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="drawer-info-item">
                    <GitBranch size={16} />
                    <div>
                      <span className="info-label">Steps</span>
                      <span className="info-value">{selectedWorkflow.steps}</span>
                    </div>
                  </div>
                  <div className="drawer-info-item">
                    <TrendingUp size={16} />
                    <div>
                      <span className="info-label">Success Rate</span>
                      <span className="info-value">{selectedWorkflow.successRate}%</span>
                    </div>
                  </div>
                  <div className="drawer-info-item">
                    <CheckCircle size={16} />
                    <div>
                      <span className="info-label">Completion</span>
                      <span className="info-value">
                        {Math.floor(selectedWorkflow.patients * selectedWorkflow.successRate / 100)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="drawer-section">
                <h4>Actions</h4>
                <div className="drawer-actions">
                  <button className="btn btn-primary">
                    <Edit2 size={16} /> Edit Workflow
                  </button>
                  <button className="btn btn-secondary">
                    <Copy size={16} /> Duplicate
                  </button>
                  <button className="btn btn-secondary">
                    <Play size={16} /> Run Test
                  </button>
                  <button className="btn btn-danger btn-sm" style={{ marginTop: '0.5rem' }}>
                    <Trash2 size={16} /> Delete Workflow
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
