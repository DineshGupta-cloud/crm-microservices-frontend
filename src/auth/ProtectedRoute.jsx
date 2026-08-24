import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { authStorage } from './authStorage';
export default function ProtectedRoute({roles=[]}){const location=useLocation();const token=authStorage.getToken();const user=authStorage.getUser();if(!token)return <Navigate to="/login" replace state={{from:location.pathname}}/>;if(roles.length&&!(user?.roles||[]).some(r=>roles.includes(String(r).replace(/^ROLE_/,'').toUpperCase())))return <Navigate to="/forbidden" replace/>;return <Outlet/>;}
