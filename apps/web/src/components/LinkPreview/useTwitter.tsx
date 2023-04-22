import { isTwitter } from '../../lib';

export function useTwitter(url: string) {
  return {
    isTwitter: isTwitter(url),
  };
}
