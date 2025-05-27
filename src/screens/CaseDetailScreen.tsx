
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft } from 'lucide-react';

const CaseDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dados mockados
  const caseData = {
    id: id,
    number: '#6831121',
    title: 'Alessandro Guadapire',
    status: 'arquivado',
    description: 'Caso pericial envolvendo análise odontológica forense para identificação de vítima.',
    createdAt: '2024-03-15',
    updatedAt: '2024-03-20',
    perito: 'Dr. João Silva',
    location: 'Santo Amaro, SP',
    evidences: [
      { id: 1, type: 'image', name: 'Radiografia_01.jpg', date: '2024-03-16' },
      { id: 2, type: 'image', name: 'Foto_dental_02.jpg', date: '2024-03-16' },
      { id: 3, type: 'document', name: 'Laudo_preliminar.pdf', date: '2024-03-18' }
    ],
    analysis: {
      similarity: 85,
      status: 'completed',
      recommendations: [
        'Alta compatibilidade entre as arcadas dentárias',
        'Recomenda-se análise complementar de características específicas',
        'Documentação fotográfica adicional necessária'
      ]
    }
  };

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

  return (
    <div className="p-4 pb-20 space-y-4" style={{ backgroundColor: '#f5f5f0' }}>
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/cases')}
          className="text-gray-600"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-800">Caso {caseData.number}</h1>
          <p className="text-gray-600">{caseData.title}</p>
        </div>
        {getStatusBadge(caseData.status)}
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Detalhes</TabsTrigger>
          <TabsTrigger value="evidences">Evidências</TabsTrigger>
          <TabsTrigger value="analysis">Análise</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <Card style={{ backgroundColor: '#D4C9BE' }} className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-800">Informações Gerais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Descrição</label>
                <p className="text-gray-800">{caseData.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Perito Responsável</label>
                  <p className="text-gray-800">{caseData.perito}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Local</label>
                  <p className="text-gray-800">{caseData.location}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Criado em</label>
                  <p className="text-gray-800">{new Date(caseData.createdAt).toLocaleDateString('pt-BR')}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Atualizado em</label>
                  <p className="text-gray-800">{new Date(caseData.updatedAt).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evidences" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Evidências ({caseData.evidences.length})</h3>
            <Button
              onClick={() => navigate(`/evidence/${caseData.id}`)}
              style={{ backgroundColor: '#123458' }}
              className="text-white"
            >
              + Adicionar
            </Button>
          </div>
          
          <div className="space-y-3">
            {caseData.evidences.map((evidence) => (
              <Card key={evidence.id} style={{ backgroundColor: '#D4C9BE' }} className="border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                        {evidence.type === 'image' ? '🖼️' : '📄'}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{evidence.name}</p>
                        <p className="text-sm text-gray-600">{new Date(evidence.date).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-600">
                      Ver
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card style={{ backgroundColor: '#D4C9BE' }} className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-800">Análise por IA</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Grau de Similaridade</label>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${caseData.analysis.similarity}%`,
                        backgroundColor: caseData.analysis.similarity > 70 ? '#10B981' : caseData.analysis.similarity > 40 ? '#F59E0B' : '#EF4444'
                      }}
                    ></div>
                  </div>
                  <span className="font-semibold text-gray-800">{caseData.analysis.similarity}%</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Recomendações</label>
                <ul className="mt-2 space-y-2">
                  {caseData.analysis.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span className="text-gray-800 text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                className="w-full"
                style={{ backgroundColor: '#123458' }}
              >
                Gerar Laudo Completo
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CaseDetailScreen;
