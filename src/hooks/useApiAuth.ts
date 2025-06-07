
import { useMutation } from '@tanstack/react-query';
import api from '@/services/api';
import { LoginRequest, RegisterRequest, AuthResponse } from '@/types/api';
import { toast } from '@/hooks/use-toast';

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: LoginRequest): Promise<AuthResponse> => {
      console.log('Attempting login with:', credentials);
      const { data } = await api.post('/auth/login', credentials);
      return data;
    },
    onSuccess: (data) => {
      console.log('Login successful:', data);
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo, ${data.usuario.nome}`,
      });
    },
    onError: (error: any) => {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 'Email ou senha incorretos';
      toast({
        title: "Erro no login",
        description: errorMessage,
        variant: "destructive"
      });
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (userData: RegisterRequest): Promise<AuthResponse> => {
      console.log('Attempting register with:', userData);
      const { data } = await api.post('/auth/register', userData);
      return data;
    },
    onSuccess: (data) => {
      console.log('Register successful:', data);
      toast({
        title: "Cadastro realizado com sucesso!",
        description: `Bem-vindo, ${data.usuario.nome}`,
      });
    },
    onError: (error: any) => {
      console.error('Register error:', error);
      const errorMessage = error.response?.data?.message || 'Erro ao realizar cadastro';
      toast({
        title: "Erro no cadastro",
        description: errorMessage,
        variant: "destructive"
      });
    },
  });
};
