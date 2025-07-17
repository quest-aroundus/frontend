'use client';

import {
  defaultShouldDehydrateQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface QueryProviderProps {
  children: React.ReactNode;
}

// QueryClient를 싱글톤으로 관리하여 SSR과 CSR 간 일관성 유지
let browserQueryClient: QueryClient | undefined = undefined;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5분
        gcTime: 10 * 60 * 1000, // 10분
        retry: 2,
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
    },
  });
}

function getQueryClient() {
  if (typeof window === 'undefined') {
    // 서버에서는 항상 새로운 QueryClient 생성
    return makeQueryClient();
  } else {
    // 브라우저에서는 기존 QueryClient 재사용
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function QueryProvider({ children }: QueryProviderProps) {
  // NOTE: useState가 아닌 getQueryClient()를 직접 사용하여
  // 서버와 클라이언트 간 hydration 문제 방지
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
