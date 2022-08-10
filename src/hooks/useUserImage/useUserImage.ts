import { useMemo } from 'react';

export function useUserImage(src: string): string {
  const image = useMemo(() => {
    return src === 'profile.png' ? '/assets/profile.png' : src;
  }, [src]);

  return image;
}
