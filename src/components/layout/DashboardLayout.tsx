import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from './sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    // Auto-open sidebar on desktop by default
    return typeof window !== 'undefined' && window.innerWidth >= 768;
  });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' && window.innerWidth < 768;
  });
  
  // Get user info from localStorage
  // Get user info from localStorage
  // const userName = localStorage.getItem('userName') || 'User';

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

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

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
              right: '1rem',
              zIndex: 1001,
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '0.5rem',
              padding: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              width: '44px',
              height: '44px'
            }}
          >
            <Menu size={20} color="var(--text-primary)" />
          </button>
        )}

        {/* Mobile Overlay */}
        {isMobile && isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999
            }}
          />
        )}

        {/* Page Content */}
        {children}
      </div>
    </div>
  );
};
