import {
  HelpCircle,
  Book,
  MessageCircle,
  Video,
  Mail,
  Phone,
  ExternalLink,
  ChevronRight,
  Search,
  FileText,
  Zap,
  Users,
} from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    q: 'How does the Voice AI Engine handle different dialects?',
    a: 'Our AI engine uses dialect-aware models trained on regional speech patterns. It automatically detects the dialect variant and adjusts its speech recognition accordingly, achieving over 93% accuracy across all supported dialects.',
  },
  {
    q: 'Can I customize the workflow scripts?',
    a: 'Yes! The Workflow Builder provides a visual editor where you can create custom scripts with conditional logic, branching paths, and personalized messaging. You can define patient segments and schedule automated campaigns.',
  },
  {
    q: 'How is patient data stored and secured?',
    a: 'All data is stored in Supabase PostgreSQL with row-level security. We use end-to-end encryption for voice calls and comply with HIPAA and Indian data protection guidelines.',
  },
  {
    q: 'What happens when the AI detects a concerning sentiment?',
    a: 'When emotion detection identifies distress, anxiety, or health concerns, the system automatically escalates the case to the care coordinator with a detailed summary and recommended actions.',
  },
  {
    q: 'How do I add a new language pack?',
    a: 'Navigate to the Language Center, click "Configure", and select from available language packs. New packs are automatically trained using our base model and can be fine-tuned with hospital-specific data.',
  },
];

export default function Help() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="page-container">
      <div className="patients-header animate-fade-in">
        <div>
          <h1>Help & Support</h1>
          <p className="text-muted">
            Find answers, explore guides, and get in touch with our support team.
          </p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-4 gap-lg animate-fade-in delay-1">
        {[
          { icon: Book, title: 'Documentation', desc: 'Platform guides & API docs', color: 'teal' },
          { icon: Video, title: 'Video Tutorials', desc: 'Step-by-step walkthroughs', color: 'indigo' },
          { icon: MessageCircle, title: 'Live Chat', desc: 'Chat with support team', color: 'cool' },
          { icon: Mail, title: 'Email Support', desc: 'support@jilocare.com', color: 'warm' },
        ].map((item, i) => (
          <div key={i} className="card" style={{ cursor: 'pointer', textAlign: 'center', padding: '2rem 1.5rem' }}>
            <div className={`stat-icon ${item.color}`} style={{ margin: '0 auto 1rem', width: 56, height: 56 }}>
              <item.icon size={24} />
            </div>
            <h4>{item.title}</h4>
            <p className="text-sm text-muted" style={{ marginTop: 4 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div className="card animate-fade-in delay-2" style={{ marginTop: '1.5rem' }}>
        <div className="card-header">
          <h3>Frequently Asked Questions</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--glass-border)' }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  color: openFaq === i ? '#fff' : 'var(--gray-300)',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  textAlign: 'left',
                }}
                id={`faq-${i}`}
              >
                <span>{faq.q}</span>
                <ChevronRight
                  size={16}
                  style={{
                    transform: openFaq === i ? 'rotate(90deg)' : 'none',
                    transition: 'transform 0.2s',
                    flexShrink: 0,
                    marginLeft: '1rem',
                  }}
                />
              </button>
              {openFaq === i && (
                <div style={{
                  padding: '0 1rem 1rem',
                  fontSize: '0.8125rem',
                  color: 'var(--gray-400)',
                  lineHeight: 1.6,
                  animation: 'fadeIn 0.3s ease',
                }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
