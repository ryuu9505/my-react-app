import { describe, expect, it } from 'vitest';

import { toAvatarUrl, toDirectImageUrl } from './imageUrl';

describe('toDirectImageUrl', () => {
  it('imgur.com을 i.imgur.com으로 바꿔 302 리다이렉트를 없앤다', () => {
    expect(toDirectImageUrl('https://imgur.com/vR2EWGZ.png')).toBe(
      'https://i.imgur.com/vR2EWGZ.png'
    );
  });

  it('이미 i.imgur.com이면 그대로 둔다', () => {
    expect(toDirectImageUrl('https://i.imgur.com/vR2EWGZ.png')).toBe(
      'https://i.imgur.com/vR2EWGZ.png'
    );
  });

  it('imgur가 아닌 호스트는 그대로 둔다', () => {
    const s3 =
      'https://unblind-kr.s3.ap-northeast-2.amazonaws.com/profile-image/shark.png';
    expect(toDirectImageUrl(s3)).toBe(s3);
  });

  it('앨범과 갤러리 경로는 이미지 주소가 아니므로 손대지 않는다', () => {
    expect(toDirectImageUrl('https://imgur.com/a/abc123')).toBe(
      'https://imgur.com/a/abc123'
    );
    expect(toDirectImageUrl('https://imgur.com/gallery/abc123')).toBe(
      'https://imgur.com/gallery/abc123'
    );
  });

  it('URL이 아닌 값과 빈 값은 그대로 돌려준다', () => {
    expect(toDirectImageUrl('logo.png')).toBe('logo.png');
    expect(toDirectImageUrl('')).toBe('');
    expect(toDirectImageUrl(undefined)).toBe(undefined);
    expect(toDirectImageUrl(null)).toBe(null);
  });
});

describe('toAvatarUrl', () => {
  it('80px 이하 표시에는 t(160x160) 축소본을 쓴다', () => {
    expect(toAvatarUrl('https://imgur.com/lnOB0k7.png', 64)).toBe(
      'https://i.imgur.com/lnOB0k7t.png'
    );
    expect(toAvatarUrl('https://imgur.com/lnOB0k7.png', 28)).toBe(
      'https://i.imgur.com/lnOB0k7t.png'
    );
  });

  it('80px보다 크면 l(640x640) 축소본을 쓴다', () => {
    expect(toAvatarUrl('https://imgur.com/lnOB0k7.png', 200)).toBe(
      'https://i.imgur.com/lnOB0k7l.png'
    );
  });

  it('표시 크기를 못 받으면 작은 쪽을 고른다', () => {
    expect(toAvatarUrl('https://imgur.com/lnOB0k7.png')).toBe(
      'https://i.imgur.com/lnOB0k7t.png'
    );
  });

  it('imgur가 아닌 호스트는 축소본이 없으므로 그대로 둔다', () => {
    const s3 =
      'https://unblind-kr.s3.ap-northeast-2.amazonaws.com/profile-image/shark.png';
    expect(toAvatarUrl(s3, 64)).toBe(s3);
  });

  it('앨범과 갤러리 경로는 변형하지 않는다', () => {
    expect(toAvatarUrl('https://imgur.com/a/abc123', 64)).toBe(
      'https://imgur.com/a/abc123'
    );
  });
});
