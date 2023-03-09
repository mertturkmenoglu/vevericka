import { useState, useTransition } from 'react';

import { AuthButton } from '../AuthButton';
import { Loading } from '../Loading';
import { Link, useNavigate } from 'react-router-dom';

function LoginForm(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [, startTransition] = useTransition();
  const navigate = useNavigate();

  const onAuthButtonClick = () => {
    startTransition(() => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate('/feed');
      }, 3000);
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold">Login in to Vevericka</h2>
      <div className="mt-16 flex w-full flex-col space-y-4">
        <AuthButton
          provider="google"
          onClick={() => onAuthButtonClick()}
        />

        <AuthButton
          provider="github"
          onClick={() => onAuthButtonClick()}
        />

        <AuthButton
          provider="discord"
          onClick={() => onAuthButtonClick()}
        />
      </div>

      <hr className="mt-8 w-full border border-midnight border-opacity-70" />

      <div className="mt-4 w-full text-center text-sm text-midnight">
        <p>
          Need help?{' '}
          <Link
            to="/help/login"
            className="font-semibold underline"
          >
            Check our help page
          </Link>
        </p>
      </div>
      {isLoading && <Loading className="mt-16" />}
    </div>
  );
}

export default LoginForm;
