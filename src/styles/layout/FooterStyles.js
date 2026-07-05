import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.backgroundDark};
  color: ${({ theme }) => theme.colors.textDark};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 0.8rem;
  padding: 3rem 0;
  text-align: center;
`;

export const FooterIconList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;

  a {
    font-size: 1.3rem;
  }
`;
