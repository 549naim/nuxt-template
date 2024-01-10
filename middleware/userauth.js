import { useUserStore } from "~~/store/userInfo.js";
let store = useUserStore();

export default defineNuxtRouteMiddleware((to, from) => {
    let isAuth = store.isAuth;
    let isAdmin = store.isAdmin;

    if (isAuth && isAdmin) {
        return navigateTo('/admin/AdminDashboard', { replace: true });
    }

    if (isAuth) {
        return navigateTo('/user', { replace: true });
    }

})