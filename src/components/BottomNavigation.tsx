
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, FolderOpen, FileText, User } from 'lucide-react';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Início', path: '/dashboard' },
    { icon: FolderOpen, label: 'Casos', path: '/cases' },
    { icon: FileText, label: 'Laudos', path: '/laudos' },
    { icon: User, label: 'Perfil', path: '/profile' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || 
           (path === '/cases' && location.pathname.startsWith('/cases')) ||
           (path === '/laudos' && location.pathname.startsWith('/laudos'));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
