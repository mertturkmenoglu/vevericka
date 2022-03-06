import type { AppearanceType } from '../common';

export const appearanceMapping: Record<AppearanceType, string> = {
  primary: 'bg-midnight',
  accent: 'bg-primary',
  danger: 'bg-red-600',
  warning: 'bg-amber-400',
  subtle: 'bg-midnight opacity-80',
};
