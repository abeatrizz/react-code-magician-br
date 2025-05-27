
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

interface Case {
  id: string;
  number: string;
  title: string;
  status: 'em_andamento' | 'arquivado' | 'concluido';
  description?: string;
}

const CasesScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  // Dados mockados baseados na imagem
  const cases: Case[] = [
    {
      id: '1',
      number: '#6831121',
      title: 'Alessandro Guadapire',
      status: 'arquivado',
      description: 'Descrição do caso'
    },
    {
      id: '2',
      number: '#6831121',
      title: 'Morte em Santo Amaro',
      status: 'em_andamento',
      description: 'Descrição do caso'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'em_andamento':
        return <Badge className="bg-blue-500 text-white">Em andamento</Badge>;
      case 'arquivado':
        return <Badge className="bg-gray-500 text-white">Arquivado</Badge>;
      case 'concluido':
        return <Badge className="bg-green-500 text-white">Concluído</Badge>;
      default:
        return null;
    }
  };

  const filteredCases = cases.filter(case_ => {
    const matchesSearch = case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.number.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || case_.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 pb-20 space-y-4" style={{ backgroundColor: '#f5f5f0' }}>
      {/* Header com busca e filtro */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            placeholder="Buscar caso"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-32 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="em_andamento">Em andamento</SelectItem>
            <SelectItem value="arquivado">Arquivado</SelectItem>
            <SelectItem value="concluido">Concluído</SelectItem>
          </SelectContent>
        </Select>
        <Button
          size="icon"
          style={{ backgroundColor: '#123458' }}
          className="text-white"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
          </svg>
        </Button>
      </div>

      {/* Lista de casos */}
      <div className="space-y-3">
        {filteredCases.map((case_) => (
          <Card
            key={case_.id}
            className="border-0 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            style={{ backgroundColor: '#D4C9BE' }}
            onClick={() => navigate(`/cases/${case_.id}`)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-800">Caso {case_.number}</h3>
                  <p className="text-gray-700">{case_.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{getStatusBadge(case_.status)}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </Button>
                </div>
              </div>
              
              <div className="bg-white/50 rounded p-3 mt-3">
                <p className="text-sm text-gray-600 placeholder-text">
                  {case_.description || 'Descrição do caso'}
                </p>
              </div>
              
              <div className="flex justify-end mt-3">
                <Button
                  variant="link"
                  className="text-sm p-0"
                  style={{ color: '#123458' }}
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
