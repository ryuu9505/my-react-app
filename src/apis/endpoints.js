export const ENDPOINTS = {
  SESSIONS: '/sessions',
  ME: '/me',
  USERS: {
    BY_ID: (id) => `/users/${id}`,
    BY_USERNAME: (username) => `/users/by-username/${username}`,
    CURSOR: '/users/cursor',
  },
  CAREERS: {
    BY_USER_ID: (userId) => `/careers?userId=${userId}`,
  },
  POSTS: {
    BY_ID: (postId) => `/posts/${postId}`,
  },
};
