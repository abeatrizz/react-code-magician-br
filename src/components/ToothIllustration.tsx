
import React from 'react';

interface ToothIllustrationProps {
  toothNumber: number;
  hasEvidence?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

const ToothIllustration: React.FC<ToothIllustrationProps> = ({ 
  toothNumber, 
  hasEvidence = false, 
  onClick,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-6 h-8',
    md: 'w-8 h-10',
    lg: 'w-10 h-12'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div 
      className={`${sizeClasses[size]} cursor-pointer transition-all hover:scale-110`}
      onClick={onClick}
    >
      <svg
        viewBox="0 0 24 32"
        className={`w-full h-full ${hasEvidence ? 'text-blue-500' : 'text-gray-400'}`}
        fill="currentColor"
      >
        {/* Tooth shape */}
        <path d="M12 2C8 2 6 4 6 8v8c0 6 2 12 6 14 4-2 6-8 6-14V8c0-4-2-6-6-6z" />
        {/* Root */}
        <path d="M10 20v8c0 1 1 2 2 2s2-1 2-2v-8" opacity="0.7" />
      </svg>
      <div className={`text-center ${textSizeClasses[size]} font-medium mt-1`}>
        {toothNumber}
      </div>
      {hasEvidence && (
        <div className="w-2 h-2 bg-blue-500 rounded-full absolute -top-1 -right-1"></div>
      )}
    </div>
  );
};

export default ToothIllustration;
