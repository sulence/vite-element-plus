import { RouteLocationNormalized } from "vue-router";
import { defineStore } from "pinia";
import { toRaw } from "vue";
import { PageEnum } from "@/enums/pageEnum";
import { ErrorPageRoute, REDIRECT_ROUTE } from "@/router/routes/base";

export interface TabState extends Partial<RouteLocationNormalized> {
  title?: string;
}

export interface AppTabState {
  visitedViews: TabState[];
  cachedViews: Set<string>;
}

export const useTabStore = defineStore({
  id: "app-tabs",
  state: (): AppTabState => ({
    visitedViews: [],
    cachedViews: new Set(), //  keepAlive 缓存页面
  }),
  getters: {
    getVisitedViews(): TabState[] {
      return this.visitedViews;
    },
    getCachedViews(): string[] {
      return Array.from(this.cachedViews);
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
    async addView(route: TabState) {
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
        // 获取动态路由打开数，超过 0 即代表需要控制打开数
        const dynamicLevel = meta?.dynamicLevel ?? -1;
        if (dynamicLevel > 0) {
          // 如果动态路由层级大于 0 了，那么就要限制该路由的打开数限制了
          // 首先获取到真实的路由，使用配置方式减少计算开销.
          // const realName: string = path.match(/(\S*)\//)![1];
          const realPath = meta?.realPath ?? "";
          // 获取到已经打开的动态路由数, 判断是否大于某一个值
          if (
            this.visitedViews.filter((e) => e.meta?.realPath ?? "" === realPath)
              .length >= dynamicLevel
          ) {
            // 关闭第一个
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
    },
  },
});
