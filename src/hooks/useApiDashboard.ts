
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import { DashboardData } from '@/types/api';

export const useDashboard = (filters?: Record<string, any>) => {
  return useQuery({
    queryKey: ['dashboard', filters],
    queryFn: async (): Promise<DashboardData> => {
      console.log('Fetching dashboard data with filters:', filters);
      const params = filters ? new URLSearchParams(filters).toString() : '';
      const url = params ? `/dashboard?${params}` : '/dashboard';
      const { data } = await api.get(url);
      console.log('Dashboard data fetched successfully:', data);
      return data;
    },
  });
};
