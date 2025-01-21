import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import DashboardView from "@/views/DashboardView.vue";
import { useAuthStore } from "@/stores/authStores";
import DetailQuestion from "@/views/DetailQuestion.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: DashboardView,
      meta: {
        requiredAuth: true,
      },
    },
    {
      path: "/question/:id",
      name: "DetailQuestion",
      component: DetailQuestion,
    },
  ],
});

router.beforeEach(async (to, from) => {
  const authStore = await useAuthStore();
  if (to.meta.requiredAuth && !authStore.currentUser) {
    alert("Anda harus login dulu untuk mengakses halaman ini");
    return {
      path: "/",
    };
  }
});
export default router;
