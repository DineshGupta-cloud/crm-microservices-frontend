import { useEffect, useState } from 'react';
import { lookupApi } from '../services/lookupApi';

function useLookup(loader, dependency = true) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    if (!dependency) { setOptions([]); return undefined; }
    setLoading(true); setError('');
    Promise.resolve(loader()).then((data) => { if (active) setOptions(data); }).catch((e) => { if (active) setError(e.response?.data?.message || e.message || 'Lookup failed'); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [loader, dependency]);
  return { options, loading, error };
}

export const useCompanies = () => useLookup(lookupApi.companies);
export const useBranches = (companyId) => useLookup(() => lookupApi.branches(companyId), Boolean(companyId));
export const useDepartments = (branchId) => useLookup(() => lookupApi.departments(branchId), Boolean(branchId));
export const useDesignations = () => useLookup(lookupApi.designations);
