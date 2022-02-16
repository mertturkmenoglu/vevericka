import { useTranslation } from 'next-i18next';
import { en, tr } from './i18n';

export interface AppBarSearchProps {

}

const AppBarSearch: React.FC<AppBarSearchProps> = () => {
  const { t, i18n } = useTranslation('app-bar');

  i18n.addResourceBundle('en', 'app-bar', en, true, true);
  i18n.addResourceBundle('tr', 'app-bar', tr, true, true);

  return (
    <input
      type="text"
      placeholder={t('search.placeholder')}
      className={`hidden sm:block bg-gray-100 dark:bg-neutral-700 dark:placeholder:text-gray-200 
      px-4 py-1 rounded-full placeholder:text-gray-400 focus:outline-none text-gray-400 dark:text-gray-200`}
    />
  );
};

export default AppBarSearch;
