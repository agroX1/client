import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  CheckCircle,
  RefreshCw,
  Download,
  Filter,
  Eye,
  BarChart3
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
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

// Mock data based on retention analysis
const mockRetentionData = {
  overallMetrics: {
    totalCustomers: 3500,
    returningCustomers: 2100,
    retentionRate: 60,
    churnRate: 40,
    avgLifetimeValue: 125000,
    avgDaysToReturn: 45
  },
  retentionTrends: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    retentionRates: [55, 58, 62, 59, 65, 68, 70, 67, 72, 75, 73, 60],
    churnRates: [45, 42, 38, 41, 35, 32, 30, 33, 28, 25, 27, 40]
  },
  customerCohorts: [
    {
      cohort: 'Q1 2024',
      customers: 800,
      retentionRate: 65,
      avgLifetimeValue: 135000,
      status: 'stable'
    },
    {
      cohort: 'Q2 2024',
      customers: 950,
      retentionRate: 72,
      avgLifetimeValue: 142000,
      status: 'improving'
    },
    {
      cohort: 'Q3 2024',
      customers: 1100,
      retentionRate: 68,
      avgLifetimeValue: 128000,
      status: 'stable'
    },
    {
      cohort: 'Q4 2024',
      customers: 650,
      retentionRate: 45,
      avgLifetimeValue: 95000,
      status: 'declining'
    }
  ],
  riskSegments: [
    {
      segment: 'High Risk',
      count: 450,
      percentage: 12.9,
      avgDaysSinceLastPurchase: 120,
      avgOrderValue: 25000,
      color: '#EF4444'
    },
    {
      segment: 'Medium Risk',
      count: 800,
      percentage: 22.9,
      avgDaysSinceLastPurchase: 75,
      avgOrderValue: 45000,
      color: '#F59E0B'
    },
    {
      segment: 'Low Risk',
      count: 2250,
      percentage: 64.2,
      avgDaysSinceLastPurchase: 25,
      avgOrderValue: 85000,
      color: '#10B981'
    }
  ],
  predictions: [
    {
      customerId: 'CUST001',
      customerName: 'John Asante',
      lastPurchaseDate: '2024-01-15',
      daysSinceLastPurchase: 30,
      predictedReturnProbability: 0.85,
      riskLevel: 'Low',
      recommendedAction: 'Send product recommendations'
    },
    {
      customerId: 'CUST002',
      customerName: 'Mary Mensah',
      lastPurchaseDate: '2023-12-10',
      daysSinceLastPurchase: 75,
      predictedReturnProbability: 0.35,
      riskLevel: 'High',
      recommendedAction: 'Send win-back campaign'
    },
    {
      customerId: 'CUST003',
      customerName: 'Kwame Boateng',
      lastPurchaseDate: '2024-01-20',
      daysSinceLastPurchase: 25,
      predictedReturnProbability: 0.92,
      riskLevel: 'Low',
      recommendedAction: 'Upsell premium products'
    }
  ]
};

