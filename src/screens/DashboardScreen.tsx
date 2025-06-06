
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Brain, TrendingUp, Users, Camera, FileText, Search } from 'lucide-react';
import Logo from '@/components/Logo';

const DashboardScreen = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('mes');
  const [analysisType, setAnalysisType] = useState('geral');

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

  // Dados de análise IA
  const aiAnalysisData = [
    { type: 'Padrões Dentários', matches: 45, accuracy: 92 },
    { type: 'Reconhecimento Facial', matches: 23, accuracy: 88 },
    { type: 'Análise Comparativa', matches: 67, accuracy: 95 }
  ];

  return (
    <div className="p-4 pb-24 space-y-4" style={{ backgroundColor: '#f5f5f0' }}>
      {/* Header com Logo */}
      <div className="flex items-center justify-between mb-6 p-4 bg-white rounded-lg shadow-sm">
        <Logo size="large" variant="dark" />
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm text-gray-600">Bem-vindo</p>
            <p className="font-semibold text-gray-800">{user?.name}</p>
          </div>
          <Avatar 
            className="cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/profile')}
          >
            <AvatarImage src="" alt={user?.name} />
            <AvatarFallback style={{ backgroundColor: '#123458', color: 'white' }}>
              {user?.name?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Filtros Interativos */}
      <Card style={{ backgroundColor: '#D4C9BE' }} className="border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-gray-800 flex items-center gap-2">
            <Search className="w-5 h-5" />
            Filtros e Análises
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-40 bg-white">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semana">Última Semana</SelectItem>
              <SelectItem value="mes">Último Mês</SelectItem>
              <SelectItem value="trimestre">Último Trimestre</SelectItem>
              <SelectItem value="ano">Último Ano</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={analysisType} onValueChange={setAnalysisType}>
            <SelectTrigger className="w-40 bg-white">
              <SelectValue placeholder="Análise" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="geral">Visão Geral</SelectItem>
              <SelectItem value="ia">Análise IA</SelectItem>
              <SelectItem value="evidencias">Evidências</SelectItem>
              <SelectItem value="correspondencias">Correspondências</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            className="flex items-center gap-2 bg-white border-blue-300 text-blue-700 hover:bg-blue-50"
          >
            <Brain className="w-4 h-4" />
            ML Insights
          </Button>
        </CardContent>
      </Card>

      {/* Stats Resumo Expandido */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card style={{ backgroundColor: '#D4C9BE' }} className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <FileText className="w-6 h-6 text-blue-600 mr-2" />
              <p className="text-2xl font-bold text-gray-800">12</p>
            </div>
            <p className="text-sm text-gray-600">Casos Ativos</p>
            <div className="flex items-center justify-center mt-1">
              <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              <span className="text-xs text-green-600">+8%</span>
            </div>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: '#D4C9BE' }} className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-6 h-6 text-purple-600 mr-2" />
              <p className="text-2xl font-bold text-gray-800">28</p>
            </div>
            <p className="text-sm text-gray-600">Vítimas</p>
            <div className="flex items-center justify-center mt-1">
              <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              <span className="text-xs text-green-600">+12%</span>
            </div>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: '#D4C9BE' }} className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Camera className="w-6 h-6 text-orange-600 mr-2" />
              <p className="text-2xl font-bold text-gray-800">145</p>
            </div>
            <p className="text-sm text-gray-600">Evidências</p>
            <div className="flex items-center justify-center mt-1">
              <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              <span className="text-xs text-green-600">+15%</span>
            </div>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: '#D4C9BE' }} className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Brain className="w-6 h-6 text-green-600 mr-2" />
              <p className="text-2xl font-bold text-gray-800">89</p>
            </div>
            <p className="text-sm text-gray-600">Correspondências</p>
            <div className="flex items-center justify-center mt-1">
              <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              <span className="text-xs text-green-600">+22%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Análise IA - Machine Learning Insights */}
      {analysisType === 'ia' && (
        <Card style={{ backgroundColor: '#D4C9BE' }} className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-gray-800 flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Análise por Inteligência Artificial
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiAnalysisData.map((analysis, index) => (
                <div key={index} className="bg-white/60 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800">{analysis.type}</h4>
                    <span className="text-sm font-semibold text-green-600">{analysis.accuracy}% precisão</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${analysis.accuracy}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">{analysis.matches} correspondências</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Gráfico de Status de Casos */}
      <Card style={{ backgroundColor: '#D4C9BE' }} className="border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-gray-800 text-center">Status de casos</CardTitle>
          <p className="text-sm text-gray-600 text-center">
            {timeFilter === 'mes' ? 'Último mês' : 'Período selecionado'}
          </p>
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
    </div>
  );
};

export default DashboardScreen;
