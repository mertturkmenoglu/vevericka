import React, { useMemo } from 'react';
import clsx from 'clsx';
import { AvatarAppearance, AvatarSize } from '@atom/common';
import { appearanceMapping, sizeMapping } from './Avatar.styles';

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  label: string;
  appearance: AvatarAppearance;
  size: AvatarSize;
}

const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ label, appearance, size, className, ...props }, ref) => {
    const calcAppearance = useMemo(() => appearanceMapping[appearance], [appearance]);

    const calcSize = useMemo(() => sizeMapping[size], [size]);

    const imgClassName = clsx(calcAppearance, calcSize, className);

    return (
      <img
        ref={ref}
        alt={label}
        className={imgClassName}
        {...props}
      />
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;
