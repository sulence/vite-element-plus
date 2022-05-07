import { defineStore } from "pinia";
import { AppConfig, HeaderSetting } from "@/types/app";
import { store } from "@/store";
import appSetting from "@/settings/appSetting";
import { deepMerge } from "@/utils";
import { ThemeEnum } from "@/enums/appEnum";

interface AppState {
  // Page loading status
  pageLoading: boolean;
  //
  darkMode: ThemeEnum;
  // app config
  appSetting: AppConfig;
  //顶部设置
  headerSetting: HeaderSetting;
}

let timeId: TimeoutHandle;
export const useAppStore = defineStore({
  id: "app",
  state: (): AppState => ({
    pageLoading: false,
    darkMode: ThemeEnum.DARK,
    appSetting,
    headerSetting: {
      //背景色
      bgColor: "#fff",
      //固定顶部
      fixed: true,
      //显示重载按钮
      isReload: true,
    },
  }),
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading;
    },
    getAppConfig(): AppConfig {
      return this.appSetting || ({} as AppConfig);
    },
    getHeaderSetting(): HeaderSetting {
      return this.headerSetting || ({} as HeaderSetting);
    },
    getDarkMode(): "light" | "dark" | string {
      return this.darkMode;
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },
    setCollapsed(): void {
      if (this.appSetting) {
        this.appSetting.collapsed = !this.appSetting.collapsed;
      }
    },
    setAppSetting(config: DeepPartial<AppConfig>): void {
      this.appSetting = deepMerge(this.appSetting || {}, config);
    },
    setHeaderSetting(config: DeepPartial<HeaderSetting>): void {
      this.headerSetting = deepMerge(this.headerSetting || {}, config);
    },
    async setPageLoadingAction(loading: boolean): Promise<void> {
      if (loading) {
        clearTimeout(timeId);
        // Prevent flicker
        timeId = setTimeout(() => {
          this.setPageLoading(loading);
        }, 50);
      } else {
        this.setPageLoading(loading);
        clearTimeout(timeId);
      }
    },
  },
});

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store);
}
