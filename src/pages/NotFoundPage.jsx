import Footer from '@components/common/Footer';
import BasicHeader from '@components/header/BasicHeader';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrap = styled.main`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 20px;
`;

const Code = styled.div`
  font-size: 6rem;
  font-weight: 800;
  line-height: 1;
  color: ${({ theme }) => theme.colors.border};
`;

const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 500;
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.primary};
`;

const Message = styled.p`
  font-weight: 300;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.secondary};
`;

const HomeLink = styled(Link)`
  display: inline-block;
  margin-top: 32px;
  padding: 10px 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.primary};
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export default function NotFoundPage({
  title = '페이지를 찾을 수 없습니다',
  message = '주소가 잘못되었거나 삭제된 페이지입니다.',
}) {
  return (
    <>
      <Helmet>
        <title>페이지를 찾을 수 없습니다 | Unblind</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <BasicHeader />
      <Wrap>
        <Code aria-hidden="true">404</Code>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <HomeLink to="/users">사용자 목록으로 돌아가기</HomeLink>
      </Wrap>
      <Footer />
    </>
  );
}
