import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { meQueryDocument } from '../../graphql/queries/meQuery';

export const useAuth = () => {
  const { data, loading, error } = useQuery(meQueryDocument);

  const isAuthenticated = useMemo(() => {
    if (loading) return false;
    if (error) return false;
    if (!data) return false;
    return true;
  }, [data, loading, error]);

  return {
    data,
    isAuthenticated,
    loading,
    error,
  };
};
