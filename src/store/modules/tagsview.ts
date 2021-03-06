import { PageEnum } from "@/enums/pageEnum";
import { ErrorPageRoute, REDIRECT_ROUTE } from "@/router/routes/base";
import { defineStore } from "pinia";
import { RouteLocationNormalized, RouteLocationRaw } from "vue-router";
import { toRaw, unref } from "vue";
import { store } from "@/store";

export interface TagView extends Partial<RouteLocationNormalized> {
  title?: string;
}

export interface TagsviewState {
  cacheTabList: Set<string>;
  visitedViews: TagView[];
  lastDragEndIndex: number;
  cachedViews: Set<string>;
}

const getToTarget = (tabItem: RouteLocationNormalized) => {
  const { params, path, query } = tabItem;
  return {
    params: params || {},
    path,
    query: query || {},
  };
};

export const useTagsviewStore = defineStore({
  id: "app-tagsview",
  state: (): TagsviewState => ({
    // Tabs that need to be cached
    cacheTabList: new Set(),
    // multiple tab list
    visitedViews: [],
    //
    cachedViews: new Set(),
    // Index of the last moved tab
    lastDragEndIndex: 0,
  }),
  getters: {
    getVisitedViews(): TagView[] {
      return this.visitedViews;
    },
    getCachedViews(): string[] {
      return Array.from(this.cachedViews);
    },
    getLastDragEndIndex(): number {
      return this.lastDragEndIndex;
    },
  },
  actions: {
    /**
     * Update the cache according to the currently opened tabs
     */
    async updateCachedViews() {
      const cacheMap: Set<string> = new Set();

      for (const cachedView of this.visitedViews) {
        const item = cachedView;
        // Ignore the cache
        const needCache = !item.meta?.ignoreKeepAlive;
        if (!needCache) {
          continue;
        }
        const name = item.name as string;
        cacheMap.add(name);
      }
      this.cachedViews = cacheMap;
    },
    async addCachedView(route: TagView) {
      const { path, name, fullPath, params, query, meta } = route;

      // // 404  The page does not need to add a tab
      if (
        path === PageEnum.ERROR_PAGE ||
        path === PageEnum.BASE_LOGIN ||
        !name ||
        [REDIRECT_ROUTE.name, ErrorPageRoute.name].includes(name as string)
      ) {
        return;
      }

      let updateIndex = -1;
      // Existing pages, do not add tabs repeatedly
      const cachedViewHasExits = this.visitedViews.some((cachedView, index) => {
        updateIndex = index;
        return (cachedView.fullPath || cachedView.path) === (fullPath || path);
      });

      // If the tab already exists, perform the update operation
      if (cachedViewHasExits) {
        const curCachedView = toRaw(this.visitedViews)[updateIndex];
        if (!curCachedView) {
          return;
        }
        curCachedView.params = params || curCachedView.params;
        curCachedView.query = query || curCachedView.query;
        curCachedView.fullPath = fullPath || curCachedView.fullPath;
        this.visitedViews.splice(updateIndex, 1, curCachedView);
      } else {
        // Add cachedView
        // ???????????????????????????????????? 0 ??????????????????????????????
        const dynamicLevel = meta?.dynamicLevel ?? -1;
        if (dynamicLevel > 0) {
          // ?????????????????????????????? 0 ??????????????????????????????????????????????????????
          // ?????????????????????????????????????????????????????????????????????.
          // const realName: string = path.match(/(\S*)\//)![1];
          const realPath = meta?.realPath ?? "";
          // ???????????????????????????????????????, ??????????????????????????????
          if (
            this.visitedViews.filter((e) => e.meta?.realPath ?? "" === realPath)
              .length >= dynamicLevel
          ) {
            // ???????????????
            const index = this.visitedViews.findIndex(
              (item) => item.meta?.realPath === realPath
            );
            index !== -1 && this.visitedViews.splice(index, 1);
          }
        }

        this.visitedViews.push(
          Object.assign({}, route, {
            title: route.meta?.title || "no-name",
          })
        );
      }
      this.updateCachedViews();
      // cachedView && Persistent.setLocal(MULTIPLE_TABS_KEY, this.tabList);
    },
    refreshTab(view: TagView) {
      if (view.name === null || view.name === undefined) return;
      const hasName = this.cachedViews.has(view.name?.toString());
      const findTab = this.getCachedViews.find(
        (item) => item === view.name?.toString()
      );
      if (hasName && findTab) {
        this.cachedViews.delete(findTab);
      }
    },
    async closeTab(view: TagView) {
      const { fullPath } = view;
      if (view.name === null) return;
      const index = this.visitedViews.findIndex(
        (item) => item.fullPath === fullPath
      );
      index !== -1 && this.visitedViews.splice(index, 1);
    },
    /**
     * Close other tabs
     */
    async closeOtherTabs(view: TagView) {
      const { fullPath } = view;
      if (view.name === null) return;
      const index = this.visitedViews.findIndex(
        (item) => item.fullPath === fullPath
      );
      if (index > -1) {
        this.visitedViews = this.visitedViews.slice(index, index + 1);
      } else {
        // if index = -1, there is no cached tags
        this.visitedViews = [];
      }
      this.updateCachedViews();
    },
    async closeAllTab() {
      this.cachedViews = new Set();
      this.visitedViews = [];
    },
  },
});

// Need to be used outside the setup
export function useTagsviewStoreWithOutStore() {
  return useTagsviewStore(store);
}
