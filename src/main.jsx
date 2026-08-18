import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CrudPage from './components/CrudPage';
import { useAuthStore } from './store/authStore';
import './styles.css';

const queryClient=new QueryClient();
const theme=createTheme({palette:{primary:{main:'#1565c0'},background:{default:'#f5f7fb'}},shape:{borderRadius:8}});
const resources=[['companies','Companies',['name','code']],['branches','Branches',['name','code','companyId']],['departments','Departments',['name','code','branchId']],['designations','Designations',['name','code']],['employees','Employees',['firstName','lastName','email','departmentId','designationId']],['leads','Leads',['name','email','phone','status']],['customers','Customers',['name','email','phone']],['vendors','Vendors',['name','email','phone']],['products','Products',['name','sku','price']],['tasks','Tasks',['title','description','status','priority']],['notifications','Notifications',['title','message']],['audits','Audit Logs',['entityName','entityId','action']]];
function Protected(){const token=useAuthStore(s=>s.accessToken);return token?<MainLayout/>:<Navigate to="/login" replace/>}
function App(){return <Routes><Route path="/login" element={<Login/>}/><Route element={<Protected/>}><Route path="/" element={<Dashboard/>}/>{resources.map(([r,t,f])=><Route key={r} path={'/'+r} element={<CrudPage resource={r} title={t} fields={f}/>}/>)}</Route><Route path="*" element={<Navigate to="/" replace/>}/></Routes>}
ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><QueryClientProvider client={queryClient}><ThemeProvider theme={theme}><CssBaseline/><BrowserRouter><App/></BrowserRouter></ThemeProvider></QueryClientProvider></React.StrictMode>);
