import { describe, expect, it } from 'vitest';

import { toSafeHttpUrl } from './url';

describe('toSafeHttpUrl', () => {
  it('https URL을 그대로 허용한다', () => {
    expect(toSafeHttpUrl('https://example.com/post/1')).toBe(
      'https://example.com/post/1'
    );
  });

  it('http URL을 허용한다', () => {
    expect(toSafeHttpUrl('http://example.com')).toBe('http://example.com/');
  });

  it('javascript: 스킴을 차단한다', () => {
    expect(toSafeHttpUrl('javascript:alert(1)')).toBeNull();
    expect(toSafeHttpUrl('JavaScript:alert(1)')).toBeNull();
  });

  it('data:와 vbscript: 스킴을 차단한다', () => {
    expect(
      toSafeHttpUrl('data:text/html,<script>alert(1)</script>')
    ).toBeNull();
    expect(toSafeHttpUrl('vbscript:msgbox')).toBeNull();
  });

  it('빈 값이나 문자열이 아닌 입력에는 null을 반환한다', () => {
    expect(toSafeHttpUrl('')).toBeNull();
    expect(toSafeHttpUrl('   ')).toBeNull();
    expect(toSafeHttpUrl(null)).toBeNull();
    expect(toSafeHttpUrl(undefined)).toBeNull();
    expect(toSafeHttpUrl(42)).toBeNull();
  });

  it('상대 경로는 현재 origin 기준의 절대 URL로 변환한다', () => {
    expect(toSafeHttpUrl('/posts/1')).toBe(`${window.location.origin}/posts/1`);
  });
});
