<template>
    <div class="py-10">

        <form @submit.prevent="registerUser">
            <div class="flex justify-center mb-6">
                <div v-if="msg != ''"
                    class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                    role="alert">
                    <span class="font-medium">Success alert!</span> {{ msg }} . check your email and click the activation
                    link
                </div>
                <div v-if="email_error != ''"
                    class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert">
                    <span class="font-medium">Failed alert!</span> {{ email_error }} 
                </div>
            </div>
            <!-- <div class="flex justify-center mb-6">
            <h4 class="text-red-700" v-if="errormsg != ''">{{ errormsg }}</h4>
          </div> -->
            <div class="flex justify-center mb-6">
                <input v-model="name" placeholder="Enter Your Name" type="text"
                    class="required block w-9/12 md:w-5/12 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div class="flex justify-center mb-6">
                <input v-model="email" placeholder="Enter Your Email" type="email"
                    class="required block w-9/12 md:w-5/12 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div class="flex justify-center mb-6">
                <input v-model="password" placeholder="Enter Your password" type="password"
                    class="required block w-9/12 md:w-5/12 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div class="flex justify-center mb-6">
                <input v-model="password_confirmation" placeholder="Renter Your Password" type="password"
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

            <div class="flex justify-center mb6">
                <button type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
            </div>
        </form>
        <div class="flex justify-center mb6">
            <h3>Already have a account <nuxt-link to="/login"><b>Sign in</b></nuxt-link> </h3>
          </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import { useInfoStore } from "/store/info";
let { baseUrl } = useInfoStore();

onMounted(() => {
    initFlowbite();
})

let name = ref('');
let email = ref('');
let password = ref('');
let password_confirmation = ref('');
let loading = ref(false);
let msg = ref('');
let email_error = ref('');


const registerUser = async () => {
    loading.value = true
    console.log(name, email, password, password_confirmation);
    const { data: userData, error } = await useFetch(baseUrl + 'register/', {
        method: 'post',
        body: {

            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: password_confirmation.value,
            tc: true
        }
    })

    if (error.value != null) {
    console.log(error.value.data.message, "errorvfsdfvfdgdgfdgfdg");
    loading.value = false;
    
    email_error.value = error.value.data.message;
    setTimeout(() => {
      email_error.value = '';
    }, 4000);
  }


    if (userData != null) {
        console.log(userData,"userdata");
        name.value = "";
        email.value = "";
        password.value = "";
        password_confirmation.value = "";
        loading.value = false;

        if (userData.value.success == true) {
            msg.value = userData.value.message
            setTimeout(() => {
                msg.value = '';
            }, 20000);

        } else {
            email_error.value = userData.value.message;
            setTimeout(() => {
                email_error.value = '';
            }, 4000);
        }
    }

}






</script>

<style lang="css" scoped>
.note {
    text-align: center;
    height: 80px;
    background: -webkit-linear-gradient(left, #0072ff, #8811c5);
    color: #fff;
    font-weight: bold;
    line-height: 80px;
}

.form-content {
    padding: 5%;
    border: 1px solid #ced4da;
    margin-bottom: 2%;
}

.form-control {
    border-radius: 1.5rem;
}

.btnSubmit {
    border: none;
    border-radius: 1.5rem;
    padding: 1%;
    width: 20%;
    cursor: pointer;
    background: #0062cc;
    color: #fff;
}
</style>