import { ref } from "vue";
import { defineStore } from "pinia";
import customFetch from "@/api";

export const useAuthStore = defineStore("user", () => {
  const dialog = ref(false);
  const errorMsg = ref(null);
  const errorAlert = ref(false);
  const currentUser = ref(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  const LoginUser = async (inputData) => {
    try {
      const { data } = await customFetch.post("/auth/login", {
        email: inputData.email,
        password: inputData.password,
      });
      currentUser.value = data.data;
      localStorage.setItem("user", JSON.stringify(data.data));
      dialog.value = false;
    } catch (err) {
      errorAlert.value = true;
      errorMsg.value = err.response.data.message;
    }
  };

  return { dialog, LoginUser, errorAlert, errorMsg };
});
