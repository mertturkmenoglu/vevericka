import { Dispatch, SetStateAction, useCallback, useState } from 'react';

export type Theme = 'light' | 'dark';

export function useTheme(): [Theme, Dispatch<SetStateAction<Theme>>] {
  const [theme, setTheme] = useState<Theme>(() => {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  });

  const updateTheme = useCallback(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, [theme]);

  return [theme, updateTheme];
}
