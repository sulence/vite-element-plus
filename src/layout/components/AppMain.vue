<template>
  <section class="app-main">
    <!-- <transition name="fade-transform" mode="out-in" appear>
      <keep-alive>
        <router-view :key="key" />
      </keep-alive>
    </transition> -->

    <RouterView>
      <template #default="{ Component, route }">
        <transition name="fade-transform" mode="out-in" appear>
          <keep-alive v-if="openCache" :include="getCaches">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
          <component :is="Component" v-else :key="route.fullPath" />
        </transition>
      </template>
    </RouterView>
  </section>
</template>

<script lang="ts" setup>
import { computed, unref } from "vue";
import { useAppSetting } from "@/hooks/setting/useAppSetting";
import { useMultipleTabStore } from "@/store/modules/multipleTab";

const { getOpenKeepAlive } = useAppSetting();
const tabStore = useMultipleTabStore();

const openCache = computed(() => unref(getOpenKeepAlive));
const getCaches = computed((): string[] => {
  if (!unref(getOpenKeepAlive)) {
    return [];
  }
  return tabStore.getCachedTabList;
});
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
