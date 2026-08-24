import { useCallback, useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import CrudTable from './CrudTable';
import EntityForm from './EntityForm';

export default function CrudPage({ title, api, columns, fields = columns, initialForm = {}, FormComponent = null }) {
  const [rows,setRows]=useState([]),[loading,setLoading]=useState(false),[error,setError]=useState(''),[open,setOpen]=useState(false),[editing,setEditing]=useState(null);
  const load=useCallback(async()=>{setLoading(true);setError('');try{const r=await api.list();const d=r.data;setRows(Array.isArray(d)?d:d?.data??d?.content??[])}catch(e){setError(e.response?.data?.message||e.message||'Unable to load records')}finally{setLoading(false)}},[api]);
  useEffect(()=>{load()},[load]);
  const save=async(form)=>{try{if(editing)await api.update(editing.id,form);else await api.create(form);setOpen(false);setEditing(null);await load()}catch(e){setError(e.response?.data?.message||e.message||'Unable to save record');throw e}};
  const remove=async row=>{try{await api.remove(row.id);await load()}catch(e){setError(e.response?.data?.message||e.message||'Unable to delete record')}};
  const Form=FormComponent;
  return <>{error&&<Alert severity="error" sx={{mb:2}} onClose={()=>setError('')}>{error}</Alert>}<CrudTable title={title} columns={columns} rows={rows} loading={loading} onRefresh={load} onCreate={()=>{setEditing(null);setOpen(true)}} onEdit={row=>{setEditing(row);setOpen(true)}} onDelete={remove}/>{Form?<Form open={open} initialValues={editing||{}} onClose={()=>{setOpen(false);setEditing(null)}} onSubmit={save}/>:<EntityForm open={open} title={editing?`Edit ${title}`:`Create ${title}`} fields={fields} initialValues={editing||{}} onClose={()=>setOpen(false)} onSubmit={save}/>}</>;
}
