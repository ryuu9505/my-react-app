// JSON.stringify는 '<'를 이스케이프하지 않으므로, 사용자 데이터에 '</script>'가
// 들어 있으면 인라인 스크립트 블록이 조기 종료될 수 있다. '<'를 유니코드로 치환한다.
export function serializeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
