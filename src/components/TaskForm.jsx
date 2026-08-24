import { useEffect, useState } from 'react';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, TextField } from '@mui/material';
import { useEmployees } from '../hooks/useLookups';
import LookupSelect from './LookupSelect';

const statuses=['OPEN','IN_PROGRESS','COMPLETED','CANCELLED'];
const priorities=['LOW','MEDIUM','HIGH','URGENT'];
export default function TaskForm({open,initialValues={},onClose,onSubmit}){
 const [form,setForm]=useState(initialValues); const [saving,setSaving]=useState(false); const [error,setError]=useState('');
 const employees=useEmployees();
 useEffect(()=>{setForm(initialValues||{});setError('')},[initialValues,open]);
 const set=(k,v)=>setForm(x=>({...x,[k]:v}));
 const submit=async e=>{e.preventDefault();setSaving(true);setError('');try{await onSubmit(form)}catch(x){setError(x.response?.data?.message||x.message||'Unable to save task')}finally{setSaving(false)}};
 return <Dialog open={open} onClose={onClose} fullWidth maxWidth="md"><DialogTitle>{initialValues?.id?'Edit Task':'Add Task'}</DialogTitle><form onSubmit={submit}><DialogContent>{error&&<Alert severity="error" sx={{mb:2}}>{error}</Alert>}<Grid container spacing={2}>
 <Grid item xs={12}><TextField fullWidth required label="Title" value={form.title||''} onChange={e=>set('title',e.target.value)}/></Grid>
 <Grid item xs={12}><TextField fullWidth multiline minRows={3} label="Description" value={form.description||''} onChange={e=>set('description',e.target.value)}/></Grid>
 <Grid item xs={12} md={6}><TextField select fullWidth label="Status" value={form.status||'OPEN'} onChange={e=>set('status',e.target.value)}>{statuses.map(x=><MenuItem key={x} value={x}>{x}</MenuItem>)}</TextField></Grid>
 <Grid item xs={12} md={6}><TextField select fullWidth label="Priority" value={form.priority||'MEDIUM'} onChange={e=>set('priority',e.target.value)}>{priorities.map(x=><MenuItem key={x} value={x}>{x}</MenuItem>)}</TextField></Grid>
 <Grid item xs={12} md={6}><LookupSelect label="Assigned Employee" value={form.assignedTo} options={employees.options} loading={employees.loading} onChange={v=>set('assignedTo',v)}/></Grid>
 <Grid item xs={12} md={6}><TextField fullWidth type="date" label="Due Date" InputLabelProps={{shrink:true}} value={form.dueDate||''} onChange={e=>set('dueDate',e.target.value)}/></Grid>
 </Grid></DialogContent><DialogActions><Button onClick={onClose}>Cancel</Button><Button type="submit" variant="contained" disabled={saving}>{saving?'Saving...':'Save Task'}</Button></DialogActions></form></Dialog>;
}
