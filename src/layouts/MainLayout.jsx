import { useState } from 'react';
import { AppBar, Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Button, Divider, IconButton, Tooltip } from '@mui/material';
import { Dashboard, Business, AccountTree, Apartment, Badge, People, PersonSearch, Groups, Store, Inventory2, TaskAlt, Notifications, History, Menu, Logout } from '@mui/icons-material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const items = [
  ['Dashboard','/',Dashboard],['Companies','/companies',Business],['Branches','/branches',AccountTree],['Departments','/departments',Apartment],['Designations','/designations',Badge],['Employees','/employees',People],['Leads','/leads',PersonSearch],['Customers','/customers',Groups],['Vendors','/vendors',Store],['Products','/products',Inventory2],['Tasks','/tasks',TaskAlt],['Notifications','/notifications',Notifications],['Audit Logs','/audits',History]
];

const drawerWidth = 250;
export default function MainLayout() {
  const navigate = useNavigate(); const location = useLocation(); const logout = useAuthStore(s => s.logout); const [mobileOpen,setMobileOpen] = useState(false);
  const drawer = <Box><Toolbar><Typography variant="h6" fontWeight={700}>CRM</Typography></Toolbar><Divider/><List>{items.map(([label,path,Icon])=><ListItemButton key={path} selected={location.pathname===path} onClick={()=>{navigate(path);setMobileOpen(false)}} sx={{mx:1,my:.25,borderRadius:2}}><ListItemIcon><Icon/></ListItemIcon><ListItemText primary={label}/></ListItemButton>)}</List></Box>;
  return <Box sx={{display:'flex',minHeight:'100vh'}}><AppBar position="fixed" sx={{zIndex:(theme)=>theme.zIndex.drawer+1}}><Toolbar><IconButton color="inherit" edge="start" onClick={()=>setMobileOpen(!mobileOpen)} sx={{mr:2,display:{sm:'none'}}}><Menu/></IconButton><Typography variant="h6" sx={{flexGrow:1,fontWeight:700}}>Enterprise CRM</Typography><Button color="inherit" startIcon={<Logout/>} onClick={()=>{logout();navigate('/login')}}>Logout</Button></Toolbar></AppBar><Drawer variant="temporary" open={mobileOpen} onClose={()=>setMobileOpen(false)} sx={{display:{xs:'block',sm:'none'},'& .MuiDrawer-paper':{width:drawerWidth}}}>{drawer}</Drawer><Drawer variant="permanent" sx={{display:{xs:'none',sm:'block'},width:drawerWidth,flexShrink:0,'& .MuiDrawer-paper':{width:drawerWidth,boxSizing:'border-box'}}}>{drawer}</Drawer><Box component="main" sx={{flexGrow:1,p:{xs:2,sm:3},pt:10,overflow:'auto'}}><Outlet/></Box></Box>;
}
