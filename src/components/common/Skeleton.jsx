import React from 'react';
import styled, { keyframes } from 'styled-components';

const slide = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(100%); }
`;

// 바탕은 단색 회색으로 두고 움직이는 하이라이트만 별도 레이어에 올린다.
// GlobalStyle이 prefers-reduced-motion에서 모든 애니메이션을 죽이므로, 애니메이션이 멈춘
// 상태의 모습(= 단색 회색 박스)이 그대로 성립해야 한다. 흔한 구현인 background-position
// 애니메이션은 매 프레임 페인트를 유발하는 데 반해 translateX는 합성만으로 끝난다.
const Box = styled.span`
  display: block;
  position: relative;
  overflow: hidden;
  background: #eeeeee;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  border-radius: ${({ $radius }) => $radius};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.65) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: ${slide} 1.4s ease-in-out infinite;
  }
`;

export default function Skeleton({
  width = '100%',
  height = '100%',
  radius = '4px',
  ...rest
}) {
  return (
    <Box
      $width={width}
      $height={height}
      $radius={radius}
      aria-hidden="true"
      {...rest}
    />
  );
}
