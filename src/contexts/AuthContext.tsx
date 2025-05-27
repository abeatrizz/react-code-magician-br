
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';
import { toast } from '@/hooks/use-toast';

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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const { value: token } = await Preferences.get({ key: 'auth_token' });
      const { value: userData } = await Preferences.get({ key: 'user_data' });
      
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
      
      // Simulação de login - substituir pela chamada real da API
      if (cpf === '12345678901' && password === '123456') {
        const mockUser: User = {
          id: '1',
          name: 'Dr. João Silva',
          email: 'joao.silva@odontolegal.com',
          cpf: cpf,
          role: 'perito'
        };
        
        const mockToken = 'mock_jwt_token_12345';
        
        await Preferences.set({ key: 'auth_token', value: mockToken });
        await Preferences.set({ key: 'user_data', value: JSON.stringify(mockUser) });
        
        setUser(mockUser);
        toast({
          title: "Login realizado com sucesso!",
          description: `Bem-vindo, ${mockUser.name}`,
        });
        
        return true;
      } else {
        toast({
          title: "Erro no login",
          description: "CPF ou senha incorretos",
          variant: "destructive"
        });
        return false;
      }
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
      await Preferences.remove({ key: 'auth_token' });
      await Preferences.remove({ key: 'user_data' });
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
