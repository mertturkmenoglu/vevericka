import { useQuery } from '@apollo/client';
import { useEffect, useMemo } from 'react';
import { meQueryDocument } from '../../graphql/queries/meQuery';
import { useAppStore } from '../../stores';
import { useFragment } from '../../generated';
import { userFragmentDocument } from '../../graphql';

export const useAuth = () => {
  const { data, loading, error } = useQuery(meQueryDocument);
  const user = useFragment(userFragmentDocument, data?.me);
  const store = useAppStore();

  const isAuthenticated = useMemo(() => {
    if (loading) return false;
    if (error) return false;
    if (!data) return false;
    return true;
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
