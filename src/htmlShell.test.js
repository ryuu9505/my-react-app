/**
 * 파일 시스템만 읽으므로 DOM이 필요 없다. node 환경이라야 import.meta.url이
 * file: URL로 유지되어 readFileSync에 그대로 넘길 수 있다.
 *
 * @vitest-environment node
 */
import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

// index.html은 모든 경로에 그대로 서빙되는 정적 셸이다. 크롤러는 자바스크립트를
// 실행하지 않아 여기 있는 값을 그대로 읽으므로, 경로별로 달라져야 하는 값이
// 섞여 들어가면 프로덕션에서만 드러나는 문제가 된다. 개발 중에는 보이지 않는다.
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf-8');

describe('index.html 정적 셸', () => {
  it('og:url을 포함하지 않는다', () => {
    // 플랫폼이 og:url을 공유 객체의 정본 주소로 쓰기 때문에, 고정값이 있으면
    // 모든 프로필과 포스트 공유가 그 주소 하나로 합쳐지고 카드의 링크도 그리로 간다.
    expect(html).not.toMatch(/property=["']og:url["']/);
  });

  it('사이트 기본 메타는 유지한다', () => {
    // 페이지가 값을 채우지 못했을 때의 폴백이라 없으면 카드가 아예 비어 보인다.
    expect(html).toMatch(/property=["']og:site_name["']/);
    expect(html).toMatch(/property=["']og:title["']/);
    expect(html).toMatch(/property=["']og:image["']/);
  });
});
