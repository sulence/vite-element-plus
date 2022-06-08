import { PageEnum } from "@/enums/pageEnum";
import { Layout } from "../constant";
import { AppRouteModule, AppRouteRecordRaw } from "../types";
import { REDIRECT_ROUTE } from "./base";

const modules = import.meta.globEager("./modules/**/*.ts");

const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const RootRoute: AppRouteRecordRaw = {
  path: "/",
  name: "Root",
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: "Root",
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: "/login",
  name: "Login",
  component: () => import("@/views/HomeView.vue"),
  meta: {
    title: "登录",
  },
};

export const TestRoute: AppRouteRecordRaw = {
  path: "/test",
  name: "Test",
  component: Layout,
  meta: {
    title: "测试",
  },
  children: [
    {
      path: "index",
      name: "test-index",
      component: () => import("@/views/HomeView.vue"),
      meta: {
        title: "测试首页",
      },
    },
  ],
};

//需要验证权限
export const asyncRoutes = [...routeModuleList];

//普通路由 无需验证权限
export const basicRoutes = [RootRoute, TestRoute, LoginRoute, REDIRECT_ROUTE];
