import { fetchUsersCursor } from '@apis/userApi';
import { PAGINATION } from '@styles/constants';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

// 커서가 전진하지 못하면(마지막 아이템에 id가 없거나, 서버가 커서를 무시하고
// 같은 페이지를 반환) 같은 페이지를 무한 재요청하게 되므로 undefined로 중단한다.
export function getNextCursor(page, prevCursor) {
  const { content, last } = page;
  const nextCursor =
    content.length > 0 ? content[content.length - 1]?.id : null;
  if (last || nextCursor == null || nextCursor === prevCursor) {
    return undefined;
  }
  return nextCursor;
}

// 서버가 중복 페이지를 반환한 경우에도 같은 유저가 두 번 표시되지 않도록 걸러낸다.
export function dedupeUsers(pages) {
  const seen = new Set();
  return pages
    .flatMap((page) => page.content)
    .filter((user) => {
      const key = user.id ?? user.username;
      if (key == null || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

export default function useUsersInfiniteQuery() {
  const query = useInfiniteQuery({
    queryKey: ['users', 'cursor'],
    queryFn: ({ pageParam }) =>
      fetchUsersCursor({
        pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
        lastId: pageParam,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      getNextCursor(lastPage, lastPageParam),
  });

  const users = useMemo(
    () => (query.data ? dedupeUsers(query.data.pages) : []),
    [query.data]
  );

  // 실패한 지점에 맞는 동작으로 재시도한다. 전체 refetch가 실패했을 때
  // fetchNextPage를 부르면 아무 요청 없이 성공 처리되어 복구가 안 된다.
  const retry = query.isFetchNextPageError
    ? query.fetchNextPage
    : query.refetch;

  return {
    users,
    loading: query.isPending,
    loadingMore: query.isFetchingNextPage,
    hasMore: Boolean(query.hasNextPage),
    error: query.isError,
    fetchNextPage: query.fetchNextPage,
    retry,
  };
}
