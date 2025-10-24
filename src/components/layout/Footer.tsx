import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer style={{ 
      backgroundColor: 'var(--bg-primary)', 
      borderTop: '1px solid var(--bg-tertiary)', 
      marginTop: '3rem' 
    }}>
      <div style={{ 
        maxWidth: '80rem', 
        margin: '0 auto', 
        padding: '0 1rem', 
        paddingTop: '1.5rem', 
        paddingBottom: '1.5rem' 
      }}>
        <div style={{ 
          textAlign: 'center', 
          color: 'var(--text-secondary)', 
          fontSize: '0.875rem' 
        }}>
          <p style={{ margin: 0 }}>
            © 2024 AgroX. Advanced multispectral analysis for agricultural insights.
          </p>
        </div>
      </div>
    </footer>
  );
};
