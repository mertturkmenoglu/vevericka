import type { SpacingType } from '../common';
import type { SpinnerAppearance } from './Spinner';

export const appearanceMapping: Record<SpinnerAppearance, string> = {
  primary: 'fill-midnight',
  accent: 'fill-primary',
  danger: 'fill-red-600',
  subtle: 'fill-neutral-500',
  warning: 'fill-amber-400',
  white: 'fill-white',
};

export const spacingMapping: Record<SpacingType, string> = {
  compact: 'h-2 w-2',
  small: 'h-3 w-3',
  default: 'h-4 w-4',
  medium: 'h-6 w-6',
  large: 'h-8 w-8',
};
