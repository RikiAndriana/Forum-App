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
        <Button label="Dashboard" icon="pi pi-home" />
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

const authStore = useAuthStore();

// Action pinia
const { LogoutUser } = authStore;

// State pinia
const { dialog } = storeToRefs(authStore);

const items = ref([
  {
    label: "Home",
    icon: "pi pi-home",
  },
  {
    label: "Projects",
    icon: "pi pi-search",
    items: [
      {
        label: "Components",
        icon: "pi pi-bolt",
      },
      {
        label: "Blocks",
        icon: "pi pi-server",
      },
    ],
  },
  {
    label: "Contact",
    icon: "pi pi-envelope",
  },
]);
</script>
