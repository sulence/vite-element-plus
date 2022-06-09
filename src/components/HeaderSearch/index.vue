<template>
  <div :class="{ show: show }" class="header-search">
    <svg-icon
      class-name="search-icon"
      icon-class="search"
      @click.stop="click"
    />
    <el-select
      ref="headerSearchSelect"
      v-model="keyword"
      :remote-method="handleSearch"
      filterable
      default-first-option
      remote
      placeholder="菜单查询"
      class="header-search-select"
      @change="change"
    >
      <el-option
        v-for="option in searchResult"
        :key="option.path"
        :value="option.path"
        :label="option.name"
      />
    </el-select>
  </div>
</template>
<script lang="ts" setup>
import { router } from "@/router";
import { nextTick, ref } from "vue";
import { useMenuSearch } from "./useMenuSearch";

const { handleSearch, searchResult, keyword, resetSearch } = useMenuSearch();

const headerSearchSelect = ref();
const show = ref(false);

const click = () => {
  show.value = !show.value;
  if (show.value) {
    headerSearchSelect.value && headerSearchSelect.value.focus();
  }
  resetSearch();
};

const change = (path: string) => {
  if (ishttp(path)) {
    // http(s):// 路径新窗口打开
    const pindex = path.indexOf("http");
    window.open(path.substr(pindex, path.length), "_blank");
  } else {
    router.push(path);
  }
  resetSearch();
  nextTick(() => {
    show.value = false;
  });
};

const ishttp = (url: string) => {
  return url.indexOf("http://") !== -1 || url.indexOf("https://") !== -1;
};
</script>
<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
