import { fetchPostById } from '@apis/postApi';
import { useEffect, useState } from 'react';

export default function usePost(postId) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!postId) return;

    let ignore = false;
    setLoading(true);
    setError(false);

    (async () => {
      try {
        const data = await fetchPostById(postId);
        if (!ignore) setPost(data);
      } catch (err) {
        if (ignore) return;
        console.error(`포스트 로드 실패 (postId: ${postId}):`, err);
        setError(true);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [postId]);

  return { post, loading, error };
}
