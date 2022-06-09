import { http } from "@/utils/axios";

import { USER } from "./interface";

/**
 * @description: user login api
 */
export function loginApi(params: USER.LoginParams) {
  return http.post<USER.LoginResultModel>({
    url: "/api/login",
    params,
  });
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return http.get<USER.GetUserInfoModel>({ url: "/api/getUserInfo" });
}

export function logout() {
  return http.get({ url: "/api/logout" });
}
