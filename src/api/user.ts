import { http } from "@/utils/axios";
/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}

export interface UserInfo {
  userId: string | number;
  username: string;
  realName: string;
  avatar: string;
  desc?: string;
  homePath?: string;
  roles: RoleInfo[];
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams) {
  return http.post<LoginResultModel>({
    url: "/api/login",
    params,
  });
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return http.get<GetUserInfoModel>({ url: "/api/getUserInfo" });
}

export function logout() {
  return http.get({ url: "/api/logout" });
}