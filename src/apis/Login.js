import api from '@apis/Api';
import { ENDPOINTS } from '@apis/endpoints';

export async function login(username, password) {
  try {
    await api.post(ENDPOINTS.SESSIONS, { username, password });
  } catch (error) {
    const message = error.response?.data || 'Login failed';
    throw new Error(
      typeof message === 'string' ? message : JSON.stringify(message)
    );
  }
}

export async function logout() {
  await api.delete(ENDPOINTS.SESSIONS);
}

export async function fetchMe() {
  try {
    const response = await api.get(ENDPOINTS.ME);
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function fetchUserById(id) {
  const response = await api.get(ENDPOINTS.USERS.BY_ID(id));
  return response.data;
}
