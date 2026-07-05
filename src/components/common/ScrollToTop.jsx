import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// SPA 내비게이션 시 이전 페이지의 스크롤 위치가 유지되는 것을 방지한다.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
