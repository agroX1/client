import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  padding?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  style = {},
  padding = 'md',
}) => {
  const paddingStyles = {
    sm: { padding: '1rem' },
    md: { padding: '1.5rem' },
    lg: { padding: '2rem' },
  };
  
  return (
    <div
      className={`card ${className}`}
      style={{
        backgroundColor: 'var(--bg-primary)',
        border: '1px solid var(--bg-tertiary)',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        ...paddingStyles[padding],
        ...style
      }}
    >
      {children}
    </div>
  );
};
