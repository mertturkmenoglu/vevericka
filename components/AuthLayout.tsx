import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Image from 'next/image';

export interface AuthLayoutProps {
  pageTitle: string;
  formTitle: string;
  children: React.ReactNode;
}

const AuthLayout = ({ pageTitle, formTitle, children }: AuthLayoutProps) => {
  const { t } = useTranslation('auth');

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <div className="w-full lg:w-8/12 bg-midnight text-white h-1/2 lg:h-full flex flex-col justify-center items-center">
        <Image
          src="/assets/icon_white.svg"
          width={256}
          height={256}
          alt={t('logoAlt')}
        />
        <h1 className="mt-8 font-thin text-6xl">{t('appName')}</h1>
        <h2 className="mt-4 uppercase tracking-wide font-medium text-center">
          {t('subtitle')}
        </h2>
      </div>

      <div className="w-full lg:w-4/12 h-1/2 lg:h-full flex flex-col items-center justify-center bg-white dark:bg-neutral-800">
        <div className="w-3/4 md:w-2/4 lg:w-3/4 xl:w-2/4 bg-white text-primary flex flex-col items-center justify-center dark:bg-neutral-800">
          <div className="font-normal text-3xl text-midnight">{formTitle}</div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
