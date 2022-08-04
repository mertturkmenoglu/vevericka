import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import '@styles/globals.css';
import { ThemeProvider } from 'next-themes';

function Application({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <SessionProvider session={pageProps.session}>
        <ThemeProvider attribute="class">
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </ThemeProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default Application;