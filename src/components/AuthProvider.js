import { fetchMe, fetchUserById, login, logout } from '@apis/Login';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadCurrentUser = async () => {
    const me = await fetchMe();
    if (me && me.id) {
      const userDetail = await fetchUserById(me.id);
      setUser(userDetail);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await loadCurrentUser();
      } catch (error) {
        console.error('사용자 세션 복원 실패:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleLogin = async (username, password) => {
    try {
      await login(username, password);
      await loadCurrentUser();
    } catch (error) {
      setUser(null);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      setUser(null);
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login: handleLogin, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
