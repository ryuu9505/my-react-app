import { useCallback, useState } from 'react';

const STORAGE_KEY = 'unblind:recent-searches';
const MAX_RECENT = 5;

// 과거 배포에서 다른 스키마로 저장됐거나 손상된 항목이 렌더/선택 로직을
// 깨뜨리지 않도록 형태를 검증해서 읽는다.
function isValidEntry(entry) {
  return (
    entry != null &&
    typeof entry === 'object' &&
    typeof entry.id === 'string' &&
    typeof entry.title === 'string' &&
    entry.action != null &&
    typeof entry.action === 'object'
  );
}

function loadRecent() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(parsed)
      ? parsed.filter(isValidEntry).slice(0, MAX_RECENT)
      : [];
  } catch {
    return [];
  }
}

export default function useRecentSearches() {
  const [recent, setRecent] = useState(loadRecent);

  const addRecent = useCallback((entry) => {
    setRecent((prev) => {
      const next = [entry, ...prev.filter((e) => e.id !== entry.id)].slice(
        0,
        MAX_RECENT
      );
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // 저장 실패(프라이빗 모드 등)는 기능에 영향 없으므로 무시
      }
      return next;
    });
  }, []);

  return { recent, addRecent };
}
