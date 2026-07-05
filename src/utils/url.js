// 서버에서 내려온 URL(externalUrl 등)을 href로 쓰기 전에 반드시 통과시킨다.
// javascript: 같은 위험 스킴을 차단해 저장형 XSS를 방지한다.
export function toSafeHttpUrl(url) {
  if (typeof url !== 'string' || url.trim() === '') return null;
  try {
    const parsed = new URL(url, window.location.origin);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
      ? parsed.href
      : null;
  } catch {
    return null;
  }
}
