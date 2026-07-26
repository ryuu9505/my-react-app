import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import useHoverPrefetch from './usePrefetch';

describe('useHoverPrefetch', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('포인터가 머물면 지연 후 한 번 프리페치한다', () => {
    const prefetch = vi.fn();
    const { result } = renderHook(() => useHoverPrefetch(prefetch));

    result.current.onMouseEnter();
    expect(prefetch).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(prefetch).toHaveBeenCalledTimes(1);
  });

  it('지연 안에 포인터가 떠나면 프리페치하지 않는다 (스쳐 지나감)', () => {
    const prefetch = vi.fn();
    const { result } = renderHook(() => useHoverPrefetch(prefetch));

    result.current.onMouseEnter();
    vi.advanceTimersByTime(30);
    result.current.onMouseLeave();
    vi.advanceTimersByTime(200);

    expect(prefetch).not.toHaveBeenCalled();
  });

  it('포커스가 머물면 지연 후 프리페치하고, Tab으로 통과하면 하지 않는다', () => {
    const prefetch = vi.fn();
    const { result } = renderHook(() => useHoverPrefetch(prefetch));

    result.current.onFocus();
    vi.advanceTimersByTime(30);
    result.current.onBlur();
    vi.advanceTimersByTime(200);
    expect(prefetch).not.toHaveBeenCalled();

    result.current.onFocus();
    vi.advanceTimersByTime(100);
    expect(prefetch).toHaveBeenCalledTimes(1);
  });

  it('언마운트 시 대기 중인 타이머를 정리한다', () => {
    const prefetch = vi.fn();
    const { result, unmount } = renderHook(() => useHoverPrefetch(prefetch));

    result.current.onMouseEnter();
    unmount();
    vi.advanceTimersByTime(200);

    expect(prefetch).not.toHaveBeenCalled();
  });
});
