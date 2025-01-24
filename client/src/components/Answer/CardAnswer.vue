<template>
  <div class="grid px-4 gap-4 bg-primary-50">
    <div class="col-1">
      <div class="flex align-items-center gap-2">
        <Button icon="pi pi-thumbs-up-fill" rounded text></Button
        ><span>{{ props.data.voteCount }}</span>
      </div>
    </div>
    <div class="col">
      <div class="card my-2">
        <Panel>
          <template #footer>
            <div
              class="flex flex-wrap align-items-center justify-content-between gap-4"
            >
              <div class="flex align-items-center gap-2">
                <Avatar
                  image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                  size="small"
                  shape="circle"
                />
                <span class="font-bold">{{ props.data.userId.username }}</span>
              </div>
              <span class="text-surface-500 dark:text-surface-400">{{
                dateFormat(props.data.createdAt)
              }}</span>
            </div>
          </template>
          <div
            class="mb-3 flex justify-content-end"
            v-if="
              authStore.currentUser &&
              authStore.currentUser._id === props.data.userId._id
            "
          >
            <Button
              icon="pi pi-times"
              rounded
              severity="danger"
              @click="handleDelete(props.data._id)"
            />
          </div>
          <span v-html="props.data.answer"></span>
        </Panel>
      </div>
    </div>
  </div>
</template>

<script setup>
import Panel from "primevue/panel";
import Avatar from "primevue/avatar";
import Button from "primevue/button";
import { useAuthStore } from "@/stores/authStores";
import customFetch from "@/api";

const authStore = useAuthStore();
const emit = defineEmits(["reload"]);

const handleDelete = async (id) => {
  try {
    await customFetch.delete(`/answer/${id}`);
    alert("Successfully Deleted");
    emit("reload");
  } catch (error) {
    console.log(error);
  }
};

const dateFormat = (dataInput) => {
  const newDate = new Date(dataInput).toLocaleString();
  return newDate;
};
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>
