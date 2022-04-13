import { Translation } from '@utils/index';

export const en = {
  posts: 'posts',
  follow: 'Follow',
  more: 'More',
  exploreTitle: 'Explore',
  peopleToFollow: 'People to follow',
};

export const es = {
  posts: 'correos',
  follow: 'Seguir',
  more: 'Más',
  exploreTitle: 'Explorar',
  peopleToFollow: 'Personas a seguir',
};

export const tr = {
  posts: 'paylaşım',
  follow: 'Takip et',
  more: 'Daha fazla',
  exploreTitle: 'Keşfet',
  peopleToFollow: 'Takip edebileceğin kişiler',
};

export const translations: Translation<typeof en> = {
  en,
  es,
  tr,
};
