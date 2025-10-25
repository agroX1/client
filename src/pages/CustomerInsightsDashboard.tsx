import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target,
  RefreshCw,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  Activity,
  DollarSign,
  ShoppingCart
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Bar, Line, Doughnut, Scatter } from 'react-chartjs-2';
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

// Mock data for customer insights dashboard
const mockInsightsData = {
  overview: {
    totalCustomers: 3500,
    activeCustomers: 2100,
    newCustomers: 450,
    churnedCustomers: 200,
    avgLifetimeValue: 125000,
    avgOrderFrequency: 3.2,
    customerSatisfaction: 4.3,
    netPromoterScore: 65
  },
  customerJourney: [
    { stage: 'Awareness', customers: 5000, conversion: 70 },
    { stage: 'Interest', customers: 3500, conversion: 60 },
    { stage: 'Consideration', customers: 2100, conversion: 45 },
    { stage: 'Purchase', customers: 945, conversion: 35 },
    { stage: 'Retention', customers: 331, conversion: 25 },
    { stage: 'Advocacy', customers: 83, conversion: 15 }
  ],
  behaviorPatterns: {
    purchaseTiming: [
      { time: '6 AM', purchases: 45 },
      { time: '9 AM', purchases: 120 },
      { time: '12 PM', purchases: 180 },
      { time: '3 PM', purchases: 150 },
      { time: '6 PM', purchases: 200 },
      { time: '9 PM', purchases: 95 }
    ],
    seasonalTrends: [
      { month: 'Jan', purchases: 1200, revenue: 15000000 },
      { month: 'Feb', purchases: 1350, revenue: 16800000 },
      { month: 'Mar', purchases: 1500, revenue: 18500000 },
      { month: 'Apr', purchases: 1800, revenue: 22000000 },
      { month: 'May', purchases: 2100, revenue: 25000000 },
      { month: 'Jun', purchases: 1950, revenue: 23000000 },
      { month: 'Jul', purchases: 1750, revenue: 21000000 },
      { month: 'Aug', purchases: 1600, revenue: 19500000 },
      { month: 'Sep', purchases: 1400, revenue: 17000000 },
      { month: 'Oct', purchases: 1300, revenue: 16000000 },
      { month: 'Nov', purchases: 1250, revenue: 15500000 },
      { month: 'Dec', purchases: 1100, revenue: 14000000 }
    ]
  },
  customerSegments: [
    {
      segment: 'Champions',
      count: 450,
      percentage: 12.9,
      avgLifetimeValue: 250000,
      avgOrderFrequency: 5.2,
      satisfaction: 4.8,
      color: '#10B981'
    },
    {
      segment: 'Loyal Customers',
      count: 800,
      percentage: 22.9,
      avgLifetimeValue: 180000,
      avgOrderFrequency: 4.1,
      satisfaction: 4.5,
      color: '#3B82F6'
    },
    {
      segment: 'Potential Loyalists',
      count: 650,
      percentage: 18.6,
      avgLifetimeValue: 120000,
      avgOrderFrequency: 3.2,
      satisfaction: 4.2,
      color: '#F59E0B'
    },
    {
      segment: 'New Customers',
      count: 450,
      percentage: 12.9,
      avgLifetimeValue: 75000,
      avgOrderFrequency: 1.8,
      satisfaction: 4.0,
      color: '#8B5CF6'
    },
    {
      segment: 'At Risk',
      count: 550,
      percentage: 15.7,
      avgLifetimeValue: 95000,
      avgOrderFrequency: 2.1,
      satisfaction: 3.5,
      color: '#EF4444'
    },
    {
      segment: 'Cannot Lose Them',
      count: 600,
      percentage: 17.1,
      avgLifetimeValue: 200000,
      avgOrderFrequency: 4.8,
      satisfaction: 4.6,
      color: '#06B6D4'
    }
  ],
  insights: [
    {
      type: 'opportunity',
      title: 'High-Value Customer Growth',
      description: 'Champions segment shows 25% growth potential with targeted premium product campaigns',
      impact: 'High',
      confidence: 0.85
    },
    {
      type: 'warning',
      title: 'At-Risk Customer Alert',
      description: '550 customers showing declining engagement patterns - immediate intervention needed',
      impact: 'Medium',
      confidence: 0.92
    },
    {
      type: 'opportunity',
      title: 'Seasonal Revenue Optimization',
      description: 'April-June period shows 40% higher revenue - optimize inventory and marketing',
      impact: 'High',
      confidence: 0.78
    },
    {
      type: 'insight',
      title: 'Peak Purchase Hours',
      description: '6 PM shows highest purchase activity - schedule promotional campaigns accordingly',
      impact: 'Low',
      confidence: 0.95
    }
  ]
};

