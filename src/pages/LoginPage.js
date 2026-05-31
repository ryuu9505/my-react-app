import { useAuth } from '@components/AuthProvider';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const GoogleButton = styled.button`
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-appearance: none;
  background-color: white;
  background-image: none;
  border: 1px solid #747775;
  border-radius: 4px;
  box-sizing: border-box;
  color: #1f1f1f;
  cursor: pointer;
  font-family: 'Roboto', arial, sans-serif;
  font-size: 14px;
  height: 40px;
  letter-spacing: 0.25px;
  outline: none;
  overflow: hidden;
  padding: 0 12px;
  position: relative;
  text-align: center;
  transition:
    background-color 0.218s,
    border-color 0.218s,
    box-shadow 0.218s;
  vertical-align: middle;
  white-space: nowrap;
  width: 100%;
  max-width: 400px;
  min-width: min-content;
  margin-bottom: 16px;

  &:disabled {
    cursor: default;
    background-color: #ffffff61;
    border-color: #1f1f1f1f;
  }

  &:not(:disabled):active,
  &:not(:disabled):focus {
    .button-state {
      background-color: #303030;
      opacity: 0.12;
    }
  }

  &:not(:disabled):hover {
    box-shadow:
      0 1px 2px 0 rgba(60, 64, 67, 0.3),
      0 1px 3px 1px rgba(60, 64, 67, 0.15);

    .button-state {
      background-color: #303030;
      opacity: 0.08;
    }
  }
`;

const ButtonState = styled.div`
  transition: opacity 0.218s;
  bottom: 0;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

const ButtonContentWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 100%;
  justify-content: space-between;
  position: relative;
  width: 100%;
`;

const ButtonContents = styled.span`
  flex-grow: 1;
  font-family: 'Roboto', arial, sans-serif;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
`;

const ButtonIcon = styled.div`
  height: 20px;
  margin-right: 12px;
  min-width: 20px;
  width: 20px;
  display: block;

  svg {
    height: 100%;
    width: 100%;
  }
`;

function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = () => {
    const apiBaseUrl =
      process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
    window.location.href = `${apiBaseUrl}/oauth2/authorization/google`;
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 32 }}>
      <h2>Login</h2>

      <GoogleButton onClick={handleGoogleLogin}>
        <ButtonState className="button-state" />
        <ButtonContentWrapper>
          <ButtonIcon>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              style={{ display: 'block' }}
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              ></path>
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              ></path>
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              ></path>
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              ></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
          </ButtonIcon>
          <ButtonContents>Continue with Google</ButtonContents>
        </ButtonContentWrapper>
      </GoogleButton>

      <div style={{ textAlign: 'center', margin: '16px 0', color: '#999' }}>
        OR
      </div>

      <form onSubmit={onSubmit}>
        <div>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            autoComplete="username"
            style={{ width: '100%', marginBottom: 8 }}
          />
        </div>
        <div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            style={{ width: '100%', marginBottom: 8 }}
          />
        </div>
        <button type="submit" style={{ width: '100%' }}>
          Login
        </button>
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      </form>
    </div>
  );
}

export default LoginPage;
