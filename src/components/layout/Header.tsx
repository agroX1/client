import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mock authentication state
  const location = useLocation();

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { id: 'multispectral', label: 'Multispectral Analysis', path: '/multispectral' },
  ];

  const handleAuth = (type: 'login' | 'signup') => {
    console.log(`${type} clicked`);
    setIsLoggedIn(true);
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: 'var(--bg-primary)',
      borderBottom: '1px solid var(--bg-tertiary)',
      zIndex: 100,
      height: '4rem'
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem', height: '100%' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          height: '100%' 
        }}>
          {/* Logo and Menu Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {onMenuClick && (
              <button
                onClick={onMenuClick}
                style={{
                  padding: '0.5rem',
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
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
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img 
                src="/assets/logo.svg" 
                alt="AgroX Logo" 
                style={{ width: '2rem', height: '2rem' }}
              />
              <h1 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 'bold', 
                color: 'var(--text-primary)',
                margin: 0
              }}>
                AgroX
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  style={{
                    color: isActive ? 'var(--accent-green)' : 'var(--text-primary)',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    transition: 'color 0.2s ease',
                    padding: '0.5rem 1rem',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.target as HTMLElement).style.color = 'var(--accent-green)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.target as HTMLElement).style.color = 'var(--text-primary)';
                    }
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {isLoggedIn ? (
              <div style={{ 
                fontSize: '0.875rem', 
                fontWeight: '500', 
                color: 'var(--text-primary)' 
              }}>
                John Farmer
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() => handleAuth('login')}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: 'transparent',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--bg-tertiary)',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleAuth('signup')}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: 'var(--accent-green)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
