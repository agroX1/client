import React, { useState, useRef, useEffect } from 'react';
import { LogOut, Settings, ChevronDown } from 'lucide-react';

interface ProfileDropdownProps {
  userName?: string;
  userEmail?: string;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ 
  userName = 'User', 
  userEmail = 'user@example.com' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    window.location.href = '/dashboard';
  };

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.75rem',
          backgroundColor: isOpen ? '#2a2b32' : 'transparent',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
          width: '100%',
          justifyContent: 'flex-start'
        }}
      >
        <div style={{
          width: '32px',
          height: '32px',
          backgroundColor: '#10a37f',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '0.875rem',
          fontWeight: '600',
          flexShrink: 0
        }}>
          {userName.charAt(0).toUpperCase()}
        </div>
        <div style={{ 
          flex: 1, 
          minWidth: 0,
          textAlign: 'left'
        }}>
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
        <div style={{
          width: '20px',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <ChevronDown 
            size={16} 
            style={{ 
              color: '#c5c5d2',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease'
            }} 
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
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
                setIsOpen(false);
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
                setIsOpen(false);
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
    </div>
  );
};
