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

export default function HistoryCardItem({
  company,
  team,
  position: _position,
  startDate,
  endDate,
  periodNote,
  description,
  masked,
}) {
  const textMaskStyle = masked
    ? {
        background: '#000',
        color: '#000',
        overflow: 'hidden',
        fontSize: '1.5rem',
      }
    : {};

  return (
    <HistoryCard
      style={{
        position: 'relative',
        overflow: 'visible',
        border: '1px solid #e0e0e0',
        boxSizing: 'border-box',
      }}
    >
      <SquareImage
        src={masked ? blackSquare : company.logo?.url}
        alt={company.name}
      />
      <ContentWrapper>
        <TitleWrapper>
          <HistoryTitle style={textMaskStyle}>{company.name}</HistoryTitle>
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
