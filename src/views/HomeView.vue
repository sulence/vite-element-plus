<template>
  <div class="">
    <div class="test">Home</div>
    <div class="">{{ flag.id }}</div>
    <Test title="首页"></Test>
    <el-button>I am ElButton {{ data }}</el-button>
    <el-button @click="open">OPEN</el-button>
    <div class="">
      <el-button :plain="true" @click="open2">success</el-button>
      <el-button :plain="true" @click="open3">warning</el-button>
      <el-button :plain="true" @click="open1">message</el-button>
      <el-button :plain="true" @click="open4">error</el-button>
    </div>

    <el-popover
      placement="top-start"
      title="Title"
      :width="200"
      trigger="hover"
      content="this is content, this is content, this is content"
    >
      <template #reference>
        <el-button>Hover to activate</el-button>
      </template>
    </el-popover>

    <div class="">
      <el-button plain @click="open5"> Won't close automatically </el-button>

      <el-button type="text" @click="open6"
        >Click to open the Message Box</el-button
      >
    </div>
    <el-input v-model="icon" placeholder="点击选择图标" readonly>
      <template v-if="icon" #prefix>
        <SvgIcon
          v-if="icon"
          :icon-class="icon"
          class="el-input__icon"
          style="height: 32px; width: 16px"
        />
      </template>
      <template v-else #suffix>
        <i class="el-icon-search el-input__icon" />
      </template>
    </el-input>
    <IconSelect @selected="selected" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import type { Action } from "element-plus";

import { Test } from "../components/Test";

import { IconSelect } from "@/components/IconSelect";

let data = ref<number>(0);

interface TestProps {
  id: number;
}
let flag = ref<TestProps[]>([]);

const isCollapse = ref(false);
let icon = ref<string>("");

const selected = (name: string) => {
  icon.value = name;
};

const open = () => {
  ElMessage("This is a message.");
};
const open1 = () => {
  ElMessage("this is a message.");
};
const open2 = () => {
  ElMessage({
    message: "Congrats, this is a success message.",
    type: "success",
  });
};
const open3 = () => {
  ElMessage({
    message: "Warning, this is a warning message.",
    type: "warning",
    duration: 0,
  });
};
const open4 = () => {
  ElMessage.error("Oops, this is a error message.");
};
const open5 = () => {
  ElNotification({
    title: "Prompt",
    message: "This is a message that does not automatically close",
    duration: 0,
  });
};
const open6 = () => {
  ElMessageBox.alert("This is a message", "Title", {
    callback: (action: Action) => {
      ElMessage({
        type: "info",
        message: `action: ${action}`,
      });
    },
  });
};
</script>

<style scoped></style>
