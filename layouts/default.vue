<template>
    <div>
        <div class="block">

            <nav class="bg-gray-800 border-gray-200 dark:bg-gray-900 border-b-2">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    
                    <div class="flex md:order-2">
                       
                        <div class="relative hidden md:block">
                            
                        </div>
                        <button data-collapse-toggle="navbar-search" type="button"
                            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-100 rounded-lg md:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 dark:text-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-search" aria-expanded="false">
                            <span class="sr-only">Open main menu</span>
                            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
                       
                        <ul
                            class="flex flex-col p-4 md:p-0 mt-4 font-medium bg-gray-800 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-gray-800 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <NuxtLink to="/"
                                    class="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:text-white-700 md:p-0 md:dark:text-white-500"
                                    aria-current="page">Home</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/about"
                                    class="block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent md:text-white-700 md:p-0 md:dark:text-white-500"
                                    aria-current="page">About</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/contact"
                                    class="block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent md:text-white-700 md:p-0 md:dark:text-white-500"
                                    aria-current="page">Contact</NuxtLink>
                            </li>
                            <li v-if="!store.isAuth">
                                <NuxtLink   to="/login"
                                    class="block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent md:text-white-700 md:p-0 md:dark:text-white-500"
                                    aria-current="page">Login</NuxtLink>
                            </li>
                            <li v-if="!store.isAuth">
                                <NuxtLink  to="/register"
                                    class="block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent md:text-white-700 md:p-0 md:dark:text-white-500"
                                    aria-current="page">Register</NuxtLink>
                            </li>
                            <li v-if="store.isAdmin">
                                <NuxtLink to="/admin/AdminDashboard"
                                    class="block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent md:text-white-700 md:p-0 md:dark:text-white-500"
                                    aria-current="page">AdminDashboard</NuxtLink>
                            </li>
                           
                    </ul>
                </div>
            </div>
        </nav>

    </div>
    <slot />
    <Footer/>
</div></template>

<script setup>
import { useUserStore } from "~~/store/userInfo";
const store  = useUserStore();


</script>

<style  scoped>
.router-link-exact-active{
    background-color: rgb(27, 255, 20);
    color: black;
    padding-left: 10px;
    padding-right: 10px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
</style>