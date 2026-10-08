import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function ProtectedRoute({ roles = [] }) {
  const location = useLocation();
  const { accessToken, user } = useAuthStore();

  if (!accessToken) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (
    roles.length &&
    !(user?.roles || []).some((r) =>
      roles.includes(String(r).replace(/^ROLE_/, '').toUpperCase())
    )
  ) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}