const CustomerRetention: React.FC = () => {
  const [data, setData] = useState(mockRetentionData);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('12m');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all');

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleExport = () => {
    console.log('Exporting retention data...');
  };

  // Prepare chart data
  const retentionTrendData = {
    labels: data.retentionTrends.labels,
    datasets: [
      {
        label: 'Retention Rate (%)',
        data: data.retentionTrends.retentionRates,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        yAxisID: 'y',
      },
      {
        label: 'Churn Rate (%)',
        data: data.retentionTrends.churnRates,
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        yAxisID: 'y',
      }
    ]
  };

  const riskSegmentData = {
    labels: data.riskSegments.map(segment => segment.segment),
    datasets: [
      {
        data: data.riskSegments.map(segment => segment.count),
        backgroundColor: data.riskSegments.map(segment => segment.color),
        borderColor: data.riskSegments.map(segment => segment.color),
        borderWidth: 2,
      }
    ]
  };

  const cohortData = {
    labels: data.customerCohorts.map(cohort => cohort.cohort),
    datasets: [
      {
        label: 'Retention Rate (%)',
        data: data.customerCohorts.map(cohort => cohort.retentionRate),
        backgroundColor: '#3B82F6',
        borderColor: '#1D4ED8',
        borderWidth: 1,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      }
    }
  };

  const retentionOptions = {
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
        max: 100,
        ticks: {
          callback: function(value: any) {
            return value + '%';
          }
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
            Customer Retention Analysis
          </h1>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            margin: 0
          }}>
            Predict customer behavior and improve retention rates
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid var(--border-color)',
              borderRadius: '0.375rem',
              backgroundColor: 'var(--input-background)',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
            }}
          >
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="12m">Last 12 Months</option>
            <option value="all">All Time</option>
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
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
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#3B82F6',
            marginBottom: '0.25rem'
          }}>
            {data.overallMetrics.totalCustomers.toLocaleString()}
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
            <CheckCircle size={18} style={{ color: '#10B981' }} />
            <h3 style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Retention Rate
            </h3>
          </div>
          <div style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#10B981',
            marginBottom: '0.25rem'
          }}>
            {data.overallMetrics.retentionRate}%
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--text-secondary)'
          }}>
            Customers returning
          </div>
        </Card>

        <Card padding="md">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.75rem'
          }}>
            <AlertTriangle size={18} style={{ color: '#EF4444' }} />
            <h3 style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Churn Rate
            </h3>
          </div>
          <div style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#EF4444',
            marginBottom: '0.25rem'
          }}>
            {data.overallMetrics.churnRate}%
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--text-secondary)'
          }}>
            Customers lost
          </div>
        </Card>

        <Card padding="md">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.75rem'
          }}>
            <TrendingUp size={18} style={{ color: '#F59E0B' }} />
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
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#F59E0B',
            marginBottom: '0.25rem'
          }}>
            ₦{(data.overallMetrics.avgLifetimeValue / 1000).toFixed(0)}k
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--text-secondary)'
          }}>
            Per customer
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* Retention Trends */}
        <Card padding="lg">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            <TrendingUp size={20} style={{ color: '#3B82F6' }} />
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Retention Trends
            </h3>
          </div>
          <div style={{ height: '250px', width: '100%' }}>
            <Line data={retentionTrendData} options={retentionOptions} />
          </div>
        </Card>

        {/* Risk Segments */}
        <Card padding="lg">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            <AlertTriangle size={20} style={{ color: '#EF4444' }} />
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Customer Risk Segments
            </h3>
          </div>
          <div style={{ height: '250px', width: '100%' }}>
            <Doughnut data={riskSegmentData} options={chartOptions} />
          </div>
        </Card>
      </div>

      {/* Cohort Analysis */}
      <Card padding="lg" style={{ marginBottom: '2rem' }}>
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
            Cohort Analysis
          </h3>
        </div>
        <div style={{ height: '250px', width: '100%' }}>
          <Bar data={cohortData} options={chartOptions} />
        </div>
      </Card>

      {/* Customer Predictions Table */}
      <Card padding="lg">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Eye size={20} style={{ color: '#3B82F6' }} />
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Customer Return Predictions
            </h3>
          </div>
          
          <select
            value={selectedRiskLevel}
            onChange={(e) => setSelectedRiskLevel(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid var(--border-color)',
              borderRadius: '0.375rem',
              backgroundColor: 'var(--input-background)',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
            }}
          >
            <option value="all">All Risk Levels</option>
            <option value="high">High Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="low">Low Risk</option>
          </select>
        </div>

        <div style={{
          overflowX: 'auto'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.875rem'
          }}>
            <thead>
              <tr style={{
                borderBottom: '1px solid var(--border-color)'
              }}>
                <th style={{
                  padding: '0.75rem',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: 'var(--text-primary)'
                }}>
                  Customer
                </th>
                <th style={{
                  padding: '0.75rem',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: 'var(--text-primary)'
                }}>
                  Last Purchase
                </th>
                <th style={{
                  padding: '0.75rem',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: 'var(--text-primary)'
                }}>
                  Days Since
                </th>
                <th style={{
                  padding: '0.75rem',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: 'var(--text-primary)'
                }}>
                  Return Probability
                </th>
                <th style={{
                  padding: '0.75rem',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: 'var(--text-primary)'
                }}>
                  Risk Level
                </th>
                <th style={{
                  padding: '0.75rem',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: 'var(--text-primary)'
                }}>
                  Recommended Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.predictions.map((prediction, index) => (
                <tr key={index} style={{
                  borderBottom: '1px solid var(--border-color)'
                }}>
                  <td style={{
                    padding: '0.75rem',
                    color: 'var(--text-primary)'
                  }}>
                    <div>
                      <div style={{ fontWeight: '600' }}>
                        {prediction.customerName}
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-secondary)'
                      }}>
                        {prediction.customerId}
                      </div>
                    </div>
                  </td>
                  <td style={{
                    padding: '0.75rem',
                    color: 'var(--text-primary)'
                  }}>
                    {prediction.lastPurchaseDate}
                  </td>
                  <td style={{
                    padding: '0.75rem',
                    color: 'var(--text-primary)'
                  }}>
                    {prediction.daysSinceLastPurchase} days
                  </td>
                  <td style={{
                    padding: '0.75rem',
                    color: 'var(--text-primary)'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <div style={{
                        width: '60px',
                        height: '8px',
                        backgroundColor: 'var(--bg-secondary)',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${prediction.predictedReturnProbability * 100}%`,
                          height: '100%',
                          backgroundColor: prediction.predictedReturnProbability > 0.7 ? '#10B981' : 
                                         prediction.predictedReturnProbability > 0.4 ? '#F59E0B' : '#EF4444'
                        }} />
                      </div>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        {(prediction.predictedReturnProbability * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                  <td style={{
                    padding: '0.75rem'
                  }}>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backgroundColor: prediction.riskLevel === 'Low' ? '#10B981' : 
                                     prediction.riskLevel === 'Medium' ? '#F59E0B' : '#EF4444',
                      color: 'white'
                    }}>
                      {prediction.riskLevel}
                    </span>
                  </td>
                  <td style={{
                    padding: '0.75rem',
                    color: 'var(--text-secondary)',
                    fontSize: '0.75rem'
                  }}>
                    {prediction.recommendedAction}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default CustomerRetention;
