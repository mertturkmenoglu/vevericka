import React, { useRef } from 'react';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider as JotaiProvider } from 'jotai';

import '@styles/globals.css';
import { ThemeProvider } from 'next-themes';

function Application({ Component, pageProps }: AppProps): JSX.Element {
  const queryClient = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          cacheTime: Infinity,
        },
      },
    })
  );

  return (
    <JotaiProvider>
      <QueryClientProvider client={queryClient.current}>
        <SessionProvider session={pageProps.session}>
          <ThemeProvider attribute="class">
            <Component {...pageProps} />
            <ReactQueryDevtools />
          </ThemeProvider>
        </SessionProvider>
      </QueryClientProvider>
    </JotaiProvider>
  );
}

export default Application;
