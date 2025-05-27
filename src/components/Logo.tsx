
import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'light' | 'dark';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  variant = 'dark',
  className = ''
}) => {
  const sizeClasses = {
    small: 'text-lg font-bold',
    medium: 'text-2xl font-bold',
    large: 'text-4xl font-bold'
  };

  const colorClasses = {
    light: 'text-white',
    dark: 'text-gray-800'
  };

  return (
    <div className={`${sizeClasses[size]} ${colorClasses[variant]} ${className}`}>
      <span style={{ color: variant === 'dark' ? '#123458' : 'white' }}>
        identify
      </span>
    </div>
  );
};

export default Logo;
