
import { useState, useEffect } from 'react';
import { 
  mockUsers, 
  mockCases, 
  mockVitimas, 
  mockEvidences, 
  mockLaudos, 
  mockRelatorios, 
  mockOdontologia, 
  mockDashboardData 
} from '@/data/mockData';
import {
  UserResponse,
  CaseResponse,
  CaseRequest,
  VictimaResponse,
  VictimaRequest,
  EvidenceResponse,
  LaudoResponse,
  LaudoRequest,
  RelatorioResponse,
  RelatorioRequest,
  OdontologiaResponse,
  OdontologiaRequest,
  DashboardData,
} from '@/types/api';
import { toast } from '@/hooks/use-toast';

// Local storage keys
const STORAGE_KEYS = {
  users: 'odonto_users',
  cases: 'odonto_cases',
  vitimas: 'odonto_vitimas',
  evidences: 'odonto_evidences',
  laudos: 'odonto_laudos',
  relatorios: 'odonto_relatorios',
  odontologia: 'odonto_odontologia',
};

// Utility functions for local storage
const getFromStorage = <T>(key: string, defaultValue: T[]): T[] => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const saveToStorage = <T>(key: string, data: T[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const generateId = () => Math.random().toString(36).substr(2, 9);

// Users hooks
export const useUsers = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUsers = getFromStorage(STORAGE_KEYS.users, mockUsers);
    setUsers(storedUsers);
    setIsLoading(false);
  }, []);

  return { data: users, isLoading, error: null };
};

// Cases hooks
export const useCasos = () => {
  const [cases, setCases] = useState<CaseResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedCases = getFromStorage(STORAGE_KEYS.cases, mockCases);
    setCases(storedCases);
    setIsLoading(false);
  }, []);

  return { data: cases, isLoading, error: null };
};

export const useCreateCaso = () => {
  return {
    mutateAsync: async (data: CaseRequest): Promise<CaseResponse> => {
      const cases = getFromStorage(STORAGE_KEYS.cases, mockCases);
      const newCase: CaseResponse = {
        _id: generateId(),
        ...data,
        status: data.status || 'Em andamento',
        dataCriacao: new Date().toISOString(),
        dataAtualizacao: new Date().toISOString(),
        usuarioCriador: '1',
      };
      
      const updatedCases = [...cases, newCase];
      saveToStorage(STORAGE_KEYS.cases, updatedCases);
      
      toast({
        title: "Caso criado!",
        description: "O caso foi criado com sucesso.",
      });
      
      return newCase;
    },
    isPending: false,
  };
};

export const useUpdateCaso = () => {
  return {
    mutateAsync: async ({ id, data }: { id: string; data: Partial<CaseRequest> }): Promise<CaseResponse> => {
      const cases = getFromStorage(STORAGE_KEYS.cases, mockCases);
      const caseIndex = cases.findIndex(c => c._id === id);
      
      if (caseIndex === -1) throw new Error('Caso não encontrado');
      
      const updatedCase = {
        ...cases[caseIndex],
        ...data,
        dataAtualizacao: new Date().toISOString(),
      };
      
      cases[caseIndex] = updatedCase;
      saveToStorage(STORAGE_KEYS.cases, cases);
      
      toast({
        title: "Caso atualizado!",
        description: "O caso foi atualizado com sucesso.",
      });
      
      return updatedCase;
    },
    isPending: false,
  };
};

export const useDeleteCaso = () => {
  return {
    mutateAsync: async (id: string): Promise<void> => {
      const cases = getFromStorage(STORAGE_KEYS.cases, mockCases);
      const filteredCases = cases.filter(c => c._id !== id);
      saveToStorage(STORAGE_KEYS.cases, filteredCases);
      
      toast({
        title: "Caso excluído!",
        description: "O caso foi excluído com sucesso.",
      });
    },
    isPending: false,
  };
};

// Vitimas hooks
export const useVitimas = (casoId?: string) => {
  const [vitimas, setVitimas] = useState<VictimaResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedVitimas = getFromStorage(STORAGE_KEYS.vitimas, mockVitimas);
    const filteredVitimas = casoId ? storedVitimas.filter(v => v.casoId === casoId) : storedVitimas;
    setVitimas(filteredVitimas);
    setIsLoading(false);
  }, [casoId]);

  return { data: vitimas, isLoading, error: null };
};

