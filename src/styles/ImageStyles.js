import styled from 'styled-components';

export const SquareImage = styled.img`
  width: 88px;
  height: 88px;
  object-fit: contain;
  margin-right: 30px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 50px;
    height: 50px;
    margin-right: 15px;
  }
`;
