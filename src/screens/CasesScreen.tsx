
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Calendar, User, Filter, Edit, Trash2 } from 'lucide-react';

const CasesScreen = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

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
      id: '6831121', 
      title: 'Morte em Santo Amaro',
      status: 'Em andamento',
      date: '2024-01-10',
      perito: 'Dra. Maria Santos',
      evidences: 3,
      description: 'Descrição do caso'
    },
    {
      id: '003',
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
    const matchesStatus = statusFilter === 'all' || case_.status === statusFilter;
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Casos</h1>
        <Button 
          onClick={() => navigate('/new-case')}
          size="icon"
          style={{ backgroundColor: '#123458' }}
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar caso"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 bg-white">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="Em andamento">Em andamento</SelectItem>
            <SelectItem value="Arquivado">Arquivado</SelectItem>
            <SelectItem value="Concluído">Concluído</SelectItem>
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
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-800">Caso #{case_.id}</h3>
                    <Badge className={getStatusColor(case_.status)}>
                      {case_.status}
                    </Badge>
                  </div>
                  <p className="text-lg font-medium text-gray-900 mb-1">{case_.title}</p>
                </div>
                <div className="flex gap-1">
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
