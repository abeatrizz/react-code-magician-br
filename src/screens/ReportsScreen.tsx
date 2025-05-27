
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '../hooks/useAuth';

const ReportsScreen = () => {
  const { user } = useAuth();
  const [filterPeriod, setFilterPeriod] = useState('month');

  const reports = [
    {
      id: '1',
      title: 'Laudo Pericial #6831121',
      caseTitle: 'Alessandro Guadapire',
      date: '2024-03-20',
      status: 'finalizado',
      type: 'pdf'
    },
    {
      id: '2',
      title: 'Relatório Preliminar #6831122',
      caseTitle: 'Morte em Santo Amaro',
      date: '2024-03-18',
      status: 'em_revisao',
      type: 'pdf'
    },
    {
      id: '3',
      title: 'Análise Técnica #6831120',
      caseTitle: 'Identificação Forense',
      date: '2024-03-15',
      status: 'finalizado',
      type: 'pdf'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'finalizado':
        return <Badge className="bg-green-500 text-white">Finalizado</Badge>;
      case 'em_revisao':
        return <Badge className="bg-yellow-500 text-white">Em Revisão</Badge>;
      case 'rascunho':
        return <Badge className="bg-gray-500 text-white">Rascunho</Badge>;
      default:
        return null;
    }
  };

  const handleDownload = (reportId: string) => {
    // Simular download do relatório
    console.log(`Downloading report ${reportId}`);
  };

  const handleView = (reportId: string) => {
    // Simular visualização do relatório
    console.log(`Viewing report ${reportId}`);
  };

  return (
    <div className="p-4 pb-20 space-y-6" style={{ backgroundColor: '#f5f5f0' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Relatórios</h1>
          <p className="text-gray-600">Laudos e documentos gerados</p>
        </div>
        <Select value={filterPeriod} onValueChange={setFilterPeriod}>
          <SelectTrigger className="w-32 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Semana</SelectItem>
            <SelectItem value="month">Mês</SelectItem>
            <SelectItem value="quarter">Trimestre</SelectItem>
            <SelectItem value="year">Ano</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card style={{ backgroundColor: '#D4C9BE' }} className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">12</div>
            <div className="text-sm text-gray-600">Laudos Finalizados</div>
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: '#D4C9BE' }} className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">3</div>
            <div className="text-sm text-gray-600">Em Revisão</div>
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: '#D4C9BE' }} className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">8</div>
            <div className="text-sm text-gray-600">Rascunhos</div>
          </CardContent>
        </Card>
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">Documentos Recentes</h3>
        
        {reports.map((report) => (
          <Card
            key={report.id}
            className="border-0 shadow-md"
            style={{ backgroundColor: '#D4C9BE' }}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{report.title}</h4>
                  <p className="text-sm text-gray-600">{report.caseTitle}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {getStatusBadge(report.status)}
                    <span className="text-xs text-gray-500">
                      {new Date(report.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(report.id)}
                    style={{ borderColor: '#123458', color: '#123458' }}
                  >
                    Ver
                  </Button>
                  {report.status === 'finalizado' && (
                    <Button
                      size="sm"
                      onClick={() => handleDownload(report.id)}
                      style={{ backgroundColor: '#123458' }}
                    >
                      Download
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>📄 PDF</span>
                <span>•</span>
                <span>Criado por {user?.name}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Generate New Report */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4 text-center">
          <h3 className="font-semibold text-blue-800 mb-2">Gerar Novo Relatório</h3>
          <p className="text-sm text-blue-700 mb-4">
            Crie relatórios personalizados com base nos casos em andamento
          </p>
          <Button 
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Criar Relatório
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsScreen;
