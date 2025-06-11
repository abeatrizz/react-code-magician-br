
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, Camera, FileText, Brain, Download, Edit } from 'lucide-react';
import EvidenceAnnotations from '@/components/EvidenceAnnotations';

interface Annotation {
  id: string;
  text: string;
  author: string;
  timestamp: string;
  type: 'observation' | 'analysis' | 'note';
}

const EvidenceDetailScreen = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [annotations, setAnnotations] = useState<Annotation[]>([
    {
      id: '1',
      text: 'Evidência coletada em bom estado de conservação.',
      author: 'Dr. João Silva',
      timestamp: '15/01/2024 14:30',
      type: 'observation'
    },
    {
      id: '2',
      text: 'Análise inicial sugere compatibilidade com padrão dentário registrado.',
      author: 'Dr. João Silva',
      timestamp: '15/01/2024 15:45',
      type: 'analysis'
    }
  ]);

  // Mock data - substituir por dados reais da API
  const evidenceData = {
    id: '1',
    caseId: caseId,
    title: 'Radiografia Panorâmica',
    type: 'Imagem Radiográfica',
    captureDate: '2024-01-15',
    location: 'Clínica Odontológica Central',
    imageUrl: '/api/placeholder/400/300',
    description: 'Radiografia panorâmica completa da arcada dentária.',
    aiAnalysis: {
      completed: true,
      confidence: 0.87,
      findings: [
        'Padrão dentário único identificado',
        'Estruturas ósseas preservadas',
        'Marcadores anatômicos claros'
      ]
    }
  };

  const handleAIAnalysis = () => {
    // Implementar análise de IA
    console.log('Iniciando análise de IA...');
  };

  return (
    <div className="p-3 sm:p-4 pb-20 space-y-4 max-w-4xl mx-auto" style={{ backgroundColor: '#f5f5f0' }}>
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(`/cases/${caseId}`)}
          className="text-gray-600 shrink-0"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg sm:text-xl font-bold text-gray-800 truncate">{evidenceData.title}</h1>
          <p className="text-xs sm:text-sm text-gray-600">Caso #{evidenceData.caseId}</p>
        </div>
        <Badge variant="secondary" className="text-xs shrink-0">{evidenceData.type}</Badge>
      </div>

      {/* Imagem da Evidência */}
      <Card style={{ backgroundColor: '#D4C9BE' }} className="border-0 shadow-lg">
        <CardContent className="p-3 sm:p-4">
          <div className="bg-white rounded-lg p-3 sm:p-4 mb-4">
            <img
              src={evidenceData.imageUrl}
              alt={evidenceData.title}
              className="w-full max-h-64 sm:max-h-96 object-contain rounded-lg"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center justify-center gap-2 text-xs sm:text-sm"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center justify-center gap-2 text-xs sm:text-sm"
            >
              <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
              Editar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Informações da Evidência */}
      <Card style={{ backgroundColor: '#D4C9BE' }} className="border-0 shadow-lg">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-gray-800 flex items-center gap-2 text-base sm:text-lg">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
            Detalhes da Evidência
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 p-3 sm:p-6 pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <span className="text-xs sm:text-sm text-gray-600">Data de Captura:</span>
              <p className="font-medium text-sm sm:text-base">{evidenceData.captureDate}</p>
            </div>
            <div>
              <span className="text-xs sm:text-sm text-gray-600">Local:</span>
              <p className="font-medium text-sm sm:text-base break-words">{evidenceData.location}</p>
            </div>
          </div>
          <div>
            <span className="text-xs sm:text-sm text-gray-600">Descrição:</span>
            <div className="bg-white/50 rounded-lg p-3 mt-1">
              <p className="text-xs sm:text-sm">{evidenceData.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Análise de IA */}
      <Card style={{ backgroundColor: '#D4C9BE' }} className="border-0 shadow-lg">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-gray-800 flex items-center gap-2 text-base sm:text-lg">
            <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
            Análise de IA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-3 sm:p-6 pt-0">
          {evidenceData.aiAnalysis.completed ? (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                <Badge className="bg-green-100 text-green-800 text-xs self-start">
                  Análise Concluída
                </Badge>
                <span className="text-xs sm:text-sm text-gray-600">
                  Confiança: {(evidenceData.aiAnalysis.confidence * 100).toFixed(0)}%
                </span>
              </div>
              <div className="bg-white/50 rounded-lg p-3">
                <h4 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">Principais Achados:</h4>
                <ul className="space-y-1">
                  {evidenceData.aiAnalysis.findings.map((finding, index) => (
                    <li key={index} className="text-xs sm:text-sm text-gray-700 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0"></span>
                      <span className="break-words">{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-600 mb-3 text-sm sm:text-base">Análise de IA não executada</p>
              <Button
                onClick={handleAIAnalysis}
                className="flex items-center gap-2 text-sm sm:text-base"
                style={{ backgroundColor: '#123458' }}
              >
                <Brain className="w-4 h-4" />
                Executar Análise de IA
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Anotações */}
      <EvidenceAnnotations
        evidenceId={evidenceData.id}
        annotations={annotations}
        onAnnotationsChange={setAnnotations}
      />
    </div>
  );
};

export default EvidenceDetailScreen;
