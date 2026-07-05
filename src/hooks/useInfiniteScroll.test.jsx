import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import useInfiniteScroll from './useInfiniteScroll';

// jsdom에서는 body 높이가 0이라 "콘텐츠가 뷰포트보다 짧을 때 추가 로드" 로직이
// hasMore가 false가 될 때까지 페이지를 연속 로드한다. 테스트는 그 최종 상태를 검증한다.
describe('useInfiniteScroll', () => {
  it('마지막 페이지까지 로드한 뒤 중단한다', async () => {
    const pages = {
      null: { content: [{ id: 1 }, { id: 2 }], last: false },
      2: { content: [{ id: 3 }], last: true },
    };
    const fetchPage = vi.fn((cursor) => Promise.resolve(pages[cursor ?? null]));

    const { result } = renderHook(() => useInfiniteScroll(fetchPage));

    await waitFor(() => expect(result.current.hasMore).toBe(false));
    expect(result.current.items.map((i) => i.id)).toEqual([1, 2, 3]);
    expect(result.current.error).toBe(false);
  });

  it('마지막 아이템에 id가 없으면 같은 페이지 무한 재요청을 막기 위해 중단한다', async () => {
    const fetchPage = vi.fn(() =>
      Promise.resolve({ content: [{ name: 'no-id' }], last: false })
    );

    const { result } = renderHook(() => useInfiniteScroll(fetchPage));

    await waitFor(() => expect(result.current.hasMore).toBe(false));
    expect(fetchPage).toHaveBeenCalledTimes(1);
    expect(result.current.items).toHaveLength(1);
  });

  it('커서가 전진하지 않으면 중단한다', async () => {
    const fetchPage = vi.fn(() =>
      Promise.resolve({ content: [{ id: 1 }], last: false })
    );

    const { result } = renderHook(() => useInfiniteScroll(fetchPage));

    await waitFor(() => expect(result.current.hasMore).toBe(false));
    // 첫 요청(cursor null→1)은 전진, 두 번째 요청에서 같은 커서가 반복되어 중단
    expect(fetchPage).toHaveBeenCalledTimes(2);
    // 중복 페이지는 append되지 않아 같은 아이템이 두 번 표시되지 않는다
    expect(result.current.items).toEqual([{ id: 1 }]);
  });

  it('요청 실패 시 error를 노출하고 retry로 재시도할 수 있다', async () => {
    const fetchPage = vi
      .fn()
      .mockRejectedValueOnce(new Error('network'))
      .mockResolvedValue({ content: [{ id: 1 }], last: true });

    const { result } = renderHook(() => useInfiniteScroll(fetchPage));

    await waitFor(() => expect(result.current.error).toBe(true));
    // 오류가 "목록 끝"으로 위장되지 않는다
    expect(result.current.hasMore).toBe(true);
    expect(result.current.items).toEqual([]);

    await act(async () => {
      await result.current.retry();
    });

    await waitFor(() => expect(result.current.error).toBe(false));
    expect(result.current.items).toEqual([{ id: 1 }]);
    expect(result.current.hasMore).toBe(false);
  });
});
