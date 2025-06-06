
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Calendar, Users, Camera, Trash2, Eye, Filter } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import StandardHeader from '@/components/StandardHeader';
import { useCases, useDeleteCase } from '@/hooks/useApiCases';
import { useAuth } from '@/hooks/useAuth';

const CasesScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [sortBy, setSortBy] = useState('data-desc');
  
  const { data: cases = [], isLoading, error } = useCases();
  const deleteCase = useDeleteCase();

  const filteredAndSortedCases = cases
    .filter(case_ => {
      const matchesSearch = case_.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           case_.descricao?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'todos' || case_.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'data-asc':
          return new Date(a.dataAbertura).getTime() - new Date(b.dataAbertura).getTime();
        case 'data-desc':
          return new Date(b.dataAbertura).getTime() - new Date(a.dataAbertura).getTime();
        case 'titulo':
          return (a.titulo || '').localeCompare(b.titulo || '');
        default:
          return 0;
      }
    });

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este caso?')) {
      try {
        await deleteCase.mutateAsync(id);
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
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Crítica':
        return 'bg-red-100 text-red-800';
      case 'Alta':
        return 'bg-orange-100 text-orange-800';
      case 'Média':
        return 'bg-yellow-100 text-yellow-800';
      case 'Baixa':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#f5f5f0' }}>
        <StandardHeader title="Casos Periciais" />
        <div className="p-4 pb-24">
          <div className="flex items-center justify-center py-8">
            <div className="animate-pulse text-gray-500">Carregando casos...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#f5f5f0' }}>
        <StandardHeader title="Casos Periciais" />
        <div className="p-4 pb-24">
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <Alert variant="destructive" className="max-w-md">
                <AlertDescription>
                  Erro ao carregar casos. Verifique sua conexão e tente novamente.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f0' }}>
      <StandardHeader title="Casos Periciais" />

      <div className="p-4 pb-24 space-y-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Em Andamento</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {cases.filter(c => c.status === 'Em andamento').length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Finalizados</p>
                  <p className="text-2xl font-bold text-green-700">
                    {cases.filter(c => c.status === 'Finalizado').length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 text-sm font-medium">Total Vítimas</p>
                  <p className="text-2xl font-bold text-orange-700">
                    {cases.reduce((acc, case_) => acc + (case_.vitimas?.length || 0), 0)}
                  </p>
                </div>
                <Users className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Total Evidências</p>
                  <p className="text-2xl font-bold text-purple-700">
                    {cases.reduce((acc, case_) => acc + (case_.evidencias?.length || 0), 0)}
                  </p>
                </div>
                <Camera className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar casos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="Em andamento">Em andamento</SelectItem>
                    <SelectItem value="Finalizado">Finalizado</SelectItem>
                    <SelectItem value="Arquivado">Arquivado</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="data-desc">Mais recentes</SelectItem>
                    <SelectItem value="data-asc">Mais antigos</SelectItem>
                    <SelectItem value="titulo">Por título</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  onClick={() => navigate('/new-case')}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Caso
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cases List */}
        <div className="space-y-4">
          {filteredAndSortedCases.length === 0 ? (
            <Card className="bg-white shadow-sm">
              <CardContent className="p-8">
                <div className="text-center text-gray-500">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p>Nenhum caso encontrado</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredAndSortedCases.map((case_) => (
              <Card key={case_._id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {case_.titulo || 'Título não informado'}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(case_.status || 'Em andamento')}`}>
                          {case_.status || 'Em andamento'}
                        </span>
                        {case_.prioridade && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(case_.prioridade)}`}>
                            {case_.prioridade}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                        {case_.descricao || 'Descrição não informada'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>📅 {formatDate(case_.dataAbertura)}</span>
                      {case_.vitimas && case_.vitimas.length > 0 && (
                        <span>👥 {case_.vitimas.length} vítima(s)</span>
                      )}
                      {case_.evidencias && case_.evidencias.length > 0 && (
                        <span>📷 {case_.evidencias.length} evidência(s)</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/cases/${case_._id}`)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Ver
                      </Button>
                      
                      {(user?.role === 'admin' || user?.role === 'perito') && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(case_._id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CasesScreen;
