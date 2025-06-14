
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Trash2, Eye, Edit, FileText, TrendingUp, Users } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import HeaderWithProfile from '@/components/HeaderWithProfile';
import { useCasos, useDeleteCaso } from '@/hooks/useLocalData';
import { useAuth } from '@/hooks/useAuth';

const CasosScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [sortBy, setSortBy] = useState('data-desc');
  
  const { data: casos = [], isLoading, error } = useCasos();
  const deleteCaso = useDeleteCaso();

  const filteredAndSortedCasos = casos
    .filter(caso => {
      const matchesSearch = caso.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           caso.descricao?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'todos' || caso.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'data-asc':
          return new Date(a.dataCriacao).getTime() - new Date(b.dataCriacao).getTime();
        case 'data-desc':
          return new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime();
        case 'titulo':
          return (a.titulo || '').localeCompare(b.titulo || '');
        default:
          return 0;
      }
    });

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este caso?')) {
      try {
        await deleteCaso.mutateAsync(id);
        window.location.reload();
      } catch (error) {
        console.error('Erro ao excluir caso:', error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Data não informada';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em andamento':
        return 'bg-blue-100 text-blue-800';
      case 'Finalizado':
        return 'bg-green-100 text-green-800';
      case 'Arquivado':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (isLoading) {
    return (
      <div className="p-3 sm:p-4 pb-20 space-y-4 max-w-7xl mx-auto" style={{ backgroundColor: '#f5f5f0' }}>
        <HeaderWithProfile title="Casos" showBackButton={false} />
        <div className="flex items-center justify-center py-8">
          <div className="animate-pulse text-gray-500">Carregando casos...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-3 sm:p-4 pb-20 space-y-4 max-w-7xl mx-auto" style={{ backgroundColor: '#f5f5f0' }}>
        <HeaderWithProfile title="Casos" showBackButton={false} />
        <div className="flex items-center justify-center py-8">
          <Alert variant="destructive" className="max-w-md">
            <AlertDescription>
              Erro ao carregar casos. Verifique sua conexão e tente novamente.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 pb-20 space-y-4 max-w-7xl mx-auto" style={{ backgroundColor: '#f5f5f0' }}>
      <HeaderWithProfile title="Casos" showBackButton={false} />

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <Card style={{ backgroundColor: '#D4C9BE' }}>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium truncate" style={{ color: '#123458' }}>Em Andamento</p>
                <p className="text-xl sm:text-2xl font-bold" style={{ color: '#123458' }}>
                  {casos.filter(c => c.status === 'Em andamento').length}
                </p>
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
                <p className="text-xl sm:text-2xl font-bold" style={{ color: '#123458' }}>
                  {casos.filter(c => c.status === 'Finalizado').length}
                </p>
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
                <p className="text-xl sm:text-2xl font-bold" style={{ color: '#123458' }}>
                  {casos.filter(c => c.status === 'Arquivado').length}
                </p>
              </div>
              <Users className="h-6 w-6 sm:h-8 sm:w-8 shrink-0" style={{ color: '#123458' }} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Busca e Filtros */}
      <Card style={{ backgroundColor: '#D4C9BE' }}>
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar casos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white text-sm"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40 bg-white text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Em andamento">Em Andamento</SelectItem>
                  <SelectItem value="Finalizado">Finalizado</SelectItem>
                  <SelectItem value="Arquivado">Arquivado</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-40 bg-white text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="data-desc">Mais recentes</SelectItem>
                  <SelectItem value="data-asc">Mais antigos</SelectItem>
                  <SelectItem value="titulo">Por título</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Casos */}
      <div className="space-y-4">
        {filteredAndSortedCasos.length === 0 ? (
          <Card style={{ backgroundColor: '#D4C9BE' }}>
            <CardContent className="p-6 sm:p-8">
              <div className="text-center text-gray-500">
                <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-sm sm:text-base">Nenhum caso encontrado</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredAndSortedCasos.map((caso) => (
            <Card key={caso._id} style={{ backgroundColor: '#D4C9BE' }} className="hover:shadow-md transition-shadow">
              <CardContent className="p-3 sm:p-4">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-3 gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <h3 className="font-semibold text-base sm:text-lg truncate" style={{ color: '#123458' }}>
                        {caso.titulo || 'Título não informado'}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium self-start ${getStatusColor(caso.status)}`}>
                        {caso.status}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm mb-2 line-clamp-2" style={{ color: '#123458' }}>
                      {caso.descricao || 'Descrição não informada'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm" style={{ color: '#123458' }}>
                    <span className="flex items-center gap-1">
                      📅 Criado: {formatDate(caso.dataCriacao)}
                    </span>
                    {caso.dataAtualizacao && (
                      <span className="flex items-center gap-1">
                        ✏️ Atualizado: {formatDate(caso.dataAtualizacao)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/cases/${caso._id}`)}
                      style={{ borderColor: '#123458', color: '#123458' }}
                      className="text-xs sm:text-sm"
                    >
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Ver
                    </Button>
                    
                    {(user?.tipoUsuario === 'admin' || user?.tipoUsuario === 'perito') && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate(`/cases/${caso._id}/edit`)}
                          style={{ borderColor: '#123458', color: '#123458' }}
                          className="text-xs sm:text-sm"
                        >
                          <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          Editar
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(caso._id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs sm:text-sm"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CasosScreen;
