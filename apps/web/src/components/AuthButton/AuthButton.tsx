import { Discord, Github, Google, Icon } from 'react-bootstrap-icons';
import clsx from 'clsx';

export const AvailableOAuthProvidersArray = ['google', 'github', 'discord'] as const;
export type AvailableOAuthProviders = typeof AvailableOAuthProvidersArray[number];

const authProviderMapping = {
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
} as const satisfies Record<AvailableOAuthProviders, { icon: Icon; text: string }>;

export interface AuthButtonProps {
  provider: AvailableOAuthProviders;
  onClick: () => void;
}

function AuthButton({ provider, onClick }: AuthButtonProps): JSX.Element {
  const { icon: ProviderIcon, text } = authProviderMapping[provider];

  return (
    <button
      className={clsx(
        'flex max-w-fit items-center rounded-full bg-black py-1.5 px-6 text-white hover:bg-opacity-90',
        'focus:outline-2 focus:outline-offset-2 focus:outline-amber-500'
      )}
      onClick={onClick}
    >
      <ProviderIcon size={16} />
      <span className="ml-2">{text}</span>
    </button>
  );
}

export default AuthButton;
