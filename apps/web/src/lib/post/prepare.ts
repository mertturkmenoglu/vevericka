import { detectHashtags, detectUsernames } from './detect-entities';
import { linkify } from './linkify';

export function prepare(text: string): string {
  return linkify(detectUsernames(detectHashtags(text)));
}
