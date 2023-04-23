import { Link } from 'react-router-dom';
import { AuthButton } from '../AuthButton';

function LoginForm(): JSX.Element {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold">Login in to Vevericka</h2>
      <div className="mt-16 flex w-full flex-col space-y-4">
        <AuthButton provider="google" />

        <AuthButton provider="twitter" />

        <AuthButton provider="discord" />

        <AuthButton provider="spotify" />

        <AuthButton provider="github" />
      </div>

      <hr className="mt-8 w-full border border-midnight border-opacity-70" />

      <div className="mt-4 w-full text-center text-sm text-midnight">
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
