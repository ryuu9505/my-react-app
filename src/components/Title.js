import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h2`
  font-size: ${({ $fontSize }) => $fontSize || '2rem'};
  font-weight: ${({ $fontWeight }) => $fontWeight || 700};
  margin: ${({ $margin }) => $margin || '0 0 16px 0'};
  color: ${({ $color }) => $color || '#222'};
`;

export function Title({
  children,
  fontSize,
  fontWeight,
  margin,
  color,
  as = 'h2',
  ...props
}) {
  return (
    <StyledTitle
      as={as}
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      $margin={margin}
      $color={color}
      {...props}
    >
      {children}
    </StyledTitle>
  );
}

const StyledPostTitle = styled(StyledTitle)`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 20px;
  line-height: 1.2;
  color: #222;
`;

export function PostTitle({ children, ...props }) {
  return (
    <StyledPostTitle as="h1" {...props}>
      {children}
    </StyledPostTitle>
  );
}
