<template>
  <div class="card my-2">
    <Panel>
      <template #header>
        <div class="flex align-items-center gap-2">
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            shape="circle"
          />
          <span class="font-bold">{{ props.data.userId.username }}</span>
        </div>
      </template>

      <template #icons>
        <div>
          <button
            v-if="authStore.currentUser"
            class="p-panel-header-icon p-link mr-2"
            @click="dialogReport(props.data.title, props.data._id)"
          >
            <span class="pi pi-flag"></span>
          </button>
          <button
            v-if="
              authStore.currentUser &&
              authStore.currentUser._id === props.data.userId._id
            "
            class="p-panel-header-icon p-link mr-2"
            @click="toggle"
          >
            <span class="pi pi-cog"></span>
          </button>
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
  <Dialog
    v-model:visible="openReport"
    modal
    header="Report Question"
    :style="{ width: '40%' }"
  >
    <span class="p-text-primary block mb-5">{{ titleReport }}</span>
    <form @submit.prevent="handleReport">
      <div class="flex flex-column gap-3">
        <div
          v-for="report in reports"
          :key="report.key"
          class="flex align-items-center"
        >
          <RadioButton
            v-model="selectedReport"
            :inputId="report.key"
            name="dynamic"
            :value="report.name"
          />
          <label :for="report.key" class="ml-2">{{ report.name }}</label>
        </div>
      </div>

      <div class="flex flex-column gap-2">
        <Button
          type="submit"
          label="Report"
          class="w-full my-5 gap-2"
          severity="danger"
        ></Button>
      </div>
    </form>
  </Dialog>
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
import RadioButton from "primevue/radiobutton";

const emit = defineEmits(["reload"]);

const menu = ref(null);
const dialog = ref(false);
const dataQuestion = ref(null);
const authStore = useAuthStore();
const openReport = ref(false);

const titleReport = ref("");
const idReport = ref("");
const selectedReport = ref("spam");
const reports = ref([
  { name: "Spam", key: "A" },
  { name: "Pornnografi", key: "B" },
  { name: "Tidak Layak", key: "C" },
]);

const dialogReport = (title, id) => {
  titleReport.value = title;
  idReport.value = id;
  openReport.value = true;
};

const handleReport = async () => {
  await customFetch.post(`/report/question/${idReport.value}`, {
    report: selectedReport.value,
  });
  openReport.value = false;
  alert("Question Successfully Reported");
  emit("reload");
};

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
