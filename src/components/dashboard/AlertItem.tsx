import React from 'react';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface AlertItemProps {
  alert: {
    id: number;
    type: 'warning' | 'info' | 'success';
    message: string;
    timestamp: string;
  };
}

export const AlertItem: React.FC<AlertItemProps> = ({ alert }) => {
  const alertConfig = {
    warning: { color: 'var(--accent-red)', icon: AlertTriangle },
    info: { color: '#3B82F6', icon: Clock },
    success: { color: 'var(--accent-green)', icon: CheckCircle }
  };

  const config = alertConfig[alert.type];
  const Icon = config.icon;

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'flex-start', 
      gap: '0.75rem', 
      padding: '0.75rem',
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: '0.5rem',
      border: `1px solid ${config.color}20`
    }}>
      <div style={{ 
        padding: '0.25rem', 
        backgroundColor: `${config.color}20`, 
        borderRadius: '0.25rem',
        color: config.color,
        flexShrink: 0
      }}>
        <Icon size={16} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ 
          fontSize: '0.875rem', 
          color: 'var(--text-primary)', 
          marginBottom: '0.25rem',
          lineHeight: 1.4
        }}>
          {alert.message}
        </p>
        <p style={{ 
          fontSize: '0.75rem', 
          color: 'var(--text-tertiary)' 
        }}>
          {alert.timestamp}
        </p>
      </div>
    </div>
  );
};
