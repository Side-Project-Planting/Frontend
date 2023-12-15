import { MutationCache, QueryCache, QueryClient, QueryClientConfig } from '@tanstack/react-query';

function errorHandler(type: 'query' | 'mutation', errorMsg: string) {
  const action = type === 'query' ? 'load' : 'update';
  // eslint-disable-next-line no-alert
  window.alert(`could not ${action} data: ${errorMsg} error connecting to server`);
}

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 600000, // 10 minutes
      // staleTime이 gcTime보다 긴 것은 말이 안 된다.
      gcTime: 1800000, // 30 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
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
