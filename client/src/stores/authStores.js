import { ref } from "vue";
import { defineStore } from "pinia";
import customFetch from "@/api";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("user", () => {
  const dialog = ref(false);
  const errorMsg = ref(null);
  const errorAlert = ref(false);
  const currentUser = ref(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const router = useRouter();

  const LoginUser = async (inputData) => {
    try {
      const { data } = await customFetch.post("/auth/login", {
        email: inputData.email,
        password: inputData.password,
      });
      currentUser.value = data.data;
      localStorage.setItem("user", JSON.stringify(data.data));
      dialog.value = false;

      router.push({ name: "Dashboard" });
    } catch (err) {
      errorAlert.value = true;
      errorMsg.value = err.response.data.message;
    }
  };

  const registerUser = async (inputData) => {
    try {
      const { data } = await customFetch.post("/auth/register", {
        username: inputData.username,
        email: inputData.email,
        password: inputData.password,
      });
      currentUser.value = data.data;
      localStorage.setItem("user", JSON.stringify(data.data));
      dialog.value = false;

      router.push({ name: "Dashboard" });
    } catch (err) {
      errorAlert.value = true;
      errorMsg.value = err.response.data.message;
    }
  };

  const LogoutUser = async () => {
    try {
      localStorage.setItem("user", null);
      currentUser.value = null;
      await customFetch.get("/auth/logout");
      router.push({ name: "home" });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    dialog,
    LoginUser,
    errorAlert,
    errorMsg,
    currentUser,
    LogoutUser,
    registerUser,
  };
});
