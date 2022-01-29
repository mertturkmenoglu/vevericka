import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import LoginContextProvider from '../context/LoginContextProvider';
import RegisterContextProvider from '../context/RegisterContextProvider';
import ApplicationContextProvider from '../context/ApplicationContextProvider';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { ToastContainer } from 'react-toastify';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApplicationContextProvider>
      <ThemeProvider attribute="class">
        <SessionProvider session={pageProps.session}>
          <LoginContextProvider>
            <RegisterContextProvider>
              <Component {...pageProps} />
              <ToastContainer />
            </RegisterContextProvider>
          </LoginContextProvider>
        </SessionProvider>
      </ThemeProvider>
    </ApplicationContextProvider>
  );
};

export default appWithTranslation(MyApp);
