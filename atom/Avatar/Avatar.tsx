import type { AvatarAppearanceType, AvatarSizeType } from '../common';
import { useMemo } from 'react';
import clsx from 'clsx';
import { appearanceMapping, sizeMapping } from './Avatar.variant';

export interface AvatarAtomicProps {
  appearance: AvatarAppearanceType;
  label: string;
  size: AvatarSizeType;
}

export type AvatarProps = React.ComponentProps<'img'> & AvatarAtomicProps;

const Avatar: React.FC<AvatarProps> = ({ appearance, label, size, className: cs, ...rest }) => {
  const calcAppearance = useMemo(() => appearanceMapping[appearance], [appearance]);

  const calcSize = useMemo(() => sizeMapping[size], [size]);

  const imgClassName = clsx(calcAppearance, calcSize, cs);

  return <img alt={label} className={imgClassName} {...rest} />;
};

export default Avatar;
