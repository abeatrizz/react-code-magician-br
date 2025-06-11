
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, ScatterChart, Scatter
} from 'recharts';
import { 
  FileText, Users, AlertTriangle, CheckCircle, 
  Archive, Eye, Calendar, TrendingUp, BarChart3,
  PieChart as PieChartIcon, MapPin, Zap
} from 'lucide-react';
import StandardHeader from '@/components/StandardHeader';
import { useDashboard } from '@/hooks/useLocalData';
import { useAuth } from '@/hooks/useAuth';

const DashboardScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [filterPeriod, setFilterPeriod] = useState('todos');
  const [chartType, setChartType] = useState('status');

  const { data: dashboardData, isLoading } = useDashboard({ period: filterPeriod });

  // Mock data for charts
  const statusData = [
    { name: 'Em andamento', value: dashboardData?.casosEmAndamento || 1, color: '#3B82F6' },
    { name: 'Finalizados', value: dashboardData?.casosFinalizados || 1, color: '#10B981' },
    { name: 'Arquivados', value: dashboardData?.casosArquivados || 1, color: '#6B7280' },
  ];

  const temporalData = [
    { mes: 'Jan', casos: 5, vitimas: 8, evidencias: 15 },
    { mes: 'Fev', casos: 3, vitimas: 4, evidencias: 12 },
    { mes: 'Mar', casos: 7, vitimas: 10, evidencias: 22 },
    { mes: 'Abr', casos: 4, vitimas: 6, evidencias: 18 },
    { mes: 'Mai', casos: 6, vitimas: 9, evidencias: 25 },
    { mes: 'Jun', casos: 2, vitimas: 3, evidencias: 8 },
  ];

  const monthlyComparison = [
    { mes: 'Jan', atual: 5, anterior: 3 },
    { mes: 'Fev', atual: 3, anterior: 7 },
    { mes: 'Mar', atual: 7, anterior: 4 },
    { mes: 'Abr', atual: 4, anterior: 6 },
    { mes: 'Mai', atual: 6, anterior: 2 },
    { mes: 'Jun', atual: 2, anterior: 5 },
  ];

  const ageDistribution = [
    { faixa: '0-18', casos: 2 },
    { faixa: '19-30', casos: 8 },
    { faixa: '31-45', casos: 12 },
    { faixa: '46-60', casos: 15 },
    { faixa: '60+', casos: 6 },
  ];

  const clusterData = [
    { x: 23, y: 45, cluster: 'Grupo A', size: 8 },
    { x: 56, y: 32, cluster: 'Grupo A', size: 12 },
    { x: 78, y: 67, cluster: 'Grupo B', size: 6 },
    { x: 34, y: 78, cluster: 'Grupo B', size: 10 },
    { x: 89, y: 23, cluster: 'Grupo C', size: 4 },
    { x: 45, y: 89, cluster: 'Grupo C', size: 7 },
  ];

  const getChartComponent = () => {
    switch (chartType) {
      case 'status':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      case 'temporal':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={temporalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="casos" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="vitimas" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="evidencias" stroke="#F59E0B" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'comparison':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="atual" fill="#3B82F6" name="Período Atual" />
              <Bar dataKey="anterior" fill="#9CA3AF" name="Período Anterior" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'age':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="faixa" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="casos" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'clusters':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={clusterData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey="x" />
              <YAxis type="number" dataKey="y" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter dataKey="size" fill="#8B5CF6" />
            </ScatterChart>
          </ResponsiveContainer>
        );
      
      default:
        return <div className="flex items-center justify-center h-[300px] text-gray-500">Selecione um tipo de gráfico</div>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#f5f5f0' }}>
        <StandardHeader title="Dashboard" />
        <div className="p-4 pb-24">
          <div className="flex items-center justify-center py-8">
            <div className="animate-pulse text-gray-500">Carregando dashboard...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f0' }}>
      <StandardHeader 
        title="Dashboard" 
        subtitle={`Bem-vindo, ${user?.nome}`}
      />

      <div className="p-4 pb-24 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Total Casos</p>
                  <p className="text-2xl font-bold text-blue-700">{dashboardData?.totalCasos || 0}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Vítimas</p>
                  <p className="text-2xl font-bold text-green-700">{dashboardData?.totalVitimas || 0}</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 text-sm font-medium">Evidências</p>
                  <p className="text-2xl font-bold text-yellow-700">{dashboardData?.totalEvidencias || 0}</p>
                </div>
                <Eye className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Laudos</p>
                  <p className="text-2xl font-bold text-purple-700">{dashboardData?.totalLaudos || 0}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart Controls */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Análises e Visualizações</h3>
                <p className="text-sm text-gray-600">Explore diferentes perspectivas dos dados odonto-legais</p>
              </div>
              
              <div className="flex gap-2">
                <Select value={chartType} onValueChange={setChartType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Tipo de análise" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="status">
                      <div className="flex items-center gap-2">
                        <PieChartIcon className="w-4 h-4" />
                        Distribuição por Status
                      </div>
                    </SelectItem>
                    <SelectItem value="temporal">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Evolução Temporal
                      </div>
                    </SelectItem>
                    <SelectItem value="comparison">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Comparação Mensal
                      </div>
                    </SelectItem>
                    <SelectItem value="age">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Distribuição de Idades
                      </div>
                    </SelectItem>
                    <SelectItem value="clusters">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Análise de Clusters (ML)
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="7d">7 dias</SelectItem>
                    <SelectItem value="30d">30 dias</SelectItem>
                    <SelectItem value="90d">90 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Chart */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {chartType === 'status' && <PieChartIcon className="w-5 h-5" />}
              {chartType === 'temporal' && <TrendingUp className="w-5 h-5" />}
              {chartType === 'comparison' && <BarChart3 className="w-5 h-5" />}
              {chartType === 'age' && <Users className="w-5 h-5" />}
              {chartType === 'clusters' && <Zap className="w-5 h-5" />}
              
              {chartType === 'status' && 'Distribuição de Casos por Status'}
              {chartType === 'temporal' && 'Evolução Temporal dos Dados'}
              {chartType === 'comparison' && 'Comparação de Casos por Mês'}
              {chartType === 'age' && 'Distribuição de Idades das Vítimas'}
              {chartType === 'clusters' && 'Agrupamento por Machine Learning'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {getChartComponent()}
          </CardContent>
        </Card>

        {/* Spatial Distribution Map Placeholder */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Distribuição Espacial dos Casos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="font-medium">Mapa de Distribuição Espacial</p>
                <p className="text-sm">Visualização geográfica dos casos será implementada</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/cases')}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Gerenciar Casos</h4>
                  <p className="text-sm text-gray-600">Visualizar e editar casos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/laudos')}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Laudos Periciais</h4>
                  <p className="text-sm text-gray-600">Criar e gerenciar laudos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/relatorios')}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Relatórios</h4>
                  <p className="text-sm text-gray-600">Gerar relatórios estatísticos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
