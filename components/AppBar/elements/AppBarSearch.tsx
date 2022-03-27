import { useTranslation } from 'next-i18next';
import translations from '../AppBar.i18n';
import constants from '../AppBar.constants';
import { addResourceBundles } from '../../../utils/addResourceBundles';

export interface AppBarSearchProps {}

const AppBarSearch: React.FC<AppBarSearchProps> = () => {
  const { t, i18n } = useTranslation(constants.I18N_NS);
  addResourceBundles(i18n, constants.I18N_NS, translations);

  return (
    <input
      type="text"
      placeholder={t('search.placeholder')}
      className={`hidden rounded-full bg-gray-100 px-4 py-1 text-gray-400 placeholder:text-gray-400 focus:outline-none dark:bg-neutral-700 
      dark:text-gray-200 dark:placeholder:text-gray-200  sm:block`}
    />
  );
};

export default AppBarSearch;
