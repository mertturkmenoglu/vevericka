import { useTranslation } from 'next-i18next';
import translations from '../AppBar.i18n';
import constants from '../AppBar.constants';
import { addResourceBundles } from '../../../utils/addResourceBundles';

export interface AppNameProps {

}

const AppName: React.FC<AppNameProps> = () => {
  const { t, i18n } = useTranslation(constants.I18N_NS);
  addResourceBundles(i18n, constants.I18N_NS, translations);

  return (
    <div className='text-xl text-midnight font-lato antialiased ml-4 mt-1 hidden sm:block dark:text-white'>
      {t('appName')}
    </div>
  );
};

export default AppName;
