import { http } from "@/utils/axios";

import { RouteMeta } from "vue-router";

export interface RouteItem {
  path: string;
  component: any;
  meta: RouteMeta;
  name?: string;
  alias?: string | string[];
  redirect?: string;
  caseSensitive?: boolean;
  children?: RouteItem[];
}

/**
 * @description: Get menu return value
 */
export type getMenuListResultModel = RouteItem[];

export const getMenuList = () =>
  http.get<getMenuListResultModel>({ url: "getMenuList" });
