import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-hooks';
import ApplicationContextProvider from '@context/ApplicationContextProvider';
import RegisterContextProvider from '../context/RegisterContextProvider';
import LoginContextProvider from '../context/LoginContextProvider';

const queryClient = new QueryClient();
const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY,
);

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApplicationContextProvider>
      <ThemeProvider attribute="class">
        <QueryClientProvider client={queryClient}>
          <SessionProvider session={pageProps.session}>
            <InstantSearch searchClient={searchClient} indexName="USER">
              <LoginContextProvider>
                <RegisterContextProvider>
                  <Component {...pageProps} />
                  <ToastContainer />
                  <ReactQueryDevtools initialIsOpen={false} />
                </RegisterContextProvider>
              </LoginContextProvider>
            </InstantSearch>
          </SessionProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ApplicationContextProvider>
  );
};

export default appWithTranslation(MyApp);
