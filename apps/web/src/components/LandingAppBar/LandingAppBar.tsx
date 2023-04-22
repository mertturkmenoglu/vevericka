import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { ReactComponent as SquirrelLogo } from '../../assets/squirrel.svg';

export interface LandingAppBarProps {
  className?: string;
}

function LandingAppBar({ className }: LandingAppBarProps): JSX.Element {
  return (
    <nav
      className={clsx(
        'container mx-auto flex items-center justify-between rounded-full bg-zinc-100 px-8 py-2',
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
        <Link
          to="/login"
          className="rounded-full bg-midnight px-4 py-1.5 text-sm font-medium text-white"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}

export default LandingAppBar;
