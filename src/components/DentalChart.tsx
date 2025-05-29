
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface ToothEvidence {
  toothNumber: number;
  image?: string;
  notes?: string;
}

interface DentalChartProps {
  evidences: ToothEvidence[];
  onEvidenceAdd: (evidence: ToothEvidence) => void;
  onEvidenceRemove: (toothNumber: number) => void;
  onImageUpload: (toothNumber: number, file: File) => void;
}

const DentalChart: React.FC<DentalChartProps> = ({
  evidences,
  onEvidenceAdd,
  onEvidenceRemove,
  onImageUpload
}) => {
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);

  // Numeração dental padrão (dentes permanentes)
  const upperTeeth = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
  const lowerTeeth = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

  const hasEvidence = (toothNumber: number) => {
    return evidences.some(e => e.toothNumber === toothNumber);
  };

  const handleToothClick = (toothNumber: number) => {
    if (hasEvidence(toothNumber)) {
      onEvidenceRemove(toothNumber);
    } else {
      setSelectedTooth(toothNumber);
      onEvidenceAdd({ toothNumber });
    }
  };

  const handleImageUpload = (toothNumber: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(toothNumber, file);
    }
  };

  const renderTooth = (toothNumber: number) => {
    const isSelected = hasEvidence(toothNumber);
    return (
      <div key={toothNumber} className="flex flex-col items-center space-y-1">
        <Button
          type="button"
          size="sm"
          variant={isSelected ? "default" : "outline"}
          className={`w-8 h-8 p-0 text-xs ${
            isSelected ? 'bg-blue-600 text-white' : 'hover:bg-blue-50'
          }`}
          onClick={() => handleToothClick(toothNumber)}
        >
          {toothNumber}
        </Button>
        {isSelected && (
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(toothNumber, e)}
              className="hidden"
              id={`tooth-${toothNumber}`}
            />
            <label
              htmlFor={`tooth-${toothNumber}`}
              className="text-xs text-blue-600 cursor-pointer hover:underline"
            >
              + Foto
            </label>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="text-center mb-4">
        <h3 className="font-semibold text-gray-800 mb-2">Diagrama Dental</h3>
        <p className="text-xs text-gray-600">Clique nos dentes para adicionar evidências</p>
      </div>

      {/* Dentes superiores */}
      <div className="mb-6">
        <p className="text-xs text-gray-600 text-center mb-2">Arcada Superior</p>
        <div className="grid grid-cols-8 gap-1 mb-2">
          {upperTeeth.slice(0, 8).map(renderTooth)}
        </div>
        <div className="grid grid-cols-8 gap-1">
          {upperTeeth.slice(8).map(renderTooth)}
        </div>
      </div>

      {/* Dentes inferiores */}
      <div>
        <p className="text-xs text-gray-600 text-center mb-2">Arcada Inferior</p>
        <div className="grid grid-cols-8 gap-1 mb-2">
          {lowerTeeth.slice(0, 8).map(renderTooth)}
        </div>
        <div className="grid grid-cols-8 gap-1">
          {lowerTeeth.slice(8).map(renderTooth)}
        </div>
      </div>

      {/* Lista de evidências selecionadas */}
      {evidences.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm font-medium text-gray-800 mb-2">
            Evidências Selecionadas ({evidences.length})
          </p>
          <div className="flex flex-wrap gap-1">
            {evidences.map((evidence) => (
              <Badge
                key={evidence.toothNumber}
                variant="secondary"
                className="flex items-center gap-1"
              >
                Dente {evidence.toothNumber}
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-3 w-3 p-0 hover:bg-red-100"
                  onClick={() => onEvidenceRemove(evidence.toothNumber)}
                >
                  <X className="h-2 w-2" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DentalChart;
