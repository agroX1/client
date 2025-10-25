import React, { useState } from 'react';
import { 
  Target, 
  ShoppingCart, 
  TrendingUp, 
  Star,
  Search,
  Download,
  RefreshCw,
  Eye,
  Package,
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

// Mock data for product recommendations
const mockRecommendationData = {
  overallMetrics: {
    totalProducts: 1250,
    recommendedProducts: 450,
    avgRecommendationScore: 0.78,
    conversionRate: 12.5,
    avgOrderValue: 85000,
    topPerformingCategory: 'Seeds & Fertilizers'
  },
  categoryPerformance: [
    {
      category: 'Seeds & Fertilizers',
      products: 320,
      avgScore: 0.85,
      conversionRate: 15.2,
      revenue: 2500000,
      color: '#10B981'
    },
    {
      category: 'Farm Equipment',
      products: 180,
      avgScore: 0.72,
      conversionRate: 8.5,
      revenue: 1800000,
      color: '#3B82F6'
    },
    {
      category: 'Livestock Feed',
      products: 220,
      avgScore: 0.68,
      conversionRate: 10.8,
      revenue: 1200000,
      color: '#F59E0B'
    },
    {
      category: 'Pesticides',
      products: 150,
      avgScore: 0.75,
      conversionRate: 11.5,
      revenue: 900000,
      color: '#EF4444'
    }
  ],
  topRecommendations: [
    {
      productId: 'PROD001',
      productName: 'Premium Cocoa Seeds',
      category: 'Seeds & Fertilizers',
      recommendationScore: 0.92,
      price: 15000,
      stock: 150,
      avgRating: 4.8,
      purchaseCount: 245,
      reason: 'High demand in your region, excellent soil compatibility'
    },
    {
      productId: 'PROD002',
      productName: 'NPK Fertilizer 20-20-20',
      category: 'Seeds & Fertilizers',
      recommendationScore: 0.89,
      price: 8500,
      stock: 300,
      avgRating: 4.6,
      purchaseCount: 189,
      reason: 'Perfect for your crop rotation schedule'
    },
    {
      productId: 'PROD003',
      productName: 'Drip Irrigation Kit',
      category: 'Farm Equipment',
      recommendationScore: 0.85,
      price: 45000,
      stock: 25,
      avgRating: 4.7,
      purchaseCount: 78,
      reason: 'Water-efficient solution for your farm size'
    },
    {
      productId: 'PROD004',
      productName: 'Organic Pesticide Spray',
      category: 'Pesticides',
      recommendationScore: 0.82,
      price: 12000,
      stock: 80,
      avgRating: 4.5,
      purchaseCount: 156,
      reason: 'Eco-friendly option matching your farming practices'
    }
  ],
  customerSegments: [
    {
      segment: 'High Value',
      count: 450,
      avgRecommendationScore: 0.88,
      conversionRate: 18.5,
      preferredCategories: ['Seeds & Fertilizers', 'Farm Equipment']
    },
    {
      segment: 'Regular',
      count: 1200,
      avgRecommendationScore: 0.72,
      conversionRate: 10.2,
      preferredCategories: ['Livestock Feed', 'Pesticides']
    },
    {
      segment: 'New',
      count: 350,
      avgRecommendationScore: 0.65,
      conversionRate: 6.8,
      preferredCategories: ['Seeds & Fertilizers']
    }
  ],
  recommendationTrends: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    recommendationScores: [0.68, 0.72, 0.75, 0.78, 0.82, 0.85, 0.88, 0.86, 0.89, 0.91, 0.88, 0.78],
    conversionRates: [8.5, 9.2, 10.1, 11.5, 12.8, 13.2, 14.5, 13.8, 15.2, 16.1, 14.8, 12.5]
  }
};

