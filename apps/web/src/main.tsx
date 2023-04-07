import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import './i18n';
import { RouterProvider } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { router } from './router';

const queryClient = new QueryClient();
const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_BASE_URL + '/graphql',
  cache: new InMemoryCache(),
  credentials: 'include',
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={apolloClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </ApolloProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