export const useCreateVitima = () => {
  return {
    mutateAsync: async (data: VictimaRequest): Promise<VictimaResponse> => {
      const vitimas = getFromStorage(STORAGE_KEYS.vitimas, mockVitimas);
      const newVitima: VictimaResponse = {
        _id: generateId(),
        ...data,
        criadoEm: new Date().toISOString(),
        atualizadoEm: new Date().toISOString(),
      };
      
      const updatedVitimas = [...vitimas, newVitima];
      saveToStorage(STORAGE_KEYS.vitimas, updatedVitimas);
      
      toast({
        title: "Vítima cadastrada!",
        description: "A vítima foi cadastrada com sucesso.",
      });
      
      return newVitima;
    },
    isPending: false,
  };
};

export const useUpdateVitima = () => {
  return {
    mutateAsync: async ({ id, data }: { id: string; data: Partial<VictimaRequest> }): Promise<VictimaResponse> => {
      const vitimas = getFromStorage(STORAGE_KEYS.vitimas, mockVitimas);
      const vitimaIndex = vitimas.findIndex(v => v._id === id);
      
      if (vitimaIndex === -1) throw new Error('Vítima não encontrada');
      
      const updatedVitima = {
        ...vitimas[vitimaIndex],
        ...data,
        atualizadoEm: new Date().toISOString(),
      };
      
      vitimas[vitimaIndex] = updatedVitima;
      saveToStorage(STORAGE_KEYS.vitimas, vitimas);
      
      toast({
        title: "Vítima atualizada!",
        description: "A vítima foi atualizada com sucesso.",
      });
      
      return updatedVitima;
    },
    isPending: false,
  };
};

export const useDeleteVitima = () => {
  return {
    mutateAsync: async (id: string): Promise<void> => {
      const vitimas = getFromStorage(STORAGE_KEYS.vitimas, mockVitimas);
      const filteredVitimas = vitimas.filter(v => v._id !== id);
      saveToStorage(STORAGE_KEYS.vitimas, filteredVitimas);
      
      toast({
        title: "Vítima excluída!",
        description: "A vítima foi excluída com sucesso.",
      });
    },
    isPending: false,
  };
};

// Laudos hooks
export const useLaudos = () => {
  const [laudos, setLaudos] = useState<LaudoResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedLaudos = getFromStorage(STORAGE_KEYS.laudos, mockLaudos);
    setLaudos(storedLaudos);
    setIsLoading(false);
  }, []);

  return { data: laudos, isLoading, error: null };
};

export const useCreateLaudo = () => {
  return {
    mutateAsync: async (data: LaudoRequest): Promise<LaudoResponse> => {
      const laudos = getFromStorage(STORAGE_KEYS.laudos, mockLaudos);
      const newLaudo: LaudoResponse = {
        _id: generateId(),
        ...data,
        dataCriacao: new Date().toISOString(),
      };
      
      const updatedLaudos = [...laudos, newLaudo];
      saveToStorage(STORAGE_KEYS.laudos, updatedLaudos);
      
      toast({
        title: "Laudo criado!",
        description: "O laudo foi criado com sucesso.",
      });
      
      return newLaudo;
    },
    isPending: false,
  };
};

export const useUpdateLaudo = () => {
  return {
    mutateAsync: async ({ id, data }: { id: string; data: Partial<LaudoRequest> }): Promise<LaudoResponse> => {
      const laudos = getFromStorage(STORAGE_KEYS.laudos, mockLaudos);
      const laudoIndex = laudos.findIndex(l => l._id === id);
      
      if (laudoIndex === -1) throw new Error('Laudo não encontrado');
      
      const updatedLaudo = {
        ...laudos[laudoIndex],
        ...data,
      };
      
      laudos[laudoIndex] = updatedLaudo;
      saveToStorage(STORAGE_KEYS.laudos, laudos);
      
      toast({
        title: "Laudo atualizado!",
        description: "O laudo foi atualizado com sucesso.",
      });
      
      return updatedLaudo;
    },
    isPending: false,
  };
};

export const useDeleteLaudo = () => {
  return {
    mutateAsync: async (id: string): Promise<void> => {
      const laudos = getFromStorage(STORAGE_KEYS.laudos, mockLaudos);
      const filteredLaudos = laudos.filter(l => l._id !== id);
      saveToStorage(STORAGE_KEYS.laudos, filteredLaudos);
      
      toast({
        title: "Laudo excluído!",
        description: "O laudo foi excluído com sucesso.",
      });
    },
    isPending: false,
  };
};

// Relatórios hooks
export const useRelatorios = () => {
  const [relatorios, setRelatorios] = useState<RelatorioResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedRelatorios = getFromStorage(STORAGE_KEYS.relatorios, mockRelatorios);
    setRelatorios(storedRelatorios);
    setIsLoading(false);
  }, []);

  return { data: relatorios, isLoading, error: null };
};

