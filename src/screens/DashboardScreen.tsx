
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Plus, FileText, Camera, BarChart3, Search, Filter } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const DashboardScreen = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Dados para o gráfico de status de casos
  const statusData = [
    { name: 'Em andamento', value: 60, color: '#123458' },
    { name: 'Concluídos', value: 40, color: '#F59E0B' },
    { name: 'Arquivados', value: 40, color: '#EF4444' }
  ];

  // Dados para o gráfico de total de casos por mês
  const monthlyData = [
    { month: 'Dezembro', cases: 120 },
    { month: 'Janeiro', cases: 110 },
    { month: 'Fevereiro', cases: 90 },
    { month: 'Março', cases: 125 },
    { month: 'Abril', cases: 111 }
  ];

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
      {/* Header com busca */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar caso"
            className="pl-10 bg-white"
          />
        </div>
        <Button 
          size="icon"
          variant="outline"
          className="bg-white"
        >
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Gráfico de Status de Casos */}
      <Card style={{ backgroundColor: '#D4C9BE' }} className="border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-gray-800 text-center">Status de casos</CardTitle>
          <p className="text-sm text-gray-600 text-center">Abril</p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div className="w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col space-y-2 flex-1 ml-4">
              {statusData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-700">
                    {item.value}% {item.name.toLowerCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Total de Casos */}
      <Card style={{ backgroundColor: '#D4C9BE' }} className="border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-gray-800 text-center">Total de casos</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 0, left: 0, bottom: 5 }}>
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <YAxis hide />
                <Bar 
                  dataKey="cases" 
                  fill="#123458" 
                  radius={[4, 4, 0, 0]}
                  label={{ position: 'top', fontSize: 12, fill: '#374151' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

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

      {/* Stats Resumo */}
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
