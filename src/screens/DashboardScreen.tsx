
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const DashboardScreen = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Dados mockados baseados na imagem
  const caseStats = {
    emAndamento: 60,
    concluidos: 40,
    arquivados: 40
  };

  const monthlyData = [
    { month: 'Dezembro', cases: 120 },
    { month: 'Janeiro', cases: 110 },
    { month: 'Fevereiro', cases: 90 },
    { month: 'Março', cases: 125 },
    { month: 'Abril', cases: 111 }
  ];

  return (
    <div className="p-4 pb-20 space-y-6" style={{ backgroundColor: '#f5f5f0' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Olá, {user?.name?.split(' ')[0]}!</h1>
          <p className="text-gray-600">Bem-vindo ao sistema</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate('/new-case')}
          style={{ borderColor: '#123458', color: '#123458' }}
        >
          + Novo Caso
        </Button>
      </div>

      {/* Status de casos */}
      <Card style={{ backgroundColor: '#D4C9BE' }} className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-gray-800">Status de casos</CardTitle>
          <p className="text-center text-sm text-gray-600">Abril</p>
        </CardHeader>
        <CardContent>
          {/* Gráfico circular simulado */}
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-32 h-32">
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(#123458 0deg 216deg, #D4A574 216deg 360deg, #DC3545 360deg)`
                }}
              ></div>
              <div className="absolute inset-4 bg-white rounded-full"></div>
            </div>
          </div>
          
          {/* Legenda */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#123458' }}></div>
              <span className="text-sm text-gray-700">{caseStats.emAndamento}% em andamento</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#D4A574' }}></div>
              <span className="text-sm text-gray-700">{caseStats.concluidos}% concluídos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#DC3545' }}></div>
              <span className="text-sm text-gray-700">{caseStats.arquivados}% arquivados</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total de casos */}
      <Card style={{ backgroundColor: '#D4C9BE' }} className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-gray-800">Total de casos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-end">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex flex-col items-center">
                <div 
                  className="w-8 mb-2"
                  style={{ 
                    height: `${data.cases / 2}px`,
                    backgroundColor: '#123458',
                    borderRadius: '2px'
                  }}
                ></div>
                <span className="text-xs text-gray-600 transform -rotate-45 whitespace-nowrap">
                  {data.month}
                </span>
                <span className="text-xs font-semibold text-gray-800">{data.cases}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={() => navigate('/cases')}
          className="h-16 text-white"
          style={{ backgroundColor: '#123458' }}
        >
          Ver Todos os Casos
        </Button>
        <Button
          onClick={() => navigate('/reports')}
          variant="outline"
          className="h-16"
          style={{ borderColor: '#123458', color: '#123458' }}
        >
          Relatórios
        </Button>
      </div>
    </div>
  );
};

export default DashboardScreen;
