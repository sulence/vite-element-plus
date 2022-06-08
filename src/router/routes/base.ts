import type { AppRouteRecordRaw } from "@/router/types";
import {
  REDIRECT_NAME,
  ErrorPage,
  Layout,
  PAGE_NOT_FOUND_NAME,
} from "@/router/constant";
import { RouteRecordRaw } from "vue-router";

// 404 on a page
export const ErrorPageRoute: AppRouteRecordRaw = {
  path: "/:path(.*)*",
  name: "ErrorPage",
  component: Layout,
  meta: {
    title: "ErrorPage",
    hideBreadcrumb: true,
  },
  children: [
    {
      path: "/:path(.*)*",
      name: "ErrorPageSon",
      component: ErrorPage,
      meta: {
        title: "ErrorPage",
        hideBreadcrumb: true,
      },
    },
  ],
};

export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: "/:path(.*)*",
  name: PAGE_NOT_FOUND_NAME,
  component: Layout,
  meta: {
    title: "ErrorPage",
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: "/:path(.*)*",
      name: PAGE_NOT_FOUND_NAME,
      component: ErrorPage,
      meta: {
        title: "ErrorPage",
        hideBreadcrumb: true,
        hideMenu: true,
      },
    },
  ],
};

export const REDIRECT_ROUTE: RouteRecordRaw = {
  path: "/redirect",
  component: Layout,
  name: "RedirectTo",
  meta: {
    title: REDIRECT_NAME,
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: "/redirect/:path(.*)",
      name: REDIRECT_NAME,
      component: () => import("@/views/Redirect.vue"),
      meta: {
        title: REDIRECT_NAME,
        hideBreadcrumb: true,
      },
    },
  ],
};
