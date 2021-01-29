import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/views/HomePage'
import LoginPage from '@/views/LoginPage'
import RegisterPage from '@/views/RegisterPage'
import UserPage from '@/views/UserPage'
import SettingsPage from '@/views/SettingsPage'
import MessagesPage from '@/views/MessagesPage'
import SearchPage from '@/views/SearchPage'
import PasswordResetPage from "../views/PasswordResetPage";
import PostDetailPage from "@/views/PostDetailPage";

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/password', component: PasswordResetPage },
    { path: '/user/:username', name: 'UserPage', component: UserPage },
    { path: '/settings', component: SettingsPage },
    { path: '/search', component: SearchPage },
    { path: '/messages', component: MessagesPage },
    { path: '/post/:id', name: 'PostDetailPage', component: PostDetailPage },

    // Otherwise redirect to HomePage
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/password'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (loggedIn && !authRequired) {
    return next('/');
  }

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})
