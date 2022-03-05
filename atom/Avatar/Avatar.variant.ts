import type { AvatarAppearanceType, AvatarSizeType } from '../common';

export const appearanceMapping: Record<AvatarAppearanceType, string> = {
  circle: 'rounded-full',
  square: 'rounded-none',
};

export const sizeMapping: Record<AvatarSizeType, string> = {
  small: 'w-8 h-8',
  default: 'w-10 h-10',
  medium: 'w-12 h-12',
  large: 'w-16 h-16',
  xlarge: 'w-24 h-24',
  xxlarge: 'w-32 h-32',
};
