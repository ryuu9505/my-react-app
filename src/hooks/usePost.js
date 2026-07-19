import { fetchPostById } from '@apis/postApi';
import { useQuery } from '@tanstack/react-query';

export default function usePost(postId) {
  const { data, isPending, isError } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPostById(postId),
    enabled: Boolean(postId),
  });

  return {
    post: data ?? null,
    loading: isPending,
    error: isError,
  };
}
