import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  subtitle?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon, 
  subtitle 
}) => {
  const changeColor = {
    positive: 'var(--accent-green)',
    negative: 'var(--accent-red)',
    neutral: 'var(--text-secondary)'
  };

  return (
    <Card className="card-hover" padding="md">
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: '1rem',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <div style={{ 
          padding: '0.75rem', 
          backgroundColor: 'rgba(0, 179, 126, 0.1)', 
          borderRadius: '0.5rem',
          color: 'var(--accent-green)',
          flexShrink: 0
        }}>
          {icon}
        </div>
        {change && (
          <div style={{ 
            fontSize: '0.75rem', 
            fontWeight: '500',
            color: changeColor[changeType],
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            flexShrink: 0
          }}>
            <TrendingUp size={12} />
            {change}
          </div>
        )}
      </div>
      <div>
        <h3 style={{ 
          fontSize: 'clamp(1.25rem, 4vw, 2rem)', 
          fontWeight: 'bold', 
          color: 'var(--text-primary)', 
          marginBottom: '0.25rem',
          lineHeight: 1
        }}>
          {value}
        </h3>
        <p style={{ 
          fontSize: '0.8rem', 
          color: 'var(--text-secondary)', 
          marginBottom: subtitle ? '0.25rem' : 0
        }}>
          {title}
        </p>
        {subtitle && (
          <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>
            {subtitle}
          </p>
        )}
      </div>
    </Card>
  );
};
