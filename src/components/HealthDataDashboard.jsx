import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const HealthDataDashboard = () => {
  const [healthData, setHealthData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        setLoading(true);
        // Fetching all data from jilo_project
        const { data, error: fetchError } = await supabase
          .from('jilo_project')
          .select('*')
          .order('created_at', { ascending: false });

        if (fetchError) {
          throw fetchError;
        }

        setHealthData(data || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching health data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthData();
  }, []);

  if (loading) {
    return (
      <div style={containerStyle}>
        <h2>Loading health data...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ ...containerStyle, color: '#ef4444' }}>
        <h2>Error loading data</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (healthData.length === 0) {
    return (
      <div style={containerStyle}>
        <h2>Health Camp Data</h2>
        <p>No health camp data found in the jilo_project table.</p>
      </div>
    );
  }

  // Extract columns dynamically from the first row of data
  const columns = Object.keys(healthData[0]);

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: '16px', color: '#1e293b' }}>Health Camp Data Dashboard</h2>
      <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #cbd5e1' }}>
              {columns.map((col) => (
                <th key={col} style={thStyle}>
                  {col.replace(/_/g, ' ').toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {healthData.map((row) => (
              <tr key={row.id} style={{ borderBottom: '1px solid #e2e8f0' }} className="hover:bg-gray-50">
                {columns.map((col) => {
                  let cellValue = row[col];
                  
                  // Handle date formatting for created_at
                  if (col === 'created_at' && cellValue) {
                    cellValue = new Date(cellValue).toLocaleString();
                  }

                  return (
                    <td key={`${row.id}-${col}`} style={tdStyle}>
                      {cellValue !== null && cellValue !== undefined ? String(cellValue) : 'N/A'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const containerStyle = {
  padding: '24px',
  width: '100%',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  margin: '20px 0'
};

const thStyle = {
  padding: '12px 16px',
  fontWeight: '600',
  color: '#334155',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap'
};

const tdStyle = {
  padding: '12px 16px',
  color: '#475569',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap'
};

export default HealthDataDashboard;
