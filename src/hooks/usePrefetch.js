import { fetchPostById } from '@apis/postApi';
import { fetchUserByUsername } from '@apis/userApi';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';

const INTENT_DELAY_MS = 80;

// 포인터가 잠깐 스쳐 지나가는 것과 "머무는 것(이동 의도)"을 지연 타이머로
// 구분해, 의도가 확인된 시점에만 상세 데이터를 미리 받는다. 클릭 시점에는
// 캐시 히트로 로딩 없이 즉시 렌더된다. 중복 요청은 react-query가 걸러준다.
export default function useHoverPrefetch(prefetch) {
  const timerRef = useRef(null);

  const cancel = useCallback(() => {
    if (timerRef.current != null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const schedule = useCallback(() => {
    cancel();
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      prefetch();
    }, INTENT_DELAY_MS);
  }, [cancel, prefetch]);

  useEffect(() => cancel, [cancel]);

  // 터치는 스크롤 플릭에도 touchstart가 발생해 낭비 요청을 만들고, 탭 시에는
  // 바로 이동하므로 프리페치 이득이 없다 — 포인터/키보드 경로에만 적용한다.
  // 키보드 포커스도 Tab으로 목록을 통과할 수 있어 같은 인텐트 지연을 쓴다.
  return {
    onMouseEnter: schedule,
    onMouseLeave: cancel,
    onFocus: schedule,
    onBlur: cancel,
  };
}

export function usePrefetchUser(username) {
  const queryClient = useQueryClient();
  return useCallback(() => {
    if (!username) return;
    queryClient.prefetchQuery({
      queryKey: ['user', username],
      queryFn: () => fetchUserByUsername(username),
    });
  }, [queryClient, username]);
}

export function usePrefetchPost(postId) {
  const queryClient = useQueryClient();
  return useCallback(() => {
    if (postId == null) return;
    queryClient.prefetchQuery({
      queryKey: ['post', String(postId)],
      queryFn: () => fetchPostById(String(postId)),
    });
  }, [queryClient, postId]);
}
