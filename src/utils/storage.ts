
import { Preferences } from '@capacitor/preferences';

// Chaves para armazenamento
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  SETTINGS: 'app_settings',
  OFFLINE_CASES: 'offline_cases',
  CACHE_EVIDENCES: 'cache_evidences',
} as const;

// Utilitários para armazenamento seguro
export const secureStorage = {
  // Salvar dados
  set: async (key: string, value: any): Promise<void> => {
    try {
      const serializedValue = JSON.stringify(value);
      await Preferences.set({
        key,
        value: serializedValue,
      });
    } catch (error) {
      console.error(`Error saving to storage (${key}):`, error);
      throw error;
    }
  },

  // Recuperar dados
  get: async <T = any>(key: string): Promise<T | null> => {
    try {
      const { value } = await Preferences.get({ key });
      if (value) {
        return JSON.parse(value) as T;
      }
      return null;
    } catch (error) {
      console.error(`Error getting from storage (${key}):`, error);
      return null;
    }
  },

  // Remover dados
  remove: async (key: string): Promise<void> => {
    try {
      await Preferences.remove({ key });
    } catch (error) {
      console.error(`Error removing from storage (${key}):`, error);
      throw error;
    }
  },

  // Limpar todos os dados
  clear: async (): Promise<void> => {
    try {
      await Preferences.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  },

  // Listar todas as chaves
  keys: async (): Promise<string[]> => {
    try {
      const { keys } = await Preferences.keys();
      return keys;
    } catch (error) {
      console.error('Error getting storage keys:', error);
      return [];
    }
  },
};

// Utilitários específicos para dados da aplicação
export const appStorage = {
  // Salvar token de autenticação
  saveAuthToken: async (token: string): Promise<void> => {
    await secureStorage.set(STORAGE_KEYS.AUTH_TOKEN, token);
  },

  // Recuperar token de autenticação
  getAuthToken: async (): Promise<string | null> => {
    return await secureStorage.get<string>(STORAGE_KEYS.AUTH_TOKEN);
  },

  // Salvar dados do usuário
  saveUserData: async (userData: any): Promise<void> => {
    await secureStorage.set(STORAGE_KEYS.USER_DATA, userData);
  },

  // Recuperar dados do usuário
  getUserData: async (): Promise<any | null> => {
    return await secureStorage.get(STORAGE_KEYS.USER_DATA);
  },

  // Salvar configurações da aplicação
  saveSettings: async (settings: any): Promise<void> => {
    await secureStorage.set(STORAGE_KEYS.SETTINGS, settings);
  },

  // Recuperar configurações da aplicação
  getSettings: async (): Promise<any | null> => {
    return await secureStorage.get(STORAGE_KEYS.SETTINGS);
  },

  // Salvar casos para uso offline
  saveOfflineCases: async (cases: any[]): Promise<void> => {
    await secureStorage.set(STORAGE_KEYS.OFFLINE_CASES, cases);
  },

  // Recuperar casos offline
  getOfflineCases: async (): Promise<any[] | null> => {
    return await secureStorage.get<any[]>(STORAGE_KEYS.OFFLINE_CASES);
  },

  // Limpar dados de autenticação
  clearAuthData: async (): Promise<void> => {
    await secureStorage.remove(STORAGE_KEYS.AUTH_TOKEN);
    await secureStorage.remove(STORAGE_KEYS.USER_DATA);
  },
};

// Cache para evidências (imagens, documentos)
export const evidenceCache = {
  // Salvar evidência no cache
  save: async (key: string, data: any): Promise<void> => {
    const cacheKey = `${STORAGE_KEYS.CACHE_EVIDENCES}_${key}`;
    await secureStorage.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });
  },

  // Recuperar evidência do cache
  get: async (key: string, maxAge: number = 24 * 60 * 60 * 1000): Promise<any | null> => {
    const cacheKey = `${STORAGE_KEYS.CACHE_EVIDENCES}_${key}`;
    const cached = await secureStorage.get<{ data: any; timestamp: number }>(cacheKey);
    
    if (cached) {
      const age = Date.now() - cached.timestamp;
      if (age <= maxAge) {
        return cached.data;
      } else {
        // Cache expirado, remover
        await secureStorage.remove(cacheKey);
      }
    }
    
    return null;
  },

  // Limpar cache de evidências
  clear: async (): Promise<void> => {
    const keys = await secureStorage.keys();
    const evidenceKeys = keys.filter(key => key.startsWith(STORAGE_KEYS.CACHE_EVIDENCES));
    
    for (const key of evidenceKeys) {
      await secureStorage.remove(key);
    }
  },
};

export default secureStorage;
