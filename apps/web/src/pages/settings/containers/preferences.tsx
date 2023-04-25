import { Classic } from '@theme-toggles/react';
import '@theme-toggles/react/css/Classic.css';
import 'react-toastify/dist/ReactToastify.css';
import { Tooltip } from '../../../components';
import { useTheme } from '../../../hooks';

function PreferencesContainer(): JSX.Element {
  const [theme, setTheme] = useTheme();

  return (
    <section className="mt-8 w-1/2 space-y-8">
      <button
        className="my-1 flex w-full items-center rounded px-2 py-1 transition-all"
        onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
      >
        <Classic
          duration={750}
          toggled={theme === 'dark'}
          className="text-4xl text-midnight dark:text-white"
        />
        <span className="ml-2 text-sm font-medium text-midnight dark:text-white">Change Theme</span>
      </button>

      <Tooltip
        tooltip={<>You can't change your display language yet.</>}
        tooltipConfig={{
          side: 'bottom',
        }}
      >
        <div className="flex items-end space-x-2">
          <div className="text-midnight dark:text-white">Display language: </div>
          <input
            type="text"
            value="English"
            className="bg-transparent disabled:text-neutral-400"
            disabled
          />
        </div>
      </Tooltip>
    </section>
  );
}

export default PreferencesContainer;
