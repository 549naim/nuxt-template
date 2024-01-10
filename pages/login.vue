<template>
  <div class="py-10">

    <form @submit.prevent="logInUser">
      <div class="flex justify-center mb-6">
        <div v-if="cred_error != ''"
          class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
          role="alert">
          <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span class="sr-only">Info</span>
          <div>
            <span class="font-medium">Requiest Failed</span> {{ cred_error }}
          </div>
        </div>
      </div>
      <div class="flex justify-center mb-6">
        <h4 class="text-red-700" v-if="errormsg != ''">{{ errormsg }}</h4>
      </div>
      <div class="flex justify-center mb-6">
        <input v-model="email" placeholder="Enter Your Email" type="email"
          class="required block w-9/12 md:w-5/12 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>
      <div class="flex justify-center mb-6">
        <input v-model="password" placeholder="Enter Your Password" type="password"
          class="required block w-9/12 md:w-5/12 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>
      <div class="flex justify-center mb-6">
        <div role="status" v-if="loading">
          <svg aria-hidden="true"
            class="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor" />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill" />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>

      <div class="flex justify-center mb-6">
        <button type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </div>
      <div class="flex justify-center mb-6">
        <h3>Create a new account <nuxt-link to="/register"><b>Sign Up</b></nuxt-link> </h3>
        <div class="mx-10 mb-6">
          <h3 class="text-blue-500 border-b-2 border-blue-500"> <nuxt-link to="/"><b>Forget your password</b></nuxt-link>
          </h3>
        </div>
      </div>
    </form>

  </div>
</template>

<script setup>
definePageMeta({
  middleware: "userauth",
});
import { ref } from 'vue';
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import { useUserStore } from "~~/store/userInfo";
import { useInfoStore } from "~~/store/info";


// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
})


let store = useUserStore();
let { baseUrl } = useInfoStore();
let email = ref('');
let password = ref('');

let cred_error = ref('');
let errormsg = ref(false);
let loading = ref(false);
console.log(store.isAuth);
const logInUser = async () => {
  loading.value = true;
  const { data: userData, error } = await useFetch(baseUrl + 'login/', {
    method: 'post',
    body: {
      email: email.value,
      password: password.value
    }
  })

  if (error.value != null) {
    // console.log(error.value.data.message, "errorvfsdfvfdgdgfdgfdg");
    loading.value = false;

    errormsg.value = error.value.data.message;
    setTimeout(() => {
      errormsg.value = '';
    }, 4000);
  }

  if (userData != null) {

    email.value = "";
    password.value = "";
    loading.value = false;

    if (userData.value.success == true) {
      store.isAuth = true;
      store.userDatainfo.value = userData.value;
      // console.log(userDatainfo.value.user_data.user_type, 'user data', isAuth);
      if (store.isAuth && store.userDatainfo.value.user_data.user_type == '1') {
        store.isAdmin = true;
        return navigateTo('/admin/AdminDashboard', { replace: true })
      }
      if (store.isAuth && store.userDatainfo.value.user_data.user_type == '0') {
        store.isAdmin = false;
        return navigateTo('/User', { replace: true })
      }
    } else {
      cred_error.value = userData.value.message;
      setTimeout(() => {
        cred_error.value = '';
      }, 4000);
    }
  }

}

</script>

<style lang="css" scoped></style>