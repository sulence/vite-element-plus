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

export const generatorDynamicRouter: RouteItem[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: "LAYOUT",
    redirect: "/dashboard/console",
    meta: {
      icon: "dashboard",
      title: "首页",
    },
    children: [
      {
        path: "console",
        name: "dashboard_console",
        component: "/HomeView",
        meta: {
          title: "主控台",
        },
      },
      {
        path: "monitor",
        name: "dashboard_monitor",
        component: "/AboutView",
        meta: {
          title: "监控页",
        },
      },
      {
        path: "workplace",
        name: "dashboard_workplace",
        component: "/TestView",
        meta: {
          hidden: true,
          title: "工作台",
        },
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    component: "LAYOUT",
    redirect: "/about/index",
    meta: {
      isRoot: true,
      icon: "system",
      title: "关于",
    },
    children: [
      {
        path: "index",
        name: "about-index",
        meta: {
          title: "关于",
          icon: "system",
        },
        component: "/AboutView",
      },
    ],
  },
  {
    path: "/form",
    name: "Form",
    redirect: "/form/basic-form",
    component: "LAYOUT",
    meta: {
      title: "表单页面",
      sort: 3,
      icon: "form",
    },
    children: [
      {
        path: "basic-form",
        name: "form-basic-form",
        meta: {
          title: "基础表单",
        },
        component: "/HomeView",
      },
      {
        path: "step-form",
        name: "form-step-form",
        meta: {
          title: "分步表单",
        },
        component: "/AboutView",
      },
      {
        path: "detail",
        name: "form-detail",
        meta: {
          title: "表单详情",
        },
        component: "/TestView",
      },
    ],
  },
  {
    path: "/system",
    name: "System",
    redirect: "/system/menu",
    component: "LAYOUT",
    meta: {
      title: "系统管理",
      icon: "system",
    },
    children: [
      {
        path: "menu",
        name: "Menu",
        component: "System/Menu",
        meta: {
          title: "菜单管理",
        },
      },
      {
        path: "user",
        name: "User",
        component: "System/User",
        meta: {
          title: "用户管理",
        },
      },
    ],
  },
];

export const getPermCode: string[] = ["1000", "3000", "5000"];
