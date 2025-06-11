
import React from 'react';
import Logo from '@/components/Logo';

interface StandardHeaderProps {
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
}

const StandardHeader: React.FC<StandardHeaderProps> = ({ title, subtitle, rightElement }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-sm border-b">
      <Logo size="medium" variant="dark" />
      <div className="text-center">
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      </div>
      <div className="w-20 flex justify-end">
        {rightElement}
      </div>
    </div>
  );
};

export default StandardHeader;
