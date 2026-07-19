import { describe, expect, it } from 'vitest';

import { getChoseong, isAllChoseong, toChoseong } from './hangul';

describe('getChoseong', () => {
  it('완성형 한글 음절의 초성을 반환한다', () => {
    expect(getChoseong('강')).toBe('ㄱ');
    expect(getChoseong('형')).toBe('ㅎ');
    expect(getChoseong('준')).toBe('ㅈ');
    expect(getChoseong('빵')).toBe('ㅃ');
    expect(getChoseong('힣')).toBe('ㅎ');
    expect(getChoseong('가')).toBe('ㄱ');
  });

  it('한글 음절이 아니면 null을 반환한다', () => {
    expect(getChoseong('a')).toBeNull();
    expect(getChoseong('1')).toBeNull();
    expect(getChoseong('ㄱ')).toBeNull();
    expect(getChoseong(' ')).toBeNull();
  });
});

describe('toChoseong', () => {
  it('한글 음절만 초성으로 치환하고 길이를 보존한다', () => {
    expect(toChoseong('김형준')).toBe('ㄱㅎㅈ');
    expect(toChoseong('React 개발자')).toBe('React ㄱㅂㅈ');
    expect(toChoseong('')).toBe('');
  });

  it('반환 문자열의 길이가 원문과 같다', () => {
    const input = '유형준 aka. hyeongjun';
    expect(toChoseong(input)).toHaveLength(input.length);
  });
});

describe('isAllChoseong', () => {
  it('초성 자모로만 구성된 문자열을 인식한다', () => {
    expect(isAllChoseong('ㅎㄱㅈ')).toBe(true);
    expect(isAllChoseong('ㄲㅆ')).toBe(true);
  });

  it('완성형/영문/빈 문자열은 거부한다', () => {
    expect(isAllChoseong('형')).toBe(false);
    expect(isAllChoseong('ㅎ준')).toBe(false);
    expect(isAllChoseong('ab')).toBe(false);
    expect(isAllChoseong('')).toBe(false);
  });
});
