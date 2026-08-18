import { useState } from 'react';
import { Alert, Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuthStore } from '../store/authStore';

export default function Login(){
 const [username,setUsername]=useState(''); const [password,setPassword]=useState(''); const [error,setError]=useState(''); const navigate=useNavigate(); const setAuth=useAuthStore(s=>s.setAuth);
 const submit=async(e)=>{e.preventDefault();setError('');try{const {data}=await api.post('/api/auth/login',{username,password});setAuth(data);navigate('/');}catch(err){setError(err.response?.data?.message||'Invalid username or password');}};
 return <Container maxWidth="sm"><Box sx={{minHeight:'100vh',display:'grid',placeItems:'center'}}><Paper sx={{p:5,width:'100%'}} elevation={4}><Typography variant="h4" mb={1}>Enterprise CRM</Typography><Typography color="text.secondary" mb={3}>Sign in to your account</Typography>{error&&<Alert severity="error" sx={{mb:2}}>{error}</Alert>}<form onSubmit={submit}><TextField fullWidth label="Username" margin="normal" value={username} onChange={e=>setUsername(e.target.value)} required/><TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={e=>setPassword(e.target.value)} required/><Button fullWidth variant="contained" size="large" type="submit" sx={{mt:3}}>Sign In</Button></form></Paper></Box></Container>;
}
