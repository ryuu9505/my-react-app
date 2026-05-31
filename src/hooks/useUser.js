import { fetchCareersByUserId, fetchUserByUsername } from '@apis/userApi';
import { useEffect, useState } from 'react';

const EMPTY_USER = {
  id: '',
  name: '',
  bio: '',
  profileImage: { url: '', altText: '' },
  skills: [],
  projects: [],
  posts: [],
  userType: '',
};

const ERROR_USER = {
  ...EMPTY_USER,
  name: '이름을 불러올 수 없음',
  bio: '정보를 불러올 수 없음',
};

export default function useUser(username) {
  const [userInfo, setUserInfo] = useState(EMPTY_USER);
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    let ignore = false;
    setLoading(true);

    (async () => {
      try {
        const data = await fetchUserByUsername(username);
        if (!ignore) setUserInfo(data);
      } catch (error) {
        if (ignore) return;
        console.error(`사용자 정보 로드 실패 (${username}):`, error);
        setUserInfo(ERROR_USER);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [username]);

  useEffect(() => {
    if (!userInfo.id) return;

    let ignore = false;

    (async () => {
      try {
        const data = await fetchCareersByUserId(userInfo.id);
        if (!ignore) setCareers(data);
      } catch (error) {
        if (ignore) return;
        console.error(`경력 정보 로드 실패 (userId: ${userInfo.id}):`, error);
        setCareers([]);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [userInfo.id]);

  return { userInfo, careers, loading };
}
