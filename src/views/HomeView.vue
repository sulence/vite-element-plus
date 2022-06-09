<template>
  <div class="app-container">
    <div class="" @click="handleLogin">login</div>
    <div class="" @click="handleMessage">message</div>
    <div class="test">Home</div>
    <div class="">{{ flag.id }}</div>

    <div class="">
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :label="false">expand</el-radio-button>
        <el-radio-button :label="true">collapse</el-radio-button>
      </el-radio-group>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
      >
        <template v-for="item in list" :key="item.title">
          <el-sub-menu v-if="item.child" index="1">
            <template #title>
              <el-icon>
                <svg class="svg-icon" aria-hidden="true" font-size="16px">
                  <use xlink:href="#icon-dashboard" />
                </svg>
              </el-icon>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              v-for="child in item.child"
              :key="child.title"
              index="2-1"
              >{{ child.title }}</el-menu-item
            >
          </el-sub-menu>

          <el-menu-item v-else index="2">
            <el-icon>
              <svg class="svg-icon" aria-hidden="true" font-size="16px">
                <use xlink:href="#icon-dashboard" />
              </svg>
            </el-icon>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
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
import { useRoute, useRouter } from "vue-router";

import { Test } from "../components/Test";

import { IconSelect } from "@/components/IconSelect";

import { useMessage } from "@/hooks/web/useMessage";

const { createMessage, notification } = useMessage();
const currentRoute = useRoute();
const router = useRouter();

let data = ref<number>(0);

interface TestProps {
  id: number;
}
let flag = ref<TestProps[]>([]);

const isCollapse = ref(false);
let icon = ref<string>("");
const list = ref([
  {
    icon: "#icon-dashboard",
    title: "首页",
    child: [
      { icon: "", title: "首页1" },
      { icon: "", title: "首页2" },
    ],
  },
  { icon: "#icon-dashboard", title: "关于" },
]);

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

const handleLogin = () => {
  const { fullPath } = currentRoute;
  router.replace({ path: "/redirect/test/index" }).catch((err: any) => {
    console.warn(err);
  });
};

const handleMessage = () => {
  createMessage.success("你点击了通知，ID=");
  notification.warn({ title: "Title", message: `成功删除` });
};
</script>

<style scoped></style>
