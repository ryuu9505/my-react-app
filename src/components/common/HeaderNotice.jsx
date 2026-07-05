import { LAYOUT } from '@styles/constants';
import React from 'react';
import styled, { css } from 'styled-components';

const colorStyles = {
  warning: css`
    background: #fffbe7;
    border-bottom: 1.5px solid #ffe082;
    color: #222;
  `,
  info: css`
    background: #e3f2fd;
    border-bottom: 1.5px solid #90caf9;
    color: #1565c0;
  `,
  error: css`
    background: #ffebee;
    border-bottom: 1.5px solid #ef9a9a;
    color: #c62828;
  `,
};

const NoticeBar = styled.div`
  position: fixed;
  top: ${LAYOUT.HEADER_HEIGHT}px;
  left: 0;
  width: 100%;
  z-index: 998;
  font-weight: 300;
  font-size: 1rem;
  height: ${LAYOUT.HEADER_HEIGHT}px;
  gap: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
  ${({ $type }) => colorStyles[$type] || colorStyles.warning}
`;

const NoticeIcon = styled.img`
  width: 22px;
  height: 22px;
`;

export default function HeaderNotice({ message, type = 'warning', icon }) {
  return (
    <NoticeBar $type={type} role="status">
      {icon && <NoticeIcon src={icon} alt="" />}
      <span>{message}</span>
    </NoticeBar>
  );
}
