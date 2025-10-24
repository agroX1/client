import React from 'react';
import { DollarSign } from 'lucide-react';

const MarketPricesPage: React.FC = () => {
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
        <div style={{ 
          width: '80px', 
          height: '80px', 
          backgroundColor: 'rgba(245, 158, 11, 0.1)', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          margin: '0 auto 1.5rem'
        }}>
          <DollarSign size={40} style={{ color: '#F59E0B' }} />
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
          Coming Soon
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
          This feature is currently under development. Stay tuned for updates!
        </p>
        <div style={{ 
          padding: '1rem', 
          backgroundColor: 'rgba(245, 158, 11, 0.05)', 
          borderRadius: '0.5rem', 
          border: '1px solid rgba(245, 158, 11, 0.1)',
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
          maxWidth: '300px',
          margin: '0 auto'
        }}>
          <strong>Planned Features:</strong>
          <ul style={{ textAlign: 'left', marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
            <li>Live crop prices</li>
            <li>Price trends & charts</li>
            <li>Market alerts</li>
            <li>Profitability analysis</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MarketPricesPage;
