import theme from '@styles/theme/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { describe, expect, it } from 'vitest';

import ProfileCard, { ProfileCardSkeleton } from './ProfileCard';

function renderCard(props) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ProfileCard
            username="tester"
            name="테스터"
            bio="소개"
            userType="MEMBER"
            {...props}
          />
        </MemoryRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

const LOGO = {
  url: 'https://i.imgur.com/vR2EWGZ.png',
  altText: '뉴빌리티 로고',
  isWide: true,
};

describe('ProfileCard', () => {
  it('로고 자리를 100x30으로 고정해 로드 전에도 폭이 0이 되지 않게 한다', () => {
    renderCard({ companyLogos: [LOGO] });
    const logo = screen.getByAltText('뉴빌리티 로고');

    expect(logo).toHaveAttribute('width', '100');
    expect(logo).toHaveAttribute('height', '30');
  });

  it('로고가 있든 없든 같은 높이의 자리를 예약한다', () => {
    const withLogo = renderCard({ companyLogos: [LOGO] });
    expect(
      withLogo.container.querySelector('[data-logo-row="true"]')
    ).toHaveStyle({ minHeight: '30px' });
    withLogo.unmount();

    const withoutLogo = renderCard({ companyLogos: [] });
    expect(
      withoutLogo.container.querySelector('[data-logo-row="true"]')
    ).toHaveStyle({ minHeight: '30px' });
  });

  it('로고는 여러 개가 와도 첫 번째만 그린다', () => {
    renderCard({
      companyLogos: [LOGO, { ...LOGO, altText: '두 번째 로고' }],
    });

    expect(screen.getByAltText('뉴빌리티 로고')).toBeInTheDocument();
    expect(screen.queryByAltText('두 번째 로고')).toBeNull();
  });

  it('priority면 아바타에 fetchpriority=high를 주고 lazy를 붙이지 않는다', () => {
    renderCard({
      profileImage: { url: 'https://imgur.com/lnOB0k7.png', altText: '아바타' },
      priority: true,
    });
    const avatar = screen.getByAltText('아바타');

    expect(avatar).toHaveAttribute('fetchpriority', 'high');
    expect(avatar).not.toHaveAttribute('loading');
  });

  it('priority가 아니면 아바타와 로고를 lazy로 미룬다', () => {
    renderCard({
      profileImage: { url: 'https://imgur.com/lnOB0k7.png', altText: '아바타' },
      companyLogos: [LOGO],
    });

    expect(screen.getByAltText('아바타')).toHaveAttribute('loading', 'lazy');
    expect(screen.getByAltText('뉴빌리티 로고')).toHaveAttribute(
      'loading',
      'lazy'
    );
  });
});

describe('ProfileCardSkeleton', () => {
  function renderSkeletonCard() {
    return render(
      <ThemeProvider theme={theme}>
        <ProfileCardSkeleton />
      </ThemeProvider>
    );
  }

  it('보조기기에는 노출하지 않는다', () => {
    const { container } = renderSkeletonCard();

    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('아바타와 텍스트 줄과 로고 자리를 모두 스켈레톤으로 채운다', () => {
    const { container } = renderSkeletonCard();

    // Skeleton은 span으로 렌더링되고 자기 자신에게 aria-hidden을 붙인다.
    expect(container.querySelectorAll('span[aria-hidden="true"]')).toHaveLength(
      5
    );
  });

  it('아바타 자리는 원형으로 그린다', () => {
    const { container } = renderSkeletonCard();
    const first = container.querySelector('span[aria-hidden="true"]');

    expect(first).toHaveStyle({ borderRadius: '50%' });
  });

  it('실제 카드와 같은 폭을 쓴다', () => {
    const { container } = renderSkeletonCard();

    expect(container.firstChild).toHaveStyle({ width: '160px' });
  });
});
