<script setup lang="ts">
import { ref } from "vue";

const count = ref(10);

const increment = () => {
  count.value++;
};
</script>

<template>
  <div class="wrapper">
    <div class="parent">
      <div class="scrollable">
        <ul :style="{ height: '500px' }">
          <li v-for="i in count" :key="i">{{ i }}</li>
        </ul>
      </div>
      <button @click="increment">increment</button>
    </div>
  </div>
</template>

<style>
.wrapper {
  height: 300px;
}

.parent {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.scrollable {
  overflow: auto;
}
</style>
