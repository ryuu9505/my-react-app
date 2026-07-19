import { describe, expect, it } from 'vitest';

import { matchText, searchEntries } from './search';

describe('matchText', () => {
  it('대소문자 무시 부분 문자열을 최우선으로 매칭한다', () => {
    const result = matchText('Hyeongjun Yu', 'yeong');
    expect(result).not.toBeNull();
    expect(result.ranges).toEqual([[1, 6]]);
  });

  it('접두 매칭에 더 높은 점수를 준다', () => {
    const prefix = matchText('react', 're');
    const middle = matchText('unreal', 're');
    expect(prefix.score).toBeGreaterThan(middle.score);
  });

  it('초성 질의로 한글 이름을 매칭하고 원문 범위를 하이라이트한다', () => {
    const result = matchText('김형준', 'ㅎㅈ');
    expect(result).not.toBeNull();
    expect(result.ranges).toEqual([[1, 3]]);
  });

  it('비한글이 섞인 문자열에서도 초성 매칭이 동작한다', () => {
    const result = matchText('개발자 John', 'ㄱㅂㅈ');
    expect(result).not.toBeNull();
    expect(result.ranges).toEqual([[0, 3]]);
  });

  it('부분 문자열이 있으면 초성 해석보다 우선한다', () => {
    // 'ㄱㄴ'이 원문에 문자 그대로 존재하는 경우
    const result = matchText('자모 ㄱㄴ 표', 'ㄱㄴ');
    expect(result.score).toBeGreaterThanOrEqual(100);
  });

  it('순서대로 등장하는 문자를 fuzzy 매칭한다', () => {
    const result = matchText('useInfiniteQuery', 'uiq');
    expect(result).not.toBeNull();
    expect(result.ranges.flat()).toContain(0);
  });

  it('순서가 어긋나면 매칭하지 않는다', () => {
    expect(matchText('abc', 'ca')).toBeNull();
  });

  it('toLowerCase로 길이가 변하는 문자(İ)가 있어도 하이라이트가 원문과 일치한다', () => {
    const text = 'İstanbul React';
    const result = matchText(text, 'react');
    expect(result).not.toBeNull();
    const [start, end] = result.ranges[0];
    expect(text.slice(start, end)).toBe('React');
  });

  it('빈 입력은 null을 반환한다', () => {
    expect(matchText('', 'a')).toBeNull();
    expect(matchText('a', '')).toBeNull();
  });
});

describe('searchEntries', () => {
  const entries = [
    {
      id: 'user-1',
      type: 'user',
      title: '김형준',
      subtitle: '@hyeongjun',
      keywords: ['백엔드 개발자'],
    },
    {
      id: 'user-2',
      type: 'user',
      title: '박형식',
      subtitle: '@hyeongsik',
      keywords: [],
    },
    {
      id: 'post-1',
      type: 'post',
      title: '서버, 폭삭 터졌수다',
      subtitle: '고가용 서비스를 만드는 방법',
      keywords: [],
    },
  ];

  it('제목 매칭이 키워드 매칭보다 상위에 온다', () => {
    const results = searchEntries(entries, '형');
    expect(results.length).toBeGreaterThanOrEqual(2);
    expect(results[0].entry.type).toBe('user');
  });

  it('초성 질의로 여러 필드를 검색한다', () => {
    const results = searchEntries(entries, 'ㄱㅎㅈ');
    expect(results.map((r) => r.entry.id)).toContain('user-1');
  });

  it('subtitle로도 검색된다', () => {
    const results = searchEntries(entries, 'hyeongsik');
    expect(results[0].entry.id).toBe('user-2');
  });

  it('키워드로도 검색되지만 하이라이트 범위는 비어 있다', () => {
    const results = searchEntries(entries, '백엔드');
    expect(results[0].entry.id).toBe('user-1');
    expect(results[0].titleRanges).toEqual([]);
  });

  it('빈 질의에는 빈 배열을 반환한다', () => {
    expect(searchEntries(entries, '')).toEqual([]);
    expect(searchEntries(entries, '   ')).toEqual([]);
  });

  it('limit 개수를 초과하지 않는다', () => {
    const many = Array.from({ length: 30 }, (_, i) => ({
      id: `u${i}`,
      type: 'user',
      title: `user${i}`,
      subtitle: '',
      keywords: [],
    }));
    expect(searchEntries(many, 'user', 20)).toHaveLength(20);
  });
});
