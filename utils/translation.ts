import { i18n as i18nType } from 'next-i18next';

export type AvailableLanguageKey = 'en' | 'es' | 'tr';

export type AvailableLanguageName = 'English' | 'Spanish' | 'Turkish';

export interface IAvailableLanguage {
  key: AvailableLanguageKey;
  name: AvailableLanguageName;
}

export const availableLanguages: IAvailableLanguage[] = [
  {
    key: 'en',
    name: 'English',
  },
  {
    key: 'es',
    name: 'Spanish',
  },
  {
    key: 'tr',
    name: 'Turkish',
  },
];

export type Pairs<T> = keyof T;
export type Translation<T> = Record<AvailableLanguageKey, Record<Pairs<T>, string>>;

export function addResourceBundles(i18n: typeof i18nType, ns: string, resources: Record<AvailableLanguageKey, any>) {
  if (!i18n) {
    throw Error('i18n object is null');
  }

  for (const lang of availableLanguages) {
    i18n.addResourceBundle(lang.key, ns, resources[lang.key], true, true);
  }
}