const CustomerInsightsDashboard: React.FC = () => {
  const [data, setData] = useState(mockInsightsData);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('12m');

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleExport = () => {
    console.log('Exporting insights data...');
  };

  // Prepare chart data
  const journeyData = {
    labels: data.customerJourney.map(stage => stage.stage),
    datasets: [
      {
        label: 'Customers',
        data: data.customerJourney.map(stage => stage.customers),
        backgroundColor: '#3B82F6',
        borderColor: '#1D4ED8',
        borderWidth: 1,
      }
    ]
  };

  const segmentData = {
    labels: data.customerSegments.map(seg => seg.segment),
    datasets: [
      {
        data: data.customerSegments.map(seg => seg.count),
        backgroundColor: data.customerSegments.map(seg => seg.color),
        borderColor: data.customerSegments.map(seg => seg.color),
        borderWidth: 2,
      }
    ]
  };

  const seasonalData = {
    labels: data.behaviorPatterns.seasonalTrends.map(trend => trend.month),
    datasets: [
      {
        label: 'Revenue (₦M)',
        data: data.behaviorPatterns.seasonalTrends.map(trend => trend.revenue / 1000000),
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        yAxisID: 'y',
      },
      {
        label: 'Purchases',
        data: data.behaviorPatterns.seasonalTrends.map(trend => trend.purchases),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        yAxisID: 'y1',
      }
    ]
  };

  const timingData = {
    labels: data.behaviorPatterns.purchaseTiming.map(timing => timing.time),
    datasets: [
      {
        label: 'Purchase Volume',
        data: data.behaviorPatterns.purchaseTiming.map(timing => timing.purchases),
        backgroundColor: '#F59E0B',
        borderColor: '#D97706',
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

  const seasonalOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      }
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '₦' + value + 'M';
          }
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        beginAtZero: true,
        grid: {
          drawOnChartArea: false,
        },
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
            Customer Insights Dashboard
          </h1>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            margin: 0
          }}>
            Comprehensive customer intelligence and behavior analysis
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <Card padding="lg">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem'
          }}>
            <Users size={20} style={{ color: '#3B82F6' }} />
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Total Customers
            </h3>
          </div>
          <div style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#3B82F6',
            marginBottom: '0.5rem'
          }}>
            {data.overview.totalCustomers.toLocaleString()}
          </div>
          <div style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)'
          }}>
            {data.overview.activeCustomers.toLocaleString()} active
          </div>
        </Card>

        <Card padding="lg">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem'
          }}>
            <DollarSign size={20} style={{ color: '#10B981' }} />
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Avg Lifetime Value
            </h3>
          </div>
          <div style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#10B981',
            marginBottom: '0.5rem'
          }}>
            ₦{(data.overview.avgLifetimeValue / 1000).toFixed(0)}k
          </div>
          <div style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)'
          }}>
            Per customer
          </div>
        </Card>

        <Card padding="lg">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem'
          }}>
            <ShoppingCart size={20} style={{ color: '#F59E0B' }} />
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Order Frequency
            </h3>
          </div>
          <div style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#F59E0B',
            marginBottom: '0.5rem'
          }}>
            {data.overview.avgOrderFrequency}
          </div>
          <div style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)'
          }}>
            Orders per year
          </div>
        </Card>

        <Card padding="lg">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem'
          }}>
            <Target size={20} style={{ color: '#EF4444' }} />
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Net Promoter Score
            </h3>
          </div>
          <div style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#EF4444',
            marginBottom: '0.5rem'
          }}>
            {data.overview.netPromoterScore}
          </div>
          <div style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)'
          }}>
            Customer satisfaction
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* Customer Journey */}
        <Card padding="lg">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            <Activity size={20} style={{ color: '#3B82F6' }} />
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Customer Journey
            </h3>
          </div>
          <div style={{ height: '300px', width: '100%' }}>
            <Bar data={journeyData} options={chartOptions} />
          </div>
        </Card>

        {/* Customer Segments */}
        <Card padding="lg">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            <Users size={20} style={{ color: '#10B981' }} />
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Customer Segments
            </h3>
          </div>
          <div style={{ height: '300px', width: '100%' }}>
            <Doughnut data={segmentData} options={chartOptions} />
          </div>
        </Card>
      </div>

      {/* Seasonal Trends */}
      <Card padding="lg" style={{ marginBottom: '2rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          <TrendingUp size={20} style={{ color: '#F59E0B' }} />
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            margin: 0
          }}>
            Seasonal Trends
          </h3>
        </div>
        <div style={{ height: '300px', width: '100%' }}>
          <Line data={seasonalData} options={seasonalOptions} />
        </div>
      </Card>

      {/* Purchase Timing */}
      <Card padding="lg" style={{ marginBottom: '2rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          <BarChart3 size={20} style={{ color: '#8B5CF6' }} />
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            margin: 0
          }}>
            Purchase Timing Patterns
          </h3>
        </div>
        <div style={{ height: '300px', width: '100%' }}>
          <Bar data={timingData} options={chartOptions} />
        </div>
      </Card>

      {/* AI Insights */}
      <Card padding="lg">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          <Eye size={20} style={{ color: '#06B6D4' }} />
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            margin: 0
          }}>
            AI-Generated Insights
          </h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem'
        }}>
          {data.insights.map((insight, index) => (
            <div key={index} style={{
              border: '1px solid var(--border-color)',
              borderRadius: '0.5rem',
              padding: '1rem',
              backgroundColor: 'var(--card-background)',
              borderLeft: `4px solid ${
                insight.type === 'opportunity' ? '#10B981' :
                insight.type === 'warning' ? '#EF4444' : '#3B82F6'
              }`
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '0.75rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  {insight.type === 'opportunity' && <CheckCircle size={16} style={{ color: '#10B981' }} />}
                  {insight.type === 'warning' && <AlertTriangle size={16} style={{ color: '#EF4444' }} />}
                  {insight.type === 'insight' && <Eye size={16} style={{ color: '#3B82F6' }} />}
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    margin: 0
                  }}>
                    {insight.title}
                  </h4>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
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
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                margin: 0,
                marginBottom: '0.75rem',
                lineHeight: '1.4'
              }}>
                {insight.description}
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)'
                }}>
                  Confidence: {(insight.confidence * 100).toFixed(0)}%
                </div>
                <div style={{
                  width: '60px',
                  height: '4px',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${insight.confidence * 100}%`,
                    height: '100%',
                    backgroundColor: insight.confidence > 0.8 ? '#10B981' : 
                                   insight.confidence > 0.6 ? '#F59E0B' : '#EF4444'
                  }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default CustomerInsightsDashboard;
