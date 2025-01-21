<template>
  <div class="card my-2">
    <Panel>
      <template #header>
        <div class="flex align-items-center gap-2">
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            shape="circle"
          />
          <span class="font-bold">Amy Elsner</span>
        </div>
      </template>

      <template #icons>
        <div
          v-if="
            authStore.currentUser &&
            authStore.currentUser._id === props.data.userId._id
          "
        >
          <Button
            icon="pi pi-cog"
            severity="secondary"
            rounded
            text
            @click="toggle"
          />
          <Menu ref="menu" id="config_menu" :model="items" popup />
        </div>
      </template>

      <template #footer>
        <div
          class="flex flex-wrap align-items-center justify-content-between gap-4"
        >
          <div class="flex align-items-center gap-2">
            <Button icon="pi pi-thumbs-up-fill" rounded text></Button
            ><span>{{ props.data.voteCount }}</span>
          </div>
          <span class="text-surface-500 dark:text-surface-400">{{
            dateFormat(props.data.createdAt)
          }}</span>
        </div>
      </template>
      <RouterLink
        :to="{ name: 'DetailQuestion', params: { id: props.data._id } }"
        class="text-4xl text-primary no-underline"
        >{{ props.data.title }}</RouterLink
      >
      <p class="my-3">
        <span v-html="props.data.question.substring(0, 200)"></span>
      </p>
      <Dialog
        v-model:visible="dialog"
        modal
        header="Edit Question"
        :style="{ width: '70%' }"
      >
        <FormQuestion
          :dataQuestion="dataQuestion"
          :isUpdate="true"
          @reload="reload()"
          @close="dialog = false"
        />
      </Dialog>
      <Chip :label="props.data.category" />
    </Panel>
  </div>
</template>

<script setup>
import Panel from "primevue/panel";
import Avatar from "primevue/avatar";
import Chip from "primevue/chip";
import Menu from "primevue/menu";
import { ref } from "vue";
import FormQuestion from "./FormQuestion.vue";
import { useAuthStore } from "@/stores/authStores";
import customFetch from "@/api";

const emit = defineEmits(["reload"]);

const menu = ref(null);
const dialog = ref(false);
const dataQuestion = ref(null);
const authStore = useAuthStore();

const items = ref([
  {
    label: "Update",
    icon: "pi pi-refresh",
    command: () => {
      const data = props.data;
      dataQuestion.value = data;
      dialog.value = true;
      console.log(data);
    },
  },
  {
    label: "Delete",
    icon: "pi pi-times",
    command: async () => {
      await customFetch.delete(`/question/${props.data._id}`);
      emit("reload");
      alert("Question Deleted");
    },
  },
  {
    separator: true,
  },
  {
    label: "Report",
    icon: "pi pi-flag",
    command: () => {
      console.log("Report");
    },
  },
]);

const reload = () => {
  emit("reload");
};

const dateFormat = (dataInput) => {
  const newDate = new Date(dataInput).toLocaleString();
  return newDate;
};

const toggle = (event) => {
  menu.value.toggle(event);
};

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>
