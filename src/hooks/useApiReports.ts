
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { LaudoRequest, LaudoResponse } from '@/types/api';
import { toast } from '@/hooks/use-toast';

export const useReports = () => {
  return useQuery({
    queryKey: ['laudos'],
    queryFn: async (): Promise<LaudoResponse[]> => {
      const { data } = await api.get('/laudos');
      return data;
    },
  });
};

export const useCreateReport = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (reportData: LaudoRequest): Promise<LaudoResponse> => {
      const { data } = await api.post('/laudos', reportData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['laudos'] });
      toast({
        title: "Laudo gerado!",
        description: "O laudo foi criado com sucesso.",
      });
    },
    onError: (error) => {
      console.error('Error creating report:', error);
      toast({
        title: "Erro ao gerar laudo",
        description: "Ocorreu um erro ao gerar o laudo.",
        variant: "destructive",
      });
    },
  });
};
