<template>
  <div :class="classObj" class="app-wrapper">
    <!-- <div
      v-if="!menuSetting.collapsed"
      class="drawer-bg"
      @click="handleClickOutside"
    /> -->
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <div>
        <Navbar />
        <TagsView v-if="showTagsView" />
      </div>
      <AppMain />
      <!-- <RightPanel> -->
      <!-- <Settings /> -->
      <!-- </RightPanel> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { usePermissionStoreWithOut } from "@/store/modules/permission";
import { Menu } from "@/router/types";

// import { RightPanel } from "@/components/RightPanel";
import { AppMain, Sidebar, TagsView, Navbar } from "./components";

import { useAppStoreWithOut } from "@/store/modules/app";
const appStore = useAppStoreWithOut();

const currentRoute = useRoute();
const asyncRouteStore = usePermissionStoreWithOut();
const menus = ref<Menu[]>([]);

const menuSetting = computed(() => {
  return appStore.getProjectConfig;
});

const classObj = computed(() => {
  return {
    showSidebar: !menuSetting.value.collapsed,
    hideSidebar: menuSetting.value.collapsed,
  };
});

const showTagsView = computed(() => {
  return appStore.getProjectConfig.showTagsView;
});

watch(
  () => currentRoute.fullPath,
  () => {
    updateMenu();
  }
);
function updateMenu() {
  console.log(asyncRouteStore.getMenus);

  menus.value = asyncRouteStore.getMenus;
}
onMounted(() => {
  updateMenu();
});
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{210px});
  transition: width 0.28s;
}
</style>
