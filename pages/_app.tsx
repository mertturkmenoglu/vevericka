import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import LoginContextProvider from '../context/LoginContextProvider';
import RegisterContextProvider from '../context/RegisterContextProvider';
import ApplicationContextProvider from '../context/ApplicationContextProvider';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApplicationContextProvider>
      <ThemeProvider attribute="class">
        <SessionProvider session={pageProps.session}>
          <LoginContextProvider>
            <RegisterContextProvider>
              <Component {...pageProps} />
            </RegisterContextProvider>
          </LoginContextProvider>
        </SessionProvider>
      </ThemeProvider>
    </ApplicationContextProvider>
  );
};

export default appWithTranslation(MyApp);
