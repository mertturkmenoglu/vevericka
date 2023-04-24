import clsx from 'clsx';
import { AvailableOAuthProviders, getRedirectUrlBasedOnProvider } from '../../lib';
import { authProviderMapping } from './mapping';

export interface AuthButtonProps {
  provider: AvailableOAuthProviders;
  onClick?: () => void;
}

function AuthButton({ provider, onClick }: AuthButtonProps): JSX.Element {
  const { icon: ProviderIcon, text } = authProviderMapping[provider];

  const defaultOnClickHandler = () => {
    window.location.href = getRedirectUrlBasedOnProvider(provider);
  };

  return (
    <button
      className={clsx(
        'flex w-full items-center justify-center rounded bg-midnight px-8 py-1.5 text-white hover:bg-opacity-90 dark:bg-neutral-800 dark:hover:bg-opacity-80'
      )}
      onClick={onClick ?? defaultOnClickHandler}
    >
      <ProviderIcon size={16} />
      <span className="ml-2">{text}</span>
    </button>
  );
}

export default AuthButton;
