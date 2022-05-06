<template>
  <div :class="{ 'has-logo': showLogo }">
    <SidebarLogo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem
          v-for="route in menus"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, unref, watch } from "vue";
import { useRoute } from "vue-router";
import { useRootSetting } from "@/hooks/setting/useRootSetting";
import variables from "@/styles/variables.module.scss";
import { usePermissionStoreWithOut } from "@/store/modules/permission";
import { Menu } from "@/router/types";
import { SidebarLogo, SidebarItem } from "./";

const asyncRouteStore = usePermissionStoreWithOut();
const menus = ref<Menu[]>([]);

const currentRoute = useRoute();
watch(
  () => currentRoute.fullPath,
  () => {
    updateMenu();
  }
);
function updateMenu() {
  menus.value = asyncRouteStore.getMenus;
}
onMounted(() => {
  updateMenu();
});

const { getCollapsed, getShowLogo } = useRootSetting();
const showLogo = computed(() => unref(getShowLogo));
const isCollapse = computed(() => unref(getCollapsed));

const activeMenu = computed(() => {
  const { meta, path } = currentRoute;
  if (meta !== null || meta !== undefined) {
    if (meta.activeMenu) {
      return meta.activeMenu;
    }
  }
  return path;
});
</script>

<style lang="scss">
.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%;
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>
