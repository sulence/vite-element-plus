import { computed } from "vue";

import { useAppStore } from "@/store/modules/app";

export function useAppSetting() {
  const appStore = useAppStore();
  const getAppConfig = computed(() => appStore.getAppConfig);
  const getShowLogo = computed(() => appStore.getAppConfig.showLogo);
  const getCollapsed = computed(() => appStore.getAppConfig.collapsed);
  const getShowTagsView = computed(() => appStore.getAppConfig.showTagsView);
  //
  const getHeaderSetting = computed(() => appStore.getHeaderSetting);
  const getHeaderFixed = computed(() => appStore.getHeaderSetting.fixed);

  const getOpenKeepAlive = computed(() => appStore.getAppConfig.openKeepAlive);

  return {
    getAppConfig,
    getShowLogo,
    getCollapsed,
    getShowTagsView,
    getHeaderSetting,
    getHeaderFixed,
    getOpenKeepAlive,
  };
}
