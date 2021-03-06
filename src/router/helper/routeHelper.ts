import { cloneDeep } from "lodash-es";
import { warn } from "vue";
import { ErrorPage, Layout, ParentLayout } from "../constant";
import { AppRouteModule, AppRouteRecordRaw } from "../types";

const Iframe = () => import("@/views/iframe/index.vue");
const LayoutMap = new Map<string, () => Promise<typeof import("*.vue")>>();

LayoutMap.set("LAYOUT", Layout);
LayoutMap.set("IFRAME", Iframe);

let dynamicViewsModules: Record<string, () => Promise<Recordable>>;

// Dynamic introduction
function asyncImportRoute(routes: AppRouteRecordRaw[] | undefined) {
  dynamicViewsModules =
    dynamicViewsModules || import.meta.glob("../../views/**/*.{vue,tsx}");
  if (!routes) return;
  routes.forEach((item) => {
    if (!item.component && item.meta?.frameSrc) {
      item.component = "IFRAME";
    }
    const { component, name } = item;
    const { children } = item;
    if (component) {
      const layoutFound = LayoutMap.get(component.toUpperCase());
      if (layoutFound) {
        item.component = layoutFound;
      } else {
        item.component = dynamicImport(
          dynamicViewsModules,
          component as string
        );
      }
    } else if (name) {
      item.component = ParentLayout;
    }
    children && asyncImportRoute(children);
  });
}

function dynamicImport(
  dynamicViewsModules: Record<string, () => Promise<Recordable>>,
  component: string
) {
  const keys = Object.keys(dynamicViewsModules);
  const matchKeys = keys.filter((key) => {
    const k = key.replace("../../views", "");
    const startFlag = component.startsWith("/");
    const endFlag = component.endsWith(".vue") || component.endsWith(".tsx");
    const startIndex = startFlag ? 0 : 1;
    const lastIndex = endFlag ? k.length : k.lastIndexOf(".");
    return k.substring(startIndex, lastIndex) === component;
  });
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return dynamicViewsModules[matchKey];
  } else if (matchKeys?.length > 1) {
    warn(
      "Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure"
    );
    return;
  } else {
    warn(
      "???src/views/????????????`" +
        component +
        ".vue` ??? `" +
        component +
        ".tsx`, ???????????????!"
    );
    return ErrorPage;
  }
}

// Turn background objects into routing objects
export function transformObjToRoute<T = AppRouteModule>(
  routeList: AppRouteModule[]
): T[] {
  routeList.forEach((route) => {
    const component = route.component as string;
    if (component) {
      if (component.toUpperCase() === "LAYOUT") {
        route.component = LayoutMap.get(component.toUpperCase());
      } else {
        route.children = [cloneDeep(route)];
        route.component = Layout;
        route.name = `${route.name}Parent`;
        route.path = "";
        const meta = route.meta || {};
        meta.single = true;
        meta.affix = false;
        route.meta = meta;
      }
    } else {
      warn("????????????????????????" + route?.name + "???component??????");
    }
    route.children && asyncImportRoute(route.children);
  });
  return routeList as unknown as T[];
}
