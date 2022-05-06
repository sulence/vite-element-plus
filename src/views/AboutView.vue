<template>
  <div class="">
    <div class="test">about</div>
    <div class="">{{ flag }}</div>
    <router-link to="/">test</router-link>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
let flag = ref("开端-第二次循环");
</script>

<style scoped></style>
