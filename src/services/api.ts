
import axios from 'axios';

const API_BASE_URL = 'https://api.odontolegal.com'; // Substituir pela URL real

// Web-compatible storage fallback
const webStorage = {
  async get(options: { key: string }) {
    try {
      const value = localStorage.getItem(options.key);
      return { value };
    } catch {
      return { value: null };
    }
  }
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autorização
api.interceptors.request.use(async (config) => {
  const { value: token } = await webStorage.get({ key: 'auth_token' });
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar respostas de erro
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expirado, fazer logout
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
