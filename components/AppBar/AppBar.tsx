import AppBarMenu from './elements/AppBarMenu';
import AppBarSearch from './elements/AppBarSearch';
import LogoAndName from './elements/LogoAndName';
import IconGroup from './elements/IconGroup';

export interface AppBarProps {}

const AppBar: React.FC<AppBarProps> = () => {
  return (
    <nav className="flex w-full justify-between px-4 dark:bg-midnight">
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
