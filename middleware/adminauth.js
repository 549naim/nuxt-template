import { useUserStore } from "~~/store/userInfo.js";
let store = useUserStore();

export default defineNuxtRouteMiddleware((to, from) => {
    let isAuth = store.isAuth;
    let isAdmin = store.isAdmin;
    if (!isAuth) {
        return navigateTo('/login', { replace: true });
    }
    if (isAuth && !isAdmin) {
        return navigateTo('/', { replace: true });
    }

})