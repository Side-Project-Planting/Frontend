import { IPlanTitle } from 'types';

import { getAllPlanTitles } from '@apis';
import { useQuery } from '@tanstack/react-query';

interface UsePlanTitle {
  allPlanTitles: IPlanTitle[];
}

export function usePlanTitle(): UsePlanTitle {
  const fallback: IPlanTitle[] = [];

  const { data: allPlanTitles = fallback } = useQuery<IPlanTitle[], Error>({
    queryKey: ['allPlanTitles'],
    queryFn: getAllPlanTitles,
  });

  return {
    allPlanTitles,
  };
}
