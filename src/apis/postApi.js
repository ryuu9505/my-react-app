import api from '@apis/Api';
import { ENDPOINTS } from '@apis/endpoints';

export async function fetchPostById(postId) {
  const response = await api.get(ENDPOINTS.POSTS.BY_ID(postId));
  return response.data;
}
