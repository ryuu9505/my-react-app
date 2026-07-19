import { ProfileCard } from '@components/cards';
import Footer from '@components/common/Footer';
import Loading from '@components/common/Loading';
import { Section } from '@components/common/Section';
import Spinner from '@components/common/Spinner';
import BasicHeader from '@components/header/BasicHeader';
import useIntersection from '@hooks/useIntersection';
import useUsersInfiniteQuery from '@hooks/useUsersInfiniteQuery';
import { transformCompanyLogos } from '@utils/transformCompanyLogos';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

const CenteredCardList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  min-height: 80vh;
  padding-top: 20px;
  max-width: 1024px;
  gap: 24px;
  margin: 0 auto;
`;

const StatusBlock = styled.div`
  text-align: center;
  font-size: 1.2rem;
  font-weight: 300;
  padding: 80px 0 40px;
`;

const RetryButton = styled.button`
  display: block;
  margin: 16px auto 0;
  padding: 8px 24px;
  font-size: 0.9rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.backgroundLight};
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;

export default function UserListPage() {
  const { users, loading, loadingMore, hasMore, error, fetchNextPage, retry } =
    useUsersInfiniteQuery();

  const sentinelRef = useIntersection(
    fetchNextPage,
    hasMore && !loadingMore && !error
  );

  if (loading) return <Loading />;

  return (
    <>
      <BasicHeader />
      <Helmet>
        <title>Users | Unblind</title>
        <meta
          name="description"
          content="언블라인드의 사용자 목록을 확인해보세요."
        />
      </Helmet>
      <Section id="users" padding="100px 20px 100px 20px">
        <CenteredCardList>
          {users.map((user) => (
            <ProfileCard
              key={user.id ?? user.username}
              profileImage={user.profileImage}
              name={user.name}
              username={user.username || user.id}
              bio={user.bio || ''}
              companyLogos={transformCompanyLogos(user.careers)}
              userType={user.userType}
            />
          ))}
        </CenteredCardList>
        {loadingMore && <Spinner style={{ marginTop: 80, height: 10 }} />}
        {error && (
          <StatusBlock role="alert">
            사용자 목록을 불러오지 못했습니다.
            <RetryButton onClick={() => retry()}>다시 시도</RetryButton>
          </StatusBlock>
        )}
        {!error && users.length === 0 && (
          <StatusBlock>아직 등록된 사용자가 없습니다.</StatusBlock>
        )}
        {!error && !hasMore && users.length > 0 && (
          <StatusBlock>All users loaded</StatusBlock>
        )}
        <div ref={sentinelRef} aria-hidden="true" />
      </Section>
      <Footer />
    </>
  );
}
