import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import UserPage from '@/views/UserPage.vue'
import SettingsPage from '@/views/SettingsPage.vue'
import MessagesPage from '@/views/MessagesPage.vue'
import SearchPage from '@/views/SearchPage.vue'
import PasswordResetPage from "../views/PasswordResetPage.vue"
import PostDetailPage from "@/views/PostDetailPage.vue"
import ExplorePage from "@/views/ExplorePage.vue"
import TermsPage from "@/views/TermsPage.vue"
import BookmarksPage from "@/views/BookmarksPage.vue"
import NotificationsPage from "@/views/NotificationsPage.vue"
import ContactPage from "@/views/ContactPage.vue"
import ReportPage from "@/views/ReportPage.vue"

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
        {path: '/contact', component: ContactPage},
        {path: '/report', name: 'ReportPage', component: ReportPage},

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
