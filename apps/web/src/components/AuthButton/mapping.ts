import { Discord, Github, Google, Icon, Spotify, Twitter } from 'react-bootstrap-icons';
import { AvailableOAuthProviders } from '../../lib';

export const authProviderMapping = {
  google: {
    icon: Google,
    text: 'Google',
  },
  github: {
    icon: Github,
    text: 'GitHub',
  },
  discord: {
    icon: Discord,
    text: 'Discord',
  },
  twitter: {
    icon: Twitter,
    text: 'Twitter',
  },
  spotify: {
    icon: Spotify,
    text: 'Spotify',
  },
} as const satisfies Record<AvailableOAuthProviders, { icon: Icon; text: string }>;
