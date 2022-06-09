import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";

import { USER } from "@/api/interface";

import { getUserInfo, loginApi, logout } from "@/api/user";
import { PageEnum } from "@/enums/pageEnum";
import { RoleEnum } from "@/enums/roleEnum";
import { router } from "@/router";
import { PAGE_NOT_FOUND_ROUTE } from "@/router/routes/base";
import { usePermissionStore } from "./permission";
import { isArray } from "@/utils/is";
import { store } from "..";

interface UserState {
  userInfo: Nullable<USER.UserInfo>;
  token?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}

export const useUserStore = defineStore({
  id: "app-user",
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: "undefined",
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
  }),
  getters: {
    getRoleList(): RoleEnum[] {
      return this.roleList;
    },

    getToken(): string | undefined {
      return this.token;
    },
  },
  actions: {
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
      // setAuthCache(ROLES_KEY, roleList);
    },
    setToken(info: string | undefined) {
      this.token = info ? info : ""; // for null or undefined value
      // setAuthCache(TOKEN_KEY, info);
    },

    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    setUserInfo(info: USER.UserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      // setAuthCache(USER_INFO_KEY, info);
    },

    // async getUserInfoAction(): Promise<UserInfo | null> {
    //   if (!this.getToken) return null;
    //   const userInfo = await getUserInfo();
    //   const { roles = [] } = userInfo;
    //   if (isArray(roles)) {
    //     const roleList = roles.map((item) => item.value) as RoleEnum[];
    //     this.setRoleList(roleList);
    //   } else {
    //     userInfo.roles = [];
    //     this.setRoleList([]);
    //   }
    //   this.setUserInfo(userInfo);
    //   return userInfo;
    // },

    /**
     * @description: login
     */
    async login(
      params: USER.LoginParams & {
        goHome?: boolean;
      }
    ): Promise<USER.GetUserInfoModel | null> {
      try {
        const { goHome = true, ...loginParams } = params;
        const data = await loginApi(loginParams);
        const { token } = data;

        // save token
        this.setToken(token);
        return this.afterLoginAction(goHome);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async afterLoginAction(
      goHome?: boolean
    ): Promise<USER.GetUserInfoModel | null> {
      if (!this.getToken) return null;
      // get user info
      const userInfo = await this.getUserInfoAction();

      const sessionTimeout = this.sessionTimeout;
      if (sessionTimeout) {
        this.setSessionTimeout(false);
      } else {
        const permissionStore = usePermissionStore();
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.generateRoutes();
          routes.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw);
          });
          router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
          permissionStore.setDynamicAddedRoute(true);
        }
        goHome &&
          (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME));
      }
      return userInfo;
    },
    async getUserInfoAction(): Promise<USER.UserInfo | null> {
      if (!this.getToken) return null;
      const userInfo = await getUserInfo();
      const { roles = [] } = userInfo;
      if (isArray(roles)) {
        const roleList = roles.map((item) => item.value) as RoleEnum[];
        this.setRoleList(roleList);
      } else {
        userInfo.roles = [];
        this.setRoleList([]);
      }
      this.setUserInfo(userInfo);
      return userInfo;
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          await logout();
        } catch {
          console.log("注销Token失败");
        }
      }
      this.setToken(undefined);
      this.setSessionTimeout(false);
      this.setUserInfo(null);
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },
  },
});
// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
