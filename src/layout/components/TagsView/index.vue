<template>
  <div id="tags-view-container" class="tags-view-container">
    <ScrollPane
      ref="scrollPaneRef"
      class="tags-view-wrapper"
      @scroll="handleScroll"
    >
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        class="tags-view-item"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ tag.title }}
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
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags(state.selectedTag)">Close All</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ScrollPane } from "./";
import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  reactive,
  unref,
  watch,
} from "vue";
import {
  TagView,
  useTagsviewStoreWithOutStore,
} from "@/store/modules/tagsview";
import { useRoute, useRouter } from "vue-router";
const instance = getCurrentInstance();

const { proxy } = instance as any;

const state = reactive({
  visible: false,
  top: 0,
  left: 0,
  selectedTag: {} as TagView,
  affixTags: [] as TagView[],
  closeMenu: () => {
    state.visible = false;
  },
});

const currentRoute = useRoute();
const router = useRouter();
const tagsviewStore = useTagsviewStoreWithOutStore();

const visitedViews = computed(() => {
  return tagsviewStore.getVisitedViews;
});

watch(
  () => currentRoute.fullPath,
  () => {
    addTags();
  }
);

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
onMounted(() => {
  addTags();
});

var addTags = () => {
  const { name } = currentRoute;
  if (name) {
    tagsviewStore.addCachedView(unref(currentRoute));
  }
  return false;
};

const toLastView = (visitedViews: TagView[], view: TagView) => {
  const latestView = visitedViews.slice(-1)[0];
  if (latestView !== undefined && latestView.fullPath !== undefined) {
    router.push(latestView.fullPath).catch((err) => {
      console.warn(err);
    });
  } else {
    // Default redirect to the home page if there is no tags-view, adjust it if you want

    if (view.name === "Dashboard") {
      // to reload home page
      router.push({ path: "/redirect" + view.fullPath }).catch((err) => {
        console.warn(err);
      });
    } else {
      router.push("/").catch((err) => {
        console.warn(err);
      });
    }
  }
};

const openMenu = (tag: TagView, e: MouseEvent) => {
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

const refreshSelectedTag = (view: TagView) => {
  // store.dispatch(TagsActionTypes.ACTION_DEL_CACHED_VIEW, view);
  const { fullPath } = view;
  nextTick(() => {
    router.replace({ path: "/redirect" + fullPath }).catch((err: any) => {
      console.warn(err);
    });
  });
};

const closeSelectedTag = (view: TagView) => {
  tagsviewStore.closeTab(view);
  if (isActive(view)) {
    toLastView(tagsviewStore.getVisitedViews, view);
  }
};

const closeOthersTags = () => {
  if (
    state.selectedTag.fullPath !== currentRoute.path &&
    state.selectedTag.fullPath !== undefined
  ) {
    router.push(state.selectedTag.fullPath).catch((err) => {
      console.log(err);
    });
  }
  tagsviewStore.closeOtherTabs(state.selectedTag as TagView);
};

const closeAllTags = (view: TagView) => {
  tagsviewStore.closeAllTab();
  if (state.affixTags.some((tag) => tag.path === currentRoute.path)) {
    return;
  }

  toLastView(tagsviewStore.getVisitedViews, view);
};

const handleScroll = () => {
  state.closeMenu();
};

const isActive = (route: TagView) => {
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
