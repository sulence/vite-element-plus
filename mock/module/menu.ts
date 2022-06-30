import { MockMethod } from "vite-plugin-mock";
import { resultSuccess } from "../index";

const list = [
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
        component: "/Dashboard/index",
        meta: {
          title: "主控台",
        },
      },
      {
        path: "monitor",
        name: "dashboard_monitor",
        component: "/HomeView",
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
    path: "/directive",
    name: "Directive",
    component: "LAYOUT",
    redirect: "/directive/copy",
    meta: {
      isRoot: true,
      icon: "system",
      title: "指令",
    },
    children: [
      {
        path: "copy",
        name: "directive-copy",
        meta: {
          title: "复制指令",
          icon: "system",
        },
        component: "/Directive/Copy",
      },
      {
        path: "debounce",
        name: "directive-debounce",
        meta: {
          title: "防抖指令",
          icon: "system",
        },
        component: "/Directive/Debounce",
      },
      {
        path: "throttle",
        name: "directive-throttle",
        meta: {
          title: "节流指令",
          icon: "system",
        },
        component: "/Directive/Throttle",
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
  {
    path: "/table",
    name: "Table",
    redirect: "/table/useHooks",
    component: "LAYOUT",
    meta: {
      title: "表格",
      icon: "table",
    },
    children: [
      {
        path: "useHooks",
        name: "UseHooks",
        component: "Table/useHooksTable",
        meta: {
          title: "使用 Hooks",
        },
      },
      {
        path: "useComponent",
        name: "UseComponent",
        component: "Table/useHooksTable",
        meta: {
          title: "使用 Component",
        },
      },
    ],
  },
];

export default [
  {
    url: "/getMenuList",
    timeout: 1000,
    method: "get",
    response: () => {
      return resultSuccess(list);
    },
  },
] as MockMethod[];
