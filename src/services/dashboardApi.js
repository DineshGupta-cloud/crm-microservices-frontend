import api from './api';

const unwrap = (response) => {
  const data = response?.data;
  return Array.isArray(data) ? data : data?.data ?? data?.content ?? data ?? {};
};

export const dashboardApi = {
  companies: async () => unwrap(await api.get('/api/v1/companies')),
  employees: async () => unwrap(await api.get('/api/v1/employees')),
  leads: async () => unwrap(await api.get('/api/v1/leads')),
  customers: async () => unwrap(await api.get('/api/v1/customers')),
  tasks: async () => unwrap(await api.get('/api/v1/tasks')),
};
