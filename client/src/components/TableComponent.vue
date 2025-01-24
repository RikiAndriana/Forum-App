<template>
  <div class="card">
    <DataTable
      :value="props.data"
      paginator
      :rows="10"
      tableStyle="min-width: 50rem"
    >
      <Column field="questionId.title" sortable header="Question"></Column>
      <Column field="userId.username" sortable header="Reported By"></Column>
      <Column field="report" sortable header="Report"></Column>
      <Column style="min-width: 8rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="deleteQuestion(slotProps.data.questionId._id)"
          /> </template
      ></Column>
    </DataTable>
  </div>
</template>

<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import customFetch from "@/api";

const props = defineProps({
  data: {
    required: true,
    type: Array,
  },
});

const emit = defineEmits(["reload"]);
const deleteQuestion = async (paramsId) => {
  await customFetch.delete(`/question/${paramsId}`);
  alert("Question Successfully Deleted");
  emit("reload");
};
</script>
