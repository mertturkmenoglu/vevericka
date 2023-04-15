import { SearchPage } from './pages/search';
import { GuestRoute, ProtectedRoute } from './components';
import {
  FeedPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  SettingsPage,
  NotificationsPage,
  MessagesPage,
  CreatePage,
  UserPage,
} from './pages';
import { createBrowserRouter } from 'react-router-dom';
import { client } from './apollo';
import { meQueryDocument } from './graphql/queries/meQuery';

export const router = createBrowserRouter([
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
  {
    path: '/create',
    element: (
      <ProtectedRoute>
        <CreatePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/u/:id',
    loader: async () => {
      const { data } = await client.query({
        query: meQueryDocument,
      });

      return data;
    },
    element: (
      <ProtectedRoute>
        <UserPage />
      </ProtectedRoute>
    ),
  },
]);
