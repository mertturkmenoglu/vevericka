import { useState } from 'react';

/**
 * Force trigger a re-render of a component
 */
export const useForceUpdate = () => {
  const [_value, setValue] = useState(0);
  return () => setValue((prev) => prev + 1);
};
