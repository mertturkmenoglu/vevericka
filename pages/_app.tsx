import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import LoginContextProvider from '../context/LoginContextProvider';
import RegisterContextProvider from '../context/RegisterContextProvider';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <LoginContextProvider>
      <RegisterContextProvider>
        <Component {...pageProps} />
      </RegisterContextProvider>
    </LoginContextProvider>
  );
};

export default appWithTranslation(MyApp);
