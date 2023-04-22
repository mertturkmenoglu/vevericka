import { hashtagRegex, usernameRegex } from './regex';
import { commonClassNames } from './text-styles';

export function detectHashtags(text: string): string {
  return text.replace(
    hashtagRegex,
    (hashtag) => `<a href='/explore/${hashtag.substring(1)}' class='${commonClassNames}'>${hashtag}</a>`
  );
}

export function detectUsernames(text: string): string {
  return text.replace(
    usernameRegex,
    (username) => `<a href='/u/${username.substring(1)}' class='${commonClassNames}'>${username}</a>`
  );
}

export function formatWhitespace(text: string): string {
  return text.replace(/\n/gi, '<br />');
}
