import { http } from "@/utils/axios";

export const getTableListApi = () => http.get<any>({ url: "getTableList" });
