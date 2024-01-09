import { IPlanTitle } from 'types';

import { getAllPlanTitles } from '@apis';
import { useQuery } from '@tanstack/react-query';

interface UsePlanTitle {
  allPlanTitles: IPlanTitle[];
}

export function usePlanTitle(): UsePlanTitle {
  const commonOptions = {
    staleTime: 0,
    cacheTime: 300000, // 5 minutes
  };

  const fallback: IPlanTitle[] = [];

  const { data: allPlanTitles = fallback } = useQuery<IPlanTitle[], Error>({
    queryKey: ['allPlanTitles'],
    queryFn: getAllPlanTitles,
    ...commonOptions,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    refetchInterval: 60000, // 60 seconds
  });

  return {
    allPlanTitles,
  };
}
