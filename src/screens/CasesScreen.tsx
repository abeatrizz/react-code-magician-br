
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, Edit, Trash2 } from 'lucide-react';
import Logo from '@/components/Logo';

const CasesScreen = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');

  const mockCases = [
    {
      id: '6831121',
      title: 'Alessandro Guadapire',
      status: 'Arquivado',
      date: '2024-01-15',
      perito: 'Dr. João Silva',
      evidences: 5,
      description: 'Descrição do caso'
    },
    {
      id: '6831122', 
      title: 'Morte em Santo Amaro',
      status: 'Em andamento',
      date: '2024-01-10',
      perito: 'Dra. Maria Santos',
      evidences: 3,
      description: 'Descrição do caso'
    },
    {
      id: '6831123',
      title: 'Perícia Ortodôntica',
      status: 'Concluído',
      date: '2024-01-08',
      perito: 'Dr. João Silva',
      evidences: 8,
      description: 'Descrição do caso'
    }
  ];

  const filteredCases = mockCases.filter(case_ => {
    const matchesSearch = case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.id.includes(searchTerm);
    const matchesStatus = statusFilter === 'todos' || case_.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em andamento': return 'bg-blue-100 text-blue-800';
      case 'Arquivado': return 'bg-gray-100 text-gray-800';
      case 'Concluído': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 pb-20 space-y-4" style={{ backgroundColor: '#f5f5f0' }}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
        <Logo size="medium" variant="dark" />
        <Button 
          onClick={() => navigate('/new-case')}
          className="flex items-center gap-2"
          style={{ backgroundColor: '#123458' }}
        >
          <Plus className="h-4 w-4" />
          Novo Caso
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar casos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-12 bg-white flex items-center justify-center">
            <Filter className="h-4 w-4" style={{ color: '#123458' }} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="Em andamento">Em andamento</SelectItem>
            <SelectItem value="Concluído">Concluído</SelectItem>
            <SelectItem value="Arquivado">Arquivado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cases List */}
      <div className="space-y-3">
        {filteredCases.map((case_) => (
          <Card 
            key={`${case_.id}-${case_.title}`}
            className="border-0"
            style={{ backgroundColor: '#D4C9BE' }}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-800">Caso #{case_.id}</h3>
                    <Badge className={getStatusColor(case_.status)}>
                      {case_.status}
                    </Badge>
                  </div>
                  <p className="text-lg font-medium text-gray-900 mb-2">{case_.title}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-8 h-8 text-gray-600 hover:text-gray-800"
                    onClick={() => navigate(`/cases/${case_.id}`)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-8 h-8 text-gray-600 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="bg-white/50 rounded-lg p-3 mb-3">
                <p className="text-sm text-gray-700">{case_.description}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Perito: {case_.perito}</span>
                  <span>Data: {case_.date}</span>
                  <span>Evidências: {case_.evidences}</span>
                </div>
                <Button
                  variant="link"
                  className="text-blue-600 p-0 h-auto text-sm"
                  onClick={() => navigate(`/cases/${case_.id}`)}
                >
                  Ver detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhum caso encontrado</p>
        </div>
      )}
    </div>
  );
};

export default CasesScreen;
