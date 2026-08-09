import theme from '@styles/theme/theme';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import FadeInImage from './FadeInImage';

// jsdom은 실제로 이미지를 받지 않으므로 complete와 naturalWidth의 기본값이 무엇인지에
// 테스트가 의존하면 안 된다. 두 경우를 명시적으로 만들어 놓고 검증한다.
const originalComplete = Object.getOwnPropertyDescriptor(
  HTMLImageElement.prototype,
  'complete'
);
const originalNaturalWidth = Object.getOwnPropertyDescriptor(
  HTMLImageElement.prototype,
  'naturalWidth'
);

function stubImageComplete(complete) {
  Object.defineProperty(HTMLImageElement.prototype, 'complete', {
    configurable: true,
    get: () => complete,
  });
  Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', {
    configurable: true,
    get: () => (complete ? 160 : 0),
  });
}

beforeEach(() => {
  stubImageComplete(false);
});

afterEach(() => {
  if (originalComplete) {
    Object.defineProperty(
      HTMLImageElement.prototype,
      'complete',
      originalComplete
    );
  }
  if (originalNaturalWidth) {
    Object.defineProperty(
      HTMLImageElement.prototype,
      'naturalWidth',
      originalNaturalWidth
    );
  }
});

function renderImage(props) {
  return render(
    <ThemeProvider theme={theme}>
      <FadeInImage width={64} height={64} alt="아바타" {...props} />
    </ThemeProvider>
  );
}

describe('FadeInImage', () => {
  it('로드 전에는 스켈레톤을 깔고 이미지를 투명하게 둔다', () => {
    const { container } = renderImage({ src: 'https://example.test/a.png' });

    expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull();
    expect(screen.getByAltText('아바타')).toHaveStyle({ opacity: '0' });
  });

  it('로드가 끝나면 이미지를 불투명하게 만든다', () => {
    renderImage({ src: 'https://example.test/a.png' });
    const image = screen.getByAltText('아바타');

    fireEvent.load(image);

    expect(image).toHaveStyle({ opacity: '1' });
  });

  it('캐시 히트로 onLoad가 발화하지 않아도 스켈레톤이 남지 않는다', () => {
    stubImageComplete(true);

    const { container } = renderImage({ src: 'https://example.test/a.png' });

    expect(container.querySelector('[aria-hidden="true"]')).toBeNull();
    expect(screen.getByAltText('아바타')).toHaveStyle({ opacity: '1' });
  });

  it('showSkeleton이 false면 자리만 예약하고 스켈레톤을 그리지 않는다', () => {
    const { container } = renderImage({
      src: 'https://example.test/a.png',
      showSkeleton: false,
    });

    expect(container.querySelector('[aria-hidden="true"]')).toBeNull();
  });

  it('decoding과 크기를 HTML 속성으로 내려보낸다', () => {
    renderImage({ src: 'https://example.test/a.png' });
    const image = screen.getByAltText('아바타');

    expect(image).toHaveAttribute('decoding', 'async');
    expect(image).toHaveAttribute('width', '64');
    expect(image).toHaveAttribute('height', '64');
  });

  it('loading과 fetchpriority를 그대로 전달한다', () => {
    renderImage({
      src: 'https://example.test/a.png',
      loading: 'lazy',
      fetchPriority: 'high',
    });
    const image = screen.getByAltText('아바타');

    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('fetchpriority', 'high');
  });

  it('src가 실패하면 fallbackSrc로 한 번만 재시도하고 그다음엔 renderError를 그린다', () => {
    renderImage({
      src: 'https://i.imgur.com/abct.png',
      fallbackSrc: 'https://i.imgur.com/abc.png',
      renderError: <span data-testid="error-node" />,
    });

    fireEvent.error(screen.getByAltText('아바타'));
    expect(screen.getByAltText('아바타')).toHaveAttribute(
      'src',
      'https://i.imgur.com/abc.png'
    );

    fireEvent.error(screen.getByAltText('아바타'));
    expect(screen.getByTestId('error-node')).toBeInTheDocument();
    expect(screen.queryByAltText('아바타')).toBeNull();
  });

  it('renderError가 없으면 예약한 자리를 빈 채로 유지한다', () => {
    const { container } = renderImage({
      src: 'https://example.test/logo.png',
      width: 100,
      height: 30,
    });

    fireEvent.error(screen.getByAltText('아바타'));

    expect(screen.queryByAltText('아바타')).toBeNull();
    expect(container.firstChild).toHaveStyle({
      width: '100px',
      height: '30px',
    });
  });
});
