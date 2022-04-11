import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import AppBar from '@components/AppBar';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import clsx from 'clsx';

export interface ReportPageProps {
  reportType: string | string[];
}

const ReportPage: NextPage<ReportPageProps> = ({ reportType }) => {
  return (
    <>
      <Head>
        <title>Report | Vevericka </title>
      </Head>
      <main className={clsx('mx-4 mt-4 sm:mx-auto', 'rounded-md', ' bg-white dark:bg-neutral-800', 'md:w-2/3')}>
        <span className="text-primary">{reportType}</span>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ReportPageProps> = async (context) => {
  const reportType = context.query.type || 'none';

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['auth', 'login'])),
      reportType,
    },
  };
};

export default ReportPage;
