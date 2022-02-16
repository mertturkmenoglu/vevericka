import { useTranslation } from 'next-i18next';
import { en, tr } from './i18n';

export interface AppNameProps {

}

const AppName: React.FC<AppNameProps> = () => {
  const { t, i18n } = useTranslation('app-bar');

  i18n.addResourceBundle('en', 'app-bar', en, true, true);
  i18n.addResourceBundle('tr', 'app-bar', tr, true, true);

  return (
    <div className="text-xl text-midnight font-lato antialiased ml-4 mt-1 hidden sm:block dark:text-white">
      {t('appName')}
    </div>
  );
};

export default AppName;
