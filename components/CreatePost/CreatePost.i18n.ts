import { Translation } from '@utils/index';

export const en = {
  userPicture: 'User picture',
  openAsPopup: 'Open as popup',
  textAreaPlaceholder: "Say what you must don't leave it there",
  addImageTooltip: 'Add image',
  addVideoTooltip: 'Add video',
  post: 'Post',
};

export const es = {
  userPicture: 'İmagen de usuario',
  openAsPopup: 'Abrir como ventana emergente',
  textAreaPlaceholder: 'Di lo que debes',
  addImageTooltip: 'Añadir imagen',
  addVideoTooltip: 'Añadir video',
  post: 'Correo',
};

export const tr = {
  userPicture: 'Kullanıcı fotoğrafı',
  openAsPopup: 'Ayrı pencerede aç',
  textAreaPlaceholder: 'Ne söylemek istersen',
  addImageTooltip: 'Fotoğraf ekle',
  addVideoTooltip: 'Video Ekle',
  post: 'Paylaş',
};

export const translations: Translation<typeof en> = {
  en,
  es,
  tr,
};
