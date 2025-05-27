
import axios from 'axios';
import { Preferences } from '@capacitor/preferences';

const API_BASE_URL = 'https://api.odontolegal.com'; // Substituir pela URL real

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autorização
api.interceptors.request.use(async (config) => {
  const { value: token } = await Preferences.get({ key: 'auth_token' });
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
      await Preferences.remove({ key: 'auth_token' });
      await Preferences.remove({ key: 'user_data' });
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
