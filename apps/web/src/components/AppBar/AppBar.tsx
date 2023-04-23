import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { ReactComponent as SquirrelLogo } from '../../assets/squirrel.svg';
import { useFlags } from '../../hooks';
import { Menu } from '../AppBarMenu';
import AppBarIcon from './AppBarIcon';
import { usePageName } from './usePageName';

export interface AppBarProps {
  className?: string;
}

function AppBar({ className }: AppBarProps): JSX.Element {
  const pageName = usePageName();
  const flags = useFlags();

  return (
    <header
      className={clsx(
        {
          'border-b border-midnight/20 bg-zinc-50': flags.appBarV2,
        },
        className
      )}
    >
      <nav className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <SquirrelLogo
              className="h-8 w-8 text-berry"
              viewBox="0 0 512 512"
            />
          </Link>

          <h2
            className="mt-1 hidden rounded px-2 py-1 text-xl font-normal text-midnight hover:bg-neutral-200 sm:flex"
            id="app-bar-page-name"
          >
            {pageName}
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <AppBarIcon type="create" />
          <AppBarIcon type="search" />

          <AppBarIcon type="notifications" />

          <AppBarIcon type="messages" />

          <Menu />
        </div>
      </nav>
    </header>
  );
}

export default AppBar;
