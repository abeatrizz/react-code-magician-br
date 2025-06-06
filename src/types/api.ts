
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
  prioridade?: 'Baixa' | 'Média' | 'Alta' | 'Crítica';
  vitimas?: string[]; // IDs das vítimas
}

export interface CaseResponse {
  _id: string;
  titulo: string;
  descricao: string;
  status: 'Em andamento' | 'Finalizado' | 'Arquivado';
  prioridade: 'Baixa' | 'Média' | 'Alta' | 'Crítica';
  dataAbertura: string;
  dataFechamento?: string;
  usuario: string; // ID do usuário
  evidencias: string[]; // IDs das evidências
  relatorios: string[]; // IDs dos relatórios
  vitimas: VictimResponse[]; // Dados completos das vítimas
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
  role: 'admin' | 'perito' | 'usuario';
  casos: string[]; // IDs dos casos
  relatorios: string[]; // IDs dos relatórios
  evidencias: string[]; // IDs das evidências
  isActive: boolean;
}

export interface VictimRequest {
  nic: string;
  nome: string;
  genero: 'Masculino' | 'Feminino' | 'Não informado';
  idade?: number;
  documento?: string;
  endereco?: string;
  corEtnia?: 'Branca' | 'Preta' | 'Parda' | 'Amarela' | 'Indígena' | 'Não informado';
  observacoes?: string;
  caso: string; // ID do caso
}

export interface VictimResponse {
  _id: string;
  nic: string;
  nome: string;
  genero: 'Masculino' | 'Feminino' | 'Não informado';
  idade?: number;
  documento?: string;
  endereco?: string;
  corEtnia?: 'Branca' | 'Preta' | 'Parda' | 'Amarela' | 'Indígena' | 'Não informado';
  observacoes?: string;
  caso: string; // ID do caso
  odontograma: string[]; // IDs dos odontogramas
}

export interface EvidenceRequest {
  tipo: 'Fotografia' | 'Documento' | 'Amostra' | 'Outros';
  descricao: string;
  caso: string; // ID do caso
  geolocalizacao?: {
    latitude: string;
    longitude: string;
  };
  imagens?: {
    imagemUrl: string;
    publicId: string;
    descricao?: string;
  }[];
  textos?: {
    conteudo: string;
    tipo: 'Observação' | 'Nota técnica' | 'Descrição';
  }[];
}

export interface EvidenceResponse {
  _id: string;
  tipo: 'Fotografia' | 'Documento' | 'Amostra' | 'Outros';
  descricao: string;
  dataColeta: string;
  status: 'Em análise' | 'Concluído' | 'Pendente';
  coletadaPor: string; // ID do usuário
  caso: string; // ID do caso
  geolocalizacao?: {
    latitude: string;
    longitude: string;
  };
  imagens: {
    imagemUrl: string;
    publicId: string;
    descricao?: string;
  }[];
  textos: {
    conteudo: string;
    tipo: 'Observação' | 'Nota técnica' | 'Descrição';
  }[];
  laudo?: string; // ID do laudo
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
