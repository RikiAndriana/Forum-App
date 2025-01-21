<template>
  <main>
    <div class="grid">
      <aside class="col-2">
        <div class="p-3 border-round-sm bg-primary-100">
          <form @submit.prevent="handleFilter">
            <div class="flex flex-column gap-2">
              <p class="font-bold">Kategory</p>
              <div
                v-for="category in categories"
                :key="category.key"
                class="flex align-items-center"
              >
                <RadioButton
                  v-model="selectedCategory"
                  :inputId="category.key"
                  name="category"
                  :value="category.name"
                />
                <label :for="category.key" class="ml-2">{{
                  category.name
                }}</label>
              </div>
            </div>
            <Divider />
            <div class="flex my-3">
              <Dropdown
                v-model="selectedSort"
                :options="sortFilter"
                optionLabel="name"
                optionValue="code"
                placeholder="Filter"
                class="w-full md:w-14rem"
              />
            </div>
            <Divider />
            <Button type="submit" label="Filter"></Button>
          </form>
        </div>
      </aside>
      <section class="col">
        <div class="p-3 border-round-sm bg-primary-50">
          <div class="flex justify-content-between">
            <h2 class="text-4xl text primary">List Question</h2>
            <Button
              v-if="authStore.currentUser"
              label="Tambah"
              rounded
              type="button"
              icon="pi pi-plus"
              @click="dialog = true"
            />
          </div>
          <Dialog
            v-model:visible="dialog"
            modal
            header="Add Question"
            :style="{ width: '70%' }"
          >
            <FormQuestion @close="closeDialog()" @reload="allQuestion()" />
          </Dialog>
          <ListQuestion
            v-if="questions"
            v-for="q in questions"
            :key="q._id"
            :data="q"
            @reload="allQuestion()"
          />
          <LoadingSpinner v-else />
          <Paginator
            v-if="questions && questions.length"
            :rows="5"
            :totalRecords="totalQuestion"
            @page="onPage"
          ></Paginator>
          <div v-if="questions && !questions.length">
            <h1>Data tidak ada</h1>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import ListQuestion from "@/components/Question/ListQuestion.vue";
import Dialog from "primevue/dialog";
import { onMounted, ref } from "vue";
import FormQuestion from "@/components/Question/FormQuestion.vue";
import customFetch from "@/api";
import { useAuthStore } from "@/stores/authStores";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import RadioButton from "primevue/radiobutton";
import Divider from "primevue/divider";
import Dropdown from "primevue/dropdown";
import Paginator from "primevue/paginator";

const dialog = ref(false);
const questions = ref(null);
const authStore = useAuthStore();
const totalQuestion = ref(0);

const selectedCategory = ref(null);
const categories = ref([
  { name: "javascript", key: "JS" },
  { name: "database", key: "DB" },
  { name: "nodejs", key: "ND" },
  { name: "vuejs", key: "VU" },
]);

const selectedSort = ref(null);
const sortFilter = ref([
  { name: "New Question", code: "-createdAt" },
  { name: "Old Question", code: "createdAt" },
  { name: "A - Z", code: "title" },
]);

const handleFilter = async () => {
  await allQuestion();
};

const onPage = (event) => {
  allQuestion(event.page + 1);
};

const allQuestion = async (page = 1) => {
  try {
    const params = {
      sort: selectedSort.value,
      category: selectedCategory.value,
      page,
    };
    const { data } = await customFetch.get("/question", { params });
    questions.value = data.data;
    totalQuestion.value = data.total;
  } catch (error) {
    console.log(error);
  }
};

const closeDialog = () => {
  dialog.value = false;
};

onMounted(() => {
  allQuestion();
});
</script>