export const useCreateRelatorio = () => {
  return {
    mutateAsync: async (data: RelatorioRequest): Promise<RelatorioResponse> => {
      const relatorios = getFromStorage(STORAGE_KEYS.relatorios, mockRelatorios);
      const newRelatorio: RelatorioResponse = {
        _id: generateId(),
        tipo: data.tipo,
        conteudo: `Relatório ${data.tipo} gerado automaticamente`,
        dataCriacao: new Date().toISOString(),
        geradoPor: '1',
      };
      
      const updatedRelatorios = [...relatorios, newRelatorio];
      saveToStorage(STORAGE_KEYS.relatorios, updatedRelatorios);
      
      toast({
        title: "Relatório gerado!",
        description: "O relatório foi gerado com sucesso.",
      });
      
      return newRelatorio;
    },
    isPending: false,
  };
};

// Dashboard hook
export const useDashboard = (filters?: Record<string, any>) => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API delay
    setTimeout(() => {
      setDashboardData(mockDashboardData);
      setIsLoading(false);
    }, 500);
  }, [filters]);

  return { data: dashboardData, isLoading, error: null };
};

// Odontologia hooks
export const useOdontologia = () => {
  const [odontologia, setOdontologia] = useState<OdontologiaResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedOdontologia = getFromStorage(STORAGE_KEYS.odontologia, mockOdontologia);
    setOdontologia(storedOdontologia);
    setIsLoading(false);
  }, []);

  return { data: odontologia, isLoading, error: null };
};

export const useCreateOdontologia = () => {
  return {
    mutateAsync: async (data: OdontologiaRequest): Promise<OdontologiaResponse> => {
      const odontologia = getFromStorage(STORAGE_KEYS.odontologia, mockOdontologia);
      const newOdontologia: OdontologiaResponse = {
        _id: generateId(),
        ...data,
        criadoEm: new Date().toISOString(),
        atualizadoEm: new Date().toISOString(),
      };
      
      const updatedOdontologia = [...odontologia, newOdontologia];
      saveToStorage(STORAGE_KEYS.odontologia, updatedOdontologia);
      
      toast({
        title: "Registro odontológico criado!",
        description: "O registro foi criado com sucesso.",
      });
      
      return newOdontologia;
    },
    isPending: false,
  };
};

export const useUpdateOdontologia = () => {
  return {
    mutateAsync: async ({ id, data }: { id: string; data: Partial<OdontologiaRequest> }): Promise<OdontologiaResponse> => {
      const odontologia = getFromStorage(STORAGE_KEYS.odontologia, mockOdontologia);
      const odontologiaIndex = odontologia.findIndex(o => o._id === id);
      
      if (odontologiaIndex === -1) throw new Error('Registro não encontrado');
      
      const updatedOdontologia = {
        ...odontologia[odontologiaIndex],
        ...data,
        atualizadoEm: new Date().toISOString(),
      };
      
      odontologia[odontologiaIndex] = updatedOdontologia;
      saveToStorage(STORAGE_KEYS.odontologia, odontologia);
      
      toast({
        title: "Registro atualizado!",
        description: "O registro odontológico foi atualizado com sucesso.",
      });
      
      return updatedOdontologia;
    },
    isPending: false,
  };
};

export const useDeleteOdontologia = () => {
  return {
    mutateAsync: async (id: string): Promise<void> => {
      const odontologia = getFromStorage(STORAGE_KEYS.odontologia, mockOdontologia);
      const filteredOdontologia = odontologia.filter(o => o._id !== id);
      saveToStorage(STORAGE_KEYS.odontologia, filteredOdontologia);
      
      toast({
        title: "Registro excluído!",
        description: "O registro odontológico foi excluído com sucesso.",
      });
    },
    isPending: false,
  };
};

// Evidence hooks (simplified for frontend only)
export const useUploadEvidence = () => {
  return {
    mutateAsync: async (file: File): Promise<EvidenceResponse> => {
      // Simulate file upload
      const evidences = getFromStorage(STORAGE_KEYS.evidences, mockEvidences);
      const newEvidence: EvidenceResponse = {
        _id: generateId(),
        casoId: '1', // Default case for demo
        tipo: 'fotografia',
        arquivo: URL.createObjectURL(file),
        descricao: `Evidência - ${file.name}`,
        statusAnalise: 'Aguardando',
        dataUpload: new Date().toISOString(),
      };
      
      const updatedEvidences = [...evidences, newEvidence];
      saveToStorage(STORAGE_KEYS.evidences, updatedEvidences);
      
      toast({
        title: "Evidência enviada!",
        description: "A evidência foi salva com sucesso.",
      });
      
      return newEvidence;
    },
    isPending: false,
  };
};
