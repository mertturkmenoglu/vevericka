import { ReactComponent as SquirrelLogo } from '../../assets/squirrel.svg';
import clsx from 'clsx';
import { Menu } from '../AppBarMenu';
import { Link } from 'react-router-dom';
import AppBarIcon from './AppBarIcon';
import { usePageName } from './usePageName';
import { useFlags } from '../../hooks';

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

          <h2 className="mt-1 hidden rounded py-1 px-2 text-xl font-normal text-midnight hover:bg-zinc-100 sm:flex">
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
