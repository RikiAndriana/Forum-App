<template>
  <Menubar class="bg-green-300" :model="items">
    <template #end>
      <Button
        v-if="!authStore.currentUser"
        label="Login"
        icon="pi pi-user"
        @click="dialog = true"
      />
      <div v-else>
        <Button @click="DashboardPath" label="Dashboard" icon="pi pi-home" />
        <Button
          label="Logout"
          class="ml-3"
          severity="danger"
          @click="LogoutUser"
        />
      </div>
    </template>
  </Menubar>

  <!-- dialog -->
  <FormAuthComponent v-model:visible="dialog" />
</template>

<script setup>
import Menubar from "primevue/menubar";
import FormAuthComponent from "@/components/FormAuthComponent.vue";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authStores";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

// Action pinia
const { LogoutUser } = authStore;
const DashboardPath = () => {
  router.push({ name: "Dashboard" });
};

// State pinia
const { dialog } = storeToRefs(authStore);

const items = ref([
  {
    label: "Home",
    icon: "pi pi-home",
    command: () => {
      router.push({ name: "home" });
    },
  },
  {
    label: "About",
    icon: "pi pi-book",
    command: () => {
      router.push({ name: "About" });
    },
  },
]);
</script>
