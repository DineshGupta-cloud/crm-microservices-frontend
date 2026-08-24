import { useEffect, useState } from 'react';
import { employeeApi } from '../services/crmApi';

const unwrap = (data) => Array.isArray(data) ? data : data?.data ?? data?.content ?? [];
export default function useEmployees() {
  const [options,setOptions]=useState([]),[loading,setLoading]=useState(false);
  useEffect(()=>{let active=true;setLoading(true);employeeApi.list().then(r=>{if(active)setOptions(unwrap(r.data));}).catch(()=>{if(active)setOptions([]);}).finally(()=>{if(active)setLoading(false);});return()=>{active=false};},[]);
  return {options,loading};
}
