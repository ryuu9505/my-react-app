import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  20% {
    transform: scale(1.10);
  }
  100% {
    transform: scale(1);
  }
`;

export const PulseAnimation = styled.div`
  animation: ${pulse} 2s infinite;
`;

// 기본 애니메이션 변형
const defaultVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const ScrollAnimation = ({
  children,
  variants = defaultVariants,
  delay = 0,
  margin = '0px',
  once = true,
  className = '',
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        margin,
        amount: 'some', // 요소가 하나라도 보일 때 애니메이션 시작
      }}
      variants={{
        ...variants,
        visible: {
          ...variants.visible,
          transition: {
            ...variants.visible.transition,
            delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- StarRatingAnimation ---
const StarContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Star = styled(motion.span)`
  color: ${({ $color }) => $color || '#FFD700'};
  font-size: ${({ $size }) => $size || '1.3rem'};
  margin: 0 4px;
  text-shadow: 0 0 8px #ffd70088;
`;

const getStarVariants = (direction) => {
  if (direction === 'x') {
    return {
      hidden: { opacity: 0, x: -20, scale: 0.8 },
      visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      },
      exit: { opacity: 0, x: 20, scale: 0.8, transition: { duration: 0.18 } },
    };
  }
  // 기본은 y축
  return {
    hidden: { opacity: 0, y: -20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
    exit: { opacity: 0, y: 20, scale: 0.8, transition: { duration: 0.18 } },
  };
};

export function StarRatingAnimation({
  show,
  count = 5,
  size = '1.3rem',
  color = '#FFD700',
  animationDirection = 'y',
  style = {},
}) {
  const starVariants = getStarVariants(animationDirection);
  const starContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: { staggerDirection: -1, staggerChildren: 0.08 },
    },
  };

  return (
    <AnimatePresence>
      {show && (
        <StarContainer
          variants={starContainerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={style}
        >
          {Array.from({ length: count }).map((_, i) => (
            <Star key={i} variants={starVariants} $size={size} $color={color}>
              <FaStar />
            </Star>
          ))}
        </StarContainer>
      )}
    </AnimatePresence>
  );
}

// --- MiniCardAnimation ---
const MiniCardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`;

const MiniCard = styled(motion.div)`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  padding: 8px 16px;
  min-width: 90px;
  min-height: 38px;
  font-size: 0.8rem;
  margin: 0;
  gap: 8px;
`;

const getMiniCardVariants = () => ({
  hidden: { opacity: 0, x: -24, scale: 0.92 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 22 },
  },
  exit: { opacity: 0, x: 24, scale: 0.92, transition: { duration: 0.18 } },
});

export function MiniCardAnimation({
  show,
  count = 3,
  cardData = [], // [{icon: <FaTrophy />, text: '...'}]
  style = {},
}) {
  const miniCardVariants = getMiniCardVariants();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: { staggerDirection: -1, staggerChildren: 0.09 },
    },
  };

  return (
    <AnimatePresence>
      {show && (
        <MiniCardContainer
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={style}
        >
          {Array.from({ length: count }).map((_, i) => (
            <MiniCard key={i} variants={miniCardVariants}>
              {cardData[i]?.icon}
              <span>{cardData[i]?.text}</span>
            </MiniCard>
          ))}
        </MiniCardContainer>
      )}
    </AnimatePresence>
  );
}

// --- Film Animation Custom Hook ---
/**
 * Film(무한 슬라이드) 애니메이션을 위한 커스텀 훅
 * @param {number} imageCount - 이미지 개수
 * @param {number} imageWidth - 각 이미지의 너비(px)
 * @param {number} gap - 이미지 간격(px)
 * @param {number} normalSpeed - 기본 속도(px/sec)
 * @param {number} slowSpeed - 느려진 속도(px/sec)
 * @param {boolean} slow - 느려진 상태 여부
 * @returns {object} { offset, FILM_WIDTH }
 */
export function useFilmAnimation(
  imageCount,
  imageWidth = 400,
  gap = 20,
  normalSpeed = 60,
  slowSpeed = 30,
  slow = false
) {
  const FILM_WIDTH = (imageWidth + gap) * imageCount;
  const [offset, setOffset] = useState(0);
  const reqRef = useRef();
  const lastTimeRef = useRef();

  useEffect(() => {
    const animate = (now) => {
      if (!lastTimeRef.current) lastTimeRef.current = now;
      const delta = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;
      const speed = slow ? slowSpeed : normalSpeed;
      setOffset((prev) => {
        let next = prev + speed * delta;
        return (next %= FILM_WIDTH);
      });
      reqRef.current = requestAnimationFrame(animate);
    };
    reqRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(reqRef.current);
  }, [slow, FILM_WIDTH, normalSpeed, slowSpeed]);

  return { offset, FILM_WIDTH };
}
