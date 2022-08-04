import clsx from 'clsx';
import React from 'react';
import { appearanceMapping, BannerAppearance } from './Banner.styles';

export interface BannerProps {
  appearance: BannerAppearance;
  children: React.ReactNode;
  className?: string;
}

function Banner({ appearance, children, className }: BannerProps): JSX.Element {
  return (
    <div
      className={clsx(
        'flex items-center justify-center overflow-ellipsis py-2 px-4',
        appearanceMapping[appearance],
        className
      )}
    >
      {children}
    </div>
  );
}

export default Banner;
