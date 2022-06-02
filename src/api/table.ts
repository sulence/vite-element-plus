import { http } from "@/utils/axios";

// * 分页请求参数
export interface ReqPage {
  pageNum: number;
  pageSize: number;
}

// * 用户管理
export namespace User {
  export interface ReqGetUserParams extends ReqPage {
    username: string;
  }
}

export const getTableListApi = (params: User.ReqGetUserParams) =>
  http.get<any>({ url: "getTableList", params });
