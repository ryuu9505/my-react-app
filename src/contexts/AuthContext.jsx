import { fetchMe, login, logout } from '@apis/authApi';
import { fetchUserById } from '@apis/userApi';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // 초기 세션 복원과 로그인/로그아웃이 겹칠 수 있으므로, 시퀀스 토큰으로
  // 항상 마지막 요청의 결과만 상태에 반영한다.
  const loadSeqRef = useRef(0);

  const loadCurrentUser = useCallback(async () => {
    const seq = ++loadSeqRef.current;
    let nextUser = null;
    try {
      const me = await fetchMe();
      if (me?.id) {
        nextUser = await fetchUserById(me.id);
      }
    } catch (error) {
      if (seq === loadSeqRef.current) {
        console.error('사용자 정보 로드 실패:', error);
      }
      return;
    }
    if (seq === loadSeqRef.current) {
      setUser(nextUser);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await loadCurrentUser();
      } finally {
        setLoading(false);
      }
    })();
  }, [loadCurrentUser]);

  const handleLogin = async (username, password) => {
    await login(username, password);
    // 세션 생성은 이미 성공했으므로, 이후 프로필 로드 실패를
    // 로그인 실패로 되돌려 보고하지 않는다.
    await loadCurrentUser();
  };

  const handleLogout = async () => {
    loadSeqRef.current += 1;
    try {
      await logout();
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    } finally {
      setUser(null);
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
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.');
  }
  return context;
}
