import { getMain } from '@apis';
import { IPlan } from '@pages/Main';
import { useQuery } from '@tanstack/react-query';

interface UseMain {
  main: IPlan[];
}

export function useMain(): UseMain {
  const commonOptions = {
    staleTime: 0,
    cacheTime: 300000, // 5 minutes
  };

  const fallback: IPlan[] = [];

  const { data: main = fallback } = useQuery<IPlan[], Error>({
    queryKey: ['main'],
    queryFn: getMain,
    ...commonOptions,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    refetchInterval: 60000, // 60 seconds
  });

  return {
    main,
  };
}
