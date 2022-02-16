import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { en, tr } from './i18n';

export interface AppBarLogoProps {

}

const AppBarLogo: React.FC<AppBarLogoProps> = () => {
  const { t, i18n } = useTranslation('app-bar');

  i18n.addResourceBundle('en', 'app-bar', en, true, true);
  i18n.addResourceBundle('tr', 'app-bar', tr, true, true);

  return (
    <Image
      src="/assets/icon_primary.svg"
      width={32}
      height={32}
      alt={t('appIcon.alt')}
    />
  );
};

export default AppBarLogo;
