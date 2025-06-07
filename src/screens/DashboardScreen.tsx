
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
  AlertCircle
} from 'lucide-react';
import StandardHeader from '@/components/StandardHeader';
import { useDashboard } from '@/hooks/useApiDashboard';
import { useCasos } from '@/hooks/useApiCasos';
import { useAuth } from '@/hooks/useAuth';

const DashboardScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [periodFilter, setPeriodFilter] = useState('30');
  const [statusFilter, setStatusFilter] = useState('todos');
  
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

        {/* Cards de Recursos */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 text-sm font-medium">Total Vítimas</p>
                  <p className="text-2xl font-bold text-yellow-700">
                    {dashboardData?.totalVitimas || 0}
                  </p>
                </div>
                <Users className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 text-sm font-medium">Total Evidências</p>
                  <p className="text-2xl font-bold text-orange-700">
                    {dashboardData?.totalEvidencias || 0}
                  </p>
                </div>
                <Camera className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-600 text-sm font-medium">Total Laudos</p>
                  <p className="text-2xl font-bold text-indigo-700">
                    {dashboardData?.totalLaudos || 0}
                  </p>
                </div>
                <FileText className="h-8 w-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>
        </div>

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
