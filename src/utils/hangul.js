const CHOSEONG_LIST = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
];

const HANGUL_SYLLABLE_START = 0xac00; // '가'
const HANGUL_SYLLABLE_END = 0xd7a3; // '힣'
// 한글 음절 = 초성 19 × 중성 21 × 종성 28 조합. 초성 하나당 21×28=588개 음절.
const SYLLABLES_PER_CHOSEONG = 21 * 28;

// 완성형 한글 음절의 초성을 반환한다. 한글 음절이 아니면 null.
export function getChoseong(char) {
  const code = char.charCodeAt(0);
  if (code < HANGUL_SYLLABLE_START || code > HANGUL_SYLLABLE_END) return null;
  const index = Math.floor(
    (code - HANGUL_SYLLABLE_START) / SYLLABLES_PER_CHOSEONG
  );
  return CHOSEONG_LIST[index];
}

// 각 문자를 초성으로 치환한 "같은 길이의" 문자열을 반환한다 (비한글은 그대로).
// 길이가 보존되므로 초성 문자열에서 찾은 인덱스를 원문 하이라이트에 그대로 쓸 수 있다.
export function toChoseong(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    result += getChoseong(str[i]) ?? str[i];
  }
  return result;
}

// 문자열이 초성 자모로만 구성되어 있는지 (예: "ㅎㄱㅈ") — 초성 검색 모드 판별용.
export function isAllChoseong(str) {
  if (!str) return false;
  for (let i = 0; i < str.length; i++) {
    if (!CHOSEONG_LIST.includes(str[i])) return false;
  }
  return true;
}
