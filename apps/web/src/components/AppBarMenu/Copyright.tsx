import { useMemo } from 'react';

function Copyright(): JSX.Element {
  const year = useMemo(() => {
    return new Date().getFullYear();
  }, []);

  return (
    <div className="flex items-center space-x-1 px-4 py-1 text-xs">
      <span className="text-midnight dark:text-neutral-400">Vevericka</span>
      <span className="text-berry">&copy;</span>
      <span className="text-midnight dark:text-neutral-400">{year}</span>
    </div>
  );
}

export default Copyright;
