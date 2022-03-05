export const AvatarSizeAsArray = ['small', 'default', 'medium', 'large', 'xlarge', 'xxlarge'] as const;

export type AvatarSizeType = typeof AvatarSizeAsArray[number];
