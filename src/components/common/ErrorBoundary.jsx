import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: ${({ theme }) => theme.colors.primary};
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
  margin: 12px 0 24px;
`;

const RetryButton = styled.button`
  padding: 10px 24px;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.backgroundLight};
  cursor: pointer;
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <h2>문제가 발생했습니다</h2>
          <ErrorMessage>페이지를 새로고침해 주세요.</ErrorMessage>
          <RetryButton onClick={() => window.location.reload()}>
            새로고침
          </RetryButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
