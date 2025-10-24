import React from 'react';
import { BarChart3 } from 'lucide-react';
import { Card } from '../ui/Card';

interface CropRecommendation {
  crop: string;
  suitability: number;
  reason: string;
}

interface CropRecommendationsProps {
  recommendations: CropRecommendation[];
}

export const CropRecommendations: React.FC<CropRecommendationsProps> = ({ recommendations }) => {
  return (
    <Card padding="lg">
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem', 
        marginBottom: '1.5rem' 
      }}>
        <BarChart3 size={20} style={{ color: 'var(--accent-green)' }} />
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: '600', 
          color: 'var(--text-primary)' 
        }}>
          Crop Recommendations
        </h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {recommendations.map((crop, index) => (
          <div key={index} style={{ 
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
                {crop.crop}
              </h4>
              <p style={{ 
                fontSize: '0.7rem', 
                color: 'var(--text-secondary)',
                lineHeight: '1.4'
              }}>
                {crop.reason}
              </p>
            </div>
            <div style={{ 
              fontSize: '1rem', 
              fontWeight: 'bold', 
              color: 'var(--accent-green)',
              flexShrink: 0
            }}>
              {crop.suitability}%
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
