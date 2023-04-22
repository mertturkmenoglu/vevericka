import { urlRegex } from './regex';

export function getFirstUrl(text: string): string | null {
  const matches = text.match(urlRegex);
  return matches ? matches[0] : null;
}