const ProductRecommendations: React.FC = () => {
  const [data] = useState(mockRecommendationData);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleExport = () => {
    console.log('Exporting recommendation data...');
  };

  // Prepare chart data
  const categoryPerformanceData = {
    labels: data.categoryPerformance.map(cat => cat.category),
    datasets: [
      {
        label: 'Recommendation Score',
        data: data.categoryPerformance.map(cat => cat.avgScore * 100),
        backgroundColor: data.categoryPerformance.map(cat => cat.color),
        borderColor: data.categoryPerformance.map(cat => cat.color),
        borderWidth: 2,
        borderRadius: 4,
      }
    ]
  };

  const segmentData = {
    labels: data.customerSegments.map(seg => seg.segment),
    datasets: [
      {
        data: data.customerSegments.map(seg => seg.count),
        backgroundColor: ['#10B981', '#3B82F6', '#F59E0B'],
        borderColor: ['#059669', '#1D4ED8', '#D97706'],
        borderWidth: 2,
      }
    ]
  };

  const trendData = {
    labels: data.recommendationTrends.labels,
    datasets: [
      {
        label: 'Recommendation Score',
        data: data.recommendationTrends.recommendationScores.map(score => score * 100),
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        yAxisID: 'y',
      },
      {
        label: 'Conversion Rate (%)',
        data: data.recommendationTrends.conversionRates,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        yAxisID: 'y1',
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

  const trendOptions = {
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
        max: 100,
        ticks: {
          callback: function(value: any) {
            return value + '%';
          }
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        beginAtZero: true,
        max: 20,
        ticks: {
          callback: function(value: any) {
            return value + '%';
          }
        },
        grid: {
          drawOnChartArea: false,
        },
      }
    }
  };

  // Filter recommendations based on selected filters
  const filteredRecommendations = data.topRecommendations.filter(rec => {
    const matchesCategory = selectedCategory === 'all' || rec.category === selectedCategory;
    const matchesSearch = rec.productName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            Product Recommendations
          </h1>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            margin: 0
          }}>
            AI-powered product suggestions to boost sales and customer satisfaction
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
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
            <Package size={20} style={{ color: '#3B82F6' }} />
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Total Products
            </h3>
          </div>
          <div style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#3B82F6',
            marginBottom: '0.5rem'
          }}>
            {data.overallMetrics.totalProducts.toLocaleString()}
          </div>
          <div style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)'
          }}>
            Available in catalog
          </div>
        </Card>

        <Card padding="lg">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem'
          }}>
            <Target size={20} style={{ color: '#10B981' }} />
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Recommendation Score
            </h3>
          </div>
          <div style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#10B981',
            marginBottom: '0.5rem'
          }}>
            {(data.overallMetrics.avgRecommendationScore * 100).toFixed(0)}%
          </div>
          <div style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)'
          }}>
            Average accuracy
          </div>
        </Card>

        <Card padding="lg">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem'
          }}>
            <TrendingUp size={20} style={{ color: '#F59E0B' }} />
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Conversion Rate
            </h3>
          </div>
          <div style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#F59E0B',
            marginBottom: '0.5rem'
          }}>
            {data.overallMetrics.conversionRate}%
          </div>
          <div style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)'
          }}>
            Recommendation to purchase
          </div>
        </Card>

        <Card padding="lg">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem'
          }}>
            <ShoppingCart size={20} style={{ color: '#EF4444' }} />
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Avg Order Value
            </h3>
          </div>
          <div style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#EF4444',
            marginBottom: '0.5rem'
          }}>
            ₦{(data.overallMetrics.avgOrderValue / 1000).toFixed(0)}k
          </div>
          <div style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)'
          }}>
            Per recommendation
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
        {/* Category Performance */}
        <Card padding="lg">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            <BarChart3 size={20} style={{ color: '#3B82F6' }} />
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Category Performance
            </h3>
          </div>
          <div style={{ height: '300px', width: '100%' }}>
            <Bar data={categoryPerformanceData} options={chartOptions} />
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
            <Target size={20} style={{ color: '#10B981' }} />
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

      {/* Recommendation Trends */}
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
            Recommendation Trends
          </h3>
        </div>
        <div style={{ height: '300px', width: '100%' }}>
          <Line data={trendData} options={trendOptions} />
        </div>
      </Card>

      {/* Top Recommendations */}
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
            <Star size={20} style={{ color: '#F59E0B' }} />
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Top Product Analytics by Segment
            </h3>
          </div>
          
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-secondary)'
              }} />
              <input
                type="text"
                placeholder="Search analytics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '0.5rem 0.75rem 0.5rem 2.5rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '0.375rem',
                  backgroundColor: 'var(--input-background)',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem',
                  width: '200px'
                }}
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid var(--border-color)',
                borderRadius: '0.375rem',
                backgroundColor: 'var(--input-background)',
                color: 'var(--text-primary)',
                fontSize: '0.875rem',
              }}
            >
              <option value="all">All Categories</option>
              <option value="Seeds & Fertilizers">Seeds & Fertilizers</option>
              <option value="Farm Equipment">Farm Equipment</option>
              <option value="Livestock Feed">Livestock Feed</option>
              <option value="Pesticides">Pesticides</option>
            </select>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem'
        }}>
          {filteredRecommendations.map((product, index) => (
            <div key={index} style={{
              border: '1px solid var(--border-color)',
              borderRadius: '0.5rem',
              padding: '1rem',
              backgroundColor: 'var(--card-background)',
              transition: 'all 0.2s ease'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '0.75rem'
              }}>
                <div>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    margin: 0,
                    marginBottom: '0.25rem'
                  }}>
                    {product.productName}
                  </h4>
                  <p style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                    margin: 0
                  }}>
                    {product.productId} • {product.category}
                  </p>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <Star size={14} style={{ color: '#F59E0B' }} />
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)'
                  }}>
                    {product.avgRating}
                  </span>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.75rem'
              }}>
                <div>
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#10B981'
                  }}>
                    {(product.recommendationScore * 100).toFixed(0)}% Match
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)'
                  }}>
                    Recommendation Score
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
                    {product.purchaseCount} customers
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)'
                  }}>
                    In this segment
                  </div>
                </div>
              </div>

              <div style={{
                width: '100%',
                height: '6px',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '3px',
                overflow: 'hidden',
                marginBottom: '0.75rem'
              }}>
                <div style={{
                  width: `${product.recommendationScore * 100}%`,
                  height: '100%',
                  backgroundColor: product.recommendationScore > 0.8 ? '#10B981' : 
                                 product.recommendationScore > 0.6 ? '#F59E0B' : '#EF4444'
                }} />
              </div>

              <div style={{
                padding: '0.75rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.375rem',
                marginBottom: '0.75rem'
              }}>
                <p style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                  margin: 0,
                  lineHeight: '1.4'
                }}>
                  {product.reason}
                </p>
              </div>

              <div style={{
                display: 'flex',
                gap: '0.5rem'
              }}>
                <button style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '0.375rem',
                  padding: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}>
                  <BarChart3 size={16} />
                  View Analytics
                </button>
                <button style={{
                  backgroundColor: 'transparent',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '0.375rem',
                  padding: '0.5rem',
                  cursor: 'pointer'
                }}>
                  <Eye size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default ProductRecommendations;
