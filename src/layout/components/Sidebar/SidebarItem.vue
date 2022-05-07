<template>
  <template
    v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children"
  >
    <SidebarItemLink
      v-if="theOnlyOneChild.meta && !item.hidden"
      :to="resolvePath(theOnlyOneChild.path)"
    >
      <el-menu-item
        :index="resolvePath(theOnlyOneChild.path)"
        :class="{ 'submenu-title-noDropdown': !isNest }"
      >
        <el-icon v-if="theOnlyOneChild.meta.icon">
          <svg class="svg-icon" aria-hidden="true" font-size="16px">
            <use :xlink:href="iconName(theOnlyOneChild.meta.icon)" />
          </svg>
        </el-icon>
        <template #title>
          <span>
            {{ theOnlyOneChild.meta.title }}
          </span>
        </template>
      </el-menu-item>
    </SidebarItemLink>
  </template>

  <el-sub-menu
    v-else
    ref="subMenu"
    :index="resolvePath(item.path)"
    popper-append-to-body
  >
    <template #title>
      <el-icon v-if="item.meta && item.meta.icon">
        <svg class="svg-icon" aria-hidden="true" font-size="16px">
          <use :xlink:href="iconName(item.meta.icon)" />
        </svg>
      </el-icon>
      <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
    </template>
    <sidebar-item
      v-for="child in item.children"
      :key="child.path"
      :is-nest="true"
      :item="child"
      :base-path="resolvePath(child.path)"
      class="nest-menu"
    />
  </el-sub-menu>
</template>

<script lang="ts" setup>
import path from "path-browserify";
import { computed, PropType } from "vue";
import { isExternal } from "@/utils/validate";
import { SidebarItemLink } from "./";
import { AppRouteRecordRaw } from "@/router/types";

const props = defineProps({
  item: {
    type: Object as PropType<AppRouteRecordRaw>,
    required: true,
  },
  basePath: {
    type: String,
    required: true,
  },
  isNest: {
    type: Boolean,
    default: false,
  },
});

const alwaysShowRootMenu = computed(() => {
  if (props.item.meta && props.item.meta.alwaysShow) {
    return true;
  } else {
    return false;
  }
});

const showingChildNumber = computed(() => {
  if (props.item.children) {
    const showingChildren = props.item.children.filter((item) => {
      if (item.meta && item.meta.hidden) {
        return false;
      } else {
        return true;
      }
    });
    return showingChildren.length;
  }
  return 0;
});

const theOnlyOneChild = computed(() => {
  if (showingChildNumber.value > 1) {
    return null;
  }
  if (props.item.children) {
    for (const child of props.item.children) {
      if (!child.meta || !child.meta.hidden) {
        child.meta.icon = props.item.meta.icon;
        return child;
      }
    }
  }
  // If there is no children, return itself with path removed,
  // because this.basePath already conatins item's path information
  return { ...props.item, path: "" };
});

const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  return path.resolve(props.basePath, routePath);
};

const iconName = (icon: string) => {
  return `#icon-${icon}`;
};
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
