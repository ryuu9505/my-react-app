import { useSearch } from '@components/search/SearchProvider';
import { isMacLike } from '@utils/platform';
import React from 'react';
import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 28px;
  min-width: 28px;
  padding: 4px 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.6);
  color: ${({ theme }) => theme.colors.secondary};
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover,
  &:focus-visible {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const Kbd = styled.kbd`
  font-family: inherit;
  font-size: 0.65rem;
  letter-spacing: 0.5px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

export default function SearchButton() {
  const { open } = useSearch();

  return (
    <Button type="button" onClick={open} aria-label="검색 열기">
      <FiSearch size={13} aria-hidden="true" />
      <Kbd aria-hidden="true">{isMacLike ? '⌘K' : 'Ctrl K'}</Kbd>
    </Button>
  );
}
