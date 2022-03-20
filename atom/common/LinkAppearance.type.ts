export const LinkAppearanceAsArray = [
  'primary',
  'accent',
  'subtle',
  'warning',
  'danger',
  'text',
] as const;

export type LinkAppearanceType = typeof LinkAppearanceAsArray[number];
