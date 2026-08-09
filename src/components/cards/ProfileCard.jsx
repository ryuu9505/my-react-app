import { robot, verified } from '@assets/images';
import Avatar from '@components/common/Avatar';
import Divider from '@components/common/Divider';
import FadeInImage from '@components/common/FadeInImage';
import Skeleton from '@components/common/Skeleton';
import useHoverPrefetch, { usePrefetchUser } from '@hooks/usePrefetch';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

// 규격만 담은 표면. 스켈레톤 카드가 같은 것을 써야 데이터가 도착할 때 레이아웃이 흔들리지 않는다.
const CardSurface = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  padding: 24px 0;
  width: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  box-sizing: border-box;
`;

const StyledProfileCard = styled(CardSurface)`
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-8px);
  }
`;

const BadgeIcon = styled.img`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  z-index: 2;
  padding: 2px;
`;

const Username = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  margin-top: 4px;
  text-align: center;
`;

const Name = styled.div`
  font-weight: 300;
  font-size: 0.9rem;
  text-align: center;
`;

const Bio = styled.div`
  font-weight: 300;
  font-size: 0.7rem;
  text-align: center;
  color: #595959;
  padding: 0 12px;
`;

const LOGO_WIDTH = 100;
const LOGO_HEIGHT = 30;

// 로고가 없는 사용자도 같은 높이를 차지해야 카드 높이가 한 종류로 유지되고
// 마지막 행이 어긋나지 않는다.
const CompanyLogoRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  min-height: ${LOGO_HEIGHT}px;
`;

function CompanyLogoList({ logos, priority }) {
  const logo = logos?.[0];

  return (
    <CompanyLogoRow data-logo-row="true">
      {logo ? (
        <FadeInImage
          src={logo.url}
          alt={logo.altText || 'company logo'}
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          fit="contain"
          showSkeleton={false}
          loading={priority ? undefined : 'lazy'}
        />
      ) : null}
    </CompanyLogoRow>
  );
}

export default function ProfileCard({
  profileImage,
  name,
  username,
  bio,
  companyLogos,
  userType,
  priority = false,
}) {
  const prefetchHandlers = useHoverPrefetch(usePrefetchUser(username));

  return (
    <CardLink to={`/${username}`} {...prefetchHandlers}>
      <StyledProfileCard>
        {userType === 'TEST' && <BadgeIcon src={robot} alt="봇 사용자" />}
        {userType === 'ADMIN' && (
          <BadgeIcon src={verified} alt="관리자 사용자" />
        )}
        <Avatar
          src={profileImage?.url}
          alt={profileImage?.altText || username || 'profile'}
          size={64}
          loading={priority ? undefined : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
        />
        <Username>{username}</Username>
        <Name>{name}</Name>
        <Bio>{bio}</Bio>
        <Divider margin="16px" />
        <CompanyLogoList logos={companyLogos} priority={priority} />
      </StyledProfileCard>
    </CardLink>
  );
}

const SkeletonLines = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
`;

// 데이터가 아직 없는 단계에서는 카드 전체가 가짜이므로 로고 자리까지 shimmer로 그린다.
// 데이터가 도착한 뒤에는 카드가 진짜이고 이미지만 비어 있어 아바타 자리만 shimmer로 남는다.
export function ProfileCardSkeleton() {
  return (
    <CardSurface aria-hidden="true">
      <Skeleton width="64px" height="64px" radius="50%" />
      <SkeletonLines>
        <Skeleton width="72px" height="12px" />
        <Skeleton width="56px" height="12px" />
        <Skeleton width="96px" height="10px" />
      </SkeletonLines>
      <Divider margin="16px" />
      <Skeleton width={`${LOGO_WIDTH}px`} height={`${LOGO_HEIGHT}px`} />
    </CardSurface>
  );
}
