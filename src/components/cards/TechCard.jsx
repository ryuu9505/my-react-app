import { StarRatingAnimation } from '@styles/AnimationStyles';
import React, { useState } from 'react';
import styled from 'styled-components';

const StyledTechCard = styled.div`
  position: relative;
  overflow: visible;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-sizing: border-box;
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
    width: 48px;
    height: 48px;
    object-fit: contain;
  }

  .tech-name {
    font-size: 1rem;
    font-weight: 100;
    margin-top: 8px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100px;
    min-height: 100px;
    padding: 12px;
    .tech-icon {
      width: 32px;
      height: 32px;
    }
    .tech-name {
      font-size: 0.7rem;
    }
  }
`;

const StarPosition = {
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
};

export default function TechCard({ url, name, level }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <StyledTechCard
      tabIndex={0}
      aria-label={`${name}, 숙련도 ${level}/5`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
    >
      <img className="tech-icon" src={url} alt="" />
      <span className="tech-name">{name}</span>
      <StarRatingAnimation
        show={isActive}
        count={level}
        size="0.6rem"
        color="#FFD700"
        animationDirection="y"
        style={StarPosition}
      />
    </StyledTechCard>
  );
}
