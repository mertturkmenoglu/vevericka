import { useMemo } from 'react';

export function useFlags() {
  const data = useMemo(() => {
    return {
      landingAppBar: true,
      stories: true,
      appBarV2: false,
    };
  }, []);
  return data;
}
