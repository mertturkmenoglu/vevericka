import { getDateLocaleFromRouterLocale } from '@utils/index';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export function useRouterDateLocale() {
  const router = useRouter();

  const dateLocal = useMemo(() => {
    return getDateLocaleFromRouterLocale(router.locale);
  }, [router]);

  return dateLocal;
}
