import { LinkPreviewQuery } from '../../generated/graphql';

export function getValidUrl(url?: string | null | undefined): string {
  if (!url) {
    return '#';
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  return `https://${url}`;
}

export function getValidDescription(data: LinkPreviewQuery['linkPreview']): string {
  if (data.description) {
    return data.description;
  }

  if (data.url) {
    return data.url;
  }

  return '';
}
