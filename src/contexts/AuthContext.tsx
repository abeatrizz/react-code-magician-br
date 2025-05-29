
import React, { createContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

// Web-compatible storage fallback
const webStorage = {
  async get(options: { key: string }) {
    try {
      const value = localStorage.getItem(options.key);
      return { value };
    } catch {
      return { value: null };
    }
  },
  async set(options: { key: string; value: string }) {
    try {
      localStorage.setItem(options.key, options.value);
    } catch (error) {
      console.error('Storage error:', error);
    }
  },
  async remove(options: { key: string }) {
    try {
      localStorage.removeItem(options.key);
    } catch (error) {
      console.error('Storage error:', error);
    }
  }
};

// Use web storage for now, can be replaced with Capacitor when needed
const storage = webStorage;

interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  role: 'admin' | 'perito' | 'assistente';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (cpf: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const { value: token } = await storage.get({ key: 'auth_token' });
      const { value: userData } = await storage.get({ key: 'user_data' });
      
      if (token && userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (cpf: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      let mockUser: User;
      
      // Login de perito
      if (cpf === '12345678901' && password === '123456') {
        mockUser = {
          id: '1',
          name: 'Dr. João Silva',
          email: 'joao.silva@odontolegal.com',
          cpf: cpf,
          role: 'perito'
        };
      }
      // Login de administrador
      else if (cpf === '00000000000' && password === 'admin123') {
        mockUser = {
          id: 'admin1',
          name: 'Administrador Sistema',
          email: 'admin@odontolegal.com',
          cpf: cpf,
          role: 'admin'
        };
      }
      else {
        toast({
          title: "Erro no login",
          description: "CPF ou senha incorretos",
          variant: "destructive"
        });
        return false;
      }
      
      const mockToken = 'mock_jwt_token_12345';
      
      await storage.set({ key: 'auth_token', value: mockToken });
      await storage.set({ key: 'user_data', value: JSON.stringify(mockUser) });
      
      setUser(mockUser);
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo, ${mockUser.name}`,
      });
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Erro no login",
        description: "Erro interno. Tente novamente.",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await storage.remove({ key: 'auth_token' });
      await storage.remove({ key: 'user_data' });
      setUser(null);
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso",
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
