import React from 'react';
import styled from 'styled-components';

const StyledPostTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin: 0 0 20px 0;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.primary};
`;

export function PostTitle({ children, ...props }) {
  return <StyledPostTitle {...props}>{children}</StyledPostTitle>;
}
