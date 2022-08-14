export type BannerAppearance = 'primary' | 'accent' | 'danger' | 'warning' | 'subtle';

export const appearanceMapping: Record<BannerAppearance, string> = {
  primary: 'bg-midnight',
  accent: 'bg-primary',
  danger: 'bg-red-600',
  warning: 'bg-amber-400',
  subtle: 'bg-midnight opacity-80',
};
