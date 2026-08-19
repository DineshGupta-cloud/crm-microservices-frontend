import api from './api';
import { API_PATHS } from '../config/apiConfig';

const createCrudApi = (path) => ({
  list: () => api.get(path),
  get: (id) => api.get(`${path}/${id}`),
  create: (data) => api.post(path, data),
  update: (id, data) => api.put(`${path}/${id}`, data),
  remove: (id) => api.delete(`${path}/${id}`),
});

export const companyApi = createCrudApi(API_PATHS.companies);
export const branchApi = createCrudApi(API_PATHS.branches);
export const departmentApi = createCrudApi(API_PATHS.departments);
export const designationApi = createCrudApi(API_PATHS.designations);
export const employeeApi = createCrudApi(API_PATHS.employees);
export const leadApi = createCrudApi(API_PATHS.leads);
export const customerApi = createCrudApi(API_PATHS.customers);
export const vendorApi = createCrudApi(API_PATHS.vendors);
export const productApi = createCrudApi(API_PATHS.products);
export const taskApi = createCrudApi(API_PATHS.tasks);

export const notificationApi = {
  list: () => api.get(API_PATHS.notifications),
  user: (userId) => api.get(`${API_PATHS.notifications}/user/${userId}`),
  markRead: (id) => api.patch(`${API_PATHS.notifications}/${id}/read`),
};

export const auditApi = {
  list: () => api.get(API_PATHS.audits),
  get: (entityName, entityId) => api.get(`${API_PATHS.audits}/${entityName}/${entityId}`),
  create: (data) => api.post(API_PATHS.audits, data),
};
