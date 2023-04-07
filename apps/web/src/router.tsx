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
} from './pages';
import { createBrowserRouter } from 'react-router-dom';

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
]);
