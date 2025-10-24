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
  WeatherConditions,
  CropRecommendations,
  RecentAnalyses
} from '../components/dashboard';
import { Sidebar } from '../components/layout/sidebar';

// Mock data for AgroX Agricultural Dashboard
const mockDashboardData = {
  farmMetrics: {
    totalFarms: 1250,
    activeAnalyses: 4,
    totalArea: 2456,
    avgYield: 70
  },
  recentAnalyses: [
    {
      id: 1,
      farmName: 'Asante Cocoa Farm',
      date: '2024-01-15',
      ndvi: 0.78,
      health: 'Excellent',
      area: 12.5,
      status: 'completed'
    },
    {
      id: 2,
      farmName: 'Mensah Maize Fields',
      date: '2024-01-14',
      ndvi: 0.65,
      health: 'Good',
      area: 8.2,
      status: 'completed'
    },
    {
      id: 3,
      farmName: 'Boateng Rice Plantation',
      date: '2024-01-13',
      ndvi: 0.45,
      health: 'Fair',
      area: 15.8,
      status: 'in_progress'
    }
  ],
  weatherData: {
    temperature: 28,
    humidity: 75,
    rainfall: 15.2,
    windSpeed: 6.8
  },
  cropRecommendations: [
    { crop: 'Cocoa', suitability: 92, reason: 'Optimal soil conditions and rainfall pattern' },
    { crop: 'Maize', suitability: 87, reason: 'Seasonal timing and temperature range' },
    { crop: 'Rice', suitability: 78, reason: 'Water availability and soil type match' }
  ]
};

const Dashboard: React.FC = () => {
  const [data] = useState(mockDashboardData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Start closed on mobile
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Get user info from localStorage
  const userName = localStorage.getItem('userName') || 'User';

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true); // Auto-open on desktop
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
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
        onCollapseChange={setIsSidebarCollapsed}
      />
      
      {/* Main Content */}
      <div style={{ 
        flex: 1, 
        marginLeft: isMobile ? '0' : (isSidebarOpen ? (isSidebarCollapsed ? '60px' : '240px') : '0'),
        transition: 'margin-left 0.3s ease',
        padding: isMobile ? '1rem' : '2rem',
        paddingTop: isMobile ? '4rem' : '2rem' // Space for mobile menu button
      }}>
        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{
              position: 'fixed',
              top: '1rem',
              left: '1rem',
              zIndex: 1001,
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '0.5rem',
              padding: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Menu size={20} color="var(--text-primary)" />
          </button>
        )}

        {/* Dashboard Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          marginBottom: isMobile ? '1.5rem' : '2rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid var(--border-color)',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '0.5rem' : '0'
        }}>
          <div>
            <h1 style={{
              fontSize: isMobile ? '1.5rem' : '1.75rem',
              fontWeight: '700',
              color: 'var(--text-primary)',
              margin: 0,
              marginBottom: '0.25rem'
            }}>
              Dashboard
            </h1>
            <p style={{
              fontSize: isMobile ? '0.8rem' : '0.875rem',
              color: 'var(--text-secondary)',
              margin: 0
            }}>
              Welcome back, {userName.split(' ')[0]}! Here's your farm overview.
            </p>
          </div>
        </div>

      {/* Key Metrics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gap: isMobile ? '1rem' : '1.5rem',
        marginBottom: isMobile ? '1.5rem' : '2rem'
      }}>
        <MetricCard
          title="Total Farms"
          value={data.farmMetrics.totalFarms}
          change="+25 this month"
          changeType="positive"
          icon={<Map size={24} />}
          subtitle="Registered farms"
        />
        <MetricCard
          title="Active Analyses"
          value={data.farmMetrics.activeAnalyses}
          change="+2 new analyses"
          changeType="positive"
          icon={<Activity size={24} />}
          subtitle="Ongoing monitoring"
        />
        <MetricCard
          title="Total Area"
          value={`${data.farmMetrics.totalArea.toLocaleString()} ha`}
          change="+15% this month"
          changeType="positive"
          icon={<BarChart3 size={24} />}
          subtitle="Monitored land"
        />
        <MetricCard
          title="Avg Yield"
          value={`${data.farmMetrics.avgYield}%`}
          change="+8% improvement"
          changeType="positive"
          icon={<TrendingUp size={24} />}
          subtitle="Crop productivity"
        />
      </div>

      {/* Agricultural Analytics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: isMobile ? '1rem' : '1.5rem',
        marginBottom: isMobile ? '1.5rem' : '2rem'
      }}>
        <WeatherConditions weatherData={data.weatherData} />
        <CropRecommendations recommendations={data.cropRecommendations} />
      </div>

      {/* Recent Farm Analyses */}
      <div style={{ marginBottom: isMobile ? '1.5rem' : '2rem' }}>
        <RecentAnalyses analyses={data.recentAnalyses} />
      </div>
      </div>
    </div>
  );
};

export default Dashboard;