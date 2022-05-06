import { computed } from "vue";

import { useAppStore } from "@/store/modules/app";

export function useRootSetting() {
  const appStore = useAppStore();
  const getShowLogo = computed(() => appStore.getProjectConfig.showLogo);
  const getCollapsed = computed(() => appStore.getProjectConfig.collapsed);

  const getOpenKeepAlive = computed(
    () => appStore.getProjectConfig.openKeepAlive
  );

  return {
    getShowLogo,
    getCollapsed,
    getOpenKeepAlive,
  };
}
