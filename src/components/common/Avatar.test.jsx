import theme from '@styles/theme/theme';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import Avatar from './Avatar';

const originalComplete = Object.getOwnPropertyDescriptor(
  HTMLImageElement.prototype,
  'complete'
);

beforeEach(() => {
  // 로드가 끝나지 않은 상태를 기본으로 둔다. 캐시 동작은 FadeInImage 테스트가 다룬다.
  Object.defineProperty(HTMLImageElement.prototype, 'complete', {
    configurable: true,
    get: () => false,
  });
});

afterEach(() => {
  if (originalComplete) {
    Object.defineProperty(
      HTMLImageElement.prototype,
      'complete',
      originalComplete
    );
  }
});

function renderAvatar(props) {
  return render(
    <ThemeProvider theme={theme}>
      <Avatar {...props} />
    </ThemeProvider>
  );
}

const S3_AVATAR =
  'https://unblind-kr.s3.ap-northeast-2.amazonaws.com/profile-image/shark.png';

describe('Avatar', () => {
  it('imgur 아바타는 표시 크기에 맞는 축소본을 요청한다', () => {
    renderAvatar({
      src: 'https://imgur.com/lnOB0k7.png',
      alt: '프로필',
      size: 64,
    });

    expect(screen.getByAltText('프로필')).toHaveAttribute(
      'src',
      'https://i.imgur.com/lnOB0k7t.png'
    );
  });

  it('상세 페이지 크기에는 큰 축소본을 요청한다', () => {
    renderAvatar({
      src: 'https://imgur.com/lnOB0k7.png',
      alt: '프로필',
      size: 200,
    });

    expect(screen.getByAltText('프로필')).toHaveAttribute(
      'src',
      'https://i.imgur.com/lnOB0k7l.png'
    );
  });

  it('축소본이 실패하면 원본 주소로 재시도한다', () => {
    renderAvatar({
      src: 'https://imgur.com/lnOB0k7.png',
      alt: '프로필',
      size: 64,
    });

    fireEvent.error(screen.getByAltText('프로필'));

    expect(screen.getByAltText('프로필')).toHaveAttribute(
      'src',
      'https://i.imgur.com/lnOB0k7.png'
    );
  });

  it('원본까지 실패하면 기본 아이콘으로 떨어진다', () => {
    renderAvatar({
      src: 'https://imgur.com/lnOB0k7.png',
      alt: '프로필',
      size: 64,
    });

    fireEvent.error(screen.getByAltText('프로필'));
    fireEvent.error(screen.getByAltText('프로필'));

    expect(screen.queryByAltText('프로필')).toBeNull();
    expect(screen.getByRole('img', { name: '프로필' })).toBeInTheDocument();
  });

  it('S3 아바타는 주소를 바꾸지 않는다', () => {
    renderAvatar({ src: S3_AVATAR, alt: '프로필', size: 64 });

    expect(screen.getByAltText('프로필')).toHaveAttribute('src', S3_AVATAR);
  });

  it('src가 없으면 기본 아이콘을 그린다', () => {
    renderAvatar({ alt: '프로필', size: 64 });

    expect(screen.queryByAltText('프로필')).toBeNull();
    expect(screen.getByRole('img', { name: '프로필' })).toBeInTheDocument();
  });
});
