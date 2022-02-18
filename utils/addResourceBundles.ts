import { i18n as i18nType } from 'next-i18next';
import { AvailableLanguageKey, availableLanguages } from './AvailableLanguages';

export function addResourceBundles(
  i18n: typeof i18nType,
  ns: string,
  resources: Record<AvailableLanguageKey, any>,
) {
  if (!i18n) {
    throw Error('i18n object is null');
  }

  for (const lang of availableLanguages) {
    i18n.addResourceBundle(lang.key, ns, resources[lang.key], true, true);
  }
}