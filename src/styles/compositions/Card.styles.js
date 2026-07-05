import styled from 'styled-components';

export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: calc(${({ theme }) => theme.breakpoints.mobile} - 20px);
  }
`;

export const HistoryCard = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 30px;
  width: 100%;
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin-bottom: 20px;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateX(-30px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 20px;
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 88px;
  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 50px;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 3px;
  }
`;

export const HistoryTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  line-height: 0.9;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

export const Position = styled.h4`
  font-size: 1rem;
  font-weight: 200;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  transform: translateY(-1px);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.7rem;
  }
`;

export const HistoryDescription = styled.p`
  font-size: 1rem;
  font-weight: 200;
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1.6;
  margin-top: 0;
  margin-bottom: 6px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.7rem;
    line-height: 1.3;
    margin-top: 2px;
  }
`;

export const HistoryPeriod = styled.span`
  font-size: 0.8rem;
  font-weight: 200;
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1;
  display: block;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.6rem;
  }
`;
