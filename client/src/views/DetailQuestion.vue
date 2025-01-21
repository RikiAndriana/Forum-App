<template>
  <DetailQuestionComponent v-if="QuestionData" :data="QuestionData" />
  <LoadingSpinner v-else />
</template>
<script setup>
import DetailQuestionComponent from "@/components/Question/DetailQuestionComponent.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import customFetch from "@/api";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const QuestionData = ref(null);

const DetailQuestion = async () => {
  try {
    const { data } = await customFetch.get(`/question/${route.params.id}`);
    QuestionData.value = data.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  DetailQuestion();
});
</script>
