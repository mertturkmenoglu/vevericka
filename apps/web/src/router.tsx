import { createBrowserRouter } from 'react-router-dom';
import { client } from './apollo';
import { GuestRoute, ProtectedRoute } from './components';
import { bookmarksQueryDocument, postQueryDocument, profileDataQueryDocument } from './graphql';
import { postsByTagQueryDocument } from './graphql/queries/postsByTagQuery';
import {
  BookmarksPage,
  ContactPage,
  CreatePage,
  ExplorePage,
  FeedPage,
  HomePage,
  LoginPage,
  MessagesPage,
  NotFoundPage,
  NotificationsPage,
  PostPage,
  SearchPage,
  SettingsPage,
  TagPage,
  UserPage,
} from './pages';

export const router = createBrowserRouter([
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
    path: '/bookmarks',
    loader: async () => {
      const { data } = await client.query({
        query: bookmarksQueryDocument,
        variables: {
          skip: 0,
          take: 50,
        },
      });

      return data;
    },
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
    path: '/explore/:tag',
    loader: async ({ params }) => {
      const { tag } = params;

      if (!tag) {
        throw new Error('Tag is required');
      }

      const { data } = await client.query({
        query: postsByTagQueryDocument,
        variables: {
          tag,
          skip: 0,
          take: 50,
        },
      });

      return data;
    },
    errorElement: <NotFoundPage />,
    element: (
      <ProtectedRoute>
        <TagPage />
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
        query: profileDataQueryDocument,
        variables: {
          id,
          skip: 0,
          take: 50,
        },
      });

      return data;
    },
    errorElement: <NotFoundPage />,
    element: (
      <ProtectedRoute>
        <UserPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/p/:id',
    loader: async ({ params }) => {
      const { id } = params;

      if (!id) {
        throw new Error('Post ID is required');
      }

      const { data } = await client.query({
        query: postQueryDocument,
        variables: {
          id,
        },
      });

      return data;
    },
    errorElement: <NotFoundPage />,
    element: (
      <ProtectedRoute>
        <PostPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
]);
