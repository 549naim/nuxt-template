import { defineStore } from 'pinia'
export const useInfoStore = defineStore('Info', () => {
    let baseUrl = ref('http://localhost:8001/api/');
    return { baseUrl }
}, {

    persist: true
})