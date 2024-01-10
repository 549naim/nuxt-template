import { defineStore } from 'pinia'

export const useUserStore = defineStore('userInfo', () => {
    let isAuth = ref(false);
    let isAdmin = ref(false);
    let userDatainfo = ref({});

    return { isAuth, userDatainfo, isAdmin }
}, {
    persist: true
})