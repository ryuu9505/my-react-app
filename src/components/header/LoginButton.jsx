import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

const LoginLink = styled(RouterLink)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: transparent;
  transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  text-decoration: none;

  &:hover,
  &:focus-visible {
    background-color: rgba(0, 0, 0, 0.06);
  }
`;

export default function LoginButton() {
  return (
    <LoginLink to="/login" aria-label="로그인">
      <FiLogIn size={18} color="#333333" strokeWidth={2} />
    </LoginLink>
  );
}
