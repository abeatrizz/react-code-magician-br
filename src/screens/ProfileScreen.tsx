
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Settings, Users } from 'lucide-react';
import Logo from '@/components/Logo';

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    cpf: user?.cpf || ''
  });

  const handleSave = () => {
    // Implementar lógica de salvar perfil
    console.log('Salvando perfil:', formData);
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="p-4 pb-20 space-y-4" style={{ backgroundColor: '#f5f5f0' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/dashboard')}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Logo size="medium" variant="dark" />
        </div>
      </div>

      {/* Perfil do Usuário */}
      <Card style={{ backgroundColor: '#D4C9BE' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ color: '#123458' }}>
            <User className="h-5 w-5" />
            Meu Perfil
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              disabled={!isEditing}
              className="bg-white"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              disabled={!isEditing}
              className="bg-white"
            />
          </div>
          <div>
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              type="text"
              value={formData.cpf}
              disabled={true}
              className="bg-gray-100"
            />
          </div>
          <div>
            <Label htmlFor="role">Função</Label>
            <Input
              id="role"
              type="text"
              value={user?.role === 'admin' ? 'Administrador' : user?.role === 'perito' ? 'Perito' : 'Assistente'}
              disabled={true}
              className="bg-gray-100"
            />
          </div>
          <div className="flex gap-2">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                style={{ backgroundColor: '#123458' }}
              >
                <Settings className="h-4 w-4 mr-2" />
                Editar Perfil
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleSave}
                  style={{ backgroundColor: '#123458' }}
                >
                  Salvar
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancelar
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Gerenciamento de Usuários (apenas para admin) */}
      {user?.role === 'admin' && (
        <Card style={{ backgroundColor: '#D4C9BE' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2" style={{ color: '#123458' }}>
              <Users className="h-5 w-5" />
              Gerenciamento de Usuários
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => navigate('/admin/users')}
              style={{ backgroundColor: '#123458' }}
              className="w-full"
            >
              Gerenciar Usuários
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Logout */}
      <Card style={{ backgroundColor: '#D4C9BE' }}>
        <CardContent className="pt-6">
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full"
          >
            Sair
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileScreen;
