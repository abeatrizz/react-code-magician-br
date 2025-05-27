
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: '🏠',
      path: '/dashboard'
    },
    {
      id: 'new-case',
      label: 'Novo caso',
      icon: '➕',
      path: '/new-case'
    },
    {
      id: 'cases',
      label: 'Casos',
      icon: '📋',
      path: '/cases'
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path || 
           (path === '/cases' && location.pathname.startsWith('/cases'));
  };

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 border-t bg-white shadow-lg"
      style={{ backgroundColor: '#D4C9BE' }}
    >
      <div className="flex justify-around items-center py-2 px-4">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-colors ${
              isActive(item.path) 
                ? 'bg-white text-gray-800' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
