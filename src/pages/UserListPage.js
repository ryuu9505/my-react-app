import { fetchUsersCursor } from '@apis/userApi';
import { ProfileCard } from '@components/cards';
import Footer from '@components/Footer';
import BasicHeader from '@components/header/BasicHeader';
import Loading from '@components/Loading';
import { Section } from '@components/Section';
import Spinner from '@components/Spinner';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import { transformCompanyLogos } from '@utils/transformCompanyLogos';
import React, { useCallback } from 'react';
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

export default function UserListPage() {
  const fetchPage = useCallback(
    (cursor) => fetchUsersCursor({ pageSize: 10, lastId: cursor }),
    []
  );

  const { items: users, loading, hasMore } = useInfiniteScroll(fetchPage);

  if (users.length === 0 && loading) return <Loading />;

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
              key={user.id || user._id || user.name}
              profileImage={user.profileImage}
              name={user.name}
              username={user.username || user.id || user._id}
              bio={user.bio || ''}
              companyLogos={transformCompanyLogos(user.careers)}
              userType={user.userType}
            />
          ))}
        </CenteredCardList>
        {loading && users.length > 0 && (
          <Spinner style={{ marginTop: 80, height: 10 }} />
        )}
        {!hasMore && (
          <div
            style={{
              textAlign: 'center',
              fontSize: '1.2rem',
              fontWeight: '300',
              padding: '80px 0px 40px 0px',
            }}
          >
            All users loaded
          </div>
        )}
      </Section>
      <Footer />
    </>
  );
}
