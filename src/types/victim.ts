
export interface Victim {
  id: string;
  nic?: string; // Número de Identificação Criminal
  name: string;
  gender?: 'M' | 'F' | 'Outro';
  age?: string;
  document?: string; // CPF, RG ou outro documento
  address?: string;
  ethnicity?: string; // Cor/Etnia
  notes?: string;
  odontogram?: OdontogramData;
  anatomicalRegions?: AnatomicalRegion[];
  caseId?: string;
}

export interface OdontogramData {
  teeth: ToothData[];
  annotations?: string;
  lastUpdate?: string;
}

export interface ToothData {
  number: number;
  status: 'present' | 'missing' | 'restored' | 'fractured' | 'carious';
  notes?: string;
  image?: string;
}

export interface AnatomicalRegion {
  id: string;
  region: string;
  description?: string;
  images?: string[];
  notes?: string;
}
