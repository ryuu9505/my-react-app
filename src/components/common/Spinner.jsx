import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SpinnerCircle = styled.div`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border: 4px solid #eee;
  border-top: 4px solid #333;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const Spinner = ({ size = 40, style }) => (
  <SpinnerWrapper style={style} role="status" aria-label="로딩 중">
    <SpinnerCircle $size={size} />
  </SpinnerWrapper>
);

export default Spinner;
