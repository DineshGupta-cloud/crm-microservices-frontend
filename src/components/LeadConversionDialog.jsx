import { useEffect, useState } from 'react';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';

export default function LeadConversionDialog({ open, lead, onClose, onConvert }) {
  const [form, setForm] = useState({ name:'', email:'', phone:'', companyName:'', address:'' });
  const [saving, setSaving] = useState(false); const [error, setError] = useState('');
  useEffect(() => { if (lead) setForm({ name:lead.name||'', email:lead.email||'', phone:lead.phone||'', companyName:lead.companyName||'', address:lead.address||'' }); setError(''); }, [lead, open]);
  const set=(k,v)=>setForm(x=>({...x,[k]:v}));
  const submit=async e=>{e.preventDefault();setSaving(true);setError('');try{await onConvert(form)}catch(x){setError(x.response?.data?.message||x.message||'Lead conversion failed')}finally{setSaving(false)}};
  return <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm"><DialogTitle>Convert Lead to Customer</DialogTitle><form onSubmit={submit}><DialogContent>{error&&<Alert severity="error" sx={{mb:2}}>{error}</Alert>}<Grid container spacing={2}><Grid item xs={12}><TextField fullWidth required label="Customer Name" value={form.name} onChange={e=>set('name',e.target.value)}/></Grid><Grid item xs={12} md={6}><TextField fullWidth label="Email" type="email" value={form.email} onChange={e=>set('email',e.target.value)}/></Grid><Grid item xs={12} md={6}><TextField fullWidth label="Phone" value={form.phone} onChange={e=>set('phone',e.target.value)}/></Grid><Grid item xs={12}><TextField fullWidth label="Company" value={form.companyName} onChange={e=>set('companyName',e.target.value)}/></Grid><Grid item xs={12}><TextField fullWidth label="Address" value={form.address} onChange={e=>set('address',e.target.value)}/></Grid></Grid></DialogContent><DialogActions><Button onClick={onClose}>Cancel</Button><Button type="submit" variant="contained" disabled={saving}>{saving?'Converting...':'Convert'}</Button></DialogActions></form></Dialog>;
}
