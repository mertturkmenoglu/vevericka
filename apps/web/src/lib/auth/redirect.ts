import { AvailableOAuthProviders } from './available-providers';

export const getRedirectUrlBasedOnProvider = (provider: AvailableOAuthProviders) => {
  const BASE = import.meta.env.VITE_BASE_URL;
  return `${BASE}/oauth/${provider}`;
};
