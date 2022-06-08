<template>
  <div id="tags-view-container" class="tags-view-container">
    <ScrollPane
      ref="scrollPaneRef"
      class="tags-view-wrapper"
      @scroll="handleScroll"
    >
      <router-link
        v-for="tag in getTabsState"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        class="tags-view-item"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ tag.meta?.title }}
        <span
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </ScrollPane>
    <ul
      v-show="state.visible"
      :style="{ left: state.left + 'px', top: state.top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(state.selectedTag)">Refresh</li>
      <li
        v-if="!isAffix(state.selectedTag)"
        @click="closeSelectedTag(state.selectedTag)"
      >
        Close
      </li>
      <li @click="closeOthersTags(state.selectedTag)">Close Others</li>
      <li @click="closeAllTags()">Close All</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ScrollPane } from "./";
import { computed, getCurrentInstance, reactive, unref, watch } from "vue";
import { RouteMeta, useRoute, useRouter } from "vue-router";
import type { RouteLocationNormalized } from "vue-router";
import { useTabs } from "@/hooks/web/useTabs";

import { useMultipleTabStore } from "@/store/modules/multipleTab";
import { listenerRouteChange } from "@/utils/routeChange";
import { REDIRECT_NAME } from "@/router/constant";
const instance = getCurrentInstance();
const { refreshPage, close, closeAll, closeOther } = useTabs();
const tabStore = useMultipleTabStore();

const { proxy } = instance as any;

const state = reactive({
  visible: false,
  top: 0,
  left: 0,
  selectedTag: {} as RouteLocationNormalized,
  closeMenu: () => {
    state.visible = false;
  },
});

const currentRoute = useRoute();
const router = useRouter();

const getTabsState = computed(() => {
  return tabStore.getTabList.filter((item) => !item.meta?.hideTab);
});

listenerRouteChange((route) => {
  const { name } = route;
  if (name === REDIRECT_NAME || !route) {
    return;
  }
  const { path, fullPath, meta = {} } = route;
  const { currentActiveMenu, hideTab } = meta as RouteMeta;
  const isHide = !hideTab ? null : currentActiveMenu;

  if (isHide) {
    const findParentRoute = router
      .getRoutes()
      .find((item) => item.path === currentActiveMenu);

    findParentRoute &&
      tabStore.addTab(findParentRoute as unknown as RouteLocationNormalized);
  } else {
    tabStore.addTab(unref(route));
  }
});

const refreshSelectedTag = (tab: RouteLocationNormalized) => {
  refreshPage(tab);
};
const closeSelectedTag = (tab: RouteLocationNormalized) => {
  close(tab);
};

const closeOthersTags = (tab: RouteLocationNormalized) => {
  closeOther(tab);
};

const closeAllTags = () => {
  closeAll();
};

watch(
  () => state.visible,
  (value) => {
    if (value) {
      document.body.addEventListener("click", state.closeMenu);
    } else {
      document.body.removeEventListener("click", state.closeMenu);
    }
  }
);

const openMenu = (tag: RouteLocationNormalized, e: MouseEvent) => {
  const menuMinWidth = 105;
  const offsetLeft = proxy.$el.getBoundingClientRect().left; // container margin left
  const offsetWidth = proxy.$el.offsetWidth; // container width
  const maxLeft = offsetWidth - menuMinWidth; // left boundary
  const left = e.clientX - offsetLeft + 15; // 15: margin right
  if (left > maxLeft) {
    state.left = maxLeft;
  } else {
    state.left = left;
  }
  state.top = e.clientY;
  state.visible = true;
  state.selectedTag = tag;
};

const handleScroll = () => {
  state.closeMenu();
};

const isActive = (route: RouteLocationNormalized) => {
  return route.path === currentRoute.path;
};

const isAffix = (tag: { meta: { affix: any } }) => {
  return tag.meta && tag.meta.affix;
};
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
        content: "x";
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
