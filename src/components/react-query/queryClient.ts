import useToast from '@hooks/useToast';
import { MutationCache, QueryCache, QueryClient, QueryClientConfig } from '@tanstack/react-query';

function errorHandler(type: 'query' | 'mutation', errorMsg: string) {
  const { showToast } = useToast();
  const action = type === 'query' ? '데이터를 받아오는 중' : '업데이트 중';
  showToast(`${action} ${errorMsg}`, { type: 'error' });
}

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      // 리패치 옵션을 넣어주세요
      // 현재 refetchOn은 모두 true, staleTime: 0, gcTime: 300000(5분)
    },
  },

  queryCache: new QueryCache({
    onError: (error) => errorHandler('query', error?.message),
  }),
  mutationCache: new MutationCache({
    onError: (error) => errorHandler('mutation', error?.message),
  }),
};

export function generateQueryClient(config: QueryClientConfig) {
  return new QueryClient(config);
}

export const queryClient = generateQueryClient(queryClientConfig);
