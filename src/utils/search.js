import { isAllChoseong, toChoseong } from './hangul';

// 매칭 결과는 { score, ranges }다. ranges는 원문 기준 [시작, 끝) 인덱스 배열로,
// 하이라이트 렌더링에 그대로 사용한다. 매칭 실패 시 null.

// 일부 문자('İ' 등)는 toLowerCase 시 길이가 늘어나 인덱스가 원문과 어긋난다.
// 코드유닛 단위로 소문자화하되 길이가 변하는 문자는 원문을 유지해
// 반환되는 ranges가 항상 원문 인덱스와 일치하도록 보장한다.
function toComparable(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const lower = str[i].toLowerCase();
    result += lower.length === 1 ? lower : str[i];
  }
  return result;
}

function substringMatch(text, query) {
  const index = toComparable(text).indexOf(toComparable(query));
  if (index === -1) return null;
  const positionBonus = index === 0 ? 30 : Math.max(0, 15 - index);
  return {
    score: 100 + positionBonus,
    ranges: [[index, index + query.length]],
  };
}

// 초성 검색: "ㅎㄱㅈ"처럼 초성으로만 이루어진 질의를, 원문을 초성으로 치환한
// 문자열에서 찾는다. toChoseong이 길이를 보존하므로 인덱스가 원문과 일치한다.
function choseongMatch(text, query) {
  const index = toChoseong(text).indexOf(query);
  if (index === -1) return null;
  const positionBonus = index === 0 ? 20 : Math.max(0, 10 - index);
  return { score: 70 + positionBonus, ranges: [[index, index + query.length]] };
}

// 연속된 매칭 위치들을 하이라이트 범위로 병합한다.
function positionsToRanges(positions) {
  const ranges = [];
  for (const pos of positions) {
    const lastRange = ranges[ranges.length - 1];
    if (lastRange && pos === lastRange[1]) {
      lastRange[1] = pos + 1;
    } else {
      ranges.push([pos, pos + 1]);
    }
  }
  return ranges;
}

// 질의 문자가 순서대로 등장하면 매칭 (예: "rct" → "react").
// 흩어질수록 감점, 연속될수록 가점. 1글자 질의는 substring이 이미 처리하므로 제외.
function subsequenceMatch(text, query) {
  if (query.length < 2) return null;
  const lowerText = toComparable(text);
  const lowerQuery = toComparable(query);
  const positions = [];
  let from = 0;
  for (let i = 0; i < lowerQuery.length; i++) {
    const index = lowerText.indexOf(lowerQuery[i], from);
    if (index === -1) return null;
    positions.push(index);
    from = index + 1;
  }
  let contiguity = 0;
  for (let i = 1; i < positions.length; i++) {
    if (positions[i] === positions[i - 1] + 1) contiguity++;
  }
  const spread = positions[positions.length - 1] - positions[0] + 1;
  const score = 30 + contiguity * 5 - Math.min(25, spread - query.length);
  if (score <= 0) return null;
  return { score, ranges: positionsToRanges(positions) };
}

export function matchText(text, query) {
  if (!text || !query) return null;
  const direct = substringMatch(text, query);
  if (direct) return direct;
  if (isAllChoseong(query)) return choseongMatch(text, query);
  return subsequenceMatch(text, query);
}

// 엔트리 형식: { id, type, title, subtitle, keywords, image, action }
// title 매칭을 가장 높게, subtitle과 keywords는 가중치를 낮춰 평가한다.
export function searchEntries(entries, query, limit = 20) {
  const trimmed = (query || '').trim();
  if (!trimmed) return [];

  const results = [];
  for (const entry of entries) {
    const titleMatch = matchText(entry.title, trimmed);
    const subtitleMatch = matchText(entry.subtitle || '', trimmed);

    let keywordScore = 0;
    for (const keyword of entry.keywords || []) {
      const match = matchText(keyword, trimmed);
      if (match) keywordScore = Math.max(keywordScore, match.score * 0.6);
    }

    const score = Math.max(
      titleMatch ? titleMatch.score : 0,
      subtitleMatch ? subtitleMatch.score * 0.8 : 0,
      keywordScore
    );
    if (score <= 0) continue;

    results.push({
      entry,
      score,
      titleRanges: titleMatch?.ranges ?? [],
      subtitleRanges: subtitleMatch?.ranges ?? [],
    });
  }

  results.sort(
    (a, b) =>
      b.score - a.score ||
      (a.entry.title || '').localeCompare(b.entry.title || '', 'ko')
  );
  return results.slice(0, limit);
}
