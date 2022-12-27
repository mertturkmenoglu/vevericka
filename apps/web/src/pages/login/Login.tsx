import { LoginForm } from '../../components';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ReactComponent as SquirrelLogo } from '../../assets/squirrel.svg';

function Login(): JSX.Element {
  return (
    <div className="flex h-screen w-screen flex-col md:flex-row">
      <div className="relative w-full bg-midnight px-8 py-8 md:h-full md:w-1/2 lg:w-2/3">
        <a
          href="/"
          className="flex items-center text-white"
        >
          <ArrowLeftIcon className="h-5 w-5 text-white" />
          <span className="ml-4 text-sm hover:underline">Go back to home</span>
        </a>

        <div className="container mx-auto mt-16 flex flex-col items-center md:absolute md:inset-0 md:justify-center">
          <SquirrelLogo
            className="h-16 w-16 text-white md:h-32 md:w-32"
            viewBox="0 0 512 512"
          />

          <h2 className="mt-4 text-lg font-semibold text-white md:mt-8 md:text-4xl">Vevericka</h2>
        </div>
      </div>
      <div className="mt-8 flex w-full items-center justify-center bg-white md:mt-0 md:h-full md:w-1/2 lg:w-1/3">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
