import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Satellite, 
  Home,
  Map,
  Activity,
  Settings,
  Bell,
  LogOut,
  ChevronDown,
  Menu
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onCollapseChange?: (isCollapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, onCollapseChange }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isAuthenticated') === 'true');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const profileRef = useRef<HTMLDivElement>(null);
  
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
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/dashboard/analytics' },
    { id: 'multispectral', label: 'Multispectral', icon: Satellite, path: '/multispectral' },
    { id: 'maps', label: 'Farm Maps', icon: Map, path: '/dashboard/maps' },
    { id: 'activity', label: 'Activity', icon: Activity, path: '/dashboard/activity' },
  ];

  const secondaryItems = [
    { id: 'notifications', label: 'Alerts', icon: Bell, path: '/dashboard/alerts' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];  

  const handleAuth = (type: 'login' | 'signup') => {
    console.log(`${type} clicked`);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    window.location.href = '/signin';
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
          marginTop: 'auto',
          position: 'relative'
        }} ref={profileRef}>
          {isLoggedIn ? (
            <>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                backgroundColor: isProfileDropdownOpen ? '#2a2b32' : 'transparent',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
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
                  {userName.charAt(0).toUpperCase()}
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
                      {userName}
                    </div>
                    <div style={{ 
                      fontSize: '0.75rem', 
                      color: '#c5c5d2',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {userEmail}
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
                    <ChevronDown 
                      size={16} 
                      style={{ 
                        color: '#c5c5d2',
                        transform: isProfileDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease'
                      }} 
                    />
                  </div>
                )}
              </div>

              {/* Dropdown Menu */}
              {isProfileDropdownOpen && !isCollapsed && (
                <div style={{
                  position: 'absolute',
                  bottom: '100%',
                  left: '0.75rem',
                  right: '0.75rem',
                  marginBottom: '0.5rem',
                  backgroundColor: '#2a2b32',
                  border: '1px solid #4d4d4f',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                  zIndex: 1000,
                  overflow: 'hidden'
                }}>
                  {/* User Info */}
                  <div style={{
                    padding: '1rem',
                    borderBottom: '1px solid #4d4d4f',
                    backgroundColor: '#343541'
                  }}>
                    <div style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#ffffff',
                      marginBottom: '0.25rem'
                    }}>
                      {userName}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#c5c5d2'
                    }}>
                      {userEmail}
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div style={{ padding: '0.5rem 0' }}>
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        // Navigate to settings
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 1rem',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#c5c5d2',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#40414f';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <Settings size={16} />
                      Settings
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        handleLogout();
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 1rem',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#40414f';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </>
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
