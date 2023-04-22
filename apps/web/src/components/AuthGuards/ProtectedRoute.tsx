import { useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { updateLastSeenDocument } from '../../graphql';
import { useAuth } from '../../hooks';

export interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  const [updateLastSeen] = useMutation(updateLastSeenDocument);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAuthenticated && !loading) {
        updateLastSeen();
      }
    }, 1000 * 60 * 2);

    return () => {
      clearInterval(interval);
    };
  }, [isAuthenticated, loading]);

  if (!loading && !isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
