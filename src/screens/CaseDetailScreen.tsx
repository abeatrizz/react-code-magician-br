import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, Camera, FileText, User, Calendar } from 'lucide-react';

const CaseDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - substituir por dados reais da API
  const caseData = {
    id: id,
    title: 'Análise Dental - Paciente A',
    status: 'Ativo',
    patient: 'João da Silva',
    perito: 'Dr. João Silva',
    requestDate: '2024-01-15',
    description: 'Análise comparativa de registros dentários para identificação pericial.',
    evidences: [
      { id: 1, type: 'Foto', description: 'Radiografia panorâmica', date: '2024-01-15' },
      { id: 2, type: 'Foto', description: 'Foto intraoral', date: '2024-01-15' },
      { id: 3, type: 'Documento', description: 'Ficha dentária', date: '2024-01-14' }
    ]
  };

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
          <h1 className="text-xl font-bold text-gray-800">{caseData.title}</h1>
          <p className="text-sm text-gray-600">Caso #{caseData.id}</p>
        </div>
        <Badge className={getStatusColor(caseData.status)}>
          {caseData.status}
        </Badge>
      </div>

      {/* Case Info */}
      <Card style={{ backgroundColor: '#D4C9BE' }} className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-gray-800">Informações do Caso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">Paciente:</span>
            <span className="text-sm font-medium">{caseData.patient}</span>
          </div>
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">Perito:</span>
            <span className="text-sm font-medium">{caseData.perito}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">Data:</span>
            <span className="text-sm font-medium">{caseData.requestDate}</span>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Descrição:</p>
            <p className="text-sm">{caseData.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={() => navigate(`/evidence/${id}`)}
          className="h-16 flex flex-col gap-2"
          style={{ backgroundColor: '#123458' }}
        >
          <Camera className="w-6 h-6" />
          <span className="text-sm">Capturar Evidências</span>
        </Button>
        <Button
          onClick={() => navigate('/reports')}
          variant="outline"
          className="h-16 flex flex-col gap-2"
          style={{ borderColor: '#123458', color: '#123458' }}
        >
          <FileText className="w-6 h-6" />
          <span className="text-sm">Ver Relatórios</span>
        </Button>
      </div>

      {/* Evidence List */}
      <Card style={{ backgroundColor: '#D4C9BE' }} className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-gray-800">Evidências ({caseData.evidences.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {caseData.evidences.map((evidence) => (
              <div key={evidence.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{evidence.description}</p>
                  <p className="text-sm text-gray-600">{evidence.type} • {evidence.date}</p>
                </div>
                <Button size="sm" variant="outline">
                  Ver
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseDetailScreen;
