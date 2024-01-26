import { useSetRecoilState } from 'recoil';
import { IPlanTitle } from 'types';

import { getAllPlanTitles } from '@apis';
import { currentPlanIdState } from '@recoil/atoms';
import { useQuery, useQueryClient } from '@tanstack/react-query';

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

export function usePrefetchPlanTitles(): void {
  const setCurrentPlanId = useSetRecoilState(currentPlanIdState);
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({ queryKey: ['allPlanTitles'], queryFn: getAllPlanTitles });

  const { data: cachedPlanTitles } = useQuery<IPlanTitle[]>({ queryKey: ['allPlanTitles'] });

  if (cachedPlanTitles && cachedPlanTitles.length !== 0) {
    setCurrentPlanId(cachedPlanTitles[0].id);
  }
}
