import client from '@apis/client';
import { ENDPOINTS } from '@apis/endpoints';

function normalizeSkills(skills) {
  if (!Array.isArray(skills)) return [];
  return skills
    .filter((skill) => skill?.tool?.name)
    .map((skill) => ({
      id: skill.id,
      level: skill.level ?? 0,
      tool: {
        name: skill.tool.name,
        logo: {
          url: skill.tool.logo?.url || '',
          altText: skill.tool.logo?.altText || skill.tool.name,
        },
      },
    }));
}

function normalizeCareers(careers) {
  if (!Array.isArray(careers)) return [];
  return careers
    .filter((career) => career && typeof career === 'object')
    .map((career) => ({
      ...career,
      company: career.company || { name: '', logo: null },
    }));
}

export function normalizeUserProfile(data) {
  return {
    id: data.id || '',
    username: data.username || '',
    name: data.name || '',
    bio: data.bio || '',
    profileImage: data.profileImage || { url: '', altText: '' },
    skills: normalizeSkills(data.skills),
    careers: normalizeCareers(data.careers),
    projects: Array.isArray(data.projectSummaries) ? data.projectSummaries : [],
    posts: Array.isArray(data.postSummaries)
      ? data.postSummaries.filter((post) => !post.hidden)
      : [],
    userType: data.userType || '',
  };
}

export function normalizeCursorResponse(data) {
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

export async function fetchUserById(id) {
  const response = await client.get(ENDPOINTS.USERS.BY_ID(id));
  return response.data;
}

export async function fetchUserByUsername(username) {
  const response = await client.get(ENDPOINTS.USERS.BY_USERNAME(username));
  return normalizeUserProfile(response.data);
}

export async function fetchUsersCursor({ pageSize = 10, lastId = null } = {}) {
  const params = { pageSize };
  if (lastId != null) params.lastId = lastId;
  const response = await client.get(ENDPOINTS.USERS.CURSOR, { params });
  return normalizeCursorResponse(response.data);
}
