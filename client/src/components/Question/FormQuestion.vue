<template>
  <form @submit.prevent="handleSubmit">
    <AlertMessage
      v-if="errorAlert"
      :message="errorMsg"
      style="max-width: 100%"
    />
    <div class="flex align-items-center gap-3 mb-3">
      <InputText
        v-model="question.title"
        class="flex-auto"
        placeholder="Insert Question Title"
      />
    </div>
    <div class="flex align-items-center gap-3 mb-5">
      <Editor
        v-model="question.question"
        editorStyle="height: 320px"
        style="width: 100%"
        placeholder="Insert Your Question"
      />
    </div>
    <div class="flex align-items-center gap-3 mb-3">
      <Dropdown
        v-model="question.category"
        :options="categories"
        optionLabel="name"
        placeholder="Select a Your Category Question"
        class="w-full"
      />
    </div>
    <div class="flex justify-content-end gap-2">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="$emit('close')"
      ></Button>
      <Button type="submit" label="Submit"></Button>
    </div>
  </form>
</template>

<script setup>
import customFetch from "@/api";
import { ref, reactive, onMounted } from "vue";
import AlertMessage from "../AlertMessage.vue";

const emit = defineEmits(["close", "reload"]);

// state Alert
const errorMsg = ref("");
const errorAlert = ref(false);

const props = defineProps({
  dataQuestion: {
    type: Object,
    required: true,
  },
  isUpdate: {
    type: Boolean,
    default: false,
  },
});

onMounted(() => {
  if (props.dataQuestion && props.isUpdate) {
    question.title = props.dataQuestion.title;
    question.question = props.dataQuestion.question;
    question.category = props.dataQuestion.category;
  }
});

const question = reactive({
  title: "",
  question: "",
  category: "",
});

const clearInput = () => {
  question.title = "";
  question.question = "";
  question.category = "";
};

const handleSubmit = async () => {
  try {
    if (props.isUpdate) {
      await customFetch.put(`/question/${props.dataQuestion._id}`, {
        title: question.title,
        question: question.question,
        category: question.category.name,
      });
    } else {
      await customFetch.post("/question", {
        title: question.title,
        question: question.question,
        category: question.category.name,
      });
    }
    clearInput();
    emit("close");
    emit("reload");
  } catch (error) {
    errorAlert.value = true;
    errorMsg.value = error.response.data.message;
  }
};

const categories = ref([
  { name: "javascript" },
  { name: "database" },
  { name: "nodejs" },
  { name: "vuejs" },
]);
</script>
