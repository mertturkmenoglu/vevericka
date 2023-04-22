export const AvailableOAuthProvidersArray = ['google', 'github', 'discord', 'twitter', 'spotify'] as const;
export type AvailableOAuthProviders = (typeof AvailableOAuthProvidersArray)[number];
