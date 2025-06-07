
import React, { createContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import api, { webStorage } from '@/services/api';
import { LoginRequest, AuthResponse, UserResponse } from '@/types/api';

interface AuthContextType {
  user: UserResponse | null;
  isAuthenticated: boolean;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const { value: token } = await webStorage.get({ key: 'auth_token' });
      const { value: userData } = await webStorage.get({ key: 'user_data' });
      
      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        console.log('Auth status checked - user found:', parsedUser);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, senha: string): Promise<boolean> => {
    try {
      setLoading(true);
      console.log('Attempting login with:', { email });
      
      const loginData: LoginRequest = { email, senha };
      const { data }: { data: AuthResponse } = await api.post('/auth/login', loginData);
      
      console.log('Login successful:', data);
      
      await webStorage.set({ key: 'auth_token', value: data.token });
      await webStorage.set({ key: 'user_data', value: JSON.stringify(data.usuario) });
      
      setUser(data.usuario);
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo, ${data.usuario.nome}`,
      });
      
      return true;
    } catch (error: any) {
      console.error('Login error:', error);
      
      const errorMessage = error.response?.data?.message || 'Email ou senha incorretos';
      toast({
        title: "Erro no login",
        description: errorMessage,
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await webStorage.remove({ key: 'auth_token' });
      await webStorage.remove({ key: 'user_data' });
      setUser(null);
      console.log('Logout successful');
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
