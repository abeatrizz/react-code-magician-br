
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Calendar, Users, FileText, TrendingUp, AlertCircle } from 'lucide-react';
import HeaderWithProfile from '@/components/HeaderWithProfile';
import { useCasos } from '@/hooks/useLocalData';
import { useAuth } from '@/hooks/useAuth';

const DashboardScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: casos = [] } = useCasos();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const stats = {
    totalCasos: casos.length,
    casosAndamento: casos.filter(c => c.status === 'Em andamento').length,
    casosFinalizados: casos.filter(c => c.status === 'Finalizado').length,
    casosArquivados: casos.filter(c => c.status === 'Arquivado').length
  };

  return (
    <div className="p-3 sm:p-4 pb-20 space-y-4 max-w-7xl mx-auto" style={{ backgroundColor: '#f5f5f0' }}>
      <HeaderWithProfile 
        title="Dashboard" 
        subtitle={`${getGreeting()}, ${user?.nome?.split(' ')[0] || 'Usuário'}`}
        showBackButton={false}
      />

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card style={{ backgroundColor: '#D4C9BE' }}>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium truncate" style={{ color: '#123458' }}>Total</p>
                <p className="text-xl sm:text-2xl font-bold" style={{ color: '#123458' }}>{stats.totalCasos}</p>
              </div>
              <FileText className="h-6 w-6 sm:h-8 sm:w-8 shrink-0" style={{ color: '#123458' }} />
            </div>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: '#D4C9BE' }}>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium truncate" style={{ color: '#123458' }}>Em Andamento</p>
                <p className="text-xl sm:text-2xl font-bold" style={{ color: '#123458' }}>{stats.casosAndamento}</p>
              </div>
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 shrink-0" style={{ color: '#123458' }} />
            </div>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: '#D4C9BE' }}>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium truncate" style={{ color: '#123458' }}>Finalizados</p>
                <p className="text-xl sm:text-2xl font-bold" style={{ color: '#123458' }}>{stats.casosFinalizados}</p>
              </div>
              <Calendar className="h-6 w-6 sm:h-8 sm:w-8 shrink-0" style={{ color: '#123458' }} />
            </div>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: '#D4C9BE' }}>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium truncate" style={{ color: '#123458' }}>Arquivados</p>
                <p className="text-xl sm:text-2xl font-bold" style={{ color: '#123458' }}>{stats.casosArquivados}</p>
              </div>
              <Users className="h-6 w-6 sm:h-8 sm:w-8 shrink-0" style={{ color: '#123458' }} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <Card style={{ backgroundColor: '#D4C9BE' }}>
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-lg sm:text-xl" style={{ color: '#123458' }}>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 p-3 sm:p-6 pt-0">
          <Button
            onClick={() => navigate('/new-case')}
            className="w-full justify-start text-sm sm:text-base"
            style={{ backgroundColor: '#123458' }}
          >
            <FileText className="mr-2 h-4 w-4" />
            Novo Caso
          </Button>
          <Button
            onClick={() => navigate('/cases')}
            variant="outline"
            className="w-full justify-start text-sm sm:text-base"
            style={{ borderColor: '#123458', color: '#123458' }}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Ver Todos os Casos
          </Button>
        </CardContent>
      </Card>

      {/* Casos Recentes */}
      <Card style={{ backgroundColor: '#D4C9BE' }}>
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-lg sm:text-xl" style={{ color: '#123458' }}>Casos Recentes</CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0">
          {casos.length === 0 ? (
            <div className="text-center py-6 sm:py-8 text-gray-500">
              <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-sm sm:text-base">Nenhum caso encontrado</p>
            </div>
          ) : (
            <div className="space-y-3">
              {casos.slice(0, 3).map((caso) => (
                <div
                  key={caso._id}
                  className="p-3 bg-white rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/cases/${caso._id}`)}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-gray-900 text-sm sm:text-base truncate">{caso.titulo}</h4>
                      <p className="text-xs sm:text-sm text-gray-600">{caso.status}</p>
                    </div>
                    <span className="text-xs text-gray-500 shrink-0">
                      {new Date(caso.dataCriacao).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardScreen;
