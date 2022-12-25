import React from 'react';
import ReactDOM from 'react-dom/client';
import { createReactRouter, createRouteConfig, Outlet, RouterProvider } from '@tanstack/react-router';
import './index.css';
import { FeedPage, HomePage } from './pages';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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

const queryClient = new QueryClient();
const TANSTACK_DEVTOOLS: 'router' | 'query' = 'query';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {TANSTACK_DEVTOOLS === 'query' ? <ReactQueryDevtools /> : <TanStackRouterDevtools router={router} />}
    </QueryClientProvider>
  </React.StrictMode>
);
