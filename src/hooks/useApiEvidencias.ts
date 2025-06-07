
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { EvidenceRequest, EvidenceResponse } from '@/types/api';
import { toast } from '@/hooks/use-toast';

export const useEvidencias = () => {
  return useQuery({
    queryKey: ['evidencias'],
    queryFn: async (): Promise<EvidenceResponse[]> => {
      console.log('Fetching evidencias...');
      const { data } = await api.get('/evidencias');
      console.log('Evidencias fetched successfully:', data);
      return data;
    },
  });
};

export const useCreateEvidencia = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (evidenceData: EvidenceRequest): Promise<EvidenceResponse> => {
      console.log('Creating evidencia with data:', evidenceData);
      const { data } = await api.post('/evidencias', evidenceData);
      console.log('Evidencia created successfully:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['evidencias'] });
      toast({
        title: "Evidência criada!",
        description: "A evidência foi criada com sucesso.",
      });
    },
    onError: (error: any) => {
      console.error('Error creating evidencia:', error);
      toast({
        title: "Erro ao criar evidência",
        description: error.response?.data?.message || "Ocorreu um erro ao criar a evidência.",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateEvidencia = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<EvidenceRequest> }): Promise<EvidenceResponse> => {
      console.log('Updating evidencia:', id, 'with data:', data);
      const { data: response } = await api.put(`/evidencias/${id}`, data);
      console.log('Evidencia updated successfully:', response);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['evidencias'] });
      toast({
        title: "Evidência atualizada!",
        description: "A evidência foi atualizada com sucesso.",
      });
    },
    onError: (error: any) => {
      console.error('Error updating evidencia:', error);
      toast({
        title: "Erro ao atualizar evidência",
        description: error.response?.data?.message || "Ocorreu um erro ao atualizar a evidência.",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteEvidencia = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      console.log('Deleting evidencia:', id);
      await api.delete(`/evidencias/${id}`);
      console.log('Evidencia deleted successfully');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['evidencias'] });
      toast({
        title: "Evidência excluída!",
        description: "A evidência foi excluída com sucesso.",
      });
    },
    onError: (error: any) => {
      console.error('Error deleting evidencia:', error);
      toast({
        title: "Erro ao excluir evidência",
        description: error.response?.data?.message || "Ocorreu um erro ao excluir a evidência.",
        variant: "destructive",
      });
    },
  });
};
