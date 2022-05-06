import type { AppRouteRecordRaw } from "@/router/types";
import { REDIRECT_NAME, ErrorPage, Layout } from "@/router/constant";

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

export const REDIRECT_ROUTE: AppRouteRecordRaw = {
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
      component: () => import("@/views/HomeView.vue"),
      meta: {
        title: REDIRECT_NAME,
        hideBreadcrumb: true,
      },
    },
  ],
};
