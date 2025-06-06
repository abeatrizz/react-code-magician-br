
export interface Victim {
  id: string;
  nic: string; // Número de Identificação Criminal
  nome: string;
  genero: 'Masculino' | 'Feminino' | 'Não informado';
  idade?: number;
  documento?: string; // CPF, RG ou outro documento
  endereco?: string;
  corEtnia?: 'Branca' | 'Preta' | 'Parda' | 'Amarela' | 'Indígena' | 'Não informado';
  observacoes?: string;
  odontograma?: OdontogramData;
  anatomicalRegions?: AnatomicalRegion[];
  caso: string; // ID do caso
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
