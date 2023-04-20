import { useCallback } from 'react';

export function useGridRoundStyles() {
  const fn = useCallback((len: number, index: number) => {
    if (len === 1) {
      return 'rounded';
    }

    if (len === 2) {
      if (index === 0) {
        return 'rounded-l';
      } else {
        return 'rounded-r';
      }
    }

    if (len === 3) {
      if (index === 0) {
        return 'rounded-l';
      } else if (index === 1) {
        return '';
      } else {
        return 'rounded-r';
      }
    }

    if (len === 4) {
      if (index === 0) {
        return 'rounded-tl';
      } else if (index === 1) {
        return 'rounded-tr';
      } else if (index === 2) {
        return 'rounded-bl';
      } else {
        return 'rounded-br';
      }
    }

    return '';
  }, []);

  return fn;
}
