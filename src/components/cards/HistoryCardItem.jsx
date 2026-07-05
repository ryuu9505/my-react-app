import { blackSquare } from '@assets/images';
import {
  ContentWrapper,
  HistoryCard,
  HistoryDescription,
  HistoryPeriod,
  HistoryTitle,
  Position,
  TitleWrapper,
} from '@styles/compositions/Card.styles';
import { SquareImage } from '@styles/ImageStyles';
import formatYearMonth, {
  getPeriodLength,
  withParentheses,
} from '@utils/format';
import React from 'react';
import styled from 'styled-components';

const MaskedTitle = styled(HistoryTitle)`
  background: #000;
  color: #000;
  overflow: hidden;
  border-radius: 2px;
  user-select: none;
`;

export default function HistoryCardItem({
  company,
  team,
  startDate,
  endDate,
  periodNote,
  description,
  masked,
}) {
  const companyName = company?.name || '';

  return (
    <HistoryCard>
      <SquareImage
        src={masked ? blackSquare : company?.logo?.url}
        alt={masked ? '' : companyName}
      />
      <ContentWrapper>
        <TitleWrapper>
          {masked ? (
            // 회사명을 DOM에 노출하지 않고 자리표시자만 렌더링한다.
            <MaskedTitle aria-label="비공개 회사">████</MaskedTitle>
          ) : (
            <HistoryTitle>{companyName}</HistoryTitle>
          )}
          <Position>{team}</Position>
        </TitleWrapper>
        <HistoryDescription>{description}</HistoryDescription>
        <HistoryPeriod>
          {formatYearMonth(startDate)} -{' '}
          {endDate ? formatYearMonth(endDate) : '재직 중'}{' '}
          {withParentheses(
            periodNote ? periodNote : getPeriodLength(startDate, endDate)
          )}
        </HistoryPeriod>
      </ContentWrapper>
    </HistoryCard>
  );
}
