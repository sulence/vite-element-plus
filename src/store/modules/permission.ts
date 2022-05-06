import { defineStore } from "pinia";
import { asyncRoutes, basicRoutes } from "@/router/routes";

import { store } from "@/store";
import { toRaw, unref } from "vue";
import { AppRouteRecordRaw, Menu } from "@/router/types";
import { transformObjToRoute } from "@/router/helper/routeHelper";
import { transformRouteToMenu } from "@/router/helper/menuHelper";
import { generatorDynamicRouter, getPermCode } from "./menu";

interface TreeHelperConfig {
  id: string;
  children: string;
  pid: string;
}

const DEFAULT_CONFIG: TreeHelperConfig = {
  id: "id",
  children: "children",
  pid: "pid",
};

const getConfig = (config: Partial<TreeHelperConfig>) =>
  Object.assign({}, DEFAULT_CONFIG, config);

function filter<T = any>(
  tree: T[],
  func: (n: T) => boolean,
  config: Partial<TreeHelperConfig> = {}
): T[] {
  config = getConfig(config);
  const children = config.children as string;

  function listFilter(list: T[]) {
    return list
      .map((node: any) => ({ ...node }))
      .filter((node) => {
        node[children] = node[children] && listFilter(node[children]);
        return func(node) || (node[children] && node[children].length);
      });
  }

  return listFilter(tree);
}

interface PermissionState {
  menus: Menu[];
  keepAliveComponents: string[];
  isDynamicAddedRoute: boolean;
  // Permission code list
  permCodeList: string[] | number[];
}

export const usePermissionStore = defineStore({
  id: "app-permission",
  state: (): PermissionState => ({
    menus: [],
    keepAliveComponents: [],
    // Whether the route has been dynamically added
    isDynamicAddedRoute: false,
    // Permission code list
    permCodeList: [],
  }),
  getters: {
    getMenus(): Menu[] {
      return this.menus;
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute;
    },
    getPermCodeList(): string[] | number[] {
      return this.permCodeList;
    },
  },
  actions: {
    setPermCodeList(codeList: string[]) {
      this.permCodeList = codeList;
    },

    async changePermissionCode() {
      const codeList = (await getPermCode) as string[];
      this.setPermCodeList(codeList);
    },

    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },
    setMenus(menus: Menu[]) {
      // 设置动态路由
      this.menus = menus;
    },
    setKeepAliveComponents(compNames: string[]) {
      // 设置需要缓存的组件
      this.keepAliveComponents = compNames;
    },

    async generateRoutes() {
      let accessedRouters: AppRouteRecordRaw[] = [];
      // const permissionsList = data.permissions || [];
      // const routeFilter = (route) => {
      //   const { meta } = route;
      //   const { permissions } = meta || {};
      //   if (!permissions) return true;
      //   return permissionsList.some((item) => permissions.includes(item.value));
      // };

      const roleList: any[] = [];
      const routeFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route;
        const { roles } = meta || {};
        if (!roles) return true;
        return roleList.some((role) => roles.includes(role));
      };

      // const { getPermissionMode } = useProjectSetting();
      const getPermissionMode = "BACK";
      const permissionMode = unref(getPermissionMode);
      if (permissionMode === "BACK") {
        // 动态获取菜单
        try {
          this.changePermissionCode();
          accessedRouters =
            (await generatorDynamicRouter) as AppRouteRecordRaw[];
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          //过滤账户是否拥有某一个权限，并将菜单从加载列表移除
          accessedRouters = filter(asyncRoutes, routeFilter);
        } catch (error) {
          console.log(error);
        }
      }
      console.log(accessedRouters);

      accessedRouters = transformObjToRoute(accessedRouters);

      accessedRouters = accessedRouters.filter(routeFilter);
      const menuList = transformRouteToMenu(accessedRouters);
      console.log(menuList, accessedRouters);

      this.setMenus(menuList);
      return toRaw(accessedRouters);
    },
  },
});

// Need to be used outside the setup
export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
}
