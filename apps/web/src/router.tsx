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
  BookmarksPage,
  ExplorePage,
} from './pages';
import { createBrowserRouter } from 'react-router-dom';
import { client } from './apollo';
import { userQueryDocument } from './graphql';

export const router = createBrowserRouter([
  {
    path: '/bookmarks',
    element: (
      <ProtectedRoute>
        <BookmarksPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/explore',
    element: (
      <ProtectedRoute>
        <ExplorePage />
      </ProtectedRoute>
    ),
  },
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
    loader: async ({ params }) => {
      const { id } = params;

      if (!id) {
        throw new Error('User ID is required');
      }

      const { data } = await client.query({
        query: userQueryDocument,
        variables: {
          id,
        },
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
