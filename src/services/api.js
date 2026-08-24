import axios from 'axios';
import { useAuthStore } from '../store/authStore';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
});

let refreshPromise = null;

const refreshAccessToken = async () => {
  const { refreshToken } = useAuthStore.getState();
  if (!refreshToken) return null;
  if (!refreshPromise) {
    refreshPromise = axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/auth/refresh`, { refreshToken })
      .then(({ data }) => {
        const payload = data?.data ?? data;
        const accessToken = payload?.accessToken ?? payload?.token;
        if (!accessToken) throw new Error('Refresh response did not contain an access token');
        const current = useAuthStore.getState();
        useAuthStore.getState().setAuth({ ...current, ...payload, accessToken, refreshToken: payload?.refreshToken ?? current.refreshToken });
        return accessToken;
      })
      .finally(() => { refreshPromise = null; });
  }
  return refreshPromise;
};

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const original = error.config;
    const status = error.response?.status;
    if (status === 401 && original && !original._retry && !original.url?.includes('/api/auth/refresh')) {
      original._retry = true;
      try {
        const token = await refreshAccessToken();
        if (token) {
          original.headers = original.headers || {};
          original.headers.Authorization = `Bearer ${token}`;
          return api(original);
        }
      } catch (_) {
        useAuthStore.getState().logout();
        if (window.location.pathname !== '/login') window.location.assign('/login');
      }
    }
    if (status === 403 && window.location.pathname !== '/forbidden') window.location.assign('/forbidden');
    return Promise.reject(error);
  }
);

export const crudApi = resource => ({
  list: () => api.get(`/api/v1/${resource}`),
  get: id => api.get(`/api/v1/${resource}/${id}`),
  create: data => api.post(`/api/v1/${resource}`, data),
  update: (id, data) => api.put(`/api/v1/${resource}/${id}`, data),
  remove: id => api.delete(`/api/v1/${resource}/${id}`)
});
