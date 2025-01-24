<template>
  <DetailQuestionComponent v-if="questionData" :data="questionData" @reload="DetailQuestion()"/>
  <LoadingSpinner v-else />

  <Divider />
  <h1 class="text-2xl text-primary">List Answer</h1>
  <CardAnswer
    v-if="questionData"
    v-for="data in questionData.listAnswer"
    :key="data._id"
    :data="data"
    @reload="DetailQuestion()"
  />
  <div v-if="questionData && !questionData.listAnswer.length">
    <h1>Belum ada Jawaban</h1>
  </div>
  <div v-if="authStore.currentUser">
    <Divider />
    <h1 class="text-3xl text-primary">Answer</h1>
    <!-- Form Answer -->
    <FormAnswer
      v-if="questionData"
      @reload="DetailQuestion()"
      :dataQuestion="questionData"
    />
  </div>
</template>

<script setup>
import DetailQuestionComponent from "@/components/Question/DetailQuestionComponent.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import customFetch from "@/api";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import Divider from "primevue/divider";
import FormAnswer from "@/components/Answer/FormAnswer.vue";
import { useAuthStore } from "@/stores/authStores";
import CardAnswer from "@/components/Answer/CardAnswer.vue";

const route = useRoute();
const questionData = ref(null);

const authStore = useAuthStore();

const DetailQuestion = async () => {
  try {
    const { data } = await customFetch.get(`/question/${route.params.id}`);
    questionData.value = data.data;
    console.log(questionData.value);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  DetailQuestion();
});
</script>
