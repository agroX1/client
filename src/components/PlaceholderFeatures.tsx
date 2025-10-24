import React from 'react';
import { BarChart3, Cloud, DollarSign, FileText } from 'lucide-react';

interface PlaceholderFeatureProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

export const PlaceholderFeature: React.FC<PlaceholderFeatureProps> = ({ title, description, icon: Icon, color }) => {
  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-primary)', borderRadius: '0.75rem', border: '1px solid var(--bg-tertiary)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <div style={{ 
          width: '48px', 
          height: '48px', 
          backgroundColor: `${color}20`, 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <Icon size={24} style={{ color }} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
            {title}
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
            {description}
          </p>
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          backgroundColor: `${color}20`, 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          margin: '0 auto 1.5rem'
        }}>
          <Icon size={40} style={{ color }} />
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
          Coming Soon
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
          This feature is currently under development. Stay tuned for updates!
        </p>
        <div style={{ 
          padding: '1rem', 
          backgroundColor: `${color}10`, 
          borderRadius: '0.5rem', 
          border: `1px solid ${color}30`,
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
          maxWidth: '300px',
          margin: '0 auto'
        }}>
          <strong>Planned Features:</strong>
          <ul style={{ textAlign: 'left', marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
            {title === 'Reports' && (
              <>
                <li>Historical analysis trends</li>
                <li>Export to PDF/Excel</li>
                <li>Custom report templates</li>
                <li>Automated scheduling</li>
              </>
            )}
            {title === 'Weather' && (
              <>
                <li>Real-time weather data</li>
                <li>7-day forecasts</li>
                <li>Weather alerts</li>
                <li>Historical weather patterns</li>
              </>
            )}
            {title === 'Market Prices' && (
              <>
                <li>Live crop prices</li>
                <li>Price trends & charts</li>
                <li>Market alerts</li>
                <li>Profitability analysis</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Specific components for each feature
export const Reports: React.FC = () => (
  <PlaceholderFeature
    title="Reports"
    description="Comprehensive agricultural reports and analytics"
    icon={FileText}
    color="#8B5CF6"
  />
);

export const Weather: React.FC = () => (
  <PlaceholderFeature
    title="Weather"
    description="Real-time weather data and forecasts"
    icon={Cloud}
    color="#06B6D4"
  />
);

export const MarketPrices: React.FC = () => (
  <PlaceholderFeature
    title="Market Prices"
    description="Live crop prices and market trends"
    icon={DollarSign}
    color="#F59E0B"
  />
);
