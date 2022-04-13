import { Locale } from 'date-fns';
import { enUS, es, tr } from 'date-fns/locale';

export const getUrl = (): string => {
  return process.env.NODE_ENV === 'production' ? 'https://vevericka.app' : 'http://localhost:3000';
};

export const getDateLocaleFromRouterLocale = (routerLocale: string | undefined): Locale => {
  if (routerLocale === 'tr') {
    return tr;
  }

  if (routerLocale === 'es') {
    return es;
  }

  return enUS;
};

export const getNumberFormatter = (routerLocale: string | undefined): Intl.NumberFormat => {
  const locale = routerLocale || 'en';
  return Intl.NumberFormat(locale, {
    compactDisplay: 'short',
    notation: 'compact',
    unitDisplay: 'narrow',
  });
};
