import styled from 'styled-components';

export const RoundedImage = styled.img`
  width: ${({ $size }) => ($size ? `${$size}px` : '200px')};
  height: ${({ $size }) => ($size ? `${$size}px` : '200px')};
  border-radius: 50%;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  box-sizing: border-box;
  object-fit: cover;
  display: block;
`;

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
