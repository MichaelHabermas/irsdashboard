import { useQuery } from '@tanstack/react-query';

import { MOCK_DATA, type DashboardData } from '@/lib/mock-data';

export function useDashboardData() {
  return useQuery<DashboardData>({
    queryKey: ['dashboard'],
    queryFn: () => Promise.resolve(MOCK_DATA),
    initialData: MOCK_DATA,
    staleTime: Infinity,
  });
}
