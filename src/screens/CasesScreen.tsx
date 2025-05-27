
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Calendar, User } from 'lucide-react';

const CasesScreen = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const mockCases = [
    {
      id: '001',
      title: 'Análise Dental - Paciente A',
      status: 'Ativo',
      date: '2024-01-15',
      perito: 'Dr. João Silva',
      evidences: 5
    },
    {
      id: '002', 
      title: 'Comparação Radiográfica',
      status: 'Em Análise',
      date: '2024-01-10',
      perito: 'Dra. Maria Santos',
      evidences: 3
    },
    {
      id: '003',
      title: 'Perícia Ortodôntica',
      status: 'Concluído',
      date: '2024-01-08',
      perito: 'Dr. João Silva',
      evidences: 8
    }
  ];

  const filteredCases = mockCases.filter(case_ =>
    case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    case_.id.includes(searchTerm)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'bg-green-100 text-green-800';
      case 'Em Análise': return 'bg-yellow-100 text-yellow-800';
      case 'Concluído': return 'bg-blue-100 text-blue-800';
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

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Buscar casos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white"
        />
      </div>

      {/* Cases List */}
      <div className="space-y-3">
        {filteredCases.map((case_) => (
          <Card 
            key={case_.id}
            className="cursor-pointer hover:shadow-lg transition-shadow border-0"
            style={{ backgroundColor: '#D4C9BE' }}
            onClick={() => navigate(`/cases/${case_.id}`)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-800">{case_.title}</h3>
                  <p className="text-sm text-gray-600">Caso #{case_.id}</p>
                </div>
                <Badge className={getStatusColor(case_.status)}>
                  {case_.status}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{case_.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{case_.perito}</span>
                  </div>
                </div>
                <span>{case_.evidences} evidências</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CasesScreen;
