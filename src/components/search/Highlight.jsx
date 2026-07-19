import React from 'react';
import styled from 'styled-components';

const Mark = styled.mark`
  background: none;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 600;
`;

// ranges: 원문 기준 [시작, 끝) 인덱스 배열 (utils/search.js의 matchText 결과)
export default function Highlight({ text, ranges }) {
  if (!text) return null;
  if (!ranges || ranges.length === 0) return text;

  const parts = [];
  let cursor = 0;
  for (const [start, end] of ranges) {
    if (start > cursor) parts.push(text.slice(cursor, start));
    parts.push(<Mark key={start}>{text.slice(start, end)}</Mark>);
    cursor = end;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));

  return <>{parts}</>;
}
