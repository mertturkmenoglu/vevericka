import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: HomePage
        },
        {
            path: '/login',
            component: LoginPage
        },
        {
            path: '/register',
            component: () => import(/* webpackChunkName: "register" */ '../views/RegisterPage.vue')
        },
        {
            path: '/password',
            component: () => import(/* webpackChunkName: "password_reset" */ '../views/PasswordResetPage.vue')
        },
        {
            path: '/user/:username',
            name: 'UserPage',
            component: () => import(/* webpackChunkName: "user" */ '../views/UserPage.vue')
        },
        {
            path: '/settings',
            component: () => import(/* webpackChunkName: "settings" */ '../views/SettingsPage.vue')
        },
        {
            path: '/search',
            component: () => import(/* webpackChunkName: "search" */ '../views/SearchPage.vue')
        },
        {
            path: '/messages',
            component: () => import(/* webpackChunkName: "user" */ '../views/MessagesPage.vue')
        },
        {
            path: '/post/:id',
            name: 'PostDetailPage',
            component: () => import(/* webpackChunkName: "post_detail" */ '../views/PostDetailPage.vue')
        },
        {
            path: '/explore',
            component: () => import(/* webpackChunkName: "explore" */ '../views/ExplorePage.vue')
        },
        {
            path: '/bookmarks',
            component: () => import(/* webpackChunkName: "bookmarks" */ '../views/BookmarksPage.vue')
        },
        {
            path: '/notifications',
            component: () => import(/* webpackChunkName: "notifications" */ '../views/NotificationsPage.vue')
        },
        {
            path: '/terms',
            component: () => import(/* webpackChunkName: "terms" */ '../views/TermsPage.vue')
        },
        {
            path: '/contact',
            component: () => import(/* webpackChunkName: "contact" */ '../views/ContactPage.vue')
        },
        {
            path: '/report',
            name: 'ReportPage',
            component: () => import(/* webpackChunkName: "report" */ '../views/ReportPage.vue')
        },

        // Otherwise redirect to HomePage
        {path: '*', redirect: '/'}
    ]
});

router.beforeEach((to, _from, next) => {
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

    next();
})
