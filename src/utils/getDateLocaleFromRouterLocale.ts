import { Locale } from 'date-fns';
import { enUS, es, tr } from 'date-fns/locale';

export const getDateLocaleFromRouterLocale = (routerLocale: string | undefined): Locale => {
  if (routerLocale === 'tr') {
    return tr;
  }

  if (routerLocale === 'es') {
    return es;
  }

  return enUS;
};
