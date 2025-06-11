
import { 
  CaseResponse, 
  VictimaResponse, 
  EvidenceResponse, 
  LaudoResponse, 
  RelatorioResponse, 
  OdontologiaResponse, 
  UserResponse, 
  DashboardData 
} from '@/types/api';

// Mock Users
export const mockUsers: UserResponse[] = [
  {
    _id: '1',
    nome: 'Dr. João Silva',
    email: 'joao@exemplo.com',
    tipoUsuario: 'perito',
    status: 'ativo',
    criadoEm: '2024-01-15T10:30:00Z',
    atualizadoEm: '2024-01-15T10:30:00Z',
  },
  {
    _id: '2',
    nome: 'Dra. Maria Santos',
    email: 'maria@exemplo.com',
    tipoUsuario: 'admin',
    status: 'ativo',
    criadoEm: '2024-01-20T14:15:00Z',
    atualizadoEm: '2024-01-20T14:15:00Z',
  },
  {
    _id: '3',
    nome: 'Carlos Oliveira',
    email: 'carlos@exemplo.com',
    tipoUsuario: 'assistente',
    status: 'ativo',
    criadoEm: '2024-02-01T09:45:00Z',
    atualizadoEm: '2024-02-01T09:45:00Z',
  },
];

// Mock Cases
export const mockCases: CaseResponse[] = [
  {
    _id: '1',
    titulo: 'Identificação de Vítima - Caso 001',
    descricao: 'Análise odontológica para identificação de vítima encontrada em área rural.',
    status: 'Em andamento',
    dataCriacao: '2024-01-15T10:30:00Z',
    dataAtualizacao: '2024-01-20T16:45:00Z',
    usuarioCriador: '1',
  },
  {
    _id: '2',
    titulo: 'Pericia Dental - Acidente Veicular',
    descricao: 'Análise de evidências dentárias em vítimas de acidente de trânsito.',
    status: 'Finalizado',
    dataCriacao: '2024-01-10T08:15:00Z',
    dataAtualizacao: '2024-01-25T14:30:00Z',
    usuarioCriador: '2',
  },
  {
    _id: '3',
    titulo: 'Identificação Coletiva - Desastre Natural',
    descricao: 'Processo de identificação de múltiplas vítimas após enchente.',
    status: 'Arquivado',
    dataCriacao: '2024-02-01T12:00:00Z',
    dataAtualizacao: '2024-02-15T10:20:00Z',
    usuarioCriador: '1',
  },
];

// Mock Victims
export const mockVitimas: VictimaResponse[] = [
  {
    _id: '1',
    nic: '12345678',
    nome: 'Vítima Não Identificada 001',
    genero: 'Masculino',
    idade: 35,
    corEtnia: 'Parda',
    observacoes: 'Restauração em dente 16, ausência de dentes 17 e 18',
    casoId: '1',
    criadoEm: '2024-01-15T11:00:00Z',
    atualizadoEm: '2024-01-20T17:00:00Z',
  },
  {
    _id: '2',
    nic: '87654321',
    nome: 'João da Silva',
    genero: 'Masculino',
    idade: 42,
    documento: '123.456.789-00',
    endereco: 'Rua das Flores, 123, Centro',
    corEtnia: 'Branca',
    casoId: '2',
    criadoEm: '2024-01-10T09:00:00Z',
    atualizadoEm: '2024-01-25T15:00:00Z',
  },
];

// Mock Evidence
export const mockEvidences: EvidenceResponse[] = [
  {
    _id: '1',
    casoId: '1',
    tipo: 'radiografia',
    arquivo: '/placeholder.svg',
    descricao: 'Radiografia panorâmica da vítima',
    statusAnalise: 'Concluído',
    resultadoIA: 'Identificadas características únicas: restauração metálica em M16, ausência congênita de M17',
    dataUpload: '2024-01-15T12:00:00Z',
  },
  {
    _id: '2',
    casoId: '1',
    tipo: 'fotografia',
    arquivo: '/placeholder.svg',
    descricao: 'Fotografia intraoral - arcada superior',
    statusAnalise: 'Em análise',
    dataUpload: '2024-01-16T14:30:00Z',
  },
];

// Mock Laudos
export const mockLaudos: LaudoResponse[] = [
  {
    _id: '1',
    casoId: '2',
    descricao: 'Análise pericial odontológica completa das evidências coletadas no local do acidente.',
    conclusoes: 'Com base na análise das evidências dentárias, confirma-se a identificação positiva da vítima através das características odontológicas únicas encontradas.',
    perito: 'Dr. João Silva',
    observacoes: 'Recomenda-se arquivo do caso com identificação confirmada.',
    dataCriacao: '2024-01-25T16:00:00Z',
  },
];

// Mock Reports
export const mockRelatorios: RelatorioResponse[] = [
  {
    _id: '1',
    tipo: 'geral',
    conteudo: 'Relatório mensal de atividades do laboratório odonto-legal.',
    dataCriacao: '2024-01-31T18:00:00Z',
    geradoPor: '2',
  },
];

// Mock Odontologia
export const mockOdontologia: OdontologiaResponse[] = [
  {
    _id: '1',
    vitimaId: '1',
    dadosOdontologicos: 'Odontograma completo com marcações de restaurações e ausências dentárias',
    observacoes: 'Padrão dentário compatível com pessoa de meia-idade',
    criadoEm: '2024-01-15T13:00:00Z',
    atualizadoEm: '2024-01-20T18:00:00Z',
  },
];

// Mock Dashboard Data
export const mockDashboardData: DashboardData = {
  totalCasos: 3,
  casosEmAndamento: 1,
  casosFinalizados: 1,
  casosArquivados: 1,
  totalVitimas: 2,
  totalEvidencias: 2,
  totalLaudos: 1,
  estatisticasPorPeriodo: [
    { periodo: '2024-01', casos: 2, vitimas: 1, evidencias: 2 },
    { periodo: '2024-02', casos: 1, vitimas: 1, evidencias: 0 },
  ],
};
