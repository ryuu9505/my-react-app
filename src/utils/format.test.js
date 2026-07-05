import { describe, expect, it } from 'vitest';

import formatYearMonth, {
  formatDate,
  getPeriodLength,
  withParentheses,
} from './format';

describe('formatYearMonth', () => {
  it('YYYY-MM-DD 문자열을 YYYY.MM으로 변환한다', () => {
    expect(formatYearMonth('2024-03-15')).toBe('2024.03');
  });

  it('한 자리 월을 0으로 채운다', () => {
    expect(formatYearMonth('2024-3')).toBe('2024.03');
  });

  it('구분자를 바꿀 수 있다', () => {
    expect(formatYearMonth('2024-03', '/')).toBe('2024/03');
  });

  it('빈 값이나 문자열이 아닌 입력에는 빈 문자열을 반환한다', () => {
    expect(formatYearMonth('')).toBe('');
    expect(formatYearMonth(null)).toBe('');
    expect(formatYearMonth(undefined)).toBe('');
    expect(formatYearMonth(1717372800000)).toBe('');
    expect(formatYearMonth(['2024', '05'])).toBe('');
  });

  it('월이 없는 입력에는 빈 문자열을 반환한다', () => {
    expect(formatYearMonth('2024')).toBe('');
  });
});

describe('formatDate', () => {
  it('ISO 날짜 문자열을 YYYY.MM.DD로 변환한다', () => {
    expect(formatDate('2025-06-03T09:07:23.729676')).toBe('2025.06.03');
  });

  it('시간이 없는 날짜도 변환한다', () => {
    expect(formatDate('2025-6-3')).toBe('2025.06.03');
  });

  it('빈 값이나 문자열이 아닌 입력에는 빈 문자열을 반환한다', () => {
    expect(formatDate('')).toBe('');
    expect(formatDate(null)).toBe('');
    expect(formatDate(1717372800000)).toBe('');
  });

  it('불완전한 날짜에는 빈 문자열을 반환한다', () => {
    expect(formatDate('2025-06')).toBe('');
  });
});

describe('withParentheses', () => {
  it('값이 있으면 괄호로 감싼다', () => {
    expect(withParentheses('1년')).toBe('(1년)');
  });

  it('빈 값에는 빈 문자열을 반환한다', () => {
    expect(withParentheses('')).toBe('');
    expect(withParentheses(null)).toBe('');
  });
});

describe('getPeriodLength', () => {
  it('연/월 차이를 계산한다', () => {
    expect(getPeriodLength('2020-01-01', '2021-03-01')).toBe('1년 2개월');
  });

  it('1개월 미만을 처리한다', () => {
    expect(getPeriodLength('2024-01-01', '2024-01-20')).toBe('1개월 미만');
  });

  it('시작일이 없으면 빈 문자열을 반환한다', () => {
    expect(getPeriodLength('')).toBe('');
  });

  it('잘못된 날짜에는 빈 문자열을 반환한다', () => {
    expect(getPeriodLength('invalid', '2024-01-01')).toBe('');
  });
});
