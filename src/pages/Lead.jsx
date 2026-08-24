import { useCallback, useEffect, useState } from 'react';
import { Alert, Box, Button, Chip, IconButton, Paper, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { Add, Refresh, SwapHoriz } from '@mui/icons-material';
import { leadApi, customerApi } from '../services/crmApi';
import LeadConversionDialog from '../components/LeadConversionDialog';

const fields=[{field:'name',header:'Lead Name'},{field:'email',header:'Email'},{field:'phone',header:'Phone'},{field:'companyName',header:'Company'},{field:'status',header:'Status'},{field:'source',header:'Source'}];
const unwrap=d=>Array.isArray(d)?d:d?.data??d?.content??[];

export default function Lead(){
 const [rows,setRows]=useState([]),[loading,setLoading]=useState(false),[error,setError]=useState(''),[selected,setSelected]=useState(null),[convertOpen,setConvertOpen]=useState(false),[page,setPage]=useState(0),[size,setSize]=useState(10);
 const load=useCallback(async()=>{setLoading(true);setError('');try{const r=await leadApi.list();setRows(unwrap(r.data));}catch(e){setError(e.response?.data?.message||e.message||'Unable to load leads')}finally{setLoading(false)}},[]);
 useEffect(()=>{load()},[load]);
 const convert=async customer=>{if(!selected?.id)throw new Error('Lead id is missing');await customerApi.create({...customer,leadId:selected.id});await leadApi.update(selected.id,{...selected,status:'CONVERTED'});setConvertOpen(false);setSelected(null);await load();};
 const visible=rows.slice(page*size,page*size+size);
 return <Box><Box display="flex" alignItems="center" mb={2}><Box flex={1}><Typography variant="h4" fontWeight={700}>Leads</Typography><Typography color="text.secondary">Manage prospects and convert qualified leads to customers</Typography></Box><IconButton onClick={load} disabled={loading}><Refresh/></IconButton></Box>{error&&<Alert severity="error" sx={{mb:2}}>{error}</Alert>}<Paper><Table><TableHead><TableRow>{fields.map(f=><TableCell key={f.field}>{f.header}</TableCell>)}<TableCell align="right">Actions</TableCell></TableRow></TableHead><TableBody>{visible.map(row=><TableRow hover key={row.id}>{fields.map(f=><TableCell key={f.field}>{f.field==='status'?<Chip size="small" label={row[f.field]||'NEW'}/>:row[f.field]??''}</TableCell>)}<TableCell align="right"><IconButton title="Convert to customer" onClick={()=>{setSelected(row);setConvertOpen(true)}} disabled={String(row.status||'').toUpperCase()==='CONVERTED'}><SwapHoriz/></IconButton></TableCell></TableRow>)}{!visible.length&&<TableRow><TableCell colSpan={fields.length+1} align="center">{loading?'Loading...':'No leads found'}</TableCell></TableRow>}</TableBody></Table><TablePagination component="div" count={rows.length} page={page} rowsPerPage={size} onPageChange={(_,p)=>setPage(p)} onRowsPerPageChange={e=>{setSize(Number(e.target.value));setPage(0)}}/></Paper><LeadConversionDialog open={convertOpen} lead={selected} onClose={()=>{setConvertOpen(false);setSelected(null)}} onConvert={convert}/></Box>;
}
