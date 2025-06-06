
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { CaseRequest, CaseResponse } from '@/types/api';

export const useCases = () => {
  return useQuery({
    queryKey: ['cases'],
    queryFn: async (): Promise<CaseResponse[]> => {
      try {
        console.log('Fetching cases...');
        const { data } = await api.get('/casos');
        console.log('Cases fetched successfully:', data);
        return data;
      } catch (error) {
        console.error('Error fetching cases:', error);
        throw error;
      }
    },
  });
};

export const useCreateCase = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (caseData: CaseRequest): Promise<CaseResponse> => {
      const { data } = await api.post('/casos', caseData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      console.log('Case created successfully');
    },
    onError: (error) => {
      console.error('Error creating case:', error);
    },
  });
};

export const useUpdateCase = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CaseRequest> }): Promise<CaseResponse> => {
      const { data: response } = await api.put(`/casos/${id}`, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      console.log('Case updated successfully');
    },
    onError: (error) => {
      console.error('Error updating case:', error);
    },
  });
};

export const useDeleteCase = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await api.delete(`/casos/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      console.log('Case deleted successfully');
    },
    onError: (error) => {
      console.error('Error deleting case:', error);
    },
  });
};
