import { useCallback, useEffect, useState } from 'react';
import { dashboardApi } from '../services/dashboardApi';

const empty = { companies: [], employees: [], leads: [], customers: [], tasks: [] };

export default function useDashboardData() {
  const [data, setData] = useState(empty);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const load = useCallback(async () => {
    setLoading(true);
    const entries = Object.entries(dashboardApi);
    const results = await Promise.allSettled(entries.map(([, loader]) => loader()));
    const next = { ...empty };
    const nextErrors = {};

    results.forEach((result, index) => {
      const key = entries[index][0];
      if (result.status === 'fulfilled') {
        next[key] = result.value;
      } else {
        nextErrors[key] = result.reason?.response?.data?.message || result.reason?.message || 'Service unavailable';
      }
    });

    setData(next);
    setErrors(nextErrors);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  return { data, loading, errors, refresh: load };
}
