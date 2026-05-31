import { robot, verified } from '@assets/images';
import Divider from '@components/Divider';
import { RoundedImage } from '@styles/ImageStyles';
import React from 'react';
import styled from 'styled-components';

const StyledProfileCard = styled.div`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  padding: 24px 0 24px 0;
  width: 160px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  transition: transform 0.2s;
  border: 1.5px solid #e0e0e0;
  box-sizing: border-box;
  &:hover {
    transform: translateY(-8px);
  }
`;

const LogoImg = styled.img`
  height: 30px;
  width: auto;
  object-fit: contain;
  max-width: 100px;
  margin-right: 0;
`;

function CompanyLogoList({ logos }) {
  if (!logos || logos.length === 0) return null;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
      }}
    >
      {logos.slice(0, 1).map((logo, idx) => (
        <LogoImg
          key={logo?.url || idx}
          src={logo?.url}
          alt={logo?.altText || 'company logo'}
        />
      ))}
    </div>
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
    <a
      href={`/${username}`}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
        position: 'relative',
      }}
    >
      <StyledProfileCard style={{ position: 'relative' }}>
        {userType === 'TEST' && (
          <img
            src={robot}
            alt="robot"
            style={{
              position: 'absolute',
              top: 6,
              right: 12,
              width: 28,
              height: 28,
              zIndex: 2,
              padding: 2,
              opacity: 0.9,
            }}
          />
        )}
        {userType === 'ADMIN' && (
          <img
            src={verified}
            alt="verified"
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              width: 28,
              height: 28,
              zIndex: 2,
              padding: 2,
            }}
          />
        )}
        <RoundedImage
          src={profileImage?.url || ''}
          alt={profileImage?.altText || username || 'profile'}
          style={{
            width: 64,
            height: 64,
            marginBottom: 0,
            border: '1.5px solid #e0e0e0',
            boxSizing: 'border-box',
          }}
        />
        <div
          style={{
            fontWeight: 600,
            fontSize: '0.9rem',
            marginTop: 4,
            textAlign: 'center',
          }}
        >
          {username}
        </div>
        <div
          style={{
            fontWeight: 300,
            fontSize: '0.9rem',
            marginTop: 0,
            textAlign: 'center',
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontWeight: 300,
            fontSize: '0.7rem',
            marginTop: 0,
            textAlign: 'center',
            color: '#888',
          }}
        >
          {bio}
        </div>
        <Divider margin="16px" />
        <CompanyLogoList logos={companyLogos} />
      </StyledProfileCard>
    </a>
  );
}
