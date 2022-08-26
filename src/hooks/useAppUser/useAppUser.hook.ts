import { useQuery } from 'react-query';
import { UserApi } from '@services/user';
import { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '@context/jotai';

export interface Payload {
  username: string;
}

export function useAppUser({ username }: Payload) {
  const [, setAppUser] = useAtom(userAtom);
  const userApi = useRef(new UserApi());

  const query = useQuery(
    ['AppUser'],
    async () => {
      return userApi.current.getUserByUsername({ username });
    },
    {
      refetchInterval: false,
    }
  );

  useEffect(() => {
    if (query.status === 'success' && query.data !== null) {
      setAppUser({
        email: query.data.email,
        name: query.data.name,
        image: query.data.image,
        userId: query.data.id,
        username: query.data.username,
      });
    }
  }, [query.status, query.data, setAppUser]);

  return query;
}
