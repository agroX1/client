import React from 'react';
import { Card } from '../ui/Card';
import type { LatLng } from 'leaflet';
import type { AnalysisResults } from '../../types';

interface FarmSummaryProps {
  farmBoundaries: LatLng[][];
  analysisResults: AnalysisResults | null;
  calculatePolygonArea: (coordinates: LatLng[]) => number;
}

export const FarmSummary: React.FC<FarmSummaryProps> = ({
  farmBoundaries,
  analysisResults,
  calculatePolygonArea,
}) => {
  const totalArea = farmBoundaries.reduce((sum, boundary) => {
    return sum + calculatePolygonArea(boundary);
  }, 0);

  return (
    <Card>
  
      
      {farmBoundaries.length === 0 ? (
        <div>
          {/* ChatGPT-style input box */}
          <div style={{ 
            padding: '0.5rem', 
            backgroundColor: 'var(--bg-secondary)', 
            borderRadius: '0.5rem',
            border: '1px solid var(--bg-tertiary)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <textarea
                  placeholder="Message AgroX..."
                  rows={1}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '0.375rem',
                    color: 'var(--text-primary)',
                    fontSize: '0.8rem',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    outline: 'none',
                    resize: 'none',
                    minHeight: '1.25rem',
                    maxHeight: '4rem',
                    lineHeight: '1.4'
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = target.scrollHeight + 'px';
                  }}
                />
              </div>
              <button
                style={{
                  width: '1.75rem',
                  height: '1.75rem',
                  backgroundColor: 'var(--accent-green)',
                  border: 'none',
                  borderRadius: '0.25rem',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = '#00a370';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = 'var(--accent-green)';
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m22 2-7 20-4-9-9-4Z"/>
                  <path d="M22 2 11 13"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Areas defined:</span>
            <span style={{ fontWeight: '500' }}>{farmBoundaries.length}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Total area:</span>
            <span style={{ fontWeight: '500' }}>{totalArea.toFixed(2)} hectares</span>
          </div>
          
          {analysisResults && (
            <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--bg-tertiary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>NDVI:</span>
                <span style={{ fontWeight: '500' }}>{analysisResults.ndvi.toFixed(3)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Soil type:</span>
                <span style={{ fontWeight: '500' }}>{analysisResults.soilType}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
