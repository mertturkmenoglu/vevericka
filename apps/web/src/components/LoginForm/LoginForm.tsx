import { Link } from 'react-router-dom';
import { AvailableOAuthProvidersArray } from '../../lib';
import { AuthButton } from '../AuthButton';

function LoginForm(): JSX.Element {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold text-midnight dark:text-white">Login in to Vevericka</h2>
      <div className="mt-8 flex w-full flex-col space-y-4">
        {AvailableOAuthProvidersArray.map((provider) => (
          <AuthButton
            key={provider}
            provider={provider}
          />
        ))}
      </div>

      <hr className="mt-8 w-full border border-midnight border-opacity-70" />

      <div className="mt-4 w-full text-center text-sm text-midnight dark:text-neutral-400">
        <p>
          Need help?{' '}
          <Link
            to="/help"
            className="font-semibold underline"
          >
            Check our help page
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
