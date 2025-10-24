import React from 'react';
import { Satellite } from 'lucide-react';

interface MultispectralAnalysisProps {
  analysisResults?: any;
  children?: React.ReactNode; // Allow passing the farm mapping interface
}

export const MultispectralAnalysis: React.FC<MultispectralAnalysisProps> = ({ children }) => {
  return (
    <div>
      {/* Page Header */}
      <div style={{ 
        padding: '2rem 0 1rem 0', 
        borderBottom: '1px solid var(--bg-tertiary)', 
        marginBottom: '2rem' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            backgroundColor: 'rgba(0, 179, 126, 0.1)', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <Satellite size={24} style={{ color: 'var(--accent-green)' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
              Multispectral Analysis
            </h1>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', margin: 0 }}>
              Advanced satellite imagery analysis for agricultural insights
            </p>
          </div>
        </div>
      </div>

      {/* Render the farm mapping interface */}
      {children}
    </div>
  );
};
