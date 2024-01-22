import { getMain } from '@apis';
import { IPlan } from '@pages/Main';
import { useQuery } from '@tanstack/react-query';

interface UseMain {
  main: IPlan[];
}

export function useMain(): UseMain {
  const fallback: IPlan[] = [];

  const { data: main = fallback } = useQuery<IPlan[], Error>({
    queryKey: ['main'],
    queryFn: getMain,
  });

  return {
    main,
  };
}
