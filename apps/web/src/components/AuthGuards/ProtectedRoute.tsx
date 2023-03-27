import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated] = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
}

export default ProtectedRoute;
