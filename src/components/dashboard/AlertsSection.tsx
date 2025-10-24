import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card } from '../ui/Card';
import { AlertItem } from './AlertItem';

interface Alert {
  id: number;
  type: 'warning' | 'info' | 'success';
  message: string;
  timestamp: string;
}

interface AlertsSectionProps {
  alerts: Alert[];
}

export const AlertsSection: React.FC<AlertsSectionProps> = ({ alerts }) => {
  return (
    <Card padding="lg">
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem', 
        marginBottom: '1.5rem' 
      }}>
        <AlertTriangle size={20} style={{ color: 'var(--accent-red)' }} />
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: '600', 
          color: 'var(--text-primary)' 
        }}>
          Recent Alerts
        </h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {alerts.map((alert) => (
          <AlertItem key={alert.id} alert={alert} />
        ))}
      </div>
    </Card>
  );
};
