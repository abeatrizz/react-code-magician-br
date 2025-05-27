
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Plus, FileText, Camera, BarChart3 } from 'lucide-react';

const DashboardScreen = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Novo Caso',
      description: 'Registrar novo caso pericial',
      icon: Plus,
      action: () => navigate('/new-case'),
      color: '#123458'
    },
    {
      title: 'Casos Ativos',
      description: 'Ver casos em andamento',
      icon: FileText,
      action: () => navigate('/cases'),
      color: '#D4C9BE'
    },
    {
      title: 'Capturar Evidências',
      description: 'Adicionar evidências aos casos',
      icon: Camera,
      action: () => navigate('/cases'),
      color: '#123458'
    },
    {
      title: 'Relatórios',
      description: 'Visualizar laudos e relatórios',
      icon: BarChart3,
      action: () => navigate('/reports'),
      color: '#D4C9BE'
    }
  ];

  return (
    <div className="p-4 pb-20 space-y-4" style={{ backgroundColor: '#f5f5f0' }}>
      {/* Header */}
      <div className="text-center py-6">
        <h1 className="text-2xl font-bold text-gray-800">Bem-vindo!</h1>
        <p className="text-gray-600">{user?.name}</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        {quickActions.map((action, index) => (
          <Card 
            key={index}
            className="cursor-pointer hover:shadow-lg transition-shadow border-0"
            style={{ backgroundColor: action.color === '#123458' ? '#123458' : '#D4C9BE' }}
            onClick={action.action}
          >
            <CardContent className="p-4 text-center">
              <action.icon 
                className={`w-8 h-8 mx-auto mb-2 ${action.color === '#123458' ? 'text-white' : 'text-gray-700'}`} 
              />
              <h3 className={`font-semibold mb-1 ${action.color === '#123458' ? 'text-white' : 'text-gray-800'}`}>
                {action.title}
              </h3>
              <p className={`text-xs ${action.color === '#123458' ? 'text-gray-200' : 'text-gray-600'}`}>
                {action.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats */}
      <Card style={{ backgroundColor: '#D4C9BE' }} className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-gray-800">Resumo</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-800">12</p>
            <p className="text-sm text-gray-600">Casos Ativos</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">45</p>
            <p className="text-sm text-gray-600">Evidências</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">8</p>
            <p className="text-sm text-gray-600">Laudos</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardScreen;
