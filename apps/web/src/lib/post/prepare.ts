import { detectHashtags, detectUsernames, formatWhitespace } from './detect-entities';
import { linkify } from './linkify';

export function prepare(text: string): string {
  return linkify(detectUsernames(detectHashtags(formatWhitespace(text))));
}
