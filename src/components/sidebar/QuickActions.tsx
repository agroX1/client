import React from 'react';
import { Card } from '../ui/Card';
import type { ActiveTab } from '../../types';

interface QuickActionsProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onReset: () => void;
  onRunAnalysis: () => void;
  farmBoundaries: any[];
  analysisResults: any;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  activeTab,
  onTabChange,
  onReset,
  onRunAnalysis,
  farmBoundaries,
  analysisResults,
}) => {
  const actions = [
    {
      id: 'coordinates',
      label: 'Enter Coordinates',
      description: 'Manual coordinate entry',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      onClick: () => onTabChange('coordinates'),
      isActive: activeTab === 'coordinates'
    },
    {
      id: 'analysis',
      label: 'View Analysis',
      description: 'View analysis results',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
      ),
      onClick: () => {
        if (analysisResults) {
          // Switch to map tab and show results
          onTabChange('map');
        } else {
          onTabChange('analysis');
        }
      },
      isActive: activeTab === 'analysis',
      disabled: farmBoundaries.length === 0 && !analysisResults
    },
    {
      id: 'reset',
      label: 'Reset All',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18"/>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
        </svg>
      ),
      onClick: onReset,
      isActive: false,
      isDestructive: true
    }
  ];

  return (
    <Card padding="sm">
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ 
          fontWeight: '600', 
          color: 'var(--text-primary)', 
          marginBottom: '0.25rem',
          fontSize: '0.875rem',
          letterSpacing: '0.025em'
        }}>
          Quick Actions
        </h3>
        <p style={{ 
          fontSize: '0.75rem', 
          color: 'var(--text-secondary)',
          margin: 0
        }}>
          Common tasks and shortcuts
        </p>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: action.isActive ? 'rgba(0, 179, 126, 0.1)' : 'transparent',
              border: action.isActive ? '1px solid rgba(0, 179, 126, 0.2)' : '1px solid transparent',
              borderRadius: '0.5rem',
              cursor: action.disabled ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              textAlign: 'left',
              opacity: action.disabled ? 0.5 : 1
            }}
            onMouseEnter={(e) => {
              if (!action.isActive) {
                (e.target as HTMLElement).style.backgroundColor = action.isDestructive ? 'rgba(255, 82, 82, 0.05)' : 'var(--bg-secondary)';
                (e.target as HTMLElement).style.borderColor = action.isDestructive ? 'rgba(255, 82, 82, 0.1)' : 'var(--bg-tertiary)';
              }
            }}
            onMouseLeave={(e) => {
              if (!action.isActive) {
                (e.target as HTMLElement).style.backgroundColor = 'transparent';
                (e.target as HTMLElement).style.borderColor = 'transparent';
              }
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '0.375rem',
              backgroundColor: action.isActive ? 'var(--accent-green)' : (action.isDestructive ? 'rgba(255, 82, 82, 0.1)' : 'var(--bg-tertiary)'),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: action.isActive ? 'white' : (action.isDestructive ? 'var(--accent-red)' : 'var(--text-secondary)'),
              flexShrink: 0
            }}>
              {action.icon}
            </div>
            
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                color: action.isActive ? 'var(--accent-green)' : (action.isDestructive ? 'var(--accent-red)' : 'var(--text-primary)'),
                marginBottom: '0.125rem'
              }}>
                {action.label}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.2'
              }}>
                {action.description}
              </div>
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
};
