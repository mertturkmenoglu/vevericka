import React from 'react';
import { useTheme } from '../../hooks';

export function useBannerStyles(bannerImage: string): React.CSSProperties {
  const [theme] = useTheme();

  if (bannerImage !== 'banner.png') {
    return {
      backgroundImage: `url(${bannerImage})`,
    };
  }

  return {
    backgroundColor: theme === 'light' ? '#e5e5e5' : '#1f1f1f',
  };
}
