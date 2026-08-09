import useUsersInfiniteQuery from '@hooks/useUsersInfiniteQuery';
import theme from '@styles/theme/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import UserListPage from './UserListPage';

// 헤더와 푸터는 AuthContext와 검색 컨텍스트를 요구한다. 이 테스트의 대상이 아니므로
// 비워서 페이지 본문만 검증한다. JSX를 쓰면 호이스팅된 팩토리에서 React가 아직
// 초기화되지 않을 수 있어 null을 돌려준다.
vi.mock('@components/header/BasicHeader', () => ({ default: () => null }));
vi.mock('@components/common/Footer', () => ({ default: () => null }));

// vi.mock은 임포트보다 위로 호이스팅되므로, 위의 정적 임포트가 이 vi.fn()을 그대로 받는다.
vi.mock('@hooks/useUsersInfiniteQuery', () => ({ default: vi.fn() }));

function queryState(overrides) {
  return {
    users: [],
    loading: false,
    loadingMore: false,
    hasMore: false,
    error: false,
    fetchNextPage: vi.fn(),
    retry: vi.fn(),
    ...overrides,
  };
}

function makeUsers(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    username: `user${i + 1}`,
    name: `사용자${i + 1}`,
    bio: '소개',
    userType: 'MEMBER',
    profileImage: {
      url: `https://imgur.com/abcdef${i}.png`,
      altText: `아바타${i + 1}`,
    },
    careers: [],
  }));
}

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <UserListPage />
          </MemoryRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

beforeEach(() => {
  useUsersInfiniteQuery.mockReset();
});

describe('UserListPage', () => {
  it('데이터 로딩 중에는 전체 화면 로고 대신 스켈레톤 카드 10개를 그린다', () => {
    useUsersInfiniteQuery.mockReturnValue(queryState({ loading: true }));

    renderPage();
    const list = screen.getByRole('status');

    expect(list).toHaveAccessibleName('사용자 목록을 불러오는 중');
    expect(list.querySelectorAll('div[aria-hidden="true"]')).toHaveLength(10);
  });

  it('추가 로딩 중에는 스피너 대신 스켈레톤 카드 3개를 덧붙인다', () => {
    useUsersInfiniteQuery.mockReturnValue(
      queryState({ users: makeUsers(1), loadingMore: true, hasMore: true })
    );

    renderPage();
    const list = screen.getByRole('status');

    expect(list).toHaveAccessibleName('사용자 목록을 더 불러오는 중');
    expect(list.querySelectorAll('div[aria-hidden="true"]')).toHaveLength(3);
    expect(screen.getByText('user1')).toBeInTheDocument();
  });

  it('로딩이 끝나면 목록에 status 역할을 남기지 않는다', () => {
    useUsersInfiniteQuery.mockReturnValue(queryState({ users: makeUsers(2) }));

    renderPage();

    expect(screen.queryByRole('status')).toBeNull();
  });

  it('첫 행 5장은 우선 로드하고 나머지는 lazy로 미룬다', () => {
    useUsersInfiniteQuery.mockReturnValue(queryState({ users: makeUsers(10) }));

    const { container } = renderPage();
    const images = container.querySelectorAll('img');

    expect(images).toHaveLength(10);
    expect(images[0]).toHaveAttribute('fetchpriority', 'high');
    expect(images[0]).not.toHaveAttribute('loading');
    expect(images[5]).toHaveAttribute('loading', 'lazy');
    expect(images[5]).not.toHaveAttribute('fetchpriority');
  });
});
