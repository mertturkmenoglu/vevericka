export const AppearanceAsArray = [
  'primary',
  'accent',
  'subtle',
  'warning',
  'danger',
] as const;

export type AppearanceType = typeof AppearanceAsArray[number];
