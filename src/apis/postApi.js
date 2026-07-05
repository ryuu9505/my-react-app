import client from '@apis/client';
import { ENDPOINTS } from '@apis/endpoints';

export async function fetchPostById(postId) {
  const response = await client.get(ENDPOINTS.POSTS.BY_ID(postId));
  const post = response.data;
  // 백엔드가 존재하지 않는 id에 404 대신 200 + 빈 본문을 반환하므로
  // 페이로드 자체를 검증해 "없음"을 판정한다. hidden 포스트도 목록에서만
  // 숨기면 URL 직접 접근으로 우회되므로 여기서 함께 차단한다.
  if (!post || typeof post !== 'object' || post.id == null || post.hidden) {
    const error = new Error(`Post not found: ${postId}`);
    error.code = 'POST_NOT_FOUND';
    throw error;
  }
  return post;
}

export async function fetchPosts() {
  const response = await client.get(ENDPOINTS.POSTS.LIST);
  const posts = Array.isArray(response.data) ? response.data : [];
  return posts.filter((post) => !post.hidden);
}
