import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession } from 'next-auth/react';

export interface SettingsPageProps {}

const Settings: NextPage<SettingsPageProps> = () => {
  return (
    <>
      <Head>
        <title>Settings | Vevericka</title>
      </Head>
      <main className="flex h-screen w-screen flex-col items-center justify-center">
        <div>Settings</div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<SettingsPageProps> = async (context) => {
  const session = await getSession(context);

  if (!session || !session.user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Settings;
