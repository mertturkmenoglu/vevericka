import { useState } from 'react';

import { AuthButton, AvailableOAuthProvidersArray } from '../AuthButton';
import { Loading } from '../Loading';

function LoginForm(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold">Login</h2>
      <div className="mt-8 flex space-x-4">
        {AvailableOAuthProvidersArray.map((provider) => (
          <AuthButton
            key={provider}
            provider={provider}
            onClick={() => setIsLoading(true)}
          />
        ))}
      </div>
      {isLoading && <Loading className="mt-16" />}
    </div>
  );
}

export default LoginForm;
