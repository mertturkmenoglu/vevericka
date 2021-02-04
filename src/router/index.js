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
import ExplorePage from "@/views/ExplorePage";
import TermsPage from "@/views/TermsPage";
import BookmarksPage from "@/views/BookmarksPage";
import NotificationsPage from "@/views/NotificationsPage";

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {path: '/', component: HomePage},
        {path: '/login', component: LoginPage},
        {path: '/register', component: RegisterPage},
        {path: '/password', component: PasswordResetPage},
        {path: '/user/:username', name: 'UserPage', component: UserPage},
        {path: '/settings', component: SettingsPage},
        {path: '/search', component: SearchPage},
        {path: '/messages', component: MessagesPage},
        {path: '/post/:id', name: 'PostDetailPage', component: PostDetailPage},
        {path: '/explore', component: ExplorePage},
        {path: '/bookmarks', component: BookmarksPage},
        {path: '/notifications', component: NotificationsPage},
        {path: '/terms', component: TermsPage},

        // Otherwise redirect to HomePage
        {path: '*', redirect: '/'}
    ]
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/password', '/terms'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    if (to.path === '/terms') {
        return next();
    }

    if (loggedIn && !authRequired) {
        return next('/');
    }

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
})
