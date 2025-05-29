import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Camera, Upload, Circle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import DentalChart from '@/components/DentalChart';
import VictimManager from '@/components/VictimManager';
import LocationMap from '@/components/LocationMap';

interface ToothEvidence {
  toothNumber: number;
  image?: string;
  notes?: string;
}

interface Victim {
  id: string;
  name: string;
  age?: string;
  gender?: string;
  notes?: string;
}

const NewCaseScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [dentalEvidences, setDentalEvidences] = useState<ToothEvidence[]>([]);
  const [victims, setVictims] = useState<Victim[]>([]);
  const [formData, setFormData] = useState({
    caseNumber: '',
    location: '',
    description: '',
    requestDate: '',
    priority: 'Normal',
    status: 'Em andamento'
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setImages(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDentalEvidenceAdd = (evidence: ToothEvidence) => {
    setDentalEvidences(prev => {
      const existing = prev.find(e => e.toothNumber === evidence.toothNumber);
      if (existing) {
        return prev;
      }
      return [...prev, evidence];
    });
  };

  const handleDentalEvidenceRemove = (toothNumber: number) => {
    setDentalEvidences(prev => prev.filter(e => e.toothNumber !== toothNumber));
  };

  const handleDentalImageUpload = (toothNumber: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setDentalEvidences(prev => 
          prev.map(evidence => 
            evidence.toothNumber === toothNumber 
              ? { ...evidence, image: e.target!.result as string }
              : evidence
          )
        );
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (victims.length === 0) {
      toast({
        title: "Erro de validação",
        description: "É necessário adicionar pelo menos uma vítima/paciente.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Caso criado com sucesso!",
        description: `Caso registrado com ${victims.length} vítima(s) e ${dentalEvidences.length} evidências dentárias.`
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

  const triggerFileInput = () => {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="p-4 pb-20 space-y-4" style={{ backgroundColor: '#f5f5f0' }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
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
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="caseNumber">Número do Caso</Label>
                <Input
                  id="caseNumber"
                  value={formData.caseNumber}
                  onChange={(e) => setFormData({...formData, caseNumber: e.target.value})}
                  placeholder="Ex: #6831121"
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
            </div>

            {/* Gerenciador de Vítimas */}
            <VictimManager
              victims={victims}
              onVictimsChange={setVictims}
            />

            <div>
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Localização
              </Label>
              <LocationMap
                location={formData.location}
                onLocationChange={(location) => setFormData({...formData, location})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Em andamento">Em andamento</SelectItem>
                    <SelectItem value="Arquivado">Arquivado</SelectItem>
                    <SelectItem value="Concluído">Concluído</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority">Prioridade</Label>
                <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Baixa">Baixa</SelectItem>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Urgente">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Descrição do Caso</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Descreva os detalhes do caso, objetivo da perícia, informações relevantes..."
                className="bg-white min-h-[100px]"
                required
              />
            </div>

            {/* Evidências Dentárias */}
            <div>
              <Label className="flex items-center gap-2 mb-3">
                <Circle className="w-4 h-4" />
                Evidências Dentárias
              </Label>
              <DentalChart
                evidences={dentalEvidences}
                onEvidenceAdd={handleDentalEvidenceAdd}
                onEvidenceRemove={handleDentalEvidenceRemove}
                onImageUpload={handleDentalImageUpload}
              />
            </div>

            {/* Evidências Gerais */}
            <div>
              <Label className="flex items-center gap-2 mb-3">
                <Camera className="w-4 h-4" />
                Evidências Gerais
              </Label>
              
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="file-input"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={triggerFileInput}
                  >
                    <Upload className="w-4 h-4" />
                    Adicionar Imagens
                  </Button>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Evidência ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg bg-white"
                        />
                        <Button
                          type="button"
                          onClick={() => removeImage(index)}
                          size="icon"
                          variant="destructive"
                          className="absolute -top-1 -right-1 w-5 h-5 text-xs"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
