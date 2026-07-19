import { useEffect, useRef } from 'react';

// 반환된 ref를 센티널 요소에 달면, 요소가 뷰포트에 들어올 때 onIntersect를 호출한다.
// rootMargin으로 도달 전에 미리 트리거해 무한스크롤을 자연스럽게 만든다.
// onIntersect가 바뀌면 옵저버를 다시 만들므로, 호출자는 안정된 함수를 넘겨야 한다
// (react-query의 fetchNextPage는 안정적이다).
export default function useIntersection(onIntersect, enabled = true) {
  const targetRef = useRef(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!enabled || !target) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          onIntersect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [onIntersect, enabled]);

  return targetRef;
}
