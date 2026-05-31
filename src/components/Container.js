import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth || '700px'};
  max-height: ${({ $maxHeight }) => $maxHeight || 'none'};
  margin: 0 auto;
  padding: 24px 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: left;
`;

export default function Container({ children, maxWidth, maxHeight, style }) {
  return (
    <StyledContainer $maxWidth={maxWidth} $maxHeight={maxHeight} style={style}>
      {children}
    </StyledContainer>
  );
}
