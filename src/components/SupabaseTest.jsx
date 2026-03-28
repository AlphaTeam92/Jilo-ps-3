import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function SupabaseTest() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      // A safe way to test connection without needing specific tables is to check the Auth status
      const { data, error: supaError } = await supabase.auth.getSession();
      
      if (supaError) throw supaError;
      
      setResult(`Connection successful! Supabase responding fine. Session active: ${data.session ? 'Yes' : 'No'}.`);
    } catch (err) {
      setError(err.message || 'Failed to connect to Supabase.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <div className="card-header">
        <h3>Supabase Connection Test</h3>
      </div>
      <div style={{ padding: '1.5rem' }}>
        <p className="text-muted" style={{ marginBottom: '1rem' }}>
          Click the button below to ping the Supabase backend and verify the API keys are working.
        </p>
        
        <button 
          className="btn btn-primary" 
          onClick={testConnection} 
          disabled={loading}
        >
          {loading ? 'Pinging Supabase...' : 'Test Connection'}
        </button>

        {result && (
          <div style={{ 
            marginTop: '1.5rem', padding: '1rem', 
            backgroundColor: 'rgba(32, 201, 151, 0.1)', 
            border: '1px solid var(--success)', 
            borderRadius: 'var(--radius-md)' 
          }}>
            <strong style={{ color: 'var(--success)', display: 'block', marginBottom: '0.25rem' }}>Success!</strong>
            <span style={{ fontSize: '0.875rem' }}>{result}</span>
          </div>
        )}

        {error && (
          <div style={{ 
            marginTop: '1.5rem', padding: '1rem', 
            backgroundColor: 'rgba(255, 107, 107, 0.1)', 
            border: '1px solid var(--danger)', 
            borderRadius: 'var(--radius-md)' 
          }}>
            <strong style={{ color: 'var(--danger)', display: 'block', marginBottom: '0.25rem' }}>Connection Failed</strong>
            <span style={{ fontSize: '0.875rem' }}>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}
