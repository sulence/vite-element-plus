<template>
  <div class="app-container">
    <div class="test">menu</div>
    <div class="">{{ flag }}</div>
    <div class="active" :class="{ 'active-test': show }" @click="show = !show">
      show
    </div>
    <div class="" @click="handleGo">跳转</div>
    <router-link to="/">test</router-link>
  </div>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
let flag = ref("开端-第二次循环");
let show = ref(true);
const currentRoute = useRoute();
const router = useRouter();
const handleGo = () => {
  const { fullPath } = currentRoute;
  router
    .replace({ path: "/redirect" + fullPath, replace: true })
    .catch((err: any) => {
      console.warn(err);
    });
};
</script>

<style scoped></style>
