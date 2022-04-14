import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { addResourceBundles } from '@utils/index';
import constants from '../AppBar.constants';
import translations from '../AppBar.i18n';

export interface AppBarLogoProps {}

const AppBarLogo: React.FC<AppBarLogoProps> = () => {
  const { t, i18n } = useTranslation(constants.I18N_NS);
  addResourceBundles(i18n, constants.I18N_NS, translations);

  return <Image src="/assets/icon_primary.svg" width={32} height={32} alt={t('appIcon.alt')} />;
};

export default AppBarLogo;
