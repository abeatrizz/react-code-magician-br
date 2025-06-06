
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Edit, Trash2, Camera, FileText, Eye, Plus } from 'lucide-react';
import Logo from '@/components/Logo';
import { useCases, useDeleteCase } from '@/hooks/useApiCases';
import { useAuth } from '@/hooks/useAuth';

const CasesScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  
  const { data: cases = [], isLoading, error } = useCases();
  const deleteCase = useDeleteCase();

  const filteredCases = cases.filter(case_ => {
    const matchesSearch = case_.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_._id?.includes(searchTerm) || false;
    const matchesStatus = statusFilter === 'todos' || case_.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em andamento': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'Finalizado': return 'bg-green-100 text-green-800 border border-green-200';
      case 'Arquivado': return 'bg-gray-100 text-gray-800 border border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const handleDeleteCase = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este caso?')) {
      try {
        deleteCase.mutate(id);
      } catch (error) {
        console.error('Erro ao excluir caso:', error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Data não informada';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const canEdit = (caseStatus: string) => {
    return user?.role === 'admin' || user?.role === 'perito' || caseStatus === 'Em andamento';
  };

  const canDelete = () => {
    return user?.role === 'admin';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#f5f5f0' }}>
        {/* Header Padronizado */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm border-b">
          <Logo size="medium" variant="dark" />
          <h1 className="text-xl font-bold text-gray-800">Casos Periciais</h1>
          <div className="w-20"></div>
        </div>
        
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
        {/* Header Padronizado */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm border-b">
          <Logo size="medium" variant="dark" />
          <h1 className="text-xl font-bold text-gray-800">Casos Periciais</h1>
          <div className="w-20"></div>
        </div>
        
        <div className="p-4 pb-24">
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <p className="text-red-500 mb-2">Erro ao carregar casos</p>
              <Button onClick={() => window.location.reload()} variant="outline">
                Tentar novamente
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f0' }}>
      {/* Header Padronizado */}
      <div className="flex items-center justify-between p-4 bg-white shadow-sm border-b">
        <Logo size="medium" variant="dark" />
        <h1 className="text-xl font-bold text-gray-800">Casos Periciais</h1>
        <div className="w-20"></div>
      </div>

      <div className="p-4 pb-24 space-y-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-700">{cases.filter(c => c.status === 'Em andamento').length}</div>
              <div className="text-xs text-blue-600">Em Andamento</div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-700">{cases.filter(c => c.status === 'Finalizado').length}</div>
              <div className="text-xs text-green-600">Finalizados</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-700">{cases.filter(c => c.status === 'Arquivado').length}</div>
              <div className="text-xs text-gray-600">Arquivados</div>
            </CardContent>
          </Card>
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-700">{cases.length}</div>
              <div className="text-xs text-orange-600">Total</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por título ou ID do caso..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-gray-300 focus:border-blue-500"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-12 bg-white flex items-center justify-center border-gray-300">
              <Filter className="h-4 w-4" style={{ color: '#123458' }} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Status</SelectItem>
              <SelectItem value="Em andamento">Em andamento</SelectItem>
              <SelectItem value="Finalizado">Finalizado</SelectItem>
              <SelectItem value="Arquivado">Arquivado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Cases List */}
        <div className="space-y-3">
          {filteredCases.map((case_) => (
            <Card 
              key={case_._id}
              className="border-0 shadow-md hover:shadow-lg transition-shadow duration-200"
              style={{ backgroundColor: '#D4C9BE' }}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-800">#{case_._id?.slice(-6) || 'N/A'}</h3>
                      <Badge className={getStatusColor(case_.status || 'Em andamento')}>
                        {case_.status || 'Em andamento'}
                      </Badge>
                    </div>
                    <p className="text-lg font-medium text-gray-900 mb-2">{case_.titulo || 'Título não informado'}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-8 h-8 text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                      onClick={() => navigate(`/cases/${case_._id}`)}
                      title="Ver detalhes"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    {canEdit(case_.status || 'Em andamento') && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="w-8 h-8 text-gray-600 hover:text-green-600 hover:bg-green-50"
                        onClick={() => navigate(`/cases/${case_._id}/edit`)}
                        title="Editar caso"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    )}
                    {canDelete() && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="w-8 h-8 text-gray-600 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteCase(case_._id)}
                        disabled={deleteCase.isPending}
                        title="Excluir caso"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="bg-white/60 rounded-lg p-3 mb-3">
                  <p className="text-sm text-gray-700 line-clamp-2">{case_.descricao || 'Descrição não informada'}</p>
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
                      className="text-xs h-8 px-3 border-blue-300 text-blue-700 hover:bg-blue-50"
                      onClick={() => navigate(`/evidence/${case_._id}`)}
                    >
                      <Camera className="w-3 h-3 mr-1" />
                      Evidências
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-8 px-3 border-gray-300 text-gray-700 hover:bg-gray-50"
                      onClick={() => navigate(`/cases/${case_._id}`)}
                    >
                      Ver detalhes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCases.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="mb-4">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">Nenhum caso encontrado</p>
              <p className="text-gray-400 text-sm">
                {searchTerm || statusFilter !== 'todos' 
                  ? 'Tente ajustar os filtros de busca' 
                  : 'Comece criando seu primeiro caso pericial'
                }
              </p>
            </div>
            {(!searchTerm && statusFilter === 'todos') && (
              <Button 
                onClick={() => navigate('/new-case')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Criar Primeiro Caso
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CasesScreen;
