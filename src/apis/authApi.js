import client from '@apis/client';
import { ENDPOINTS } from '@apis/endpoints';

export async function login(username, password) {
  try {
    await client.post(ENDPOINTS.SESSIONS, { username, password });
  } catch (error) {
    const message = error.response?.data || 'Login failed';
    throw new Error(
      typeof message === 'string' ? message : JSON.stringify(message)
    );
  }
}

export async function logout() {
  await client.delete(ENDPOINTS.SESSIONS);
}

// 401/403만 "비로그인" 상태(null)로 취급하고, 네트워크 오류·5xx는 호출자가
// 일시 장애로 구분할 수 있도록 그대로 던진다.
export async function fetchMe() {
  try {
    const response = await client.get(ENDPOINTS.ME);
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    if (status === 401 || status === 403) return null;
    throw error;
  }
}
