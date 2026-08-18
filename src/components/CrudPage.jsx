import { useEffect, useState } from 'react';
import { Alert, Box, Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { crudApi } from '../services/api';

export default function CrudPage({title,resource,fields=['name']}){
 const [rows,setRows]=useState([]);const [form,setForm]=useState({});const [error,setError]=useState('');
 const load=()=>crudApi(resource).list().then(r=>setRows(Array.isArray(r.data)?r.data:r.data?.data||[])).catch(e=>setError(e.message));
 useEffect(()=>{load()},[resource]);
 const save=async()=>{try{await crudApi(resource).create(form);setForm({});load();}catch(e){setError(e.response?.data?.message||e.message)}};
 const remove=async(id)=>{if(!confirm('Delete this record?'))return;await crudApi(resource).remove(id);load();};
 return <><Typography variant="h4" gutterBottom>{title}</Typography>{error&&<Alert severity="error" sx={{mb:2}}>{error}</Alert>}<Paper sx={{p:2,mb:3}}><Box sx={{display:'flex',gap:2,flexWrap:'wrap'}}>{fields.map(f=><TextField key={f} label={f} value={form[f]||''} onChange={e=>setForm({...form,[f]:e.target.value})}/>) }<Button variant="contained" onClick={save}>Add</Button></Box></Paper><Paper><Table><TableHead><TableRow>{fields.map(f=><TableCell key={f}>{f}</TableCell>)}<TableCell>Actions</TableCell></TableRow></TableHead><TableBody>{rows.map(row=><TableRow key={row.id}>{fields.map(f=><TableCell key={f}>{String(row[f]??'')}</TableCell>)}<TableCell><Button color="error" onClick={()=>remove(row.id)}>Delete</Button></TableCell></TableRow>)}</TableBody></Table></Paper></>;
}
