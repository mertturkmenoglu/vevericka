import { useMemo } from 'react';

const Copyright: React.FC = () => {
  const year = useMemo(() => {
    return new Date().getFullYear();
  }, []);

  return (
    <div className="flex items-center space-x-1 px-4 py-1 text-sm">
      <span className="text-midnight dark:text-gray-200">Vevericka</span>
      <span className="text-primary">&copy;</span>
      <span className="text-midnight dark:text-gray-200">{year}</span>
    </div>
  );
};

export default Copyright;
