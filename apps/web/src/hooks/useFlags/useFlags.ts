import { useMemo } from 'react';

export function useFlags() {
  const data = useMemo(() => {
    return {
      landingAppBar: true,
    };
  }, []);
  return data;
}