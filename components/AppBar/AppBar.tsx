import AppBarMenu from './elements/AppBarMenu';
import AppBarSearch from './elements/AppBarSearch';
import LogoAndName from './elements/LogoAndName';
import IconGroup from './elements/IconGroup';
import clsx from 'clsx';

export interface AppBarProps {
  app?: boolean;
}

const AppBar: React.FC<AppBarProps> = ({ app = false }) => {
  return (
    <nav
      className={clsx(
        {
          'container mx-auto max-w-[1200px]': !app,
          'w-full': app,
        },
        'flex justify-between rounded-full px-4 dark:bg-midnight',
      )}
    >
      <LogoAndName />
      <div className="flex items-center">
        <AppBarSearch />
        <IconGroup />
        <AppBarMenu />
      </div>
    </nav>
  );
};

export default AppBar;
