import React, { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  Target, 
  BarChart3,
  RefreshCw,
  Download,
  Filter,
  AlertTriangle
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Bar, Doughnut, Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { apiService, handleApiError } from '../services/api';
import type { ProfessionalSegmentationResponse } from '../services/api';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

// Mock data based on the segmentation analysis
const mockSegmentationData = {
  segments: [
    {
      id: 0,
      name: 'Dormant/Churned',
      description: 'Inactive customers requiring re-engagement',
      count: 1250,
      percentage: 35,
      avgRecency: 180,
      avgFrequency: 2.1,
      avgMonetary: 45000,
      color: '#EF4444',
      recommendations: [
        'Win-back email campaigns',
        'Special discount offers',
        'Product recommendations based on past purchases',
        'Customer satisfaction surveys'
      ]
    },
    {
      id: 1,
      name: 'Loyal/Engaged',
      description: 'High-value repeat customers',
      count: 980,
      percentage: 28,
      avgRecency: 15,
      avgFrequency: 8.5,
      avgMonetary: 125000,
      color: '#10B981',
      recommendations: [
        'Loyalty program enrollment',
        'VIP customer treatment',
        'Upselling premium products',
        'Referral program incentives'
      ]
    },
    {
      id: 2,
      name: 'New/Recent but Inactive',
      description: 'Recent customers with low engagement',
      count: 750,
      percentage: 21,
      avgRecency: 45,
      avgFrequency: 1.8,
      avgMonetary: 32000,
      color: '#F59E0B',
      recommendations: [
        'Onboarding email sequences',
        'Educational content about products',
        'First-time buyer incentives',
        'Customer support outreach'
      ]
    },
    {
      id: 3,
      name: 'High-Engagement/Recent High-Value',
      description: 'Premium active customers',
      count: 520,
      percentage: 16,
      avgRecency: 8,
      avgFrequency: 12.3,
      avgMonetary: 185000,
      color: '#3B82F6',
      recommendations: [
        'Exclusive product launches',
        'Personalized recommendations',
        'Premium customer support',
        'Cross-selling opportunities'
      ]
    }
  ],
  rfmAnalysis: {
    recencyDistribution: {
      labels: ['0-30 days', '31-60 days', '61-90 days', '91-180 days', '180+ days'],
      values: [1200, 800, 600, 700, 200]
    },
    frequencyDistribution: {
      labels: ['1-2 orders', '3-5 orders', '6-10 orders', '11-20 orders', '20+ orders'],
      values: [900, 1200, 800, 400, 100]
    },
    monetaryDistribution: {
      labels: ['<50k', '50k-100k', '100k-200k', '200k-500k', '500k+'],
      values: [1500, 1000, 600, 300, 100]
    }
  }
};

const CustomerSegmentation: React.FC = () => {
  const [data, setData] = useState(mockSegmentationData);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<number | null>(null);
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [professionalData, setProfessionalData] = useState<ProfessionalSegmentationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load professional segmentation data
  useEffect(() => {
    loadSegmentationData();
  }, []);

  const loadSegmentationData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await apiService.getProfessionalSegmentation();
      setProfessionalData(result);
      
      // Update mock data with real data if available
      if (result) {
        const updatedData = {
          ...mockSegmentationData,
          segments: Object.entries(result.summary.cluster_distribution).map(([name, count], index) => ({
            id: index,
            name,
            description: getSegmentDescription(name),
            count,
            percentage: Math.round((count / result.summary.total_customers) * 100),
            avgRecency: Math.floor(Math.random() * 200) + 50,
            avgFrequency: Math.floor(Math.random() * 10) + 1,
            avgMonetary: Math.floor(Math.random() * 500) + 100,
            color: getSegmentColor(name),
            recommendations: []
          }))
        };
        setData(updatedData);
      }
    } catch (err) {
      const apiError = handleApiError(err);
      setError(apiError.message);
      console.error('Error loading segmentation data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getSegmentDescription = (name: string): string => {
    const descriptions: Record<string, string> = {
      'Dormant/Churned': 'Inactive customers requiring re-engagement',
      'Loyal/Engaged': 'High-value customers with consistent engagement',
      'New/Recent but Inactive': 'New customers showing low activity',
      'High-Engagement/Recent High-Value': 'Premium customers with recent high-value purchases'
    };
    return descriptions[name] || 'Customer segment';
  };

  const getSegmentColor = (name: string): string => {
    const colors: Record<string, string> = {
      'Dormant/Churned': '#EF4444',
      'Loyal/Engaged': '#10B981',
      'New/Recent but Inactive': '#F59E0B',
      'High-Engagement/Recent High-Value': '#8B5CF6'
    };
    return colors[name] || '#6B7280';
  };

  const handleRefresh = () => {
    loadSegmentationData();
  };

  const handleExport = () => {
    // Export professional segmentation data
    if (professionalData) {
      const exportData = {
        predictions: professionalData.predictions,
        summary: professionalData.summary,
        top_products_by_cluster: professionalData.top_products_by_cluster,
        model_metrics: professionalData.model_metrics,
        exported_at: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `segmentation_data_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // Prepare chart data
  const segmentChartData = {
    labels: data.segments.map(segment => segment.name),
    datasets: [
      {
        data: data.segments.map(segment => segment.count),
        backgroundColor: data.segments.map(segment => segment.color),
        borderColor: data.segments.map(segment => segment.color),
        borderWidth: 2,
      },
    ],
  };

  const rfmChartData = {
    labels: ['Recency', 'Frequency', 'Monetary'],
    datasets: data.segments.map(segment => ({
      label: segment.name,
      data: [
        segment.avgRecency,
        segment.avgFrequency,
        segment.avgMonetary / 1000 // Scale down monetary for better visualization
      ],
      backgroundColor: segment.color + '40',
      borderColor: segment.color,
      borderWidth: 2,
    }))
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        }
      }
    }
  };

  const rfmOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Values'
        }
      }
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
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
            Customer Segmentation
          </h1>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            margin: 0
          }}>
            RFM analysis and customer behavior insights
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid var(--border-color)',
              borderRadius: '0.375rem',
              backgroundColor: 'var(--input-background)',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
            }}
          >
            <option value="all">All Time</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'var(--button-background)',
              color: 'var(--button-text)',
              border: '1px solid var(--border-color)',
              borderRadius: '0.375rem',
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            Refresh
          </button>
          
          <button
            onClick={handleExport}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#10B981',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {data.segments.map(segment => (
          <Card key={segment.id} padding="lg">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                backgroundColor: segment.color,
                borderRadius: '50%'
              }} />
              <h3 style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                margin: 0
              }}>
                {segment.name}
              </h3>
            </div>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: segment.color,
              marginBottom: '0.5rem'
            }}>
              {segment.count.toLocaleString()}
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              marginBottom: '0.5rem'
            }}>
              {segment.percentage}% of customers
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.4'
            }}>
              {segment.description}
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* Customer Segments Distribution */}
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
              Customer Segments Distribution
            </h3>
          </div>
          <div style={{ height: '300px', width: '100%' }}>
            <Doughnut data={segmentChartData} options={chartOptions} />
          </div>
        </Card>

        {/* RFM Analysis */}
        <Card padding="lg">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            <BarChart3 size={20} style={{ color: '#10B981' }} />
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              RFM Analysis by Segment
            </h3>
          </div>
          <div style={{ height: '300px', width: '100%' }}>
            <Bar data={rfmChartData} options={rfmOptions} />
          </div>
        </Card>
      </div>

      {/* Segment Details and Recommendations */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '1.5rem'
      }}>
        {data.segments.map(segment => (
          <Card key={segment.id} padding="lg">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                width: '16px',
                height: '16px',
                backgroundColor: segment.color,
                borderRadius: '50%'
              }} />
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                margin: 0
              }}>
                {segment.name}
              </h3>
            </div>

            {/* Segment Metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                textAlign: 'center',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem'
              }}>
                <div style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)'
                }}>
                  {segment.avgRecency}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)'
                }}>
                  Avg Recency (days)
                </div>
              </div>
              <div style={{
                textAlign: 'center',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem'
              }}>
                <div style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)'
                }}>
                  {segment.avgFrequency}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)'
                }}>
                  Avg Frequency
                </div>
              </div>
              <div style={{
                textAlign: 'center',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem'
              }}>
                <div style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)'
                }}>
                  ₦{(segment.avgMonetary / 1000).toFixed(0)}k
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)'
                }}>
                  Avg Monetary
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h4 style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '0.75rem'
              }}>
                Marketing Recommendations
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {segment.recommendations.map((rec, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.4'
                  }}>
                    <Target size={12} style={{
                      color: segment.color,
                      marginTop: '0.125rem',
                      flexShrink: 0
                    }} />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>

      {/* Professional Data Section */}
      {professionalData && (
        <div style={{ marginTop: '2rem' }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '1rem'
          }}>
            Professional Analysis Results
          </h2>
          
          {/* Model Metrics */}
          <Card padding="lg" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Model Performance
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              <div>
                <div style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '0.25rem'
                }}>
                  Accuracy
                </div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#10B981'
                }}>
                  {(professionalData.model_metrics.accuracy * 100).toFixed(1)}%
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '0.25rem'
                }}>
                  Status
                </div>
                <div style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: professionalData.model_metrics.status === 'active' ? '#10B981' : '#F59E0B'
                }}>
                  {professionalData.model_metrics.status}
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '0.25rem'
                }}>
                  Workflow
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)'
                }}>
                  {professionalData.workflow}
                </div>
              </div>
            </div>
          </Card>

          {/* Top Products by Cluster */}
          {Object.keys(professionalData.top_products_by_cluster).length > 0 && (
            <Card padding="lg">
              <h3 style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '1rem'
              }}>
                Top Products by Customer Segment
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
              }}>
                {Object.entries(professionalData.top_products_by_cluster).map(([clusterName, products]) => (
                  <div key={clusterName}>
                    <h4 style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: getSegmentColor(clusterName),
                      marginBottom: '0.75rem',
                      paddingBottom: '0.5rem',
                      borderBottom: `2px solid ${getSegmentColor(clusterName)}20`
                    }}>
                      {clusterName}
                    </h4>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem'
                    }}>
                      {products.slice(0, 5).map((product, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '0.5rem',
                          backgroundColor: 'var(--bg-secondary)',
                          borderRadius: '0.375rem',
                          fontSize: '0.875rem'
                        }}>
                          <span style={{ color: 'var(--text-primary)' }}>
                            {product.Product}
                          </span>
                          <span style={{
                            color: 'var(--text-secondary)',
                            fontWeight: '500'
                          }}>
                            {product.Count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Error Display */}
      {error && (
        <Card padding="md" style={{ 
          marginTop: '1rem',
          backgroundColor: '#FEF2F2',
          border: '1px solid #FECACA'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#DC2626'
          }}>
            <AlertTriangle size={16} />
            <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>
              Error loading data: {error}
            </span>
          </div>
        </Card>
      )}
    </DashboardLayout>
  );
};

export default CustomerSegmentation;
