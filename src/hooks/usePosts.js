import { fetchPosts } from '@apis/postApi';
import { useQuery } from '@tanstack/react-query';

function byCreatedAtDesc(a, b) {
  return (b.createdAt || '').localeCompare(a.createdAt || '');
}

export function sortPostsByCreatedAtDesc(posts) {
  return [...posts].sort(byCreatedAtDesc);
}

export default function usePosts() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    select: sortPostsByCreatedAtDesc,
  });

  return {
    posts: data ?? [],
    loading: isPending,
    error: isError,
  };
}
