import { AuthProvider } from '@components/AuthProvider';
import ErrorBoundary from '@components/ErrorBoundary';
import LoginPage from '@pages/LoginPage';
import PostPage from '@pages/PostPage';
import UserListPage from '@pages/UserListPage';
import UserPage from '@pages/UserPage';
import GlobalStyle from '@styles/GlobalStyle';
import theme from '@styles/theme/theme';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Navigate to="/users" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/users" element={<UserListPage />} />
                <Route path="/posts/:postId" element={<PostPage />} />
                <Route path="/:username" element={<UserPage />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
