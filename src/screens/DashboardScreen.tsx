
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
import { useCasos } from '@/hooks/useApiCasos';
import { useEvidencias } from '@/hooks/useApiEvidencias';
import { useLaudos } from '@/hooks/useApiLaudos';
import { useAuth } from '@/hooks/useAuth';

const DashboardScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [periodFilter, setPeriodFilter] = useState('30');
  const [statusFilter, setStatusFilter] = useState('todos');
  
  const { data: casos = [], isLoading: casosLoading } = useCasos();
  const { data: evidencias = [], isLoading: evidenciasLoading } = useEvidencias();
  const { data: laudos = [], isLoading: laudosLoading } = useLaudos();

  const filteredCasos = casos.filter(caso => {
    const matchesStatus = statusFilter === 'todos' || caso.status === statusFilter;
    const caseDate = new Date(caso.criadoEm);
    const periodDays = parseInt(periodFilter);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - periodDays);
    const matchesPeriod = caseDate >= cutoffDate;
    
    return matchesStatus && matchesPeriod;
  });

  const getRecentCasos = () => {
    return casos
      .sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime())
      .slice(0, 5);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Data não informada';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'aberto':
        return 'Aberto';
      case 'em_andamento':
        return 'Em Andamento';
      case 'finalizado':
        return 'Finalizado';
      case 'arquivado':
        return 'Arquivado';
      default:
        return status;
    }
  };

  if (casosLoading || evidenciasLoading || laudosLoading) {
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
              <SelectItem value="aberto">Aberto</SelectItem>
              <SelectItem value="em_andamento">Em Andamento</SelectItem>
              <SelectItem value="finalizado">Finalizado</SelectItem>
              <SelectItem value="arquivado">Arquivado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 text-sm font-medium">Abertos</p>
                  <p className="text-2xl font-bold text-yellow-700">
                    {filteredCasos.filter(c => c.status === 'aberto').length}
                  </p>
                </div>
                <AlertCircle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Em Andamento</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {filteredCasos.filter(c => c.status === 'em_andamento').length}
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
                    {filteredCasos.filter(c => c.status === 'finalizado').length}
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
                    {filteredCasos.filter(c => c.status === 'arquivado').length}
                  </p>
                </div>
                <Archive className="h-8 w-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cards de Recursos */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Total Evidências</p>
                  <p className="text-2xl font-bold text-purple-700">
                    {evidencias.length}
                  </p>
                </div>
                <Camera className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 text-sm font-medium">Total Laudos</p>
                  <p className="text-2xl font-bold text-orange-700">
                    {laudos.length}
                  </p>
                </div>
                <FileText className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-600 text-sm font-medium">Total Casos</p>
                  <p className="text-2xl font-bold text-indigo-700">
                    {casos.length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-indigo-600" />
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
                        caso.status === 'aberto' ? 'bg-yellow-100 text-yellow-800' :
                        caso.status === 'em_andamento' ? 'bg-blue-100 text-blue-800' :
                        caso.status === 'finalizado' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {getStatusLabel(caso.status || 'aberto')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{caso.titulo || 'Título não informado'}</p>
                    <p className="text-xs text-gray-500">
                      📅 {formatDate(caso.criadoEm)}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                onClick={() => navigate('/evidencias')}
                variant="outline"
                className="h-16"
              >
                <Camera className="w-5 h-5 mr-2" />
                Gerenciar Evidências
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardScreen;
