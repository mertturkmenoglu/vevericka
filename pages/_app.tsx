import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import LoginContextProvider from '../context/LoginContextProvider';
import RegisterContextProvider from '../context/RegisterContextProvider';
import { SessionProvider } from 'next-auth/react';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <LoginContextProvider>
        <RegisterContextProvider>
          <Component {...pageProps} />
        </RegisterContextProvider>
      </LoginContextProvider>
    </SessionProvider>
  );
};

export default appWithTranslation(MyApp);
