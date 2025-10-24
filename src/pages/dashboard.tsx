import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Map, 
  Activity,
  Menu
} from 'lucide-react';
import { 
  MetricCard, 
  RecentAnalyses, 
  WeatherConditions, 
  AlertsSection, 
  CropRecommendations 
} from '../components/dashboard';
import { Sidebar } from '../components/layout/Sidebar';

// Mock data for Afrimash Insight Engine dashboard
const mockDashboardData = {
  farmMetrics: {
    totalCustomers: 1250,
    activeSegments: 4,
    totalRevenue: 245600,
    retentionRate: 70
  },
  recentAnalyses: [
    {
      id: 1,
      customerName: 'Kwame Asante',
      date: '2024-01-15',
      segment: 'Loyal',
      churnRisk: 'Low',
      revenue: 1250,
      status: 'completed'
    },
    {
      id: 2,
      customerName: 'Akua Mensah',
      date: '2024-01-14',
      segment: 'At-Risk',
      churnRisk: 'High',
      revenue: 890,
      status: 'completed'
    },
    {
      id: 3,
      customerName: 'Kofi Boateng',
      date: '2024-01-13',
      segment: 'New',
      churnRisk: 'Medium',
      revenue: 450,
      status: 'in_progress'
    }
  ],
  weatherData: {
    temperature: 28,
    humidity: 75,
    rainfall: 15.2,
    windSpeed: 6.8
  },
  alerts: [
    {
      id: 1,
      type: 'warning' as const,
      message: 'Akua Mensah - High churn risk detected (21 days inactive)',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'info' as const,
      message: 'Segmentation model updated with new customer data',
      timestamp: '4 hours ago'
    },
    {
      id: 3,
      type: 'success' as const,
      message: 'Kwame Asante engaged with personalized fertilizer message',
      timestamp: '6 hours ago'
    }
  ],
  productRecommendations: [
    { product: 'Cocoa Fertilizer', suitability: 92, reason: 'High engagement in Ashanti region' },
    { product: 'Maize Seeds', suitability: 87, reason: 'Seasonal demand increase' },
    { product: 'Pesticides', suitability: 78, reason: 'Weather pattern analysis' }
  ]
};

const Dashboard: React.FC = () => {
  const [data] = useState(mockDashboardData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
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
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-secondary)' }}>
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onCollapseChange={setIsSidebarCollapsed}
      />
      
      {/* Main Content */}
      <div style={{ 
        flex: 1, 
        marginLeft: isSidebarOpen ? (isSidebarCollapsed ? '60px' : '240px') : '0',
        transition: 'margin-left 0.3s ease',
        padding: '2rem'
      }}>

      {/* Key Metrics Grid */}
      <div className="metrics-grid">
        <MetricCard
          title="Total Customers"
          value={data.farmMetrics.totalCustomers}
          change="+125 this month"
          changeType="positive"
          icon={<Map size={24} />}
          subtitle="Active customers"
        />
        <MetricCard
          title="Customer Segments"
          value={data.farmMetrics.activeSegments}
          change="+1 new segment"
          changeType="positive"
          icon={<Activity size={24} />}
          subtitle="AI-powered segments"
        />
        <MetricCard
          title="Total Revenue"
          value={`₵${data.farmMetrics.totalRevenue.toLocaleString()}`}
          change="+15% this month"
          changeType="positive"
          icon={<BarChart3 size={24} />}
          subtitle="Customer intelligence"
        />
        <MetricCard
          title="Retention Rate"
          value={`${data.farmMetrics.retentionRate}%`}
          change="+25% improvement"
          changeType="positive"
          icon={<TrendingUp size={24} />}
          subtitle="Customer loyalty"
        />
      </div>

      {/* Main Content Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <RecentAnalyses analyses={data.recentAnalyses} />
        <WeatherConditions weatherData={data.weatherData} />
      </div>

      {/* Bottom Row */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '1.5rem' 
      }}>
        <AlertsSection alerts={data.alerts} />
        <CropRecommendations recommendations={data.productRecommendations} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;