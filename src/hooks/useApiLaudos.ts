
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { LaudoRequest, LaudoResponse } from '@/types/api';
import { toast } from '@/hooks/use-toast';

export const useLaudos = () => {
  return useQuery({
    queryKey: ['laudos'],
    queryFn: async (): Promise<LaudoResponse[]> => {
      console.log('Fetching laudos...');
      const { data } = await api.get('/laudos');
      console.log('Laudos fetched successfully:', data);
      return data;
    },
  });
};

export const useCreateLaudo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (laudoData: LaudoRequest): Promise<LaudoResponse> => {
      console.log('Creating laudo with data:', laudoData);
      const { data } = await api.post('/laudos', laudoData);
      console.log('Laudo created successfully:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['laudos'] });
      toast({
        title: "Laudo criado!",
        description: "O laudo foi criado com sucesso.",
      });
    },
    onError: (error: any) => {
      console.error('Error creating laudo:', error);
      toast({
        title: "Erro ao criar laudo",
        description: error.response?.data?.message || "Ocorreu um erro ao criar o laudo.",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateLaudo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<LaudoRequest> }): Promise<LaudoResponse> => {
      console.log('Updating laudo:', id, 'with data:', data);
      const { data: response } = await api.put(`/laudos/${id}`, data);
      console.log('Laudo updated successfully:', response);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['laudos'] });
      toast({
        title: "Laudo atualizado!",
        description: "O laudo foi atualizado com sucesso.",
      });
    },
    onError: (error: any) => {
      console.error('Error updating laudo:', error);
      toast({
        title: "Erro ao atualizar laudo",
        description: error.response?.data?.message || "Ocorreu um erro ao atualizar o laudo.",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteLaudo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      console.log('Deleting laudo:', id);
      await api.delete(`/laudos/${id}`);
      console.log('Laudo deleted successfully');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['laudos'] });
      toast({
        title: "Laudo excluído!",
        description: "O laudo foi excluído com sucesso.",
      });
    },
    onError: (error: any) => {
      console.error('Error deleting laudo:', error);
      toast({
        title: "Erro ao excluir laudo",
        description: error.response?.data?.message || "Ocorreu um erro ao excluir o laudo.",
        variant: "destructive",
      });
    },
  });
};
