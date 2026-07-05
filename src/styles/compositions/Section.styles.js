import styled from 'styled-components';

export const Section = styled.section`
  width: 100%;
  padding: ${({ $padding }) => $padding || '200px 20px 200px 20px'};
  background-color: ${({ $background, theme }) =>
    $background || theme.colors.backgroundLight};
  color: ${({ $color, theme }) => $color || theme.colors.textLight};
  text-align: center;
  overflow: hidden;
  // 고정 헤더에 가려지지 않도록 앵커 스크롤 위치를 보정한다.
  scroll-margin-top: 64px;
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: ${({ $color, theme }) => $color || theme.colors.textLight};
  margin-bottom: 50px;
  text-align: center;
  opacity: 0.8;
`;

export const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    text-align: center;
  }
`;

export const TextContent = styled.div`
  margin-top: 10px;

  p {
    margin-top: 40px;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.2;
    color: inherit;
  }

  small {
    margin-top: 40px;
    font-size: 1.2rem;
    font-weight: 200;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;
