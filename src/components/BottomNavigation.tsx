
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Plus, FileText } from 'lucide-react';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || 
           (path === '/cases' && location.pathname.startsWith('/cases'));
  };

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 border-t bg-white shadow-lg z-50"
      style={{ backgroundColor: '#D4C9BE' }}
    >
      <div className="flex justify-around items-center py-3 px-4 relative">
        {/* Home Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-colors ${
            isActive('/dashboard') 
              ? 'text-white' 
              : 'hover:bg-blue-50'
          }`}
          style={{
            color: isActive('/dashboard') ? 'white' : '#123458',
            backgroundColor: isActive('/dashboard') ? '#123458' : 'transparent'
          }}
        >
          <Home className="h-6 w-6" />
          <span className="text-xs font-medium">Home</span>
        </Button>

        {/* Novo Caso Button - Destaque no meio */}
        <Button 
          onClick={() => navigate('/new-case')}
          className="flex flex-col items-center gap-1 p-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 absolute left-1/2 transform -translate-x-1/2 -translate-y-2"
          style={{ 
            backgroundColor: '#123458',
            color: 'white',
            width: '70px',
            height: '70px'
          }}
        >
          <Plus className="h-8 w-8" />
          <span className="text-xs font-bold">Novo</span>
        </Button>

        {/* Cases Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/cases')}
          className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-colors ${
            isActive('/cases') 
              ? 'text-white' 
              : 'hover:bg-blue-50'
          }`}
          style={{
            color: isActive('/cases') ? 'white' : '#123458',
            backgroundColor: isActive('/cases') ? '#123458' : 'transparent'
          }}
        >
          <FileText className="h-6 w-6" />
          <span className="text-xs font-medium">Casos</span>
        </Button>
      </div>
    </div>
  );
};

export default BottomNavigation;
