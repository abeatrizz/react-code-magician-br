
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
      console.log('Creating case with data:', caseData);
      const { data } = await api.post('/casos', caseData);
      console.log('Case created successfully:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      console.log('Case creation successful, cache invalidated');
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
      console.log('Updating case:', id, 'with data:', data);
      const { data: response } = await api.put(`/casos/${id}`, data);
      console.log('Case updated successfully:', response);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      console.log('Case update successful, cache invalidated');
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
      console.log('Deleting case:', id);
      await api.delete(`/casos/${id}`);
      console.log('Case deleted successfully');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      console.log('Case deletion successful, cache invalidated');
    },
    onError: (error) => {
      console.error('Error deleting case:', error);
    },
  });
};
