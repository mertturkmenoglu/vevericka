import { useQuery } from '@apollo/client';
import { useEffect, useMemo } from 'react';
import { useFragment } from '../../generated';
import { meQueryDocument, UserFragment } from '../../graphql';
import { useAppStore } from '../../stores';

export const useAuth = () => {
  const { data, loading, error } = useQuery(meQueryDocument);
  const user = useFragment(UserFragment, data?.me);
  const store = useAppStore();

  const isAuthenticated = useMemo(() => {
    if (loading) return false;
    if (error) return false;
    return data;
  }, [data, loading, error]);

  useEffect(() => {
    if (data && user) {
      store.setUser(user);
    }
  }, [data]);

  return {
    data,
    isAuthenticated,
    loading,
    error,
  };
};
