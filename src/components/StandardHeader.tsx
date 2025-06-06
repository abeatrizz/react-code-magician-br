
import React from 'react';
import Logo from '@/components/Logo';

interface StandardHeaderProps {
  title: string;
  rightElement?: React.ReactNode;
}

const StandardHeader: React.FC<StandardHeaderProps> = ({ title, rightElement }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-sm border-b">
      <Logo size="medium" variant="dark" />
      <h1 className="text-xl font-bold text-gray-800">{title}</h1>
      <div className="w-20 flex justify-end">
        {rightElement}
      </div>
    </div>
  );
};

export default StandardHeader;
