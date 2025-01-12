<template>
  <Dialog
    modal
    :pt="{
      root: 'border-none',
      mask: {
        style: 'backdrop-filter: blur(2px)',
      },
    }"
  >
    <template #container="{ closeCallback }">
      <form @submit.prevent="handleSubmit">
        <div
          class="flex flex-column px-5 py-5 gap-4"
          style="
            border-radius: 12px;
            background-image: radial-gradient(
              circle at left top,
              var(--primary-400),
              var(--primary-700)
            );
          "
        >
          <div class="block mx-auto text-white">
            <h1>Logo</h1>
          </div>
          <AlertMessage
            v-if="authStores.errorAlert"
            :message="authStores.errorMsg"
            style="max-width: 300px"
          />
          <div class="inline-flex flex-column gap-2" v-if="!isRegistered">
            <label for="username" class="text-primary-50 font-semibold"
              >Username</label
            >
            <InputText
              id="username"
              type="text"
              v-model="userInput.username"
              class="bg-white-alpha-20 border-none p-3 text-primary-50 w-20rem"
            ></InputText>
          </div>
          <div class="inline-flex flex-column gap-2">
            <label for="email" class="text-primary-50 font-semibold"
              >Email</label
            >
            <InputText
              id="email"
              type="email"
              v-model="userInput.email"
              class="bg-white-alpha-20 border-none p-3 text-primary-50 w-20rem"
            ></InputText>
          </div>
          <div class="inline-flex flex-column gap-2">
            <label for="password" class="text-primary-50 font-semibold"
              >Password</label
            >
            <InputText
              id="password"
              v-model="userInput.password"
              class="bg-white-alpha-20 border-none p-3 text-primary-50 w-20rem"
              type="password"
            ></InputText>
          </div>
          <div class="flex align-items-center gap-3">
            <Button
              label="Cancel"
              @click="closeCallback"
              text
              class="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
            ></Button>
            <Button
              :label="isRegistered ? 'Login' : 'Register'"
              type="submit"
              text
              class="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
            ></Button>
          </div>
          <div style="width: 300px" class="text-white">
            <p v-if="isRegistered">
              Belum punya akun? Silahkan Daftar
              <span
                class="cursor-pointer my-2 text-blue-400"
                @click="isRegistered = false"
                >Register</span
              >
            </p>
            <p v-else>
              Sudah punya akun? Silahkan Login
              <span
                class="cursor-pointer my-2 text-blue-400"
                @click="isRegistered = true"
                >Login</span
              >
            </p>
          </div>
        </div>
      </form>
    </template>
  </Dialog>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useAuthStore as useAuthStores } from "@/stores/authStores";
import AlertMessage from "./AlertMessage.vue";

//Store
const authStores = useAuthStores();

//action store
const { LoginUser, registerUser } = authStores;

//State
const userInput = reactive({
  username: "",
  email: "",
  password: "",
});
const isRegistered = ref(true);

const clearInput = () => {
  userInput.username = "";
  userInput.email = "";
  userInput.password = "";
};

const handleSubmit = () => {
  if (isRegistered.value) {
    LoginUser(userInput);
    clearInput();
  } else {
    registerUser(userInput);
    clearInput();
  }
};
</script>
