import '@testing-library/jest-dom/vitest';

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
