import { defineStore } from "pinia";
import { ProjectConfig } from "@/types/project";
import { store } from "@/store";

interface AppState {
  // Page loading status
  pageLoading: boolean;
  // project config
  projectConfig: ProjectConfig | null;
}

let timeId: TimeoutHandle;
export const useAppStore = defineStore({
  id: "app",
  state: (): AppState => ({
    pageLoading: false,
    projectConfig: {
      showLogo: true,
      collapsed: false,
      openKeepAlive: true,
      showTagsView: true,
    },
  }),
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading;
    },
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig);
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },
    setCollapsed(): void {
      if (this.projectConfig) {
        this.projectConfig.collapsed = !this.projectConfig?.collapsed;
      }
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
