import clsx from 'clsx';
import { ReactComponent as SquirrelLogo } from '../../assets/squirrel.svg';

export interface LandingAppBarProps {
  className?: string;
}

function LandingAppBar({ className }: LandingAppBarProps): JSX.Element {
  return (
    <nav
      className={clsx(
        'container mx-auto flex items-center justify-between rounded-full bg-zinc-100 py-2 px-8',
        className
      )}
    >
      <div className="flex items-center space-x-8">
        <SquirrelLogo
          className="h-10 w-10 text-berry"
          viewBox="0 0 512 512"
        />
        <h2 className="hidden text-lg text-midnight sm:flex">Vevericka</h2>
      </div>
      <div className="flex items-center space-x-4">
        <a
          href="/login"
          className="rounded-full py-1.5 px-4 text-sm font-medium text-midnight transition-all duration-500 ease-in-out hover:bg-berry hover:bg-opacity-60 hover:text-white"
        >
          Login
        </a>
        <a
          href="/login"
          className="rounded-full bg-berry py-1.5 px-4 text-sm font-medium text-white"
        >
          Get Started
        </a>
      </div>
    </nav>
  );
}

export default LandingAppBar;
