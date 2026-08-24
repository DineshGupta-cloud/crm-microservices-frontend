import { useEffect, useState } from 'react';
import LookupSelect from './LookupSelect';
import { vendorApi } from '../services/crmApi';

export default function VendorSelect({ value, onChange }) {
  const [options,setOptions]=useState([]); const [loading,setLoading]=useState(false);
  useEffect(()=>{let active=true;setLoading(true);vendorApi.list().then(r=>{const d=r.data;const rows=Array.isArray(d)?d:d?.data??d?.content??[];if(active)setOptions(rows)}).finally(()=>active&&setLoading(false));return()=>{active=false}},[]);
  return <LookupSelect label="Vendor" value={value} options={options} loading={loading} onChange={onChange}/>;
}
