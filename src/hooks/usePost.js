import { fetchPostById } from '@apis/postApi';
import { useEffect, useState } from 'react';

const initialState = (postId) => ({
  key: postId,
  post: null,
  loading: true,
  error: false,
});

export default function usePost(postId) {
  const [state, setState] = useState(() => initialState(postId));

  // postId가 바뀐 렌더에서는 이전 포스트가 잠깐이라도 보이지 않도록
  // 렌더 중에 즉시 초기 상태로 보정한다.
  if (state.key !== postId) {
    setState(initialState(postId));
  }

  useEffect(() => {
    if (!postId) return undefined;

    let ignore = false;

    (async () => {
      try {
        const post = await fetchPostById(postId);
        if (!ignore) {
          setState({ key: postId, post, loading: false, error: false });
        }
      } catch (err) {
        if (ignore) return;
        console.error(`포스트 로드 실패 (postId: ${postId}):`, err);
        setState({ key: postId, post: null, loading: false, error: true });
      }
    })();

    return () => {
      ignore = true;
    };
  }, [postId]);

  return { post: state.post, loading: state.loading, error: state.error };
}
