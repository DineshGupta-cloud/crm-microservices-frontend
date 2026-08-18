import { create } from 'zustand';

const saved = localStorage.getItem('crm_auth');
const initial = saved ? JSON.parse(saved) : { accessToken: null, refreshToken: null, user: null };

export const useAuthStore = create((set) => ({
  ...initial,
  setAuth: (data) => { localStorage.setItem('crm_auth', JSON.stringify(data)); set(data); },
  logout: () => { localStorage.removeItem('crm_auth'); set({ accessToken: null, refreshToken: null, user: null }); }
}));
