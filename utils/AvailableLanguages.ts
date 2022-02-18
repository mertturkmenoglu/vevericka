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
