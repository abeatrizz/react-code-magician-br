
import React, { createContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { UserResponse } from '@/types/api';
import { mockUsers } from '@/data/mockData';

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
      const userData = localStorage.getItem('auth_user');
      
      if (userData) {
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
      
      // Simulate login validation with mock users
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (!foundUser) {
        toast({
          title: "Erro no login",
          description: "Email ou senha incorretos",
          variant: "destructive"
        });
        return false;
      }
      
      // Simulate password check (in real app, this would be handled by backend)
      if (senha.length < 3) {
        toast({
          title: "Erro no login",
          description: "Email ou senha incorretos",
          variant: "destructive"
        });
        return false;
      }
      
      console.log('Login successful:', foundUser);
      
      localStorage.setItem('auth_user', JSON.stringify(foundUser));
      setUser(foundUser);
      
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo, ${foundUser.nome}`,
      });
      
      return true;
    } catch (error: any) {
      console.error('Login error:', error);
      
      toast({
        title: "Erro no login",
        description: "Erro interno do sistema",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('auth_user');
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
