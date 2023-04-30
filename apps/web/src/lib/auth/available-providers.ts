export const AvailableOAuthProvidersArray = ['google', 'discord', 'spotify'] as const;
export type AvailableOAuthProviders = (typeof AvailableOAuthProvidersArray)[number];
