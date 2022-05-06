<template>
  <div class="icon-body">
    <el-input
      v-model="name"
      style="position: relative"
      clearable
      placeholder="请输入图标名称"
      @clear="filterIcons"
      @input="filterIcons"
    >
      <template #suffix>
        <i class="el-icon-search el-input__icon" />
      </template>
    </el-input>
    <div class="icon-list">
      <div
        v-for="(item, index) in iconList"
        :key="index"
        @click="selectedIcon(item)"
      >
        <SvgIcon :icon-class="item" style="height: 30px; width: 16px" />
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import icons from "./icons";

const emit = defineEmits(["selected"]);

let name = ref<string>("");
let iconList = ref<string[]>(icons);

const filterIcons = () => {
  if (name.value) {
    iconList.value = icons.filter((item) => item.includes(name.value));
  }
};

const selectedIcon = (item: string) => {
  emit("selected", item);
  document.body.click();
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.icon-body {
  width: 100%;
  padding: 10px;
  .icon-list {
    height: 200px;
    overflow-y: scroll;
    div {
      height: 30px;
      line-height: 30px;
      margin-bottom: -5px;
      cursor: pointer;
      width: 33%;
      float: left;
    }
    span {
      display: inline-block;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
  }
}
</style>
