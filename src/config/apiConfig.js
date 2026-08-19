export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const API_PATHS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    refresh: '/api/auth/refresh',
  },
  companies: '/api/v1/companies',
  branches: '/api/v1/branches',
  departments: '/api/v1/departments',
  designations: '/api/v1/designations',
  employees: '/api/v1/employees',
  leads: '/api/v1/leads',
  customers: '/api/v1/customers',
  vendors: '/api/v1/vendors',
  products: '/api/v1/products',
  tasks: '/api/v1/tasks',
  notifications: '/api/v1/notifications',
  audits: '/api/v1/audits',
};
