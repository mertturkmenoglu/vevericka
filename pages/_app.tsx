import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import LoginContextProvider from '../context/LoginContextProvider';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <LoginContextProvider>
      <Component {...pageProps} />
    </LoginContextProvider>
  );
};

export default appWithTranslation(MyApp);
