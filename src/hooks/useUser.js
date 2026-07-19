import { fetchUserByUsername } from '@apis/userApi';
import { useQuery } from '@tanstack/react-query';

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

export default function useUser(username) {
  const { data, isPending, isError } = useQuery({
    queryKey: ['user', username],
    queryFn: () => fetchUserByUsername(username),
    enabled: Boolean(username),
  });

  return {
    user: data ?? EMPTY_USER,
    loading: isPending,
    error: isError,
  };
}
