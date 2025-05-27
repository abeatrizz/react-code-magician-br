
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const NewCaseScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    patient: '',
    description: '',
    requestDate: '',
    priority: 'Normal'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simular criação do caso
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Caso criado com sucesso!",
        description: "O novo caso foi registrado no sistema."
      });
      
      navigate('/cases');
    } catch (error) {
      toast({
        title: "Erro ao criar caso",
        description: "Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
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
        <h1 className="text-xl font-bold text-gray-800">Novo Caso</h1>
      </div>

      {/* Form */}
      <Card style={{ backgroundColor: '#D4C9BE' }} className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-gray-800">Informações do Caso</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Título do Caso</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Ex: Análise Dental - Paciente X"
                className="bg-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="patient">Paciente/Identificação</Label>
              <Input
                id="patient"
                value={formData.patient}
                onChange={(e) => setFormData({...formData, patient: e.target.value})}
                placeholder="Nome do paciente ou identificação"
                className="bg-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="requestDate">Data de Solicitação</Label>
              <Input
                id="requestDate"
                type="date"
                value={formData.requestDate}
                onChange={(e) => setFormData({...formData, requestDate: e.target.value})}
                className="bg-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Descreva os detalhes do caso, objetivo da perícia, informações relevantes..."
                className="bg-white min-h-[100px]"
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/cases')}
                className="flex-1"
                style={{ borderColor: '#123458', color: '#123458' }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
                style={{ backgroundColor: '#123458' }}
              >
                {loading ? 'Criando...' : 'Criar Caso'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewCaseScreen;
