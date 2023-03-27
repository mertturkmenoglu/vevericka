import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export interface GuestRouteProps {
  children: React.ReactNode;
}

function GuestRoute({ children }: GuestRouteProps) {
  const [isAuthenticated] = useAuth();
  console.log(isAuthenticated);
  if (isAuthenticated) {
    console.log('redirecting');
    return <Navigate to="/" />;
  }
  return <>{children}</>;
}

export default GuestRoute;
