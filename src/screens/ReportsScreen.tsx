
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { FileText, Download, Eye } from 'lucide-react';
import Logo from '@/components/Logo';

const ReportsScreen = () => {
  const { user } = useAuth();

  const mockReports = [
    {
      id: 1,
      title: 'Laudo Pericial - Caso 001',
      date: '2024-01-15',
      status: 'Concluído',
      type: 'PDF'
    },
    {
      id: 2,
      title: 'Análise Comparativa - Caso 002',
      date: '2024-01-10',
      status: 'Em Revisão',
      type: 'PDF'
    },
    {
      id: 3,
      title: 'Relatório de Evidências - Caso 003',
      date: '2024-01-08',
      status: 'Concluído',
      type: 'PDF'
    }
  ];

  return (
    <div className="p-4 pb-20 space-y-4" style={{ backgroundColor: '#f5f5f0' }}>
      {/* Header com Logo */}
      <div className="flex items-center justify-center mb-6 p-4 bg-white rounded-lg shadow-sm">
        <Logo size="medium" variant="dark" />
      </div>

      {/* Header */}
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold text-gray-800">Relatórios</h1>
        <p className="text-gray-600">Laudos e documentos</p>
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        {mockReports.map((report) => (
          <Card key={report.id} style={{ backgroundColor: '#D4C9BE' }} className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-gray-700" />
                  <div>
                    <h3 className="font-semibold text-gray-800">{report.title}</h3>
                    <p className="text-sm text-gray-600">{report.date}</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      report.status === 'Concluído' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Generate New Report */}
      <Button 
        className="w-full" 
        style={{ backgroundColor: '#123458' }}
      >
        Gerar Novo Relatório
      </Button>
    </div>
  );
};

export default ReportsScreen;
