
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Logo from '@/components/Logo';
import { useAuth } from '@/hooks/useAuth';

interface HeaderWithProfileProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  showBackButton?: boolean;
}

const HeaderWithProfile: React.FC<HeaderWithProfileProps> = ({ 
  title, 
  subtitle, 
  onBack,
  showBackButton = true 
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  };

  return (
    <div className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg shadow-sm mb-4 sm:mb-6">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {showBackButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="text-gray-600 hover:text-gray-800 shrink-0"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        )}
        <div className="hidden sm:block">
          <Logo size="medium" variant="dark" />
        </div>
        <div className="sm:hidden">
          <Logo size="small" variant="dark" />
        </div>
      </div>
      
      <div className="text-center min-w-0 flex-1 px-2">
        <h1 className="text-lg sm:text-xl font-bold text-gray-800 truncate">{title}</h1>
        {subtitle && <p className="text-xs sm:text-sm text-gray-600 truncate">{subtitle}</p>}
      </div>
      
      <button
        onClick={() => navigate('/profile')}
        className="flex items-center gap-1 sm:gap-2 hover:bg-gray-50 rounded-lg p-1 sm:p-2 transition-colors shrink-0"
      >
        <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
          <AvatarImage src="" />
          <AvatarFallback style={{ backgroundColor: '#123458', color: 'white' }} className="text-xs sm:text-sm">
            {getInitials(user?.nome || '')}
          </AvatarFallback>
        </Avatar>
        <div className="text-left hidden md:block">
          <p className="text-sm font-medium text-gray-900 truncate max-w-24">{user?.nome || 'Usuário'}</p>
          <p className="text-xs text-gray-500 truncate max-w-24">{user?.email || ''}</p>
        </div>
      </button>
    </div>
  );
};

export default HeaderWithProfile;
