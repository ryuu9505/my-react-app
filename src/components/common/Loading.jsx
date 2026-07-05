import Logo from '@components/common/Logo';
import React from 'react';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ $height }) => $height || '100vh'};
  margin-top: ${({ $marginTop }) => $marginTop || '0px'};
`;

const Loading = ({ height, marginTop }) => (
  <LoadingContainer
    $height={height}
    $marginTop={marginTop}
    role="status"
    aria-label="로딩 중"
  >
    <Logo variant="black" size={120} />
  </LoadingContainer>
);

export default Loading;
