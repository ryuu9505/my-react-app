import { StarRatingAnimation } from '@styles/AnimationStyles';
import React, { useState } from 'react';
import styled from 'styled-components';

const StyledTechCard = styled.div`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 128px;
  min-height: 128px;
  text-align: center;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-12px);
  }

  .tech-icon {
    font-size: 3rem;
    margin-bottom: 0px;
  }

  .tech-name {
    font-size: 1rem;
    font-weight: 100;
    margin-top: 8px;
  }

  @media (max-width: 480px) {
    width: 100px;
    min-height: 100px;
    padding: 12px;
    .tech-icon {
      font-size: 2rem;
      margin-bottom: -4px;
    }
    .tech-name {
      font-size: 0.7rem;
    }
  }
`;

export default function TechCard({ url, name, level }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <StyledTechCard
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        overflow: 'visible',
        border: '1px solid #e0e0e0',
        boxSizing: 'border-box',
      }}
    >
      <img
        className="tech-icon"
        src={url}
        alt={name}
        style={{
          width: '48px',
          height: '48px',
          objectFit: 'contain',
          marginBottom: 0,
        }}
      />
      <span className="tech-name">{name}</span>
      <StarRatingAnimation
        show={isHovered}
        count={level}
        size="0.6rem"
        color="#FFD700"
        animationDirection="y"
        style={{
          position: 'absolute',
          left: '50%',
          top: '100%',
          transform: 'translateX(-50%)',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: 8,
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />
    </StyledTechCard>
  );
}
