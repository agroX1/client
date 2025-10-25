import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home,
  Menu,
  Users,
  Target,
  TrendingUp,
  Eye,
  Map
} from 'lucide-react';
import { ProfileDropdown } from './profile';

interface SidebarProps {
  isOpen: boolean;
  onCollapseChange?: (isCollapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onCollapseChange }) => {
  const [isLoggedIn] = useState(() => {
    const auth = localStorage.getItem('isAuthenticated');
    return auth === 'true' || auth === null; // Default to logged in if no auth state
  });
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  
  // Get user info from localStorage
  const userName = localStorage.getItem('userName') || 'User';
  const userEmail = localStorage.getItem('userEmail') || 'user@example.com';

  const handleCollapseToggle = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onCollapseChange?.(newCollapsed);
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'segmentation', label: 'Segmentation', icon: Users, path: '/dashboard/segmentation' },
    { id: 'retention', label: 'Retention', icon: TrendingUp, path: '/dashboard/retention' },
    { id: 'recommendations', label: 'Recommendations', icon: Target, path: '/dashboard/recommendations' },
    { id: 'insights', label: 'Insights', icon: Eye, path: '/dashboard/insights' },
    { id: 'roadmap', label: 'Roadmap', icon: Map, path: '/dashboard/roadmap' },
  ];
  




  const sidebarStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: isOpen ? 0 : '-240px',
    width: isCollapsed ? '60px' : '240px',
    height: '100vh',
    backgroundColor: '#202123',
    borderRight: '1px solid #4d4d4f',
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
    padding: '0.5rem 0',
    overflow: 'hidden',
    boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
  };

  return (
    <aside style={sidebarStyle}>
        {/* Logo Section */}
        <div style={{ 
          padding: isCollapsed ? '0.75rem 0.5rem' : '0.75rem 0.75rem', 
          marginBottom: isCollapsed ? '0.5rem' : '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          borderBottom: 'none',
          justifyContent: isCollapsed ? 'center' : 'flex-start'
        }}>
          {isCollapsed ? (
            <button
              onClick={handleCollapseToggle}
              style={{
                padding: '0.5rem',
                backgroundColor: 'transparent',
                color: 'var(--text-secondary)',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%'
              }}
            >
              <Menu size={24} />
            </button>
          ) : (
            <>
              <img 
                src="/assets/logo.svg" 
                alt="AgroX Logo" 
                style={{ width: '1.5rem', height: '1.5rem' }}
              />
              <h1 style={{ 
                fontSize: '1rem', 
                fontWeight: '600', 
                color: '#ffffff',
                margin: 0
              }}>
                AgroX
              </h1>
              <button
                onClick={handleCollapseToggle}
                style={{
                  marginLeft: 'auto',
                  padding: '0.5rem',
                  backgroundColor: 'transparent',
                  color: 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Menu size={20} />
              </button>
            </>
          )}
        </div>


        {/* Navigation Items */}
        <nav style={{ flex: 1, padding: isCollapsed ? '0' : '0 0.5rem', overflow: 'auto' }}>
          <div style={{ marginBottom: isCollapsed ? '0.5rem' : '1rem' }}>
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  title={isCollapsed ? item.label : ''}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: isCollapsed ? '0' : '0.75rem',
                    padding: isCollapsed ? '0.75rem' : '0.75rem 0.75rem',
                    marginBottom: '0.125rem',
                    color: isActive ? '#ffffff' : '#c5c5d2',
                    backgroundColor: 'transparent',
                    borderRadius: isCollapsed ? '0.5rem' : '0.375rem',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    transition: 'all 0.15s ease',
                    cursor: 'pointer',
                    justifyContent: isCollapsed ? 'center' : 'flex-start',
                    margin: isCollapsed ? '0.125rem 0.5rem' : '0 0.5rem 0.125rem 0.5rem',
                    minHeight: isCollapsed ? '44px' : 'auto'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget.style.color = '#ffffff');
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget.style.color = '#c5c5d2');
                    }
                  }}
                >
                  <div style={{
                    backgroundColor: isActive ? '#10a37f' : 'transparent',
                    borderRadius: '50%',
                    padding: '0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={isCollapsed ? 20 : 16} />
                  </div>
                  {!isCollapsed && item.label}
                </Link>
              );
            })}
          </div>

          </nav>

        {/* Profile Section */}
        <div style={{ 
          padding: '0.75rem',
          marginTop: 'auto'
        }}>
          {isLoggedIn && (
            !isCollapsed ? (
              <ProfileDropdown 
                userName={userName}
                userEmail={userEmail}
              />
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                backgroundColor: '#10a37f',
                  borderRadius: '50%',
                  color: 'white',
                  fontSize: '0.875rem',
                fontWeight: '600',
                margin: '0 auto'
                }}>
                  {userName.charAt(0).toUpperCase()}
              </div>
            )
          )}
        </div>
      </aside>
  );
};
