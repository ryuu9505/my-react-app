import styled from 'styled-components';

export const ProjectList = styled.div`
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px;
  width: 100%;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  perspective: 1000px;

  @media (max-width: 800px) {
    max-width: 350px;
  }
  @media (max-width: 480px) {
    gap: 30px;
    margin-top: 30px;
    max-width: 95vw;
  }
`;

export const ProjectCard = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: 0;
  width: ${({ $width }) => $width || '350px'};
  will-change: transform;
  backface-visibility: hidden;

  @media (max-width: 480px) {
    width: ${({ $width }) => ($width ? `calc(${$width} * 0.8)` : '300px')};
  }
`;

export const ProjectImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
`;

export const PostImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
`;

export const ProjectContent = styled.div`
  padding: 0px;
  text-align: left;

  @media (max-width: 480px) {
    padding: 0px;
  }
`;

export const ProjectTitle = styled.h3`
  font-size: ${({ $fontSize }) => $fontSize || '1.6rem'};
  font-weight: ${({ $fontWeight }) => $fontWeight || '700'};
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 12px;

  @media (max-width: 480px) {
    font-size: ${({ $fontSize }) =>
      $fontSize ? `calc(${$fontSize} * 0.8)` : '1.3rem'};
    font-weight: ${({ $fontWeight }) =>
      $fontWeight ? `calc(${$fontWeight} * 0.8)` : '560'};
    margin-top: 15px;
  }
`;

export const ProjectDescription = styled.p`
  font-size: ${({ $fontSize }) => $fontSize || '1.0rem'};
  font-weight: ${({ $fontWeight }) => $fontWeight || '200'};
  color: ${({ theme }) => theme.colors.secondary};
  margin-top: 4px;

  @media (max-width: 480px) {
    font-size: ${({ $fontSize }) =>
      $fontSize ? `calc(${$fontSize} * 0.8)` : '0.95rem'};
    font-weight: ${({ $fontWeight }) =>
      $fontWeight ? `calc(${$fontWeight} * 0.8)` : '160'};
    margin: 2px 0;
  }
`;

export const Period = styled.span`
  font-size: ${({ $fontSize }) => $fontSize || '1.0rem'};
  font-weight: ${({ $fontWeight }) => $fontWeight || '200'};
  color: ${({ theme }) => theme.colors.secondary}99;
  display: block;
  margin-top: 6px;

  @media (max-width: 480px) {
    font-size: 0.6rem;
    line-height: 2.4;
  }
`;
