<template>
  <el-config-provider :message="config" :locale="zhCn">
    <RouterView />
  </el-config-provider>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

const config = reactive({
  max: 3,
});

let theme = window.localStorage.getItem("theme");
theme && window.document.documentElement.setAttribute("data-theme", theme);
</script>

<style></style>
