import { Classic } from '@theme-toggles/react';
import '@theme-toggles/react/css/Classic.css';
import React from 'react';
import { useTheme } from '../../hooks';

function ThemeToggle(): JSX.Element {
  const [theme, setTheme] = useTheme();

  return (
    <button
      className="group my-1 flex w-full items-center rounded px-2 py-1 transition-all hover:bg-midnight dark:hover:bg-neutral-600"
      onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
    >
      <Classic
        duration={750}
        toggled={theme === 'dark'}
        className="ml-0.5 h-6 w-6 text-midnight group-hover:text-white dark:text-white"
      />
      <span className="ml-0.5 text-sm font-medium text-midnight group-hover:text-white dark:text-white">
        Change Theme
      </span>
    </button>
  );
}

export default ThemeToggle;
