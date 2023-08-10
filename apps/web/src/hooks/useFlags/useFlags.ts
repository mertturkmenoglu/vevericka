import { useMemo } from 'react';

export function useFlags() {
  const data = useMemo(() => {
    return {
      landingAppBar: true,
      stories: false,
      appBarV2: false,
    };
  }, []);
  return data;
}
