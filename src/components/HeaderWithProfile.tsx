
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
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-6">
      <div className="flex items-center gap-3">
        {showBackButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <Logo size="medium" variant="dark" />
      </div>
      <div className="text-center">
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      </div>
      <button
        onClick={() => navigate('/profile')}
        className="flex items-center gap-2 hover:bg-gray-50 rounded-lg p-2 transition-colors"
      >
        <Avatar className="w-8 h-8">
          <AvatarImage src="" />
          <AvatarFallback style={{ backgroundColor: '#123458', color: 'white' }}>
            {getInitials(user?.nome || '')}
          </AvatarFallback>
        </Avatar>
        <div className="text-left hidden sm:block">
          <p className="text-sm font-medium text-gray-900">{user?.nome || 'Usuário'}</p>
          <p className="text-xs text-gray-500">{user?.email || ''}</p>
        </div>
      </button>
    </div>
  );
};

export default HeaderWithProfile;
