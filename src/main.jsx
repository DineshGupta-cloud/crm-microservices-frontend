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
import { companyApi, branchApi, departmentApi, designationApi, employeeApi, leadApi, customerApi, vendorApi, productApi, taskApi, notificationApi, auditApi } from './services/crmApi';
import './styles.css';

const queryClient = new QueryClient();
const theme = createTheme({ palette: { primary: { main: '#1565c0' }, background: { default: '#f5f7fb' } }, shape: { borderRadius: 10 } });

const resources = [
  ['companies','Companies',companyApi,[{field:'name',header:'Name'},{field:'code',header:'Code'}]],
  ['branches','Branches',branchApi,[{field:'name',header:'Name'},{field:'code',header:'Code'},{field:'companyId',header:'Company ID'}]],
  ['departments','Departments',departmentApi,[{field:'name',header:'Name'},{field:'code',header:'Code'},{field:'branchId',header:'Branch ID'}]],
  ['designations','Designations',designationApi,[{field:'name',header:'Name'},{field:'code',header:'Code'}]],
  ['employees','Employees',employeeApi,[{field:'firstName',header:'First Name'},{field:'lastName',header:'Last Name'},{field:'email',header:'Email'},{field:'departmentId',header:'Department ID'},{field:'designationId',header:'Designation ID'}]],
  ['leads','Leads',leadApi,[{field:'name',header:'Name'},{field:'email',header:'Email'},{field:'phone',header:'Phone'},{field:'status',header:'Status'}]],
  ['customers','Customers',customerApi,[{field:'name',header:'Name'},{field:'email',header:'Email'},{field:'phone',header:'Phone'}]],
  ['vendors','Vendors',vendorApi,[{field:'name',header:'Name'},{field:'email',header:'Email'},{field:'phone',header:'Phone'}]],
  ['products','Products',productApi,[{field:'name',header:'Name'},{field:'sku',header:'SKU'},{field:'price',header:'Price',type:'number'}]],
  ['tasks','Tasks',taskApi,[{field:'title',header:'Title'},{field:'description',header:'Description'},{field:'status',header:'Status'},{field:'priority',header:'Priority'}]],
  ['notifications','Notifications',notificationApi,[{field:'title',header:'Title'},{field:'message',header:'Message'}]],
  ['audits','Audit Logs',auditApi,[{field:'entityName',header:'Entity'},{field:'entityId',header:'Entity ID'},{field:'action',header:'Action'}]],
];

function Protected() { const token = useAuthStore(s => s.accessToken); return token ? <MainLayout /> : <Navigate to="/login" replace />; }
function App() { return <Routes><Route path="/login" element={<Login />} /><Route element={<Protected />}><Route path="/" element={<Dashboard />} />{resources.map(([path,title,api,columns]) => <Route key={path} path={`/${path}`} element={<CrudPage title={title} api={api} columns={columns} fields={columns} />} />)}</Route><Route path="*" element={<Navigate to="/" replace />} /></Routes>; }
ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><QueryClientProvider client={queryClient}><ThemeProvider theme={theme}><CssBaseline /><BrowserRouter><App /></BrowserRouter></ThemeProvider></QueryClientProvider></React.StrictMode>);
