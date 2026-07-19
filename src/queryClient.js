import { QueryClient } from '@tanstack/react-query';

// "없음"이 확정된 에러는 재시도해도 결과가 같으므로 즉시 실패시킨다.
function shouldRetry(failureCount, error) {
  if (error?.code === 'POST_NOT_FOUND') return false;
  if (error?.response?.status === 404) return false;
  return failureCount < 1;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: shouldRetry,
      refetchOnWindowFocus: false,
    },
  },
});
