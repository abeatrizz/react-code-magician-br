
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, FolderOpen, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Início', path: '/dashboard' },
    { icon: FolderOpen, label: 'Casos', path: '/cases' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || 
           (path === '/cases' && location.pathname.startsWith('/cases'));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50 shadow-lg">
      <div className="flex justify-around items-center relative">
        {/* Primeiro item */}
        <button
          onClick={() => navigate(navItems[0].path)}
          className={`flex flex-col items-center py-2 px-6 rounded-lg transition-colors ${
            isActive(navItems[0].path)
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <navItems[0].icon className="w-5 h-5 mb-1" />
          <span className="text-xs font-medium">{navItems[0].label}</span>
        </button>

        {/* Botão central destacado */}
        <Button
          onClick={() => navigate('/new-case')}
          size="lg"
          className="absolute left-1/2 transform -translate-x-1/2 -translate-y-2 rounded-full w-14 h-14 shadow-lg"
          style={{ backgroundColor: '#123458' }}
        >
          <Plus className="w-6 h-6 text-white" />
        </Button>

        {/* Segundo item */}
        <button
          onClick={() => navigate(navItems[1].path)}
          className={`flex flex-col items-center py-2 px-6 rounded-lg transition-colors ${
            isActive(navItems[1].path)
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <navItems[1].icon className="w-5 h-5 mb-1" />
          <span className="text-xs font-medium">{navItems[1].label}</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavigation;
