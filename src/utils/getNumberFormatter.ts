export const getNumberFormatter = (routerLocale: string | undefined): Intl.NumberFormat => {
  const locale = routerLocale || 'en';
  return Intl.NumberFormat(locale, {
    compactDisplay: 'short',
    notation: 'compact',
    unitDisplay: 'narrow',
  });
};
