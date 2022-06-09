import type { RouteRecordRaw } from "vue-router";
import { isNavigationFailure, Router } from "vue-router";
import { PageEnum } from "@/enums/pageEnum";
import { usePermissionStoreWithOut } from "@/store/modules/permission";
import { useUserStoreWithOut } from "@/store/modules/user";

const LOGIN_PATH = PageEnum.BASE_LOGIN;

const whitePathList = [LOGIN_PATH]; // no redirect whitelist

export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut();
  const asyncRouteStore = usePermissionStoreWithOut();
  router.beforeEach(async (to, from, next) => {
    if (from.path === LOGIN_PATH && to.name === "errorPage") {
      next(PageEnum.BASE_HOME);
      return;
    }
    const token = userStore.getToken;

    // Whitelist can be directly entered
    if (whitePathList.includes(to.path as PageEnum)) {
      next();
      return;
    }

    if (!token) {
      // You can access without permissions. You need to set the routing meta.ignoreAuth to true
      if (to.meta.ignoreAuth) {
        next();
        return;
      }
      // redirect login page
      const redirectData: {
        path: string;
        replace: boolean;
        query?: Recordable<string>;
      } = {
        path: LOGIN_PATH,
        replace: true,
      };
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        };
      }
      next(redirectData);
      return;
    }

    if (asyncRouteStore.getIsDynamicAddedRoute) {
      next();
      return;
    }

    const routes = await asyncRouteStore.generateRoutes();

    // 动态添加可访问路由表
    routes.forEach((item: unknown) => {
      router.addRoute(item as unknown as RouteRecordRaw);
    });

    //添加404
    // const isErrorPage = router.getRoutes().findIndex((item) => item.name === ErrorPageRoute.name);
    // if (isErrorPage === -1) {
    //   router.addRoute(ErrorPageRoute as unknown as RouteRecordRaw);
    // }

    const redirectPath = (from.query.redirect || to.path) as string;
    const redirect = decodeURIComponent(redirectPath);
    const nextData =
      to.path === redirect ? { ...to, replace: true } : { path: redirect };
    asyncRouteStore.setDynamicAddedRoute(true);
    next(nextData);
  });

  router.afterEach((to, _, failure) => {
    document.title = (to?.meta?.title as string) || document.title;
    if (isNavigationFailure(failure)) {
      //console.log('failed navigation', failure)
    }
    const asyncRouteStore = usePermissionStoreWithOut();
    // 在这里设置需要缓存的组件名称
    const keepAliveComponents = asyncRouteStore.keepAliveComponents;
    const currentComName: any = to.matched.find(
      (item) => item.name == to.name
    )?.name;
    if (
      currentComName &&
      !keepAliveComponents.includes(currentComName) &&
      to.meta?.keepAlive
    ) {
      // 需要缓存的组件
      keepAliveComponents.push(currentComName);
    } else if (!to.meta?.keepAlive || to.name == "Redirect") {
      // 不需要缓存的组件
      const index = asyncRouteStore.keepAliveComponents.findIndex(
        (name: any) => name == currentComName
      );
      if (index != -1) {
        keepAliveComponents.splice(index, 1);
      }
    }
    asyncRouteStore.setKeepAliveComponents(keepAliveComponents);
  });

  router.onError((error) => {
    console.log(error, "路由错误");
  });
}
