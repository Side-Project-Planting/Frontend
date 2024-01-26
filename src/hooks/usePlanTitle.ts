import { useEffect } from 'react';

import { useSetRecoilState } from 'recoil';
import { IPlanTitle } from 'types';

import { currentPlanIdState } from '../recoil/atoms';

import { getAllPlanTitles } from '@apis';
import { queryClient } from '@components/react-query/queryClient';
import { useQuery } from '@tanstack/react-query';
import { prefetchAndSetPlanId } from '@utils';

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

  useEffect(() => {
    prefetchAndSetPlanId(setCurrentPlanId);
  }, [queryClient, setCurrentPlanId]);
}
