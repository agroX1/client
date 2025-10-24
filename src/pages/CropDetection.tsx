import React from 'react';

const CropDetectionPage: React.FC = () => {
  return (
    <div>
      {/* Page Header */}
      <div style={{ 
        padding: '2rem 0 1rem 0', 
        borderBottom: '1px solid var(--bg-tertiary)', 
        marginBottom: '2rem' 
      }}>
      
      </div>

      {/* Coming Soon Content */}
      <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
      
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
          Coming Soon
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
          This feature is currently under development. Stay tuned for updates!
        </p>
        <div style={{ 
          padding: '1rem', 
          backgroundColor: 'rgba(139, 92, 246, 0.05)', 
          borderRadius: '0.5rem', 
          border: '1px solid rgba(139, 92, 246, 0.1)',
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
          maxWidth: '300px',
          margin: '0 auto'
        }}>
          <strong>Planned Features:</strong>
          <ul style={{ textAlign: 'left', marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
            <li>AI-powered crop identification</li>
            <li>Automatic area calculation</li>
            <li>Crop health monitoring</li>
            <li>Yield prediction models</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CropDetectionPage;
