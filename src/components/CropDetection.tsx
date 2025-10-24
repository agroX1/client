import React from 'react';
import { BarChart3, Eye, Target, TrendingUp } from 'lucide-react';

interface CropDetectionProps {
  analysisResults?: any;
}

export const CropDetection: React.FC<CropDetectionProps> = ({ analysisResults }) => {
  const mockCropDetection = {
    detectedCrops: [
      { name: 'Maize', confidence: 0.85, area: '2.3 hectares' },
      { name: 'Cassava', confidence: 0.72, area: '1.8 hectares' },
      { name: 'Yam', confidence: 0.68, area: '1.2 hectares' }
    ],
    totalArea: '5.3 hectares',
    detectionDate: new Date().toISOString()
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-primary)', borderRadius: '0.75rem', border: '1px solid var(--bg-tertiary)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <div style={{ 
          width: '48px', 
          height: '48px', 
          backgroundColor: 'rgba(59, 130, 246, 0.1)', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <Eye size={24} style={{ color: '#3B82F6' }} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
            Crop Detection
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
            AI-powered crop identification and area estimation
          </p>
        </div>
      </div>

      {analysisResults ? (
        <div>
          {/* Detection Summary */}
          <div style={{ 
            padding: '1.5rem', 
            backgroundColor: 'var(--bg-secondary)', 
            borderRadius: '0.75rem', 
            border: '1px solid var(--bg-tertiary)',
            marginBottom: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Target size={20} style={{ color: '#3B82F6' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                Detection Summary
              </h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Total Area</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#3B82F6' }}>
                  {mockCropDetection.totalArea}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Crops Detected</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#3B82F6' }}>
                  {mockCropDetection.detectedCrops.length}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Detection Date</div>
                <div style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {new Date(mockCropDetection.detectionDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          {/* Detected Crops */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Detected Crops
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {mockCropDetection.detectedCrops.map((crop, index) => (
                <div key={index} style={{ 
                  padding: '1rem', 
                  backgroundColor: 'var(--bg-secondary)', 
                  borderRadius: '0.5rem', 
                  border: '1px solid var(--bg-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      backgroundColor: 'rgba(59, 130, 246, 0.1)', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      <BarChart3 size={20} style={{ color: '#3B82F6' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                        {crop.name}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        Area: {crop.area}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1rem', fontWeight: '600', color: '#10B981' }}>
                      {(crop.confidence * 100).toFixed(0)}%
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      Confidence
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detection Insights */}
          <div style={{ 
            padding: '1.5rem', 
            backgroundColor: 'rgba(59, 130, 246, 0.05)', 
            borderRadius: '0.75rem', 
            border: '1px solid rgba(59, 130, 246, 0.1)' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <TrendingUp size={20} style={{ color: '#3B82F6' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#3B82F6', margin: 0 }}>
                Detection Insights
              </h3>
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '0.75rem' }}>
                <strong>High Confidence Detection:</strong> Maize crops show strong spectral signatures with 85% confidence, indicating healthy growth patterns.
              </p>
              <p style={{ marginBottom: '0.75rem' }}>
                <strong>Mixed Crop Areas:</strong> Cassava and Yam detection suggests intercropping practices, which is beneficial for soil health and yield optimization.
              </p>
              <p>
                <strong>Recommendation:</strong> Consider implementing precision agriculture techniques in the maize-dominated areas for optimal resource utilization.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            backgroundColor: 'rgba(59, 130, 246, 0.1)', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 1.5rem'
          }}>
            <Eye size={40} style={{ color: '#3B82F6' }} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Crop Detection Ready
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
            Run multispectral analysis first to enable AI-powered crop detection and identification.
          </p>
          <button
            onClick={() => window.location.href = '#multispectral'}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3B82F6',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.backgroundColor = '#2563EB';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = '#3B82F6';
            }}
          >
            Run Analysis First
          </button>
        </div>
      )}
    </div>
  );
};
