import { useState } from 'react';

import { AuthButton } from '../AuthButton';
import { Loading } from '../Loading';

function LoginForm(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold">Login in to Vevericka</h2>
      <div className="mt-16 flex w-full flex-col space-y-4">
        <AuthButton
          provider="google"
          onClick={() => setIsLoading(true)}
        />

        <AuthButton
          provider="github"
          onClick={() => setIsLoading(true)}
        />

        <AuthButton
          provider="discord"
          onClick={() => setIsLoading(true)}
        />
      </div>

      <hr className="mt-8 w-full border border-midnight border-opacity-70" />

      <div className="mt-4 w-full text-center text-sm text-midnight">
        <p>
          Need help?{' '}
          <a
            href="/help/login"
            className="font-semibold underline"
          >
            Check our help page
          </a>
        </p>
      </div>
      {isLoading && <Loading className="mt-16" />}
    </div>
  );
}

export default LoginForm;
