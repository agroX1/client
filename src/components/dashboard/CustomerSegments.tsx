import React from 'react';
import { Users, TrendingUp, Clock, DollarSign } from 'lucide-react';

interface CustomerSegment {
  id: number;
  name: string;
  count: number;
  percentage: number;
  avgRevenue: number;
  lastPurchase: string;
  recommendations: string[];
}

interface CustomerSegmentsProps {
  segments: CustomerSegment[];
}

export const CustomerSegments: React.FC<CustomerSegmentsProps> = ({ segments }) => {
  const getSegmentColor = (segmentId: number) => {
    switch (segmentId) {
      case 0: return 'var(--accent-red)'; // Dormant/Churned
      case 1: return 'var(--accent-green)'; // Loyal/Engaged
      case 2: return '#F59E0B'; // New/Recent but Inactive
      case 3: return '#3B82F6'; // High-Engagement/Recent High-Value
      default: return 'var(--text-secondary)';
    }
  };

  const getSegmentIcon = (segmentId: number) => {
    switch (segmentId) {
      case 0: return Clock;
      case 1: return Users;
      case 2: return TrendingUp;
      case 3: return DollarSign;
      default: return Users;
    }
  };

  return (
    <div style={{ 
      backgroundColor: 'var(--bg-primary)', 
      borderRadius: '0.75rem', 
      padding: '1.5rem',
      border: '1px solid var(--border-color)'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: '1.5rem' 
      }}>
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '600', 
          color: 'var(--text-primary)' 
        }}>
          Customer Segments
        </h3>
        <div style={{ 
          backgroundColor: 'var(--accent-blue)', 
          color: 'white', 
          padding: '0.25rem 0.75rem', 
          borderRadius: '0.375rem',
          fontSize: '0.75rem',
          fontWeight: '500'
        }}>
          {segments.length} Segments
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {segments.map((segment) => {
          const Icon = getSegmentIcon(segment.id);
          const color = getSegmentColor(segment.id);
          
          return (
            <div key={segment.id} style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '0.75rem', 
              padding: '0.75rem',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '0.5rem',
              border: `1px solid ${color}20`
            }}>
              <div style={{ 
                padding: '0.25rem', 
                backgroundColor: `${color}20`, 
                borderRadius: '0.25rem',
                color: color,
                flexShrink: 0
              }}>
                <Icon size={16} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  marginBottom: '0.5rem' 
                }}>
                  <div>
                    <h4 style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: '500', 
                      color: 'var(--text-primary)', 
                      marginBottom: '0.125rem',
                      lineHeight: 1.4
                    }}>
                      {segment.name}
                    </h4>
                    <p style={{ 
                      fontSize: '0.75rem', 
                      color: 'var(--text-secondary)' 
                    }}>
                      {segment.count} customers ({segment.percentage}%)
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: '500', 
                      color: 'var(--text-primary)' 
                    }}>
                      ₵{segment.avgRevenue}
                    </p>
                    <p style={{ 
                      fontSize: '0.625rem', 
                      color: 'var(--text-tertiary)' 
                    }}>
                      Avg Revenue
                    </p>
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  marginBottom: '0.5rem' 
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem' 
                  }}>
                    <Clock size={12} style={{ color: 'var(--text-tertiary)' }} />
                    <span style={{ 
                      fontSize: '0.75rem', 
                      color: 'var(--text-secondary)' 
                    }}>
                      Last Purchase: {segment.lastPurchase}
                    </span>
                  </div>
                  <div style={{ 
                    backgroundColor: `${color}20`, 
                    color: color, 
                    padding: '0.125rem 0.5rem', 
                    borderRadius: '0.25rem',
                    fontSize: '0.625rem',
                    fontWeight: '500'
                  }}>
                    Cluster {segment.id}
                  </div>
                </div>
                
                <div>
                  <h5 style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: '500', 
                    color: 'var(--text-primary)', 
                    marginBottom: '0.375rem' 
                  }}>
                    Recommended Actions:
                  </h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {segment.recommendations.map((recommendation, index) => (
                      <div key={index} style={{ 
                        fontSize: '0.75rem', 
                        color: 'var(--text-secondary)', 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        gap: '0.5rem',
                        lineHeight: 1.4
                      }}>
                        <span style={{ 
                          color: 'var(--accent-green)', 
                          marginTop: '0.125rem',
                          flexShrink: 0
                        }}>
                          •
                        </span>
                        {recommendation}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
