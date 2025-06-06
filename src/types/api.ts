
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export interface CaseRequest {
  titulo: string;
  descricao: string;
  priority?: 'Baixa' | 'Normal' | 'Alta' | 'Urgente';
  victims?: string[]; // IDs das vítimas
  location?: string;
}

export interface CaseResponse {
  _id: string;
  titulo: string;
  descricao: string;
  status: string;
  priority?: string;
  dataAbertura: string;
  location?: string;
  victims?: VictimResponse[];
  evidenceCount?: number;
  reportGenerated?: boolean;
}

export interface UploadResponse {
  imagemUrl: string;
}

export interface ReportRequest {
  casoId: string;
  conteudo: string;
  tipo: 'laudo' | 'relatorio_final';
}

export interface ReportResponse {
  _id: string;
  casoId: string;
  conteudo: string;
  tipo: string;
  dataGeracao: string;
}

export interface UserResponse {
  _id: string;
  username: string;
  email: string;
  role?: 'admin' | 'perito' | 'assistente';
}

export interface VictimRequest {
  nic?: string;
  name: string;
  gender?: 'M' | 'F' | 'Outro';
  age?: string;
  document?: string;
  address?: string;
  ethnicity?: string;
  notes?: string;
  caseId: string;
}

export interface VictimResponse {
  _id: string;
  nic?: string;
  name: string;
  gender?: string;
  age?: string;
  document?: string;
  address?: string;
  ethnicity?: string;
  notes?: string;
  caseId: string;
  odontogram?: any;
  anatomicalRegions?: any[];
}

export interface EvidenceRequest {
  casoId: string;
  vitimaId?: string;
  tipo: 'foto' | 'radiografia' | 'documento';
  descricao: string;
  file: File;
  geolocalizacao?: {
    latitude: number;
    longitude: number;
  };
}

export interface EvidenceResponse {
  _id: string;
  casoId: string;
  vitimaId?: string;
  tipo: string;
  descricao: string;
  imagemUrl: string;
  geolocalizacao?: {
    latitude: number;
    longitude: number;
  };
  dataCaptura: string;
  laudoGerado?: boolean;
}

export interface AIAnalysisRequest {
  evidenceId: string;
  analysisType: 'dental_pattern' | 'facial_recognition' | 'comparative_analysis';
}

export interface AIAnalysisResponse {
  _id: string;
  evidenceId: string;
  analysisType: string;
  results: {
    confidence: number;
    patterns: string[];
    matches: any[];
    recommendations: string[];
  };
  dataAnalise: string;
}
