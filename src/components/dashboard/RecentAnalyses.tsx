import React from 'react';
import { Card } from '../ui/Card';

interface Analysis {
  id: number;
  farmName: string;
  date: string;
  ndvi: number;
  health: string;
  area: number;
  status: string;
}

interface RecentAnalysesProps {
  analyses: Analysis[];
}

export const RecentAnalyses: React.FC<RecentAnalysesProps> = ({ analyses }) => {
  return (
    <Card padding="lg">
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: '1.5rem' 
      }}>
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: '600', 
          color: 'var(--text-primary)' 
        }}>
          Recent Analyses
        </h3>
        <button style={{
          fontSize: '0.875rem',
          color: 'var(--accent-green)',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontWeight: '500'
        }}>
          View All
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {analyses.map((analysis) => (
          <div key={analysis.id} style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            justifyContent: 'space-between',
            padding: '0.75rem',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '0.5rem',
            border: '1px solid var(--bg-tertiary)',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <h4 style={{ 
                fontSize: '0.8rem', 
                fontWeight: '600', 
                color: 'var(--text-primary)',
                marginBottom: '0.25rem'
              }}>
                {analysis.farmName}
              </h4>
              <p style={{ 
                fontSize: '0.7rem', 
                color: 'var(--text-secondary)',
                lineHeight: '1.4'
              }}>
                {analysis.date} • {analysis.area} ha
              </p>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ 
                fontSize: '0.8rem', 
                fontWeight: '600', 
                color: 'var(--text-primary)',
                marginBottom: '0.25rem'
              }}>
                NDVI: {analysis.ndvi}
              </div>
              <div style={{ 
                fontSize: '0.7rem', 
                color: analysis.health === 'Excellent' ? 'var(--accent-green)' : 
                       analysis.health === 'Good' ? '#3B82F6' : '#F59E0B',
                fontWeight: '500'
              }}>
                {analysis.health}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
