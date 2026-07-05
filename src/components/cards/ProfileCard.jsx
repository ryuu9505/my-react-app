import { robot, verified } from '@assets/images';
import Avatar from '@components/common/Avatar';
import Divider from '@components/common/Divider';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const StyledProfileCard = styled.div`
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
  transition: transform 0.2s;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  box-sizing: border-box;

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

const CompanyLogoRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const CompanyLogoImg = styled.img`
  height: 30px;
  width: auto;
  object-fit: contain;
  max-width: 100px;
`;

function CompanyLogoList({ logos }) {
  if (!logos || logos.length === 0) return null;
  return (
    <CompanyLogoRow>
      {logos.slice(0, 1).map((logo, idx) => (
        <CompanyLogoImg
          key={logo?.url || idx}
          src={logo?.url}
          alt={logo?.altText || 'company logo'}
        />
      ))}
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
}) {
  return (
    <CardLink to={`/${username}`}>
      <StyledProfileCard>
        {userType === 'TEST' && <BadgeIcon src={robot} alt="봇 사용자" />}
        {userType === 'ADMIN' && (
          <BadgeIcon src={verified} alt="관리자 사용자" />
        )}
        <Avatar
          src={profileImage?.url}
          alt={profileImage?.altText || username || 'profile'}
          size={64}
        />
        <Username>{username}</Username>
        <Name>{name}</Name>
        <Bio>{bio}</Bio>
        <Divider margin="16px" />
        <CompanyLogoList logos={companyLogos} />
      </StyledProfileCard>
    </CardLink>
  );
}
