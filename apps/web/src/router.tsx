import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { client } from './apollo';
import { GuestRoute, Loading, ProtectedRoute } from './components';
import { bookmarksQueryDocument, postQueryDocument, profileQueryDocument } from './graphql';
import { postsByTagQueryDocument } from './graphql/queries/postsByTagQuery';

const BookmarksPage = React.lazy(() => import('./pages/bookmarks/Bookmarks'));
const ContactPage = React.lazy(() => import('./pages/contact/Contact'));
const CreatePage = React.lazy(() => import('./pages/create/Create'));
const ExplorePage = React.lazy(() => import('./pages/explore/Explore'));
const FeedPage = React.lazy(() => import('./pages/feed/Feed'));
const FollowRequestsPage = React.lazy(() => import('./pages/follow-requests/FollowRequests'));
const HomePage = React.lazy(() => import('./pages/home/Home'));
const LoginPage = React.lazy(() => import('./pages/login/Login'));
const MessagesPage = React.lazy(() => import('./pages/messages/Messages'));
const NotFoundPage = React.lazy(() => import('./pages/notfound/NotFound'));
const NotificationsPage = React.lazy(() => import('./pages/notifications/Notifications'));
const PostPage = React.lazy(() => import('./pages/post/Post'));
const SearchPage = React.lazy(() => import('./pages/search/Search'));
const SettingsPage = React.lazy(() => import('./pages/settings/Settings'));
const TagPage = React.lazy(() => import('./pages/tag/Tag'));
const UserPage = React.lazy(() => import('./pages/user/User'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <GuestRoute>
        <Suspense fallback={<Loading />}>
          <HomePage />
        </Suspense>
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
        <Suspense fallback={<Loading />}>
          <BookmarksPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/explore',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>
          <ExplorePage />
        </Suspense>
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
        <Suspense fallback={<Loading />}>
          <TagPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/feed',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>
          <FeedPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <GuestRoute>
        <Suspense fallback={<Loading />}>
          <LoginPage />
        </Suspense>
      </GuestRoute>
    ),
  },
  {
    path: '/messages',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>
          <MessagesPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/notifications',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>
          <NotificationsPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/search',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>
          <SearchPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/settings',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>
          <SettingsPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/create',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>
          <CreatePage />
        </Suspense>
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

      const { data: profileData } = await client.query({
        query: profileQueryDocument,
        variables: {
          id,
        },
      });

      return profileData;
    },
    errorElement: <NotFoundPage />,
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>
          <UserPage />
        </Suspense>
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
        <Suspense fallback={<Loading />}>
          <PostPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/contact',
    element: (
      <Suspense fallback={<Loading />}>
        <ContactPage />
      </Suspense>
    ),
  },
  {
    path: '/follow-requests',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>
          <FollowRequestsPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
]);
