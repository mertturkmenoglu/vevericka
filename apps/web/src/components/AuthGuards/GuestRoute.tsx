import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks';

export interface GuestRouteProps {
  children: React.ReactNode;
}

function GuestRoute({ children }: GuestRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  if (!loading && isAuthenticated) {
    return <Navigate to="/feed" />;
  }
  return <>{children}</>;
}

export default GuestRoute;
