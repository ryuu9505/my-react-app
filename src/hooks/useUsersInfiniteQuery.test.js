import { describe, expect, it } from 'vitest';

import { dedupeUsers, getNextCursor } from './useUsersInfiniteQuery';

describe('getNextCursor', () => {
  it('정상 페이지에는 마지막 아이템의 id를 반환한다', () => {
    expect(
      getNextCursor({ content: [{ id: 1 }, { id: 2 }], last: false }, null)
    ).toBe(2);
  });

  it('마지막 페이지(last: true)에는 undefined를 반환한다', () => {
    expect(getNextCursor({ content: [{ id: 3 }], last: true }, 2)).toBe(
      undefined
    );
  });

  it('마지막 아이템에 id가 없으면 무한 재요청을 막기 위해 중단한다', () => {
    expect(
      getNextCursor({ content: [{ name: 'no-id' }], last: false }, null)
    ).toBe(undefined);
  });

  it('빈 content에 last: false여도 중단한다', () => {
    expect(getNextCursor({ content: [], last: false }, 5)).toBe(undefined);
  });

  it('커서가 전진하지 않으면(서버가 커서 무시) 중단한다', () => {
    expect(getNextCursor({ content: [{ id: 7 }], last: false }, 7)).toBe(
      undefined
    );
  });

  it('id 0도 유효한 커서로 취급한다', () => {
    expect(getNextCursor({ content: [{ id: 0 }], last: false }, null)).toBe(0);
  });
});

describe('dedupeUsers', () => {
  it('페이지들을 평탄화한다', () => {
    const pages = [
      { content: [{ id: 1 }, { id: 2 }] },
      { content: [{ id: 3 }] },
    ];
    expect(dedupeUsers(pages).map((u) => u.id)).toEqual([1, 2, 3]);
  });

  it('중복 페이지가 와도 같은 유저를 한 번만 남긴다', () => {
    const pages = [{ content: [{ id: 1 }] }, { content: [{ id: 1 }] }];
    expect(dedupeUsers(pages)).toHaveLength(1);
  });

  it('id가 없으면 username을 키로 사용한다', () => {
    const pages = [
      { content: [{ username: 'a' }, { username: 'a' }, { username: 'b' }] },
    ];
    expect(dedupeUsers(pages)).toHaveLength(2);
  });
});
