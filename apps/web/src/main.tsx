import React from 'react';
import ReactDOM from 'react-dom/client';
import { createReactRouter, createRouteConfig, Outlet, RouterProvider } from '@tanstack/react-router';
import './index.css';
import { FeedPage, HomePage } from './pages';

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null // Render nothing in production
  : React.lazy(() =>
      // Lazy load in development
      import('@tanstack/react-router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      }))
    );

const rootRoute = createRouteConfig({
  component: () => (
    <>
      <Outlet />
    </>
  ),
});

const homeRoute = rootRoute.createRoute({
  path: '/',
  component: HomePage,
});

const feedRoute = rootRoute.createRoute({
  path: '/feed',
  component: FeedPage,
});

const routeConfig = rootRoute.addChildren([homeRoute, feedRoute]);

const router = createReactRouter({ routeConfig });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <TanStackRouterDevtools
      router={router}
      initialIsOpen={false}
    />
  </React.StrictMode>
);
