
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, Eye, Search, Filter, Calendar } from 'lucide-react';

const ReportsScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Mock data dos relatórios
  const reports = [
    {
      id: '1',
      caseNumber: '#6831121',
      title: 'Laudo Pericial - Análise Dental',
      patient: 'João da Silva',
      perito: 'Dr. João Silva',
      status: 'Concluído',
      date: '2024-01-15',
      type: 'Laudo Completo',
      confidence: 95
    },
    {
      id: '2',
      caseNumber: '#6831122',
      title: 'Relatório Preliminar',
      patient: 'Maria Santos',
      perito: 'Dr. João Silva',
      status: 'Em andamento',
      date: '2024-01-14',
      type: 'Relatório Parcial',
      confidence: 78
    },
    {
      id: '3',
      caseNumber: '#6831120',
      title: 'Análise Comparativa',
      patient: 'Pedro Oliveira',
      perito: 'Dr. João Silva',
      status: 'Arquivado',
      date: '2024-01-10',
      type: 'Análise IA',
      confidence: 89
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluído': return 'bg-green-100 text-green-800';
      case 'Em andamento': return 'bg-blue-100 text-blue-800';
      case 'Arquivado': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Laudo Completo': return 'bg-purple-100 text-purple-800';
      case 'Relatório Parcial': return 'bg-orange-100 text-orange-800';
      case 'Análise IA': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.caseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 pb-20 space-y-4" style={{ backgroundColor: '#f5f5f0' }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-6 h-6 text-gray-700" />
        <h1 className="text-xl font-bold text-gray-800">Relatórios e Laudos</h1>
      </div>

      {/* Filtros */}
      <Card style={{ backgroundColor: '#D4C9BE' }} className="border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Buscar relatórios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="Concluído">Concluído</SelectItem>
                <SelectItem value="Em andamento">Em andamento</SelectItem>
                <SelectItem value="Arquivado">Arquivado</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="bg-white">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todo período</SelectItem>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Esta semana</SelectItem>
                <SelectItem value="month">Este mês</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Relatórios */}
      <div className="space-y-3">
        {filteredReports.map((report) => (
          <Card key={report.id} style={{ backgroundColor: '#D4C9BE' }} className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-800">{report.title}</h3>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                    <Badge className={getTypeColor(report.type)}>
                      {report.type}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Caso:</span> {report.caseNumber}
                    </div>
                    <div>
                      <span className="font-medium">Paciente:</span> {report.patient}
                    </div>
                    <div>
                      <span className="font-medium">Data:</span> {report.date}
                    </div>
                  </div>

                  {report.confidence && (
                    <div className="mt-2">
                      <span className="text-xs text-gray-600">Confiança da IA: </span>
                      <Badge variant="outline" className={
                        report.confidence >= 90 ? 'border-green-500 text-green-700' :
                        report.confidence >= 75 ? 'border-yellow-500 text-yellow-700' :
                        'border-red-500 text-red-700'
                      }>
                        {report.confidence}%
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-1" />
                    Ver
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-1" />
                    PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <Card className="bg-white border-dashed">
          <CardContent className="p-8 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">Nenhum relatório encontrado</h3>
            <p className="text-gray-600">Tente ajustar os filtros de busca</p>
          </CardContent>
        </Card>
      )}

      {/* Botão de Ação */}
      <div className="fixed bottom-20 right-4">
        <Button
          size="lg"
          className="rounded-full shadow-lg"
          style={{ backgroundColor: '#123458' }}
        >
          <FileText className="w-5 h-5 mr-2" />
          Novo Relatório
        </Button>
      </div>
    </div>
  );
};

export default ReportsScreen;
