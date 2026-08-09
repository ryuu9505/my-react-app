import { describe, expect, it } from 'vitest';

import { transformCompanyLogos } from './transformCompanyLogos';

describe('transformCompanyLogos', () => {
  it('wideLogo를 우선 사용한다', () => {
    const careers = [
      {
        company: {
          wideLogo: { url: 'wide.png', altText: 'wide' },
          logo: { url: 'logo.png', altText: 'logo' },
        },
      },
    ];
    expect(transformCompanyLogos(careers)).toEqual([
      { url: 'wide.png', altText: 'wide', isWide: true },
    ]);
  });

  it('wideLogo가 없으면 logo를 사용한다', () => {
    const careers = [
      { company: { logo: { url: 'logo.png', altText: 'logo' } } },
    ];
    expect(transformCompanyLogos(careers)).toEqual([
      { url: 'logo.png', altText: 'logo', isWide: false },
    ]);
  });

  it('로고가 없는 회사와 company가 null인 항목을 걸러낸다', () => {
    const careers = [{ company: {} }, { company: null }, {}];
    expect(transformCompanyLogos(careers)).toEqual([]);
  });

  it('배열이 아닌 입력에는 빈 배열을 반환한다', () => {
    expect(transformCompanyLogos(null)).toEqual([]);
    expect(transformCompanyLogos(undefined)).toEqual([]);
  });

  it('최대 3개까지만 반환한다', () => {
    const careers = Array.from({ length: 5 }, (_, i) => ({
      company: { logo: { url: `logo${i}.png`, altText: `l${i}` } },
    }));
    expect(transformCompanyLogos(careers)).toHaveLength(3);
  });

  it('imgur 로고 주소를 i.imgur.com으로 정규화해 302 왕복을 없앤다', () => {
    const careers = [
      {
        company: {
          wideLogo: { url: 'https://imgur.com/vR2EWGZ.png', altText: 'wide' },
        },
      },
    ];
    expect(transformCompanyLogos(careers)).toEqual([
      { url: 'https://i.imgur.com/vR2EWGZ.png', altText: 'wide', isWide: true },
    ]);
  });
});
