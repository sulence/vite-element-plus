<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">Page style setting</h3>

      <div class="drawer-item">
        <span>Theme Color</span>
        <!-- <ThemePicker
          style="float: right; height: 26px; margin: -3px 8px 0 0"
          @change="themeChange"
        /> -->
      </div>

      <div class="drawer-item">
        <span>Open Tags-View</span>
        <el-switch v-model="showTagsView" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>Sidebar Logo</span>
        <el-switch v-model="showSidebarLogo" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>Fixed Header </span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, unref } from "vue";
import { useAppSetting } from "@/hooks/setting/useAppSetting";
import { useAppStore } from "@/store/modules/app";

const {
  getAppConfig,
  getHeaderSetting,
  getHeaderFixed,
  getShowLogo,
  getShowTagsView,
} = useAppSetting();

const appStore = useAppStore();

const appConfig = computed(() => {
  return unref(getAppConfig);
});

const headerSetting = computed(() => {
  return unref(getHeaderSetting);
});

const showTagsView = computed({
  get: () => unref(getShowTagsView),
  set: (val: boolean) => {
    changeTagsView(val);
  },
});

const showSidebarLogo = computed({
  get: () => unref(getShowLogo),
  set: (val: boolean) => {
    changeSidebarLogo(val);
  },
});

const fixedHeader = computed({
  get: () => unref(getHeaderFixed),
  set: (val: boolean) => {
    changeFixedHeader(val);
  },
});

const changeTagsView = (value: boolean) => {
  appStore.setAppSetting({
    ...appConfig.value,
    showTagsView: value,
  });
};

const changeSidebarLogo = (value: boolean) => {
  appStore.setAppSetting({
    ...appConfig.value,
    showLogo: value,
  });
};

const changeFixedHeader = (value: boolean) => {
  appStore.setHeaderSetting({
    ...headerSetting.value,
    fixed: value,
  });
};
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }
}
</style>
