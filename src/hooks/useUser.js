import { fetchUserByUsername } from '@apis/userApi';
import { useEffect, useState } from 'react';

export const EMPTY_USER = {
  id: '',
  username: '',
  name: '',
  bio: '',
  profileImage: { url: '', altText: '' },
  skills: [],
  careers: [],
  projects: [],
  posts: [],
  userType: '',
};

const initialState = (username) => ({
  key: username,
  user: EMPTY_USER,
  loading: true,
  error: false,
});

export default function useUser(username) {
  const [state, setState] = useState(() => initialState(username));

  // username이 바뀐 렌더에서는 이전 유저의 데이터가 잠깐이라도 보이지 않도록
  // 렌더 중에 즉시 초기 상태로 보정한다.
  if (state.key !== username) {
    setState(initialState(username));
  }

  useEffect(() => {
    if (!username) return undefined;

    let ignore = false;

    (async () => {
      try {
        const user = await fetchUserByUsername(username);
        if (!ignore) {
          setState({ key: username, user, loading: false, error: false });
        }
      } catch (error) {
        if (ignore) return;
        console.error(`사용자 정보 로드 실패 (${username}):`, error);
        setState({
          key: username,
          user: EMPTY_USER,
          loading: false,
          error: true,
        });
      }
    })();

    return () => {
      ignore = true;
    };
  }, [username]);

  return { user: state.user, loading: state.loading, error: state.error };
}
