import { useCallback, useEffect, useState } from 'react';
import { Alert, Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { Add, Delete, Edit, Refresh } from '@mui/icons-material';
import { employeeApi } from '../services/crmApi';
import EmployeeForm from '../components/EmployeeForm';

const columns=[{field:'employeeCode',header:'Code'},{field:'firstName',header:'First Name'},{field:'lastName',header:'Last Name'},{field:'email',header:'Email'},{field:'phone',header:'Phone'}];
const unwrap=(data)=>Array.isArray(data)?data:data?.data??data?.content??[];

export default function Employee(){
 const [rows,setRows]=useState([]),[loading,setLoading]=useState(false),[error,setError]=useState(''),[open,setOpen]=useState(false),[editing,setEditing]=useState(null),[page,setPage]=useState(0),[size,setSize]=useState(10);
 const load=useCallback(async()=>{setLoading(true);setError('');try{const r=await employeeApi.list();setRows(unwrap(r.data));}catch(e){setError(e.response?.data?.message||e.message||'Unable to load employees');}finally{setLoading(false);}},[]);
 useEffect(()=>{load();},[load]);
 const save=async(form)=>{if(editing)await employeeApi.update(editing.id,form);else await employeeApi.create(form);setOpen(false);setEditing(null);await load();};
 const remove=async(row)=>{if(!window.confirm(`Delete employee ${row.firstName||''} ${row.lastName||''}?`))return;try{await employeeApi.remove(row.id);await load();}catch(e){setError(e.response?.data?.message||e.message||'Unable to delete employee');}};
 const visible=rows.slice(page*size,page*size+size);
 return <Box><Box display="flex" alignItems="center" mb={2}><Box flex={1}><Typography variant="h4" fontWeight={700}>Employees</Typography><Typography color="text.secondary">Manage employees and organizational assignments</Typography></Box><IconButton onClick={load} disabled={loading}><Refresh/></IconButton><Button variant="contained" startIcon={<Add/>} onClick={()=>{setEditing(null);setOpen(true)}}>Add Employee</Button></Box>{error&&<Alert severity="error" sx={{mb:2}}>{error}</Alert>}<Paper><Table><TableHead><TableRow>{columns.map(c=><TableCell key={c.field}>{c.header}</TableCell>)}<TableCell align="right">Actions</TableCell></TableRow></TableHead><TableBody>{visible.map(row=><TableRow hover key={row.id}>{columns.map(c=><TableCell key={c.field}>{row[c.field]??''}</TableCell>)}<TableCell align="right"><IconButton onClick={()=>{setEditing(row);setOpen(true)}}><Edit/></IconButton><IconButton color="error" onClick={()=>remove(row)}><Delete/></IconButton></TableCell></TableRow>)}{!visible.length&&<TableRow><TableCell colSpan={columns.length+1} align="center">{loading?'Loading...':'No employees found'}</TableCell></TableRow>}</TableBody></Table><TablePagination component="div" count={rows.length} page={page} rowsPerPage={size} onPageChange={(_,p)=>setPage(p)} onRowsPerPageChange={e=>{setSize(Number(e.target.value));setPage(0)}}/></Paper><EmployeeForm open={open} initialValues={editing||{}} onClose={()=>{setOpen(false);setEditing(null)}} onSubmit={save}/></Box>;
}
