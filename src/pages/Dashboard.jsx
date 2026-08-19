import { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box, Chip, CircularProgress, Button } from '@mui/material';
import { Business, People, Groups, PersonSearch, TaskAlt, NotificationsActive, ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { companyApi, employeeApi, customerApi, leadApi, taskApi, notificationApi } from '../services/crmApi';

const cards=[['Companies','/companies',companyApi, Business],['Employees','/employees',employeeApi, People],['Customers','/customers',customerApi, Groups],['Leads','/leads',leadApi, PersonSearch],['Tasks','/tasks',taskApi, TaskAlt],['Notifications','/notifications',notificationApi, NotificationsActive]];

function countResult(data){ const value=data?.data; return Array.isArray(value)?value.length:value?.content?.length ?? value?.data?.length ?? 0; }
export default function Dashboard(){
 const navigate=useNavigate(); const [counts,setCounts]=useState({}); const [loading,setLoading]=useState(true);
 useEffect(()=>{let active=true; Promise.allSettled(cards.map(([,path,api])=>api.list().then(r=>[path,countResult(r)]))).then(results=>{if(!active)return;const next={};results.forEach(r=>{if(r.status==='fulfilled')next[r.value[0]]=r.value[1]});setCounts(next);setLoading(false)});return()=>{active=false}},[]);
 return <Box><Box display="flex" alignItems="center" mb={3}><Box flex={1}><Typography variant="h4" fontWeight={700}>Dashboard</Typography><Typography color="text.secondary">Overview of your CRM operations</Typography></Box><Chip label="Live API" color="success" variant="outlined"/></Box><Grid container spacing={3}>{cards.map(([name,path,api,Icon])=><Grid item xs={12} sm={6} lg={4} key={path}><Paper sx={{p:3,borderRadius:3,height:'100%',cursor:'pointer',transition:'transform .15s','&:hover':{transform:'translateY(-3px)'}}} onClick={()=>navigate(path)}><Box display="flex" alignItems="center" gap={2}><Box sx={{p:1.5,borderRadius:2,bgcolor:'primary.light',color:'primary.main'}}><Icon/></Box><Box flex={1}><Typography color="text.secondary">{name}</Typography><Typography variant="h3" fontWeight={700}>{loading?<CircularProgress size={25}/>:counts[path]??0}</Typography></Box><ArrowForward color="action"/></Box></Paper></Grid>)}</Grid><Paper sx={{mt:4,p:3,borderRadius:3}}><Typography variant="h6" fontWeight={700} gutterBottom>Quick actions</Typography><Box display="flex" gap={2} flexWrap="wrap"><Button variant="contained" onClick={()=>navigate('/companies')}>Manage Companies</Button><Button variant="outlined" onClick={()=>navigate('/employees')}>Manage Employees</Button><Button variant="outlined" onClick={()=>navigate('/leads')}>View Leads</Button><Button variant="outlined" onClick={()=>navigate('/tasks')}>View Tasks</Button></Box></Paper></Box>;
}
