import clsx from 'clsx';
import React, { useMemo } from 'react';
import Image from 'next/image';

export interface AppLogoProps {
  variant: 'icon' | 'wordmark' | 'lockup';
  className?: string;
}

function AppLogo({ variant, className }: AppLogoProps): JSX.Element {
  const showLogo = useMemo(() => variant === 'icon' || variant === 'lockup', [variant]);
  const showText = useMemo(() => variant === 'wordmark' || variant === 'lockup', [variant]);

  return (
    <div className={clsx('flex items-center space-x-4', className)}>
      {showLogo && (
        <Image
          src="/assets/icon_primary.svg"
          width={32}
          height={32}
          alt="Application icon"
        />
      )}
      {showText && <div className={clsx('font-lato text-xl font-medium text-midnight dark:text-white')}>Vevericka</div>}
    </div>
  );
}

export default AppLogo;
