import { AppBar, Box, Drawer, List, ListItemButton, ListItemText, Toolbar, Typography, Button } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const items = [
  ['Dashboard','/'],['Companies','/companies'],['Branches','/branches'],['Departments','/departments'],['Designations','/designations'],['Employees','/employees'],['Leads','/leads'],['Customers','/customers'],['Vendors','/vendors'],['Products','/products'],['Tasks','/tasks'],['Notifications','/notifications'],['Audit Logs','/audits']
];

export default function MainLayout() {
  const navigate = useNavigate(); const logout = useAuthStore(s => s.logout);
  return <Box sx={{display:'flex',minHeight:'100vh'}}><AppBar position="fixed"><Toolbar><Typography variant="h6" sx={{flexGrow:1}}>Enterprise CRM</Typography><Button color="inherit" onClick={()=>{logout();navigate('/login')}}>Logout</Button></Toolbar></AppBar><Drawer variant="permanent" sx={{width:240,'& .MuiDrawer-paper':{width:240,boxSizing:'border-box'}}}><Toolbar/><List>{items.map(([label,path])=><ListItemButton key={path} onClick={()=>navigate(path)}><ListItemText primary={label}/></ListItemButton>)}</List></Drawer><Box component="main" sx={{flexGrow:1,p:3,ml:30,pt:10}}><Outlet/></Box></Box>;
}
