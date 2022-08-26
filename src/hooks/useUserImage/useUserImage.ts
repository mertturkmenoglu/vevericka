import { useMemo } from 'react';

export function useUserImage(src: string): string {
  return useMemo(() => {
    return src === 'profile.png' ? '/assets/profile.png' : src;
  }, [src]);
}
