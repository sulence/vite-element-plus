<template>
  <div class="">
    <div class="test">test-{{ title }}</div>
    <div class="">{{ flag }}</div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

defineProps({
  title: {
    type: String,
    default: "",
  },
});

let flag = ref("开端-第二次循环");
</script>

<style scoped></style>
