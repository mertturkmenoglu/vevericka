import { SpinnerAppearance, SpinnerSpacing } from '@atom/common';

export const appearanceMapping: Record<SpinnerAppearance, string> = {
  primary: 'fill-midnight',
  accent: 'fill-primary',
  danger: 'fill-red-600',
  subtle: 'fill-neutral-500',
  warning: 'fill-amber-400',
  white: 'fill-white',
};

export const spacingMapping: Record<SpinnerSpacing, string> = {
  compact: 'h-4 w-4',
  small: 'h-5 w-5',
  default: 'h-6 w-6',
  medium: 'h-8 w-8',
  large: 'h-10 w-10',
};
