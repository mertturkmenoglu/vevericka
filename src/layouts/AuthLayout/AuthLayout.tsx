import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import useTranslation from 'next-translate/useTranslation';
import { ArrowLeftIcon } from '@heroicons/react/solid';

export interface AuthLayoutProps {
  pageTitle: string;
  formTitle: string;
  children: React.ReactNode;
}

const AuthLayout = ({ pageTitle, formTitle, children }: AuthLayoutProps) => {
  const { t } = useTranslation('auth');

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <div className="relative flex h-1/2 w-full flex-col items-center justify-center bg-midnight text-white lg:h-full lg:w-8/12">
        <Link href="/">
          <a className="absolute top-4 left-4 flex items-center justify-center hover:underline">
            <ArrowLeftIcon className="h-6 w-6 text-white" />
            <span className="ml-2">{t('goHome')}</span>
          </a>
        </Link>
        <Image
          src="/assets/icon_white.svg"
          width={128}
          height={128}
          alt={t('logoAlt')}
        />
        <h1 className="mt-8 text-6xl font-thin">{t('appName')}</h1>
        <h2 className="mt-4 text-center font-medium uppercase tracking-wide">{t('subtitle')}</h2>
      </div>

      <div className="flex h-1/2 w-full flex-col items-center justify-center bg-white dark:bg-neutral-800 lg:h-full lg:w-4/12">
        <div className="flex w-3/4 flex-col items-center justify-center bg-white text-primary dark:bg-neutral-800 md:w-2/4 lg:w-3/4 xl:w-2/4">
          <h3 className="mt-16 text-2xl font-normal text-midnight dark:text-primary sm:mt-0 sm:text-3xl">
            {formTitle}
          </h3>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
