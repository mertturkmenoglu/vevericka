import Vue from 'vue';
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import LoginPage from '@/views/LoginPage.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/register',
    component: (): Promise<typeof import('@/views/RegisterPage.vue')> => import(/* webpackChunkName: "register" */ '../views/RegisterPage.vue'),
  },
  {
    path: '/password',
    component: (): Promise<typeof import('@/views/PasswordResetPage.vue')> => import(/* webpackChunkName: "password_reset" */ '../views/PasswordResetPage.vue'),
  },
  {
    path: '/user/:username',
    name: 'UserPage',
    component: (): Promise<typeof import('@/views/UserPage.vue')> => import(/* webpackChunkName: "user" */ '../views/UserPage.vue'),
  },
  {
    path: '/settings',
    component: (): Promise<typeof import('@/views/SettingsPage.vue')> => import(/* webpackChunkName: "settings" */ '../views/SettingsPage.vue'),
  },
  {
    path: '/search',
    component: (): Promise<typeof import('@/views/SearchPage.vue')> => import(/* webpackChunkName: "search" */ '../views/SearchPage.vue'),
  },
  {
    path: '/messages',
    component: (): Promise<typeof import('@/views/MessagesPage.vue')> => import(/* webpackChunkName: "user" */ '../views/MessagesPage.vue'),
  },
  {
    path: '/post/:id',
    name: 'PostDetailPage',
    component: (): Promise<typeof import('@/views/PostDetailPage.vue')> => import(/* webpackChunkName: "post_detail" */ '../views/PostDetailPage.vue'),
  },
  {
    path: '/explore',
    component: (): Promise<typeof import('@/views/ExplorePage.vue')> => import(/* webpackChunkName: "explore" */ '../views/ExplorePage.vue'),
  },
  {
    path: '/explore/:tag',
    component: (): Promise<typeof import('@/views/ExplorePage.vue')> => import(/* webpackChunkName: "exploreTagPage" */ '../views/ExplorePage.vue'),
  },
  {
    path: '/bookmarks',
    component: (): Promise<typeof import('@/views/BookmarksPage.vue')> => import(/* webpackChunkName: "bookmarks" */ '../views/BookmarksPage.vue'),
  },
  {
    path: '/notifications',
    component: (): Promise<typeof import('@/views/NotificationsPage.vue')> => import(/* webpackChunkName: "notifications" */ '../views/NotificationsPage.vue'),
  },
  {
    path: '/terms',
    component: (): Promise<typeof import('@/views/TermsPage.vue')> => import(/* webpackChunkName: "terms" */ '../views/TermsPage.vue'),
  },
  {
    path: '/contact',
    component: (): Promise<typeof import('@/views/ContactPage.vue')> => import(/* webpackChunkName: "contact" */ '../views/ContactPage.vue'),
  },
  {
    path: '/report',
    name: 'ReportPage',
    component: (): Promise<typeof import('@/views/ReportPage.vue')> => import(/* webpackChunkName: "report" */ '../views/ReportPage.vue'),
  },

  // Otherwise redirect to HomePage
  { path: '*', redirect: '/' },
];

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to: Route, _from: Route, next: NavigationGuardNext<Vue>) => {
  const publicPages = ['/login', '/register', '/password', '/terms'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('vev-token');

  if (to.path === '/terms') {
    return next();
  }

  if (loggedIn && !authRequired) {
    return next('/');
  }

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  return next();
});
