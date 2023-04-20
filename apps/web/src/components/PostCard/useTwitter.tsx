const regex = /http(?:s)?:\/\/(?:www\.)?twitter\.com/;

export function useTwitter(url: string) {
  return {
    isTwitter: regex.test(url),
  };
}
