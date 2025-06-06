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
  AlertTriangle,
  CheckCircle,
  Filter,
  Plus
} from 'lucide-react';
import StandardHeader from '@/components/StandardHeader';
import { useCases } from '@/hooks/useApiCases';
import { useAuth } from '@/hooks/useAuth';

const DashboardScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [periodFilter, setPeriodFilter] = useState('30');
  const [statusFilter, setStatusFilter] = useState('todos');
  
  const { data: cases = [], isLoading } = useCases();

  const filteredCases = cases.filter(case_ => {
    const matchesStatus = statusFilter === 'todos' || case_.status === statusFilter;
    const caseDate = new Date(case_.dataAbertura);
    const periodDays = parseInt(periodFilter);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - periodDays);
    const matchesPeriod = caseDate >= cutoffDate;
    
    return matchesStatus && matchesPeriod;
  });

  const getRecentCases = () => {
    return cases
      .sort((a, b) => new Date(b.dataAbertura).getTime() - new Date(a.dataAbertura).getTime())
      .slice(0, 5);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Data não informada';
    return new Date(dateString).toLocaleDateString('pt-BR');
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
              <SelectItem value="Em andamento">Em andamento</SelectItem>
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
                    {filteredCases.filter(c => c.status === 'Em andamento').length}
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
                    {filteredCases.filter(c => c.status === 'Finalizado').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Total Evidências</p>
                  <p className="text-2xl font-bold text-purple-700">
                    {filteredCases.reduce((acc, case_) => acc + (case_.evidencias?.length || 0), 0)}
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
                  <p className="text-orange-600 text-sm font-medium">Total Vítimas</p>
                  <p className="text-2xl font-bold text-orange-700">
                    {filteredCases.reduce((acc, case_) => acc + (case_.vitimas?.length || case_.victims?.length || 0), 0)}
                  </p>
                </div>
                <Users className="h-8 w-8 text-orange-600" />
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
              {getRecentCases().map((case_) => (
                <div 
                  key={case_._id}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900">#{case_._id?.slice(-6) || 'N/A'}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        case_.status === 'Em andamento' ? 'bg-blue-100 text-blue-800' :
                        case_.status === 'Finalizado' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {case_.status || 'Em andamento'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{case_.titulo || 'Título não informado'}</p>
                    <p className="text-xs text-gray-500">
                      📅 {formatDate(case_.dataAbertura)}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/cases/${case_._id}`)}
                    className="ml-4"
                  >
                    Ver
                  </Button>
                </div>
              ))}
              
              {getRecentCases().length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p>Nenhum caso encontrado</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Insights de ML (Preparação para futuro) */}
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-700">
              <TrendingUp className="h-5 w-5" />
              Insights de Machine Learning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-indigo-600 mb-4">
              Sistema de análise inteligente em desenvolvimento. Em breve, insights automáticos sobre padrões nos casos.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="text-lg font-bold text-indigo-700">--</div>
                <div className="text-sm text-indigo-600">Padrões Identificados</div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="text-lg font-bold text-indigo-700">--</div>
                <div className="text-sm text-indigo-600">Correspondências</div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="text-lg font-bold text-indigo-700">--</div>
                <div className="text-sm text-indigo-600">Precisão Média</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardScreen;
