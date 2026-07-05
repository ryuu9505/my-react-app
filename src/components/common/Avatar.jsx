import { RoundedImage } from '@styles/ImageStyles';
import React from 'react';
import { FiUser } from 'react-icons/fi';
import styled from 'styled-components';

const DefaultAvatar = styled.span`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8a8a8a;
  background: #f5f5f5;
  box-sizing: border-box;
`;

// 프로필 이미지가 없을 때 깨진 이미지 대신 기본 아이콘을 보여준다.
export default function Avatar({ src, alt = '', size = 30, style }) {
  if (src) {
    return <RoundedImage src={src} alt={alt} $size={size} style={style} />;
  }
  return (
    <DefaultAvatar
      $size={size}
      style={style}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    >
      <FiUser size={Math.round(size * 0.53)} />
    </DefaultAvatar>
  );
}
