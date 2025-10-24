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
  AlertsSection, 
  CustomerSegments
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
  customerSegments: [
    {
      id: 0,
      name: 'Dormant/Churned',
      count: 312,
      percentage: 25,
      avgRevenue: 45,
      lastPurchase: '90+ days',
      recommendations: [
        'Re-engagement campaigns with special offers',
        'Win-back strategies with significant incentives',
        'Gather feedback via surveys'
      ]
    },
    {
      id: 1,
      name: 'Loyal/Engaged',
      count: 438,
      percentage: 35,
      avgRevenue: 1250,
      lastPurchase: '7 days',
      recommendations: [
        'Loyalty programs with points and exclusive discounts',
        'VIP treatment with personalized communication',
        'Upselling and cross-selling opportunities',
        'Encourage reviews and referrals'
      ]
    },
    {
      id: 2,
      name: 'New/Recent but Inactive',
      count: 250,
      percentage: 20,
      avgRevenue: 180,
      lastPurchase: '30 days',
      recommendations: [
        'Onboarding campaigns with platform guidance',
        'Nurturing sequences with product recommendations',
        'First-purchase incentives and discounts',
        'Gather feedback on initial experience'
      ]
    },
    {
      id: 3,
      name: 'High-Engagement/Recent High-Value',
      count: 250,
      percentage: 20,
      avgRevenue: 2100,
      lastPurchase: '3 days',
      recommendations: [
        'Exclusive offers and limited-edition products',
        'Personalized recommendations based on history',
        'Proactive support and dedicated assistance',
        'Gather insights for product development'
      ]
    }
  ],
  recentAnalyses: [
    {
      id: 1,
      customerName: 'Kwame Asante',
      date: '2024-01-15',
      segment: 'Loyal/Engaged',
      churnRisk: 'Low',
      revenue: 1250,
      status: 'completed',
      lastPurchase: '7 days ago',
      recommendations: ['Loyalty program enrollment', 'VIP treatment offer']
    },
    {
      id: 2,
      customerName: 'Akua Mensah',
      date: '2024-01-14',
      segment: 'Dormant/Churned',
      churnRisk: 'High',
      revenue: 45,
      status: 'completed',
      lastPurchase: '95 days ago',
      recommendations: ['Re-engagement campaign', 'Win-back incentive']
    },
    {
      id: 3,
      customerName: 'Kofi Boateng',
      date: '2024-01-13',
      segment: 'New/Recent but Inactive',
      churnRisk: 'Medium',
      revenue: 180,
      status: 'in_progress',
      lastPurchase: '28 days ago',
      recommendations: ['Onboarding sequence', 'First-purchase discount']
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
      message: 'Akua Mensah - Dormant customer detected (95 days inactive)',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'info' as const,
      message: 'Customer segmentation model updated with new behavioral data',
      timestamp: '4 hours ago'
    },
    {
      id: 3,
      type: 'success' as const,
      message: 'Kwame Asante engaged with loyalty program offer',
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

      {/* Customer Segments */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <CustomerSegments segments={data.customerSegments} />
        <AlertsSection alerts={data.alerts} />
      </div>
      </div>
    </div>
  );
};

export default Dashboard;