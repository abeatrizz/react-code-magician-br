
import axios from 'axios';
import { Preferences } from '@capacitor/preferences';

// Configuração base da API
const API_BASE_URL = process.env.VITE_API_BASE_URL || 'https://api.odontolegal.com';

// Criar instância do axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  async (config) => {
    try {
      const { value: token } = await Preferences.get({ key: 'auth_token' });
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // Token inválido, fazer logout
      await Preferences.remove({ key: 'auth_token' });
      await Preferences.remove({ key: 'user_data' });
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Interfaces para tipagem
export interface LoginRequest {
  cpf: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    cpf: string;
    role: string;
  };
}

export interface Case {
  id: string;
  number: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  perito: string;
  location: string;
}

export interface Evidence {
  id: string;
  caseId: string;
  type: 'image' | 'document' | 'audio';
  filename: string;
  url: string;
  description?: string;
  createdAt: string;
}

export interface AnalysisResult {
  similarity: number;
  confidence: number;
  recommendations: string[];
  status: 'processing' | 'completed' | 'failed';
}

// Serviços da API
export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
  
  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },
  
  register: async (data: any): Promise<LoginResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
};

export const caseService = {
  getAll: async (): Promise<Case[]> => {
    const response = await api.get('/cases');
    return response.data;
  },
  
  getById: async (id: string): Promise<Case> => {
    const response = await api.get(`/cases/${id}`);
    return response.data;
  },
  
  create: async (data: Partial<Case>): Promise<Case> => {
    const response = await api.post('/cases', data);
    return response.data;
  },
  
  update: async (id: string, data: Partial<Case>): Promise<Case> => {
    const response = await api.put(`/cases/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await api.delete(`/cases/${id}`);
  },
};

export const evidenceService = {
  getByCaseId: async (caseId: string): Promise<Evidence[]> => {
    const response = await api.get(`/cases/${caseId}/evidences`);
    return response.data;
  },
  
  upload: async (caseId: string, file: File, description?: string): Promise<Evidence> => {
    const formData = new FormData();
    formData.append('file', file);
    if (description) {
      formData.append('description', description);
    }
    
    const response = await api.post(`/cases/${caseId}/evidences`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await api.delete(`/evidences/${id}`);
  },
};

export const analysisService = {
  requestAnalysis: async (caseId: string): Promise<AnalysisResult> => {
    const response = await api.post(`/cases/${caseId}/analyze`);
    return response.data;
  },
  
  getAnalysisResult: async (caseId: string): Promise<AnalysisResult> => {
    const response = await api.get(`/cases/${caseId}/analysis`);
    return response.data;
  },
};

export const reportService = {
  getAll: async (): Promise<any[]> => {
    const response = await api.get('/reports');
    return response.data;
  },
  
  generate: async (caseId: string, type: string): Promise<any> => {
    const response = await api.post(`/cases/${caseId}/reports`, { type });
    return response.data;
  },
  
  download: async (reportId: string): Promise<Blob> => {
    const response = await api.get(`/reports/${reportId}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },
};

export default api;
