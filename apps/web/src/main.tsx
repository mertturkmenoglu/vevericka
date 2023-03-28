import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { FeedPage, HomePage, LoginPage, NotFoundPage, SettingsPage, NotificationsPage, MessagesPage } from './pages';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import './i18n';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SearchPage } from './pages/search';
import { GuestRoute, ProtectedRoute } from './components';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const router = createBrowserRouter([
  {
    path: '/feed',
    element: (
      <ProtectedRoute>
        <FeedPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/',
    element: (
      <GuestRoute>
        <HomePage />
      </GuestRoute>
    ),
    errorElement: <NotFoundPage />,
  },
  {
    path: '/login',
    element: (
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    ),
  },
  {
    path: '/messages',
    element: (
      <ProtectedRoute>
        <MessagesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/notifications',
    element: (
      <ProtectedRoute>
        <NotificationsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/search',
    element: (
      <ProtectedRoute>
        <SearchPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/settings',
    element: (
      <ProtectedRoute>
        <SettingsPage />
      </ProtectedRoute>
    ),
  },
]);

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
