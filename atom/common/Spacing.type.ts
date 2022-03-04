export const SpacingTypeAsArray = ['compact', 'small', 'default', 'medium', 'large'] as const;

export type SpacingType = typeof SpacingTypeAsArray[number];
