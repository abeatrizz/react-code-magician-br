
// Tipos para Autenticação
export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  user: UserResponse;
}

// Tipos para Usuários
export interface UserRequest {
  nome: string;
  email: string;
  senha: string;
  tipoUsuario: 'admin' | 'perito' | 'assistente';
  status: 'ativo' | 'inativo';
}

export interface UserResponse {
  _id: string;
  nome: string;
  email: string;
  tipoUsuario: 'admin' | 'perito' | 'assistente';
  status: 'ativo' | 'inativo';
  criadoEm: string;
  atualizadoEm: string;
}

// Tipos para Casos
export interface CaseRequest {
  titulo: string;
  descricao: string;
  status: 'aberto' | 'em_andamento' | 'finalizado' | 'arquivado';
}

export interface CaseResponse {
  _id: string;
  titulo: string;
  descricao: string;
  status: 'aberto' | 'em_andamento' | 'finalizado' | 'arquivado';
  criadoEm: string;
  atualizadoEm: string;
  usuarioCriador: string;
}

// Tipos para Laudos
export interface LaudoRequest {
  casoId: string;
  descricao: string;
  assinaturaDigital?: string;
  responsavel: string;
}

export interface LaudoResponse {
  _id: string;
  casoId: string;
  descricao: string;
  dataCriacao: string;
  assinaturaDigital?: string;
  responsavel: string;
}

// Tipos para Evidências
export interface EvidenceRequest {
  casoId: string;
  tipo: 'fotografia' | 'documento' | 'video' | 'audio' | 'outros';
  arquivo?: string;
  descricao: string;
}

export interface EvidenceResponse {
  _id: string;
  casoId: string;
  tipo: 'fotografia' | 'documento' | 'video' | 'audio' | 'outros';
  arquivo?: string;
  descricao: string;
  dataUpload: string;
}

// Tipos para Registros Odontológicos
export interface OdontologiaRequest {
  pacienteNome: string;
  dadosOdontograma: string;
  observacoes?: string;
  casoId: string;
}

export interface OdontologiaResponse {
  _id: string;
  pacienteNome: string;
  dadosOdontograma: string;
  observacoes?: string;
  casoId: string;
  criadoEm: string;
  atualizadoEm: string;
}
