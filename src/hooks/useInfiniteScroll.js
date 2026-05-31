import { PAGINATION } from '@styles/constants';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function useInfiniteScroll(fetchPage) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const cursorRef = useRef(null);
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const throttleRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const { content, last } = await fetchPage(cursorRef.current);
      setItems((prev) => [...prev, ...content]);
      hasMoreRef.current = !last;
      setHasMore(!last);
      if (content.length > 0) {
        cursorRef.current = content[content.length - 1].id;
      }
    } catch (error) {
      console.error('데이터 로드 실패:', error);
      hasMoreRef.current = false;
      setHasMore(false);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [fetchPage]);

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

  return { items, loading, hasMore };
}
