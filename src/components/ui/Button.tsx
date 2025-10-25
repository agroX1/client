import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e?: any) => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'default';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  style = {},
}) => {
  const baseClasses = 'font-medium transition-all duration-200 border-none cursor-pointer rounded-lg';
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
    outline: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50',
    default: 'bg-blue-600 text-white hover:bg-blue-700',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      style={style}
    >
      {children}
    </button>
  );
};
