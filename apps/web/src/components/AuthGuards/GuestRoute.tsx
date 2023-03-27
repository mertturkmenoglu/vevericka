import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export interface GuestRouteProps {
  children: React.ReactNode;
}

function GuestRoute({ children }: GuestRouteProps) {
  const [isAuthenticated] = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/feed" />;
  }
  return <>{children}</>;
}

export default GuestRoute;
