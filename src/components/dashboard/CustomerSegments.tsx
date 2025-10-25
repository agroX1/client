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
  const getSegmentColor = (segmentId: number, segmentName: string) => {
    // Dynamic color assignment based on segment characteristics
    const colorMap: Record<string, string> = {
      'Dormant/Churned': 'var(--accent-red)',
      'Loyal/Engaged': 'var(--accent-green)', 
      'New/Recent but Inactive': '#F59E0B',
      'High-Engagement/Recent High-Value': '#3B82F6',
      'High-Value': '#8B5CF6',
      'Low-Value': '#6B7280',
      'Recent': '#06B6D4',
      'Engaged': '#10B981',
      'Inactive': '#EF4444',
      'Moderate': '#F59E0B'
    };
    
    // Try to match by full name first, then by keywords
    if (colorMap[segmentName]) {
      return colorMap[segmentName];
    }
    
    // Fallback to keyword matching
    if (segmentName.includes('Dormant') || segmentName.includes('Churned')) {
      return 'var(--accent-red)';
    } else if (segmentName.includes('Loyal') || segmentName.includes('Engaged')) {
      return 'var(--accent-green)';
    } else if (segmentName.includes('High-Value') || segmentName.includes('High-Engagement')) {
      return '#3B82F6';
    } else if (segmentName.includes('New') || segmentName.includes('Recent')) {
      return '#F59E0B';
    }
    
    // Default color assignment based on segment ID
    const colors = [
      'var(--accent-red)', 'var(--accent-green)', '#F59E0B', '#3B82F6', 
      '#8B5CF6', '#06B6D4', '#EF4444', '#10B981'
    ];
    return colors[segmentId % colors.length];
  };

  const getSegmentIcon = (segmentId: number, segmentName: string) => {
    // Dynamic icon assignment based on segment characteristics
    if (segmentName.includes('Dormant') || segmentName.includes('Churned')) {
      return Clock;
    } else if (segmentName.includes('Loyal') || segmentName.includes('Engaged')) {
      return Users;
    } else if (segmentName.includes('High-Value') || segmentName.includes('High-Engagement')) {
      return DollarSign;
    } else if (segmentName.includes('New') || segmentName.includes('Recent')) {
      return TrendingUp;
    }
    
    // Default icon assignment based on segment ID
    const icons = [Clock, Users, TrendingUp, DollarSign, Users, Clock, TrendingUp, DollarSign];
    return icons[segmentId % icons.length];
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
          const Icon = getSegmentIcon(segment.id, segment.name);
          const color = getSegmentColor(segment.id, segment.name);
          
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
