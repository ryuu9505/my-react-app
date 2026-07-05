import { PAGINATION } from '@styles/constants';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function useInfiniteScroll(fetchPage) {
  const [items, setItems] = useState([]);
  // 첫 로드는 마운트 이펙트에서 시작되므로, 첫 페인트에 빈 상태 문구가
  // 깜빡이지 않도록 loading을 true로 시작한다.
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);

  const cursorRef = useRef(null);
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const errorRef = useRef(false);
  const throttleRef = useRef(false);

  const stop = useCallback(() => {
    hasMoreRef.current = false;
    setHasMore(false);
  }, []);

  const loadMore = useCallback(async () => {
    // 에러 상태에서는 자동 로드(스크롤/짧은 콘텐츠)로 무한 재시도하지 않고
    // 명시적 retry만 허용한다.
    if (loadingRef.current || !hasMoreRef.current || errorRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const { content, last } = await fetchPage(cursorRef.current);

      const nextCursor =
        content.length > 0 ? content[content.length - 1]?.id : null;
      // 서버가 커서를 무시하고 같은 페이지를 반환하면 중복 표시를 막기 위해
      // append하지 않고 버린다.
      const isDuplicatePage =
        nextCursor != null && nextCursor === cursorRef.current;

      if (!isDuplicatePage && content.length > 0) {
        setItems((prev) => [...prev, ...content]);
      }

      // 커서가 전진하지 못하면(마지막 아이템에 id가 없거나 중복 페이지)
      // 같은 페이지를 무한 재요청하게 되므로 여기서 중단한다.
      if (last || nextCursor == null || isDuplicatePage) {
        stop();
      } else {
        cursorRef.current = nextCursor;
      }
    } catch (err) {
      console.error('데이터 로드 실패:', err);
      // 오류를 "목록 끝"으로 위장하지 않고 error 상태로 노출해 재시도를 허용한다.
      errorRef.current = true;
      setError(true);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [fetchPage, stop]);

  const retry = useCallback(() => {
    errorRef.current = false;
    setError(false);
    return loadMore();
  }, [loadMore]);

  // 초기 로드
  useEffect(() => {
    loadMore();
  }, [loadMore]);

  // 스크롤 감지
  useEffect(() => {
    const onScroll = () => {
      if (throttleRef.current) return;
      throttleRef.current = true;
      requestAnimationFrame(() => {
        const nearBottom =
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - PAGINATION.SCROLL_THRESHOLD;
        if (nearBottom) {
          loadMore();
        }
        throttleRef.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [loadMore]);

  // 콘텐츠가 뷰포트보다 짧을 때 추가 로드
  useEffect(() => {
    if (
      !loadingRef.current &&
      hasMoreRef.current &&
      document.body.offsetHeight <= window.innerHeight
    ) {
      loadMore();
    }
  }, [loading, loadMore]);

  return { items, loading, hasMore, error, retry };
}
