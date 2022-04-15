import { SpinnerAppearance } from '../Spinner';
import type { AppearanceType, SpacingType } from '../common';

export const spacingMapping: Record<SpacingType, string> = {
  compact: 'px-2 py-1 text-xs',
  small: 'px-4 py-1',
  default: 'px-4 py-2',
  medium: 'px-6 py-3',
  large: 'px-8 py-4',
};

export const appearanceMapping: Record<AppearanceType, string> = {
  primary: 'bg-midnight text-white',
  accent: 'bg-primary text-white',
  danger: 'bg-red-600 text-white',
  subtle: 'bg-transparent text-midnight opacity-80',
  warning: 'bg-amber-400 text-white',
};

export const loadingMapping: Record<AppearanceType, SpinnerAppearance> = {
  primary: 'white',
  warning: 'white',
  subtle: 'primary',
  danger: 'white',
  accent: 'white',
};
