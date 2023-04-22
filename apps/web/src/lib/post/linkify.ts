import { urlRegex } from './regex';
import { commonClassNames } from './text-styles';

export function linkify(text: string): string {
  return text.replace(urlRegex, (url) => `<a href='${url}' class='${commonClassNames}'>${url}</a>`);
}
