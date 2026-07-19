import SearchPalette from '@components/search/SearchPalette';
import { isMacLike } from '@utils/platform';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';

const SearchContext = createContext(null);

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      'useSearch는 SearchProvider 내부에서만 사용할 수 있습니다.'
    );
  }
  return context;
}

export default function SearchProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // 라우트가 바뀌면(브라우저 뒤로가기 포함) 팔레트를 닫는다.
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // 전역 단축키: ⌘K(맥) / Ctrl+K(그 외).
  // 맥의 Ctrl+K는 텍스트 필드의 kill-line 단축키이므로 가로채지 않는다.
  useEffect(() => {
    const onKeyDown = (e) => {
      const mod = isMacLike ? e.metaKey : e.ctrlKey;
      if (mod && !e.shiftKey && !e.altKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return (
    <SearchContext.Provider value={value}>
      {children}
      {isOpen && <SearchPalette onClose={close} />}
    </SearchContext.Provider>
  );
}
