import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

export interface Language {
  key: string;
  name: string;
}

export interface UseLanguages {
  langs: Language[];
}

function useLanguages(): UseLanguages {
  const { t } = useTranslation('languages');
  const keys = ['en', 'tr'];

  const [langs] = useState<UseLanguages>({
    langs: keys.map((key) => ({
      key,
      name: t(key),
    })),
  });

  return langs;
}

export default useLanguages;
