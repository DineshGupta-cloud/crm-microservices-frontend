import { Grid, Paper, Typography } from '@mui/material';

const cards=[['Companies','/companies'],['Employees','/employees'],['Customers','/customers'],['Leads','/leads'],['Tasks','/tasks'],['Notifications','/notifications']];
export default function Dashboard(){return <><Typography variant="h4" gutterBottom>Dashboard</Typography><Typography color="text.secondary" mb={4}>CRM overview</Typography><Grid container spacing={3}>{cards.map(([name])=><Grid item xs={12} sm={6} md={4} key={name}><Paper sx={{p:3}}><Typography variant="h6">{name}</Typography><Typography variant="h3" sx={{mt:1}}>—</Typography></Paper></Grid>)}</Grid></>}
