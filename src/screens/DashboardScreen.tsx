
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  Camera, 
  TrendingUp, 
  Calendar,
  Clock,
  CheckCircle,
  Filter,
  Plus,
  Archive,
  BarChart3,
  PieChart,
  MapPin
} from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import StandardHeader from '@/components/StandardHeader';
import { useDashboard } from '@/hooks/useApiDashboard';
import { useCasos } from '@/hooks/useApiCasos';
import { useAuth } from '@/hooks/useAuth';

const DashboardScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [periodFilter, setPeriodFilter] = useState('30');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [chartType, setChartType] = useState('pie');
  
  const { data: dashboardData, isLoading: dashboardLoading } = useDashboard();
  const { data: casos = [], isLoading: casosLoading } = useCasos();

  const filteredCasos = casos.filter(caso => {
    const matchesStatus = statusFilter === 'todos' || caso.status === statusFilter;
    const caseDate = new Date(caso.dataCriacao);
    const periodDays = parseInt(periodFilter);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - periodDays);
    const matchesPeriod = caseDate >= cutoffDate;
    
    return matchesStatus && matchesPeriod;
  });

  // Dados para gráfico de pizza/rosquinha
  const statusData = [
    { name: 'Em Andamento', value: filteredCasos.filter(c => c.status === 'Em andamento').length, fill: '#3b82f6' },
    { name: 'Finalizados', value: filteredCasos.filter(c => c.status === 'Finalizado').length, fill: '#10b981' },
    { name: 'Arquivados', value: filteredCasos.filter(c => c.status === 'Arquivado').length, fill: '#6b7280' }
  ];

  // Dados para distribuição temporal (últimos 7 dias)
  const temporalData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dateStr = date.toISOString().split('T')[0];
    const casosNoDia = casos.filter(caso => 
      caso.dataCriacao && caso.dataCriacao.split('T')[0] === dateStr
    ).length;
    
    return {
      data: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      casos: casosNoDia
    };
  });

  // Dados para comparação mensal (últimos 6 meses)
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - i));
    const month = date.getMonth();
    const year = date.getFullYear();
    
    const casosNoMes = casos.filter(caso => {
      if (!caso.dataCriacao) return false;
      const casoDate = new Date(caso.dataCriacao);
      return casoDate.getMonth() === month && casoDate.getFullYear() === year;
    }).length;
    
    return {
      mes: date.toLocaleDateString('pt-BR', { month: 'short' }),
      casos: casosNoMes,
      meta: 15 // Meta fictícia para comparação
    };
  });

  // Simulação de dados de idade (já que não temos campo idade nos casos)
  const ageData = [
    { faixa: '0-17', casos: Math.floor(Math.random() * 20) },
    { faixa: '18-30', casos: Math.floor(Math.random() * 30) },
    { faixa: '31-45', casos: Math.floor(Math.random() * 25) },
    { faixa: '46-60', casos: Math.floor(Math.random() * 20) },
    { faixa: '60+', casos: Math.floor(Math.random() * 15) }
  ];

  // Simulação de clusters de ML
  const clusterData = [
    { cluster: 'Cluster A', casos: Math.floor(Math.random() * 40), caracteristica: 'Casos Urbanos' },
    { cluster: 'Cluster B', casos: Math.floor(Math.random() * 30), caracteristica: 'Casos Rurais' },
    { cluster: 'Cluster C', casos: Math.floor(Math.random() * 25), caracteristica: 'Casos Complexos' }
  ];

  const getRecentCasos = () => {
    return casos
      .sort((a, b) => new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime())
      .slice(0, 5);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Data não informada';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'Em andamento':
        return 'Em Andamento';
      case 'Finalizado':
        return 'Finalizado';
      case 'Arquivado':
        return 'Arquivado';
      default:
        return status;
    }
  };

  if (dashboardLoading || casosLoading) {
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
        rightElement={
          <Button
            size="sm"
            onClick={() => navigate('/new-case')}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-1" />
            Novo
          </Button>
        }
      />

      <div className="p-4 pb-24 space-y-6">
        {/* Saudação personalizada */}
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-blue-900">
                  Bem-vindo, {user?.nome || 'Usuário'}!
                </h2>
                <p className="text-blue-700">
                  Tipo de usuário: {user?.tipoUsuario?.toUpperCase() || 'USUÁRIO'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filtros */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filtros:</span>
          </div>
          
          <Select value={periodFilter} onValueChange={setPeriodFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Últimos 7 dias</SelectItem>
              <SelectItem value="30">Últimos 30 dias</SelectItem>
              <SelectItem value="90">Últimos 90 dias</SelectItem>
              <SelectItem value="365">Último ano</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Status</SelectItem>
              <SelectItem value="Em andamento">Em Andamento</SelectItem>
              <SelectItem value="Finalizado">Finalizado</SelectItem>
              <SelectItem value="Arquivado">Arquivado</SelectItem>
            </SelectContent>
          </Select>

          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pie">Gráfico Pizza</SelectItem>
              <SelectItem value="donut">Gráfico Rosquinha</SelectItem>
              <SelectItem value="bar">Gráfico Barras</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Em Andamento</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {dashboardData?.casosEmAndamento || filteredCasos.filter(c => c.status === 'Em andamento').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Finalizados</p>
                  <p className="text-2xl font-bold text-green-700">
                    {dashboardData?.casosFinalizados || filteredCasos.filter(c => c.status === 'Finalizado').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Arquivados</p>
                  <p className="text-2xl font-bold text-gray-700">
                    {dashboardData?.casosArquivados || filteredCasos.filter(c => c.status === 'Arquivado').length}
                  </p>
                </div>
                <Archive className="h-8 w-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Total</p>
                  <p className="text-2xl font-bold text-purple-700">
                    {dashboardData?.totalCasos || casos.length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos Analíticos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Frequência Relativa dos Casos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-blue-600" />
                Distribuição de Status dos Casos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{
                emAndamento: { label: "Em Andamento", color: "#3b82f6" },
                finalizados: { label: "Finalizados", color: "#10b981" },
                arquivados: { label: "Arquivados", color: "#6b7280" }
              }}>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={chartType === 'donut' ? 60 : 0}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Distribuição Temporal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Casos por Dia (Últimos 7 dias)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{
                casos: { label: "Casos", color: "#3b82f6" }
              }}>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={temporalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="data" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="casos" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Comparação Mensal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                Comparação Mensal vs Meta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{
                casos: { label: "Casos", color: "#8b5cf6" },
                meta: { label: "Meta", color: "#10b981" }
              }}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="casos" fill="#8b5cf6" />
                    <Bar dataKey="meta" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Distribuição de Idades */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-600" />
                Distribuição por Faixa Etária
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{
                casos: { label: "Casos", color: "#f97316" }
              }}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={ageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="faixa" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="casos" fill="#f97316" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Análise de Machine Learning */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              Análise de Clusters (Machine Learning)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {clusterData.map((cluster, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900">{cluster.cluster}</h4>
                  <p className="text-2xl font-bold text-indigo-600">{cluster.casos} casos</p>
                  <p className="text-sm text-gray-600">{cluster.caracteristica}</p>
                </div>
              ))}
            </div>
            <ChartContainer config={{
              casos: { label: "Casos", color: "#6366f1" }
            }}>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={clusterData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="cluster" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="casos" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Distribuição Espacial (Mapa Simulado) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-red-600" />
              Distribuição Espacial dos Casos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Mapa de distribuição espacial</p>
                <p className="text-sm text-gray-500">Integração com mapas será implementada</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Casos Recentes */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Casos Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getRecentCasos().map((caso) => (
                <div 
                  key={caso._id}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900">#{caso._id?.slice(-6) || 'N/A'}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        caso.status === 'Em andamento' ? 'bg-blue-100 text-blue-800' :
                        caso.status === 'Finalizado' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {getStatusLabel(caso.status || 'Em andamento')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{caso.titulo || 'Título não informado'}</p>
                    <p className="text-xs text-gray-500">
                      📅 {formatDate(caso.dataCriacao)}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/cases/${caso._id}`)}
                    className="ml-4"
                  >
                    Ver
                  </Button>
                </div>
              ))}
              
              {getRecentCasos().length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p>Nenhum caso encontrado</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Área de Ações Rápidas */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <TrendingUp className="h-5 w-5" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button
                onClick={() => navigate('/new-case')}
                className="bg-blue-600 hover:bg-blue-700 text-white h-16"
              >
                <Plus className="w-5 h-5 mr-2" />
                Novo Caso
              </Button>
              <Button
                onClick={() => navigate('/cases')}
                variant="outline"
                className="h-16"
              >
                <FileText className="w-5 h-5 mr-2" />
                Ver Todos os Casos
              </Button>
              <Button
                onClick={() => navigate('/laudos')}
                variant="outline"
                className="h-16"
              >
                <FileText className="w-5 h-5 mr-2" />
                Laudos
              </Button>
              <Button
                onClick={() => navigate('/relatorios')}
                variant="outline"
                className="h-16"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Relatórios
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardScreen;
