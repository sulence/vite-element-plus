import { RoleEnum } from "@/enums/roleEnum";
import { defineStore } from "pinia";

interface UserState {
  token?: string;
  roleList: RoleEnum[];
}

export const useUserStore = defineStore({
  id: "app-user",
  state: (): UserState => ({
    // token
    token: undefined,
    // roleList
    roleList: [],
  }),
  getters: {
    getRoleList(): RoleEnum[] {
      return this.roleList;
    },
  },
  actions: {
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
      // setAuthCache(ROLES_KEY, roleList);
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
  },
});
