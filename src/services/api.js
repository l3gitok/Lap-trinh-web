import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (emailOrUsername, password) => api.post('/auth/login', { emailOrUsername, password });
export const register = (username, email, password) => api.post('/auth/register', { username, email, password });
export const getProfile = () => api.get('/users/profile');
export const getProfileByUserId = (userId) => api.get(`/profile/user/${userId}`);
export const updateProfile = (data) => api.put('/users/profile', data);
export const getUserLinks = () => api.get('/links');
export const createLink = (data) => api.post('/links', data);
export const updateLink = (id, data) => api.put(`/links/${id}`, data);
export const deleteLink = (id) => api.delete(`/links/${id}`);
export const resetPassword = (email) => api.post('/auth/reset-password', { email });
export const updatePassword = (token, password) => api.post('/auth/update-password', { token, password });
export const verifyEmail = (token) => api.post('/auth/verify-email', { token });
export const getUserAnalytics = () => api.get('/analytics/user');
export const getLinkAnalytics = () => api.get('/analytics/link');
export const getProfileByUserIdController = (userId) => api.get(`/profile/user/${userId}`);
export const getUserById = (id) => api.get(`/users/user/${id}`);
export const deleteUser = () => api.delete('/users/account');
export const refreshToken = (token) => api.post('/auth/refresh-token', { token });
export const trackLinkClick = (id) => api.get(`/links/${id}/click`);

export default api;