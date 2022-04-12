import { useContext, useMemo } from 'react';
import { ApplicationContext } from '@context/ApplicationContext';
import { LocalStorage, availableLanguages } from '@utils/index';
import { useTheme } from 'next-themes';
import { useTranslation } from 'next-i18next';
import { SunIcon } from '@heroicons/react/outline';
import Cookies from 'universal-cookie';
import Tooltip from '@components/Tooltip';
import constants from './LandingAppBar.constants';
import AppIcon from './elements/AppIcon';
import LandingCustomLink from './elements/LandingCustomLink';
import ChangeThemeButton from './elements/ChangeLanguage/ChangeThemeButton';
import ChangeLanguage from './elements/ChangeLanguage';

export interface LandingAppBarProps {}

const LandingAppBar: React.FC<LandingAppBarProps> = () => {
  const appContext = useContext(ApplicationContext);
  const { setTheme } = useTheme();
  const { t } = useTranslation('landing');

  const beforeRouteLeave = () => {
    document.querySelector('body')?.classList?.remove(constants.BODY_CLASSNAME);
  };

  const changeTheme = () => {
    const value = appContext.isDarkTheme;
    appContext.setIsDarkTheme((prev) => !prev);
    const storage = new LocalStorage();
    storage.isDarkTheme = !value;
    setTheme(!value ? 'dark' : 'light');
  };

  const themeDescriptionText = useMemo(() => {
    return appContext.isDarkTheme ? t('themeIconAlt.dark') : t('themeIconAlt.light');
  }, [appContext.isDarkTheme, t]);

  return (
    <nav className="flex items-center justify-between bg-white dark:bg-neutral-800">
      <AppIcon beforeRouteLeave={beforeRouteLeave} href="/" />

      <div className="flex items-center">
        <Tooltip position="bottom" text={t('langDescription')}>
          <ChangeLanguage
            altText={t('langDescription')}
            languages={availableLanguages}
            onItemClick={(language) => {
              const cookies = new Cookies();
              cookies.set('NEXT_LOCALE', language.key);
              window.location.href = '/';
            }}
          />
        </Tooltip>

        <Tooltip position="bottom" text={themeDescriptionText}>
          <ChangeThemeButton
            onClick={changeTheme}
            altText={themeDescriptionText}
            icon={<SunIcon className="h-12 w-12 text-primary dark:text-white sm:h-8 sm:w-8" />}
          />
        </Tooltip>

        <LandingCustomLink href="/login" text={t('login')} beforeRouteLeave={beforeRouteLeave} />

        <LandingCustomLink href="/register" text={t('register')} beforeRouteLeave={beforeRouteLeave} variant="dark" />
      </div>
    </nav>
  );
};

export default LandingAppBar;
