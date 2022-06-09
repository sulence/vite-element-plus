import { Recordable } from "vite-plugin-mock";

export function resultSuccess<T = Recordable>(
  result: T,
  { message = "ok" } = {}
) {
  return {
    code: 200,
    result,
    message,
    type: "success",
  };
}

export function resultError(
  message = "Request failed",
  { code = -1, result = null } = {}
) {
  return {
    code,
    result,
    message,
    type: "error",
  };
}

export function pagination(page, pageSize, array) {
  const pageCount = page * pageSize;
  const pagePre = (page - 1) * pageSize;
  const data = array.filter((item, index) => {
    return index < pageCount && index >= pagePre;
  });
  return data;
}

export function paginationSearch(page, pageSize, array, name) {
  const searchArray = array.filter((item) => {
    return item.username.indexOf(name) !== -1;
  });

  return {
    searchTotal: searchArray.length,
    searchRows: pagination(page, pageSize, searchArray),
  };
}

export interface requestParams {
  method: string;
  body: any;
  headers?: { authorization?: string };
  query: any;
}
/**
 * @description 本函数用于从request数据中获取token，请根据项目的实际情况修改
 *
 */
export function getRequestToken({
  headers,
}: requestParams): string | undefined {
  return headers?.authorization;
}
