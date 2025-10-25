import React, { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  Target, 
  Eye,
  ArrowRight,
  BarChart3,
  Activity,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';

// Mock data for Customer Intelligence Dashboard Overview
const mockDashboardData = {
  overview: {
    totalCustomers: 3500,
    segments: 6,
    retentionRate: 60,
    avgLifetimeValue: 125000,
    recommendations: 450,
    insights: 12
  },
  quickStats: [
    {
      title: 'Customer Segments',
      value: '6',
      description: 'Active segments identified',
      icon: Users,
      color: '#3B82F6',
      path: '/dashboard/segmentation'
    },
    {
      title: 'Retention Rate',
      value: '60%',
      description: 'Customers returning',
      icon: TrendingUp,
      color: '#10B981',
      path: '/dashboard/retention'
    },
    {
      title: 'Recommendations',
      value: '450',
      description: 'AI-powered suggestions',
      icon: Target,
      color: '#F59E0B',
      path: '/dashboard/recommendations'
    },
    {
      title: 'Insights Generated',
      value: '12',
      description: 'AI insights available',
      icon: Eye,
      color: '#8B5CF6',
      path: '/dashboard/insights'
    }
  ],
  recentInsights: [
    {
      id: 1,
      type: 'opportunity',
      title: 'High-Value Customer Growth',
      description: 'Champions segment shows 25% growth potential with targeted campaigns',
      confidence: 0.85,
      impact: 'High'
    },
    {
      id: 2,
      type: 'warning',
      title: 'At-Risk Customer Alert',
      description: '550 customers showing declining engagement patterns',
      confidence: 0.92,
      impact: 'Medium'
    },
    {
      id: 3,
      type: 'insight',
      title: 'Peak Purchase Hours',
      description: '6 PM shows highest purchase activity - optimize campaigns',
      confidence: 0.95,
      impact: 'Low'
    }
  ],
  topSegments: [
    {
      name: 'Champions',
      count: 450,
      percentage: 12.9,
      avgLifetimeValue: 250000,
      color: '#10B981'
    },
    {
      name: 'Loyal Customers',
      count: 800,
      percentage: 22.9,
      avgLifetimeValue: 180000,
      color: '#3B82F6'
    },
    {
      name: 'At Risk',
      count: 550,
      percentage: 15.7,
      avgLifetimeValue: 95000,
      color: '#EF4444'
    }
  ],
  systemStatus: {
    models: {
      segmentation: { status: 'active', accuracy: 0.89 },
      retention: { status: 'active', accuracy: 0.85 },
      recommendations: { status: 'training', accuracy: 0.78 }
    },
    lastUpdate: '2024-01-15 14:30',
    nextUpdate: '2024-01-16 02:00'
  }
};

const Dashboard: React.FC = () => {
  const [data] = useState(mockDashboardData);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get user info from localStorage
  const userName = localStorage.getItem('userName') || 'User';

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '400px' 
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem',
            color: 'var(--text-secondary)'
          }}>
            <Activity className="animate-spin" size={20} />
            <span>Loading dashboard...</span>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Dashboard Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'var(--text-primary)',
            margin: 0,
            marginBottom: '0.25rem'
          }}>
            Customer Intelligence Dashboard
          </h1>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            margin: 0
          }}>
            Welcome back, {userName.split(' ')[0]}! Here's your customer intelligence overview.
          </p>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-color)',
          borderRadius: '0.375rem',
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
          alignSelf: 'flex-start'
        }}>
          <Activity size={14} />
          <span>Last updated: {data.systemStatus.lastUpdate}</span>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <Card padding="md">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.75rem'
          }}>
            <Users size={18} style={{ color: '#3B82F6' }} />
            <h3 style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Total Customers
            </h3>
          </div>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#3B82F6',
            marginBottom: '0.25rem'
          }}>
            {data.overview.totalCustomers.toLocaleString()}
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--text-secondary)'
          }}>
            Active customer base
          </div>
        </Card>

        <Card padding="md">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.75rem'
          }}>
            <BarChart3 size={18} style={{ color: '#10B981' }} />
            <h3 style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Avg Lifetime Value
            </h3>
          </div>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#10B981',
            marginBottom: '0.25rem'
          }}>
            ₦{(data.overview.avgLifetimeValue / 1000).toFixed(0)}k
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--text-secondary)'
          }}>
            Per customer
          </div>
        </Card>

        <Card padding="md">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.75rem'
          }}>
            <Target size={18} style={{ color: '#F59E0B' }} />
            <h3 style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Active Models
            </h3>
          </div>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#F59E0B',
            marginBottom: '0.25rem'
          }}>
            {Object.values(data.systemStatus.models).filter(model => model.status === 'active').length}
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--text-secondary)'
          }}>
            ML models running
          </div>
        </Card>

        <Card padding="md">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.75rem'
          }}>
            <Eye size={18} style={{ color: '#8B5CF6' }} />
            <h3 style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              AI Insights
            </h3>
          </div>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#8B5CF6',
            marginBottom: '0.25rem'
          }}>
            {data.overview.insights}
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--text-secondary)'
          }}>
            Generated insights
          </div>
        </Card>
      </div>

      {/* Quick Navigation Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '0.75rem',
        marginBottom: '1.5rem'
      }}>
        {data.quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              onClick={() => window.location.href = stat.path}
              style={{
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Card 
                padding="md"
                style={{
                  border: '1px solid var(--border-color)',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <div style={{
                    padding: '0.5rem',
                    backgroundColor: `${stat.color}20`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={20} style={{ color: stat.color }} />
                  </div>
                  
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: stat.color,
                    marginBottom: '0.25rem'
                  }}>
                    {stat.value}
                  </div>
                  
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      margin: 0,
                      marginBottom: '0.25rem'
                    }}>
                      {stat.title}
                    </h3>
                    <p style={{
                      fontSize: '0.625rem',
                      color: 'var(--text-secondary)',
                      margin: 0,
                      lineHeight: '1.2'
                    }}>
                      {stat.description}
                    </p>
                  </div>
                  
                  <ArrowRight size={12} style={{ color: 'var(--text-secondary)' }} />
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Recent Insights and Top Segments */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        {/* Recent AI Insights */}
        <Card padding="lg">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            <Eye size={20} style={{ color: '#8B5CF6' }} />
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Recent AI Insights
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {data.recentInsights.map((insight) => (
              <div key={insight.id} style={{
                padding: '1rem',
                backgroundColor: 'var(--card-background)',
                border: '1px solid var(--border-color)',
                borderRadius: '0.5rem',
                borderLeft: `4px solid ${
                  insight.type === 'opportunity' ? '#10B981' :
                  insight.type === 'warning' ? '#EF4444' : '#3B82F6'
                }`
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '0.5rem'
                }}>
                  <h4 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    margin: 0
                  }}>
                    {insight.title}
                  </h4>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: insight.impact === 'High' ? '#EF4444' :
                                     insight.impact === 'Medium' ? '#F59E0B' : '#10B981'
                    }} />
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: 'var(--text-secondary)'
                    }}>
                      {insight.impact}
                    </span>
                  </div>
                </div>
                <p style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                  margin: 0,
                  marginBottom: '0.5rem',
                  lineHeight: '1.4'
                }}>
                  {insight.description}
                </p>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)'
                }}>
                  Confidence: {(insight.confidence * 100).toFixed(0)}%
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Customer Segments */}
        <Card padding="lg">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            <Users size={20} style={{ color: '#3B82F6' }} />
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Top Customer Segments
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {data.topSegments.map((segment, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                backgroundColor: 'var(--card-background)',
                border: '1px solid var(--border-color)',
                borderRadius: '0.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: segment.color
                  }} />
                  <div>
                    <h4 style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      margin: 0,
                      marginBottom: '0.25rem'
                    }}>
                      {segment.name}
                    </h4>
                    <p style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-secondary)',
                      margin: 0
                    }}>
                      {segment.count.toLocaleString()} customers ({segment.percentage}%)
                    </p>
                  </div>
                </div>
                <div style={{
                  textAlign: 'right'
                }}>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)'
                  }}>
                    ₦{(segment.avgLifetimeValue / 1000).toFixed(0)}k
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)'
                  }}>
                    Avg LTV
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* System Status */}
      <Card padding="lg">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          <Activity size={20} style={{ color: '#10B981' }} />
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            margin: 0
          }}>
            System Status
          </h3>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '0.75rem'
        }}>
          {Object.entries(data.systemStatus.models).map(([modelName, model]) => (
            <div key={modelName} style={{
              padding: '1rem',
              backgroundColor: 'var(--card-background)',
              border: '1px solid var(--border-color)',
              borderRadius: '0.5rem',
              textAlign: 'center'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}>
                {model.status === 'active' ? (
                  <CheckCircle size={16} style={{ color: '#10B981' }} />
                ) : (
                  <AlertTriangle size={16} style={{ color: '#F59E0B' }} />
                )}
                <span style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  textTransform: 'capitalize'
                }}>
                  {modelName}
                </span>
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                marginBottom: '0.25rem'
              }}>
                Accuracy: {(model.accuracy * 100).toFixed(0)}%
              </div>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: '600',
                color: model.status === 'active' ? '#10B981' : '#F59E0B'
              }}>
                {model.status === 'active' ? 'Active' : 'Training'}
              </div>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
          textAlign: 'center'
        }}>
          Next model update: {data.systemStatus.nextUpdate}
      </div>
      </Card>
    </DashboardLayout>
  );
};

export default Dashboard;
