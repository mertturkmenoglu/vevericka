import Link from 'next/link';
import { appBarIcons } from '../data/appBarIcons';
import clsx from 'clsx';
import Tooltip from '../../Tooltip';
import { useTranslation } from 'next-i18next';
import { addResourceBundles } from '../../../utils/addResourceBundles';
import constants from '../AppBar.constants';
import translations from '../AppBar.i18n';

export interface IconGroupProps {}

const IconGroup: React.FC<IconGroupProps> = () => {
  const { t, i18n } = useTranslation(constants.I18N_NS);
  addResourceBundles(i18n, constants.I18N_NS, translations);
  return (
    <>
      {appBarIcons.map(({ Icon, href, isMobileOnly, tooltip }) => (
        <Tooltip position="bottom" text={t(tooltip)} key={href}>
          <Link href={href}>
            <a>
              <Icon className={clsx('app-bar-icon', { 'sm:hidden': isMobileOnly })} />
            </a>
          </Link>
        </Tooltip>
      ))}
    </>
  );
};

export default IconGroup;
