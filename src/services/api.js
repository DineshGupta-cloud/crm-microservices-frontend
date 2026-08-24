import axios from 'axios';
import { useAuthStore } from '../store/authStore';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    if (status === 401) {
      useAuthStore.getState().logout();
      if (window.location.pathname !== '/login') {
        window.location.assign('/login');
      }
    }
    if (status === 403 && window.location.pathname !== '/forbidden') {
      window.location.assign('/forbidden');
    }
    return Promise.reject(error);
  }
);

export const crudApi = (resource) => ({
  list: () => api.get(`/api/v1/${resource}`),
  get: (id) => api.get(`/api/v1/${resource}/${id}`),
  create: (data) => api.post(`/api/v1/${resource}`, data),
  update: (id, data) => api.put(`/api/v1/${resource}/${id}`, data),
  remove: (id) => api.delete(`/api/v1/${resource}/${id}`)
});
