import { fetchPosts } from '@apis/postApi';
import { useEffect, useState } from 'react';

function byCreatedAtDesc(a, b) {
  return (b.createdAt || '').localeCompare(a.createdAt || '');
}

export default function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const data = await fetchPosts();
        if (!ignore) setPosts([...data].sort(byCreatedAtDesc));
      } catch (err) {
        if (ignore) return;
        console.error('포스트 목록 로드 실패:', err);
        setError(true);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  return { posts, loading, error };
}
