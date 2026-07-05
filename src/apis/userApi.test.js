import { describe, expect, it } from 'vitest';

import { normalizeCursorResponse, normalizeUserProfile } from './userApi';

describe('normalizeUserProfile', () => {
  it('필드가 모두 없는 응답에도 안전한 기본값을 채운다', () => {
    const user = normalizeUserProfile({});
    expect(user).toEqual({
      id: '',
      username: '',
      name: '',
      bio: '',
      profileImage: { url: '', altText: '' },
      skills: [],
      careers: [],
      projects: [],
      posts: [],
      userType: '',
    });
  });

  it('careers를 응답에서 그대로 가져온다 (별도 API 호출 불필요)', () => {
    const user = normalizeUserProfile({
      careers: [{ id: 1, company: { name: 'A' } }],
    });
    expect(user.careers).toHaveLength(1);
    expect(user.careers[0].company.name).toBe('A');
  });

  it('company가 없는 career에 빈 company를 채워 렌더 크래시를 방지한다', () => {
    const user = normalizeUserProfile({ careers: [{ id: 1 }] });
    expect(user.careers[0].company).toEqual({ name: '', logo: null });
  });

  it('tool이나 tool.name이 없는 skill을 걸러낸다', () => {
    const user = normalizeUserProfile({
      skills: [
        { id: 1, level: 3, tool: { name: 'React', logo: { url: 'r.png' } } },
        { id: 2, level: 2, tool: null },
        { id: 3, level: 1 },
      ],
    });
    expect(user.skills).toHaveLength(1);
    expect(user.skills[0].tool.name).toBe('React');
  });

  it('logo가 없는 tool에는 빈 url을 채운다', () => {
    const user = normalizeUserProfile({
      skills: [{ id: 1, level: 3, tool: { name: 'React' } }],
    });
    expect(user.skills[0].tool.logo).toEqual({ url: '', altText: 'React' });
  });

  it('projectSummaries/postSummaries를 projects/posts로 매핑한다', () => {
    const user = normalizeUserProfile({
      projectSummaries: [{ id: 1 }],
      postSummaries: [{ id: 2 }],
    });
    expect(user.projects).toEqual([{ id: 1 }]);
    expect(user.posts).toEqual([{ id: 2 }]);
  });
});

describe('normalizeCursorResponse', () => {
  it('Slice 형태 응답에서 content와 last를 추출한다', () => {
    const result = normalizeCursorResponse({
      content: [{ id: 1 }],
      last: false,
    });
    expect(result).toEqual({ content: [{ id: 1 }], last: false });
  });

  it('배열 응답도 처리한다', () => {
    const result = normalizeCursorResponse([{ id: 1 }]);
    expect(result.content).toEqual([{ id: 1 }]);
  });

  it('last가 없으면 빈 content 여부로 판정한다', () => {
    expect(normalizeCursorResponse({ content: [] }).last).toBe(true);
    expect(normalizeCursorResponse({ content: [{ id: 1 }] }).last).toBe(false);
  });

  it('서버가 명시한 last: false는 빈 content여도 존중한다', () => {
    expect(normalizeCursorResponse({ content: [], last: false }).last).toBe(
      false
    );
  });
});
