// Tipos para Autenticação
export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
  tipoUsuario: 'admin' | 'perito' | 'assistente';
}

export interface AuthResponse {
  token: string;
  usuario: UserResponse;
}

// Tipos para Usuários (UserRequest para criação/edição)
export interface UserRequest {
  nome: string;
  email: string;
  senha?: string;
  tipoUsuario: 'admin' | 'perito' | 'assistente';
  status?: 'ativo' | 'inativo';
}

// Tipos para Casos
export interface CaseRequest {
  titulo: string;
  descricao: string;
  status?: 'Em andamento' | 'Finalizado' | 'Arquivado';
}

export interface CaseResponse {
  _id: string;
  titulo: string;
  descricao: string;
  status: 'Em andamento' | 'Finalizado' | 'Arquivado';
  dataCriacao: string;
  dataAtualizacao: string;
  usuarioCriador: string;
  vitimas?: VictimaResponse[];
  evidencias?: EvidenceResponse[];
}

// Tipos para Vítimas
export interface VictimaRequest {
  nic: string; // 8 dígitos
  nome: string;
  genero: 'Masculino' | 'Feminino' | 'Não informado';
  idade?: number;
  documento?: string;
  endereco?: string;
  corEtnia?: 'Branca' | 'Preta' | 'Parda' | 'Amarela' | 'Indígena' | 'Não informado';
  observacoes?: string;
  odontograma?: OdontogramData;
  casoId: string;
}

export interface VictimaResponse {
  _id: string;
  nic: string;
  nome: string;
  genero: 'Masculino' | 'Feminino' | 'Não informado';
  idade?: number;
  documento?: string;
  endereco?: string;
  corEtnia?: 'Branca' | 'Preta' | 'Parda' | 'Amarela' | 'Indígena' | 'Não informado';
  observacoes?: string;
  odontograma?: OdontogramData;
  casoId: string;
  criadoEm: string;
  atualizadoEm: string;
}

export interface OdontogramData {
  dentes: ToothData[];
  observacoes?: string;
  ultimaAtualizacao?: string;
}

export interface ToothData {
  numero: number;
  status: 'presente' | 'ausente' | 'restaurado' | 'fraturado' | 'cariado';
  observacoes?: string;
  imagem?: string;
}

// Tipos para Evidências
export interface EvidenceRequest {
  casoId: string;
  tipo: 'fotografia' | 'radiografia' | 'documento' | 'video' | 'audio' | 'outros';
  descricao: string;
  geolocalizacao?: {
    latitude: number;
    longitude: number;
  };
}

export interface EvidenceResponse {
  _id: string;
  casoId: string;
  tipo: 'fotografia' | 'radiografia' | 'documento' | 'video' | 'audio' | 'outros';
  arquivo: string; // URL do Cloudinary
  descricao: string;
  geolocalizacao?: {
    latitude: number;
    longitude: number;
  };
  statusAnalise: 'Aguardando' | 'Em análise' | 'Concluído';
  resultadoIA?: string;
  dataUpload: string;
}

// Tipos para Laudos
export interface LaudoRequest {
  casoId: string;
  descricao: string;
  conclusoes: string;
  perito: string;
  observacoes?: string;
}

export interface LaudoResponse {
  _id: string;
  casoId: string;
  descricao: string;
  conclusoes: string;
  perito: string;
  observacoes?: string;
  dataCriacao: string;
  assinaturaDigital?: string;
}

// Tipos para Relatórios
export interface RelatorioRequest {
  tipo: 'geral' | 'caso' | 'periodo';
  casoId?: string;
  dataInicio?: string;
  dataFim?: string;
  filtros?: Record<string, any>;
}

export interface RelatorioResponse {
  _id: string;
  tipo: string;
  conteudo: string;
  dataCriacao: string;
  geradoPor: string;
}

// Tipos para Odontologia
export interface OdontologiaRequest {
  vitimaId: string;
  dadosOdontologicos: string;
  observacoes?: string;
}

export interface OdontologiaResponse {
  _id: string;
  vitimaId: string;
  dadosOdontologicos: string;
  observacoes?: string;
  criadoEm: string;
  atualizadoEm: string;
}

// Tipos para Dashboard
export interface DashboardData {
  totalCasos: number;
  casosEmAndamento: number;
  casosFinalizados: number;
  casosArquivados: number;
  totalVitimas: number;
  totalEvidencias: number;
  totalLaudos: number;
  estatisticasPorPeriodo: Array<{
    periodo: string;
    casos: number;
    vitimas: number;
    evidencias: number;
  }>;
}
