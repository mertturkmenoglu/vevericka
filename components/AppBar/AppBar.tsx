import { useContext, useEffect } from 'react';
import { ApplicationContext } from '../../context/ApplicationContext';
import { LocalStorage } from '../../utils/LocalStorage';
import { useTheme } from 'next-themes';
import AppBarMenu from '../AppBarMenu';
import AppBarSearch from './elements/AppBarSearch';
import LogoAndName from './elements/LogoAndName';
import IconGroup from './elements/IconGroup';

export interface AppBarProps {}

const AppBar: React.FC<AppBarProps> = () => {
  const appContext = useContext(ApplicationContext);
  const { setTheme } = useTheme();

  useEffect(() => {
    const storage = new LocalStorage();
    appContext.setIsDarkTheme(storage.isDarkTheme);
    setTheme(storage.isDarkTheme ? 'dark' : 'light');
  }, [setTheme, appContext]);

  return (
    <nav className="w-full flex justify-between px-4 dark:bg-midnight">
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
