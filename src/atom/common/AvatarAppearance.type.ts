export const AvatarAppearanceAsArray = ['circle', 'square'] as const;

export type AvatarAppearanceType = typeof AvatarAppearanceAsArray[number];
