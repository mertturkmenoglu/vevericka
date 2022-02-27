import { Menu, Switch } from '@headlessui/react';
import { LocalStorage } from '../../../../utils/LocalStorage';
import clsx from 'clsx';
import { useContext } from 'react';
import { ApplicationContext } from '../../../../context/ApplicationContext';
import { useForceUpdate } from '../../../../hooks/useForceUpdate';
import { useTheme } from 'next-themes';

export interface ThemeSwitchProps {
  text: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ text, icon }) => {
  const appContext = useContext(ApplicationContext);
  const forceUpdate = useForceUpdate();
  const { setTheme, theme } = useTheme();

  const Icon = icon;

  return (
    <Menu.Item>
      {() => (
        <div className="my-1 flex items-center justify-between rounded-full px-2 py-1 hover:bg-primary hover:bg-opacity-10 dark:hover:bg-opacity-25">
          <div className="flex items-center">
            <Icon className="h-6 w-6 text-primary" />
            <span className="ml-2 text-sm font-medium text-midnight dark:text-gray-200">{text}</span>
          </div>
          <Switch
            checked={theme === 'dark'}
            onChange={(value) => {
              appContext.setIsDarkTheme(value);
              const storage = new LocalStorage();
              storage.isDarkTheme = value;
              setTheme(value ? 'dark' : 'light');
              forceUpdate();
            }}
            className={clsx(
              'relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
              {
                'bg-primary': theme === 'dark',
                'bg-primary bg-opacity-10': theme !== 'dark',
              }
            )}
          >
            <span className="sr-only">{text}</span>
            <span
              aria-hidden="true"
              className={`${theme === 'dark' ? 'translate-x-5' : 'translate-x-1'}
            pointer-events-none mt-0.5 inline-block h-3 w-3 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>
      )}
    </Menu.Item>
  );
};

export default ThemeSwitch;
