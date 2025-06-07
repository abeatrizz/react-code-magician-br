
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { UserRequest, UserResponse } from '@/types/api';
import { toast } from '@/hooks/use-toast';

export const useUsuarios = () => {
  return useQuery({
    queryKey: ['usuarios'],
    queryFn: async (): Promise<UserResponse[]> => {
      console.log('Fetching usuarios...');
      const { data } = await api.get('/usuarios');
      console.log('Usuarios fetched successfully:', data);
      return data;
    },
  });
};

export const useCreateUsuario = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (userData: UserRequest): Promise<UserResponse> => {
      console.log('Creating usuario with data:', userData);
      const { data } = await api.post('/usuarios', userData);
      console.log('Usuario created successfully:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
      toast({
        title: "Usuário criado!",
        description: "O usuário foi criado com sucesso.",
      });
    },
    onError: (error: any) => {
      console.error('Error creating usuario:', error);
      toast({
        title: "Erro ao criar usuário",
        description: error.response?.data?.message || "Ocorreu um erro ao criar o usuário.",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateUsuario = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<UserRequest> }): Promise<UserResponse> => {
      console.log('Updating usuario:', id, 'with data:', data);
      const { data: response } = await api.put(`/usuarios/${id}`, data);
      console.log('Usuario updated successfully:', response);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
      toast({
        title: "Usuário atualizado!",
        description: "O usuário foi atualizado com sucesso.",
      });
    },
    onError: (error: any) => {
      console.error('Error updating usuario:', error);
      toast({
        title: "Erro ao atualizar usuário",
        description: error.response?.data?.message || "Ocorreu um erro ao atualizar o usuário.",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteUsuario = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      console.log('Deleting usuario:', id);
      await api.delete(`/usuarios/${id}`);
      console.log('Usuario deleted successfully');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
      toast({
        title: "Usuário excluído!",
        description: "O usuário foi excluído com sucesso.",
      });
    },
    onError: (error: any) => {
      console.error('Error deleting usuario:', error);
      toast({
        title: "Erro ao excluir usuário",
        description: error.response?.data?.message || "Ocorreu um erro ao excluir o usuário.",
        variant: "destructive",
      });
    },
  });
};
