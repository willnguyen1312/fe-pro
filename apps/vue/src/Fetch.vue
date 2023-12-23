<script setup lang="ts">
import { ref } from "vue";

const greeting = ref("");
const error = ref("");

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
});

const loadGreeting = async () => {
  try {
    const response = await fetch(new URL(props.url, location.href));
    const data = await response.json();
    greeting.value = data.greeting;
  } catch (_) {
    error.value = "Oops, failed to fetch!";
  }
};
</script>

<template>
  <div>
    <button :disabled="!!greeting" @click="loadGreeting">Load Greeting</button>
    <h1 v-if="!!greeting">{{ greeting }}</h1>
    <h1 v-if="!!error" role="alert">{{ error }}</h1>
  </div>
</template>
