import api from './api';

const unwrap = (response) => {
  const value = response?.data;
  if (Array.isArray(value)) return value;
  return value?.data ?? value?.content ?? [];
};

export const lookupApi = {
  async companies() {
    return unwrap(await api.get('/api/v1/companies'));
  },
  async branches(companyId) {
    const response = companyId
      ? await api.get(`/api/v1/branches/company/${companyId}`)
      : await api.get('/api/v1/branches');
    return unwrap(response);
  },
  async departments(branchId) {
    const response = branchId
      ? await api.get(`/api/v1/departments/branch/${branchId}`)
      : await api.get('/api/v1/departments');
    return unwrap(response);
  },
  async designations() {
    return unwrap(await api.get('/api/v1/designations'));
  },
};
