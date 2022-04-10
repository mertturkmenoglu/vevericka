import { AvailableLanguageKey } from './AvailableLanguages';

export type Pairs<T> = keyof T;
export type Translation<T> = Record<AvailableLanguageKey, Record<Pairs<T>, string>>;
