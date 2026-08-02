import '@testing-library/jest-dom/vitest';

// 이 셋업은 모든 테스트 파일에 적용된다. DOM이 필요 없어 node 환경으로 도는
// 테스트도 있으므로, 브라우저 전용 스텁은 window가 있을 때만 설치한다.
if (typeof window !== 'undefined') {
  // jsdom에 없는 브라우저 API 스텁 (framer-motion, ScrollToTop 등이 사용)
  if (!window.matchMedia) {
    window.matchMedia = (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    });
  }

  if (!window.IntersectionObserver) {
    window.IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    };
  }

  // jsdom의 scrollTo는 "Not implemented" 경고를 내므로 무조건 덮어쓴다.
  window.scrollTo = () => {};

  if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = () => {};
  }
}
