// imgur는 파일명 뒤에 한 글자를 붙이면 축소본을 준다. t는 160x160, l은 640x640이고
// 응답은 image/jpeg로 온다. 경로의 확장자는 원본 그대로 둬도 브라우저가 Content-Type을
// 따르므로 바꾸지 않는다. 버전 표기가 없는 관례이므로 실패 시 원본으로 폴백해야 한다.
const VARIANT_SMALL = 't';
const VARIANT_LARGE = 'l';
const SMALL_MAX_DISPLAY_SIZE = 80;

// /{id}.{확장자} 형태만 이미지 주소다. 앨범(/a/...)과 갤러리(/gallery/...)는 페이지 주소라
// 호스트를 바꾸거나 suffix를 붙이면 오히려 깨진다.
const IMGUR_IMAGE_PATH = /^\/([A-Za-z0-9]+)(\.[A-Za-z0-9]+)$/;

function parseImgurImageUrl(url, hostname) {
  if (typeof url !== 'string' || url === '') return null;

  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  if (parsed.hostname !== hostname) return null;

  const match = IMGUR_IMAGE_PATH.exec(parsed.pathname);
  if (!match) return null;

  return { parsed, id: match[1], extension: match[2] };
}

export function toDirectImageUrl(url) {
  const target = parseImgurImageUrl(url, 'imgur.com');
  if (!target) return url;

  target.parsed.hostname = 'i.imgur.com';
  return target.parsed.toString();
}

export function toAvatarUrl(url, displaySize) {
  const direct = toDirectImageUrl(url);
  const target = parseImgurImageUrl(direct, 'i.imgur.com');
  if (!target) return direct;

  const isSmall =
    !Number.isFinite(displaySize) || displaySize <= SMALL_MAX_DISPLAY_SIZE;
  const variant = isSmall ? VARIANT_SMALL : VARIANT_LARGE;

  target.parsed.pathname = `/${target.id}${variant}${target.extension}`;
  return target.parsed.toString();
}
