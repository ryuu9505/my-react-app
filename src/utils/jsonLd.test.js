import { describe, expect, it } from 'vitest';

import { serializeJsonLd } from './jsonLd';

describe('serializeJsonLd', () => {
  it('일반 객체를 JSON 문자열로 직렬화한다', () => {
    expect(serializeJsonLd({ name: 'Unblind' })).toBe('{"name":"Unblind"}');
  });

  it('</script> 주입을 방지하기 위해 <를 이스케이프한다', () => {
    const result = serializeJsonLd({
      bio: '</script><img src=x onerror=alert(1)>',
    });
    expect(result).not.toContain('</script>');
    expect(result).toContain('\\u003c/script>');
  });
});
