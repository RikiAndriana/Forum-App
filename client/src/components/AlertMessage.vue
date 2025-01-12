<template>
  <Message severity="error">{{ props.message }}</Message>
</template>

<script setup>
import { defineProps } from "vue";
import Message from "primevue/message";

const props = defineProps({
  message: {
    type: String,
  },
});
</script>
