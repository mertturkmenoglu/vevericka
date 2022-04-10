import { useTranslation } from 'next-i18next';
import translations from '../AppBar.i18n';
import constants from '../AppBar.constants';
import { addResourceBundles } from '@utils/index';

export interface AppNameProps {}

const AppName: React.FC<AppNameProps> = () => {
  const { t, i18n } = useTranslation(constants.I18N_NS);
  addResourceBundles(i18n, constants.I18N_NS, translations);

  return (
    <div className="font-lato ml-4 mt-1 hidden text-xl text-midnight antialiased dark:text-white sm:block">
      {t('appName')}
    </div>
  );
};

export default AppName;
