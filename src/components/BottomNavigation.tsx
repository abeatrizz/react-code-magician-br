
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, FolderOpen, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log('BottomNavigation - current location:', location.pathname);

  const navItems = [
    { icon: Home, label: 'Início', path: '/dashboard' },
    { icon: FolderOpen, label: 'Casos', path: '/cases' },
  ];

  const isActive = (path: string) => {
    const active = location.pathname === path || 
           (path === '/cases' && location.pathname.startsWith('/cases'));
    console.log(`Checking if ${path} is active for ${location.pathname}:`, active);
    return active;
  };

  const handleNavigation = (path: string) => {
    console.log('Navigating to:', path);
    navigate(path);
  };

  const FirstIcon = navItems[0].icon;
  const SecondIcon = navItems[1].icon;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 sm:px-4 py-2 z-50 shadow-lg">
      <div className="flex justify-around items-center relative max-w-md mx-auto">
        {/* Primeiro item */}
        <button
          onClick={() => handleNavigation(navItems[0].path)}
          className={`flex flex-col items-center py-2 px-3 sm:px-6 rounded-lg transition-colors ${
            isActive(navItems[0].path)
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <FirstIcon className="w-4 h-4 sm:w-5 sm:h-5 mb-1" />
          <span className="text-xs font-medium hidden sm:block">{navItems[0].label}</span>
        </button>

        {/* Botão central destacado */}
        <Button
          onClick={() => handleNavigation('/new-case')}
          size="lg"
          className="absolute left-1/2 transform -translate-x-1/2 -translate-y-2 rounded-full w-12 h-12 sm:w-14 sm:h-14 shadow-lg"
          style={{ backgroundColor: '#123458' }}
        >
          <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </Button>

        {/* Segundo item */}
        <button
          onClick={() => handleNavigation(navItems[1].path)}
          className={`flex flex-col items-center py-2 px-3 sm:px-6 rounded-lg transition-colors ${
            isActive(navItems[1].path)
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <SecondIcon className="w-4 h-4 sm:w-5 sm:h-5 mb-1" />
          <span className="text-xs font-medium hidden sm:block">{navItems[1].label}</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavigation;
