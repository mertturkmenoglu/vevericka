import { useMemo } from 'react';
import clsx from 'clsx';
import { appearanceMapping, sizeMapping } from './Avatar.variant';
import { AvatarProps } from './Avatar.type';

const Avatar: React.FC<AvatarProps> = ({ appearance, label, size, className: cs, ...rest }) => {
  const calcAppearance = useMemo(() => appearanceMapping[appearance], [appearance]);

  const calcSize = useMemo(() => sizeMapping[size], [size]);

  const imgClassName = clsx(calcAppearance, calcSize, cs);

  return <img alt={label} className={imgClassName} {...rest} />;
};

export default Avatar;
