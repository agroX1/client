import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Satellite, 
  User, 
  X, 
  Home,
  Map,
  Activity,
  Settings,
  Bell,
  Menu
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onCollapseChange?: (isCollapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, onCollapseChange }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mock authentication state
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const handleCollapseToggle = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onCollapseChange?.(newCollapsed);
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/dashboard/analytics' },
    { id: 'multispectral', label: 'Multispectral', icon: Satellite, path: '/multispectral' },
    { id: 'maps', label: 'Farm Maps', icon: Map, path: '/dashboard/maps' },
    { id: 'activity', label: 'Activity', icon: Activity, path: '/dashboard/activity' },
  ];

  const secondaryItems = [
    { id: 'alerts', label: 'Alerts', icon: Bell, path: '/dashboard/alerts' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];  

  const handleAuth = (type: 'login' | 'signup') => {
    console.log(`${type} clicked`);
    setIsLoggedIn(true);
  };

  const sidebarStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: isOpen ? 0 : '-240px',
    width: isCollapsed ? '60px' : '240px',
    height: '100vh',
    backgroundColor: '#202123',
    borderRight: '1px solid #4d4d4f',
    transition: 'all 0.3s ease',
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
    padding: '0.5rem 0',
    overflow: 'hidden',
    boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
  };

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 998,
    display: isOpen ? 'block' : 'none',
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

          {/* Secondary Navigation */}
          <div style={{ 
            borderTop: 'none', 
            paddingTop: isCollapsed ? '0.5rem' : '1rem' 
          }}>
            {secondaryItems.map((item) => {
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
          {isLoggedIn ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem',
              backgroundColor: 'transparent',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onClick={() => setIsLoggedIn(false)}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#10a37f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                JF
              </div>
              {!isCollapsed && (
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ 
                    fontSize: '0.875rem', 
                    fontWeight: '500', 
                    color: '#ffffff',
                    marginBottom: '0.125rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    John Farmer
                  </div>
                  <div style={{ 
                    fontSize: '0.75rem', 
                    color: '#c5c5d2',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    Farm Manager
                  </div>
                </div>
              )}
              {!isCollapsed && (
                <div style={{
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button
                onClick={() => handleAuth('login')}
                style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: 'transparent',
                  color: '#c5c5d2',
                  border: '1px solid #4d4d4f',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  transition: 'all 0.15s ease'
                }}
              >
                Sign In
              </button>
              <button
                onClick={() => handleAuth('signup')}
                style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: '#10a37f',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  transition: 'all 0.15s ease'
                }}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </aside>
  );
};
