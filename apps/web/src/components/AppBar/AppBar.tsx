import { ReactComponent as SquirrelLogo } from '../../assets/squirrel.svg';
import clsx from 'clsx';
import { BellIcon, EnvelopeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Menu } from '../AppBarMenu';
import { Link } from 'react-router-dom';

export interface AppBarProps {
  className?: string;
}

function AppBar({ className }: AppBarProps): JSX.Element {
  return (
    <header className={clsx('container bg-white', className)}>
      <nav className="flex items-center justify-between">
        <Link
          to="/"
          className="flex w-fit items-center space-x-4"
        >
          <SquirrelLogo
            className="h-8 w-8 text-berry"
            viewBox="0 0 512 512"
          />
          <h2 className="hidden text-lg font-normal text-midnight sm:flex">Vevericka</h2>
        </Link>

        <div className="flex items-center space-x-4">
          <Link
            to="/search"
            className="rounded-full p-2 hover:bg-midnight/10"
          >
            <MagnifyingGlassIcon className="h-5 w-5 text-midnight" />
          </Link>

          <Link
            to="/notifications"
            className="rounded-full p-2 hover:bg-midnight/10"
          >
            <BellIcon className="h-5 w-5 text-midnight" />
          </Link>

          <Link
            to="/messages"
            className="rounded-full p-2 hover:bg-midnight/10"
          >
            <EnvelopeIcon className="h-5 w-5 text-midnight" />
          </Link>

          <Menu />
        </div>
      </nav>
    </header>
  );
}

export default AppBar;
