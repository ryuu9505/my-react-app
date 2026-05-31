import api from '@apis/Api';
import { ENDPOINTS } from '@apis/endpoints';

function normalizeUserProfile(data) {
  return {
    id: data.id || '',
    name: data.name || '',
    bio: data.bio || '',
    profileImage: data.profileImage || { url: '', altText: '' },
    skills: Array.isArray(data.skills) ? data.skills : [],
    projects: Array.isArray(data.projectSummaries) ? data.projectSummaries : [],
    posts: Array.isArray(data.postSummaries) ? data.postSummaries : [],
    userType: data.userType || '',
  };
}

function normalizeCursorResponse(data) {
  const content = Array.isArray(data.content)
    ? data.content
    : Array.isArray(data)
      ? data
      : [];
  return {
    content,
    last: data.last ?? content.length === 0,
  };
}

export async function fetchUserByUsername(username) {
  const response = await api.get(ENDPOINTS.USERS.BY_USERNAME(username));
  return normalizeUserProfile(response.data);
}

export async function fetchUsersCursor({ pageSize = 10, lastId = null } = {}) {
  const params = { pageSize };
  if (lastId) params.lastId = lastId;
  const response = await api.get(ENDPOINTS.USERS.CURSOR, { params });
  return normalizeCursorResponse(response.data);
}

export async function fetchCareersByUserId(userId) {
  const response = await api.get(ENDPOINTS.CAREERS.BY_USER_ID(userId));
  return Array.isArray(response.data) ? response.data : [];
}
