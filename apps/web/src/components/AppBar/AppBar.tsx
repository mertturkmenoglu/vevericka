import { ReactComponent as SquirrelLogo } from '../../assets/squirrel.svg';
import clsx from 'clsx';
import { BellIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { Menu } from '../AppBarMenu';

export interface AppBarProps {
  className?: string;
}

function AppBar({ className }: AppBarProps): JSX.Element {
  return (
    <header className={clsx('container rounded-full bg-zinc-100 py-2 px-8', className)}>
      <nav className="flex items-center justify-between">
        <a
          href="/"
          className="flex w-fit items-center space-x-4"
        >
          <SquirrelLogo
            className="h-10 w-10 text-berry"
            viewBox="0 0 512 512"
          />
          <h2 className="text-lg font-normal">Vevericka</h2>
        </a>

        <div className="flex items-center space-x-4">
          <a
            href="/notifications"
            className="rounded-full p-2 hover:bg-berry hover:bg-opacity-10"
          >
            <BellIcon className="h-8 w-8 text-berry" />
          </a>

          <a
            href="/messages"
            className="rounded-full p-2 hover:bg-berry hover:bg-opacity-10"
          >
            <EnvelopeIcon className="h-8 w-8 text-berry" />
          </a>

          <Menu />
        </div>
      </nav>
    </header>
  );
}

export default AppBar;
